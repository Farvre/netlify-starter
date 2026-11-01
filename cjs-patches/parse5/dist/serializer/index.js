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
  serialize: () => serialize,
  serializeOuter: () => serializeOuter
});
module.exports = __toCommonJS(stdin_exports);
var import_html = require("../common/html.js");
var import_escape = require("entities/escape");
var import_default = require("../tree-adapters/default.js");
const VOID_ELEMENTS = /* @__PURE__ */ new Set([
  import_html.TAG_NAMES.AREA,
  import_html.TAG_NAMES.BASE,
  import_html.TAG_NAMES.BASEFONT,
  import_html.TAG_NAMES.BGSOUND,
  import_html.TAG_NAMES.BR,
  import_html.TAG_NAMES.COL,
  import_html.TAG_NAMES.EMBED,
  import_html.TAG_NAMES.FRAME,
  import_html.TAG_NAMES.HR,
  import_html.TAG_NAMES.IMG,
  import_html.TAG_NAMES.INPUT,
  import_html.TAG_NAMES.KEYGEN,
  import_html.TAG_NAMES.LINK,
  import_html.TAG_NAMES.META,
  import_html.TAG_NAMES.PARAM,
  import_html.TAG_NAMES.SOURCE,
  import_html.TAG_NAMES.TRACK,
  import_html.TAG_NAMES.WBR
]);
function isVoidElement(node, options) {
  return options.treeAdapter.isElementNode(node) && options.treeAdapter.getNamespaceURI(node) === import_html.NS.HTML && VOID_ELEMENTS.has(options.treeAdapter.getTagName(node));
}
const defaultOpts = { treeAdapter: import_default.defaultTreeAdapter, scriptingEnabled: true };
function serialize(node, options) {
  const opts = { ...defaultOpts, ...options };
  if (isVoidElement(node, opts)) {
    return "";
  }
  return serializeChildNodes(node, opts);
}
function serializeOuter(node, options) {
  const opts = { ...defaultOpts, ...options };
  return serializeNode(node, opts);
}
function serializeChildNodes(parentNode, options) {
  let html = "";
  const container = options.treeAdapter.isElementNode(parentNode) && options.treeAdapter.getTagName(parentNode) === import_html.TAG_NAMES.TEMPLATE && options.treeAdapter.getNamespaceURI(parentNode) === import_html.NS.HTML ? options.treeAdapter.getTemplateContent(parentNode) : parentNode;
  const childNodes = options.treeAdapter.getChildNodes(container);
  if (childNodes) {
    for (const currentNode of childNodes) {
      html += serializeNode(currentNode, options);
    }
  }
  return html;
}
function serializeNode(node, options) {
  if (options.treeAdapter.isElementNode(node)) {
    return serializeElement(node, options);
  }
  if (options.treeAdapter.isTextNode(node)) {
    return serializeTextNode(node, options);
  }
  if (options.treeAdapter.isCommentNode(node)) {
    return serializeCommentNode(node, options);
  }
  if (options.treeAdapter.isDocumentTypeNode(node)) {
    return serializeDocumentTypeNode(node, options);
  }
  return "";
}
function serializeElement(node, options) {
  const tn = options.treeAdapter.getTagName(node);
  return `<${tn}${serializeAttributes(node, options)}>${isVoidElement(node, options) ? "" : `${serializeChildNodes(node, options)}</${tn}>`}`;
}
function serializeAttributes(node, { treeAdapter }) {
  let html = "";
  for (const attr of treeAdapter.getAttrList(node)) {
    html += " ";
    if (attr.namespace) {
      switch (attr.namespace) {
        case import_html.NS.XML: {
          html += `xml:${attr.name}`;
          break;
        }
        case import_html.NS.XMLNS: {
          if (attr.name !== "xmlns") {
            html += "xmlns:";
          }
          html += attr.name;
          break;
        }
        case import_html.NS.XLINK: {
          html += `xlink:${attr.name}`;
          break;
        }
        default: {
          html += `${attr.prefix}:${attr.name}`;
        }
      }
    } else {
      html += attr.name;
    }
    html += `="${(0, import_escape.escapeAttribute)(attr.value)}"`;
  }
  return html;
}
function serializeTextNode(node, options) {
  const { treeAdapter } = options;
  const content = treeAdapter.getTextNodeContent(node);
  const parent = treeAdapter.getParentNode(node);
  const parentTn = parent && treeAdapter.isElementNode(parent) && treeAdapter.getTagName(parent);
  return parentTn && treeAdapter.getNamespaceURI(parent) === import_html.NS.HTML && (0, import_html.hasUnescapedText)(parentTn, options.scriptingEnabled) ? content : (0, import_escape.escapeText)(content);
}
function serializeCommentNode(node, { treeAdapter }) {
  return `<!--${treeAdapter.getCommentNodeContent(node)}-->`;
}
function serializeDocumentTypeNode(node, { treeAdapter }) {
  return `<!DOCTYPE ${treeAdapter.getDocumentTypeNodeName(node)}>`;
}
