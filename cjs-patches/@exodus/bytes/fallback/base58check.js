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
  makeBase58check: () => makeBase58check
});
module.exports = __toCommonJS(stdin_exports);
var import_base58 = require("@exodus/bytes/base58.js");
var import_utils = require("./_utils.js");
const E_CHECKSUM = "Invalid checksum";
function encodeWithChecksum(arr, checksum) {
  const res = new Uint8Array(arr.length + 4);
  res.set(arr, 0);
  res.set(checksum.slice(0, 4), arr.length);
  return (0, import_base58.toBase58)(res);
}
function decodeWithChecksum(str) {
  const arr = (0, import_base58.fromBase58)(str);
  const payloadSize = arr.length - 4;
  if (payloadSize < 0) throw new Error(E_CHECKSUM);
  return [arr.slice(0, payloadSize), arr.slice(payloadSize)];
}
function assertChecksum(c, r) {
  if (c[0] ^ r[0] | c[1] ^ r[1] | c[2] ^ r[2] | c[3] ^ r[3]) throw new Error(E_CHECKSUM);
}
const makeBase58check = (hashAlgo, hashAlgoSync) => {
  const apis = {
    async encode(arr) {
      (0, import_utils.assertU8)(arr);
      return encodeWithChecksum(arr, await hashAlgo(arr));
    },
    async decode(str, format = "uint8") {
      const [payload, checksum] = decodeWithChecksum(str);
      assertChecksum(checksum, await hashAlgo(payload));
      return (0, import_utils.fromUint8)(payload, format);
    }
  };
  if (!hashAlgoSync) return apis;
  return {
    ...apis,
    encodeSync(arr) {
      (0, import_utils.assertU8)(arr);
      return encodeWithChecksum(arr, hashAlgoSync(arr));
    },
    decodeSync(str, format = "uint8") {
      const [payload, checksum] = decodeWithChecksum(str);
      assertChecksum(checksum, hashAlgoSync(payload));
      return (0, import_utils.fromUint8)(payload, format);
    }
  };
};
