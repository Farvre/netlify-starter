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
  DOMTraverser: () => DOMTraverser
});
module.exports = __toCommonJS(stdin_exports);
var import_matcher = require("./matcher.js");
var import_utility = require("./utility.js");
var import_constant = require("./constant.js");
class DOMTraverser {
  #evaluator;
  #walkers;
  /**
   * @param {import('./evaluator.js').Evaluator} evaluator - The Evaluator instance.
   */
  constructor(evaluator) {
    this.#evaluator = evaluator;
  }
  /**
   * Resets the traversal state.
   * @returns {void}
   */
  reset() {
    this.#walkers = null;
  }
  /**
   * Creates a TreeWalker.
   * @param {Document|DocumentFragment|Element} node - The Document, DocumentFragment, or Element node.
   * @param {object} [opt] - Options.
   * @param {boolean} [opt.force] - Force creation of a new TreeWalker.
   * @param {number} [opt.whatToShow] - The NodeFilter whatToShow value.
   * @returns {TreeWalker} The TreeWalker object.
   */
  createTreeWalker(node, opt = {}) {
    const { force = false, whatToShow = import_constant.SHOW_CONTAINER } = opt;
    if (force) {
      return this.#evaluator.document.createTreeWalker(node, whatToShow);
    }
    if (!this.#walkers) {
      this.#walkers = /* @__PURE__ */ new WeakMap();
    }
    let walker = this.#walkers.get(node);
    if (walker) {
      return walker;
    }
    walker = this.#evaluator.document.createTreeWalker(node, whatToShow);
    this.#walkers.set(node, walker);
    return walker;
  }
  /**
   * Finds matching nodes using TreeWalker.
   * @param {Array<import('css-tree').CssNode>} leaves - The AST leaves.
   * @param {Element} node - The starting node.
   * @param {TraversalOptions} [opt] - The traversal options.
   * @returns {Array<Element>} An array of matched nodes.
   */
  findNodeWalker(leaves, node, opt = {}) {
    const { precede, ...traversalOpts } = opt;
    if (precede) {
      const precedeNodes = this.findPrecede(leaves, this.#evaluator.root, opt);
      if (precedeNodes.length) {
        return precedeNodes;
      }
    }
    const walker = this.createTreeWalker(this.#evaluator.node);
    return this.traverseAndCollectNodes(walker, leaves, {
      ...traversalOpts,
      startNode: node
    });
  }
  /**
   * Finds matching nodes preceding the current node.
   * @param {Array<import('css-tree').CssNode>} leaves - The AST leaves to match.
   * @param {Element} node - The starting node.
   * @param {TraversalOptions} [opt] - The traversal options.
   * @returns {Array<Element>} An array of matched nodes.
   */
  findPrecede(leaves, node, opt = {}) {
    const { force, targetType } = opt;
    const walker = this.createTreeWalker(this.#evaluator.root);
    return this.traverseAndCollectNodes(walker, leaves, {
      boundaryNode: this.#evaluator.node,
      force,
      targetType,
      startNode: node
    });
  }
  /**
   * Traverses and collects nodes matching leaves.
   * @param {TreeWalker} walker - The TreeWalker instance.
   * @param {Array<import('css-tree').CssNode>} leaves - The AST leaves to match.
   * @param {TraversalOptions} [opt] - The traversal options.
   * @returns {Array<Element>} An array of collected nodes.
   */
  traverseAndCollectNodes(walker, leaves, opt = {}) {
    const { boundaryNode, force, startNode, targetType } = opt;
    const collectedNodes = [];
    if (targetType === import_constant.TARGET_ALL && boundaryNode && this.#evaluator.matchLeaves(leaves, boundaryNode)) {
      collectedNodes.push(boundaryNode);
    }
    let currentNode = (0, import_utility.traverseNode)(startNode, walker, !!force);
    if (currentNode.nodeType !== import_constant.ELEMENT_NODE) {
      currentNode = walker.nextNode();
    } else if (currentNode === startNode && currentNode !== this.#evaluator.root) {
      currentNode = walker.nextNode();
    }
    while (currentNode) {
      if (boundaryNode) {
        if (currentNode === boundaryNode) {
          if (targetType !== import_constant.TARGET_ALL) {
            break;
          }
        } else if (targetType === import_constant.TARGET_ALL && !boundaryNode.contains(currentNode)) {
          break;
        }
      }
      if (this.#evaluator.matchLeaves(leaves, currentNode) && currentNode !== this.#evaluator.node) {
        collectedNodes.push(currentNode);
        if (targetType !== import_constant.TARGET_ALL) {
          break;
        }
      }
      currentNode = walker.nextNode();
    }
    return collectedNodes;
  }
  /**
   * Processes complex branch for all matches.
   * @param {Array<import('./processor.js').ProcessedBranch>} branch - The selector branch.
   * @param {Array<Element>} entryNodes - The entry nodes.
   * @param {string} dir - The traversal direction.
   * @returns {Set<Element>} Set of matched nodes.
   */
  processComplexBranchAll(branch, entryNodes, dir) {
    const matchedNodes = /* @__PURE__ */ new Set();
    const branchLen = branch.length;
    const lastIndex = branchLen - 1;
    if (dir === import_constant.DIR_NEXT) {
      const { combo: firstCombo } = branch[0];
      for (const node of entryNodes) {
        this.matchComplexBranchNext(
          node,
          1,
          firstCombo,
          branch,
          lastIndex,
          matchedNodes,
          dir
        );
      }
    } else {
      for (const node of entryNodes) {
        if (this.matchComplexBranchPrev(node, branch, lastIndex - 1)) {
          matchedNodes.add(node);
        }
      }
    }
    return matchedNodes;
  }
  /**
   * Depth-first search for tracking complex combinator branches forward.
   * @param {Element} node - The current DOM node.
   * @param {number} index - The current index in the selector branch.
   * @param {import('css-tree').CssNode|null} currentCombo - The current combinator AST node.
   * @param {Array<import('./processor.js').ProcessedBranch>} branch - The selector branch array.
   * @param {number} lastIndex - The last index of the branch.
   * @param {Set<Element>} matchedNodes - The set accumulating matched nodes.
   * @param {string} dir - The traversal direction.
   * @returns {void}
   */
  matchComplexBranchNext(node, index, currentCombo, branch, lastIndex, matchedNodes, dir) {
    const { combo: nextCombo, leaves } = branch[index];
    const twig = { combo: currentCombo, leaves };
    for (const nextNode of this.yieldCombinatorMatches(twig, node, { dir })) {
      if (index === lastIndex) {
        matchedNodes.add(nextNode);
      } else {
        this.matchComplexBranchNext(
          nextNode,
          index + 1,
          nextCombo,
          branch,
          lastIndex,
          matchedNodes,
          dir
        );
      }
    }
  }
  /**
   * Processes complex branch for the first match.
   * @param {Array<import('./processor.js').ProcessedBranch>} branch - The selector branch.
   * @param {Array<Element>} entryNodes - The entry nodes.
   * @param {string} dir - The traversal direction.
   * @param {string} targetType - The target type.
   * @returns {Element|null} The matched node or null.
   */
  processComplexBranchFirst(branch, entryNodes, dir, targetType) {
    const branchLen = branch.length;
    const lastIndex = branchLen - 1;
    if (dir === import_constant.DIR_NEXT) {
      return this.processComplexBranchFirstNext(branch, entryNodes, targetType);
    } else {
      return this.processComplexBranchFirstPrev(
        branch,
        entryNodes,
        targetType,
        lastIndex
      );
    }
  }
  /**
   * Processes complex branch first match in the backward direction.
   * @param {Array<import('./processor.js').ProcessedBranch>} branch - The selector branch.
   * @param {Array<Element>} entryNodes - The entry nodes.
   * @param {string} targetType - The target type.
   * @param {number} lastIndex - The last index of the branch.
   * @returns {Element|null} The matched node or null if not found.
   */
  processComplexBranchFirstPrev(branch, entryNodes, targetType, lastIndex) {
    for (const node of entryNodes) {
      if (this.matchComplexBranchPrev(node, branch, lastIndex - 1)) {
        return node;
      }
    }
    if (targetType === import_constant.TARGET_FIRST) {
      const { leaves: entryLeaves } = branch[lastIndex];
      const entryNode = entryNodes[0];
      let [refNode] = this.findNodeWalker(entryLeaves, entryNode, {
        targetType
      });
      while (refNode) {
        if (this.matchComplexBranchPrev(refNode, branch, lastIndex - 1)) {
          return refNode;
        }
        [refNode] = this.findNodeWalker(entryLeaves, refNode, {
          targetType,
          force: true
        });
      }
    }
    return null;
  }
  /**
   * Recursively checks for a valid backward path.
   * @param {Element} node - The starting node.
   * @param {Array<import('./processor.js').ProcessedBranch>} branch - The selector branch.
   * @param {number} index - The current branch index.
   * @returns {boolean} True if a valid path exists, otherwise false.
   */
  matchComplexBranchPrev(node, branch, index) {
    if (index < 0) {
      return true;
    }
    const twig = branch[index];
    const { combo, leaves } = twig;
    const comboName = combo.name;
    if (comboName === "+") {
      const refNode = node.previousElementSibling;
      if (refNode && this.#evaluator.matchLeaves(leaves, refNode) && this.matchComplexBranchPrev(refNode, branch, index - 1)) {
        return true;
      }
    } else if (comboName === "~") {
      let refNode = node.previousElementSibling;
      while (refNode) {
        if (this.#evaluator.matchLeaves(leaves, refNode) && this.matchComplexBranchPrev(refNode, branch, index - 1)) {
          return true;
        }
        refNode = refNode.previousElementSibling;
      }
    } else if (comboName === ">") {
      const parentNode = node.parentNode;
      if (parentNode && this.#evaluator.matchLeaves(leaves, parentNode) && this.matchComplexBranchPrev(parentNode, branch, index - 1)) {
        return true;
      }
    } else {
      let refNode = node.parentNode;
      while (refNode) {
        if (this.#evaluator.matchLeaves(leaves, refNode) && this.matchComplexBranchPrev(refNode, branch, index - 1)) {
          return true;
        }
        refNode = refNode.parentNode;
      }
    }
    return false;
  }
  /**
   * Processes complex branch first match in the forward direction.
   * @param {Array<import('./processor.js').ProcessedBranch>} branch - The selector branch.
   * @param {Array<Element>} entryNodes - The entry nodes.
   * @param {string} targetType - The target type.
   * @returns {Element|null} The matched node or null if not found.
   */
  processComplexBranchFirstNext(branch, entryNodes, targetType) {
    const { combo: entryCombo } = branch[0];
    for (const node of entryNodes) {
      const matchedNode = this.matchNodeNext(node, branch, 1, entryCombo);
      if (matchedNode) {
        if (this.#evaluator.node.nodeType === import_constant.ELEMENT_NODE) {
          if (matchedNode !== this.#evaluator.node && this.#evaluator.node.contains(matchedNode)) {
            return matchedNode;
          }
        } else {
          return matchedNode;
        }
      }
    }
    const { leaves: entryLeaves } = branch[0];
    const [entryNode] = entryNodes;
    if (this.#evaluator.node.contains(entryNode)) {
      let [refNode] = this.findNodeWalker(entryLeaves, entryNode, {
        targetType
      });
      while (refNode) {
        const matchedNode = this.matchNodeNext(refNode, branch, 1, entryCombo);
        if (matchedNode) {
          return matchedNode;
        }
        [refNode] = this.findNodeWalker(entryLeaves, refNode, {
          targetType,
          force: true
        });
      }
    }
    return null;
  }
  /**
   * Matches a node in the next direction.
   * @param {Element} node - The starting node.
   * @param {Array<import('./processor.js').ProcessedBranch>} branch - The selector branch.
   * @param {number} index - The branch index.
   * @param {object} combo - The combinator AST.
   * @returns {Element|null} The matched node or null.
   */
  matchNodeNext(node, branch, index, combo) {
    const { combo: nextCombo, leaves } = branch[index];
    const twig = {
      combo,
      leaves
    };
    for (const nextNode of this.yieldCombinatorMatches(twig, node, {
      dir: import_constant.DIR_NEXT
    })) {
      if (index === branch.length - 1) {
        return nextNode;
      }
      const result = this.matchNodeNext(nextNode, branch, index + 1, nextCombo);
      if (result) {
        return result;
      }
    }
    return null;
  }
  /**
   * Yields combinator matches.
   * @param {import('./processor.js').ProcessedBranch} twig - The twig object.
   * @param {Element} node - The Element node.
   * @param {import('../index.js').FindOptions} [opt] - Options.
   * @yields {Element} The matched node.
   */
  *yieldCombinatorMatches(twig, node, opt = {}) {
    const {
      combo: { name: comboName },
      leaves
    } = twig;
    const { dir } = opt;
    switch (comboName) {
      case "+": {
        const refNode = dir === import_constant.DIR_NEXT ? node.nextElementSibling : node.previousElementSibling;
        if (refNode && this.#evaluator.matchLeaves(leaves, refNode, opt)) {
          yield refNode;
        }
        break;
      }
      case "~": {
        let refNode = dir === import_constant.DIR_NEXT ? node.nextElementSibling : node.previousElementSibling;
        while (refNode) {
          if (this.#evaluator.matchLeaves(leaves, refNode, opt)) {
            yield refNode;
          }
          refNode = dir === import_constant.DIR_NEXT ? refNode.nextElementSibling : refNode.previousElementSibling;
        }
        break;
      }
      case ">": {
        if (dir === import_constant.DIR_NEXT) {
          let refNode = node.firstElementChild;
          while (refNode) {
            if (this.#evaluator.matchLeaves(leaves, refNode, opt)) {
              yield refNode;
            }
            refNode = refNode.nextElementSibling;
          }
        } else {
          const { parentNode } = node;
          if (parentNode && this.#evaluator.matchLeaves(leaves, parentNode, opt)) {
            yield parentNode;
          }
        }
        break;
      }
      case " ":
      default: {
        if (dir === import_constant.DIR_NEXT) {
          for (const refNode of this.yieldDescendantMatches(
            leaves,
            node,
            opt
          )) {
            yield refNode;
          }
        } else {
          const ancestors = [];
          let refNode = node.parentNode;
          while (refNode) {
            if (this.#evaluator.matchLeaves(leaves, refNode, opt)) {
              ancestors.push(refNode);
            }
            refNode = refNode.parentNode;
          }
          if (ancestors.length) {
            for (let i = ancestors.length - 1; i >= 0; i--) {
              yield ancestors[i];
            }
          }
        }
      }
    }
  }
  /**
   * Finds descendant nodes and yields matches.
   * @param {Array<object>} leaves - The AST leaves.
   * @param {DocumentFragment|Element} baseNode - The base Element node or Element.shadowRoot.
   * @param {import('../index.js').FindOptions} opt - Options.
   * @yields {Element} The matched node.
   */
  *yieldDescendantMatches(leaves, baseNode, opt) {
    const [leaf] = leaves;
    const { type: leafType } = leaf;
    const leafName = this.#evaluator.getUnescapedName(leaf);
    const filterLeaves = this.#evaluator.getFilterLeaves(leaves);
    const isSimple = filterLeaves.length === 0;
    switch (leafType) {
      case import_constant.ID_SELECTOR: {
        if ((0, import_utility.canUseFastIdSearch)(baseNode, this.#evaluator.root)) {
          const foundNode = this.#evaluator.root.getElementById(leafName);
          if (foundNode && foundNode !== baseNode && baseNode.contains(foundNode)) {
            if (isSimple || this.#evaluator.matchLeaves(filterLeaves, foundNode, opt)) {
              yield foundNode;
              return;
            }
          }
          break;
        }
        break;
      }
      case import_constant.CLASS_SELECTOR: {
        if ((0, import_utility.canUseFastClassSearch)(baseNode)) {
          const collection = baseNode.getElementsByClassName(leafName);
          for (let i = 0, len = collection.length; i < len; i++) {
            const item = collection[i];
            if (isSimple || this.#evaluator.matchLeaves(filterLeaves, item, opt)) {
              yield item;
            }
          }
          return;
        }
        break;
      }
      case import_constant.TYPE_SELECTOR: {
        if ((0, import_utility.canUseFastTagSearch)(baseNode, leafName)) {
          const collection = baseNode.getElementsByTagName(leafName);
          for (let i = 0, len = collection.length; i < len; i++) {
            const item = collection[i];
            if (isSimple || this.#evaluator.matchLeaves(filterLeaves, item, opt)) {
              yield item;
            }
          }
          return;
        }
        break;
      }
      case import_constant.PS_ELEMENT_SELECTOR: {
        (0, import_matcher.matchPseudoElementSelector)(leafName, leafType, opt);
        return;
      }
      default: {
      }
    }
    yield* this.yieldFallbackDescendantMatches(baseNode, leaves, opt);
  }
  /**
   * Traverses all descendant nodes and yields matches.
   * @param {DocumentFragment|Element} baseNode - The base Element node or Element.shadowRoot.
   * @param {Array<object>} leaves - The AST leaves.
   * @param {import('../index.js').FindOptions} opt - Options.
   * @yields {Element} The matched node.
   */
  *yieldFallbackDescendantMatches(baseNode, leaves, opt) {
    const walker = this.createTreeWalker(baseNode);
    (0, import_utility.traverseNode)(baseNode, walker);
    let currentNode = walker.firstChild();
    while (currentNode) {
      if (this.#evaluator.matchLeaves(leaves, currentNode, opt)) {
        yield currentNode;
      }
      currentNode = walker.nextNode();
    }
  }
}
