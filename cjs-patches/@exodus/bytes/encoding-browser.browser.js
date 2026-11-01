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
  TextDecoder: () => TextDecoder,
  TextDecoderStream: () => TextDecoderStream,
  TextEncoder: () => TextEncoder,
  TextEncoderStream: () => TextEncoderStream,
  getBOMEncoding: () => import_encoding_api2.getBOMEncoding,
  labelToName: () => labelToName,
  legacyHookDecode: () => legacyHookDecode,
  normalizeEncoding: () => normalizeEncoding
});
module.exports = __toCommonJS(stdin_exports);
var import_encoding_api = require("./fallback/encoding.api.js");
var import_encoding_api2 = require("./fallback/encoding.api.js");
const { TextDecoder, TextEncoder, TextDecoderStream, TextEncoderStream } = globalThis;
function normalizeEncoding(label) {
  if (label === "utf-8" || label === "utf8" || label === "UTF-8" || label === "UTF8") return "utf-8";
  if (label === "windows-1252" || label === "ascii" || label === "latin1") return "windows-1252";
  if (/[^\w\t\n\f\r .:-]/i.test(label)) return null;
  const l = `${label}`.trim().toLowerCase();
  try {
    return new TextDecoder(l).encoding;
  } catch {
  }
  if (l === "x-user-defined") return l;
  if (l === "replacement" || l === "csiso2022kr" || l === "hz-gb-2312" || l === "iso-2022-cn" || l === "iso-2022-cn-ext" || l === "iso-2022-kr") {
    return "replacement";
  }
  return null;
}
function legacyHookDecode(input, fallbackEncoding = "utf-8") {
  const enc = (0, import_encoding_api.getBOMEncoding)(input) ?? normalizeEncoding(fallbackEncoding);
  if (enc === "replacement") return input.byteLength > 0 ? "\uFFFD" : "";
  return new TextDecoder(enc).decode(input);
}
function labelToName(label) {
  const enc = normalizeEncoding(label);
  if (enc === "utf-8") return "UTF-8";
  if (!enc) return enc;
  const p = enc.slice(0, 3);
  if (p === "utf" || p === "iso" || p === "koi" || p === "euc" || p === "ibm" || p === "gbk") {
    return enc.toUpperCase();
  }
  if (enc === "big5") return "Big5";
  if (enc === "shift_jis") return "Shift_JIS";
  return enc;
}
