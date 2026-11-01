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
  createMultibyteDecoder: () => createMultibyteDecoder,
  createMultibyteEncoder: () => createMultibyteEncoder
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./fallback/_utils.js");
var import_platform = require("./fallback/platform.js");
var import_multi_byte = require("./fallback/multi-byte.js");
var import_node_buffer = require("node:buffer");
function createMultibyteDecoder(encoding, loose = false) {
  const jsDecoder = (0, import_multi_byte.multibyteDecoder)(encoding, loose);
  let streaming = false;
  const asciiSuperset = (0, import_multi_byte.isAsciiSuperset)(encoding);
  return (arr, stream = false) => {
    (0, import_utils.assertU8)(arr);
    if (!streaming) {
      if (arr.byteLength === 0) return "";
      if (asciiSuperset && (0, import_node_buffer.isAscii)(arr)) {
        if (import_platform.isDeno) return (0, import_utils.toBuf)(arr).toString();
        return (0, import_utils.toBuf)(arr).latin1Slice(0, arr.byteLength);
      }
    }
    streaming = stream;
    return jsDecoder(arr, stream);
  };
}
function createMultibyteEncoder(encoding, { mode = "fatal" } = {}) {
  if (mode !== "fatal") throw new Error("Unsupported mode");
  return (0, import_multi_byte.multibyteEncoder)(encoding);
}
