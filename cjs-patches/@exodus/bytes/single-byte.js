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
var import_utils = require("./fallback/_utils.js");
var import_platform = require("./fallback/platform.js");
var import_latin1 = require("./fallback/latin1.js");
var import_single_byte = require("./fallback/single-byte.js");
const { TextDecoder, btoa } = globalThis;
let windows1252works;
const skipNative = /* @__PURE__ */ new Set([
  "iso-8859-1",
  "iso-8859-9",
  "iso-8859-11",
  // non-WHATWG
  "iso-8859-6",
  "iso-8859-8",
  "iso-8859-8-i",
  // slow in all 3 engines
  "iso-8859-16"
  // iso-8859-16 is somehow broken in WebKit, at least on CI
]);
function shouldUseNative(enc) {
  if (enc === "windows-1252") {
    if (windows1252works === void 0) {
      windows1252works = false;
      try {
        const u = new Uint8Array(9);
        u[8] = 128;
        windows1252works = new TextDecoder(enc).decode(u).codePointAt(8) === 8364;
      } catch {
      }
    }
    return windows1252works;
  }
  return !skipNative.has(enc);
}
function createSinglebyteDecoder(encoding, loose = false) {
  if (typeof loose !== "boolean") throw new TypeError("loose option should be boolean");
  (0, import_single_byte.assertEncoding)(encoding);
  if (import_platform.nativeDecoderLatin1 && shouldUseNative(encoding)) {
    try {
      const decoder = new TextDecoder(encoding, { fatal: !loose });
      return (arr) => {
        (0, import_utils.assertU8)(arr);
        if (arr.byteLength === 0) return "";
        return decoder.decode(arr);
      };
    } catch {
    }
  }
  const jsDecoder = (0, import_single_byte.encodingDecoder)(encoding);
  return (arr) => {
    (0, import_utils.assertU8)(arr);
    if (arr.byteLength === 0) return "";
    return jsDecoder(arr, loose);
  };
}
const NON_LATIN = /[^\x00-\xFF]/;
function encode(s, m) {
  const len = s.length;
  const x = new Uint8Array(len);
  let i = import_platform.nativeEncoder ? 0 : (0, import_latin1.encodeAsciiPrefix)(x, s);
  for (const len3 = len - 3; i < len3; i += 4) {
    const x0 = s.charCodeAt(i), x1 = s.charCodeAt(i + 1), x2 = s.charCodeAt(i + 2), x3 = s.charCodeAt(i + 3);
    const c0 = m[x0], c1 = m[x1], c2 = m[x2], c3 = m[x3];
    if (!c0 && x0 || !c1 && x1 || !c2 && x2 || !c3 && x3) return null;
    x[i] = c0;
    x[i + 1] = c1;
    x[i + 2] = c2;
    x[i + 3] = c3;
  }
  for (; i < len; i++) {
    const x0 = s.charCodeAt(i);
    const c0 = m[x0];
    if (!c0 && x0) return null;
    x[i] = c0;
  }
  return x;
}
const useLatin1btoa = Uint8Array.fromBase64 && btoa;
function latin1fromString(s) {
  if (typeof s !== "string") throw new TypeError(import_utils.E_STRING);
  if (useLatin1btoa && s.length >= 1024 && s.length < 1e8) {
    try {
      return Uint8Array.fromBase64(btoa(s));
    } catch {
      throw new TypeError(import_single_byte.E_STRICT);
    }
  }
  if (NON_LATIN.test(s)) throw new TypeError(import_single_byte.E_STRICT);
  return (0, import_latin1.encodeLatin1)(s);
}
function createSinglebyteEncoder(encoding, { mode = "fatal" } = {}) {
  if (mode !== "fatal") throw new Error("Unsupported mode");
  if (encoding === "iso-8859-1") return latin1fromString;
  const m = (0, import_single_byte.encodeMap)(encoding);
  return (s) => {
    if (typeof s !== "string") throw new TypeError(import_utils.E_STRING);
    if (import_platform.nativeEncoder && !NON_LATIN.test(s)) {
      const u8 = import_platform.nativeEncoder.encode(s);
      if (u8.length === s.length) return u8;
    }
    const res = encode(s, m);
    if (!res) throw new TypeError(import_single_byte.E_STRICT);
    return res;
  };
}
const latin1toString = /* @__PURE__ */ createSinglebyteDecoder("iso-8859-1");
const windows1252toString = /* @__PURE__ */ createSinglebyteDecoder("windows-1252");
const windows1252fromString = /* @__PURE__ */ createSinglebyteEncoder("windows-1252");
