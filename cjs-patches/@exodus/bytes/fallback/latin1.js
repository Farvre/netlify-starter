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
  asciiPrefix: () => asciiPrefix,
  decodeAscii: () => decodeAscii,
  decodeLatin1: () => decodeLatin1,
  decodeUCS2: () => decodeUCS2,
  encodeAscii: () => encodeAscii,
  encodeAsciiPrefix: () => encodeAsciiPrefix,
  encodeLatin1: () => encodeLatin1
});
module.exports = __toCommonJS(stdin_exports);
var import_platform = require("./platform.js");
const atob = /* @__PURE__ */ (() => globalThis.atob)();
const web64 = /* @__PURE__ */ (() => Uint8Array.prototype.toBase64)();
const maxFunctionArgs = 8192;
const useLatin1atob = web64 && atob;
function asciiPrefix(arr) {
  let p = 0;
  const length = arr.length;
  if (length > 64) {
    const u32start = (4 - (arr.byteOffset & 3)) % 4;
    for (; p < u32start; p++) if (arr[p] >= 128) return p;
    const u32length = (arr.byteLength - u32start) / 4 | 0;
    const u32 = new Uint32Array(arr.buffer, arr.byteOffset + u32start, u32length);
    let i = 0;
    for (const last3 = u32length - 3; ; p += 16, i += 4) {
      if (i >= last3) break;
      const a = u32[i];
      const b = u32[i + 1];
      const c = u32[i + 2];
      const d = u32[i + 3];
      if (a & 2155905152 || b & 2155905152 || c & 2155905152 || d & 2155905152) break;
    }
    for (; i < u32length; p += 4, i++) if (u32[i] & 2155905152) break;
  }
  for (; p < length; p++) if (arr[p] >= 128) return p;
  return length;
}
function decodeLatin1(arr, start = 0, stop = arr.length) {
  start |= 0;
  stop |= 0;
  const total = stop - start;
  if (total === 0) return "";
  if (useLatin1atob && total >= 256 && total < 1e8 && arr.toBase64 === web64 && arr.BYTES_PER_ELEMENT === 1) {
    const sliced2 = start === 0 && stop === arr.length ? arr : arr.subarray(start, stop);
    return atob(sliced2.toBase64());
  }
  if (total > maxFunctionArgs) {
    let prefix = "";
    for (let i = start; i < stop; ) {
      const i1 = Math.min(stop, i + maxFunctionArgs);
      prefix += String.fromCharCode.apply(String, arr.subarray(i, i1));
      i = i1;
    }
    return prefix;
  }
  const sliced = start === 0 && stop === arr.length ? arr : arr.subarray(start, stop);
  return String.fromCharCode.apply(String, sliced);
}
const decodeUCS2 = import_platform.nativeBuffer && import_platform.isLE && !import_platform.isDeno ? (u16, stop = u16.length) => {
  if (stop > 32) return import_platform.nativeBuffer.from(u16.buffer, u16.byteOffset, stop * 2).ucs2Slice();
  return decodeLatin1(u16, 0, stop);
} : (u16, stop = u16.length) => decodeLatin1(u16, 0, stop);
const decodeAscii = import_platform.nativeBuffer ? (a) => (
  // Buffer is faster on Node.js (but only for long enough data), if we know that output is ascii
  a.byteLength >= 768 && !import_platform.isDeno ? import_platform.nativeBuffer.from(a.buffer, a.byteOffset, a.byteLength).latin1Slice(0, a.byteLength) : import_platform.nativeDecoder.decode(a)
) : import_platform.nativeDecoderLatin1 ? (a) => import_platform.nativeDecoderLatin1.decode(a) : (a) => decodeLatin1(
  a instanceof Uint8Array ? a : new Uint8Array(a.buffer, a.byteOffset, a.byteLength)
);
function encodeAsciiPrefix(x, s) {
  let i = 0;
  for (const len3 = s.length - 3; i < len3; i += 4) {
    const x0 = s.charCodeAt(i), x1 = s.charCodeAt(i + 1), x2 = s.charCodeAt(i + 2), x3 = s.charCodeAt(i + 3);
    if ((x0 | x1 | x2 | x3) >= 128) break;
    x[i] = x0;
    x[i + 1] = x1;
    x[i + 2] = x2;
    x[i + 3] = x3;
  }
  return i;
}
const encodeLatin1 = (str) => (0, import_platform.encodeCharcodes)(str, new Uint8Array(str.length));
const useEncodeInto = /* @__PURE__ */ (() => import_platform.isHermes && import_platform.nativeEncoder?.encodeInto)();
const encodeAscii = useEncodeInto ? (str, ERR) => {
  const codes = new Uint8Array(str.length + 4);
  const info = import_platform.nativeEncoder.encodeInto(str, codes);
  if (info.read !== str.length || info.written !== str.length) throw new SyntaxError(ERR);
  return codes.subarray(0, str.length);
} : import_platform.nativeBuffer ? (str, ERR) => {
  const codes = import_platform.nativeBuffer.from(str, "utf8");
  if (codes.length !== str.length) throw new SyntaxError(ERR);
  return new Uint8Array(codes.buffer, codes.byteOffset, codes.byteLength);
} : (str, ERR) => {
  const codes = import_platform.nativeEncoder.encode(str);
  if (codes.length !== str.length) throw new SyntaxError(ERR);
  return codes;
};
