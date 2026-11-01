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
  E_STRICT: () => E_STRICT,
  assertEncoding: () => assertEncoding,
  encodeMap: () => encodeMap,
  encodingDecoder: () => encodingDecoder,
  encodingMapper: () => encodingMapper,
  getEncoding: () => getEncoding
});
module.exports = __toCommonJS(stdin_exports);
var import_latin1 = require("./latin1.js");
var import_single_byte_encodings = __toESM(require("./single-byte.encodings.js"));
var import_platform = require("./platform.js");
const E_STRICT = "Input is not well-formed for this encoding";
const xUserDefined = "x-user-defined";
const iso8i = "iso-8859-8-i";
const assertEncoding = (encoding) => {
  if (Object.hasOwn(import_single_byte_encodings.default, encoding) || encoding === xUserDefined || encoding === iso8i) return;
  throw new RangeError("Unsupported encoding");
};
const r = 65533;
function getEncoding(encoding) {
  assertEncoding(encoding);
  if (encoding === xUserDefined) return Array.from({ length: 128 }, (_, i) => 63360 + i);
  if (encoding === iso8i) encoding = "iso-8859-8";
  const enc = import_single_byte_encodings.default[encoding];
  const deltas = enc.flatMap((x) => Array.isArray(x) ? new Array(x[0]).fill(x[1] ?? 0) : x);
  return deltas.map((x, i) => x === r ? x : x + 128 + i);
}
const mappers = /* @__PURE__ */ new Map();
const decoders = /* @__PURE__ */ new Map();
const encmaps = /* @__PURE__ */ new Map();
function encodingMapper(encoding) {
  const cached = mappers.get(encoding);
  if (cached) return cached;
  const codes = getEncoding(encoding);
  const incomplete = codes.includes(r);
  let map;
  const mapper = (arr, start = 0) => {
    if (!map) {
      map = new Uint16Array(256).map((_, i2) => i2);
      map.set(Uint16Array.from(codes), 128);
    }
    const o = Uint16Array.from(start === 0 ? arr : arr.subarray(start));
    let i = 0;
    for (const end7 = o.length - 7; i < end7; i += 8) {
      o[i] = map[o[i]];
      o[i + 1] = map[o[i + 1]];
      o[i + 2] = map[o[i + 2]];
      o[i + 3] = map[o[i + 3]];
      o[i + 4] = map[o[i + 4]];
      o[i + 5] = map[o[i + 5]];
      o[i + 6] = map[o[i + 6]];
      o[i + 7] = map[o[i + 7]];
    }
    for (const end = o.length; i < end; i++) o[i] = map[o[i]];
    return o;
  };
  mappers.set(encoding, { mapper, incomplete });
  return { mapper, incomplete };
}
function encodingDecoder(encoding) {
  const cached = decoders.get(encoding);
  if (cached) return cached;
  const isLatin1 = encoding === "iso-8859-1";
  if (isLatin1 && !import_platform.nativeDecoder) return (arr, loose = false) => (0, import_latin1.decodeLatin1)(arr);
  let strings;
  const codes = getEncoding(encoding);
  const incomplete = codes.includes(r);
  const decoder = (arr, loose = false) => {
    if (!strings) {
      const allCodes = Array.from({ length: 128 }, (_, i) => i).concat(codes);
      while (allCodes.length < 256) allCodes.push(allCodes.length);
      strings = allCodes.map((c) => String.fromCharCode(c));
    }
    const prefixLen = (0, import_latin1.asciiPrefix)(arr);
    if (prefixLen === arr.length) return (0, import_latin1.decodeAscii)(arr);
    if (isLatin1) return (0, import_latin1.decodeLatin1)(arr);
    const prefix = (0, import_latin1.decodeLatin1)(arr, 0, prefixLen);
    const suffix = (0, import_platform.decode2string)(arr, prefix.length, arr.length, strings);
    if (!loose && incomplete && suffix.includes("\uFFFD")) throw new TypeError(E_STRICT);
    return prefix + suffix;
  };
  decoders.set(encoding, decoder);
  return decoder;
}
function encodeMap(encoding) {
  const cached = encmaps.get(encoding);
  if (cached) return cached;
  const codes = getEncoding(encoding);
  let max = 128;
  while (codes.length < 128) codes.push(128 + codes.length);
  for (const code of codes) if (code > max && code !== r) max = code;
  const map = new Uint8Array(max + 1);
  for (let i = 0; i < 128; i++) {
    map[i] = i;
    if (codes[i] !== r) map[codes[i]] = 128 + i;
  }
  encmaps.set(encoding, map);
  return map;
}
