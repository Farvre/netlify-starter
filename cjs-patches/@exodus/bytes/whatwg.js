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
  percentEncodeAfterEncoding: () => percentEncodeAfterEncoding
});
module.exports = __toCommonJS(stdin_exports);
var import_utf8 = require("@exodus/bytes/utf8.js");
var import_single_byte = require("@exodus/bytes/single-byte.js");
var import_encoding = require("./fallback/encoding.js");
var import_percent = require("./fallback/percent.js");
var import_single_byte2 = require("./fallback/single-byte.js");
var import_utils = require("./fallback/_utils.js");
function percentEncodeAfterEncoding(encoding, input, percentEncodeSet, spaceAsPlus = false) {
  const enc = (0, import_encoding.normalizeEncoding)(encoding);
  if (!enc || enc === "replacement" || enc === "utf-16le" || enc === "utf-16be") {
    throw new RangeError(import_encoding.E_ENCODING);
  }
  const percent = (0, import_percent.percentEncoder)(percentEncodeSet, spaceAsPlus);
  if (enc === "utf-8") return percent((0, import_utf8.utf8fromStringLoose)(input));
  const multi = (0, import_encoding.isMultibyte)(enc);
  const encoder = multi ? (0, import_encoding.getMultibyteEncoder)() : import_single_byte.createSinglebyteEncoder;
  const fatal = encoder(enc);
  try {
    return percent(fatal(input));
  } catch {
  }
  let res = "";
  let last = 0;
  if (multi) {
    const rep = enc === "gb18030" ? percent(fatal("\uFFFD")) : `%26%23${65533}%3B`;
    const escaping = encoder(enc, (cp, u2, i) => {
      res += percent(u2, last, i);
      res += cp >= 55296 && cp < 57344 ? rep : `%26%23${cp}%3B`;
      last = i;
      return 0;
    });
    const u = escaping(input);
    res += percent(u, last);
  } else {
    if (typeof input !== "string") throw new TypeError(import_utils.E_STRING);
    const m = (0, import_single_byte2.encodeMap)(enc);
    const len = input.length;
    const u = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      const x = input.charCodeAt(i);
      const b = m[x];
      if (!b && x) {
        let cp = x;
        const i0 = i;
        if (x >= 55296 && x < 57344) {
          cp = 65533;
          if (x < 56320 && i + 1 < len) {
            const x1 = input.charCodeAt(i + 1);
            if (x1 >= 56320 && x1 < 57344) {
              cp = 65536 + (x1 & 1023 | (x & 1023) << 10);
              i++;
            }
          }
        }
        res += `${percent(u, last, i0)}%26%23${cp}%3B`;
        last = i + 1;
      } else {
        u[i] = b;
      }
    }
    res += percent(u, last);
  }
  return res;
}
