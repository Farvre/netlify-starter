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
  percentEncoder: () => percentEncoder
});
module.exports = __toCommonJS(stdin_exports);
var import_latin1 = require("./latin1.js");
var import_platform = require("./platform.js");
const ERR = "percentEncodeSet must be a string of unique increasing codepoints in range 0x20 - 0x7e";
const percentMap = /* @__PURE__ */ new Map();
let hex, base;
function percentEncoder(set, spaceAsPlus = false) {
  if (typeof set !== "string" || /[^\x20-\x7E]/.test(set)) throw new TypeError(ERR);
  if (typeof spaceAsPlus !== "boolean") throw new TypeError("spaceAsPlus must be boolean");
  const id = set + +spaceAsPlus;
  const cached = percentMap.get(id);
  if (cached) return cached;
  const n = (0, import_latin1.encodeLatin1)(set).sort();
  if ((0, import_latin1.decodeAscii)(n) !== set || new Set(n).size !== n.length) throw new TypeError(ERR);
  if (!base) {
    hex = Array.from({ length: 256 }, (_, i) => `%${i.toString(16).padStart(2, "0").toUpperCase()}`);
    base = hex.map((h, i) => i < 32 || i > 126 ? h : String.fromCharCode(i));
  }
  const map = base.slice();
  for (const c of n) map[c] = hex[c];
  if (spaceAsPlus) map[32] = "+";
  const percentEncode = (u8, start = 0, end = u8.length) => (0, import_platform.decode2string)(u8, start, end, map);
  percentMap.set(id, percentEncode);
  return percentEncode;
}
