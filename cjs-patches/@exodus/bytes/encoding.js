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
  TextDecoder: () => import_encoding2.TextDecoder,
  TextDecoderStream: () => import_encoding2.TextDecoderStream,
  TextEncoder: () => import_encoding2.TextEncoder,
  TextEncoderStream: () => import_encoding2.TextEncoderStream,
  getBOMEncoding: () => import_encoding2.getBOMEncoding,
  isomorphicDecode: () => import_encoding2.isomorphicDecode,
  isomorphicEncode: () => import_encoding2.isomorphicEncode,
  labelToName: () => import_encoding2.labelToName,
  legacyHookDecode: () => import_encoding2.legacyHookDecode,
  normalizeEncoding: () => import_encoding2.normalizeEncoding
});
module.exports = __toCommonJS(stdin_exports);
var import_multi_byte = require("@exodus/bytes/multi-byte.js");
var import_multi_byte2 = require("./fallback/multi-byte.js");
var import_encoding = require("./fallback/encoding.js");
var import_encoding2 = require("./fallback/encoding.js");
(0, import_encoding.setMultibyte)(import_multi_byte.createMultibyteDecoder, import_multi_byte2.multibyteEncoder);
