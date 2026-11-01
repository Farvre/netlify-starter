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
  TextDecoder: () => import_encoding.TextDecoder,
  TextDecoderStream: () => import_encoding.TextDecoderStream,
  TextEncoder: () => import_encoding.TextEncoder,
  TextEncoderStream: () => import_encoding.TextEncoderStream,
  getBOMEncoding: () => import_encoding.getBOMEncoding,
  isomorphicDecode: () => import_encoding.isomorphicDecode,
  isomorphicEncode: () => import_encoding.isomorphicEncode,
  labelToName: () => import_encoding.labelToName,
  legacyHookDecode: () => import_encoding.legacyHookDecode,
  normalizeEncoding: () => import_encoding.normalizeEncoding
});
module.exports = __toCommonJS(stdin_exports);
var import_encoding = require("./fallback/encoding.js");
