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
  createSinglebyteDecoder: () => createSinglebyteDecoder,
  createSinglebyteEncoder: () => createSinglebyteEncoder,
  latin1fromString: () => latin1fromString,
  latin1toString: () => latin1toString,
  windows1252fromString: () => windows1252fromString,
  windows1252toString: () => windows1252toString
});
module.exports = __toCommonJS(stdin_exports);
var import_node_buffer = require("node:buffer");
var import_utils = require("./fallback/_utils.js");
var import_platform = require("./fallback/platform.js");
var import_latin1 = require("./fallback/latin1.js");
var import_single_byte = require("./fallback/single-byte.js");
function latin1Prefix(arr, start) {
  let p = start | 0;
  const length = arr.length;
  for (const len3 = length - 3; p < len3; p += 4) {
    if ((arr[p] & 224) === 128) return p;
    if ((arr[p + 1] & 224) === 128) return p + 1;
    if ((arr[p + 2] & 224) === 128) return p + 2;
    if ((arr[p + 3] & 224) === 128) return p + 3;
  }
  for (; p < length; p++) {
    if ((arr[p] & 224) === 128) return p;
  }
  return length;
}
function createSinglebyteDecoder(encoding, loose = false) {
  if (typeof loose !== "boolean") throw new TypeError("loose option should be boolean");
  if (import_platform.isDeno) {
    const jsDecoder = (0, import_single_byte.encodingDecoder)(encoding);
    return (arr) => {
      (0, import_utils.assertU8)(arr);
      if (arr.byteLength === 0) return "";
      if ((0, import_node_buffer.isAscii)(arr)) return (0, import_utils.toBuf)(arr).toString();
      return jsDecoder(arr, loose);
    };
  }
  const isLatin1 = encoding === "iso-8859-1";
  const latin1path = encoding === "windows-1252";
  const { incomplete, mapper } = (0, import_single_byte.encodingMapper)(encoding);
  return (arr) => {
    (0, import_utils.assertU8)(arr);
    if (arr.byteLength === 0) return "";
    if (isLatin1 || (0, import_node_buffer.isAscii)(arr)) return (0, import_utils.toBuf)(arr).latin1Slice(0, arr.byteLength);
    let prefixBytes = (0, import_latin1.asciiPrefix)(arr);
    let prefix = "";
    if (latin1path) prefixBytes = latin1Prefix(arr, prefixBytes);
    if (prefixBytes > 64 || prefixBytes === arr.length) {
      prefix = (0, import_utils.toBuf)(arr).latin1Slice(0, prefixBytes);
      if (prefixBytes === arr.length) return prefix;
    }
    const b = (0, import_utils.toBuf)(mapper(arr, prefix.length));
    if (!import_platform.isLE) b.swap16();
    const suffix = b.ucs2Slice(0, b.byteLength);
    if (!loose && incomplete && suffix.includes("\uFFFD")) throw new TypeError(import_single_byte.E_STRICT);
    return prefix + suffix;
  };
}
const NON_LATIN = /[^\x00-\xFF]/;
function encode(s, m) {
  const len = s.length;
  let i = 0;
  const b = Buffer.from(s, "utf-16le");
  if (!import_platform.isLE) b.swap16();
  const x = new Uint16Array(b.buffer, b.byteOffset, b.byteLength / 2);
  for (const len3 = len - 3; i < len3; i += 4) {
    const x0 = x[i], x1 = x[i + 1], x2 = x[i + 2], x3 = x[i + 3];
    const c0 = m[x0], c1 = m[x1], c2 = m[x2], c3 = m[x3];
    if (!(c0 && c1 && c2 && c3) && (!c0 && x0 || !c1 && x1 || !c2 && x2 || !c3 && x3)) return null;
    x[i] = c0;
    x[i + 1] = c1;
    x[i + 2] = c2;
    x[i + 3] = c3;
  }
  for (; i < len; i++) {
    const x0 = x[i];
    const c0 = m[x0];
    if (!c0 && x0) return null;
    x[i] = c0;
  }
  return new Uint8Array(x);
}
function latin1fromString(s) {
  if (typeof s !== "string") throw new TypeError(import_utils.E_STRING);
  if (NON_LATIN.test(s)) throw new TypeError(import_single_byte.E_STRICT);
  const ab = new ArrayBuffer(s.length);
  Buffer.from(ab).latin1Write(s);
  return new Uint8Array(ab);
}
function createSinglebyteEncoder(encoding, { mode = "fatal" } = {}) {
  if (mode !== "fatal") throw new Error("Unsupported mode");
  if (encoding === "iso-8859-1") return latin1fromString;
  const m = (0, import_single_byte.encodeMap)(encoding);
  return (s) => {
    if (typeof s !== "string") throw new TypeError(import_utils.E_STRING);
    if (!NON_LATIN.test(s)) {
      const byteLength = Buffer.byteLength(s);
      if (byteLength === s.length) {
        const ab = new ArrayBuffer(byteLength);
        Buffer.from(ab).latin1Write(s);
        return new Uint8Array(ab);
      }
    }
    const res = encode(s, m);
    if (!res) throw new TypeError(import_single_byte.E_STRICT);
    return res;
  };
}
const latin1toString = /* @__PURE__ */ createSinglebyteDecoder("iso-8859-1");
const windows1252toString = /* @__PURE__ */ createSinglebyteDecoder("windows-1252");
const windows1252fromString = /* @__PURE__ */ createSinglebyteEncoder("windows-1252");
