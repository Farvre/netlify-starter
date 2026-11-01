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
  fromBase58check: () => fromBase58check,
  fromBase58checkSync: () => fromBase58checkSync,
  makeBase58check: () => import_base58check2.makeBase58check,
  toBase58check: () => toBase58check,
  toBase58checkSync: () => toBase58checkSync
});
module.exports = __toCommonJS(stdin_exports);
var import_sha2 = require("@noble/hashes/sha2.js");
var import_base58check = require("./fallback/base58check.js");
var import_base58check2 = require("./fallback/base58check.js");
const hash256sync = (x) => (0, import_sha2.sha256)((0, import_sha2.sha256)(x));
const hash256 = hash256sync;
const b58c = /* @__PURE__ */ (0, import_base58check.makeBase58check)(hash256, hash256sync);
const toBase58check = /* @__PURE__ */ (() => b58c.encode)();
const fromBase58check = /* @__PURE__ */ (() => b58c.decode)();
const toBase58checkSync = /* @__PURE__ */ (() => b58c.encodeSync)();
const fromBase58checkSync = /* @__PURE__ */ (() => b58c.decodeSync)();
