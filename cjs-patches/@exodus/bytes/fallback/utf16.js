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
  E_STRICT: () => E_STRICT,
  decode: () => decode,
  decodeApiDecoders: () => decodeApiDecoders,
  decodeApiJS: () => decodeApiJS,
  encode: () => encode,
  encodeApi: () => encodeApi,
  isWellFormed: () => isWellFormed,
  to16input: () => to16input,
  toWellFormed: () => toWellFormed
});
module.exports = __toCommonJS(stdin_exports);
var import_latin1 = require("./latin1.js");
var import_utils = require("./_utils.js");
var import_platform = require("./platform.js");
const E_STRICT = "Input is not well-formed utf16";
const isWellFormedStr = /* @__PURE__ */ (() => String.prototype.isWellFormed)();
const toWellFormedStr = /* @__PURE__ */ (() => String.prototype.toWellFormed)();
const replacementCodepoint = 65533;
const replacementCodepointSwapped = 65023;
const to16 = (a) => new Uint16Array(a.buffer, a.byteOffset, a.byteLength / 2);
function encodeApi(str, loose, format) {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  if (format !== "uint16" && format !== "uint8-le" && format !== "uint8-be") {
    throw new TypeError("Unknown format");
  }
  if (!loose && isWellFormedStr && !isWellFormedStr.call(str)) throw new TypeError(import_utils.E_STRICT_UNICODE);
  const shouldSwap = import_platform.isLE && format === "uint8-be" || !import_platform.isLE && format === "uint8-le";
  const u16 = encode(str, loose, !loose && isWellFormedStr, shouldSwap);
  return format === "uint16" ? u16 : new Uint8Array(u16.buffer, u16.byteOffset, u16.byteLength);
}
const fatalLE = import_platform.nativeDecoder ? new TextDecoder("utf-16le", { ignoreBOM: true, fatal: true }) : null;
const looseLE = import_platform.nativeDecoder ? new TextDecoder("utf-16le", { ignoreBOM: true }) : null;
const fatalBE = import_platform.nativeDecoder ? new TextDecoder("utf-16be", { ignoreBOM: true, fatal: true }) : null;
const looseBE = import_platform.nativeDecoder ? new TextDecoder("utf-16be", { ignoreBOM: true }) : null;
function decodeApiDecoders(input, loose, format) {
  if (format === "uint16") {
    if (!(input instanceof Uint16Array)) throw new TypeError("Expected an Uint16Array");
  } else if (format === "uint8-le" || format === "uint8-be") {
    (0, import_utils.assertU8)(input);
    if (input.byteLength % 2 !== 0) throw new TypeError("Expected even number of bytes");
  } else {
    throw new TypeError("Unknown format");
  }
  const le = format === "uint8-le" || format === "uint16" && import_platform.isLE;
  return (le ? loose ? looseLE : fatalLE : loose ? looseBE : fatalBE).decode(input);
}
function decodeApiJS(input, loose, format) {
  let u16;
  switch (format) {
    case "uint16":
      if (!(input instanceof Uint16Array)) throw new TypeError("Expected an Uint16Array");
      u16 = input;
      break;
    case "uint8-le":
      (0, import_utils.assertU8)(input);
      if (input.byteLength % 2 !== 0) throw new TypeError("Expected even number of bytes");
      u16 = to16input(input, true);
      break;
    case "uint8-be":
      (0, import_utils.assertU8)(input);
      if (input.byteLength % 2 !== 0) throw new TypeError("Expected even number of bytes");
      u16 = to16input(input, false);
      break;
    default:
      throw new TypeError("Unknown format");
  }
  const str = decode(u16, loose, !loose && isWellFormedStr || loose && toWellFormedStr);
  if (!loose && isWellFormedStr && !isWellFormedStr.call(str)) throw new TypeError(E_STRICT);
  if (loose && toWellFormedStr) return toWellFormedStr.call(str);
  return str;
}
function to16input(u8, le) {
  if (le === import_platform.isLE) return to16(u8.byteOffset % 2 === 0 ? u8 : Uint8Array.from(u8));
  return to16(swap16(Uint8Array.from(u8)));
}
const decode = (u16, loose = false, checked = false) => {
  if (checked || isWellFormed(u16)) return (0, import_latin1.decodeUCS2)(u16);
  if (!loose) throw new TypeError(E_STRICT);
  return (0, import_latin1.decodeUCS2)(toWellFormed(Uint16Array.from(u16)));
};
function encode(str, loose = false, checked = false, swapped = false) {
  const arr = new Uint16Array(str.length);
  if (checked) return swapped ? encodeCheckedSwapped(str, arr) : encodeChecked(str, arr);
  return swapped ? encodeUncheckedSwapped(str, arr, loose) : encodeUnchecked(str, arr, loose);
}
function swap16(u8) {
  let i = 0;
  for (const last3 = u8.length - 3; i < last3; i += 4) {
    const x0 = u8[i];
    const x1 = u8[i + 1];
    const x2 = u8[i + 2];
    const x3 = u8[i + 3];
    u8[i] = x1;
    u8[i + 1] = x0;
    u8[i + 2] = x3;
    u8[i + 3] = x2;
  }
  for (const last = u8.length - 1; i < last; i += 2) {
    const x0 = u8[i];
    const x1 = u8[i + 1];
    u8[i] = x1;
    u8[i + 1] = x0;
  }
  return u8;
}
const encodeChecked = (str, arr) => (0, import_platform.encodeCharcodes)(str, arr);
function encodeCheckedSwapped(str, arr) {
  const length = str.length;
  for (let i = 0; i < length; i++) {
    const x = str.charCodeAt(i);
    arr[i] = (x & 255) << 8 | x >> 8;
  }
  return arr;
}
function encodeUnchecked(str, arr, loose = false) {
  const length = str.length;
  for (let i = 0; i < length; i++) {
    const code = str.charCodeAt(i);
    arr[i] = code;
    if (code >= 55296 && code < 57344) {
      if (code > 56319 || i + 1 >= length) {
        if (!loose) throw new TypeError(import_utils.E_STRICT_UNICODE);
        arr[i] = replacementCodepoint;
      } else {
        const next = str.charCodeAt(i + 1);
        if (next < 56320 || next >= 57344) {
          if (!loose) throw new TypeError(import_utils.E_STRICT_UNICODE);
          arr[i] = replacementCodepoint;
        } else {
          i++;
          arr[i] = next;
        }
      }
    }
  }
  return arr;
}
function encodeUncheckedSwapped(str, arr, loose = false) {
  const length = str.length;
  for (let i = 0; i < length; i++) {
    const code = str.charCodeAt(i);
    arr[i] = (code & 255) << 8 | code >> 8;
    if (code >= 55296 && code < 57344) {
      if (code > 56319 || i + 1 >= length) {
        if (!loose) throw new TypeError(import_utils.E_STRICT_UNICODE);
        arr[i] = replacementCodepointSwapped;
      } else {
        const next = str.charCodeAt(i + 1);
        if (next < 56320 || next >= 57344) {
          if (!loose) throw new TypeError(import_utils.E_STRICT_UNICODE);
          arr[i] = replacementCodepointSwapped;
        } else {
          i++;
          arr[i] = (next & 255) << 8 | next >> 8;
        }
      }
    }
  }
  return arr;
}
function toWellFormed(u16) {
  const length = u16.length;
  for (let i = 0; i < length; i++) {
    const code = u16[i];
    if (code >= 55296 && code < 57344) {
      if (code > 56319 || i + 1 >= length) {
        u16[i] = replacementCodepoint;
      } else {
        const next = u16[i + 1];
        if (next < 56320 || next >= 57344) {
          u16[i] = replacementCodepoint;
        } else {
          i++;
        }
      }
    }
  }
  return u16;
}
function isWellFormed(u16) {
  const length = u16.length;
  let i = 0;
  const m = 2147516416;
  const l = 55296;
  const h = 57344;
  if (length > 32 && u16.byteOffset % 4 === 0) {
    const u32length = u16.byteLength / 4 | 0;
    const u32 = new Uint32Array(u16.buffer, u16.byteOffset, u32length);
    for (const last3 = u32length - 3; ; i += 4) {
      if (i >= last3) break;
      const a = u32[i];
      const b = u32[i + 1];
      const c = u32[i + 2];
      const d = u32[i + 3];
      if (a & m || b & m || c & m || d & m) break;
    }
    for (; i < u32length; i++) if (u32[i] & m) break;
    i *= 2;
  }
  for (const last3 = length - 3; ; i += 4) {
    if (i >= last3) break;
    const a = u16[i];
    const b = u16[i + 1];
    const c = u16[i + 2];
    const d = u16[i + 3];
    if (a >= l && a < h || b >= l && b < h || c >= l && c < h || d >= l && d < h) break;
  }
  for (; i < length; i++) {
    const code = u16[i];
    if (code >= l && code < h) {
      if (code >= 56320 || i + 1 >= length) return false;
      i++;
      const next = u16[i];
      if (next < 56320 || next >= h) return false;
    }
  }
  return true;
}
