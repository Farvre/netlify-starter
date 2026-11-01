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
  canUseFastClassSearch: () => canUseFastClassSearch,
  canUseFastIdSearch: () => canUseFastIdSearch,
  canUseFastTagSearch: () => canUseFastTagSearch,
  collectAllDescendants: () => collectAllDescendants,
  compareNodes: () => compareNodes,
  findBestSeed: () => findBestSeed,
  findByExactIdAttribute: () => findByExactIdAttribute,
  findBySimpleAttribute: () => findBySimpleAttribute,
  generateException: () => generateException,
  getDirectionality: () => getDirectionality,
  getLanguageAttribute: () => getLanguageAttribute,
  getNamespaceURI: () => getNamespaceURI,
  getSlottedTextContent: () => getSlottedTextContent,
  getTraversalStrategy: () => getTraversalStrategy,
  getType: () => getType,
  hasAttributeLocalName: () => hasAttributeLocalName,
  isContentEditable: () => isContentEditable,
  isCustomElement: () => isCustomElement,
  isFocusVisible: () => isFocusVisible,
  isFocusable: () => isFocusable,
  isFocusableArea: () => isFocusableArea,
  isHTMLElement: () => isHTMLElement,
  isNamespaceDeclared: () => isNamespaceDeclared,
  isPreceding: () => isPreceding,
  isVisible: () => isVisible,
  populateHasAllowlist: () => populateHasAllowlist,
  resolveContent: () => resolveContent,
  sortNodes: () => sortNodes,
  stringifyValue: () => stringifyValue,
  traverseNode: () => traverseNode,
  verifyArray: () => verifyArray
});
module.exports = __toCommonJS(stdin_exports);
var import_bidi_js = __toESM(require("bidi-js"));
var import_is_potential_custom_element_name = __toESM(require("is-potential-custom-element-name"));
var import_constant = require("./constant.js");
const KEYS_DIR_AUTO = /* @__PURE__ */ new Set([...import_constant.INPUT_BUTTON, ...import_constant.INPUT_TEXT, "hidden"]);
const KEYS_DIR_LTR = new Set(import_constant.INPUT_LTR);
const KEYS_INPUT_EDIT = new Set(import_constant.INPUT_EDIT);
const KEYS_NODE_DIR_EXCLUDE = /* @__PURE__ */ new Set(["bdi", "script", "style", "textarea"]);
const KEYS_NODE_FOCUSABLE = /* @__PURE__ */ new Set(["button", "select", "textarea"]);
const KEYS_NODE_FOCUSABLE_SVG = /* @__PURE__ */ new Set([
  "clipPath",
  "defs",
  "desc",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "pattern",
  "radialGradient",
  "script",
  "style",
  "symbol",
  "title"
]);
const REG_IS_XHTML = /^(?:application\/xhtml\+x|text\/ht)ml$/;
const REG_IS_XML = /^(?:application\/(?:[\w\-.]+\+)?|image\/[\w\-.]+\+|text\/)xml$/;
const REG_EXACT_ID_ATTRIBUTE = /^\[id="([A-Za-z]\w*(?:-(?:\w*|\u00AB\w+\u00BB))*)"\]$/;
const REG_SIMPLE_ATTRIBUTE = /^\[([a-z][a-z\d_-]*)\]$/;
const getType = (o) => Object.prototype.toString.call(o).slice(import_constant.TYPE_FROM, import_constant.TYPE_TO);
const verifyArray = (arr, type) => {
  if (!Array.isArray(arr)) {
    throw new TypeError(`Unexpected type ${getType(arr)}`);
  }
  if (typeof type !== "string") {
    throw new TypeError(`Unexpected type ${getType(type)}`);
  }
  for (const item of arr) {
    if (getType(item) !== type) {
      throw new TypeError(`Unexpected type ${getType(item)}`);
    }
  }
  return arr;
};
const generateException = (msg, name, globalObject = globalThis) => {
  return new globalObject.DOMException(msg, name);
};
const stringifyValue = (value, globalObject = globalThis) => {
  if (typeof value === "string") {
    return value;
  }
  if (value === void 0 || value === null || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.join(",");
  }
  if (Object.hasOwn(value, "toString")) {
    return value.toString();
  }
  const error = generateException(
    `Invalid selector ${value}`,
    import_constant.SYNTAX_ERR,
    globalObject
  );
  throw error;
};
const resolveContent = (node) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  let document;
  let root;
  let shadow;
  switch (node.nodeType) {
    case import_constant.DOCUMENT_NODE: {
      document = node;
      root = node;
      break;
    }
    case import_constant.DOCUMENT_FRAGMENT_NODE: {
      const { host, mode, ownerDocument } = node;
      document = ownerDocument;
      root = node;
      shadow = host && (mode === "close" || mode === "open");
      break;
    }
    case import_constant.ELEMENT_NODE: {
      document = node.ownerDocument;
      let refNode = node;
      while (refNode) {
        const { host, mode, nodeType, parentNode } = refNode;
        if (nodeType === import_constant.DOCUMENT_FRAGMENT_NODE) {
          shadow = host && (mode === "close" || mode === "open");
          break;
        } else if (parentNode) {
          refNode = parentNode;
        } else {
          break;
        }
      }
      root = refNode;
      break;
    }
    default: {
      throw new TypeError(`Unexpected node ${node.nodeName}`);
    }
  }
  return [document, root, !!shadow];
};
const traverseNode = (node, walker, force = false) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (!walker) {
    return null;
  }
  let refNode = walker.currentNode;
  if (refNode === node) {
    return refNode;
  } else if (force || refNode.contains(node)) {
    refNode = walker.nextNode();
    while (refNode) {
      if (refNode === node) {
        break;
      }
      refNode = walker.nextNode();
    }
    return refNode;
  } else {
    if (refNode !== walker.root) {
      let bool;
      while (refNode) {
        if (refNode === node) {
          bool = true;
          break;
        } else if (refNode === walker.root || refNode.contains(node)) {
          break;
        }
        refNode = walker.parentNode();
      }
      if (bool) {
        return refNode;
      }
    }
    if (node.nodeType === import_constant.ELEMENT_NODE) {
      let bool;
      while (refNode) {
        if (refNode === node) {
          bool = true;
          break;
        }
        refNode = walker.nextNode();
      }
      if (bool) {
        return refNode;
      }
    }
  }
  return null;
};
const isHTMLElement = (node) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (node.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  const { namespaceURI, ownerDocument } = node;
  return ownerDocument.contentType === import_constant.MIME_HTML && (!namespaceURI || namespaceURI === import_constant.NS_HTML);
};
const isCustomElement = (node, { formAssociated } = {}) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (node.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  const { localName, ownerDocument } = node;
  const window = ownerDocument.defaultView;
  let elmConstructor;
  const attr = node.getAttribute("is");
  if (attr) {
    elmConstructor = (0, import_is_potential_custom_element_name.default)(attr) && window.customElements.get(attr);
  } else {
    elmConstructor = (0, import_is_potential_custom_element_name.default)(localName) && window.customElements.get(localName);
  }
  if (elmConstructor) {
    if (formAssociated) {
      return !!elmConstructor.formAssociated;
    }
    return true;
  }
  return false;
};
const getSlottedTextContent = (node) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (typeof node.assignedNodes !== "function") {
    return null;
  }
  const nodes = node.assignedNodes();
  if (nodes.length) {
    let text = "";
    const l = nodes.length;
    for (let i = 0; i < l; i++) {
      const item = nodes[i];
      text = item.textContent.trim();
      if (text) {
        break;
      }
    }
    return text;
  }
  return node.textContent.trim();
};
const getDirectionality = (node, dirCache = /* @__PURE__ */ new WeakMap()) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (node.nodeType !== import_constant.ELEMENT_NODE) {
    return null;
  }
  if (dirCache.has(node)) {
    return dirCache.get(node);
  }
  const { dir: dirAttr, localName, parentNode } = node;
  const { getEmbeddingLevels } = (0, import_bidi_js.default)();
  let result = "ltr";
  if (dirAttr === "ltr" || dirAttr === "rtl") {
    result = dirAttr;
  } else if (dirAttr === "auto") {
    let text = "";
    switch (localName) {
      case "input": {
        if (!node.type || KEYS_DIR_AUTO.has(node.type)) {
          text = node.value;
        } else if (KEYS_DIR_LTR.has(node.type)) {
          result = "ltr";
          text = null;
        }
        break;
      }
      case "slot": {
        text = getSlottedTextContent(node);
        break;
      }
      case "textarea": {
        text = node.value;
        break;
      }
      default: {
        const items = [].slice.call(node.childNodes);
        for (const item of items) {
          const {
            dir: itemDir,
            localName: itemLocalName,
            nodeType: itemNodeType,
            textContent: itemTextContent
          } = item;
          if (itemNodeType === import_constant.TEXT_NODE) {
            text = itemTextContent.trim();
          } else if (itemNodeType === import_constant.ELEMENT_NODE && !KEYS_NODE_DIR_EXCLUDE.has(itemLocalName) && (!itemDir || itemDir !== "ltr" && itemDir !== "rtl")) {
            if (itemLocalName === "slot") {
              text = getSlottedTextContent(item);
            } else {
              text = itemTextContent.trim();
            }
          }
          if (text) {
            break;
          }
        }
      }
    }
    if (text !== null) {
      if (text) {
        const {
          paragraphs: [{ level }]
        } = getEmbeddingLevels(text);
        if (level % 2 === 1) {
          result = "rtl";
        }
      } else if (parentNode) {
        const { nodeType: parentNodeType } = parentNode;
        if (parentNodeType === import_constant.ELEMENT_NODE) {
          result = getDirectionality(parentNode, dirCache);
        }
      }
    }
  } else if (localName === "input" && node.type === "tel") {
    result = "ltr";
  } else if (localName === "bdi") {
    const text = node.textContent.trim();
    if (text) {
      const {
        paragraphs: [{ level }]
      } = getEmbeddingLevels(text);
      if (level % 2 === 1) {
        result = "rtl";
      }
    }
  } else if (parentNode) {
    if (localName === "slot") {
      const text = getSlottedTextContent(node);
      if (text) {
        const {
          paragraphs: [{ level }]
        } = getEmbeddingLevels(text);
        if (level % 2 === 1) {
          result = "rtl";
        } else {
          result = "ltr";
        }
      } else {
        const { nodeType: parentNodeType } = parentNode;
        if (parentNodeType === import_constant.ELEMENT_NODE) {
          result = getDirectionality(parentNode, dirCache);
        }
      }
    } else {
      const { nodeType: parentNodeType } = parentNode;
      if (parentNodeType === import_constant.ELEMENT_NODE) {
        result = getDirectionality(parentNode, dirCache);
      }
    }
  }
  dirCache.set(node, result);
  return result;
};
const getLanguageAttribute = (node, langCache = /* @__PURE__ */ new WeakMap()) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (node.nodeType !== import_constant.ELEMENT_NODE) {
    return null;
  }
  if (langCache.has(node)) {
    return langCache.get(node);
  }
  const { contentType } = node.ownerDocument;
  const isHtml = REG_IS_XHTML.test(contentType);
  const isXml = REG_IS_XML.test(contentType);
  let isShadow = false;
  let result;
  const visited = [];
  let current = node;
  while (current) {
    if (current.nodeType === import_constant.ELEMENT_NODE && langCache.has(current)) {
      result = langCache.get(current);
      break;
    }
    if (current.nodeType === import_constant.ELEMENT_NODE) {
      visited.push(current);
    }
    switch (current.nodeType) {
      case import_constant.ELEMENT_NODE: {
        if (isHtml && current.hasAttribute("lang")) {
          result = current.getAttribute("lang");
        } else if (isXml && current.hasAttribute("xml:lang")) {
          result = current.getAttribute("xml:lang");
        }
        break;
      }
      case import_constant.DOCUMENT_FRAGMENT_NODE: {
        if (current.host) {
          isShadow = true;
        }
        break;
      }
      case import_constant.DOCUMENT_NODE:
      default: {
        result = null;
      }
    }
    if (result !== void 0) {
      break;
    }
    if (isShadow) {
      current = current.host;
      isShadow = false;
    } else if (current.parentNode) {
      current = current.parentNode;
    } else {
      break;
    }
  }
  if (result === void 0) {
    result = null;
  }
  for (const visitedNode of visited) {
    langCache.set(visitedNode, result);
  }
  return result;
};
const isContentEditable = (node) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (node.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  if (typeof node.isContentEditable === "boolean") {
    return node.isContentEditable;
  } else if (node.ownerDocument.designMode === "on") {
    return true;
  } else {
    let attr;
    if (node.hasAttribute("contenteditable")) {
      attr = node.getAttribute("contenteditable");
    } else {
      attr = "inherit";
    }
    switch (attr) {
      case "":
      case "true": {
        return true;
      }
      case "plaintext-only": {
        return true;
      }
      case "false": {
        return false;
      }
      default: {
        if (node?.parentNode?.nodeType === import_constant.ELEMENT_NODE) {
          return isContentEditable(node.parentNode);
        }
        return false;
      }
    }
  }
};
const isVisible = (node) => {
  if (node?.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  const window = node.ownerDocument.defaultView;
  const { display, visibility } = window.getComputedStyle(node);
  return display !== "none" && visibility === "visible";
};
const isFocusVisible = (node) => {
  if (node?.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  const { localName, type } = node;
  switch (localName) {
    case "input": {
      if (!type || KEYS_INPUT_EDIT.has(type)) {
        return true;
      }
      return false;
    }
    case "textarea": {
      return true;
    }
    default: {
      return isContentEditable(node);
    }
  }
};
const isFocusableArea = (node) => {
  if (node?.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  if (!node.isConnected) {
    return false;
  }
  const window = node.ownerDocument.defaultView;
  if (node instanceof window.HTMLElement) {
    if (Number.isInteger(parseInt(node.getAttribute("tabindex")))) {
      return true;
    }
    if (isContentEditable(node)) {
      return true;
    }
    const { localName, parentNode } = node;
    switch (localName) {
      case "a": {
        if (node.href || node.hasAttribute("href")) {
          return true;
        }
        return false;
      }
      case "iframe": {
        return true;
      }
      case "input": {
        if (node.disabled || node.hasAttribute("disabled") || node.hidden || node.hasAttribute("hidden")) {
          return false;
        }
        return true;
      }
      case "summary": {
        if (parentNode.localName === "details") {
          let child = parentNode.firstElementChild;
          let bool = false;
          while (child) {
            if (child.localName === "summary") {
              bool = child === node;
              break;
            }
            child = child.nextElementSibling;
          }
          return bool;
        }
        return false;
      }
      default: {
        if (KEYS_NODE_FOCUSABLE.has(localName) && !(node.disabled || node.hasAttribute("disabled"))) {
          return true;
        }
      }
    }
  } else if (node instanceof window.SVGElement) {
    if (Number.isInteger(parseInt(node.getAttributeNS(null, "tabindex")))) {
      const ns = "http://www.w3.org/2000/svg";
      let bool;
      let refNode = node;
      while (refNode.namespaceURI === ns) {
        bool = KEYS_NODE_FOCUSABLE_SVG.has(refNode.localName);
        if (bool) {
          break;
        }
        if (refNode?.parentNode?.namespaceURI === ns) {
          refNode = refNode.parentNode;
        } else {
          break;
        }
      }
      if (bool) {
        return false;
      }
      return true;
    }
    if (node.localName === "a" && (node.href || node.hasAttributeNS(null, "href"))) {
      return true;
    }
  }
  return false;
};
const isFocusable = (node) => {
  if (node?.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  const window = node.ownerDocument.defaultView;
  let refNode = node;
  let res = true;
  while (refNode) {
    if (refNode.disabled || refNode.hasAttribute("disabled")) {
      res = false;
      break;
    }
    if (refNode.hidden || refNode.hasAttribute("hidden")) {
      res = false;
    }
    const { contentVisibility, display, visibility } = window.getComputedStyle(refNode);
    if (display === "none" || visibility !== "visible" || contentVisibility === "hidden" && refNode !== node) {
      res = false;
    } else {
      res = true;
    }
    if (res && refNode?.parentNode?.nodeType === import_constant.ELEMENT_NODE) {
      refNode = refNode.parentNode;
    } else {
      break;
    }
  }
  return res;
};
const getNamespaceURI = (ns, node) => {
  if (typeof ns !== "string") {
    throw new TypeError(`Unexpected type ${getType(ns)}`);
  } else if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (!ns || node.nodeType !== import_constant.ELEMENT_NODE) {
    return null;
  }
  const { attributes } = node;
  let res;
  for (const attr of attributes) {
    const { name, namespaceURI, prefix, value } = attr;
    if (name === `xmlns:${ns}`) {
      res = value;
    } else if (prefix === ns) {
      res = namespaceURI;
    }
    if (res) {
      break;
    }
  }
  return res ?? null;
};
const isNamespaceDeclared = (ns = "", node = {}) => {
  if (!ns || typeof ns !== "string" || node?.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  if (node.lookupNamespaceURI(ns)) {
    return true;
  }
  const root = node.ownerDocument.documentElement;
  let parent = node;
  let res;
  while (parent) {
    res = getNamespaceURI(ns, parent);
    if (res || parent === root) {
      break;
    }
    parent = parent.parentNode;
  }
  return !!res;
};
const isPreceding = (nodeA, nodeB) => {
  if (!nodeA?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(nodeA)}`);
  } else if (!nodeB?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(nodeB)}`);
  }
  if (nodeA.nodeType !== import_constant.ELEMENT_NODE || nodeB.nodeType !== import_constant.ELEMENT_NODE) {
    return false;
  }
  const posBit = nodeB.compareDocumentPosition(nodeA);
  const res = posBit & import_constant.DOCUMENT_POSITION_PRECEDING || posBit & import_constant.DOCUMENT_POSITION_CONTAINS;
  return !!res;
};
const compareNodes = (a, b) => {
  if (isPreceding(b, a)) {
    return 1;
  }
  return -1;
};
const sortNodes = (nodes = []) => {
  const arr = [...nodes];
  if (arr.length > 1) {
    arr.sort(compareNodes);
  }
  return arr;
};
const findBestSeed = (nodes, state = { seed: null, priority: 0 }) => {
  for (const node of nodes) {
    if (state.priority === 3) {
      return state;
    }
    if (Array.isArray(node)) {
      findBestSeed(node, state);
    } else if (node && typeof node === "object") {
      if (node.type === import_constant.ID_SELECTOR && nodes.length === 1) {
        state.seed = { type: "id", value: node.name };
        state.priority = 3;
        return state;
      }
      if (node.type === import_constant.CLASS_SELECTOR && state.priority < 2) {
        state.seed = { type: "class", value: node.name };
        state.priority = 2;
      } else if (node.type === import_constant.TYPE_SELECTOR && state.priority < 1 && node.name && node.name !== "*") {
        state.seed = { type: "tag", value: node.name };
        state.priority = 1;
      }
    }
  }
  return state;
};
const populateHasAllowlist = (current, list, visitedAncestors) => {
  list.add(current);
  while (current && (current.nodeType === import_constant.ELEMENT_NODE || current.nodeType === import_constant.DOCUMENT_FRAGMENT_NODE)) {
    if (visitedAncestors.has(current)) {
      break;
    }
    visitedAncestors.add(current);
    let sibling = current.previousElementSibling;
    while (sibling) {
      list.add(sibling);
      sibling = sibling.previousElementSibling;
    }
    sibling = current.nextElementSibling;
    while (sibling) {
      list.add(sibling);
      sibling = sibling.nextElementSibling;
    }
    current = current.parentNode;
    if (current) {
      list.add(current);
    }
  }
};
const collectAllDescendants = (node, document) => {
  if (!node?.nodeType) {
    throw new TypeError(`Unexpected type ${getType(node)}`);
  }
  if (document?.nodeType !== import_constant.DOCUMENT_NODE) {
    throw new TypeError(`Unexpected type ${getType(document)}`);
  }
  const walker = document.createTreeWalker(node, import_constant.SHOW_ELEMENT);
  const descendants = [];
  let refNode = walker.nextNode();
  while (refNode) {
    descendants.push(refNode);
    refNode = walker.nextNode();
  }
  return descendants;
};
const hasAttributeLocalName = (node, name) => {
  if (node.hasAttribute(name)) {
    return true;
  }
  const names = node.getAttributeNames();
  for (const itemName of names) {
    const colonIndex = itemName.indexOf(":");
    if (colonIndex > -1) {
      const localName = itemName.slice(colonIndex + 1);
      if (localName === name || isHTMLElement(node) && localName.toLowerCase() === name) {
        return true;
      }
    }
  }
  return false;
};
const findByExactIdAttribute = (selector, node) => {
  if (typeof selector !== "string") {
    return;
  }
  if (!node?.nodeType) {
    return;
  }
  const match = REG_EXACT_ID_ATTRIBUTE.exec(selector);
  if (!match) {
    return;
  }
  const [, id] = match;
  if (node.nodeType === import_constant.DOCUMENT_NODE) {
    return node.getElementById(id);
  }
  if (node.nodeType !== import_constant.ELEMENT_NODE || node.getRootNode() !== node.ownerDocument) {
    return;
  }
  const candidate = node.ownerDocument.getElementById(id);
  if (candidate === null) {
    return null;
  }
  if (candidate !== node && node.contains(candidate)) {
    return candidate;
  }
};
const findBySimpleAttribute = (selector, node) => {
  if (typeof selector !== "string") {
    return null;
  }
  if (!node?.nodeType) {
    return null;
  }
  const match = REG_SIMPLE_ATTRIBUTE.exec(selector);
  if (!match) {
    return null;
  }
  const [, name] = match;
  if (name === "lang") {
    return null;
  }
  const { nodeType } = node;
  const isQueryContext = nodeType === import_constant.DOCUMENT_NODE || nodeType === import_constant.DOCUMENT_FRAGMENT_NODE || nodeType === import_constant.ELEMENT_NODE;
  if (!isQueryContext) {
    return null;
  }
  const document = nodeType === import_constant.DOCUMENT_NODE ? node : node.ownerDocument;
  if (document.contentType !== import_constant.MIME_HTML) {
    return null;
  }
  const walker = document.createTreeWalker(node, import_constant.SHOW_ELEMENT);
  const nodes = [];
  let nextNode = walker.nextNode();
  while (nextNode) {
    if (hasAttributeLocalName(nextNode, name)) {
      nodes.push(nextNode);
    }
    nextNode = walker.nextNode();
  }
  return nodes;
};
const getTraversalStrategy = (branch, targetType, hasScope, scoped) => {
  const branchLen = branch.length;
  const firstTwig = branch[0];
  if (branchLen === 1) {
    return { dir: import_constant.DIR_PREV, twig: firstTwig };
  }
  const lastTwig = branch[branchLen - 1];
  const {
    leaves: [{ name: firstName, type: firstType }]
  } = firstTwig;
  const {
    leaves: [{ name: lastName, type: lastType }]
  } = lastTwig;
  const lastCombo = branch[branchLen - 2].combo?.name;
  if (hasScope || lastType === import_constant.PS_ELEMENT_SELECTOR || lastType === import_constant.ID_SELECTOR || lastCombo === "+" || lastCombo === "~") {
    return { dir: import_constant.DIR_PREV, twig: lastTwig };
  } else if (firstType === import_constant.ID_SELECTOR) {
    return { dir: import_constant.DIR_NEXT, twig: firstTwig };
  } else if (firstName === "*" && firstType === import_constant.TYPE_SELECTOR) {
    return { dir: import_constant.DIR_PREV, twig: lastTwig };
  } else if (lastName === "*" && lastType === import_constant.TYPE_SELECTOR) {
    return { dir: import_constant.DIR_NEXT, twig: firstTwig };
  } else if (branchLen === 2) {
    return { dir: import_constant.DIR_PREV, twig: lastTwig };
  } else if (scoped && targetType === import_constant.TARGET_FIRST) {
    return { dir: import_constant.DIR_PREV, twig: lastTwig };
  }
  return { dir: import_constant.DIR_NEXT, twig: firstTwig };
};
const canUseFastIdSearch = (node, root) => node.nodeType === import_constant.ELEMENT_NODE && root.nodeType !== import_constant.ELEMENT_NODE;
const canUseFastClassSearch = (node) => typeof node.getElementsByClassName === "function";
const canUseFastTagSearch = (node, leafName) => typeof node.getElementsByTagName === "function" && !leafName.includes("|");
