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
  utf8fromString: () => utf8fromString,
  utf8fromStringLoose: () => utf8fromStringLoose,
  utf8toString: () => utf8toString,
  utf8toStringLoose: () => utf8toStringLoose
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./fallback/_utils.js");
var import_platform = require("./fallback/platform.js");
var js = __toESM(require("./fallback/utf8.auto.js"));
const decoderLoose = import_platform.nativeDecoder;
const decoderFatal = import_platform.nativeDecoder ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : null;
const { isWellFormed } = String.prototype;
function deLoose(str, loose, res) {
  if (loose || str.length === res.length) return res;
  if (isWellFormed) {
    if (isWellFormed.call(str)) return res;
    throw new TypeError(import_utils.E_STRICT_UNICODE);
  }
  let start = 0;
  const last = res.length - 3;
  while (start <= last) {
    const pos = res.indexOf(239, start);
    if (pos === -1 || pos > last) break;
    start = pos + 1;
    if (res[pos + 1] === 191 && res[pos + 2] === 189) {
      if (js.decodeFast && !import_platform.nativeDecoder && str.length < 1e7) {
        try {
          if (encodeURI(str) !== null) return res;
        } catch {
        }
      } else if (str === decode(res)) return res;
      throw new TypeError(import_utils.E_STRICT_UNICODE);
    }
  }
  return res;
}
function encode(str, loose = false) {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  if (str.length === 0) return new Uint8Array();
  if (import_platform.nativeEncoder || !js.encode) return deLoose(str, loose, import_platform.nativeEncoder.encode(str));
  return js.encode(str, loose);
}
function decode(arr, loose = false) {
  (0, import_utils.assertU8)(arr);
  if (arr.byteLength === 0) return "";
  if (import_platform.nativeDecoder || !js.decodeFast) {
    return loose ? decoderLoose.decode(arr) : decoderFatal.decode(arr);
  }
  return js.decodeFast(arr, loose);
}
const utf8fromString = (str, format = "uint8") => (0, import_utils.fromUint8)(encode(str, false), format);
const utf8fromStringLoose = (str, format = "uint8") => (0, import_utils.fromUint8)(encode(str, true), format);
const utf8toString = (arr) => decode(arr, false);
const utf8toStringLoose = (arr) => decode(arr, true);
