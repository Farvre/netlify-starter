var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  E_ENCODING: () => E_ENCODING,
  TextDecoder: () => TextDecoder,
  TextDecoderStream: () => TextDecoderStream,
  TextEncoder: () => TextEncoder,
  TextEncoderStream: () => TextEncoderStream,
  getBOMEncoding: () => import_encoding_api2.getBOMEncoding,
  getMultibyteEncoder: () => getMultibyteEncoder,
  isMultibyte: () => isMultibyte,
  isomorphicDecode: () => isomorphicDecode,
  isomorphicEncode: () => isomorphicEncode,
  labelToName: () => labelToName,
  legacyHookDecode: () => legacyHookDecode,
  normalizeEncoding: () => normalizeEncoding,
  setMultibyte: () => setMultibyte
});
module.exports = __toCommonJS(stdin_exports);
var import_utf16 = require("@exodus/bytes/utf16.js");
var import_utf8 = require("@exodus/bytes/utf8.js");
var import_single_byte = require("@exodus/bytes/single-byte.js");
var import_encoding_labels = __toESM(require("./encoding.labels.js"));
var import_encoding_api = require("./encoding.api.js");
var import_encoding_util = require("./encoding.util.js");
var import_encoding_api2 = require("./encoding.api.js");
const E_ENCODING = "Unknown encoding";
const E_MULTI = "import '@exodus/bytes/encoding.js' for legacy multi-byte encodings support";
const E_OPTIONS = 'The "options" argument must be of type object';
const replacementChar = "\uFFFD";
const multibyteSet = /* @__PURE__ */ new Set(["big5", "euc-kr", "euc-jp", "iso-2022-jp", "shift_jis", "gbk", "gb18030"]);
let createMultibyteDecoder, multibyteEncoder;
let labelsMap;
function normalizeEncoding(label) {
  if (label === "utf-8" || label === "utf8" || label === "UTF-8" || label === "UTF8") return "utf-8";
  if (label === "windows-1252" || label === "ascii" || label === "latin1") return "windows-1252";
  if (/[^\w\t\n\f\r .:-]/i.test(label)) return null;
  const low = `${label}`.trim().toLowerCase();
  if (Object.hasOwn(import_encoding_labels.default, low)) return low;
  if (!labelsMap) {
    labelsMap = /* @__PURE__ */ new Map();
    for (const [name, aliases] of Object.entries(import_encoding_labels.default)) {
      for (const alias of aliases) labelsMap.set(alias, name);
    }
  }
  const mapped = labelsMap.get(low);
  if (mapped) return mapped;
  return null;
}
const uppercasePrefixes = /* @__PURE__ */ new Set(["utf", "iso", "koi", "euc", "ibm", "gbk"]);
function labelToName(label) {
  const enc = normalizeEncoding(label);
  if (enc === "utf-8") return "UTF-8";
  if (!enc) return enc;
  if (uppercasePrefixes.has(enc.slice(0, 3))) return enc.toUpperCase();
  if (enc === "big5") return "Big5";
  if (enc === "shift_jis") return "Shift_JIS";
  return enc;
}
const isMultibyte = (enc) => multibyteSet.has(enc);
function setMultibyte(createDecoder, createEncoder) {
  createMultibyteDecoder = createDecoder;
  multibyteEncoder = createEncoder;
}
function getMultibyteEncoder() {
  if (!multibyteEncoder) throw new Error(E_MULTI);
  return multibyteEncoder;
}
const define = (obj, key, value) => Object.defineProperty(obj, key, { value, writable: false });
function isAnyUint8Array(x) {
  if (x instanceof Uint8Array) return true;
  if (!x || !ArrayBuffer.isView(x) || x.BYTES_PER_ELEMENT !== 1) return false;
  return Object.prototype.toString.call(x) === "[object Uint8Array]";
}
function unicodeDecoder(encoding, loose) {
  if (encoding === "utf-8") return loose ? import_utf8.utf8toStringLoose : import_utf8.utf8toString;
  const form = encoding === "utf-16le" ? "uint8-le" : "uint8-be";
  return loose ? (u) => (0, import_utf16.utf16toStringLoose)(u, form) : (u) => (0, import_utf16.utf16toString)(u, form);
}
class TextDecoder {
  #decode;
  #unicode;
  #multibyte;
  #chunk;
  #canBOM;
  constructor(encoding = "utf-8", options = {}) {
    if (typeof options !== "object") throw new TypeError(E_OPTIONS);
    const enc = normalizeEncoding(encoding);
    if (!enc || enc === "replacement") throw new RangeError(E_ENCODING);
    define(this, "encoding", enc);
    define(this, "fatal", !!options.fatal);
    define(this, "ignoreBOM", !!options.ignoreBOM);
    this.#unicode = enc === "utf-8" || enc === "utf-16le" || enc === "utf-16be";
    this.#multibyte = !this.#unicode && isMultibyte(enc);
    this.#canBOM = this.#unicode && !this.ignoreBOM;
  }
  get [Symbol.toStringTag]() {
    return "TextDecoder";
  }
  decode(input, options = {}) {
    if (typeof options !== "object") throw new TypeError(E_OPTIONS);
    const stream = !!options.stream;
    let u = input === void 0 ? new Uint8Array() : (0, import_encoding_api.fromSource)(input);
    const empty = u.length === 0;
    if (empty && stream) return "";
    if (this.#unicode) {
      let prefix;
      if (this.#chunk) {
        const merged = (0, import_encoding_util.mergePrefix)(u, this.#chunk, this.encoding);
        if (u.length < 3) {
          u = merged;
        } else {
          prefix = merged;
          const add = prefix.length - this.#chunk.length;
          if (add > 0) u = u.subarray(add);
        }
        this.#chunk = null;
      } else if (empty) {
        this.#canBOM = !this.ignoreBOM;
        return "";
      }
      let suffix = "";
      if (stream || !this.fatal && this.encoding !== "utf-8") {
        const trail = (0, import_encoding_util.unfinishedBytes)(u, u.byteLength, this.encoding);
        if (trail > 0) {
          if (stream) {
            this.#chunk = Uint8Array.from(u.subarray(-trail));
          } else {
            suffix = replacementChar;
          }
          u = u.subarray(0, -trail);
        }
      }
      let seenBOM = false;
      if (this.#canBOM) {
        const bom = this.#findBom(prefix ?? u);
        if (bom) {
          seenBOM = true;
          if (prefix) {
            prefix = prefix.subarray(bom);
          } else {
            u = u.subarray(bom);
          }
        }
      } else if (!stream && !this.ignoreBOM) {
        this.#canBOM = true;
      }
      if (!this.#decode) this.#decode = unicodeDecoder(this.encoding, !this.fatal);
      try {
        const res = (prefix ? this.#decode(prefix) : "") + this.#decode(u) + suffix;
        if (stream && (seenBOM || res.length > 0)) this.#canBOM = false;
        return res;
      } catch (err) {
        this.#chunk = null;
        throw err;
      }
    } else if (this.#multibyte) {
      if (!createMultibyteDecoder) throw new Error(E_MULTI);
      if (!this.#decode) this.#decode = createMultibyteDecoder(this.encoding, !this.fatal);
      return this.#decode(u, stream);
    } else {
      if (!this.#decode) this.#decode = (0, import_single_byte.createSinglebyteDecoder)(this.encoding, !this.fatal);
      return this.#decode(u);
    }
  }
  #findBom(u) {
    switch (this.encoding) {
      case "utf-8":
        return u.byteLength >= 3 && u[0] === 239 && u[1] === 187 && u[2] === 191 ? 3 : 0;
      case "utf-16le":
        return u.byteLength >= 2 && u[0] === 255 && u[1] === 254 ? 2 : 0;
      case "utf-16be":
        return u.byteLength >= 2 && u[0] === 254 && u[1] === 255 ? 2 : 0;
    }
    throw new Error("Unreachable");
  }
}
class TextEncoder {
  constructor() {
    define(this, "encoding", "utf-8");
  }
  get [Symbol.toStringTag]() {
    return "TextEncoder";
  }
  encode(str = "") {
    if (typeof str !== "string") str = `${str}`;
    return (0, import_utf8.utf8fromStringLoose)(str);
  }
  encodeInto(str, target) {
    if (typeof str !== "string") str = `${str}`;
    if (!isAnyUint8Array(target)) throw new TypeError("Target must be an Uint8Array");
    if (target.buffer.detached) return { read: 0, written: 0 };
    const tlen = target.length;
    if (tlen < str.length) str = str.slice(0, tlen);
    let u8 = (0, import_utf8.utf8fromStringLoose)(str);
    let read;
    if (tlen >= u8.length) {
      read = str.length;
    } else if (u8.length === str.length) {
      if (u8.length > tlen) u8 = u8.subarray(0, tlen);
      read = u8.length;
    } else {
      u8 = u8.subarray(0, tlen);
      const unfinished = (0, import_encoding_util.unfinishedBytes)(u8, u8.length, "utf-8");
      if (unfinished > 0) u8 = u8.subarray(0, u8.length - unfinished);
      read = (0, import_utf8.utf8toStringLoose)(u8).length;
    }
    try {
      target.set(u8);
    } catch {
      return { read: 0, written: 0 };
    }
    return { read, written: u8.length };
  }
}
const E_NO_STREAMS = "TransformStream global not present in the environment";
class TextDecoderStream {
  constructor(encoding = "utf-8", options = {}) {
    if (!globalThis.TransformStream) throw new Error(E_NO_STREAMS);
    const decoder = new TextDecoder(encoding, options);
    const transform = new TransformStream({
      transform: (chunk, controller) => {
        const value = decoder.decode((0, import_encoding_api.fromSource)(chunk), { stream: true });
        if (value) controller.enqueue(value);
      },
      flush: (controller) => {
        const value = decoder.decode();
        if (value) controller.enqueue(value);
      }
    });
    define(this, "encoding", decoder.encoding);
    define(this, "fatal", decoder.fatal);
    define(this, "ignoreBOM", decoder.ignoreBOM);
    define(this, "readable", transform.readable);
    define(this, "writable", transform.writable);
  }
  get [Symbol.toStringTag]() {
    return "TextDecoderStream";
  }
}
class TextEncoderStream {
  constructor() {
    if (!globalThis.TransformStream) throw new Error(E_NO_STREAMS);
    let lead;
    const transform = new TransformStream({
      // https://encoding.spec.whatwg.org/#encode-and-enqueue-a-chunk
      // Not identical in code, but reuses loose mode to have identical behavior
      transform: (chunk, controller) => {
        let s = String(chunk);
        if (s.length === 0) return;
        if (lead) {
          s = lead + s;
          lead = null;
        }
        const last = s.charCodeAt(s.length - 1);
        if ((last & 64512) === 55296) {
          lead = s[s.length - 1];
          s = s.slice(0, -1);
        }
        if (s) controller.enqueue((0, import_utf8.utf8fromStringLoose)(s));
      },
      // https://encoding.spec.whatwg.org/#encode-and-flush
      flush: (controller) => {
        if (lead) controller.enqueue(Uint8Array.of(239, 191, 189));
      }
    });
    define(this, "encoding", "utf-8");
    define(this, "readable", transform.readable);
    define(this, "writable", transform.writable);
  }
  get [Symbol.toStringTag]() {
    return "TextEncoderStream";
  }
}
function legacyHookDecode(input, fallbackEncoding = "utf-8") {
  let u8 = (0, import_encoding_api.fromSource)(input);
  const bomEncoding = (0, import_encoding_api.getBOMEncoding)(u8);
  if (bomEncoding) u8 = u8.subarray(bomEncoding === "utf-8" ? 3 : 2);
  const enc = bomEncoding ?? normalizeEncoding(fallbackEncoding);
  if (enc === "utf-8") return (0, import_utf8.utf8toStringLoose)(u8);
  if (enc === "utf-16le" || enc === "utf-16be") {
    let suffix = "";
    if (u8.byteLength % 2 !== 0) {
      suffix = replacementChar;
      u8 = u8.subarray(0, -(0, import_encoding_util.unfinishedBytes)(u8, u8.byteLength, enc));
    }
    return (0, import_utf16.utf16toStringLoose)(u8, enc === "utf-16le" ? "uint8-le" : "uint8-be") + suffix;
  }
  if (!Object.hasOwn(import_encoding_labels.default, enc)) throw new RangeError(E_ENCODING);
  if (isMultibyte(enc)) {
    if (!createMultibyteDecoder) throw new Error(E_MULTI);
    return createMultibyteDecoder(enc, true)(u8);
  }
  if (enc === "replacement") return input.byteLength > 0 ? replacementChar : "";
  return (0, import_single_byte.createSinglebyteDecoder)(enc, true)(u8);
}
function isomorphicDecode(input) {
  return (0, import_single_byte.latin1toString)((0, import_encoding_api.fromSource)(input));
}
function isomorphicEncode(str) {
  return (0, import_single_byte.latin1fromString)(str);
}
