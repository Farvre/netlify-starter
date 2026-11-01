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
  E_STRICT: () => E_STRICT,
  isAsciiSuperset: () => isAsciiSuperset,
  multibyteDecoder: () => multibyteDecoder,
  multibyteEncoder: () => multibyteEncoder
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("./_utils.js");
var import_platform = require("./platform.js");
var import_latin1 = require("./latin1.js");
var import_multi_byte_table = require("./multi-byte.table.js");
const E_STRICT = "Input is not well-formed for this encoding";
const mappers = {
  // https://encoding.spec.whatwg.org/#euc-kr-decoder
  "euc-kr": (err) => {
    const euc = (0, import_multi_byte_table.getTable)("euc-kr");
    let lead = 0;
    let oi = 0;
    let o16;
    const decodeLead = (b) => {
      if (b < 65 || b > 254) {
        lead = 0;
        o16[oi++] = err();
        if (b < 128) o16[oi++] = b;
      } else {
        const p = euc[(lead - 129) * 190 + b - 65];
        lead = 0;
        if (p) {
          o16[oi++] = p;
        } else {
          o16[oi++] = err();
          if (b < 128) o16[oi++] = b;
        }
      }
    };
    const decode = (arr, start, end, stream) => {
      let i = start;
      o16 = new Uint16Array(end - start + (lead ? 1 : 0));
      oi = 0;
      if (!lead) {
        for (const last1 = end - 1; i < last1; ) {
          const l = arr[i];
          if (l < 128) {
            o16[oi++] = l;
            i++;
          } else {
            if (l === 128 || l === 255) break;
            const b = arr[i + 1];
            if (b < 65 || b === 255) break;
            const p = euc[(l - 129) * 190 + b - 65];
            if (!p) break;
            o16[oi++] = p;
            i += 2;
          }
        }
      }
      if (lead && i < end) decodeLead(arr[i++]);
      while (i < end) {
        const b = arr[i++];
        if (b < 128) {
          o16[oi++] = b;
        } else if (b === 128 || b === 255) {
          o16[oi++] = err();
        } else {
          lead = b;
          if (i < end) decodeLead(arr[i++]);
        }
      }
      if (lead && !stream) {
        lead = 0;
        o16[oi++] = err();
      }
      const res = (0, import_latin1.decodeUCS2)(o16, oi);
      o16 = null;
      return res;
    };
    return { decode, isAscii: () => lead === 0 };
  },
  // https://encoding.spec.whatwg.org/#euc-jp-decoder
  "euc-jp": (err) => {
    const jis0208 = (0, import_multi_byte_table.getTable)("jis0208");
    const jis0212 = (0, import_multi_byte_table.getTable)("jis0212");
    let j12 = false;
    let lead = 0;
    let oi = 0;
    let o16;
    const decodeLead = (b) => {
      if (lead === 142 && b >= 161 && b <= 223) {
        lead = 0;
        o16[oi++] = 65216 + b;
      } else if (lead === 143 && b >= 161 && b <= 254) {
        j12 = true;
        lead = b;
      } else {
        let cp;
        if (lead >= 161 && lead <= 254 && b >= 161 && b <= 254) {
          cp = (j12 ? jis0212 : jis0208)[(lead - 161) * 94 + b - 161];
        }
        lead = 0;
        j12 = false;
        if (cp) {
          o16[oi++] = cp;
        } else {
          o16[oi++] = err();
          if (b < 128) o16[oi++] = b;
        }
      }
    };
    const decode = (arr, start, end, stream) => {
      let i = start;
      o16 = new Uint16Array(end - start + (lead ? 1 : 0));
      oi = 0;
      if (!lead) {
        for (const last1 = end - 1; i < last1; ) {
          const l = arr[i];
          if (l < 128) {
            o16[oi++] = l;
            i++;
          } else {
            const b = arr[i + 1];
            if (l === 142 && b >= 161 && b <= 223) {
              o16[oi++] = 65216 + b;
              i += 2;
            } else {
              if (l < 161 || l === 255 || b < 161 || b === 255) break;
              const cp = jis0208[(l - 161) * 94 + b - 161];
              if (!cp) break;
              o16[oi++] = cp;
              i += 2;
            }
          }
        }
      }
      if (lead && i < end) decodeLead(arr[i++]);
      if (lead && i < end) decodeLead(arr[i++]);
      while (i < end) {
        const b = arr[i++];
        if (b < 128) {
          o16[oi++] = b;
        } else if (b < 161 && b !== 142 && b !== 143 || b === 255) {
          o16[oi++] = err();
        } else {
          lead = b;
          if (i < end) decodeLead(arr[i++]);
          if (lead && i < end) decodeLead(arr[i++]);
        }
      }
      if (lead && !stream) {
        lead = 0;
        j12 = false;
        o16[oi++] = err();
      }
      const res = (0, import_latin1.decodeUCS2)(o16, oi);
      o16 = null;
      return res;
    };
    return { decode, isAscii: () => lead === 0 };
  },
  // https://encoding.spec.whatwg.org/#iso-2022-jp-decoder
  "iso-2022-jp": (err) => {
    const jis0208 = (0, import_multi_byte_table.getTable)("jis0208");
    let dState = 1;
    let oState = 1;
    let lead = 0;
    let out = false;
    const bytes = (pushback, b) => {
      if (dState < 5 && b === 27) {
        dState = 6;
        return;
      }
      switch (dState) {
        case 1:
        case 2:
          out = false;
          if (dState === 2) {
            if (b === 92) return 165;
            if (b === 126) return 8254;
          }
          if (b <= 127 && b !== 14 && b !== 15) return b;
          return err();
        case 3:
          out = false;
          if (b >= 33 && b <= 95) return 65344 + b;
          return err();
        case 4:
          out = false;
          if (b < 33 || b > 126) return err();
          lead = b;
          dState = 5;
          return;
        case 5:
          out = false;
          if (b === 27) {
            dState = 6;
            return err();
          }
          dState = 4;
          if (b >= 33 && b <= 126) {
            const cp = jis0208[(lead - 33) * 94 + b - 33];
            if (cp) return cp;
          }
          return err();
        case 6:
          if (b === 36 || b === 40) {
            lead = b;
            dState = 7;
            return;
          }
          out = false;
          dState = oState;
          pushback.push(b);
          return err();
        case 7: {
          const l = lead;
          lead = 0;
          let s;
          if (l === 40) {
            if (b === 66) {
              s = 1;
            } else if (b === 74) {
              s = 2;
            } else if (b === 73) {
              s = 3;
            }
          } else if (l === 36 && (b === 64 || b === 66)) {
            s = 4;
          }
          if (s) {
            dState = oState = s;
            const output = out;
            out = true;
            return output ? err() : void 0;
          }
          out = false;
          dState = oState;
          pushback.push(b, l);
          return err();
        }
      }
    };
    const eof = (pushback) => {
      if (dState < 5) return null;
      out = false;
      switch (dState) {
        case 5:
          dState = 4;
          return err();
        case 6:
          dState = oState;
          return err();
        case 7: {
          dState = oState;
          pushback.push(lead);
          lead = 0;
          return err();
        }
      }
    };
    const decode = (arr, start, end, stream) => {
      const o16 = new Uint16Array(end - start + 2);
      let oi = 0;
      let i = start;
      const pushback = [];
      while (i < end || pushback.length > 0) {
        const c = bytes(pushback, pushback.length > 0 ? pushback.pop() : arr[i++]);
        if (c !== void 0) o16[oi++] = c;
      }
      if (!stream) {
        while (i <= end || pushback.length > 0) {
          if (i < end || pushback.length > 0) {
            const c = bytes(pushback, pushback.length > 0 ? pushback.pop() : arr[i++]);
            if (c !== void 0) o16[oi++] = c;
          } else {
            const c = eof(pushback);
            if (c === null) break;
            o16[oi++] = c;
          }
        }
      }
      if (!stream) {
        dState = oState = 1;
        lead = 0;
        out = false;
      }
      return (0, import_latin1.decodeUCS2)(o16, oi);
    };
    return { decode, isAscii: () => false };
  },
  // https://encoding.spec.whatwg.org/#shift_jis-decoder
  shift_jis: (err) => {
    const jis0208 = (0, import_multi_byte_table.getTable)("jis0208");
    let lead = 0;
    let oi = 0;
    let o16;
    const decodeLead = (b) => {
      const l = lead;
      lead = 0;
      if (b >= 64 && b <= 252 && b !== 127) {
        const p = (l - (l < 160 ? 129 : 193)) * 188 + b - (b < 127 ? 64 : 65);
        if (p >= 8836 && p <= 10715) {
          o16[oi++] = 57344 - 8836 + p;
          return;
        }
        const cp = jis0208[p];
        if (cp) {
          o16[oi++] = cp;
          return;
        }
      }
      o16[oi++] = err();
      if (b < 128) o16[oi++] = b;
    };
    const decode = (arr, start, end, stream) => {
      o16 = new Uint16Array(end - start + (lead ? 1 : 0));
      oi = 0;
      let i = start;
      if (!lead) {
        for (const last1 = end - 1; i < last1; ) {
          const l = arr[i];
          if (l <= 128) {
            o16[oi++] = l;
            i++;
          } else if (l >= 161 && l <= 223) {
            o16[oi++] = 65216 + l;
            i++;
          } else {
            if (l === 160 || l > 252) break;
            const b = arr[i + 1];
            if (b < 64 || b > 252 || b === 127) break;
            const p = (l - (l < 160 ? 129 : 193)) * 188 + b - (b < 127 ? 64 : 65);
            if (p >= 8836 && p <= 10715) {
              o16[oi++] = 57344 - 8836 + p;
              i += 2;
            } else {
              const cp = jis0208[p];
              if (!cp) break;
              o16[oi++] = cp;
              i += 2;
            }
          }
        }
      }
      if (lead && i < end) decodeLead(arr[i++]);
      while (i < end) {
        const b = arr[i++];
        if (b <= 128) {
          o16[oi++] = b;
        } else if (b >= 161 && b <= 223) {
          o16[oi++] = 65216 + b;
        } else if (b === 160 || b > 252) {
          o16[oi++] = err();
        } else {
          lead = b;
          if (i < end) decodeLead(arr[i++]);
        }
      }
      if (lead && !stream) {
        lead = 0;
        o16[oi++] = err();
      }
      const res = (0, import_latin1.decodeUCS2)(o16, oi);
      o16 = null;
      return res;
    };
    return { decode, isAscii: () => lead === 0 };
  },
  // https://encoding.spec.whatwg.org/#gbk-decoder
  gbk: (err) => mappers.gb18030(err),
  // 10.1.1. GBK’s decoder is gb18030’s decoder
  // https://encoding.spec.whatwg.org/#gb18030-decoder
  gb18030: (err) => {
    const gb18030 = (0, import_multi_byte_table.getTable)("gb18030");
    const gb18030r2 = (0, import_multi_byte_table.getTable)("gb18030-ranges");
    let g1 = 0, g2 = 0, g3 = 0;
    const index = (p) => {
      if (p > 39419 && p < 189e3 || p > 1237575) return;
      if (p === 7457) return 59335;
      let a = 0, b = 0;
      for (const [c, d] of gb18030r2) {
        if (c > p) break;
        a = c;
        b = d;
      }
      return b + p - a;
    };
    const decode = (arr, start, end, stream) => {
      const o16 = new Uint16Array(end - start + (g1 ? 3 : 0));
      let oi = 0;
      let i = start;
      const pushback = [];
      if (g1 === 0) {
        for (const last1 = end - 1; i < last1; ) {
          const b = arr[i];
          if (b < 128) {
            o16[oi++] = b;
            i++;
          } else if (b === 128) {
            o16[oi++] = 8364;
            i++;
          } else {
            if (b === 255) break;
            const n = arr[i + 1];
            let cp;
            if (n < 127) {
              if (n < 64) break;
              cp = gb18030[(b - 129) * 190 + n - 64];
            } else {
              if (n === 255 || n === 127) break;
              cp = gb18030[(b - 129) * 190 + n - 65];
            }
            if (!cp) break;
            o16[oi++] = cp;
            i += 2;
          }
        }
      }
      while (i < end || pushback.length > 0) {
        const b = pushback.length > 0 ? pushback.pop() : arr[i++];
        if (g1) {
          if (g2) {
            if (g3) {
              if (b <= 57 && b >= 48) {
                const p = index(
                  (g1 - 129) * 12600 + (g2 - 48) * 1260 + (g3 - 129) * 10 + b - 48
                );
                g1 = g2 = g3 = 0;
                if (p === void 0) {
                  o16[oi++] = err();
                } else if (p <= 65535) {
                  o16[oi++] = p;
                } else {
                  const d = p - 65536;
                  o16[oi++] = 55296 | d >> 10;
                  o16[oi++] = 56320 | d & 1023;
                }
              } else {
                pushback.push(b, g3, g2);
                g1 = g2 = g3 = 0;
                o16[oi++] = err();
              }
            } else if (b >= 129 && b <= 254) {
              g3 = b;
            } else {
              pushback.push(b, g2);
              g1 = g2 = 0;
              o16[oi++] = err();
            }
          } else if (b <= 57 && b >= 48) {
            g2 = b;
          } else {
            let cp;
            if (b >= 64 && b <= 254 && b !== 127) {
              cp = gb18030[(g1 - 129) * 190 + b - (b < 127 ? 64 : 65)];
            }
            g1 = 0;
            if (cp) {
              o16[oi++] = cp;
            } else {
              o16[oi++] = err();
              if (b < 128) o16[oi++] = b;
            }
          }
        } else if (b < 128) {
          o16[oi++] = b;
        } else if (b === 128) {
          o16[oi++] = 8364;
        } else if (b === 255) {
          o16[oi++] = err();
        } else {
          g1 = b;
        }
      }
      if (g1 && !stream) {
        g1 = g2 = g3 = 0;
        o16[oi++] = err();
      }
      return (0, import_latin1.decodeUCS2)(o16, oi);
    };
    return { decode, isAscii: () => g1 === 0 };
  },
  // https://encoding.spec.whatwg.org/#big5
  big5: (err) => {
    const big5 = (0, import_multi_byte_table.getTable)("big5");
    let lead = 0;
    let oi = 0;
    let o16;
    const decodeLead = (b) => {
      if (b < 64 || b > 126 && b < 161 || b === 255) {
        lead = 0;
        o16[oi++] = err();
        if (b < 128) o16[oi++] = b;
      } else {
        const p = big5[(lead - 129) * 157 + b - (b < 127 ? 64 : 98)];
        lead = 0;
        if (p > 65536) {
          o16[oi++] = p >> 16;
          o16[oi++] = p & 65535;
        } else if (p) {
          o16[oi++] = p;
        } else {
          o16[oi++] = err();
          if (b < 128) o16[oi++] = b;
        }
      }
    };
    const decode = (arr, start, end, stream) => {
      let i = start;
      o16 = new Uint16Array(end - start + (lead ? 1 : 0));
      oi = 0;
      if (!lead) {
        for (const last1 = end - 1; i < last1; ) {
          const l = arr[i];
          if (l < 128) {
            o16[oi++] = l;
            i++;
          } else {
            if (l === 128 || l === 255) break;
            const b = arr[i + 1];
            if (b < 64 || b > 126 && b < 161 || b === 255) break;
            const p = big5[(l - 129) * 157 + b - (b < 127 ? 64 : 98)];
            if (p > 65536) {
              o16[oi++] = p >> 16;
              o16[oi++] = p & 65535;
            } else {
              if (!p) break;
              o16[oi++] = p;
            }
            i += 2;
          }
        }
      }
      if (lead && i < end) decodeLead(arr[i++]);
      while (i < end) {
        const b = arr[i++];
        if (b < 128) {
          o16[oi++] = b;
        } else if (b === 128 || b === 255) {
          o16[oi++] = err();
        } else {
          lead = b;
          if (i < end) decodeLead(arr[i++]);
        }
      }
      if (lead && !stream) {
        lead = 0;
        o16[oi++] = err();
      }
      const res = (0, import_latin1.decodeUCS2)(o16, oi);
      o16 = null;
      return res;
    };
    return { decode, isAscii: () => lead === 0 };
  }
};
const isAsciiSuperset = (enc) => enc !== "iso-2022-jp";
function multibyteDecoder(enc, loose = false) {
  if (typeof loose !== "boolean") throw new TypeError("loose option should be boolean");
  if (!Object.hasOwn(mappers, enc)) throw new RangeError("Unsupported encoding");
  let mapper;
  const asciiSuperset = isAsciiSuperset(enc);
  let streaming;
  const onErr = loose ? () => 65533 : () => {
    if (!streaming) mapper = null;
    throw new TypeError(E_STRICT);
  };
  return (arr, stream = false) => {
    let res = "";
    if (asciiSuperset && (!mapper || mapper.isAscii?.())) {
      const prefixLen = (0, import_latin1.asciiPrefix)(arr);
      if (prefixLen === arr.length) return (0, import_latin1.decodeAscii)(arr);
      res = (0, import_latin1.decodeLatin1)(arr, 0, prefixLen);
    }
    streaming = stream;
    if (!mapper) mapper = mappers[enc](onErr);
    return res + mapper.decode(arr, res.length, arr.length, stream);
  };
}
const maps = /* @__PURE__ */ new Map();
const e7 = [[148, 236], [149, 237], [150, 243]];
const e8 = [[30, 89], [38, 97], [43, 102], [44, 103], [50, 109], [67, 126], [84, 144], [100, 160]];
const preencoders = {
  __proto__: null,
  big5: (p) => (p / 157 | 0) + 129 << 8 | (p % 157 < 63 ? 64 : 98) + p % 157,
  shift_jis: (p) => {
    const l = p / 188 | 0;
    const t = p % 188;
    return l + (l < 31 ? 129 : 193) << 8 | (t < 63 ? 64 : 65) + t;
  },
  "iso-2022-jp": (p) => (p / 94 | 0) + 33 << 8 | p % 94 + 33,
  "euc-jp": (p) => (p / 94 | 0) + 161 << 8 | p % 94 + 161,
  "euc-kr": (p) => (p / 190 | 0) + 129 << 8 | p % 190 + 65,
  gb18030: (p) => (p / 190 | 0) + 129 << 8 | (p % 190 < 63 ? 64 : 65) + p % 190
};
preencoders.gbk = preencoders.gb18030;
function getMap(id, size, ascii) {
  const cached = maps.get(id);
  if (cached) return cached;
  let tname = id;
  const sjis = id === "shift_jis";
  const iso2022jp = id === "iso-2022-jp";
  if (iso2022jp) tname = "jis0208";
  if (id === "gbk") tname = "gb18030";
  if (id === "euc-jp" || sjis) tname = "jis0208";
  const table = (0, import_multi_byte_table.getTable)(tname);
  const map = new Uint16Array(size);
  const enc = preencoders[id] || ((p) => p + 1);
  for (let i = 0; i < table.length; i++) {
    const c = table[i];
    if (!c) continue;
    if (id === "big5") {
      if (i < 5024) continue;
      if (map[c] && c !== 9552 && c !== 9566 && c !== 9569 && c !== 9578 && c !== 21313 && c !== 21317) {
        continue;
      }
    } else {
      if (sjis && i >= 8272 && i <= 8835) continue;
      if (map[c]) continue;
    }
    if (c > 65535) {
      const s = String.fromCharCode(c >> 16, c & 65535);
      map[s.codePointAt(0)] = enc(i);
    } else {
      map[c] = enc(i);
    }
  }
  if (ascii) for (let i = 0; i < 128; i++) map[i] = i;
  if (sjis || id === "euc-jp") {
    if (sjis) map[128] = 128;
    const d = sjis ? 65216 : 28864;
    for (let i = 65377; i <= 65439; i++) map[i] = i - d;
    map[8722] = map[65293];
    map[165] = 92;
    map[8254] = 126;
  } else if (tname === "gb18030") {
    if (id === "gbk") map[8364] = 128;
    for (let i = 59277; i <= 59283; i++) map[i] = i - 16564;
    for (const [a, b] of e7) map[59136 | a] = 42496 | b;
    for (const [a, b] of e8) map[59392 | a] = 65024 | b;
  }
  maps.set(id, map);
  return map;
}
const NON_LATIN = /[^\x00-\xFF]/;
let gb18030r, katakana;
function multibyteEncoder(enc, onError) {
  if (!Object.hasOwn(mappers, enc)) throw new RangeError("Unsupported encoding");
  const size = enc === "big5" ? 194727 : 65536;
  const iso2022jp = enc === "iso-2022-jp";
  const gb18030 = enc === "gb18030";
  const ascii = isAsciiSuperset(enc);
  const width = iso2022jp ? 5 : gb18030 ? 4 : 2;
  const tailsize = iso2022jp ? 3 : 0;
  const map = getMap(enc, size, ascii);
  if (gb18030 && !gb18030r) gb18030r = (0, import_multi_byte_table.getTable)("gb18030-ranges");
  if (iso2022jp && !katakana) katakana = (0, import_multi_byte_table.getTable)("iso-2022-jp-katakana");
  return (str) => {
    if (typeof str !== "string") throw new TypeError(import_utils.E_STRING);
    if (ascii && import_platform.nativeEncoder && !NON_LATIN.test(str)) {
      const u82 = import_platform.nativeEncoder.encode(str);
      if (u82.length === str.length) return u82;
    }
    const length = str.length;
    const u8 = new Uint8Array(length * width + tailsize);
    let i = 0;
    if (ascii) {
      while (i < length) {
        const x = str.charCodeAt(i);
        if (x >= 128) break;
        u8[i++] = x;
      }
    }
    const err = (code) => {
      if (onError) return onError(code, u8, i);
      throw new TypeError(E_STRICT);
    };
    if (!map || map.length < size) throw new Error("Unreachable");
    if (iso2022jp) {
      let state = 0;
      const restore = () => {
        state = 0;
        u8[i++] = 27;
        u8[i++] = 40;
        u8[i++] = 66;
      };
      for (let j = 0; j < length; j++) {
        let x = str.charCodeAt(j);
        if (x >= 55296 && x < 57344) {
          if (state === 2) restore();
          if (x >= 56320 || j + 1 === length) {
            i += err(x);
          } else {
            const x1 = str.charCodeAt(j + 1);
            if (x1 < 56320 || x1 >= 57344) {
              i += err(x);
            } else {
              j++;
              i += err(65536 + (x1 & 1023 | (x & 1023) << 10));
            }
          }
        } else if (x < 128) {
          if (state === 2 || state === 1 && (x === 92 || x === 126)) restore();
          if (x === 14 || x === 15 || x === 27) {
            i += err(65533);
          } else {
            u8[i++] = x;
          }
        } else if (x === 165 || x === 8254) {
          if (state !== 1) {
            state = 1;
            u8[i++] = 27;
            u8[i++] = 40;
            u8[i++] = 74;
          }
          u8[i++] = x === 165 ? 92 : 126;
        } else {
          if (x === 8722) x = 65293;
          if (x >= 65377 && x <= 65439) x = katakana[x - 65377];
          const e = map[x];
          if (e) {
            if (state !== 2) {
              state = 2;
              u8[i++] = 27;
              u8[i++] = 36;
              u8[i++] = 66;
            }
            u8[i++] = e >> 8;
            u8[i++] = e & 255;
          } else {
            if (state === 2) restore();
            i += err(x);
          }
        }
      }
      if (state) restore();
    } else if (gb18030) {
      const encode = (cp) => {
        let a = 0, b = 0;
        for (const [c, d] of gb18030r) {
          if (d > cp) break;
          a = c;
          b = d;
        }
        let rp = cp === 59335 ? 7457 : a + cp - b;
        u8[i++] = 129 + (rp / 12600 | 0);
        rp %= 12600;
        u8[i++] = 48 + (rp / 1260 | 0);
        rp %= 1260;
        u8[i++] = 129 + (rp / 10 | 0);
        u8[i++] = 48 + rp % 10;
      };
      for (let j = i; j < length; j++) {
        const x = str.charCodeAt(j);
        if (x >= 55296 && x < 57344) {
          if (x >= 56320 || j + 1 === length) {
            i += err(x);
          } else {
            const x1 = str.charCodeAt(j + 1);
            if (x1 < 56320 || x1 >= 57344) {
              i += err(x);
            } else {
              j++;
              encode(65536 + (x1 & 1023 | (x & 1023) << 10));
            }
          }
        } else {
          const e = map[x];
          if (e & 65280) {
            u8[i++] = e >> 8;
            u8[i++] = e & 255;
          } else if (e || x === 0) {
            u8[i++] = e;
          } else if (x === 58853) {
            i += err(x);
          } else {
            encode(x);
          }
        }
      }
    } else {
      const long = enc === "big5" ? (x) => {
        const e = map[x];
        if (e & 65280) {
          u8[i++] = e >> 8;
          u8[i++] = e & 255;
        } else if (e || x === 0) {
          u8[i++] = e;
        } else {
          i += err(x);
        }
      } : (x) => {
        i += err(x);
      };
      for (let j = i; j < length; j++) {
        const x = str.charCodeAt(j);
        if (x >= 55296 && x < 57344) {
          if (x >= 56320 || j + 1 === length) {
            i += err(x);
          } else {
            const x1 = str.charCodeAt(j + 1);
            if (x1 < 56320 || x1 >= 57344) {
              i += err(x);
            } else {
              j++;
              long(65536 + (x1 & 1023 | (x & 1023) << 10));
            }
          }
        } else {
          const e = map[x];
          if (e & 65280) {
            u8[i++] = e >> 8;
            u8[i++] = e & 255;
          } else if (e || x === 0) {
            u8[i++] = e;
          } else {
            i += err(x);
          }
        }
      }
    }
    return i === u8.length ? u8 : u8.slice(0, i);
  };
}
