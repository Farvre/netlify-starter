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
  ShadowDOMEvaluator: () => ShadowDOMEvaluator
});
module.exports = __toCommonJS(stdin_exports);
var import_parser = require("./parser.js");
var import_utility = require("./utility.js");
var import_constant = require("./constant.js");
class ShadowDOMEvaluator {
  /* private fields */
  #evaluator;
  #verifyShadowHost;
  /**
   * @param {import('./evaluator.js').Evaluator} evaluator - The Evaluator instance.
   */
  constructor(evaluator) {
    this.#evaluator = evaluator;
    this.#verifyShadowHost = false;
  }
  /**
   * Gets the verifyShadowHost state.
   * @returns {boolean} True if verified, otherwise false.
   */
  get verifyShadowHost() {
    return this.#verifyShadowHost;
  }
  /**
   * Resets the evaluation state.
   * @returns {void}
   */
  reset() {
    this.#verifyShadowHost = false;
  }
  /**
   * Matches a selector for a shadow root.
   * @param {import('css-tree').CssNode} ast - The AST.
   * @param {DocumentFragment} node - The DocumentFragment node.
   * @param {object} [opt] - Options.
   * @returns {boolean} True if matches, otherwise false.
   */
  matchSelectorForShadowRoot(ast, node, opt = {}) {
    const { name: astName } = ast;
    if (import_constant.KEYS_LOGICAL.has(astName)) {
      opt.isShadowRoot = true;
      return this.#evaluator.matchPseudoClassSelector(ast, node, opt);
    }
    if (astName === "host" || astName === "host-context") {
      const matches = this.evaluateShadowHost(ast, node, opt);
      if (matches) {
        this.#verifyShadowHost = true;
        return true;
      }
    }
    return false;
  }
  /**
   * Evaluates shadow host pseudo-classes.
   * @param {import('css-tree').CssNode} ast - The AST.
   * @param {DocumentFragment} node - The DocumentFragment node.
   * @returns {boolean} True if matches, otherwise false.
   */
  evaluateShadowHost(ast, node) {
    const { children: astChildren, name: astName } = ast;
    if (!Array.isArray(astChildren)) {
      if (astName === "host") {
        return true;
      }
      const msg = `Invalid selector :${astName}`;
      this.#evaluator.onError(
        (0, import_utility.generateException)(msg, import_constant.SYNTAX_ERR, this.#evaluator.window)
      );
      return false;
    }
    if (astName !== "host" && astName !== "host-context") {
      const msg = `Invalid selector :${astName}()`;
      this.#evaluator.onError(
        (0, import_utility.generateException)(msg, import_constant.SYNTAX_ERR, this.#evaluator.window)
      );
      return false;
    }
    if (astChildren.length === 0) {
      const css = (0, import_parser.generateCSS)(ast);
      const msg = `Invalid selector ${css}`;
      this.#evaluator.onError(
        (0, import_utility.generateException)(msg, import_constant.SYNTAX_ERR, this.#evaluator.window)
      );
      return false;
    }
    const { host } = node;
    for (const child of astChildren) {
      const { branches } = (0, import_parser.walkAST)(child);
      for (const branch of branches) {
        if (astName === "host" && this.#evaluateHostPseudo(branch, host, ast)) {
          return true;
        } else if (astName === "host-context" && this.#evaluateHostContextPseudo(branch, host, ast)) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Evaluates the :host() pseudo-class.
   * @private
   * @param {Array<object>} leaves - The AST leaves.
   * @param {Element} host - The host element.
   * @param {import('css-tree').CssNode} ast - The original AST for error reporting.
   * @returns {boolean} True if matches, otherwise false.
   */
  #evaluateHostPseudo(leaves, host, ast) {
    const l = leaves.length;
    for (let i = 0; i < l; i++) {
      const leaf = leaves[i];
      if (leaf.type === import_constant.COMBINATOR) {
        const css = (0, import_parser.generateCSS)(ast);
        const msg = `Invalid selector ${css}`;
        this.#evaluator.onError(
          (0, import_utility.generateException)(msg, import_constant.SYNTAX_ERR, this.#evaluator.window)
        );
        return false;
      }
      if (!this.#evaluator.matchSelector(leaf, host)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Evaluates the :host-context() pseudo-class.
   * @private
   * @param {Array<object>} leaves - The AST leaves.
   * @param {Element} host - The host element.
   * @param {import('css-tree').CssNode} ast - The original AST for error reporting.
   * @returns {boolean} True if matched, otherwise false.
   */
  #evaluateHostContextPseudo(leaves, host, ast) {
    let parent = host;
    while (parent) {
      let bool;
      const l = leaves.length;
      for (let i = 0; i < l; i++) {
        const leaf = leaves[i];
        if (leaf.type === import_constant.COMBINATOR) {
          const css = (0, import_parser.generateCSS)(ast);
          const msg = `Invalid selector ${css}`;
          this.#evaluator.onError(
            (0, import_utility.generateException)(msg, import_constant.SYNTAX_ERR, this.#evaluator.window)
          );
          return false;
        }
        bool = this.#evaluator.matchSelector(leaf, parent);
        if (!bool) {
          break;
        }
      }
      if (bool) {
        return true;
      }
      parent = parent.parentNode || parent.host;
    }
    return false;
  }
}
