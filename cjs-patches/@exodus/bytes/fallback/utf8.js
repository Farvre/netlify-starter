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
  decodeFast: () => decodeFast,
  encode: () => encode
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./_utils.js");
var import_platform = require("./platform.js");
var import_latin1 = require("./latin1.js");
const E_STRICT = "Input is not well-formed utf8";
const replacementPoint = 65533;
const shouldUseEscapePath = import_platform.isHermes;
const { decodeURIComponent, escape } = globalThis;
function decodeFast(arr, loose) {
  const prefix = (0, import_latin1.decodeLatin1)(arr, 0, (0, import_latin1.asciiPrefix)(arr));
  if (prefix.length === arr.length) return prefix;
  if (shouldUseEscapePath && escape && decodeURIComponent) {
    const o = escape((0, import_latin1.decodeLatin1)(arr, prefix.length, arr.length));
    try {
      return prefix + decodeURIComponent(o);
    } catch {
      if (!loose) throw new TypeError(E_STRICT);
    }
  }
  return prefix + decode(arr, loose, prefix.length);
}
function decode(arr, loose, start = 0) {
  start |= 0;
  const end = arr.length;
  let out = "";
  const chunkSize = 512;
  const tmpSize = Math.min(end - start, chunkSize + 1);
  const tmp = new Array(tmpSize).fill(0);
  let ti = 0;
  for (let i = start; i < end; i++) {
    if (ti >= chunkSize) {
      tmp.length = ti;
      out += String.fromCharCode.apply(String, tmp);
      if (tmp.length <= chunkSize) tmp.push(0);
      ti = 0;
    }
    const byte = arr[i];
    if (byte < 128) {
      tmp[ti++] = byte;
    } else if (byte < 194) {
      if (!loose) throw new TypeError(E_STRICT);
      tmp[ti++] = replacementPoint;
    } else if (byte < 224) {
      if (i + 1 >= end) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        break;
      }
      const byte1 = arr[i + 1];
      if (byte1 < 128 || byte1 > 191) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        continue;
      }
      i++;
      tmp[ti++] = (byte & 31) << 6 | byte1 & 63;
    } else if (byte < 240) {
      if (i + 1 >= end) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        break;
      }
      const lower = byte === 224 ? 160 : 128;
      const upper = byte === 237 ? 159 : 191;
      const byte1 = arr[i + 1];
      if (byte1 < lower || byte1 > upper) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        continue;
      }
      i++;
      if (i + 1 >= end) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        break;
      }
      const byte2 = arr[i + 1];
      if (byte2 < 128 || byte2 > 191) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        continue;
      }
      i++;
      tmp[ti++] = (byte & 15) << 12 | (byte1 & 63) << 6 | byte2 & 63;
    } else if (byte <= 244) {
      if (i + 1 >= end) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        break;
      }
      const lower = byte === 240 ? 144 : 128;
      const upper = byte === 244 ? 143 : 191;
      const byte1 = arr[i + 1];
      if (byte1 < lower || byte1 > upper) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        continue;
      }
      i++;
      if (i + 1 >= end) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        break;
      }
      const byte2 = arr[i + 1];
      if (byte2 < 128 || byte2 > 191) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        continue;
      }
      i++;
      if (i + 1 >= end) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        break;
      }
      const byte3 = arr[i + 1];
      if (byte3 < 128 || byte3 > 191) {
        if (!loose) throw new TypeError(E_STRICT);
        tmp[ti++] = replacementPoint;
        continue;
      }
      i++;
      const codePoint = (byte & 15) << 18 | (byte1 & 63) << 12 | (byte2 & 63) << 6 | byte3 & 63;
      if (codePoint > 65535) {
        const u = codePoint - 65536;
        tmp[ti++] = 55296 + (u >> 10 & 1023);
        tmp[ti++] = 56320 + (u & 1023);
      } else {
        tmp[ti++] = codePoint;
      }
    } else {
      if (!loose) throw new TypeError(E_STRICT);
      tmp[ti++] = replacementPoint;
    }
  }
  if (ti === 0) return out;
  tmp.length = ti;
  return out + String.fromCharCode.apply(String, tmp);
}
function encode(string, loose) {
  const length = string.length;
  let small = true;
  let bytes = new Uint8Array(length);
  let i = (0, import_latin1.encodeAsciiPrefix)(bytes, string);
  let p = i;
  for (; i < length; i++) {
    let code = string.charCodeAt(i);
    if (code < 128) {
      bytes[p++] = code;
      while (true) {
        i++;
        if (i >= length) break;
        code = string.charCodeAt(i);
        if (code >= 128) break;
        bytes[p++] = code;
        i++;
        if (i >= length) break;
        code = string.charCodeAt(i);
        if (code >= 128) break;
        bytes[p++] = code;
        i++;
        if (i >= length) break;
        code = string.charCodeAt(i);
        if (code >= 128) break;
        bytes[p++] = code;
        i++;
        if (i >= length) break;
        code = string.charCodeAt(i);
        if (code >= 128) break;
        bytes[p++] = code;
      }
      if (i >= length) break;
    }
    if (small) {
      if (p !== i) throw new Error("Unreachable");
      const bytesNew = new Uint8Array(p + (length - i) * 3);
      bytesNew.set(bytes);
      bytes = bytesNew;
      small = false;
    }
    if (code >= 55296 && code < 57344) {
      if (code > 56319 || i + 1 >= length) {
        if (!loose) throw new TypeError(import_utils.E_STRICT_UNICODE);
        bytes[p++] = 239;
        bytes[p++] = 191;
        bytes[p++] = 189;
        continue;
      }
      const next = string.charCodeAt(i + 1);
      if (next >= 56320 && next < 57344) {
        const codePoint = (code - 55296 << 10 | next - 56320) + 65536;
        bytes[p++] = codePoint >> 18 | 240;
        bytes[p++] = codePoint >> 12 & 63 | 128;
        bytes[p++] = codePoint >> 6 & 63 | 128;
        bytes[p++] = codePoint & 63 | 128;
        i++;
      } else {
        if (!loose) throw new TypeError(import_utils.E_STRICT_UNICODE);
        bytes[p++] = 239;
        bytes[p++] = 191;
        bytes[p++] = 189;
      }
      continue;
    }
    if (code < 2048) {
      bytes[p++] = code >> 6 | 192;
      bytes[p++] = code & 63 | 128;
    } else {
      bytes[p++] = code >> 12 | 224;
      bytes[p++] = code >> 6 & 63 | 128;
      bytes[p++] = code & 63 | 128;
    }
  }
  return bytes.length === p ? bytes : bytes.slice(0, p);
}
