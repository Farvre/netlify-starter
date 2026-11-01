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
  DecodingMode: () => import_decode2.DecodingMode,
  EncodingMode: () => EncodingMode,
  EntityDecoder: () => import_decode2.EntityDecoder,
  EntityLevel: () => EntityLevel,
  decode: () => decode,
  decodeHTML: () => import_decode2.decodeHTML,
  decodeHTMLAttribute: () => import_decode2.decodeHTMLAttribute,
  decodeHTMLStrict: () => import_decode2.decodeHTMLStrict,
  decodeXML: () => import_decode2.decodeXML,
  decodeXMLStrict: () => import_decode2.decodeXML,
  encode: () => encode,
  encodeHTML: () => import_encode2.encodeHTML,
  encodeNonAsciiHTML: () => import_encode2.encodeNonAsciiHTML,
  encodeXML: () => import_escape2.encodeXML,
  escape: () => import_escape2.escape,
  escapeAttribute: () => import_escape2.escapeAttribute,
  escapeText: () => import_escape2.escapeText,
  escapeUTF8: () => import_escape2.escapeUTF8
});
module.exports = __toCommonJS(stdin_exports);
var import_decode = require("./decode.js");
var import_encode = require("./encode.js");
var import_escape = require("./escape.js");
var import_decode2 = require("./decode.js");
var import_encode2 = require("./encode.js");
var import_escape2 = require("./escape.js");
var EntityLevel;
(function(EntityLevel2) {
  EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
  EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function(EncodingMode2) {
  EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
  EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
  EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
  EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
  EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));
function decode(input, options = EntityLevel.XML) {
  const level = typeof options === "number" ? options : options.level;
  if (level === EntityLevel.HTML) {
    const mode = typeof options === "object" ? options.mode : void 0;
    return (0, import_decode.decodeHTML)(input, mode);
  }
  return (0, import_decode.decodeXML)(input);
}
function encode(input, options = EntityLevel.XML) {
  const { mode = EncodingMode.Extensive, level = EntityLevel.XML } = typeof options === "number" ? { level: options } : options;
  switch (mode) {
    case EncodingMode.UTF8: {
      return (0, import_escape.escapeUTF8)(input);
    }
    case EncodingMode.Attribute: {
      return (0, import_escape.escapeAttribute)(input);
    }
    case EncodingMode.Text: {
      return (0, import_escape.escapeText)(input);
    }
    case EncodingMode.ASCII: {
      return (level === EntityLevel.HTML ? import_encode.encodeNonAsciiHTML : import_escape.encodeXML)(input);
    }
    // biome-ignore lint/complexity/noUselessSwitchCase: we get an error for the switch not being exhaustive
    case EncodingMode.Extensive:
    default: {
      return (level === EntityLevel.HTML ? import_encode.encodeHTML : import_escape.encodeXML)(input);
    }
  }
}
