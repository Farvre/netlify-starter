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
  ALPHA_NUM: () => ALPHA_NUM,
  ANB: () => ANB,
  ATRULE: () => ATRULE,
  ATTR_SELECTOR: () => ATTR_SELECTOR,
  ATTR_TYPE: () => ATTR_TYPE,
  ATTR_VALUE_I: () => ATTR_VALUE_I,
  BIT_01: () => BIT_01,
  BIT_02: () => BIT_02,
  BIT_04: () => BIT_04,
  BIT_08: () => BIT_08,
  BIT_16: () => BIT_16,
  BIT_32: () => BIT_32,
  BIT_FFFF: () => BIT_FFFF,
  CACHE_SIZE: () => CACHE_SIZE,
  CHILD_IDX: () => CHILD_IDX,
  CLASS_SELECTOR: () => CLASS_SELECTOR,
  COMBINATOR: () => COMBINATOR,
  COMBO: () => COMBO,
  COMPLEX: () => COMPLEX,
  COMPLEX_L: () => COMPLEX_L,
  COMPOUND: () => COMPOUND,
  COMPOUND_I: () => COMPOUND_I,
  COMPOUND_L: () => COMPOUND_L,
  COMPOUND_WO_PSEUDO: () => COMPOUND_WO_PSEUDO,
  DESCEND: () => DESCEND,
  DIGIT: () => DIGIT,
  DIR_NEXT: () => DIR_NEXT,
  DIR_PREV: () => DIR_PREV,
  DOCUMENT_FRAGMENT_NODE: () => DOCUMENT_FRAGMENT_NODE,
  DOCUMENT_NODE: () => DOCUMENT_NODE,
  DOCUMENT_POSITION_CONTAINED_BY: () => DOCUMENT_POSITION_CONTAINED_BY,
  DOCUMENT_POSITION_CONTAINS: () => DOCUMENT_POSITION_CONTAINS,
  DOCUMENT_POSITION_PRECEDING: () => DOCUMENT_POSITION_PRECEDING,
  DUO: () => DUO,
  ELEMENT_NODE: () => ELEMENT_NODE,
  FILTER_ACCEPT: () => FILTER_ACCEPT,
  FILTER_REJECT: () => FILTER_REJECT,
  FILTER_SKIP: () => FILTER_SKIP,
  FORM_PARTS: () => FORM_PARTS,
  HAS_COMPOUND: () => HAS_COMPOUND,
  HEX: () => HEX,
  IDENT: () => IDENT,
  ID_SELECTOR: () => ID_SELECTOR,
  INPUT_BUTTON: () => INPUT_BUTTON,
  INPUT_CHECK: () => INPUT_CHECK,
  INPUT_DATE: () => INPUT_DATE,
  INPUT_EDIT: () => INPUT_EDIT,
  INPUT_LTR: () => INPUT_LTR,
  INPUT_TEXT: () => INPUT_TEXT,
  KEYS_LOGICAL: () => KEYS_LOGICAL,
  KEYS_PS_CLASS_SUPPORTED: () => KEYS_PS_CLASS_SUPPORTED,
  KEYS_PS_CLASS_UNSUPPORTED: () => KEYS_PS_CLASS_UNSUPPORTED,
  KEYS_PS_ELEMENT_UNSUPPORTED: () => KEYS_PS_ELEMENT_UNSUPPORTED,
  LANG_ALPHA_NUM: () => LANG_ALPHA_NUM,
  LANG_PART: () => LANG_PART,
  LANG_PART_SKIP: () => LANG_PART_SKIP,
  LANG_SKIP_ALPHA_NUM: () => LANG_SKIP_ALPHA_NUM,
  LOGIC_COMPLEX: () => LOGIC_COMPLEX,
  LOGIC_COMPOUND: () => LOGIC_COMPOUND,
  LOGIC_IS: () => LOGIC_IS,
  MIME_HTML: () => MIME_HTML,
  NEST_SELECTOR: () => NEST_SELECTOR,
  NOT_SUPPORTED_ERR: () => NOT_SUPPORTED_ERR,
  NS_HTML: () => NS_HTML,
  NTH: () => NTH,
  N_TH: () => N_TH,
  OPERATOR: () => OPERATOR,
  PSEUDO_CLASS: () => PSEUDO_CLASS,
  PS_CLASS_SELECTOR: () => PS_CLASS_SELECTOR,
  PS_ELEMENT_SELECTOR: () => PS_ELEMENT_SELECTOR,
  RULE: () => RULE,
  SCOPE: () => SCOPE,
  SELECTOR: () => SELECTOR,
  SELECTOR_LIST: () => SELECTOR_LIST,
  SHOW_ALL: () => SHOW_ALL,
  SHOW_CONTAINER: () => SHOW_CONTAINER,
  SHOW_DOCUMENT: () => SHOW_DOCUMENT,
  SHOW_DOCUMENT_FRAGMENT: () => SHOW_DOCUMENT_FRAGMENT,
  SHOW_ELEMENT: () => SHOW_ELEMENT,
  SIBLING: () => SIBLING,
  STRING: () => STRING,
  SUB_TYPE: () => SUB_TYPE,
  SUB_TYPE_WO_PSEUDO: () => SUB_TYPE_WO_PSEUDO,
  SYNTAX_ERR: () => SYNTAX_ERR,
  TAG_TYPE: () => TAG_TYPE,
  TAG_TYPE_I: () => TAG_TYPE_I,
  TAG_TYPE_WO_UNIVERSAL: () => TAG_TYPE_WO_UNIVERSAL,
  TARGET_ALL: () => TARGET_ALL,
  TARGET_FIRST: () => TARGET_FIRST,
  TARGET_LINEAL: () => TARGET_LINEAL,
  TARGET_SELF: () => TARGET_SELF,
  TEXT_NODE: () => TEXT_NODE,
  TYPE_FROM: () => TYPE_FROM,
  TYPE_SELECTOR: () => TYPE_SELECTOR,
  TYPE_TO: () => TYPE_TO
});
module.exports = __toCommonJS(stdin_exports);
const ATRULE = "Atrule";
const ATTR_SELECTOR = "AttributeSelector";
const CLASS_SELECTOR = "ClassSelector";
const COMBINATOR = "Combinator";
const DIR_NEXT = "next";
const DIR_PREV = "prev";
const IDENT = "Identifier";
const ID_SELECTOR = "IdSelector";
const NEST_SELECTOR = "NestingSelector";
const NOT_SUPPORTED_ERR = "NotSupportedError";
const NTH = "Nth";
const OPERATOR = "Operator";
const PS_CLASS_SELECTOR = "PseudoClassSelector";
const PS_ELEMENT_SELECTOR = "PseudoElementSelector";
const RULE = "Rule";
const SCOPE = "Scope";
const SELECTOR = "Selector";
const SELECTOR_LIST = "SelectorList";
const STRING = "String";
const SYNTAX_ERR = "SyntaxError";
const TARGET_ALL = "all";
const TARGET_FIRST = "first";
const TARGET_LINEAL = "lineal";
const TARGET_SELF = "self";
const TYPE_SELECTOR = "TypeSelector";
const BIT_01 = 1;
const BIT_02 = 2;
const BIT_04 = 4;
const BIT_08 = 8;
const BIT_16 = 16;
const BIT_32 = 32;
const BIT_FFFF = 65535;
const CACHE_SIZE = 4096;
const DUO = 2;
const HEX = 16;
const TYPE_FROM = 8;
const TYPE_TO = -1;
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;
const DOCUMENT_POSITION_PRECEDING = 2;
const DOCUMENT_POSITION_CONTAINS = 8;
const DOCUMENT_POSITION_CONTAINED_BY = 16;
const FILTER_ACCEPT = 1;
const FILTER_REJECT = 2;
const FILTER_SKIP = 3;
const SHOW_ALL = 4294967295;
const SHOW_CONTAINER = 1281;
const SHOW_DOCUMENT = 256;
const SHOW_DOCUMENT_FRAGMENT = 1024;
const SHOW_ELEMENT = 1;
const ALPHA_NUM = "[A-Z\\d]+";
const CHILD_IDX = "(?:first|last|only)-(?:child|of-type)";
const DIGIT = "(?:0|[1-9]\\d*)";
const LANG_ALPHA_NUM = "[A-Z\\d]{1,8}";
const LANG_SKIP_ALPHA_NUM = "[A-Z\\d]{2,8}";
const LANG_PART = `(?:-${LANG_ALPHA_NUM})*`;
const LANG_PART_SKIP = `(?:-${LANG_SKIP_ALPHA_NUM})*`;
const PSEUDO_CLASS = `(?:any-)?link|${CHILD_IDX}|checked|empty|indeterminate|read-(?:only|write)|target`;
const ANB = `[+-]?(?:${DIGIT}n?|n)|(?:[+-]?${DIGIT})?n\\s*[+-]\\s*${DIGIT}`;
const COMBO = "\\s?[\\s>~+]\\s?";
const DESCEND = "\\s?[\\s>]\\s?";
const SIBLING = "\\s?[+~]\\s?";
const LOGIC_IS = `:is\\(\\s*[^)]+\\s*\\)`;
const N_TH = `nth-(?:last-)?(?:child|of-type)\\(\\s*(?:even|odd|${ANB})\\s*\\)`;
const ATTR_TYPE = "\\[[^|\\]]+\\]";
const SUB_TYPE = `${ATTR_TYPE}|[#.:][\\w-]+`;
const SUB_TYPE_WO_PSEUDO = `${ATTR_TYPE}|[#.][\\w-]+`;
const TAG_TYPE_WO_UNIVERSAL = "[A-Za-z][\\w-]*";
const TAG_TYPE = `\\*|${TAG_TYPE_WO_UNIVERSAL}`;
const TAG_TYPE_I = "\\*|[A-Z][\\w-]*";
const COMPOUND = `(?:${TAG_TYPE}|(?:${TAG_TYPE})?(?:${SUB_TYPE})+)`;
const COMPOUND_L = `(?:${TAG_TYPE}|(?:${TAG_TYPE})?(?:${SUB_TYPE}|${LOGIC_IS})+)`;
const COMPOUND_I = `(?:${TAG_TYPE_I}|(?:${TAG_TYPE_I})?(?:${SUB_TYPE})+)`;
const COMPOUND_WO_PSEUDO = `(?:${TAG_TYPE}|(?:${TAG_TYPE})?(?:${SUB_TYPE_WO_PSEUDO})+)`;
const COMPLEX = `${COMPOUND}(?:${COMBO}${COMPOUND})*`;
const COMPLEX_L = `${COMPOUND_L}(?:${COMBO}${COMPOUND_L})*`;
const HAS_COMPOUND = `has\\([\\s>]?\\s*${COMPOUND_WO_PSEUDO}\\s*\\)`;
const LOGIC_COMPOUND = `(?:is|not)\\(\\s*${COMPOUND_L}(?:\\s*,\\s*${COMPOUND_L})*\\s*\\)`;
const LOGIC_COMPLEX = `(?:is|not)\\(\\s*${COMPLEX_L}(?:\\s*,\\s*${COMPLEX_L})*\\s*\\)`;
const FORM_PARTS = Object.freeze([
  "button",
  "input",
  "select",
  "textarea"
]);
const INPUT_BUTTON = Object.freeze(["button", "reset", "submit"]);
const INPUT_CHECK = Object.freeze(["checkbox", "radio"]);
const INPUT_DATE = Object.freeze([
  "date",
  "datetime-local",
  "month",
  "time",
  "week"
]);
const INPUT_TEXT = Object.freeze([
  "email",
  "password",
  "search",
  "tel",
  "text",
  "url"
]);
const INPUT_EDIT = Object.freeze([
  ...INPUT_DATE,
  ...INPUT_TEXT,
  "number"
]);
const INPUT_LTR = Object.freeze([
  ...INPUT_CHECK,
  "color",
  "date",
  "image",
  "number",
  "range",
  "time"
]);
const ATTR_VALUE_I = Object.freeze([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
const KEYS_LOGICAL = /* @__PURE__ */ new Set(["has", "is", "not", "where"]);
const KEYS_PS_CLASS_SUPPORTED = /* @__PURE__ */ new Set([
  "active",
  "any-link",
  "checked",
  "closed",
  "default",
  "defined",
  "dir",
  "disabled",
  "empty",
  "enabled",
  "first-child",
  "first-of-type",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  "host",
  "host-context",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "link",
  "local-link",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "open",
  "optional",
  "out-of-range",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "root",
  "scope",
  "state",
  "target",
  "target-within",
  "valid",
  "visited",
  "where"
]);
const KEYS_PS_CLASS_UNSUPPORTED = /* @__PURE__ */ new Set([
  "autofill",
  "blank",
  "buffering",
  "contains",
  "current",
  "fullscreen",
  "future",
  "has-slotted",
  "heading",
  "modal",
  "muted",
  "nth-col",
  "nth-last-col",
  "past",
  "paused",
  "picture-in-picture",
  "playing",
  "popover-open",
  "seeking",
  "stalled",
  "user-invalid",
  "user-valid",
  "volume-locked",
  "-webkit-autofill"
]);
const KEYS_PS_ELEMENT_UNSUPPORTED = /* @__PURE__ */ new Set([
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "file-selector-button",
  "first-letter",
  "first-line",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "target-text"
]);
const MIME_HTML = "text/html";
const NS_HTML = "http://www.w3.org/1999/xhtml";
