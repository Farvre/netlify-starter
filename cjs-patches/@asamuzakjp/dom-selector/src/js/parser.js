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
  compareASTNodes: () => compareASTNodes,
  extractSubjectsAst: () => extractSubjectsAst,
  findAST: () => findAST,
  generateCSS: () => generateCSS,
  parseAstName: () => parseAstName,
  parseSelector: () => parseSelector,
  preprocess: () => preprocess,
  sortAST: () => sortAST,
  unescapeSelector: () => unescapeSelector,
  walkAST: () => walkAST
});
module.exports = __toCommonJS(stdin_exports);
var import_selector_parser = __toESM(require("css-tree/selector-parser"));
var import_walker = __toESM(require("css-tree/walker"));
var import_convertor = __toESM(require("css-tree/convertor"));
var import_utils = require("css-tree/utils");
var import_generator = __toESM(require("css-tree/generator"));
var import_utility = require("./utility.js");
var import_constant = require("./constant.js");
const AST_SORT_ORDER = /* @__PURE__ */ new Map([
  [import_constant.PS_ELEMENT_SELECTOR, import_constant.BIT_01],
  [import_constant.ID_SELECTOR, import_constant.BIT_02],
  [import_constant.CLASS_SELECTOR, import_constant.BIT_04],
  [import_constant.TYPE_SELECTOR, import_constant.BIT_08],
  [import_constant.ATTR_SELECTOR, import_constant.BIT_16],
  [import_constant.PS_CLASS_SELECTOR, import_constant.BIT_32]
]);
const KEYS_PS_NTH = /* @__PURE__ */ new Set([
  "first-child",
  "first-of-type",
  "last-child",
  "last-of-type",
  "only-child",
  "only-of-type"
]);
const KEYS_PS_CLASS_STATE = /* @__PURE__ */ new Set([
  "checked",
  "closed",
  "disabled",
  "empty",
  "enabled",
  "in-range",
  "indeterminate",
  "invalid",
  "open",
  "out-of-range",
  "placeholder-shown",
  "read-only",
  "read-write",
  "valid",
  ...KEYS_PS_NTH
]);
const KEYS_SHADOW_HOST = /* @__PURE__ */ new Set(["host", "host-context"]);
const U_FFFD = "\uFFFD";
const REG_EMPTY_PS_FUNC = /(?<=:(?:dir|has|host(?:-context)?|is|lang|not|nth-(?:last-)?(?:child|of-type)|where))\(\s+\)/g;
const REG_SHADOW_PS_ELEMENT = /^part|slotted$/;
const unescapeSelector = (selector = "") => {
  if (typeof selector === "string" && selector.indexOf("\\", 0) >= 0) {
    const arr = selector.split("\\");
    const selectorItems = [arr[0]];
    const l = arr.length;
    for (let i = 1; i < l; i++) {
      const item = arr[i];
      if (item === "" && i === l - 1) {
        selectorItems.push(U_FFFD);
      } else if (item === "") {
        selectorItems.push("\\");
        i++;
        if (i < l) {
          selectorItems.push(arr[i]);
        }
      } else {
        const hexExists = /^([\da-f]{1,6}\s?)/i.exec(item);
        if (hexExists) {
          const [, hex] = hexExists;
          let str;
          try {
            const low = parseInt("D800", import_constant.HEX);
            const high = parseInt("DFFF", import_constant.HEX);
            const deci = parseInt(hex, import_constant.HEX);
            if (deci === 0 || deci >= low && deci <= high) {
              str = U_FFFD;
            } else {
              str = String.fromCodePoint(deci);
            }
          } catch (e) {
            str = U_FFFD;
          }
          let postStr = "";
          if (item.length > hex.length) {
            postStr = item.substring(hex.length);
          }
          selectorItems.push(`${str}${postStr}`);
        } else if (/^[\n\r\f]/.test(item)) {
          selectorItems.push(`\\${item}`);
        } else {
          selectorItems.push(item);
        }
      }
    }
    return selectorItems.join("");
  }
  return selector;
};
const preprocess = (value) => {
  let selector = (0, import_utility.stringifyValue)(value);
  let index = 0;
  while (index >= 0) {
    index = selector.indexOf("#", index);
    if (index < 0) {
      break;
    }
    const preHash = selector.substring(0, index + 1);
    let postHash = selector.substring(index + 1);
    const codePoint = postHash.codePointAt(0);
    if (codePoint > import_constant.BIT_FFFF) {
      const str = `\\${codePoint.toString(import_constant.HEX)} `;
      if (postHash.length === import_constant.DUO) {
        postHash = str;
      } else {
        postHash = `${str}${postHash.substring(import_constant.DUO)}`;
      }
    }
    selector = `${preHash}${postHash}`;
    index++;
  }
  selector = selector.replace(/\f|\r\n?/g, "\n").replace(/[\0\uD800-\uDFFF]|\\$/g, U_FFFD);
  if (selector === "&") {
    return "";
  }
  return selector;
};
const parseSelector = (sel, context = "selectorList") => {
  const selector = preprocess(sel);
  if (/^$|^\s*>|,\s*$/.test(selector)) {
    throw new DOMException(`Invalid selector ${selector}`, import_constant.SYNTAX_ERR);
  }
  try {
    return (0, import_selector_parser.default)(selector, { context });
  } catch (e) {
    const { message } = e;
    if (/^(?:"\]"|Attribute selector [()\s,=~^$*|]+) is expected$/.test(
      message
    ) && !selector.endsWith("]")) {
      const index = selector.lastIndexOf("[");
      const selPart = selector.substring(index);
      if (selPart.includes('"')) {
        const quotes = selPart.match(/"/g).length;
        if (quotes % 2) {
          return parseSelector(`${selector}"]`);
        }
        return parseSelector(`${selector}]`);
      }
      return parseSelector(`${selector}]`);
    } else if (message === '")" is expected') {
      if (REG_EMPTY_PS_FUNC.test(selector)) {
        return parseSelector(`${selector.replaceAll(REG_EMPTY_PS_FUNC, "()")}`);
      } else if (!selector.endsWith(")")) {
        return parseSelector(`${selector})`);
      } else {
        throw new DOMException(`Invalid selector ${selector}`, import_constant.SYNTAX_ERR);
      }
    } else {
      throw new DOMException(`Invalid selector ${selector}`, import_constant.SYNTAX_ERR);
    }
  }
};
const walkAST = (ast = {}, toObject = false, callback = null) => {
  const branches = /* @__PURE__ */ new Set();
  const info = {
    hasForgivenPseudoFunc: false,
    hasHasPseudoFunc: false,
    hasLogicalPseudoFunc: false,
    hasNestedSelector: false,
    hasNestingSelector: false,
    hasNotPseudoFunc: false,
    hasNthChildOfSelector: false,
    hasSiblingCombinator: false,
    hasStatePseudoClass: false,
    hasUnsupportedPseudoClass: false
  };
  const opt = {
    enter(node) {
      if (typeof callback === "function") {
        callback(node);
      }
      switch (node.type) {
        case import_constant.CLASS_SELECTOR: {
          if (/^-?\d/.test(node.name)) {
            throw new DOMException(
              `Invalid selector .${node.name}`,
              import_constant.SYNTAX_ERR
            );
          }
          break;
        }
        case import_constant.COMBINATOR: {
          if (/^[+~]$/.test(node.name)) {
            info.hasSiblingCombinator = true;
          }
          break;
        }
        case import_constant.ID_SELECTOR: {
          if (/^-?\d/.test(node.name)) {
            throw new DOMException(
              `Invalid selector #${node.name}`,
              import_constant.SYNTAX_ERR
            );
          }
          break;
        }
        case import_constant.PS_CLASS_SELECTOR: {
          const name = node.name.toLowerCase();
          if (import_constant.KEYS_LOGICAL.has(name)) {
            info.hasNestedSelector = true;
            info.hasLogicalPseudoFunc = true;
            if (name === "has") {
              info.hasHasPseudoFunc = true;
            } else if (name === "not") {
              info.hasNotPseudoFunc = true;
            } else {
              info.hasForgivenPseudoFunc = true;
            }
          } else if (KEYS_PS_CLASS_STATE.has(name)) {
            info.hasStatePseudoClass = true;
          } else if (KEYS_SHADOW_HOST.has(name) && Array.isArray(node.children) && node.children.length) {
            info.hasNestedSelector = true;
          } else if (!import_constant.KEYS_PS_CLASS_SUPPORTED.has(name)) {
            info.hasUnsupportedPseudoClass = true;
          }
          break;
        }
        case import_constant.PS_ELEMENT_SELECTOR: {
          if (REG_SHADOW_PS_ELEMENT.test(node.name)) {
            info.hasNestedSelector = true;
          }
          break;
        }
        case import_constant.NEST_SELECTOR: {
          info.hasNestingSelector = true;
          break;
        }
        case import_constant.NTH: {
          if (node.selector) {
            info.hasNestedSelector = true;
            info.hasNthChildOfSelector = true;
          }
          break;
        }
        case import_constant.SELECTOR: {
          branches.add(node.children);
          break;
        }
        default:
      }
    }
  };
  const clonedAst = (0, import_utils.clone)(ast);
  (0, import_walker.default)(
    toObject ? import_convertor.default.toPlainObject(clonedAst) : clonedAst,
    opt
  );
  if (info.hasNestedSelector === true) {
    import_walker.default.findAll(clonedAst, (node, item, list) => {
      if (list) {
        if (node.type === import_constant.PS_CLASS_SELECTOR && import_constant.KEYS_LOGICAL.has(node.name)) {
          const itemList = list.filter((i) => {
            const { name, type } = i;
            return type === import_constant.PS_CLASS_SELECTOR && import_constant.KEYS_LOGICAL.has(name);
          });
          for (const { children } of itemList) {
            for (const { children: grandChildren } of children) {
              for (const { children: greatGrandChildren } of grandChildren) {
                if (branches.has(greatGrandChildren)) {
                  branches.delete(greatGrandChildren);
                }
              }
            }
          }
        } else if (node.type === import_constant.PS_CLASS_SELECTOR && KEYS_SHADOW_HOST.has(node.name) && Array.isArray(node.children) && node.children.length) {
          const itemList = list.filter((i) => {
            const { children, name, type } = i;
            return type === import_constant.PS_CLASS_SELECTOR && KEYS_SHADOW_HOST.has(name) && Array.isArray(children) && children.length;
          });
          for (const { children } of itemList) {
            for (const { children: grandChildren } of children) {
              if (branches.has(grandChildren)) {
                branches.delete(grandChildren);
              }
            }
          }
        } else if (node.type === import_constant.PS_ELEMENT_SELECTOR && REG_SHADOW_PS_ELEMENT.test(node.name)) {
          const itemList = list.filter((i) => {
            const { name, type } = i;
            return type === import_constant.PS_ELEMENT_SELECTOR && REG_SHADOW_PS_ELEMENT.test(name);
          });
          for (const { children } of itemList) {
            for (const { children: grandChildren } of children) {
              if (branches.has(grandChildren)) {
                branches.delete(grandChildren);
              }
            }
          }
        } else if (node.type === import_constant.NTH && node.selector) {
          const itemList = list.filter((i) => {
            const { selector, type } = i;
            return type === import_constant.NTH && selector;
          });
          for (const { selector } of itemList) {
            const { children } = selector;
            for (const { children: grandChildren } of children) {
              if (branches.has(grandChildren)) {
                branches.delete(grandChildren);
              }
            }
          }
        }
      }
    });
  }
  return {
    info,
    branches: [...branches]
  };
};
const compareASTNodes = (a, b) => {
  const bitA = AST_SORT_ORDER.get(a.type);
  const bitB = AST_SORT_ORDER.get(b.type);
  if (bitA === bitB) {
    return 0;
  } else if (bitA > bitB) {
    return 1;
  } else {
    return -1;
  }
};
const sortAST = (asts) => {
  const arr = [...asts];
  if (arr.length > 1) {
    arr.sort(compareASTNodes);
  }
  return arr;
};
const parseAstName = (selector) => {
  let prefix;
  let localName;
  if (selector && typeof selector === "string") {
    if (selector.indexOf("|") > -1) {
      [prefix, localName] = selector.split("|");
    } else {
      prefix = "*";
      localName = selector;
    }
  } else {
    throw new DOMException(`Invalid selector ${selector}`, import_constant.SYNTAX_ERR);
  }
  return {
    prefix,
    localName
  };
};
const extractSubjectsAst = (ast, caseSensitive = false) => {
  const subjects = [];
  if (ast?.type === "SelectorList") {
    for (const selectorNode of ast.children) {
      let attrKey = null;
      let classKey = null;
      let idKey = null;
      let tagKey = null;
      let current = selectorNode.children.tail;
      while (current) {
        const node = current.data;
        if (node.type === import_constant.COMBINATOR) {
          break;
        }
        if (node.type === import_constant.ATTR_SELECTOR && attrKey === null) {
          const attrName = unescapeSelector(node.name.name);
          if (!attrName.includes("|")) {
            attrKey = attrName;
          }
        } else if (node.type === import_constant.CLASS_SELECTOR && classKey === null) {
          classKey = unescapeSelector(node.name);
        } else if (node.type === import_constant.ID_SELECTOR && idKey === null) {
          idKey = unescapeSelector(node.name);
        } else if (node.type === import_constant.TYPE_SELECTOR && tagKey === null) {
          const { localName } = parseAstName(unescapeSelector(node.name));
          if (localName !== "*") {
            tagKey = caseSensitive ? localName : localName.toLowerCase();
          }
        }
        if (attrKey !== null && classKey !== null && idKey !== null && tagKey !== null) {
          break;
        }
        current = current.prev;
      }
      subjects.push(
        Object.freeze({
          attr: attrKey,
          className: classKey,
          id: idKey,
          tag: tagKey
        })
      );
    }
  }
  return Object.freeze(subjects);
};
const findAST = import_walker.default.find;
const generateCSS = import_generator.default;
