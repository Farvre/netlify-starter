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
  Finder: () => Finder
});
module.exports = __toCommonJS(stdin_exports);
var import_evaluator = require("./evaluator.js");
var import_mapper = require("./mapper.js");
var import_matcher = require("./matcher.js");
var import_parser = require("./parser.js");
var import_utility = require("./utility.js");
var import_constant = require("./constant.js");
class Finder extends import_evaluator.Evaluator {
  /* private fields */
  #ast;
  #mapper;
  #nodeWalker;
  #nodes;
  #scoped;
  #selector;
  #selectorAST = null;
  /**
   * Initializes the finder.
   * @param {Window} window - The window object.
   * @param {number} [documentCacheSize] - The max number of items per document cache.
   */
  constructor(window, documentCacheSize = import_constant.CACHE_SIZE) {
    super(window);
    this.documentCacheSize = documentCacheSize;
  }
  /**
   * Gets the selector AST.
   * @returns {import('css-tree').CssNode|null} The selector AST.
   */
  get selectorAST() {
    return this.#selectorAST;
  }
  /**
   * Sets up the finder.
   * @param {string} selector - The CSS selector.
   * @param {Document|DocumentFragment|Element} node - Document, DocumentFragment, or Element.
   * @param {import('../index.js').FindOptions} opt - Options.
   * @returns {Finder} The Finder instance.
   */
  setup(selector, node, opt) {
    super.setup(selector, node, opt);
    this.#ast = null;
    this.#mapper = new import_mapper.Mapper(this);
    this.#nodeWalker = null;
    this.#nodes = null;
    this.#scoped = this.node !== this.root && this.node.nodeType === import_constant.ELEMENT_NODE;
    this.#selector = selector;
    this.#selectorAST = null;
    return this;
  }
  /**
   * Finds matched nodes.
   * @param {string} targetType - The target type.
   * @returns {Set<Element>|import('../index.js').CheckResult} A collection of matched nodes or a CheckResult object.
   */
  find(targetType) {
    let collection;
    try {
      collection = this.#prepareCollection(targetType);
    } catch (e) {
      if (this.check) {
        return {
          ast: this.#selectorAST,
          error: e,
          match: false,
          pseudoElement: this.pseudoElements.length ? this.pseudoElements.join("") : null
        };
      } else {
        throw e;
      }
    }
    const [[...branches], collectedNodes] = collection;
    const l = branches.length;
    let sort = l > 1 && targetType === import_constant.TARGET_ALL;
    let nodes = /* @__PURE__ */ new Set();
    for (let i = 0; i < l; i++) {
      const { branch, dir, find } = branches[i];
      if (!branch.length || !find) {
        continue;
      }
      const entryNodes = collectedNodes[i];
      const lastIndex = branch.length - 1;
      if (lastIndex === 0) {
        if ((targetType === import_constant.TARGET_ALL || targetType === import_constant.TARGET_FIRST) && this.node.nodeType === import_constant.ELEMENT_NODE) {
          for (const node of entryNodes) {
            if (node !== this.node) {
              if (targetType === import_constant.TARGET_ALL || this.node.contains(node)) {
                nodes.add(node);
                if (targetType === import_constant.TARGET_FIRST) {
                  break;
                }
              }
            }
          }
        } else if (targetType === import_constant.TARGET_ALL) {
          if (nodes.size) {
            for (const node of entryNodes) {
              nodes.add(node);
            }
            sort = true;
          } else {
            nodes = new Set(entryNodes);
          }
        } else {
          if (entryNodes.length) {
            nodes.add(entryNodes[0]);
          }
        }
      } else if (targetType === import_constant.TARGET_ALL) {
        const newNodes = this.processComplexBranchAll(branch, entryNodes, dir);
        if (nodes.size) {
          for (const newNode of newNodes) {
            nodes.add(newNode);
          }
          sort = true;
        } else {
          nodes = newNodes;
        }
      } else {
        const matchedNode = this.processComplexBranchFirst(
          branch,
          entryNodes,
          dir,
          targetType
        );
        if (matchedNode) {
          nodes.add(matchedNode);
        }
      }
    }
    if (this.check) {
      return {
        ast: this.#selectorAST,
        error: null,
        match: nodes.size > 0,
        pseudoElement: this.pseudoElements.length ? this.pseudoElements.join("") : null
      };
    }
    if (targetType === import_constant.TARGET_FIRST || targetType === import_constant.TARGET_ALL) {
      nodes.delete(this.node);
    }
    if ((sort || targetType === import_constant.TARGET_FIRST) && nodes.size > 1) {
      return new Set((0, import_utility.sortNodes)(nodes));
    }
    return nodes;
  }
  /**
   * Collects all matching nodes into AST nodes array.
   * @private
   * @param {string} targetType - The target type.
   * @returns {Array} Array containing the AST and nodes arrays.
   */
  #prepareCollection(targetType) {
    const { ast, invalidate, nodes, selectorAST } = this.#mapper.correspond(
      this.#selector
    );
    this.#ast = ast;
    this.#nodes = nodes;
    this.invalidate = invalidate;
    this.#selectorAST = selectorAST;
    const astValues = this.#ast.values();
    if (targetType === import_constant.TARGET_ALL || targetType === import_constant.TARGET_FIRST) {
      const pendingItems = /* @__PURE__ */ new Set();
      const hasScope = typeof this.#selector === "string" && this.#selector.includes(":scope");
      const scoped = this.#scoped;
      let i = 0;
      for (const { branch } of astValues) {
        const complex = branch.length > 1;
        const { dir, twig } = (0, import_utility.getTraversalStrategy)(
          branch,
          targetType,
          hasScope,
          scoped
        );
        const { compound, filtered, nodes: nodes2, pending } = this.#findEntryNodes(
          twig,
          targetType,
          { complex, dir }
        );
        if (nodes2.length) {
          this.#ast[i].find = true;
          this.#nodes[i] = nodes2;
        } else if (pending) {
          pendingItems.add({
            index: i,
            twig
          });
        }
        this.#ast[i].dir = dir;
        this.#ast[i].filtered = filtered || !compound;
        i++;
      }
      this.#processPendingItems(pendingItems);
    } else {
      let i = 0;
      for (const { branch } of astValues) {
        const twig = branch[branch.length - 1];
        const complex = branch.length > 1;
        const dir = import_constant.DIR_PREV;
        const { compound, filtered, nodes: nodes2 } = this.#findEntryNodes(
          twig,
          targetType,
          { complex, dir }
        );
        if (nodes2.length) {
          this.#ast[i].find = true;
          this.#nodes[i] = nodes2;
        }
        this.#ast[i].dir = dir;
        this.#ast[i].filtered = filtered || !compound;
        i++;
      }
    }
    return [this.#ast, this.#nodes];
  }
  /**
   * Finds entry nodes based on the selector type.
   * @private
   * @param {import('./processor.js').ProcessedBranch} twig - The twig object containing leaves.
   * @param {string} targetType - The target type.
   * @param {StrategyOptions} [opt] - The strategy options.
   * @returns {object} Result object with nodes and flags.
   */
  #findEntryNodes(twig, targetType, opt = {}) {
    const { leaves } = twig;
    const [leaf] = leaves;
    const filterLeaves = this.getFilterLeaves(leaves);
    const { complex = false, dir = import_constant.DIR_PREV } = opt;
    const precede = dir === import_constant.DIR_NEXT && this.node.nodeType === import_constant.ELEMENT_NODE && (this.node !== this.root || !this.node.isConnected);
    switch (leaf.type) {
      case import_constant.PS_ELEMENT_SELECTOR: {
        return this.#findEntryNodesForPseudoElement(
          leaf,
          filterLeaves,
          targetType,
          opt
        );
      }
      case import_constant.ID_SELECTOR: {
        return this.#findEntryNodesForId(twig, targetType, {
          complex,
          precede,
          filterLeaves
        });
      }
      case import_constant.CLASS_SELECTOR: {
        return this.#findEntryNodesForClass(leaves, targetType, {
          complex,
          precede,
          filterLeaves
        });
      }
      case import_constant.TYPE_SELECTOR: {
        return this.#findEntryNodesForType(leaves, targetType, {
          complex,
          precede,
          filterLeaves
        });
      }
      default: {
        return this.#findEntryNodesForOther(twig, targetType, {
          complex,
          precede,
          filterLeaves
        });
      }
    }
  }
  /**
   * Finds entry nodes for pseudo-elements.
   * @private
   * @param {import('css-tree').CssNode} leaf - The AST leaf.
   * @param {Array<object>} filterLeaves - Leaves for filtering.
   * @param {string} targetType - The target type.
   * @param {StrategyOptions} opt - The strategy options.
   * @returns {object} Object with nodes, filtered, and pending flags.
   */
  #findEntryNodesForPseudoElement(leaf, filterLeaves, targetType, opt) {
    const compound = filterLeaves.length > 0;
    if (targetType === import_constant.TARGET_SELF && this.check) {
      const css = (0, import_parser.generateCSS)(leaf);
      this.pseudoElements.push(css);
      if (filterLeaves.length) {
        const [nodes, filtered] = this.matchSelf(filterLeaves);
        return { compound, filtered, nodes, pending: false };
      }
      return { compound, filtered: true, nodes: [this.node], pending: false };
    }
    (0, import_matcher.matchPseudoElementSelector)(leaf.name, leaf.type, opt);
    return { compound, filtered: false, nodes: [], pending: false };
  }
  /**
   * Finds entry nodes using ID selector strategy.
   * @private
   * @param {import('./processor.js').ProcessedBranch} twig - The twig object containing leaves.
   * @param {string} targetType - The target type.
   * @param {StrategyOptions} [opt] - The strategy options.
   * @returns {object} Result object with nodes and flags.
   */
  #findEntryNodesForId(twig, targetType, opt = {}) {
    const { leaves } = twig;
    const { complex, precede, filterLeaves = [] } = opt;
    const compound = filterLeaves.length > 0;
    const earlyResult = this.findSelfOrLinealTarget(
      leaves,
      targetType,
      complex,
      compound
    );
    if (earlyResult) {
      return earlyResult;
    }
    if (targetType === import_constant.TARGET_FIRST && this.root.nodeType !== import_constant.ELEMENT_NODE && this.node.nodeType !== import_constant.ELEMENT_NODE) {
      const [leaf] = leaves;
      const node = this.root.getElementById(leaf.name);
      if (!filterLeaves.length) {
        const nodes = node ? [node] : [];
        return { compound, filtered: nodes.length > 0, nodes, pending: false };
      }
      if (node && this.matchLeaves(filterLeaves, node)) {
        return { compound, filtered: true, nodes: [node], pending: false };
      }
    }
    return this.#findNodesWithWalker(leaves, targetType, precede, compound);
  }
  /**
   * Finds entry nodes using class selector strategy.
   * @private
   * @param {Array<import('css-tree').CssNode>} leaves - The AST leaves.
   * @param {string} targetType - The target type.
   * @param {StrategyOptions} [opt] - The strategy options.
   * @returns {object} Result object with nodes and flags.
   */
  #findEntryNodesForClass(leaves, targetType, opt = {}) {
    const { complex, precede, filterLeaves = [] } = opt;
    const compound = filterLeaves.length > 0;
    const earlyResult = this.findSelfOrLinealTarget(
      leaves,
      targetType,
      complex,
      compound
    );
    if (earlyResult) {
      return earlyResult;
    }
    if (targetType !== import_constant.TARGET_FIRST && !precede && (0, import_utility.canUseFastClassSearch)(this.node)) {
      this.matchLeaves(leaves, this.node);
      const [leaf] = leaves;
      const className = this.getUnescapedName(leaf);
      const collection = this.node.getElementsByClassName(className);
      return this.#filterCollection(collection, filterLeaves, compound);
    }
    return this.#findNodesWithWalker(leaves, targetType, precede, compound);
  }
  /**
   * Finds entry nodes using type selector strategy.
   * @private
   * @param {Array<import('css-tree').CssNode>} leaves - The AST leaves.
   * @param {string} targetType - The target type.
   * @param {StrategyOptions} [opt] - The strategy options.
   * @returns {object} Result object with nodes and flags.
   */
  #findEntryNodesForType(leaves, targetType, opt = {}) {
    const { complex, precede, filterLeaves = [] } = opt;
    const compound = filterLeaves.length > 0;
    const earlyResult = this.findSelfOrLinealTarget(
      leaves,
      targetType,
      complex,
      compound
    );
    if (earlyResult) {
      return earlyResult;
    }
    const [leaf] = leaves;
    const tagName = this.getUnescapedName(leaf);
    if (targetType !== import_constant.TARGET_FIRST && !precede && this.document.contentType === import_constant.MIME_HTML && (0, import_utility.canUseFastTagSearch)(this.node, tagName)) {
      this.matchLeaves(leaves, this.node);
      const collection = this.node.getElementsByTagName(tagName);
      return this.#filterCollection(collection, filterLeaves, compound);
    }
    return this.#findNodesWithWalker(leaves, targetType, precede, compound);
  }
  /**
   * Finds entry nodes for other selector types.
   * @private
   * @param {import('./processor.js').ProcessedBranch} twig - The twig object containing leaves.
   * @param {string} targetType - The target type.
   * @param {StrategyOptions} [opt] - The strategy options.
   * @returns {object} Result object with nodes and flags.
   */
  #findEntryNodesForOther(twig, targetType, opt = {}) {
    const { leaves } = twig;
    const [leaf] = leaves;
    const { complex, precede, filterLeaves = [] } = opt;
    const compound = filterLeaves.length > 0;
    if (targetType !== import_constant.TARGET_LINEAL && /host(?:-context)?/.test(leaf.name)) {
      let shadowRoot = null;
      if (this.shadow && this.node.nodeType === import_constant.DOCUMENT_FRAGMENT_NODE && this.evaluateShadowHost(leaf, this.node)) {
        shadowRoot = this.node;
      } else if (filterLeaves.length && this.node.nodeType === import_constant.ELEMENT_NODE && this.evaluateShadowHost(leaf, this.node.shadowRoot)) {
        shadowRoot = this.node.shadowRoot;
      }
      if (shadowRoot) {
        let bool = true;
        const l = filterLeaves.length;
        for (let i = 0; i < l; i++) {
          const filterLeaf = filterLeaves[i];
          switch (filterLeaf.name) {
            case "host":
            case "host-context": {
              bool = this.evaluateShadowHost(filterLeaf, shadowRoot);
              break;
            }
            case "has": {
              bool = this.matchPseudoClassSelector(filterLeaf, shadowRoot, {});
              break;
            }
            default: {
              bool = false;
            }
          }
          if (!bool) {
            break;
          }
        }
        const nodes = [];
        if (bool) {
          nodes.push(shadowRoot);
        }
        return { compound, filtered: nodes.length > 0, nodes, pending: false };
      }
    }
    const earlyResult = this.findSelfOrLinealTarget(
      leaves,
      targetType,
      complex,
      compound
    );
    if (earlyResult) {
      return earlyResult;
    }
    if (targetType === import_constant.TARGET_FIRST || leaf.type === import_constant.ATTR_SELECTOR && !compound) {
      return this.#findNodesWithWalker(leaves, targetType, precede, compound);
    }
    return { compound, filtered: false, nodes: [], pending: true };
  }
  /**
   * Processes pending items to find matches.
   * @private
   * @param {Set<{index: number, twig: import('./processor.js').ProcessedBranch}>} pendingItems - Set of pending items to process.
   * @returns {void}
   */
  #processPendingItems(pendingItems) {
    if (!pendingItems.size) {
      return;
    }
    const node = this.#scoped ? this.node : this.root;
    const walker = this.createTreeWalker(this.root);
    let nextNode = (0, import_utility.traverseNode)(node, walker);
    while (nextNode) {
      const isWithinScope = this.node.nodeType !== import_constant.ELEMENT_NODE || nextNode === this.node || this.node.contains(nextNode);
      if (isWithinScope) {
        for (const pendingItem of pendingItems) {
          const { leaves } = pendingItem.twig;
          if (this.matchLeaves(leaves, nextNode)) {
            const { index } = pendingItem;
            this.#ast[index].filtered = true;
            this.#ast[index].find = true;
            this.#nodes[index].push(nextNode);
          }
        }
      } else if (this.#scoped) {
        break;
      }
      nextNode = walker.nextNode();
    }
  }
  /**
   * Standardizes the loop processing and filtering of a collection.
   * @private
   * @param {object} collection - The HTMLCollection or NodeList to process.
   * @param {Array<object>} filterLeaves - Leaves for filtering.
   * @param {boolean} compound - Indicates if there are filter leaves.
   * @returns {object} Result object with nodes and flags.
   */
  #filterCollection(collection, filterLeaves, compound) {
    const len = collection.length;
    const hasFilter = filterLeaves.length > 0;
    const nodeArray = [];
    for (let i = 0; i < len; i++) {
      const currentNode = collection[i];
      if (!hasFilter || this.matchLeaves(filterLeaves, currentNode)) {
        nodeArray.push(currentNode);
      }
    }
    return {
      compound,
      filtered: nodeArray.length > 0,
      nodes: nodeArray,
      pending: false
    };
  }
  /**
   * Returns the fallback search result using NodeWalker.
   * @private
   * @param {Array<import('css-tree').CssNode>} leaves - The AST leaves.
   * @param {string} targetType - The target type.
   * @param {boolean} precede - Indicates if searching preceding nodes.
   * @param {boolean} compound - Indicates if there are filter leaves.
   * @returns {object} Result object with nodes and flags.
   */
  #findNodesWithWalker(leaves, targetType, precede, compound) {
    const nodes = this.findNodeWalker(leaves, this.node, {
      precede,
      targetType
    });
    return { compound, filtered: nodes.length > 0, nodes, pending: false };
  }
}
