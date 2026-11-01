var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  DOMSelector: () => DOMSelector
});
module.exports = __toCommonJS(stdin_exports);
var import_lru_cache = require("lru-cache");
var import_utils = require("css-tree/utils");
var import_finder = require("./js/finder.js");
var import_nwsapi = require("./js/nwsapi.js");
var import_parser = require("./js/parser.js");
var import_selector = require("./js/selector.js");
var import_utility = require("./js/utility.js");
var import_constant = require("./js/constant.js");
/*!
 * DOM Selector - A CSS selector engine.
 * @license MIT
 * @copyright asamuzaK (Kazz)
 * @see {@link https://github.com/asamuzaK/domSelector/blob/main/LICENSE}
 */
const MAX_LENGTH = 2048;
const DEFAULT_SUBJECT = Object.freeze({
  id: null,
  className: null,
  tag: null,
  attr: null
});
const REG_UNIVERSAL = /^\s*(?:\*\|)?\*\s*$/;
class DOMSelector {
  /* private fields */
  #cache;
  #cacheSize;
  #document;
  #finder;
  #idlUtils;
  #maxLength;
  #nwsapi;
  #window;
  /**
   * Creates an instance of DOMSelector.
   * @param {Window} window - The Window object.
   * @param {Document} document - The Document object.
   * @param {object} [opt] - Options.
   * @param {number} [opt.cacheSize] - The maximum size of the LRU cache.
   * @param {object} [opt.idlUtils] - The internal IDL wrapper used for jsdom.
   * @param {number} [opt.maxLength] - The maximum length of the selector.
   */
  constructor(window, document, opt = {}) {
    const { cacheSize, idlUtils, maxLength } = opt;
    this.#idlUtils = idlUtils;
    this.#window = window;
    this.#document = document ? this.#wrapNode(document) : window.document;
    this.#maxLength = Number.isInteger(maxLength) && maxLength > 0 ? maxLength : MAX_LENGTH;
    this.#cacheSize = Number.isInteger(cacheSize) && cacheSize > 0 ? cacheSize : import_constant.CACHE_SIZE;
    this.#cache = new import_lru_cache.LRUCache({
      max: this.#cacheSize
    });
    this.#finder = new import_finder.Finder(this.#window, this.#cacheSize);
    this.#nwsapi = new import_nwsapi.Nwsapi(this.#window, this.#document, this.#cacheSize);
  }
  /**
   * Clears the internal caches.
   * @param {boolean} [clearAll] - True to clear all caches. If false, only
   * cached matching results are cleared.
   * @returns {void}
   */
  clear(clearAll = false) {
    if (clearAll) {
      this.#cache.clear();
    }
    this.#finder.clearResults(true);
    this.#nwsapi.clear(clearAll);
  }
  /**
   * Parses a selector and extracts the rightmost subject keys (Id, Class, Tag, Attribute).
   * @param {string} selector - The CSS selector to parse.
   * @param {boolean} [caseSensitive] - True if key should be case sensitive.
   * @returns {Array<SelectorSubject>} The list of selector subjects.
   */
  extractSubjects(selector, caseSensitive = false) {
    if (!selector || typeof selector !== "string") {
      return [DEFAULT_SUBJECT];
    }
    const { error, selector: validatedSelector } = this.#validateSelector(selector);
    if (error) {
      return [DEFAULT_SUBJECT];
    }
    selector = validatedSelector;
    const cacheKey = `extract_${selector}_${caseSensitive}`;
    let subjects = this.#cache.get(cacheKey);
    if (subjects !== void 0) {
      return [...subjects];
    }
    subjects = [];
    try {
      const ast = (0, import_parser.parseSelector)(selector);
      subjects = (0, import_parser.extractSubjectsAst)(ast, caseSensitive);
    } catch {
    }
    if (!subjects.length) {
      subjects.push(DEFAULT_SUBJECT);
    }
    this.#cache.set(cacheKey, subjects);
    return [...subjects];
  }
  /**
   * Checks if the given CSS selector is supported by this engine.
   * @param {string} selector - The CSS selector to check.
   * @returns {boolean} True if the selector is supported, false otherwise.
   */
  supports(selector) {
    if (typeof selector !== "string") {
      return false;
    }
    const { error, selector: validatedSelector } = this.#validateSelector(selector);
    if (error) {
      return false;
    }
    selector = validatedSelector;
    const cacheKey = `supports_${selector}`;
    let isSupported = this.#cache.get(cacheKey);
    if (isSupported !== void 0) {
      return isSupported;
    }
    if ((0, import_selector.filterSelector)(selector, import_constant.TARGET_SELF)) {
      isSupported = true;
    } else {
      try {
        const ast = (0, import_parser.parseSelector)(selector);
        isSupported = (0, import_selector.isSupportedAST)(ast);
      } catch {
        isSupported = false;
      }
    }
    this.#cache.set(cacheKey, isSupported);
    return isSupported;
  }
  /**
   * Checks if an element matches a CSS selector.
   * @param {string} selector - The CSS selector to check against.
   * @param {Element} node - The element node to check.
   * @param {object} [opt] - Optional parameters.
   * @param {boolean} [opt.requireAst] - Indicates always try to parse AST.
   * @returns {CheckResult} An object containing the check result.
   */
  check(selector, node, opt = {}) {
    const { error, selector: validatedSelector } = this.#validateSelector(selector);
    if (error) {
      return {
        error,
        ast: null,
        match: false,
        pseudoElement: null
      };
    }
    selector = validatedSelector;
    node = this.#wrapNode(node);
    const nodeError = this.#validateNodeType(node, true);
    if (nodeError) {
      let ast = null;
      if (opt.requireAst) {
        const astCacheKey = `check_ast_${selector}`;
        ast = this.#cache.get(astCacheKey);
        if (ast === void 0) {
          ast = (0, import_parser.parseSelector)(selector);
          this.#cache.set(astCacheKey, ast);
        }
      }
      return {
        ast: this.#cloneAST(ast),
        error: nodeError,
        match: false,
        pseudoElement: null
      };
    }
    if (REG_UNIVERSAL.test(selector)) {
      const astCacheKey = `check_ast_${selector.trim()}`;
      let ast = this.#cache.get(astCacheKey);
      if (ast === void 0) {
        ast = (0, import_parser.parseSelector)(selector);
        this.#cache.set(astCacheKey, ast);
      }
      return {
        ast: this.#cloneAST(ast),
        error: null,
        match: true,
        pseudoElement: null
      };
    }
    const nwsapiRes = this.#tryNwsapi(
      selector,
      node,
      import_constant.TARGET_SELF,
      (n) => this.#nwsapi.match(selector, n),
      true
    );
    if (nwsapiRes.success) {
      let ast = null;
      if (nwsapiRes.result || opt.requireAst) {
        const astCacheKey = `check_ast_${selector}`;
        ast = this.#cache.get(astCacheKey);
        if (ast === void 0) {
          ast = (0, import_parser.parseSelector)(selector);
          this.#cache.set(astCacheKey, ast);
        }
      }
      return {
        ast: this.#cloneAST(ast),
        error: null,
        match: nwsapiRes.result,
        pseudoElement: null
      };
    }
    const options = {
      check: true,
      noexcept: true,
      warn: false,
      globalObject: this.#window
    };
    const checkResult = this.#finder.setup(selector, node, options).find(import_constant.TARGET_SELF);
    return {
      ...checkResult,
      ast: this.#cloneAST(checkResult.ast)
    };
  }
  /**
   * Returns true if the element matches the selector.
   * @param {string} selector - The CSS selector to match against.
   * @param {Element} node - The element node to test.
   * @param {UserOptions} [opt] - User options.
   * @returns {boolean} True if the element matches, false otherwise.
   */
  matches(selector, node, opt = {}) {
    const options = {
      ...opt,
      check: false,
      globalObject: this.#window
    };
    const { error, selector: validatedSelector } = this.#validateSelector(selector);
    if (error) {
      this.#finder.onError(error, options);
      return false;
    }
    selector = validatedSelector;
    node = this.#wrapNode(node);
    const nodeError = this.#validateNodeType(node, true);
    if (nodeError) {
      this.#finder.onError(nodeError, options);
      return false;
    }
    if (REG_UNIVERSAL.test(selector)) {
      return true;
    }
    const nwsapiRes = this.#tryNwsapi(
      selector,
      node,
      import_constant.TARGET_SELF,
      (n) => this.#nwsapi.match(selector, n)
    );
    if (nwsapiRes.success) {
      return nwsapiRes.result;
    }
    const nodes = this.#findNodes(selector, node, options, import_constant.TARGET_SELF);
    return !!(nodes && nodes.size > 0);
  }
  /**
   * Traverses up the DOM tree to find the first node that matches the selector.
   * @param {string} selector - The CSS selector to match against.
   * @param {Element} node - The element from which to start traversing.
   * @param {UserOptions} [opt] - User options.
   * @returns {Element|null} The first matching ancestor element, or `null`.
   */
  closest(selector, node, opt = {}) {
    const options = {
      ...opt,
      check: false,
      globalObject: this.#window
    };
    const { error, selector: validatedSelector } = this.#validateSelector(selector);
    if (error) {
      this.#finder.onError(error, options);
      return null;
    }
    selector = validatedSelector;
    node = this.#wrapNode(node);
    const nodeError = this.#validateNodeType(node, true);
    if (nodeError) {
      return this.#finder.onError(nodeError, options);
    }
    if (REG_UNIVERSAL.test(selector)) {
      return node;
    }
    const nwsapiRes = this.#tryNwsapi(
      selector,
      node,
      import_constant.TARGET_LINEAL,
      (n) => this.#nwsapi.closest(selector, n)
    );
    if (nwsapiRes.success) {
      return nwsapiRes.result;
    }
    const nodes = this.#findNodes(selector, node, options, import_constant.TARGET_LINEAL);
    if (nodes && nodes.size) {
      let refNode = node;
      while (refNode) {
        if (nodes.has(refNode)) {
          return refNode;
        }
        refNode = refNode.parentNode;
      }
    }
    return null;
  }
  /**
   * Returns the first element within the subtree that matches the selector.
   * @param {string} selector - The CSS selector to match.
   * @param {Document|DocumentFragment|Element} node - The node to find within.
   * @param {UserOptions} [opt] - User options.
   * @returns {Element|null} The first matching element, or `null`.
   */
  querySelector(selector, node, opt = {}) {
    const options = {
      ...opt,
      check: false,
      globalObject: this.#window
    };
    const { error, selector: validatedSelector } = this.#validateSelector(selector);
    if (error) {
      this.#finder.onError(error, options);
      return null;
    }
    selector = validatedSelector;
    node = this.#wrapNode(node);
    const nodeError = this.#validateNodeType(node);
    if (nodeError) {
      this.#finder.onError(nodeError, options);
      return null;
    }
    if (REG_UNIVERSAL.test(selector)) {
      return node.firstElementChild;
    }
    const fastNode = (0, import_utility.findByExactIdAttribute)(selector, node);
    if (fastNode === null || fastNode?.nodeType === import_constant.ELEMENT_NODE) {
      return fastNode;
    }
    const nodes = this.#findNodes(selector, node, options, import_constant.TARGET_FIRST);
    if (nodes && nodes.size) {
      return nodes.values().next().value;
    }
    return null;
  }
  /**
   * Returns an array of elements within the subtree that match the selector.
   * Note: This method returns an Array, not a NodeList.
   * @param {string} selector - The CSS selector to match.
   * @param {Document|DocumentFragment|Element} node - The node to find within.
   * @param {UserOptions} [opt] - User options.
   * @returns {Array<Element>} An array of elements, or an empty array.
   */
  querySelectorAll(selector, node, opt = {}) {
    const options = {
      ...opt,
      check: false,
      globalObject: this.#window
    };
    const { error, selector: validatedSelector } = this.#validateSelector(selector);
    if (error) {
      this.#finder.onError(error, options);
      return [];
    }
    selector = validatedSelector;
    node = this.#wrapNode(node);
    const nodeError = this.#validateNodeType(node);
    if (nodeError) {
      this.#finder.onError(nodeError, options);
      return [];
    }
    if (REG_UNIVERSAL.test(selector)) {
      const document = node.nodeType === import_constant.DOCUMENT_NODE ? node : node.ownerDocument;
      return (0, import_utility.collectAllDescendants)(node, document);
    }
    const fastNodes = (0, import_utility.findBySimpleAttribute)(selector, node);
    if (Array.isArray(fastNodes)) {
      return fastNodes;
    }
    const nodes = this.#findNodes(selector, node, options, import_constant.TARGET_ALL);
    if (nodes && nodes.size) {
      return [...nodes];
    }
    return [];
  }
  /**
   * Generates a cloned selector AST.
   * @private
   * @param {import('css-tree').CssNode|null} ast - The selector AST.
   * @returns {import('css-tree').CssNode|null} Cloned selector AST.
   */
  #cloneAST(ast) {
    if (!ast) {
      return null;
    }
    return (0, import_utils.clone)(ast);
  }
  /**
   * Wraps the node for IDL internal implementation if idlUtils is present.
   * @private
   * @param {Document|DocumentFragment|Element} node - The raw node.
   * @returns {object} The wrapped or raw node.
   */
  #wrapNode(node) {
    return this.#idlUtils ? this.#idlUtils.wrapperForImpl(node) : node;
  }
  /**
   * Validates a selector.
   * @private
   * @param {string} selector - The selector to check.
   * @returns {{ selector:string|null, error:DOMException|RangeError|null}} The validation result.
   */
  #validateSelector(selector) {
    try {
      selector = (0, import_utility.stringifyValue)(selector, this.#window);
      if (selector.length > this.#maxLength) {
        return {
          selector: null,
          error: new this.#window.RangeError(
            `Selector exceeds maximum allowed length of ${this.#maxLength}.`
          )
        };
      }
      return {
        selector,
        error: null
      };
    } catch (e) {
      return {
        selector: null,
        error: e
      };
    }
  }
  /**
   * Validates a node.
   * @private
   * @param {Document|DocumentFragment|Element} node - The node to check.
   * @param {boolean} [element] - `true` if the node must be an Element.
   * @returns {TypeError|null} A TypeError if invalid, otherwise null.
   */
  #validateNodeType(node, element = false) {
    if (!node?.nodeType) {
      return new this.#window.TypeError(`Unexpected type ${(0, import_utility.getType)(node)}`);
    }
    if (element && node.nodeType !== import_constant.ELEMENT_NODE) {
      return new this.#window.TypeError(`Unexpected node ${node.nodeName}`);
    }
    return null;
  }
  /**
   * Executes Nwsapi matching logic with caching and error wrapping.
   * @private
   * @param {string} selector - The CSS selector to match against.
   * @param {Element} node - The target node to check.
   * @param {number} targetType - The target type indicating the scope.
   * @param {(node: Element) => Array<Element>|Element|boolean|null} callback - The specific nwsapi function.
   * @param {boolean} [isCheck] - True if called from the check method.
   * @returns {{success: boolean, result: Array<Element>|Element|boolean|null}} An object indicating whether the execution succeeded and its result.
   */
  #tryNwsapi(selector, node, targetType, callback, isCheck = false) {
    const document = node.ownerDocument;
    if (node.isConnected && node.namespaceURI === import_constant.NS_HTML && document === this.#document && document.contentType === import_constant.MIME_HTML && document.documentElement) {
      const cacheKey = `${isCheck ? "check" : targetType}_${selector}`;
      let filterMatches = this.#cache.get(cacheKey);
      if (filterMatches === void 0) {
        filterMatches = (0, import_selector.filterSelector)(selector, targetType);
        this.#cache.set(cacheKey, filterMatches);
      }
      if (filterMatches) {
        try {
          const result = callback(node);
          return { result, success: true };
        } catch {
        }
      }
    }
    return { result: null, success: false };
  }
  /**
   * Encapsulates Finder traversal logic and error handling.
   * @private
   * @param {string} selector - The CSS selector to match against.
   * @param {Document|DocumentFragment|Element} node - The node from which to start searching.
   * @param {FindOptions} [opt] - The finder options.
   * @param {number} targetType - The target type indicating the scope.
   * @returns {Set<Element>|null} The search results from Finder, or null.
   */
  #findNodes(selector, node, opt, targetType) {
    try {
      const res = this.#finder.setup(selector, node, opt).find(targetType);
      if (res instanceof Set) {
        return res;
      }
    } catch (e) {
      this.#finder.onError(e, opt);
    }
    return null;
  }
}
