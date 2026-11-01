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
  E_CHAR: () => E_CHAR,
  E_LAST: () => E_LAST,
  E_LENGTH: () => E_LENGTH,
  E_PADDING: () => E_PADDING,
  fromBase64: () => fromBase64,
  toBase64: () => toBase64
});
module.exports = __toCommonJS(stdin_exports);
var import_platform = require("./platform.js");
var import_latin1 = require("./latin1.js");
const BASE64 = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"];
const BASE64URL = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"];
const BASE64_HELPERS = {};
const BASE64URL_HELPERS = {};
const E_CHAR = "Invalid character in base64 input";
const E_PADDING = "Invalid base64 padding";
const E_LENGTH = "Invalid base64 length";
const E_LAST = "Invalid last chunk";
function toBase64(arr, isURL, padding) {
  const fullChunks = arr.length / 3 | 0;
  const fullChunksBytes = fullChunks * 3;
  let o = "";
  let i = 0;
  const alphabet = isURL ? BASE64URL : BASE64;
  const helpers = isURL ? BASE64URL_HELPERS : BASE64_HELPERS;
  if (!helpers.pairs) {
    helpers.pairs = [];
    if (import_platform.nativeDecoder) {
      helpers.codepairs = new Uint16Array(64 * 64);
      const u16 = helpers.codepairs;
      const u8 = new Uint8Array(u16.buffer, u16.byteOffset, u16.byteLength);
      for (let i2 = 0; i2 < 64; i2++) {
        const ic = alphabet[i2].charCodeAt(0);
        for (let j = 0; j < 64; j++) u8[i2 << 7 | j << 1] = u8[j << 7 | (i2 << 1) + 1] = ic;
      }
    } else {
      const p = helpers.pairs;
      for (let i2 = 0; i2 < 64; i2++) {
        for (let j = 0; j < 64; j++) p.push(`${alphabet[i2]}${alphabet[j]}`);
      }
    }
  }
  const { pairs, codepairs } = helpers;
  if (import_platform.nativeDecoder) {
    const oa = new Uint16Array(fullChunks * 2);
    let j = 0;
    for (const last = arr.length - 11; i < last; i += 12, j += 8) {
      const x0 = arr[i];
      const x1 = arr[i + 1];
      const x2 = arr[i + 2];
      const x3 = arr[i + 3];
      const x4 = arr[i + 4];
      const x5 = arr[i + 5];
      const x6 = arr[i + 6];
      const x7 = arr[i + 7];
      const x8 = arr[i + 8];
      const x9 = arr[i + 9];
      const x10 = arr[i + 10];
      const x11 = arr[i + 11];
      oa[j] = codepairs[x0 << 4 | x1 >> 4];
      oa[j + 1] = codepairs[(x1 & 15) << 8 | x2];
      oa[j + 2] = codepairs[x3 << 4 | x4 >> 4];
      oa[j + 3] = codepairs[(x4 & 15) << 8 | x5];
      oa[j + 4] = codepairs[x6 << 4 | x7 >> 4];
      oa[j + 5] = codepairs[(x7 & 15) << 8 | x8];
      oa[j + 6] = codepairs[x9 << 4 | x10 >> 4];
      oa[j + 7] = codepairs[(x10 & 15) << 8 | x11];
    }
    for (const last = arr.length - 2; i < last; i += 3, j += 2) {
      const a = arr[i];
      const b = arr[i + 1];
      const c = arr[i + 2];
      oa[j] = codepairs[a << 4 | b >> 4];
      oa[j + 1] = codepairs[(b & 15) << 8 | c];
    }
    o = (0, import_latin1.decodeAscii)(oa);
  } else {
    for (; i < fullChunksBytes; i += 3) {
      const a = arr[i];
      const b = arr[i + 1];
      const c = arr[i + 2];
      o += pairs[a << 4 | b >> 4];
      o += pairs[(b & 15) << 8 | c];
    }
  }
  let carry = 0;
  let shift = 2;
  const length = arr.length;
  for (; i < length; i++) {
    const x = arr[i];
    o += alphabet[carry | x >> shift];
    if (shift === 6) {
      shift = 0;
      o += alphabet[x & 63];
    }
    carry = x << 6 - shift & 63;
    shift += 2;
  }
  if (shift !== 2) o += alphabet[carry];
  if (padding) o += ["", "==", "="][length - fullChunksBytes];
  return o;
}
const mapSize = import_platform.nativeEncoder ? 128 : 65536;
function fromBase64(str, isURL) {
  let inputLength = str.length;
  while (str[inputLength - 1] === "=") inputLength--;
  const paddingLength = str.length - inputLength;
  const tailLength = inputLength % 4;
  const mainLength = inputLength - tailLength;
  if (tailLength === 1) throw new SyntaxError(E_LENGTH);
  if (paddingLength > 3 || paddingLength !== 0 && str.length % 4 !== 0) {
    throw new SyntaxError(E_PADDING);
  }
  const alphabet = isURL ? BASE64URL : BASE64;
  const helpers = isURL ? BASE64URL_HELPERS : BASE64_HELPERS;
  if (!helpers.fromMap) {
    helpers.fromMap = new Int8Array(mapSize).fill(-1);
    alphabet.forEach((c2, i2) => helpers.fromMap[c2.charCodeAt(0)] = i2);
  }
  const m = helpers.fromMap;
  const arr = new Uint8Array(Math.floor(inputLength * 3 / 4));
  let at = 0;
  let i = 0;
  if (import_platform.nativeEncoder) {
    const codes = (0, import_latin1.encodeAscii)(str, E_CHAR);
    for (; i < mainLength; i += 4) {
      const c0 = codes[i];
      const c1 = codes[i + 1];
      const c2 = codes[i + 2];
      const c3 = codes[i + 3];
      const a = m[c0] << 18 | m[c1] << 12 | m[c2] << 6 | m[c3];
      if (a < 0) throw new SyntaxError(E_CHAR);
      arr[at] = a >> 16;
      arr[at + 1] = a >> 8 & 255;
      arr[at + 2] = a & 255;
      at += 3;
    }
  } else {
    for (; i < mainLength; i += 4) {
      const c0 = str.charCodeAt(i);
      const c1 = str.charCodeAt(i + 1);
      const c2 = str.charCodeAt(i + 2);
      const c3 = str.charCodeAt(i + 3);
      const a = m[c0] << 18 | m[c1] << 12 | m[c2] << 6 | m[c3];
      if (a < 0) throw new SyntaxError(E_CHAR);
      arr[at] = a >> 16;
      arr[at + 1] = a >> 8 & 255;
      arr[at + 2] = a & 255;
      at += 3;
    }
  }
  if (tailLength < 2) return arr;
  const ab = m[str.charCodeAt(i++)] << 6 | m[str.charCodeAt(i++)];
  if (ab < 0) throw new SyntaxError(E_CHAR);
  arr[at++] = ab >> 4;
  if (tailLength < 3) {
    if (ab & 15) throw new SyntaxError(E_LAST);
    return arr;
  }
  const c = m[str.charCodeAt(i++)];
  if (c < 0) throw new SyntaxError(E_CHAR);
  arr[at++] = ab << 4 & 255 | c >> 2;
  if (c & 3) throw new SyntaxError(E_LAST);
  return arr;
}
