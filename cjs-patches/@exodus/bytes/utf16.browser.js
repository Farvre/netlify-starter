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
var import_utf16 = require("./fallback/utf16.js");
const utf16fromString = (str, format = "uint16") => (0, import_utf16.encodeApi)(str, false, format);
const utf16fromStringLoose = (str, format = "uint16") => (0, import_utf16.encodeApi)(str, true, format);
const utf16toString = (arr, format = "uint16") => (0, import_utf16.decodeApiDecoders)(arr, false, format);
const utf16toStringLoose = (arr, format = "uint16") => (0, import_utf16.decodeApiDecoders)(arr, true, format);
