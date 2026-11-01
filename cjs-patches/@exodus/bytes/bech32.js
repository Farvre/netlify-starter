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
  fromBech32: () => fromBech32,
  fromBech32m: () => fromBech32m,
  getPrefix: () => getPrefix,
  toBech32: () => toBech32,
  toBech32m: () => toBech32m
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./fallback/_utils.js");
var import_platform = require("./fallback/platform.js");
var import_latin1 = require("./fallback/latin1.js");
const alphabet = [..."qpzry9x8gf2tvdw0s3jn54khce6mua7l"];
const BECH32 = 1;
const BECH32M = 734539939;
const E_SIZE = "Input length is out of range";
const E_PREFIX = "Missing or invalid prefix";
const E_MIXED = "Mixed-case string";
const E_PADDING = "Padding is invalid";
const E_CHECKSUM = "Invalid checksum";
const E_CHARACTER = "Non-bech32 character";
const c2x = new Int8Array(import_platform.nativeEncoder ? 128 : 256).fill(-1);
const x2c = new Uint8Array(32);
for (let i = 0; i < alphabet.length; i++) {
  const c = alphabet[i].charCodeAt(0);
  c2x[c] = i;
  x2c[i] = c;
}
const poly0 = new Uint32Array(32);
const p = (x) => (x & 33554431) << 5 ^ poly0[x >> 25];
for (let i = 0; i < 32; i++) {
  poly0[i] = (i & 1 ? 996825010 : 0) ^ (i & 2 ? 642813549 : 0) ^ (i & 4 ? 513874426 : 0) ^ (i & 8 ? 1027748829 : 0) ^ (i & 16 ? 705979059 : 0);
}
const poly1 = new Uint32Array(32);
const poly2 = new Uint32Array(32);
const poly3 = new Uint32Array(32);
const poly4 = new Uint32Array(32);
const poly5 = new Uint32Array(32);
const poly6 = new Uint32Array(32);
const poly7 = new Uint32Array(32);
for (let i = 0; i < 32; i++) {
  poly1[i] = p(poly0[i]);
  poly2[i] = p(poly1[i]);
  poly3[i] = p(poly2[i]);
  poly4[i] = p(poly3[i]);
  poly5[i] = p(poly4[i]);
  poly6[i] = p(poly5[i]);
  poly7[i] = p(poly6[i]);
}
function p6(x) {
  const x0 = x & 31;
  const x1 = x >> 5 & 31;
  const x2 = x >> 10 & 31;
  const x3 = x >> 15 & 31;
  const x4 = x >> 20 & 31;
  const x5 = x >> 25 & 31;
  return poly0[x0] ^ poly1[x1] ^ poly2[x2] ^ poly3[x3] ^ poly4[x4] ^ poly5[x5];
}
function p8(x) {
  const x0 = x & 31;
  const x1 = x >> 5 & 31;
  const x2 = x >> 10 & 31;
  const x3 = x >> 15 & 31;
  const x4 = x >> 20 & 31;
  const x5 = x >> 25 & 31;
  return poly2[x0] ^ poly3[x1] ^ poly4[x2] ^ poly5[x3] ^ poly6[x4] ^ poly7[x5];
}
const merge = (a, b, c, d, e, f) => f ^ e << 5 ^ d << 10 ^ c << 15 ^ b << 20 ^ a << 25;
const prefixCache = /* @__PURE__ */ new Map();
function pPrefix(prefix) {
  if (prefix === "bc") return 36798531;
  const cached = prefixCache.get(prefix);
  if (cached !== void 0) return cached;
  let chk = 1;
  const length = prefix.length;
  for (let i = 0; i < length; i++) {
    const c = prefix.charCodeAt(i);
    if (c < 33 || c > 126) throw new Error(E_PREFIX);
    chk = p(chk) ^ c >> 5;
  }
  chk = p(chk);
  for (let i = 0; i < length; i++) {
    const c = prefix.charCodeAt(i);
    chk = p(chk) ^ c & 31;
  }
  if (prefixCache.size < 10) prefixCache.set(prefix, chk);
  return chk;
}
function toBech32enc(prefix, bytes, limit, encoding) {
  if (typeof prefix !== "string" || !prefix) throw new TypeError(E_PREFIX);
  if (typeof limit !== "number") throw new TypeError(E_SIZE);
  (0, import_utils.assertU8)(bytes);
  const bytesLength = bytes.length;
  const wordsLength = Math.ceil(bytesLength * 8 / 5);
  if (!(prefix.length + 7 + wordsLength <= limit)) throw new TypeError(E_SIZE);
  prefix = prefix.toLowerCase();
  const out = new Uint8Array(wordsLength + 6);
  let chk = pPrefix(prefix);
  let i = 0, j = 0;
  for (const length4 = bytesLength - 4; i < length4; i += 5, j += 8) {
    const b0 = bytes[i], b1 = bytes[i + 1], b2 = bytes[i + 2], b3 = bytes[i + 3], b4 = bytes[i + 4];
    const x0 = b0 >> 3;
    const x1 = b0 << 2 & 31 | b1 >> 6;
    const x2 = b1 >> 1 & 31;
    const x3 = b1 << 4 & 31 | b2 >> 4;
    const x4 = b2 << 1 & 31 | b3 >> 7;
    const x5 = b3 >> 2 & 31;
    const x6 = b3 << 3 & 31 | b4 >> 5;
    const x7 = b4 & 31;
    chk = merge(x2, x3, x4, x5, x6, x7) ^ poly0[x1] ^ poly1[x0] ^ p8(chk);
    out[j] = x2c[x0];
    out[j + 1] = x2c[x1];
    out[j + 2] = x2c[x2];
    out[j + 3] = x2c[x3];
    out[j + 4] = x2c[x4];
    out[j + 5] = x2c[x5];
    out[j + 6] = x2c[x6];
    out[j + 7] = x2c[x7];
  }
  let value = 0, bits = 0;
  for (; i < bytesLength; i++) {
    value = (value & 15) << 8 | bytes[i];
    bits += 3;
    const x = value >> bits & 31;
    chk = p(chk) ^ x;
    out[j++] = x2c[x];
    if (bits >= 5) {
      bits -= 5;
      const x2 = value >> bits & 31;
      chk = p(chk) ^ x2;
      out[j++] = x2c[x2];
    }
  }
  if (bits > 0) {
    const x = value << 5 - bits & 31;
    chk = p(chk) ^ x;
    out[j++] = x2c[x];
  }
  chk = encoding ^ p6(chk);
  out[j++] = x2c[chk >> 25 & 31];
  out[j++] = x2c[chk >> 20 & 31];
  out[j++] = x2c[chk >> 15 & 31];
  out[j++] = x2c[chk >> 10 & 31];
  out[j++] = x2c[chk >> 5 & 31];
  out[j++] = x2c[chk >> 0 & 31];
  return prefix + "1" + (0, import_latin1.decodeAscii)(out);
}
function assertDecodeArgs(str, limit) {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  if (typeof limit !== "number" || str.length < 8 || !(str.length <= limit)) throw new Error(E_SIZE);
}
const NON_LATIN = /[^\x00-\xFF]/;
function fromBech32enc(str, limit, encoding) {
  assertDecodeArgs(str, limit);
  const lower = str.toLowerCase();
  if (str !== lower) {
    if (str !== str.toUpperCase()) throw new Error(E_MIXED);
    str = lower;
  }
  const split = str.lastIndexOf("1");
  if (split <= 0) throw new Error(E_PREFIX);
  const prefix = str.slice(0, split);
  const charsLength = str.length - split - 1;
  const wordsLength = charsLength - 6;
  if (wordsLength < 0) throw new Error(E_SIZE);
  const bytesLength = wordsLength * 5 >> 3;
  const slice = str.slice(split + 1);
  if (!import_platform.nativeEncoder && NON_LATIN.test(slice)) throw new SyntaxError(E_CHARACTER);
  const c = import_platform.nativeEncoder ? (0, import_latin1.encodeAscii)(slice, E_CHARACTER) : (0, import_latin1.encodeLatin1)(slice);
  const bytes = new Uint8Array(bytesLength);
  let chk = pPrefix(prefix);
  let i = 0, j = 0;
  for (const length7 = wordsLength - 7; i < length7; i += 8, j += 5) {
    const c0 = c[i], c1 = c[i + 1], c2 = c[i + 2], c3 = c[i + 3], c4 = c[i + 4], c5 = c[i + 5], c6 = c[i + 6], c7 = c[i + 7];
    const x0 = c2x[c0], x1 = c2x[c1], x2 = c2x[c2], x3 = c2x[c3], x4 = c2x[c4], x5 = c2x[c5], x6 = c2x[c6], x7 = c2x[c7];
    if (x0 < 0 || x1 < 0 || x2 < 0 || x3 < 0 || x4 < 0 || x5 < 0 || x6 < 0 || x7 < 0) throw new SyntaxError(E_CHARACTER);
    chk = merge(x2, x3, x4, x5, x6, x7) ^ poly0[x1] ^ poly1[x0] ^ p8(chk);
    bytes[j] = x0 << 3 | x1 >> 2;
    bytes[j + 1] = (x1 << 6 | x2 << 1) & 255 | x3 >> 4;
    bytes[j + 2] = x3 << 4 & 255 | x4 >> 1;
    bytes[j + 3] = (x4 << 5 | x5) << 2 & 255 | x6 >> 3;
    bytes[j + 4] = x6 << 5 & 255 | x7;
  }
  let value = 0, bits = 0;
  for (; i < wordsLength; i++) {
    const x = c2x[c[i]];
    if (x < 0) throw new SyntaxError(E_CHARACTER);
    chk = p(chk) ^ x;
    value = value << 5 | x;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes[j++] = value >> bits & 255;
    }
  }
  if (bits >= 5 || value << 8 - bits & 255) throw new Error(E_PADDING);
  {
    const c0 = c[i], c1 = c[i + 1], c2 = c[i + 2], c3 = c[i + 3], c4 = c[i + 4], c5 = c[i + 5];
    const x0 = c2x[c0], x1 = c2x[c1], x2 = c2x[c2], x3 = c2x[c3], x4 = c2x[c4], x5 = c2x[c5];
    if (x0 < 0 || x1 < 0 || x2 < 0 || x3 < 0 || x4 < 0 || x5 < 0) throw new SyntaxError(E_CHARACTER);
    if ((merge(x0, x1, x2, x3, x4, x5) ^ p6(chk)) !== encoding) throw new Error(E_CHECKSUM);
  }
  return { prefix, bytes };
}
function getPrefix(str, limit = 90) {
  assertDecodeArgs(str, limit);
  const split = str.lastIndexOf("1");
  if (split <= 0) throw new Error(E_PREFIX);
  return str.slice(0, split).toLowerCase();
}
const toBech32 = (prefix, bytes, limit = 90) => toBech32enc(prefix, bytes, limit, BECH32);
const fromBech32 = (str, limit = 90) => fromBech32enc(str, limit, BECH32);
const toBech32m = (prefix, bytes, limit = 90) => toBech32enc(prefix, bytes, limit, BECH32M);
const fromBech32m = (str, limit = 90) => fromBech32enc(str, limit, BECH32M);
