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
  fromBase32: () => fromBase32,
  toBase32: () => toBase32
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./_utils.js");
var import_platform = require("./platform.js");
var import_latin1 = require("./latin1.js");
const BASE32_HELPERS = [{}, {}, {}];
const BASE32_ALPHABETS = [
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"],
  // RFC 4648, #6
  [..."0123456789ABCDEFGHIJKLMNOPQRSTUV"],
  // RFC 4648, #7
  [..."0123456789ABCDEFGHJKMNPQRSTVWXYZ"]
  // Crockford, base (see extra below in fromMap)
];
const E_CHAR = "Invalid character in base32 input";
const E_PADDING = "Invalid base32 padding";
const E_LENGTH = "Invalid base32 length";
const E_LAST = "Invalid last chunk";
const useTemplates = import_platform.isHermes;
function toBase32(arr, mode, padding) {
  (0, import_utils.assertU8)(arr);
  const fullChunks = Math.floor(arr.length / 5);
  const fullChunksBytes = fullChunks * 5;
  let o = "";
  let i = 0;
  const alphabet = BASE32_ALPHABETS[mode];
  const helpers = BASE32_HELPERS[mode];
  if (!helpers.pairs) {
    helpers.pairs = [];
    if (import_platform.nativeDecoder) {
      helpers.codepairs = new Uint16Array(32 * 32);
      const u16 = helpers.codepairs;
      const u8 = new Uint8Array(u16.buffer, u16.byteOffset, u16.byteLength);
      for (let i2 = 0; i2 < 32; i2++) {
        const ic = alphabet[i2].charCodeAt(0);
        for (let j = 0; j < 32; j++) u8[i2 << 6 | j << 1] = u8[j << 6 | (i2 << 1) + 1] = ic;
      }
    } else {
      const p = helpers.pairs;
      for (let i2 = 0; i2 < 32; i2++) {
        for (let j = 0; j < 32; j++) p.push(`${alphabet[i2]}${alphabet[j]}`);
      }
    }
  }
  const { pairs, codepairs } = helpers;
  if (import_platform.nativeDecoder) {
    const oa = new Uint16Array(fullChunks * 4);
    for (let j = 0; i < fullChunksBytes; i += 5) {
      const a = arr[i];
      const b = arr[i + 1];
      const c = arr[i + 2];
      const d = arr[i + 3];
      const e = arr[i + 4];
      const x0 = a << 2 | b >> 6;
      const x1 = (b & 63) << 4 | c >> 4;
      const x2 = (c & 15) << 6 | d >> 2;
      const x3 = (d & 3) << 8 | e;
      oa[j] = codepairs[x0];
      oa[j + 1] = codepairs[x1];
      oa[j + 2] = codepairs[x2];
      oa[j + 3] = codepairs[x3];
      j += 4;
    }
    o = (0, import_latin1.decodeAscii)(oa);
  } else if (useTemplates) {
    for (; i < fullChunksBytes; i += 5) {
      const a = arr[i];
      const b = arr[i + 1];
      const c = arr[i + 2];
      const d = arr[i + 3];
      const e = arr[i + 4];
      const x0 = a << 2 | b >> 6;
      const x1 = (b & 63) << 4 | c >> 4;
      const x2 = (c & 15) << 6 | d >> 2;
      const x3 = (d & 3) << 8 | e;
      o += `${pairs[x0]}${pairs[x1]}${pairs[x2]}${pairs[x3]}`;
    }
  } else {
    for (; i < fullChunksBytes; i += 5) {
      const a = arr[i];
      const b = arr[i + 1];
      const c = arr[i + 2];
      const d = arr[i + 3];
      const e = arr[i + 4];
      const x0 = a << 2 | b >> 6;
      const x1 = (b & 63) << 4 | c >> 4;
      const x2 = (c & 15) << 6 | d >> 2;
      const x3 = (d & 3) << 8 | e;
      o += pairs[x0];
      o += pairs[x1];
      o += pairs[x2];
      o += pairs[x3];
    }
  }
  let carry = 0;
  let shift = 3;
  for (; i < arr.length; i++) {
    const x = arr[i];
    o += alphabet[carry | x >> shift];
    if (shift >= 5) {
      shift -= 5;
      o += alphabet[x >> shift & 31];
    }
    carry = x << 5 - shift & 31;
    shift += 3;
  }
  if (shift !== 3) o += alphabet[carry];
  if (padding) o += ["", "======", "====", "===", "="][arr.length - fullChunksBytes];
  return o;
}
const mapSize = import_platform.nativeEncoder ? 128 : 65536;
function fromBase32(str, mode) {
  let inputLength = str.length;
  while (str[inputLength - 1] === "=") inputLength--;
  const paddingLength = str.length - inputLength;
  const tailLength = inputLength % 8;
  const mainLength = inputLength - tailLength;
  if (![0, 2, 4, 5, 7].includes(tailLength)) throw new SyntaxError(E_LENGTH);
  if (paddingLength > 7 || paddingLength !== 0 && str.length % 8 !== 0) {
    throw new SyntaxError(E_PADDING);
  }
  const alphabet = BASE32_ALPHABETS[mode];
  const helpers = BASE32_HELPERS[mode];
  if (!helpers.fromMap) {
    helpers.fromMap = new Int8Array(mapSize).fill(-1);
    const m2 = helpers.fromMap;
    alphabet.forEach((c, i2) => {
      m2[c.charCodeAt(0)] = m2[c.toLowerCase().charCodeAt(0)] = i2;
    });
    if (mode === 2) {
      m2[73] = m2[76] = m2[105] = m2[108] = m2[49];
      m2[79] = m2[111] = m2[48];
    }
  }
  const m = helpers.fromMap;
  const arr = new Uint8Array(Math.floor(inputLength * 5 / 8));
  let at = 0;
  let i = 0;
  if (import_platform.nativeEncoder) {
    const codes = (0, import_latin1.encodeAscii)(str, E_CHAR);
    for (; i < mainLength; i += 8) {
      const x0 = codes[i];
      const x1 = codes[i + 1];
      const x2 = codes[i + 2];
      const x3 = codes[i + 3];
      const x4 = codes[i + 4];
      const x5 = codes[i + 5];
      const x6 = codes[i + 6];
      const x7 = codes[i + 7];
      const a = m[x0] << 15 | m[x1] << 10 | m[x2] << 5 | m[x3];
      const b = m[x4] << 15 | m[x5] << 10 | m[x6] << 5 | m[x7];
      if (a < 0 || b < 0) throw new SyntaxError(E_CHAR);
      arr[at] = a >> 12;
      arr[at + 1] = a >> 4 & 255;
      arr[at + 2] = a << 4 & 255 | b >> 16;
      arr[at + 3] = b >> 8 & 255;
      arr[at + 4] = b & 255;
      at += 5;
    }
  } else {
    for (; i < mainLength; i += 8) {
      const x0 = str.charCodeAt(i);
      const x1 = str.charCodeAt(i + 1);
      const x2 = str.charCodeAt(i + 2);
      const x3 = str.charCodeAt(i + 3);
      const x4 = str.charCodeAt(i + 4);
      const x5 = str.charCodeAt(i + 5);
      const x6 = str.charCodeAt(i + 6);
      const x7 = str.charCodeAt(i + 7);
      const a = m[x0] << 15 | m[x1] << 10 | m[x2] << 5 | m[x3];
      const b = m[x4] << 15 | m[x5] << 10 | m[x6] << 5 | m[x7];
      if (a < 0 || b < 0) throw new SyntaxError(E_CHAR);
      arr[at] = a >> 12;
      arr[at + 1] = a >> 4 & 255;
      arr[at + 2] = a << 4 & 255 | b >> 16;
      arr[at + 3] = b >> 8 & 255;
      arr[at + 4] = b & 255;
      at += 5;
    }
  }
  if (tailLength < 2) return arr;
  const ab = m[str.charCodeAt(i++)] << 5 | m[str.charCodeAt(i++)];
  if (ab < 0) throw new SyntaxError(E_CHAR);
  arr[at++] = ab >> 2;
  if (tailLength < 4) {
    if (ab & 3) throw new SyntaxError(E_LAST);
    return arr;
  }
  const cd = m[str.charCodeAt(i++)] << 5 | m[str.charCodeAt(i++)];
  if (cd < 0) throw new SyntaxError(E_CHAR);
  arr[at++] = ab << 6 & 255 | cd >> 4;
  if (tailLength < 5) {
    if (cd & 15) throw new SyntaxError(E_LAST);
    return arr;
  }
  const e = m[str.charCodeAt(i++)];
  if (e < 0) throw new SyntaxError(E_CHAR);
  arr[at++] = cd << 4 & 255 | e >> 1;
  if (tailLength < 7) {
    if (e & 1) throw new SyntaxError(E_LAST);
    return arr;
  }
  const fg = m[str.charCodeAt(i++)] << 5 | m[str.charCodeAt(i++)];
  if (fg < 0) throw new SyntaxError(E_CHAR);
  arr[at++] = e << 7 & 255 | fg >> 3;
  if (fg & 7) throw new SyntaxError(E_LAST);
  return arr;
}
