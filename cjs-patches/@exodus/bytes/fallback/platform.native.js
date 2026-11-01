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
  decode2string: () => decode2string,
  decodePartAddition: () => decodePartAddition,
  decodePartTemplates: () => decodePartTemplates,
  encodeCharcodes: () => encodeCharcodes,
  encodeCharcodesPure: () => encodeCharcodesPure,
  isDeno: () => isDeno,
  isHermes: () => isHermes,
  isLE: () => isLE,
  nativeBuffer: () => nativeBuffer,
  nativeDecoder: () => nativeDecoder,
  nativeDecoderLatin1: () => nativeDecoderLatin1,
  nativeEncoder: () => nativeEncoder
});
module.exports = __toCommonJS(stdin_exports);
const { Buffer: Buffer2 } = globalThis;
const haveNativeBuffer = Buffer2 && !Buffer2.TYPED_ARRAY_SUPPORT;
const nativeBuffer = haveNativeBuffer ? Buffer2 : null;
const isHermes = /* @__PURE__ */ (() => !!globalThis.HermesInternal)();
const isDeno = /* @__PURE__ */ (() => !!globalThis.Deno)();
const isLE = /* @__PURE__ */ (() => new Uint8Array(Uint16Array.of(258).buffer)[0] === 2)();
let isNative = (x) => x && (haveNativeBuffer || `${x}`.includes("[native code]"));
if (!haveNativeBuffer && isNative(() => {
})) isNative = () => false;
const nativeEncoder = /* @__PURE__ */ (() => isNative(globalThis.TextEncoder) ? new TextEncoder() : null)();
const nativeDecoder = /* @__PURE__ */ (() => isNative(globalThis.TextDecoder) ? new TextDecoder("utf-8", { ignoreBOM: true }) : null)();
const nativeDecoderLatin1 = /* @__PURE__ */ (() => {
  if (nativeDecoder) {
    try {
      return new TextDecoder("latin1", { ignoreBOM: true });
    } catch {
    }
  }
  return null;
})();
function decodePartAddition(a, start, end, m) {
  let o = "";
  let i = start;
  for (const last3 = end - 3; i < last3; i += 4) {
    const x0 = a[i];
    const x1 = a[i + 1];
    const x2 = a[i + 2];
    const x3 = a[i + 3];
    o += m[x0];
    o += m[x1];
    o += m[x2];
    o += m[x3];
  }
  while (i < end) o += m[a[i++]];
  return o;
}
function decodePartTemplates(a, start, end, m) {
  let o = "";
  let i = start;
  for (const last15 = end - 15; i < last15; i += 16) {
    const x0 = a[i];
    const x1 = a[i + 1];
    const x2 = a[i + 2];
    const x3 = a[i + 3];
    const x4 = a[i + 4];
    const x5 = a[i + 5];
    const x6 = a[i + 6];
    const x7 = a[i + 7];
    const x8 = a[i + 8];
    const x9 = a[i + 9];
    const x10 = a[i + 10];
    const x11 = a[i + 11];
    const x12 = a[i + 12];
    const x13 = a[i + 13];
    const x14 = a[i + 14];
    const x15 = a[i + 15];
    o += `${m[x0]}${m[x1]}${m[x2]}${m[x3]}${m[x4]}${m[x5]}${m[x6]}${m[x7]}${m[x8]}${m[x9]}${m[x10]}${m[x11]}${m[x12]}${m[x13]}${m[x14]}${m[x15]}`;
  }
  while (i < end) o += m[a[i++]];
  return o;
}
const decodePart = isHermes ? decodePartTemplates : decodePartAddition;
function decode2string(arr, start, end, m) {
  if (end - start > 3e4) {
    const concat = [];
    for (let i = start; i < end; ) {
      const step = i + 500;
      const iNext = step > end ? end : step;
      concat.push(decodePart(arr, i, iNext, m));
      i = iNext;
    }
    const res = concat.join("");
    concat.length = 0;
    return res;
  }
  return decodePart(arr, start, end, m);
}
function encodeCharcodesHermes(str, arr) {
  const length = str.length;
  if (length > 64) {
    const at = str.charCodeAt.bind(str);
    for (let i = 0; i < length; i++) arr[i] = at(i);
  } else {
    for (let i = 0; i < length; i++) arr[i] = str.charCodeAt(i);
  }
  return arr;
}
function encodeCharcodesPure(str, arr) {
  const length = str.length;
  for (let i = 0; i < length; i++) arr[i] = str.charCodeAt(i);
  return arr;
}
const encodeCharcodes = isHermes ? encodeCharcodesHermes : encodeCharcodesPure;
