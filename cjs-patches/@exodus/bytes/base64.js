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
  fromBase64: () => fromBase64,
  fromBase64any: () => fromBase64any,
  fromBase64url: () => fromBase64url,
  toBase64: () => toBase64,
  toBase64url: () => toBase64url
});
module.exports = __toCommonJS(stdin_exports);
var import_assert = require("./assert.js");
var import_utils = require("./fallback/_utils.js");
var import_platform = require("./fallback/platform.js");
var import_latin1 = require("./fallback/latin1.js");
var js = __toESM(require("./fallback/base64.js"));
const { Buffer: Buffer2, atob, btoa } = globalThis;
const haveNativeBuffer = Buffer2 && !Buffer2.TYPED_ARRAY_SUPPORT;
const { toBase64: web64 } = Uint8Array.prototype;
const { E_CHAR, E_PADDING, E_LENGTH, E_LAST } = js;
const shouldUseBtoa = btoa && import_platform.isHermes;
const shouldUseAtob = atob && import_platform.isHermes;
const isBuffer = (x) => x.constructor === Buffer2 && Buffer2.isBuffer(x);
const toBuffer = (x) => isBuffer(x) ? x : Buffer2.from(x.buffer, x.byteOffset, x.byteLength);
function maybeUnpad(res, padding) {
  if (padding) return res;
  const at = res.indexOf("=", res.length - 3);
  return at === -1 ? res : res.slice(0, at);
}
function maybePad(res, padding) {
  return padding && res.length % 4 !== 0 ? res + "=".repeat(4 - res.length % 4) : res;
}
const toUrl = (x) => x.replaceAll("+", "-").replaceAll("/", "_");
const haveWeb = (x) => web64 && x.toBase64 === web64;
function toBase64(x, { padding = true } = {}) {
  (0, import_utils.assertU8)(x);
  if (haveWeb(x)) return padding ? x.toBase64() : x.toBase64({ omitPadding: !padding });
  if (haveNativeBuffer) return maybeUnpad(toBuffer(x).base64Slice(0, x.byteLength), padding);
  if (shouldUseBtoa) return maybeUnpad(btoa((0, import_latin1.decodeLatin1)(x)), padding);
  return js.toBase64(x, false, padding);
}
function toBase64url(x, { padding = false } = {}) {
  (0, import_utils.assertU8)(x);
  if (haveWeb(x)) return x.toBase64({ alphabet: "base64url", omitPadding: !padding });
  if (haveNativeBuffer) return maybePad(toBuffer(x).base64urlSlice(0, x.byteLength), padding);
  if (shouldUseBtoa) return maybeUnpad(toUrl(btoa((0, import_latin1.decodeLatin1)(x))), padding);
  return js.toBase64(x, true, padding);
}
function fromBase64(str, options) {
  if (typeof options === "string") options = { format: options };
  if (!options) return fromBase64common(str, false, "both", "uint8", null);
  const { format = "uint8", padding = "both", ...rest } = options;
  return fromBase64common(str, false, padding, format, rest);
}
function fromBase64url(str, options) {
  if (!options) return fromBase64common(str, true, false, "uint8", null);
  const { format = "uint8", padding = false, ...rest } = options;
  return fromBase64common(str, true, padding, format, rest);
}
function fromBase64any(str, { format = "uint8", padding = "both", ...rest } = {}) {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  const isBase64url = !str.includes("+") && !str.includes("/");
  return fromBase64common(str, isBase64url, padding, format, rest);
}
function fromBase64common(str, isBase64url, padding, format, rest) {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  if (rest !== null) (0, import_assert.assertEmptyRest)(rest);
  const auto = padding === "both" ? str.endsWith("=") : void 0;
  if (padding === true || auto === true) {
    if (str.length % 4 !== 0) throw new SyntaxError(E_PADDING);
    if (str[str.length - 3] === "=") throw new SyntaxError(E_PADDING);
  } else if (padding === false || auto === false) {
    if (str.length % 4 === 1) throw new SyntaxError(E_LENGTH);
    if (padding === false && str.endsWith("=")) {
      throw new SyntaxError("Did not expect padding in base64 input");
    }
  } else {
    throw new TypeError("Invalid padding option");
  }
  return fromBase64impl(str, isBase64url, padding, format);
}
const ASCII_WHITESPACE = /[\t\n\f\r ]/;
function noWhitespaceSeen(str, arr) {
  const at = str.indexOf("=", str.length - 3);
  const paddingLength = at >= 0 ? str.length - at : 0;
  const chars = str.length - paddingLength;
  const e = chars % 4;
  const b = arr.length - (chars - e) / 4 * 3;
  return e === 0 && b === 0 || e === 2 && b === 1 || e === 3 && b === 2;
}
let fromBase64impl;
if (Uint8Array.fromBase64) {
  fromBase64impl = (str, isBase64url, padding, format) => {
    const alphabet = isBase64url ? "base64url" : "base64";
    let arr;
    if (padding === true) {
      arr = Uint8Array.fromBase64(str, { alphabet, lastChunkHandling: "strict" });
    } else {
      try {
        const padded = str.length % 4 > 0 ? `${str}${"=".repeat(4 - str.length % 4)}` : str;
        arr = Uint8Array.fromBase64(padded, { alphabet, lastChunkHandling: "strict" });
      } catch (err) {
        throw ASCII_WHITESPACE.test(str) ? new SyntaxError(E_CHAR) : err;
      }
    }
    if (!noWhitespaceSeen(str, arr)) throw new SyntaxError(E_CHAR);
    return (0, import_utils.fromUint8)(arr, format);
  };
} else if (haveNativeBuffer) {
  fromBase64impl = (str, isBase64url, padding, format) => {
    const size = Buffer2.byteLength(str, "base64");
    const arr = Buffer2.allocUnsafeSlow(size);
    if (arr.base64Write(str) !== size) throw new SyntaxError(E_PADDING);
    const valid = isBase64url ? arr.base64urlSlice(0, arr.length) : arr.base64Slice(0, arr.length);
    if (str !== valid) {
      if (padding === !isBase64url) throw new SyntaxError(E_PADDING);
      if (maybePad(str, true) !== maybePad(valid, isBase64url)) throw new SyntaxError(E_PADDING);
    }
    return (0, import_utils.fromBuffer)(arr, format);
  };
} else if (shouldUseAtob) {
  fromBase64impl = (str, isBase64url, padding, format) => {
    let arr;
    if (isBase64url) {
      if (/[\t\n\f\r +/]/.test(str)) throw new SyntaxError(E_CHAR);
      str = str.replaceAll("-", "+").replaceAll("_", "/");
    }
    try {
      arr = (0, import_latin1.encodeLatin1)(atob(str));
    } catch {
      throw new SyntaxError(E_CHAR);
    }
    if (!isBase64url && !noWhitespaceSeen(str, arr)) throw new SyntaxError(E_CHAR);
    if (arr.length % 3 !== 0) {
      const expected = toBase64(arr.subarray(-(arr.length % 3)));
      const end = str.length % 4 === 0 ? str.slice(-4) : str.slice(-(str.length % 4)).padEnd(4, "=");
      if (expected !== end) throw new SyntaxError(E_LAST);
    }
    return (0, import_utils.fromUint8)(arr, format);
  };
} else {
  fromBase64impl = (str, isBase64url, padding, format) => (0, import_utils.fromUint8)(js.fromBase64(str, isBase64url), format);
}
