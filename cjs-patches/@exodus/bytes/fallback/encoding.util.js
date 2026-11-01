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
  mergePrefix: () => mergePrefix,
  unfinishedBytes: () => unfinishedBytes
});
module.exports = __toCommonJS(stdin_exports);
function unfinishedBytes(u, len, enc) {
  switch (enc) {
    case "utf-8": {
      let p = 0;
      while (p < 2 && p < len && (u[len - p - 1] & 192) === 128) p++;
      if (p === len) return 0;
      const l = u[len - p - 1];
      if (l < 194 || l > 244) return 0;
      if (p === 0) return 1;
      if (l < 224 || l < 240 && p >= 2) return 0;
      const lower = l === 240 ? 144 : l === 224 ? 160 : 128;
      const upper = l === 244 ? 143 : l === 237 ? 159 : 191;
      const n = u[len - p];
      return n >= lower && n <= upper ? p + 1 : 0;
    }
    case "utf-16le":
    case "utf-16be": {
      const p = len % 2;
      if (len < 2) return p;
      const l = len - p - 1;
      const last = enc === "utf-16le" ? u[l] << 8 ^ u[l - 1] : u[l - 1] << 8 ^ u[l];
      return last >= 55296 && last < 56320 ? p + 2 : p;
    }
  }
  throw new Error("Unsupported encoding");
}
function mergePrefix(u, chunk, enc) {
  if (u.length === 0) return chunk;
  const cl = chunk.length;
  if (u.length < 3) {
    const a = new Uint8Array(cl + u.length);
    a.set(chunk);
    a.set(u, cl);
    return a;
  }
  const t = new Uint8Array(cl + 3);
  t.set(chunk);
  t.set(u.subarray(0, 3), cl);
  for (let i = 1; i <= 3; i++) {
    const unfinished = unfinishedBytes(t, cl + i, enc);
    if (unfinished <= i) {
      const add = i - unfinished;
      return add > 0 ? t.subarray(0, cl + add) : chunk;
    }
  }
}
