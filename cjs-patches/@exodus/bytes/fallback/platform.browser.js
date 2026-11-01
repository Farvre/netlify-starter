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
  encodeCharcodes: () => import_platform_native2.encodeCharcodesPure,
  isDeno: () => isDeno,
  isHermes: () => isHermes,
  isLE: () => import_platform_native2.isLE,
  nativeBuffer: () => nativeBuffer,
  nativeDecoder: () => nativeDecoder,
  nativeDecoderLatin1: () => nativeDecoderLatin1,
  nativeEncoder: () => nativeEncoder
});
module.exports = __toCommonJS(stdin_exports);
var import_platform_native = require("./platform.native.js");
var import_platform_native2 = require("./platform.native.js");
const nativeBuffer = null;
const isHermes = false;
const isDeno = false;
const nativeEncoder = /* @__PURE__ */ (() => new TextEncoder())();
const nativeDecoder = /* @__PURE__ */ (() => new TextDecoder("utf-8", { ignoreBOM: true }))();
const nativeDecoderLatin1 = /* @__PURE__ */ (() => new TextDecoder("latin1", { ignoreBOM: true }))();
function decode2string(arr, start, end, m) {
  if (end - start > 3e4) {
    const concat = [];
    for (let i = start; i < end; ) {
      const step = i + 500;
      const iNext = step > end ? end : step;
      concat.push((0, import_platform_native.decodePartAddition)(arr, i, iNext, m));
      i = iNext;
    }
    const res = concat.join("");
    concat.length = 0;
    return res;
  }
  return (0, import_platform_native.decodePartAddition)(arr, start, end, m);
}
