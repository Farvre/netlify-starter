var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  createHasValidator: () => createHasValidator,
  filterSelector: () => filterSelector,
  findLogicalWithNestedHas: () => findLogicalWithNestedHas,
  findNestedHas: () => findNestedHas,
  isInvalidCombinator: () => isInvalidCombinator,
  isSupportedAST: () => isSupportedAST,
  validateHasNesting: () => validateHasNesting
});
module.exports = __toCommonJS(stdin_exports);
var import_walker = __toESM(require("css-tree/walker"));
var import_generator = __toESM(require("css-tree/generator"));
var import_utility = require("./utility.js");
var import_constant = require("./constant.js");
const REG_EXCLUDE_BASIC = /[|\\]|::|[^\u0021-\u007F\s]|\[\s*[\w$*=^|~-]+(?:(?:"[\w$*=^|~\s'-]+"|'[\w$*=^|~\s"-]+')?(?:\s+[\w$*=^|~-]+)+|"[^"\]]{1,255}|'[^'\]]{1,255})\s*\]|:(?:is|where)\(\s*\)|\[\s*data-/;
const REG_HAS = /has\(/i;
const REG_IS_NOT = /(?:is|not)\(/i;
const REG_COMPLEX = new RegExp(`${import_constant.COMPOUND_I}${import_constant.COMBO}${import_constant.COMPOUND_I}`, "i");
const REG_LOGIC_COMPLEX = new RegExp(
  `:(?!${import_constant.PSEUDO_CLASS}|${import_constant.N_TH}|${import_constant.LOGIC_COMPLEX})`,
  "i"
);
const REG_LOGIC_COMPOUND = new RegExp(
  `:(?!${import_constant.PSEUDO_CLASS}|${import_constant.N_TH}|${import_constant.LOGIC_COMPOUND})`,
  "i"
);
const REG_LOGIC_HAS_COMPOUND = new RegExp(
  `:(?!${import_constant.PSEUDO_CLASS}|${import_constant.N_TH}|${import_constant.LOGIC_COMPOUND}|${import_constant.HAS_COMPOUND})`
);
const REG_END_WITH_HAS = new RegExp(`:${import_constant.HAS_COMPOUND}$`);
const REG_WO_LOGICAL = new RegExp(`:(?!${import_constant.PSEUDO_CLASS}|${import_constant.N_TH})`, "i");
const REG_INVALID_SYNTAX = /[+~>]\s*[+~>]|^\s*[+~>]|[+~>]\s*$|^\s*,|,\s*,|,\s*$/;
const REG_UPPERCASE_TAG = /(?:^|[\s>+~,])[a-z\d-]*[A-Z][a-zA-Z\d-]*(?=[#.:[\s>+~,]|$)/;
const findNestedHas = (leaf) => leaf.name === "has";
const findLogicalWithNestedHas = (leaf) => {
  if (import_constant.KEYS_LOGICAL.has(leaf.name) && import_walker.default.find(leaf, findNestedHas)) {
    return leaf;
  }
  return null;
};
const validateHasNesting = (astChildren) => {
  const l = astChildren.length;
  for (let i = 0; i < l; i++) {
    const item = import_walker.default.find(astChildren[i], findLogicalWithNestedHas);
    if (item) {
      if (item.name !== "is" && item.name !== "where") {
        return false;
      }
    }
  }
  return true;
};
const createHasValidator = (globalObj) => (node) => {
  if (node.type === import_constant.PS_CLASS_SELECTOR && node.name.toLowerCase() === "has" && !validateHasNesting(Array.from(node.children || []))) {
    const css = (0, import_generator.default)(node);
    throw (0, import_utility.generateException)(
      `Disallowed nested :has() pseudo-class: ${css}`,
      import_constant.SYNTAX_ERR,
      globalObj
    );
  }
};
const isInvalidCombinator = (type, prevType, isLast) => type === import_constant.COMBINATOR && (prevType === null || prevType === import_constant.COMBINATOR || isLast);
const isSupportedAST = (ast) => {
  let isSupported = true;
  const walk = (node, context = { insideHas: false, insideForgiving: false }) => {
    if (!isSupported || !node) {
      return;
    }
    const nextContext = { ...context };
    if (node.type === import_constant.PS_ELEMENT_SELECTOR) {
      isSupported = false;
      return;
    } else if (node.type === import_constant.PS_CLASS_SELECTOR) {
      let name = node.name;
      if (name && typeof name === "string") {
        name = name.toLowerCase();
      }
      if (!import_constant.KEYS_PS_CLASS_SUPPORTED.has(name)) {
        isSupported = false;
        return;
      }
      if (name === "has") {
        if (context.insideHas && !context.insideForgiving) {
          isSupported = false;
          return;
        }
        nextContext.insideHas = true;
      } else if (name === "is" || name === "where") {
        nextContext.insideForgiving = true;
      }
    }
    if (node.children) {
      let prevType = null;
      if (node.children.head !== void 0) {
        let current = node.children.head;
        while (current) {
          if (!current.data) {
            current = current.next;
            continue;
          }
          const childType = current.data.type;
          if (node.type === import_constant.SELECTOR && isInvalidCombinator(childType, prevType, !current.next)) {
            if (!(prevType === null && context.insideHas)) {
              isSupported = false;
              return;
            }
          }
          prevType = childType;
          walk(current.data, nextContext);
          if (!isSupported) {
            return;
          }
          current = current.next;
        }
      } else if (Array.isArray(node.children)) {
        const l = node.children.length;
        for (let i = 0; i < l; i++) {
          const child = node.children[i];
          if (!child) {
            continue;
          }
          const childType = child.type;
          if (node.type === import_constant.SELECTOR && isInvalidCombinator(childType, prevType, i === l - 1)) {
            if (!(prevType === null && context.insideHas)) {
              isSupported = false;
              return;
            }
          }
          prevType = childType;
          walk(child, nextContext);
          if (!isSupported) {
            return;
          }
        }
      }
    }
    if (node.selector) {
      walk(node.selector, nextContext);
    }
  };
  walk(ast);
  return isSupported;
};
const filterSelector = (selector, target) => {
  if (!selector || typeof selector !== "string" || selector === "null" || selector === "undefined") {
    return false;
  }
  if (target === import_constant.TARGET_ALL || target === import_constant.TARGET_FIRST) {
    return false;
  }
  if (REG_INVALID_SYNTAX.test(selector)) {
    return false;
  }
  if (selector.includes("/") || selector.includes("&") || REG_EXCLUDE_BASIC.test(selector) || REG_UPPERCASE_TAG.test(selector)) {
    return false;
  }
  if (selector.includes("[")) {
    const index = selector.lastIndexOf("[");
    if (selector.indexOf("]", index) === -1) {
      return false;
    }
  }
  if (selector.includes(":")) {
    const isComplex = REG_COMPLEX.test(selector);
    if (REG_HAS.test(selector)) {
      if (!isComplex || REG_LOGIC_HAS_COMPOUND.test(selector)) {
        return false;
      }
      return REG_END_WITH_HAS.test(selector);
    }
    if (REG_IS_NOT.test(selector)) {
      if (isComplex) {
        return !REG_LOGIC_COMPLEX.test(selector);
      }
      return !REG_LOGIC_COMPOUND.test(selector);
    }
    if (REG_WO_LOGICAL.test(selector)) {
      return false;
    }
  }
  return true;
};
