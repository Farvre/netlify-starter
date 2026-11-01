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
  fromBigInt: () => fromBigInt,
  toBigInt: () => toBigInt
});
module.exports = __toCommonJS(stdin_exports);
var import_hex = require("@exodus/bytes/hex.js");
var import_utils = require("./fallback/_utils.js");
const _0n = BigInt(0);
function fromBigInt(x, { length, format } = {}) {
  (0, import_utils.assert)(Number.isSafeInteger(length) && length > 0, "Expected length arg to be a positive integer");
  (0, import_utils.assert)(typeof x === "bigint" && x >= _0n, "Expected a non-negative bigint");
  const hex = x.toString(16);
  (0, import_utils.assert)(length * 2 >= hex.length, `Can not fit supplied number into ${length} bytes`);
  return (0, import_hex.fromHex)(hex.padStart(length * 2, "0"), format);
}
const toBigInt = (a) => BigInt("0x" + ((0, import_hex.toHex)(a) || "0"));
