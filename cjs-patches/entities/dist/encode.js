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
  INLINE_SCAN_WINDOW: () => INLINE_SCAN_WINDOW,
  encodeHTML: () => encodeHTML,
  encodeNonAsciiHTML: () => encodeNonAsciiHTML
});
module.exports = __toCommonJS(stdin_exports);
var import_escape = require("./escape.js");
var import_encode_html = __toESM(require("./generated/encode-html.js"));
const asciiEntities = /* @__PURE__ */ Array.from({ length: 128 }, () => null);
const htmlTrie = (() => {
  const trie = /* @__PURE__ */ new Map();
  const data = import_encode_html.default;
  let cursor = 0;
  let lastKey = -1;
  function readGap() {
    let value = 0;
    let ch;
    while ((ch = data.charCodeAt(cursor)) >= 48 && ch <= 57) {
      value = value * 10 + ch - 48;
      cursor++;
    }
    return value;
  }
  function readEntity() {
    const semi = data.indexOf(";", cursor);
    const entity = `&${data.substring(cursor, semi)};`;
    cursor = semi + 1;
    return entity;
  }
  const astralEntries = [];
  while (cursor < data.length) {
    lastKey += readGap() + 1;
    const entityValue = data.charCodeAt(cursor) === 123 ? null : readEntity();
    if (data.charCodeAt(cursor) === 123) {
      cursor++;
      const next = /* @__PURE__ */ new Map();
      let childKey = -1;
      while (data.charCodeAt(cursor) !== 125) {
        childKey += readGap() + 1;
        next.set(childKey, readEntity());
      }
      const branch = { value: entityValue, next };
      trie.set(lastKey, branch);
      cursor++;
      if (lastKey < 128) {
        asciiEntities[lastKey] = branch;
      }
    } else if (lastKey < 128) {
      asciiEntities[lastKey] = entityValue;
    } else if (lastKey > 65535) {
      astralEntries.push([lastKey, entityValue]);
    } else {
      trie.set(lastKey, entityValue);
    }
  }
  let astralIndex = 0;
  while (astralIndex < astralEntries.length) {
    const hi = 55296 | astralEntries[astralIndex][0] - 65536 >> 10;
    const children = [];
    while (astralIndex < astralEntries.length && (55296 | astralEntries[astralIndex][0] - 65536 >> 10) === hi) {
      const lo = 56320 | astralEntries[astralIndex][0] - 65536 & 1023;
      children.push([lo, astralEntries[astralIndex][1]]);
      astralIndex++;
    }
    trie.set(hi, { value: null, next: new Map(children) });
  }
  return trie;
})();
const HTML_BITSET = /* @__PURE__ */ new Uint32Array([
  5632,
  // 09 (\t), 0A (\n), 0C (\f)
  4227923966,
  // 21-2D (!-.), 2E (.), 2F (/), 3A-3F (:;<=>?)
  4160749569,
  // 40 (@), 5B-5F ([\]^_)
  939524097
  // 60 (`), 7B-7D ({|})
]);
const XML_BITSET = /* @__PURE__ */ new Uint32Array([0, import_escape.XML_BITSET_VALUE, 0, 0]);
const HTML_ENCODE_RE = /[\t\n\f!-/:-@[-`{-}\u0080-\uFFFF]/g;
const numericReference = (cp) => `&#x${cp.toString(16)};`;
function encodeHTML(input) {
  return encodeHTMLTrieRe(HTML_BITSET, HTML_ENCODE_RE, input);
}
function encodeNonAsciiHTML(input) {
  return encodeHTMLTrieRe(XML_BITSET, import_escape.xmlEncodeRegex, input);
}
function isEncodable(bitset, code) {
  return code >= 128 || (bitset[code >>> 5] >>> code & 1) === 1;
}
const INLINE_SCAN_WINDOW = 16;
const LONG_GAP_THRESHOLD = 8;
function encodeHTMLTrieRe(bitset, re, input) {
  const { length } = input;
  let out;
  let last = 0;
  let index = 0;
  let wasLongGap = false;
  while (index < length) {
    let char = input.charCodeAt(index);
    if (!isEncodable(bitset, char)) {
      const gapStart = index;
      let next = index + 1;
      let wasFound = false;
      if (!wasLongGap) {
        const bound = Math.min(index + INLINE_SCAN_WINDOW, length);
        while (next < bound && !isEncodable(bitset, char = input.charCodeAt(next))) {
          next++;
        }
        if (next < bound) {
          index = next;
          wasFound = true;
        } else if (next >= length) {
          break;
        }
      }
      if (!wasFound) {
        re.lastIndex = next;
        if (!re.test(input))
          break;
        index = re.lastIndex - 1;
        wasLongGap = !wasLongGap || index - gapStart >= LONG_GAP_THRESHOLD;
        char = input.charCodeAt(index);
      }
    }
    if (out == null)
      out = input.substring(0, index);
    else if (last !== index)
      out += input.substring(last, index);
    if (char < 128) {
      const node = asciiEntities[char];
      if (typeof node === "object" && node !== null) {
        if (index + 1 < length) {
          const value = node.next.get(input.charCodeAt(index + 1));
          if (value != null) {
            out += value;
            last = index += 2;
            continue;
          }
        }
        out += node.value ?? numericReference(char);
      } else {
        out += node ?? numericReference(char);
      }
    } else {
      let node = htmlTrie.get(char);
      if (typeof node === "object") {
        if (index + 1 < length) {
          const value = node.next.get(input.charCodeAt(index + 1));
          if (value != null) {
            out += value;
            last = index += 2;
            continue;
          }
        }
        node = node.value;
      }
      if (node == null) {
        const cp = input.codePointAt(index);
        out += numericReference(cp);
        if (cp !== char)
          index++;
      } else {
        out += node;
      }
    }
    last = index += 1;
  }
  if (out == null)
    return input;
  if (last < length)
    out += input.substr(last);
  return out;
}
