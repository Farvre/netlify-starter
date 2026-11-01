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
  E_HEX: () => E_HEX,
  fromHex: () => fromHex,
  toHex: () => toHex
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./_utils.js");
var import_platform = require("./platform.js");
var import_latin1 = require("./latin1.js");
let hexArray;
let hexCodes;
let dehexArray;
const _00 = 12336;
const _ff = 26214;
const allowed = "0123456789ABCDEFabcdef";
const E_HEX = "Input is not a hex string";
function toHex(arr) {
  if (!hexArray) hexArray = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  const length = arr.length;
  if (import_platform.nativeDecoder) {
    if (!hexCodes) {
      hexCodes = new Uint16Array(256);
      const u8 = new Uint8Array(hexCodes.buffer, hexCodes.byteOffset, hexCodes.byteLength);
      for (let i2 = 0; i2 < 256; i2++) {
        const pair = hexArray[i2];
        u8[2 * i2] = pair.charCodeAt(0);
        u8[2 * i2 + 1] = pair.charCodeAt(1);
      }
    }
    const oa = new Uint16Array(length);
    let i = 0;
    for (const last3 = arr.length - 3; ; i += 4) {
      if (i >= last3) break;
      const x0 = arr[i];
      const x1 = arr[i + 1];
      const x2 = arr[i + 2];
      const x3 = arr[i + 3];
      oa[i] = hexCodes[x0];
      oa[i + 1] = hexCodes[x1];
      oa[i + 2] = hexCodes[x2];
      oa[i + 3] = hexCodes[x3];
    }
    for (; i < length; i++) oa[i] = hexCodes[arr[i]];
    return (0, import_latin1.decodeAscii)(oa);
  }
  return (0, import_platform.decode2string)(arr, 0, length, hexArray);
}
function fromHex(str) {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  if (str.length % 2 !== 0) throw new SyntaxError(E_HEX);
  const length = str.length / 2;
  const arr = new Uint8Array(length);
  if (import_platform.nativeEncoder) {
    if (!dehexArray) {
      dehexArray = new Uint8Array(_ff + 1);
      const u8 = new Uint8Array(2);
      const u16 = new Uint16Array(u8.buffer, u8.byteOffset, 1);
      const map = [...allowed].map((c) => [c.charCodeAt(0), parseInt(c, 16)]);
      for (const [ch, vh] of map) {
        u8[0] = ch;
        for (const [cl, vl] of map) {
          u8[1] = cl;
          dehexArray[u16[0]] = vh << 4 | vl;
        }
      }
    }
    const codes = (0, import_latin1.encodeAscii)(str, E_HEX);
    const codes16 = new Uint16Array(codes.buffer, codes.byteOffset, codes.byteLength / 2);
    let i = 0;
    for (const last3 = length - 3; i < last3; i += 4) {
      const ai = codes16[i];
      const bi = codes16[i + 1];
      const ci = codes16[i + 2];
      const di = codes16[i + 3];
      const a = dehexArray[ai];
      const b = dehexArray[bi];
      const c = dehexArray[ci];
      const d = dehexArray[di];
      if (!a && ai !== _00 || !b && bi !== _00 || !c && ci !== _00 || !d && di !== _00) {
        throw new SyntaxError(E_HEX);
      }
      arr[i] = a;
      arr[i + 1] = b;
      arr[i + 2] = c;
      arr[i + 3] = d;
    }
    while (i < length) {
      const ai = codes16[i];
      const a = dehexArray[ai];
      if (!a && ai !== _00) throw new SyntaxError(E_HEX);
      arr[i++] = a;
    }
  } else {
    if (!dehexArray) {
      dehexArray = new Int8Array(128).fill(-1);
      for (let i = 0; i < 16; i++) {
        const s = i.toString(16);
        dehexArray[s.charCodeAt(0)] = dehexArray[s.toUpperCase().charCodeAt(0)] = i;
      }
    }
    let j = 0;
    for (let i = 0; i < length; i++) {
      const a = str.charCodeAt(j++);
      const b = str.charCodeAt(j++);
      const res = dehexArray[a] << 4 | dehexArray[b];
      if (res < 0 || (127 | a | b) !== 127) throw new SyntaxError(E_HEX);
      arr[i] = res;
    }
  }
  return arr;
}
