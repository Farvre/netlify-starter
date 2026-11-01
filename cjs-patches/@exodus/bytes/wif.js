var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to2;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  fromWifString: () => fromWifString,
  fromWifStringSync: () => fromWifStringSync,
  toWifString: () => toWifString,
  toWifStringSync: () => toWifStringSync
});
module.exports = __toCommonJS(stdin_exports);
var import_base58check = require("@exodus/bytes/base58check.js");
var import_assert = require("./assert.js");
function from(arr, expectedVersion) {
  (0, import_assert.assertUint8)(arr);
  if (arr.length !== 33 && arr.length !== 34) throw new Error("Invalid WIF length");
  const version = arr[0];
  if (expectedVersion !== void 0 && version !== expectedVersion) {
    throw new Error("Invalid network version");
  }
  const privateKey = Uint8Array.from(arr.subarray(1, 33));
  if (arr.length === 33) return { version, privateKey, compressed: false };
  if (arr[33] !== 1) throw new Error("Invalid compression flag");
  return { version, privateKey, compressed: true };
}
function to({ version: v, privateKey, compressed }) {
  if (!Number.isSafeInteger(v) || v < 0 || v > 255) throw new Error("Missing or invalid version");
  (0, import_assert.assertUint8)(privateKey, { length: 32, name: "privateKey" });
  const out = new Uint8Array(compressed ? 34 : 33);
  out[0] = v;
  out.set(privateKey, 1);
  if (compressed) out[33] = 1;
  return out;
}
const fromWifStringSync = (string, version) => from((0, import_base58check.fromBase58checkSync)(string), version);
const fromWifString = async (string, version) => from((0, import_base58check.fromBase58checkSync)(string), version);
const toWifStringSync = (wif) => (0, import_base58check.toBase58checkSync)(to(wif));
const toWifString = async (wif) => (0, import_base58check.toBase58checkSync)(to(wif));
