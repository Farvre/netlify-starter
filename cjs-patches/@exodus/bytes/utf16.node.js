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
  utf16fromString: () => utf16fromString,
  utf16fromStringLoose: () => utf16fromStringLoose,
  utf16toString: () => utf16toString,
  utf16toStringLoose: () => utf16toStringLoose
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./fallback/_utils.js");
var import_platform = require("./fallback/platform.js");
var import_utf16 = require("./fallback/utf16.js");
if (Buffer.TYPED_ARRAY_SUPPORT) throw new Error("Unexpected Buffer polyfill");
const { isWellFormed, toWellFormed } = String.prototype;
const to8 = (a) => new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
function encode(str, loose = false, format = "uint16") {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  if (format !== "uint16" && format !== "uint8-le" && format !== "uint8-be") {
    throw new TypeError("Unknown format");
  }
  if (loose) {
    str = toWellFormed.call(str);
  } else if (!isWellFormed.call(str)) {
    throw new TypeError(import_utils.E_STRICT_UNICODE);
  }
  const ble = Buffer.allocUnsafeSlow(str.length * 2);
  ble.ucs2Write(str);
  if (format === "uint8-le") return to8(ble);
  if (format === "uint8-be") return to8(ble.swap16());
  if (format === "uint16") {
    const b = ble.byteOffset % 2 === 0 ? ble : Buffer.from(ble);
    if (!import_platform.isLE) b.swap16();
    return new Uint16Array(b.buffer, b.byteOffset, b.byteLength / 2);
  }
  throw new Error("Unreachable");
}
const swapped = (x, swap) => {
  const b = Buffer.from(x.buffer, x.byteOffset, x.byteLength);
  return swap ? Buffer.from(b).swap16() : b;
};
function decodeNode(input, loose = false, format = "uint16") {
  let ble;
  if (format === "uint16") {
    if (!(input instanceof Uint16Array)) throw new TypeError("Expected an Uint16Array");
    ble = swapped(input, !import_platform.isLE);
  } else if (format === "uint8-le" || format === "uint8-be") {
    (0, import_utils.assertU8)(input);
    if (input.byteLength % 2 !== 0) throw new TypeError("Expected even number of bytes");
    ble = swapped(input, format === "uint8-be");
  } else {
    throw new TypeError("Unknown format");
  }
  const str = ble.ucs2Slice(0, ble.byteLength);
  if (loose) return toWellFormed.call(str);
  if (isWellFormed.call(str)) return str;
  throw new TypeError(import_utf16.E_STRICT);
}
const decode = import_platform.isDeno ? import_utf16.decodeApiDecoders : decodeNode;
const utf16fromString = (str, format = "uint16") => encode(str, false, format);
const utf16fromStringLoose = (str, format = "uint16") => encode(str, true, format);
const utf16toString = (arr, format = "uint16") => decode(arr, false, format);
const utf16toStringLoose = (arr, format = "uint16") => decode(arr, true, format);
