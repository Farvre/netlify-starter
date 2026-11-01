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
  getTable: () => getTable,
  sizes: () => sizes
});
module.exports = __toCommonJS(stdin_exports);
var import_base64 = require("@exodus/bytes/base64.js");
var import_utf16 = require("@exodus/bytes/utf16.js");
var import_multi_byte_encodings = __toESM(require("./multi-byte.encodings.cjs"));
const sizes = {
  jis0208: 11104,
  jis0212: 7211,
  "euc-kr": 23750,
  gb18030: 23940,
  big5: 19782
};
let indices;
const tables = /* @__PURE__ */ new Map();
function loadBase64(str) {
  const x = (0, import_base64.fromBase64url)(str);
  const len = x.length;
  const len2 = len >> 1;
  const y = new Uint8Array(len);
  let a = -1, b = 0;
  for (let i = 0, j = 0; i < len; i += 2, j++) {
    a = a + x[j] + 1 & 255;
    b = b + x[len2 + j] & 255;
    y[i] = a;
    y[i + 1] = b;
  }
  return y;
}
function unwrap(res, t, pos) {
  let code = 0;
  for (let i = 0; i < t.length; i++) {
    let x = t[i];
    if (typeof x === "number") {
      if (x === 0) {
        pos += t[++i];
      } else {
        if (x < 0) {
          code -= x;
          x = 1;
        } else {
          code += t[++i];
        }
        for (let k = 0; k < x; k++, pos++, code++) {
          if (code <= 65535) {
            res[pos] = code;
          } else {
            const c = String.fromCodePoint(code);
            res[pos] = c.charCodeAt(0) << 16 | c.charCodeAt(1);
          }
        }
      }
    } else if (x[0] === "$" && Object.hasOwn(indices, x)) {
      pos = unwrap(res, indices[x], pos);
    } else {
      let last;
      for (const c of (0, import_utf16.utf16toString)(loadBase64(x), "uint8-le")) {
        last = c;
        res[pos++] = c.length === 1 ? c.charCodeAt(0) : c.charCodeAt(0) << 16 | c.charCodeAt(1);
      }
      code = last.codePointAt(0) + 1;
    }
  }
  return pos;
}
function getTable(id) {
  const cached = tables.get(id);
  if (cached) return cached;
  if (!indices) indices = (0, import_multi_byte_encodings.default)();
  if (!Object.hasOwn(indices, id)) throw new Error("Unknown encoding");
  if (!indices[id]) throw new Error("Table already used (likely incorrect bundler dedupe)");
  let res;
  if (id.endsWith("-ranges")) {
    res = [];
    let a = 0, b = 0;
    const idx = indices[id];
    while (idx.length > 0) res.push([a += idx.shift(), b += idx.shift()]);
  } else if (id.endsWith("-katakana")) {
    let a = -1;
    res = new Uint16Array(indices[id].map((x) => a += x + 1));
  } else if (id === "big5") {
    res = new Uint32Array(sizes[id]);
    unwrap(res, indices[id], 0);
    res[1133] = 13239044;
    res[1135] = 13239052;
    res[1164] = 15336196;
    res[1166] = 15336204;
  } else {
    if (!Object.hasOwn(sizes, id)) throw new Error("Unknown encoding");
    res = new Uint16Array(sizes[id]);
    unwrap(res, indices[id], 0);
  }
  indices[id] = null;
  tables.set(id, res);
  return res;
}
