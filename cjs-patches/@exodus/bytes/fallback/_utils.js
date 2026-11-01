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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  E_STRICT_UNICODE: () => E_STRICT_UNICODE,
  E_STRING: () => E_STRING,
  assert: () => assert,
  assertU8: () => assertU8,
  fromBuffer: () => fromBuffer,
  fromUint8: () => fromUint8,
  toBuf: () => toBuf
});
module.exports = __toCommonJS(stdin_exports);
__reExport(stdin_exports, require("./platform.js"), module.exports);
const Buffer2 = /* @__PURE__ */ (() => globalThis.Buffer)();
function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}
function assertU8(arg) {
  if (arg && arg instanceof Uint8Array) return;
  throw new TypeError("Expected an Uint8Array");
}
const toBuf = (x) => x.byteLength <= 64 && x.BYTES_PER_ELEMENT === 1 ? Buffer2.from(x) : Buffer2.from(x.buffer, x.byteOffset, x.byteLength);
const E_STRING = "Input is not a string";
const E_STRICT_UNICODE = "Input is not well-formed Unicode";
function fromUint8(arr, format) {
  switch (format) {
    case "uint8":
      if (arr.constructor !== Uint8Array) throw new Error("Unexpected");
      return arr;
    case "arraybuffer":
      if (arr.byteLength !== arr.buffer.byteLength) throw new Error("Unexpected");
      return arr.buffer;
    case "buffer":
      if (arr.length <= 64) return Buffer2.from(arr);
      return Buffer2.from(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  throw new TypeError("Unexpected format");
}
function fromBuffer(arr, format) {
  switch (format) {
    case "uint8":
      if (arr.length <= 64 || arr.byteOffset !== 0 || arr.byteLength !== arr.buffer.byteLength) {
        return new Uint8Array(arr);
      }
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    case "arraybuffer":
      return arr.buffer.byteLength === arr.byteLength ? arr.buffer : arr.buffer.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    case "buffer":
      if (arr.constructor !== Buffer2) throw new Error("Unexpected");
      return arr;
  }
  throw new TypeError("Unexpected format");
}
