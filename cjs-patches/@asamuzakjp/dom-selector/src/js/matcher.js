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
  matchAttributeSelector: () => matchAttributeSelector,
  matchCheckedPseudoClass: () => matchCheckedPseudoClass,
  matchDirectionPseudoClass: () => matchDirectionPseudoClass,
  matchLanguagePseudoClass: () => matchLanguagePseudoClass,
  matchLinkPseudoClass: () => matchLinkPseudoClass,
  matchOpenPseudoClass: () => matchOpenPseudoClass,
  matchPlaceholderShownPseudoClass: () => matchPlaceholderShownPseudoClass,
  matchPseudoElementSelector: () => matchPseudoElementSelector,
  matchRangePseudoClass: () => matchRangePseudoClass,
  matchReadOnlyPseudoClass: () => matchReadOnlyPseudoClass,
  matchRequiredPseudoClass: () => matchRequiredPseudoClass,
  matchTypeSelector: () => matchTypeSelector
});
module.exports = __toCommonJS(stdin_exports);
var import_parser = require("./parser.js");
var import_utility = require("./utility.js");
var import_constant = require("./constant.js");
const KEYS_ATTR_VALUE_I = new Set(import_constant.ATTR_VALUE_I);
const KEYS_INPUT_EDIT = new Set(import_constant.INPUT_EDIT);
const REG_LANG_VALID = new RegExp(
  `^(?:\\*-)?${import_constant.LANG_ALPHA_NUM}${import_constant.LANG_PART}$`,
  "i"
);
const REG_ATTR_EQUALITY = /^[a-z][a-z\d_-]*$/;
const astMetaCache = /* @__PURE__ */ new WeakMap();
const htmlAttrMetaCache = /* @__PURE__ */ new WeakMap();
const matchPseudoElementSelector = (astName, astType, { forgive, globalObject, warn } = {}) => {
  if (astType !== import_constant.PS_ELEMENT_SELECTOR) {
    throw new TypeError(`Unexpected ast type ${(0, import_utility.getType)(astType)}`);
  }
  switch (astName) {
    case "after":
    case "backdrop":
    case "before":
    case "cue":
    case "cue-region":
    case "first-letter":
    case "first-line":
    case "file-selector-button":
    case "marker":
    case "placeholder":
    case "selection":
    case "target-text": {
      if (warn) {
        throw (0, import_utility.generateException)(
          `Unsupported pseudo-element ::${astName}`,
          import_constant.NOT_SUPPORTED_ERR,
          globalObject
        );
      }
      break;
    }
    case "part":
    case "slotted": {
      if (warn) {
        throw (0, import_utility.generateException)(
          `Unsupported pseudo-element ::${astName}()`,
          import_constant.NOT_SUPPORTED_ERR,
          globalObject
        );
      }
      break;
    }
    default: {
      if (astName.startsWith("-webkit-")) {
        if (warn) {
          throw (0, import_utility.generateException)(
            `Unsupported pseudo-element ::${astName}`,
            import_constant.NOT_SUPPORTED_ERR,
            globalObject
          );
        }
      } else if (!forgive) {
        throw (0, import_utility.generateException)(
          `Unknown pseudo-element ::${astName}`,
          import_constant.SYNTAX_ERR,
          globalObject
        );
      }
    }
  }
};
const matchDirectionPseudoClass = (ast, node, dirCache = /* @__PURE__ */ new WeakMap()) => {
  const { name } = ast;
  if (!name) {
    const type = name === "" ? "(empty String)" : (0, import_utility.getType)(name);
    throw new TypeError(`Unexpected ast type ${type}`);
  }
  const dir = (0, import_utility.getDirectionality)(node, dirCache);
  return name === dir;
};
const matchLanguagePseudoClass = (ast, node, langCache = /* @__PURE__ */ new WeakMap()) => {
  const elementLang = (0, import_utility.getLanguageAttribute)(node, langCache);
  if (elementLang === null) {
    return false;
  }
  let meta = astMetaCache.get(ast);
  if (meta === void 0) {
    meta = {};
    astMetaCache.set(ast, meta);
  }
  if (meta.langRegex !== void 0) {
    if (meta.langPattern === "*") {
      return elementLang !== "";
    }
    if (meta.langRegex === null) {
      return false;
    }
    return meta.langRegex.test(elementLang);
  }
  const { name, type, value } = ast;
  const langPattern = type === import_constant.STRING && value !== void 0 ? value : (0, import_parser.unescapeSelector)(name);
  meta.langPattern = langPattern;
  if (typeof langPattern !== "string") {
    meta.langRegex = null;
    return false;
  }
  if (langPattern === "*") {
    meta.langRegex = null;
    return elementLang !== "";
  }
  if (!REG_LANG_VALID.test(langPattern)) {
    meta.langRegex = null;
    return false;
  }
  const parts = langPattern.split("-");
  const regexStr = parts.map((part, index) => {
    const core = part === "*" ? import_constant.LANG_ALPHA_NUM : part;
    const skip = index === parts.length - 1 ? import_constant.LANG_PART : import_constant.LANG_PART_SKIP;
    return (index === 0 ? core : `-${core}`) + skip;
  }).join("");
  const matcherRegex = new RegExp(`^${regexStr}$`, "i");
  meta.langRegex = matcherRegex;
  return matcherRegex.test(elementLang);
};
const matchCheckedPseudoClass = (node) => {
  const { localName } = node;
  if (localName === "option") {
    return node.selected;
  }
  if (localName === "input") {
    const attrType = node.getAttribute("type");
    if (node.checked) {
      return attrType === "checkbox" || attrType === "radio";
    }
  }
  return false;
};
const matchLinkPseudoClass = (node) => {
  const { localName } = node;
  if (localName === "a" || localName === "area") {
    return node.hasAttribute("href");
  }
  return false;
};
const matchOpenPseudoClass = (node) => {
  const { localName } = node;
  if (localName === "details" || localName === "dialog") {
    return node.hasAttribute("open");
  }
  return false;
};
const matchPlaceholderShownPseudoClass = (node, keys) => {
  let placeholder;
  if (node.placeholder) {
    placeholder = node.placeholder;
  } else if (node.hasAttribute("placeholder")) {
    placeholder = node.getAttribute("placeholder");
  }
  if (typeof placeholder === "string" && !/[\r\n]/.test(placeholder)) {
    let targetNode;
    const { localName } = node;
    if (localName === "textarea") {
      targetNode = node;
    } else if (localName === "input") {
      if (node.hasAttribute("type")) {
        if (keys.has(node.getAttribute("type"))) {
          targetNode = node;
        }
      } else {
        targetNode = node;
      }
    }
    if (targetNode) {
      return node.value === "";
    }
  }
  return false;
};
const matchRangePseudoClass = (astName, node, keys) => {
  const { localName } = node;
  const attrType = node.getAttribute("type");
  if (localName === "input" && !(node.readOnly || node.hasAttribute("readonly")) && !(node.disabled || node.hasAttribute("disabled")) && keys.has(attrType)) {
    const flowed = node.validity.rangeUnderflow || node.validity.rangeOverflow;
    if (astName === "out-of-range") {
      return flowed;
    }
    if (flowed) {
      return false;
    }
    return node.hasAttribute("min") || node.hasAttribute("max") || attrType === "range";
  }
  return false;
};
const matchReadOnlyPseudoClass = (astName, node) => {
  const { localName } = node;
  let isReadOnly = false;
  switch (localName) {
    case "textarea":
    case "input": {
      const isEditableInput = !node.type || KEYS_INPUT_EDIT.has(node.type);
      if (localName === "textarea" || isEditableInput) {
        isReadOnly = node.readOnly || node.hasAttribute("readonly") || node.disabled || node.hasAttribute("disabled");
      } else {
        isReadOnly = true;
      }
      break;
    }
    default: {
      isReadOnly = !(0, import_utility.isContentEditable)(node);
    }
  }
  if (astName === "read-only") {
    return isReadOnly;
  }
  return !isReadOnly;
};
const matchRequiredPseudoClass = (astName, node, keys) => {
  const { localName } = node;
  let required = false;
  if (localName === "select" || localName === "textarea") {
    if (node.required || node.hasAttribute("required")) {
      required = true;
    }
  } else if (localName === "input") {
    if (node.hasAttribute("type")) {
      const attrType = node.getAttribute("type");
      if (keys.has(attrType)) {
        if (node.required || node.hasAttribute("required")) {
          required = true;
        }
      }
    } else if (node.required || node.hasAttribute("required")) {
      required = true;
    }
  } else {
    return false;
  }
  if (astName === "optional") {
    return !required;
  }
  return required;
};
const matchAttributeSelector = (ast, node, { check, forgive, globalObject } = {}) => {
  const {
    flags: astFlags,
    matcher: astMatcher,
    name: astName,
    value: astValue
  } = ast;
  if (typeof astFlags === "string" && !/^[is]$/i.test(astFlags) && !forgive) {
    const css = (0, import_parser.generateCSS)(ast);
    throw (0, import_utility.generateException)(
      `Invalid selector ${css}`,
      import_constant.SYNTAX_ERR,
      globalObject
    );
  }
  const astRawName = astName?.name;
  const isHTML = (0, import_utility.isHTMLElement)(node);
  const metaCache = isHTML ? htmlAttrMetaCache : astMetaCache;
  let meta = metaCache.get(ast);
  if (meta === void 0) {
    meta = {
      attrValues: /* @__PURE__ */ new Set(),
      equalityName: null
    };
    if (astMatcher === "=" && !astFlags && astValue?.type === import_constant.STRING && typeof astRawName === "string" && astRawName !== "lang" && !KEYS_ATTR_VALUE_I.has(astRawName) && REG_ATTR_EQUALITY.test(astRawName)) {
      meta.equalityName = astRawName;
    }
    metaCache.set(ast, meta);
  }
  if (isHTML && meta.equalityName !== null) {
    const attrName = meta.equalityName;
    if (node.getAttribute(attrName) === astValue.value) {
      return true;
    }
    let occurrences = 0;
    let needsFallback = false;
    for (const attributeName of node.getAttributeNames()) {
      if (attributeName === attrName) {
        occurrences++;
      }
      if (attributeName.includes(":") || occurrences > 1) {
        needsFallback = true;
        break;
      }
    }
    if (!needsFallback) {
      return false;
    }
  }
  if (astMatcher === null && !astFlags && typeof astRawName === "string") {
    if (meta.astName === void 0) {
      const rawName = (0, import_parser.unescapeSelector)(astRawName);
      meta.astName = rawName;
      meta.hasPipe = rawName.indexOf("|") > -1;
    }
    if (!meta.hasPipe) {
      if (meta.astName === "lang" && node.hasAttributeNS("http://www.w3.org/XML/1998/namespace", "lang")) {
        return false;
      }
      if (node.hasAttribute(meta.astName)) {
        return true;
      }
      const attrs = node.attributes;
      if (!attrs || attrs.length === 0) {
        return false;
      }
      const checkName = isHTML ? meta.astName.toLowerCase() : meta.astName;
      for (const itemAttr of attrs) {
        let itemName = itemAttr.name;
        if (isHTML) {
          itemName = itemName.toLowerCase();
        }
        const colonIdx = itemName.indexOf(":");
        if (colonIdx > -1) {
          const itemLocalName = itemName.substring(colonIdx + 1).replace(/^:/, "");
          if (checkName === itemLocalName) {
            return true;
          }
        } else if (checkName === itemName) {
          return true;
        }
      }
      return false;
    }
  }
  const { attributes } = node;
  if (!attributes || !attributes.length) {
    return false;
  }
  if (meta.caseInsensitive === void 0) {
    let caseInsensitive2 = false;
    if (typeof astFlags === "string") {
      caseInsensitive2 = /^i$/i.test(astFlags);
    } else if (isHTML) {
      caseInsensitive2 = KEYS_ATTR_VALUE_I.has(astRawName);
    }
    meta.caseInsensitive = caseInsensitive2;
    let astAttrName2 = (0, import_parser.unescapeSelector)(astRawName);
    if (isHTML) {
      if (typeof astFlags === "string") {
        if (/^i$/i.test(astFlags)) {
          astAttrName2 = astAttrName2.toLowerCase();
        }
      } else {
        astAttrName2 = astAttrName2.toLowerCase();
      }
    } else if (caseInsensitive2) {
      astAttrName2 = astAttrName2.toLowerCase();
    }
    meta.astAttrName = astAttrName2;
    meta.hasPipeInName = astAttrName2.indexOf("|") > -1;
    if (meta.hasPipeInName) {
      const { prefix, localName } = (0, import_parser.parseAstName)(astAttrName2);
      meta.astPrefix = prefix;
      meta.astLocalName = localName;
    }
    const { name: astIdentValue, value: astStringValue } = astValue ?? {};
    let attrValue2;
    if (astIdentValue) {
      attrValue2 = (0, import_parser.unescapeSelector)(astIdentValue);
    } else if (astStringValue !== void 0) {
      attrValue2 = astStringValue;
    }
    if (caseInsensitive2 && typeof attrValue2 === "string") {
      attrValue2 = attrValue2.toLowerCase();
    }
    meta.cachedAttrValue = attrValue2;
    if (astMatcher === "~=" && attrValue2 && typeof attrValue2 === "string") {
      meta.tildeTarget = /\s/.test(attrValue2) ? null : ` ${attrValue2} `;
    }
  }
  const caseInsensitive = meta.caseInsensitive;
  const astAttrName = meta.astAttrName;
  const attrValue = meta.cachedAttrValue;
  const attrValues = meta.attrValues;
  if (attrValues.size) {
    attrValues.clear();
  }
  if (meta.hasPipeInName) {
    const astPrefix = meta.astPrefix;
    const astLocalName = meta.astLocalName;
    for (const item of attributes) {
      let itemName = item.name;
      let itemValue = item.value;
      if (caseInsensitive) {
        itemName = itemName.toLowerCase();
        itemValue = itemValue.toLowerCase();
      }
      const colonIdx = itemName.indexOf(":");
      switch (astPrefix) {
        case "": {
          if (astLocalName === itemName) {
            attrValues.add(itemValue);
          }
          break;
        }
        case "*": {
          if (colonIdx > -1) {
            const itemLocalName = itemName.substring(colonIdx + 1).replace(/^:/, "");
            if (itemLocalName === astLocalName) {
              attrValues.add(itemValue);
            }
          } else if (astLocalName === itemName) {
            attrValues.add(itemValue);
          }
          break;
        }
        default: {
          if (!check) {
            if (forgive) {
              return false;
            }
            const css = (0, import_parser.generateCSS)(ast);
            throw (0, import_utility.generateException)(
              `Invalid selector ${css}`,
              import_constant.SYNTAX_ERR,
              globalObject
            );
          }
          if (colonIdx > -1) {
            const itemPrefix = itemName.substring(0, colonIdx);
            const itemLocalName = itemName.substring(colonIdx + 1).replace(/^:/, "");
            if (itemPrefix === "xml" && itemLocalName === "lang") {
              continue;
            }
            if (astPrefix === itemPrefix && astLocalName === itemLocalName) {
              if ((0, import_utility.isNamespaceDeclared)(astPrefix, node)) {
                attrValues.add(itemValue);
              }
            }
          }
        }
      }
    }
  } else {
    for (const item of attributes) {
      const origName = item.name;
      if (item.namespaceURI === "http://www.w3.org/XML/1998/namespace" && item.localName === "lang") {
        continue;
      }
      const colonIdx = origName.indexOf(":");
      if (colonIdx > -1) {
        const itemPrefix = origName.substring(0, colonIdx);
        const itemLocalName = origName.substring(colonIdx + 1).replace(/^:/, "");
        if (itemPrefix === "xml" && itemLocalName === "lang") {
          continue;
        }
      }
      let isMatch = false;
      if (origName === astAttrName) {
        isMatch = true;
      } else if (caseInsensitive && origName.toLowerCase() === astAttrName) {
        isMatch = true;
      }
      if (isMatch) {
        attrValues.add(caseInsensitive ? item.value.toLowerCase() : item.value);
      } else if (colonIdx > -1) {
        const itemLocalName = origName.substring(colonIdx + 1).replace(/^:/, "");
        let isLocalMatch = false;
        if (itemLocalName === astAttrName) {
          isLocalMatch = true;
        } else if (caseInsensitive && itemLocalName.toLowerCase() === astAttrName) {
          isLocalMatch = true;
        }
        if (isLocalMatch) {
          attrValues.add(
            caseInsensitive ? item.value.toLowerCase() : item.value
          );
        }
      }
    }
  }
  if (!attrValues.size) {
    return false;
  }
  switch (astMatcher) {
    case "=": {
      return typeof attrValue === "string" && attrValues.has(attrValue);
    }
    case "~=": {
      if (meta.tildeTarget === null || !attrValue) {
        return false;
      }
      const target = meta.tildeTarget;
      for (const value of attrValues) {
        if (` ${value.replace(/[\t\r\n\f]/g, " ")} `.includes(target)) {
          return true;
        }
      }
      return false;
    }
    case "|=": {
      if (typeof attrValue !== "string") {
        return false;
      }
      const prefix = `${attrValue}-`;
      for (const value of attrValues) {
        if (value === attrValue || value.startsWith(prefix)) {
          return true;
        }
      }
      return false;
    }
    case "^=": {
      if (!attrValue || typeof attrValue !== "string") {
        return false;
      }
      for (const value of attrValues) {
        if (value.startsWith(attrValue)) {
          return true;
        }
      }
      return false;
    }
    case "$=": {
      if (!attrValue || typeof attrValue !== "string") {
        return false;
      }
      for (const value of attrValues) {
        if (value.endsWith(attrValue)) {
          return true;
        }
      }
      return false;
    }
    case "*=": {
      if (!attrValue || typeof attrValue !== "string") {
        return false;
      }
      for (const value of attrValues) {
        if (value.includes(attrValue)) {
          return true;
        }
      }
      return false;
    }
    case null:
    default: {
      return true;
    }
  }
};
const matchTypeSelector = (ast, node, { check, forgive, globalObject } = {}) => {
  const { localName, namespaceURI, prefix } = node;
  let meta = astMetaCache.get(ast);
  if (meta === void 0) {
    meta = {};
    astMetaCache.set(ast, meta);
  }
  if (meta.astName === void 0) {
    const astName = (0, import_parser.unescapeSelector)(ast.name);
    const { prefix: parsedPrefix, localName: parsedLocalName } = (0, import_parser.parseAstName)(
      astName,
      node
    );
    meta.astName = astName;
    meta.astPrefix = parsedPrefix;
    meta.astPrefixLowerCased = parsedPrefix.toLowerCase();
    meta.astLocalName = parsedLocalName;
    meta.astLocalNameLowerCased = parsedLocalName.toLowerCase();
    meta.hasPipe = astName.includes("|");
  }
  const isHTML = (0, import_utility.isHTMLElement)(node);
  if (isHTML && localName === meta.astLocalName && !meta.hasPipe) {
    return true;
  }
  let nodePrefix;
  let nodeLocalName;
  const colonIdx = localName.indexOf(":");
  if (colonIdx > -1) {
    nodePrefix = localName.substring(0, colonIdx);
    nodeLocalName = localName.substring(colonIdx + 1);
  } else {
    nodePrefix = prefix || "";
    nodeLocalName = localName;
  }
  const astPrefix = isHTML ? meta.astPrefixLowerCased : meta.astPrefix;
  const astLocalName = isHTML ? meta.astLocalNameLowerCased : meta.astLocalName;
  const isUniversal = astLocalName === "*";
  switch (astPrefix) {
    case "": {
      return !nodePrefix && !namespaceURI && (isUniversal || astLocalName === nodeLocalName);
    }
    case "*": {
      return isUniversal || astLocalName === nodeLocalName;
    }
    default: {
      if (!check) {
        if (forgive) {
          return false;
        }
        const css = (0, import_parser.generateCSS)(ast);
        throw (0, import_utility.generateException)(
          `Invalid selector ${css}`,
          import_constant.SYNTAX_ERR,
          globalObject
        );
      }
      const astNS = node.lookupNamespaceURI(astPrefix);
      const nodeNS = node.lookupNamespaceURI(nodePrefix);
      if (astNS === nodeNS && astPrefix === nodePrefix) {
        return isUniversal || astLocalName === nodeLocalName;
      } else if (!forgive && !astNS) {
        throw (0, import_utility.generateException)(
          `Undeclared namespace ${astPrefix}`,
          import_constant.SYNTAX_ERR,
          globalObject
        );
      }
      return false;
    }
  }
};
