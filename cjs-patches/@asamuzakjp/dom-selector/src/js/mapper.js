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
  Mapper: () => Mapper
});
module.exports = __toCommonJS(stdin_exports);
var import_lru_cache = require("lru-cache");
var import_processor = require("./processor.js");
var import_parser = require("./parser.js");
var import_selector = require("./selector.js");
var import_constant = require("./constant.js");
class Mapper {
  #context;
  #processor;
  /**
   * @param {import('./finder.js').Finder} context - The Finder instance.
   */
  constructor(context) {
    this.#context = context;
    this.#processor = new import_processor.SelectorProcessor(context);
  }
  /**
   * Gets the corresponding AST, nodes array, invalidate flag, and selector AST.
   * @param {string} selector - The CSS selector string.
   * @returns {MapperResult} The MapperResult object.
   */
  correspond(selector) {
    const ctx = this.#context;
    let ast = null;
    let invalidate = false;
    let selectorAST = null;
    if (ctx.documentCache.has(ctx.document)) {
      const cachedItem2 = ctx.documentCache.get(ctx.document);
      const item = cachedItem2.get(selector);
      if (item) {
        ast = item.ast;
        invalidate = item.invalidate;
        selectorAST = item.selectorAST;
      }
    }
    if (ast) {
      return this.#prepareResult(ast, invalidate, selectorAST);
    }
    selectorAST = (0, import_parser.parseSelector)(selector);
    const { branches, info } = (0, import_parser.walkAST)(
      selectorAST,
      true,
      (0, import_selector.createHasValidator)(ctx.window)
    );
    const {
      hasHasPseudoFunc,
      hasNestingSelector,
      hasNthChildOfSelector,
      hasSiblingCombinator,
      hasStatePseudoClass,
      hasUnsupportedPseudoClass
    } = info;
    invalidate = hasHasPseudoFunc || hasNestingSelector || hasNthChildOfSelector || hasSiblingCombinator || hasStatePseudoClass || hasUnsupportedPseudoClass;
    const processed = this.#processor.process(branches, selector);
    ast = processed.ast;
    const descendant = processed.descendant;
    let cachedItem;
    if (ctx.documentCache.has(ctx.document)) {
      cachedItem = ctx.documentCache.get(ctx.document);
    } else {
      cachedItem = new import_lru_cache.LRUCache({
        max: ctx.documentCacheSize ?? import_constant.CACHE_SIZE
      });
      ctx.documentCache.set(ctx.document, cachedItem);
    }
    cachedItem.set(selector, {
      ast,
      descendant,
      invalidate,
      selectorAST
    });
    return this.#prepareResult(ast, invalidate, selectorAST);
  }
  /**
   * Prepares fresh AST nodes and initialized matching nodes array.
   * @private
   * @param {Array<import('./processor.js').ProcessedASTNode>} ast - The cached or parsed AST.
   * @param {boolean} invalidate - Invalidation flag for dynamic evaluation.
   * @param {import('css-tree').CssNode} selectorAST - The parsed CSS selector AST.
   * @returns {MapperResult} The MapperResult object.
   */
  #prepareResult(ast, invalidate, selectorAST) {
    const l = ast.length;
    const freshAst = new Array(l);
    const nodes = new Array(l);
    for (let i = 0; i < l; i++) {
      freshAst[i] = {
        branch: ast[i].branch,
        dir: null,
        filtered: false,
        find: false
      };
      nodes[i] = [];
    }
    return { ast: freshAst, invalidate, nodes, selectorAST };
  }
}
