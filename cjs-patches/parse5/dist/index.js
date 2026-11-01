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
  ErrorCodes: () => import_error_codes.ERR,
  Parser: () => import_parser2.Parser,
  Token: () => Token,
  Tokenizer: () => import_tokenizer.Tokenizer,
  TokenizerMode: () => import_tokenizer.TokenizerMode,
  defaultTreeAdapter: () => import_default.defaultTreeAdapter,
  foreignContent: () => foreignContent,
  html: () => html,
  parse: () => parse,
  parseFragment: () => parseFragment,
  serialize: () => import_serializer.serialize,
  serializeOuter: () => import_serializer.serializeOuter
});
module.exports = __toCommonJS(stdin_exports);
var import_parser = require("./parser/index.js");
var import_default = require("./tree-adapters/default.js");
var import_parser2 = require("./parser/index.js");
var import_serializer = require("./serializer/index.js");
var import_error_codes = require("./common/error-codes.js");
var foreignContent = __toESM(require("./common/foreign-content.js"));
var html = __toESM(require("./common/html.js"));
var Token = __toESM(require("./common/token.js"));
var import_tokenizer = require("./tokenizer/index.js");
function parse(html2, options) {
  return import_parser.Parser.parse(html2, options);
}
function parseFragment(fragmentContext, html2, options) {
  if (typeof fragmentContext === "string") {
    options = html2;
    html2 = fragmentContext;
    fragmentContext = null;
  }
  const parser = import_parser.Parser.getFragmentParser(fragmentContext, options);
  parser.tokenizer.write(html2, true);
  return parser.getFragment();
}
