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
  fromHex: () => fromHex,
  toHex: () => toHex
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./fallback/_utils.js");
var import_hex = require("./fallback/hex.js");
if (Buffer.TYPED_ARRAY_SUPPORT) throw new Error("Unexpected Buffer polyfill");
const { toHex: webHex } = Uint8Array.prototype;
function toHex(arr) {
  (0, import_utils.assertU8)(arr);
  if (arr.length === 0) return "";
  if (webHex && arr.toHex === webHex) return arr.toHex();
  if (arr.constructor === Buffer && Buffer.isBuffer(arr)) return arr.hexSlice(0, arr.byteLength);
  return Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength).hexSlice(0, arr.byteLength);
}
const NON_LATIN = /[^\x00-\xFF]/;
const denoBug = Buffer.from("ag", "hex").length > 0;
const NON_HEX_CHECK = denoBug ? /[^\dA-Fa-f]/ : NON_LATIN;
const fromHex = Uint8Array.fromHex ? (str, format = "uint8") => (0, import_utils.fromUint8)(Uint8Array.fromHex(str), format) : (str, format = "uint8") => {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  if (str.length % 2 !== 0 || NON_HEX_CHECK.test(str)) throw new SyntaxError(import_hex.E_HEX);
  if (str.length <= 128) {
    const buf2 = Buffer.from(str, "hex");
    if (buf2.length * 2 !== str.length) throw new SyntaxError(import_hex.E_HEX);
    return (0, import_utils.fromBuffer)(buf2, format);
  }
  const length = str.length / 2;
  const buf = format === "buffer" ? Buffer.allocUnsafe(length) : Buffer.allocUnsafeSlow(length);
  const count = buf.hexWrite(str, 0, length);
  if (count !== length) throw new SyntaxError(import_hex.E_HEX);
  return (0, import_utils.fromBuffer)(buf, format);
};
