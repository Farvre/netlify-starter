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
  assertEmptyRest: () => assertEmptyRest,
  assertTypedArray: () => assertTypedArray,
  assertUint8: () => assertUint8
});
module.exports = __toCommonJS(stdin_exports);
function assertEmptyRest(rest) {
  if (Object.keys(rest).length > 0) throw new TypeError("Unexpected extra options");
}
const makeMessage = (name, extra) => `Expected${name ? ` ${name} to be` : ""} an Uint8Array${extra}`;
const TypedArray = Object.getPrototypeOf(Uint8Array);
function assertTypedArray(arr) {
  if (arr && arr instanceof TypedArray) return;
  throw new TypeError("Expected a TypedArray instance");
}
function assertUint8(arr, options) {
  if (!options) {
    if (arr instanceof Uint8Array) return;
    throw new TypeError("Expected an Uint8Array");
  }
  const { name, length, ...rest } = options;
  assertEmptyRest(rest);
  if (arr instanceof Uint8Array && (length === void 0 || arr.length === length)) return;
  throw new TypeError(makeMessage(name, length === void 0 ? "" : ` of size ${Number(length)}`));
}
