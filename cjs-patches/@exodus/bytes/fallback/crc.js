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
  crc32Table: () => crc32Table
});
module.exports = __toCommonJS(stdin_exports);
var import_platform = require("./platform.js");
function crc32Table() {
  const T = new (import_platform.isHermes ? Uint32Array : Int32Array)(16 * 256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let i = 0; i < 8; i++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    T[n] = c;
  }
  for (let n = 0; n < 256; n++) {
    let v = T[n];
    for (let c = 256 + n; c < T.length; c += 256) v = T[c] = v >>> 8 ^ T[v & 255];
  }
  return T;
}
