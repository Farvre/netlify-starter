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
  SelectorProcessor: () => SelectorProcessor
});
module.exports = __toCommonJS(stdin_exports);
var import_parser = require("./parser.js");
var import_selector = require("./selector.js");
var import_utility = require("./utility.js");
var import_constant = require("./constant.js");
class SelectorProcessor {
  #context;
  /**
   * @param {import('./finder.js').Finder} context - The Finder instance.
   */
  constructor(context) {
    this.#context = context;
  }
  /**
   * Processes selector branches into the internal AST.
   * @param {Array<Array<import('css-tree').CssNode>>} branches - The raw selector branches.
   * @param {string} selector - The original CSS selector string.
   * @returns {{ast: Array<ProcessedASTNode>, descendant: boolean, invalidate?: boolean}} An object containing the ast, a descendant flag, and an optional invalidate flag.
   */
  process(branches, selector) {
    let descendant = false;
    const ast = [];
    for (const items of branches) {
      const branch = [];
      let prevType = null;
      const itemsLen = items.length;
      if (itemsLen) {
        const leaves = /* @__PURE__ */ new Set();
        for (let j = 0; j < itemsLen; j++) {
          const item = items[j];
          const isLast = j === itemsLen - 1;
          if ((0, import_selector.isInvalidCombinator)(item.type, prevType, isLast)) {
            const msg = `Invalid selector ${selector}`;
            this.#context.onError(
              (0, import_utility.generateException)(msg, import_constant.SYNTAX_ERR, this.#context.window)
            );
            return { ast: [], descendant: false, invalidate: false };
          }
          if (item.type === import_constant.COMBINATOR) {
            if (item.name === " " || item.name === ">") {
              descendant = true;
            }
            branch.push({ combo: item, leaves: (0, import_parser.sortAST)(leaves) });
            leaves.clear();
          } else {
            if (item.name && typeof item.name === "string") {
              const unescapedName = (0, import_parser.unescapeSelector)(item.name);
              if (unescapedName !== item.name) {
                item.name = unescapedName;
              }
              if (/[|:]/.test(unescapedName)) {
                item.namespace = true;
              }
            }
            leaves.add(item);
          }
          prevType = item.type;
          if (isLast) {
            branch.push({ combo: null, leaves: (0, import_parser.sortAST)(leaves) });
            leaves.clear();
          }
        }
      }
      ast.push({ branch, dir: null, filtered: false, find: false });
    }
    return { ast, descendant };
  }
}
