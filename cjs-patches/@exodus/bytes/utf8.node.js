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
  utf8fromString: () => utf8fromString,
  utf8fromStringLoose: () => utf8fromStringLoose,
  utf8toString: () => utf8toString,
  utf8toStringLoose: () => utf8toStringLoose
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./fallback/_utils.js");
var import_utf8 = require("./fallback/utf8.js");
var import_node_buffer = require("node:buffer");
if (Buffer.TYPED_ARRAY_SUPPORT) throw new Error("Unexpected Buffer polyfill");
let decoderFatal;
const decoderLoose = new TextDecoder("utf-8", { ignoreBOM: true });
const { isWellFormed } = String.prototype;
const isDeno = !!globalThis.Deno;
try {
  decoderFatal = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
} catch {
}
function encode(str, loose, format) {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  const strLength = str.length;
  if (strLength === 0) return new Uint8Array();
  let res;
  if (strLength > 1024 && !isDeno) {
    const byteLength = Buffer.byteLength(str);
    res = format === "buffer" ? Buffer.allocUnsafe(byteLength) : Buffer.allocUnsafeSlow(byteLength);
    const written = byteLength === strLength ? res.latin1Write(str) : res.utf8Write(str);
    if (written !== byteLength) throw new Error("Failed to write all bytes");
  } else {
    res = Buffer.from(str);
  }
  if (!loose && res.length !== strLength && !isWellFormed.call(str)) {
    throw new TypeError(import_utils.E_STRICT_UNICODE);
  }
  return (0, import_utils.fromBuffer)(res, format);
}
function decode(arr, loose = false) {
  (0, import_utils.assertU8)(arr);
  const byteLength = arr.byteLength;
  if (byteLength === 0) return "";
  if (byteLength > 1536 && !(isDeno && loose) && (0, import_node_buffer.isAscii)(arr)) {
    const buf = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
    if (isDeno) return buf.toString();
    return buf.latin1Slice(0, arr.byteLength);
  }
  if (loose) return decoderLoose.decode(arr);
  if (decoderFatal) return decoderFatal.decode(arr);
  const str = decoderLoose.decode(arr);
  if (str.includes("\uFFFD") && !Buffer.from(str).equals(arr)) throw new TypeError(import_utf8.E_STRICT);
  return str;
}
const utf8fromString = (str, format = "uint8") => encode(str, false, format);
const utf8fromStringLoose = (str, format = "uint8") => encode(str, true, format);
const utf8toString = (arr) => decode(arr, false);
const utf8toStringLoose = (arr) => decode(arr, true);
