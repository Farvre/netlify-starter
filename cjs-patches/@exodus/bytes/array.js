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
  typedCopyBytes: () => typedCopyBytes,
  typedView: () => typedView
});
module.exports = __toCommonJS(stdin_exports);
var import_assert = require("./assert.js");
const Buffer2 = globalThis.Buffer;
function typedView(arr, format) {
  (0, import_assert.assertTypedArray)(arr);
  switch (format) {
    case "uint8":
      if (arr.constructor === Uint8Array) return arr;
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    case "buffer":
      if (arr.constructor === Buffer2 && Buffer2.isBuffer(arr)) return arr;
      return Buffer2.from(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  throw new TypeError("Unexpected format");
}
function typedCopyBytes(arr, format) {
  (0, import_assert.assertTypedArray)(arr);
  if (!(arr instanceof Uint8Array)) {
    arr = new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  switch (format) {
    case "uint8":
      return Uint8Array.from(arr);
    // never pooled
    case "buffer":
      return Buffer2.from(arr);
    case "arraybuffer":
      return Uint8Array.from(arr).buffer;
  }
  throw new TypeError("Unexpected format");
}
