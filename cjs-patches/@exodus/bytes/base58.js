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
  fromBase58: () => fromBase58,
  fromBase58xrp: () => fromBase58xrp,
  toBase58: () => toBase58,
  toBase58xrp: () => toBase58xrp
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./fallback/_utils.js");
var import_platform = require("./fallback/platform.js");
var import_latin1 = require("./fallback/latin1.js");
const alphabet58 = [..."123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"];
const alphabetXRP = [..."rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"];
const codes58 = new Uint8Array(alphabet58.map((x) => x.charCodeAt(0)));
const codesXRP = new Uint8Array(alphabetXRP.map((x) => x.charCodeAt(0)));
const _0n = BigInt(0);
const _1n = BigInt(1);
const _8n = BigInt(8);
const _32n = BigInt(32);
const _58n = BigInt(58);
const _0xffffffffn = BigInt(4294967295);
let table;
const fromMaps = /* @__PURE__ */ new Map();
const E_CHAR = "Invalid character in base58 input";
const shouldUseBigIntFrom = import_platform.isHermes;
function toBase58core(arr, alphabet, codes) {
  (0, import_utils.assertU8)(arr);
  const length = arr.length;
  if (length === 0) return "";
  const ZERO = alphabet[0];
  let zeros = 0;
  while (zeros < length && arr[zeros] === 0) zeros++;
  if (length > 60) {
    let x = _0n;
    for (let i = 0; i < arr.length; i++) x = x << _8n | BigInt(arr[i]);
    let out2 = "";
    while (x) {
      const d = x / _58n;
      out2 = alphabet[Number(x - _58n * d)] + out2;
      x = d;
    }
    return ZERO.repeat(zeros) + out2;
  }
  if (!table) {
    table = [];
    let x = _1n;
    for (let i = 0; i < 15; i++) {
      const in58 = [];
      let y = x;
      while (y) {
        const d = y / _58n;
        in58.push(Number(y - _58n * d));
        y = d;
      }
      table.push(new Uint8Array(in58));
      x <<= _32n;
    }
  }
  const res = [];
  {
    let j = 0;
    for (let i = length - 1; i >= 0; i -= 4) {
      let c;
      if (i > 2) {
        c = (arr[i] | arr[i - 1] << 8 | arr[i - 2] << 16 | arr[i - 3] << 24) >>> 0;
      } else if (i > 1) {
        c = arr[i] | arr[i - 1] << 8 | arr[i - 2] << 16;
      } else {
        c = i === 1 ? arr[i] | arr[i - 1] << 8 : arr[i];
      }
      const row = table[j++];
      if (c === 0) continue;
      const olen = res.length;
      const nlen = row.length;
      let k = 0;
      for (; k < olen; k++) res[k] += c * row[k];
      while (k < nlen) res.push(c * row[k++]);
    }
  }
  {
    let carry = 0;
    let i = 0;
    while (i < res.length) {
      const c = res[i] + carry;
      carry = Math.floor(c / 58);
      res[i++] = c - carry * 58;
    }
    while (carry) {
      const c = carry;
      carry = Math.floor(c / 58);
      res.push(c - carry * 58);
    }
  }
  if (import_platform.nativeDecoder) {
    const oa = new Uint8Array(res.length);
    let j = 0;
    for (let i = res.length - 1; i >= 0; i--) oa[j++] = codes[res[i]];
    return ZERO.repeat(zeros) + (0, import_latin1.decodeAscii)(oa);
  }
  let out = "";
  for (let i = res.length - 1; i >= 0; i--) out += alphabet[res[i]];
  return ZERO.repeat(zeros) + out;
}
function fromBase58core(str, alphabet, codes, format = "uint8") {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  const length = str.length;
  if (length === 0) return (0, import_utils.fromUint8)(new Uint8Array(), format);
  const zeroC = codes[0];
  let zeros = 0;
  while (zeros < length && str.charCodeAt(zeros) === zeroC) zeros++;
  let fromMap = fromMaps.get(alphabet);
  if (!fromMap) {
    fromMap = new Int8Array(256).fill(-1);
    for (let i = 0; i < 58; i++) fromMap[alphabet[i].charCodeAt(0)] = i;
    fromMaps.set(alphabet, fromMap);
  }
  const size = zeros + ((length - zeros + 1) * 3 >> 2);
  const res = new Uint8Array(size);
  let at = size;
  if (shouldUseBigIntFrom) {
    let x = _0n;
    if (import_platform.nativeEncoder) {
      const codes2 = (0, import_latin1.encodeAscii)(str, E_CHAR);
      for (let i = zeros; i < length; i++) {
        const c = fromMap[codes2[i]];
        if (c < 0) throw new SyntaxError(E_CHAR);
        x = x * _58n + BigInt(c);
      }
    } else {
      for (let i = zeros; i < length; i++) {
        const charCode = str.charCodeAt(i);
        const c = fromMap[charCode];
        if (charCode > 255 || c < 0) throw new SyntaxError(E_CHAR);
        x = x * _58n + BigInt(c);
      }
    }
    while (x) {
      let y = Number(x & _0xffffffffn);
      x >>= _32n;
      res[--at] = y & 255;
      y >>>= 8;
      if (!x && !y) break;
      res[--at] = y & 255;
      y >>>= 8;
      if (!x && !y) break;
      res[--at] = y & 255;
      y >>>= 8;
      if (!x && !y) break;
      res[--at] = y & 255;
    }
  } else {
    for (let i = zeros; i < length; i++) {
      const charCode = str.charCodeAt(i);
      let c = fromMap[charCode];
      if (charCode > 255 || c < 0) throw new SyntaxError(E_CHAR);
      let k = size - 1;
      for (; ; ) {
        if (c === 0 && k < at) break;
        c += 58 * res[k];
        res[k] = c & 255;
        c >>>= 8;
        k--;
        if (c === 0 && k < at) break;
        c += 58 * res[k];
        res[k] = c & 255;
        c >>>= 8;
        k--;
        if (c === 0 && k < at) break;
        c += 58 * res[k];
        res[k] = c & 255;
        c >>>= 8;
        k--;
        if (c === 0 && k < at) break;
        c += 58 * res[k];
        res[k] = c & 255;
        c >>>= 8;
        k--;
      }
      at = k + 1;
      if (c !== 0 || at < zeros) throw new Error("Unexpected");
    }
  }
  return (0, import_utils.fromUint8)(res.slice(at - zeros), format);
}
const toBase58 = (arr) => toBase58core(arr, alphabet58, codes58);
const fromBase58 = (str, format) => fromBase58core(str, alphabet58, codes58, format);
const toBase58xrp = (arr) => toBase58core(arr, alphabetXRP, codesXRP);
const fromBase58xrp = (str, format) => fromBase58core(str, alphabetXRP, codesXRP, format);
