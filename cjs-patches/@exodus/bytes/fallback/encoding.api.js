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
  fromSource: () => fromSource,
  getBOMEncoding: () => getBOMEncoding
});
module.exports = __toCommonJS(stdin_exports);
function isAnyArrayBuffer(x) {
  if (x instanceof ArrayBuffer) return true;
  if (globalThis.SharedArrayBuffer && x instanceof SharedArrayBuffer) return true;
  if (!x || typeof x.byteLength !== "number") return false;
  const s = Object.prototype.toString.call(x);
  return s === "[object ArrayBuffer]" || s === "[object SharedArrayBuffer]";
}
function fromSource(x) {
  if (x instanceof Uint8Array) return x;
  if (ArrayBuffer.isView(x)) return new Uint8Array(x.buffer, x.byteOffset, x.byteLength);
  if (isAnyArrayBuffer(x)) {
    if ("detached" in x) return x.detached === true ? new Uint8Array() : new Uint8Array(x);
    try {
      return new Uint8Array(x);
    } catch {
      return new Uint8Array();
    }
  }
  throw new TypeError("Argument must be a SharedArrayBuffer, ArrayBuffer or ArrayBufferView");
}
function getBOMEncoding(input) {
  const u8 = fromSource(input);
  if (u8.length >= 3 && u8[0] === 239 && u8[1] === 187 && u8[2] === 191) return "utf-8";
  if (u8.length < 2) return null;
  if (u8[0] === 255 && u8[1] === 254) return "utf-16le";
  if (u8[0] === 254 && u8[1] === 255) return "utf-16be";
  return null;
}
