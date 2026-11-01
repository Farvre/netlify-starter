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
  crc32: () => crc32
});
module.exports = __toCommonJS(stdin_exports);
var import_node_zlib = require("node:zlib");
var import_utils = require("./fallback/_utils.js");
var import_crc = require("./fallback/crc.js");
const T = (0, import_crc.crc32Table)();
const [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, Ta, Tb, Tc, Td, Te, Tf] = Array.from(
  { length: 16 },
  (_, k) => T.subarray(k * 256, k * 256 + 256)
);
const [major, minor] = (process.versions?.node || "0").split(".").map(Number);
const fastNative = major > 24 || major === 24 && minor >= 9;
const NATIVE_MIN = !!globalThis.Deno || !!globalThis.Bun ? 0 : process.arch === "arm64" ? fastNative ? 0 : 64 : 256;
function crc32(x) {
  (0, import_utils.assertU8)(x);
  const n = x.length;
  if (n >= NATIVE_MIN) return (0, import_node_zlib.crc32)(x);
  let c = -1;
  let i = 0;
  for (const end = n - 15; i < end; i += 16) {
    c = Tf[(x[i] ^ c) & 255] ^ Te[(x[i + 1] ^ c >>> 8) & 255] ^ Td[(x[i + 2] ^ c >>> 16) & 255] ^ Tc[x[i + 3] ^ c >>> 24] ^ Tb[x[i + 4]] ^ Ta[x[i + 5]] ^ T9[x[i + 6]] ^ T8[x[i + 7]] ^ T7[x[i + 8]] ^ T6[x[i + 9]] ^ T5[x[i + 10]] ^ T4[x[i + 11]] ^ T3[x[i + 12]] ^ T2[x[i + 13]] ^ T1[x[i + 14]] ^ T0[x[i + 15]];
  }
  for (let j = i; j < n; j++) c = T0[(c ^ x[j]) & 255] ^ c >>> 8;
  return ~c >>> 0;
}
