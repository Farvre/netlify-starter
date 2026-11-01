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
  fromBase32: () => fromBase32,
  fromBase32crockford: () => fromBase32crockford,
  fromBase32hex: () => fromBase32hex,
  toBase32: () => toBase32,
  toBase32crockford: () => toBase32crockford,
  toBase32hex: () => toBase32hex
});
module.exports = __toCommonJS(stdin_exports);
var import_assert = require("./assert.js");
var import_utils = require("./fallback/_utils.js");
var js = __toESM(require("./fallback/base32.js"));
function fromBase32common(str, mode, padding, format, rest) {
  if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
  if (rest !== null) (0, import_assert.assertEmptyRest)(rest);
  if (padding === true) {
    if (str.length % 8 !== 0) throw new SyntaxError(js.E_PADDING);
  } else if (padding === false) {
    if (str.endsWith("=")) throw new SyntaxError("Did not expect padding in base32 input");
  } else if (padding !== "both") {
    throw new TypeError("Invalid padding option");
  }
  return (0, import_utils.fromUint8)(js.fromBase32(str, mode), format);
}
const fromBase32wrap = (mode) => (str, options) => {
  if (!options) return fromBase32common(str, mode, "both", "uint8", null);
  const { format = "uint8", padding = "both", ...rest } = options;
  return fromBase32common(str, mode, padding, format, rest);
};
const fromBase32 = fromBase32wrap(0);
const fromBase32hex = fromBase32wrap(1);
const fromBase32crockford = fromBase32wrap(2);
const toBase32 = (arr, { padding = false } = {}) => js.toBase32(arr, 0, padding);
const toBase32hex = (arr, { padding = false } = {}) => js.toBase32(arr, 1, padding);
const toBase32crockford = (arr, { padding = false } = {}) => js.toBase32(arr, 2, padding);
