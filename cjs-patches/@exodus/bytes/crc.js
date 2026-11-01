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
var import_utils = require("./fallback/_utils.js");
var import_crc = require("./fallback/crc.js");
var import_platform = require("./fallback/platform.js");
const T = (0, import_crc.crc32Table)();
const [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, Ta, Tb, Tc, Td, Te, Tf] = Array.from(
  { length: 16 },
  (_, k) => T.subarray(k * 256, k * 256 + 256)
);
function crc32(x) {
  (0, import_utils.assertU8)(x);
  let c = -1;
  let i = 0;
  const n = x.length;
  if (import_platform.isLE && n > 1024) {
    const pre = 4 - (x.byteOffset & 3) & 3;
    for (; i < pre; i++) c = T0[(c ^ x[i]) & 255] ^ c >>> 8;
    const words = n - i >>> 2;
    const W = new (import_platform.isHermes ? Uint32Array : Int32Array)(x.buffer, x.byteOffset + i, words);
    let j = 0;
    for (const end = words - 3; j < end; j += 4) {
      const a = W[j] ^ c;
      const b = W[j + 1];
      const d = W[j + 2];
      const e = W[j + 3];
      c = T[3840 + (a & 255)] ^ T[3584 + (a >>> 8 & 255)] ^ T[3328 + (a >>> 16 & 255)] ^ T[3072 + (a >>> 24)] ^ T[2816 + (b & 255)] ^ T[2560 + (b >>> 8 & 255)] ^ T[2304 + (b >>> 16 & 255)] ^ T[2048 + (b >>> 24)] ^ T[1792 + (d & 255)] ^ T[1536 + (d >>> 8 & 255)] ^ T[1280 + (d >>> 16 & 255)] ^ T[1024 + (d >>> 24)] ^ T[768 + (e & 255)] ^ T[512 + (e >>> 8 & 255)] ^ T[256 + (e >>> 16 & 255)] ^ T[e >>> 24];
    }
    i += j * 4;
  } else {
    for (const end = n - 15; i < end; i += 16) {
      c = Tf[(x[i] ^ c) & 255] ^ Te[(x[i + 1] ^ c >>> 8) & 255] ^ Td[(x[i + 2] ^ c >>> 16) & 255] ^ Tc[x[i + 3] ^ c >>> 24] ^ Tb[x[i + 4]] ^ Ta[x[i + 5]] ^ T9[x[i + 6]] ^ T8[x[i + 7]] ^ T7[x[i + 8]] ^ T6[x[i + 9]] ^ T5[x[i + 10]] ^ T4[x[i + 11]] ^ T3[x[i + 12]] ^ T2[x[i + 13]] ^ T1[x[i + 14]] ^ T0[x[i + 15]];
    }
  }
  for (let k = i; k < n; k++) c = T0[(c ^ x[k]) & 255] ^ c >>> 8;
  return ~c >>> 0;
}
