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
  SVG_TAG_NAMES_ADJUSTMENT_MAP: () => SVG_TAG_NAMES_ADJUSTMENT_MAP,
  adjustTokenMathMLAttrs: () => adjustTokenMathMLAttrs,
  adjustTokenSVGAttrs: () => adjustTokenSVGAttrs,
  adjustTokenSVGTagName: () => adjustTokenSVGTagName,
  adjustTokenXMLAttrs: () => adjustTokenXMLAttrs,
  causesExit: () => causesExit,
  isIntegrationPoint: () => isIntegrationPoint
});
module.exports = __toCommonJS(stdin_exports);
var import_html = require("./html.js");
const MIME_TYPES = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
};
const DEFINITION_URL_ATTR = "definitionurl";
const ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
const SVG_ATTRS_ADJUSTMENT_MAP = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((attr) => [attr.toLowerCase(), attr]));
const XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: import_html.NS.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: import_html.NS.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: import_html.NS.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: import_html.NS.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: import_html.NS.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: import_html.NS.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: import_html.NS.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: import_html.NS.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: import_html.NS.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: import_html.NS.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: import_html.NS.XMLNS }]
]);
const SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((tn) => [tn.toLowerCase(), tn]));
const EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
  import_html.TAG_ID.B,
  import_html.TAG_ID.BIG,
  import_html.TAG_ID.BLOCKQUOTE,
  import_html.TAG_ID.BODY,
  import_html.TAG_ID.BR,
  import_html.TAG_ID.CENTER,
  import_html.TAG_ID.CODE,
  import_html.TAG_ID.DD,
  import_html.TAG_ID.DIV,
  import_html.TAG_ID.DL,
  import_html.TAG_ID.DT,
  import_html.TAG_ID.EM,
  import_html.TAG_ID.EMBED,
  import_html.TAG_ID.H1,
  import_html.TAG_ID.H2,
  import_html.TAG_ID.H3,
  import_html.TAG_ID.H4,
  import_html.TAG_ID.H5,
  import_html.TAG_ID.H6,
  import_html.TAG_ID.HEAD,
  import_html.TAG_ID.HR,
  import_html.TAG_ID.I,
  import_html.TAG_ID.IMG,
  import_html.TAG_ID.LI,
  import_html.TAG_ID.LISTING,
  import_html.TAG_ID.MENU,
  import_html.TAG_ID.META,
  import_html.TAG_ID.NOBR,
  import_html.TAG_ID.OL,
  import_html.TAG_ID.P,
  import_html.TAG_ID.PRE,
  import_html.TAG_ID.RUBY,
  import_html.TAG_ID.S,
  import_html.TAG_ID.SMALL,
  import_html.TAG_ID.SPAN,
  import_html.TAG_ID.STRONG,
  import_html.TAG_ID.STRIKE,
  import_html.TAG_ID.SUB,
  import_html.TAG_ID.SUP,
  import_html.TAG_ID.TABLE,
  import_html.TAG_ID.TT,
  import_html.TAG_ID.U,
  import_html.TAG_ID.UL,
  import_html.TAG_ID.VAR
]);
function causesExit(startTagToken) {
  const tn = startTagToken.tagID;
  const isFontWithAttrs = tn === import_html.TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === import_html.ATTRS.COLOR || name === import_html.ATTRS.SIZE || name === import_html.ATTRS.FACE);
  return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
}
function adjustTokenMathMLAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++) {
    if (token.attrs[i].name === DEFINITION_URL_ATTR) {
      token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
      break;
    }
  }
}
function adjustTokenSVGAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++) {
    const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
    if (adjustedAttrName != null) {
      token.attrs[i].name = adjustedAttrName;
    }
  }
}
function adjustTokenXMLAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++) {
    const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
    if (adjustedAttrEntry) {
      token.attrs[i].prefix = adjustedAttrEntry.prefix;
      token.attrs[i].name = adjustedAttrEntry.name;
      token.attrs[i].namespace = adjustedAttrEntry.namespace;
    }
  }
}
function adjustTokenSVGTagName(token) {
  const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
  if (adjustedTagName != null) {
    token.tagName = adjustedTagName;
    token.tagID = (0, import_html.getTagID)(token.tagName);
  }
}
function isMathMLTextIntegrationPoint(tn, ns) {
  return ns === import_html.NS.MATHML && (tn === import_html.TAG_ID.MI || tn === import_html.TAG_ID.MO || tn === import_html.TAG_ID.MN || tn === import_html.TAG_ID.MS || tn === import_html.TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn, ns, attrs) {
  if (ns === import_html.NS.MATHML && tn === import_html.TAG_ID.ANNOTATION_XML) {
    for (let i = 0; i < attrs.length; i++) {
      if (attrs[i].name === import_html.ATTRS.ENCODING) {
        const value = attrs[i].value.toLowerCase();
        return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
      }
    }
  }
  return ns === import_html.NS.SVG && (tn === import_html.TAG_ID.FOREIGN_OBJECT || tn === import_html.TAG_ID.DESC || tn === import_html.TAG_ID.TITLE);
}
function isIntegrationPoint(tn, ns, attrs, foreignNS) {
  return (!foreignNS || foreignNS === import_html.NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === import_html.NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
}
