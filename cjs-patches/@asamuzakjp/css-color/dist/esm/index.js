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
  convert: () => Da,
  resolve: () => la,
  resolveGradient: () => sa,
  utils: () => Oa
});
module.exports = __toCommonJS(stdin_exports);
var import_css_color_parser = require("@csstools/css-color-parser");
var import_css_parser_algorithms = require("@csstools/css-parser-algorithms");
var import_css_tokenizer = require("@csstools/css-tokenizer");
var import_lru_cache = require("lru-cache");
var import_css_calc = require("@csstools/css-calc");
var d = 4096, f = class {
  #e;
  constructor(e2) {
    this.#e = e2;
  }
  get item() {
    return this.#e;
  }
}, p = new import_lru_cache.LRUCache({ max: d }), m = (e2, t2) => {
  e2 && (t2 instanceof f ? p.set(e2, t2) : p.set(e2, new f(t2)));
}, h = (e2) => {
  if (!e2) return false;
  let t2 = p.get(e2);
  return t2 !== void 0 && t2;
}, g = (e2) => {
  let t2 = Object.keys(e2);
  if (t2.length === 0) return "";
  t2.sort();
  let n2 = "";
  for (let r2 of t2) n2 += `${r2}:${JSON.stringify(e2[r2])};`;
  return n2;
}, _ = (e2, t2 = {}) => {
  if (!e2 || t2.customProperty && typeof t2.customProperty.callback == "function" || t2.dimension && typeof t2.dimension.callback == "function") return "";
  let n2 = e2.namespace || "", r2 = e2.name || "", i2 = e2.value || "";
  if (!n2 && !r2 && !i2) return "";
  let a2 = `${n2}:${r2}:${i2}`, o2 = [];
  for (let [e3, n3] of Object.entries(t2)) e3 !== "customProperty" && e3 !== "dimension" && o2.push(`${e3}_${n3}`);
  let s2 = t2.customProperty ? g(t2.customProperty) : "", c2 = t2.dimension ? g(t2.dimension) : "";
  return `${a2}:${o2.sort().join("|")}:${s2}:${c2}`;
}, v = (e2) => typeof e2 == "string" || e2 instanceof String, y = (e2) => v(e2) || typeof e2 == "number", b = "(?:0|[1-9]\\d*)", x = "clamp|max|min|exp|hypot|log|pow|sqrt|abs|sign|mod|rem|round|a?(?:cos|sin|tan)|atan2", S = `calc|${x}`, C = `var|${S}`, w = "deg|g?rad|turn", T = "[cm]m|[dls]?v(?:[bhiw]|max|min)|in|p[ctx]|q|r?(?:[cl]h|cap|e[mx]|ic)", E = `[+-]?(?:${b}(?:\\.\\d*)?|\\.\\d+)(?:e-?${b})?`, D = `\\+?(?:${b}(?:\\.\\d*)?|\\.\\d+)(?:e-?${b})?`, O = "none", k = `${E}%`, A = `^(?:${S})\\(|(?<=[*\\/\\s\\(])(?:${S})\\(`, j = `^(?:${x})\\($`, ee = "^var\\(|(?<=[*\\/\\s\\(])var\\(", te = `^(?:${C})\\(`, M = `(?:\\s*\\/\\s*(?:${E}|${k}|${O}))?`, ne = `(?:\\s*,\\s*(?:${E}|${k}))?`, re = "[a-z]+|#[\\da-f]{3}|#[\\da-f]{4}|#[\\da-f]{6}|#[\\da-f]{8}", ie = "(?:ok)?lch|hsl|hwb", ae = "(?:de|in)creasing|longer|shorter", oe = `${E}(?:${w})?`, se = `(?:${E}(?:${w})?|${O})`, ce = `(?:${E}|${k}|${O})`, le = "(?:ok)?l(?:ab|ch)|color|hsla?|hwb|rgba?", ue = `(?:${ie})(?:\\s(?:${ae})\\shue)?`, de = "(?:ok)?lab", fe = "(?:a98|prophoto)-rgb|display-p3|rec2020|srgb(?:-linear)?", pe = "xyz(?:-d(?:50|65))?", me = `${de}|${fe}|${pe}`, he = `${ue}|${me}`, ge = "calc(", _e = `(?:${fe}|${pe})(?:\\s+${ce}){3}${M}`, ve = "^light-dark\\(", ye = `^(?:${le})\\(\\s*from\\s+|(?<=[\\s])(?:${le})\\(\\s*from\\s+`, be = `${se}(?:\\s+${ce}){2}${M}`, xe = `${oe}(?:\\s*,\\s*${k}){2}${ne}`, Se = `(?:${ce}\\s+){2}${se}${M}`, Ce = `${ce}(?:\\s+${ce}){2}${M}`, we = `${re}|hsla?\\(\\s*${xe}\\s*\\)|rgba?\\(\\s*${`(?:${E}(?:\\s*,\\s*${E}){2}|${k}(?:\\s*,\\s*${k}){2})${ne}`}\\s*\\)|(?:hsla?|hwb)\\(\\s*${be}\\s*\\)|(?:(?:ok)?lab|rgba?)\\(\\s*${Ce}\\s*\\)|(?:ok)?lch\\(\\s*${Se}\\s*\\)|color\\(\\s*${_e}\\s*\\)`, Te = `(?:${we})(?:\\s+${k})?`, Ee = `color-mix\\((?:\\s*in\\s+(?:${he})\\s*,)?(?:\\s*${Te}\\s*,)*\\s*${Te}\\s*\\)`, De = "(?:repeating-)?(?:conic|linear|radial)-gradient", N = "computedValue", P = "mixValue", Oe = "specifiedValue", ke = 0.5, Ae = 24389 / 27, je = 12.92, F = 0.055, Me = 1024, Ne = 65536, Pe = 2.4, Fe = 1e-3, Ie = "util", { CloseParen: Le, Comma: Re, Comment: ze, Delim: Be, EOF: Ve, Function: He, OpenParen: Ue, Whitespace: We } = import_css_tokenizer.TokenType;
RegExp(`^(${E})(${w})?$`);
var Ge = /^,$/, Ke = /--[\w-]+/g, qe = /^\/$/, Je = /^\s+$/, Ye = /* @__PURE__ */ new Map([
  ["xx-small", 9 / 16],
  ["x-small", 5 / 8],
  ["small", 13 / 16],
  ["medium", 1],
  ["large", 9 / 8],
  ["x-large", 3 / 2],
  ["xx-large", 2],
  ["xxx-large", 3]
]), Xe = /* @__PURE__ */ new Map([["smaller", 1 / 1.2], ["larger", 1.2]]), Ze = /* @__PURE__ */ new Map([
  ["cm", 96 / 2.54],
  ["mm", 96 / 25.4],
  ["q", 96 / 101.6],
  ["in", 96],
  ["pc", 16],
  ["pt", 96 / 72],
  ["px", 1]
]), Qe = /* @__PURE__ */ new Map([
  ["rcap", 1],
  ["rch", 0.5],
  ["rem", 1],
  ["rex", 0.5],
  ["ric", 1],
  ["rlh", 1.2]
]), $e = (e2 = {}, t2 = false) => {
  let { maxLength: n2 } = e2, r2 = t2 ? Ne : Me;
  return Number.isInteger(n2) && n2 > 0 && n2 < r2 ? n2 : r2;
}, I = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  let n2 = e2.trim(), r2 = { ...t2 }, i2 = $e(r2, true);
  if (!n2 || n2.length > i2) return [];
  let { delimiter: a2 = " ", preserveComment: o2 = false } = r2, s2 = _({
    namespace: Ie,
    name: "splitValue",
    value: n2
  }, {
    delimiter: a2,
    preserveComment: o2
  }), l2 = h(s2);
  if (l2) return [...l2.item];
  let u2;
  switch (a2) {
    case ",":
      u2 = Ge;
      break;
    case "/":
      u2 = qe;
      break;
    default:
      u2 = Je;
  }
  let d2 = (0, import_css_tokenizer.tokenize)({ css: n2 }), f2 = 0, p2 = "", g2 = [];
  for (let [e3, t3] of d2) switch (e3) {
    case Re:
    case Be:
      f2 === 0 && u2.test(t3) ? (g2.push(p2.trim()), p2 = "") : p2 += t3;
      break;
    case ze:
      o2 && (a2 === "," || a2 === "/") && (p2 += t3);
      break;
    case He:
    case Ue:
      p2 += t3, f2++;
      break;
    case Le:
      p2 += t3, f2--;
      break;
    case We:
      u2.test(t3) ? f2 === 0 ? p2 &&= (g2.push(p2.trim()), "") : p2 += " " : p2.endsWith(" ") || (p2 += " ");
      break;
    default:
      e3 === Ve ? (g2.push(p2.trim()), p2 = "") : p2 += t3;
  }
  return m(s2, g2), [...g2];
}, et = (e2) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  let t2 = e2.trim();
  if (!t2) return [];
  let n2 = _({
    namespace: Ie,
    name: "extractDashedIdent",
    value: t2
  }), r2 = h(n2);
  if (r2) return [...r2.item];
  let i2 = t2.match(Ke), a2 = i2 ? [...new Set(i2)] : [];
  return m(n2, a2), [...a2];
}, L = (e2, t2 = 0) => {
  if (!Number.isFinite(e2)) throw TypeError(`${e2} is not a finite number.`);
  if (!Number.isFinite(t2)) throw TypeError(`${t2} is not a finite number.`);
  if (t2 < 0 || t2 > 16) throw RangeError(`${t2} is not between 0 and 16.`);
  if (t2 === 0) return Math.round(e2);
  let n2 = t2 === 16 ? 6 : t2 < 10 ? 4 : 5;
  return parseFloat(e2.toPrecision(n2));
}, tt = (e2, t2, n2 = "shorter") => {
  if (!Number.isFinite(e2)) throw TypeError(`${e2} is not a finite number.`);
  if (!Number.isFinite(t2)) throw TypeError(`${t2} is not a finite number.`);
  let r2 = e2, i2 = t2;
  switch (n2) {
    case "decreasing":
      i2 > r2 && (r2 += 360);
      break;
    case "increasing":
      i2 < r2 && (i2 += 360);
      break;
    case "longer":
      i2 > r2 && i2 < r2 + 180 ? r2 += 360 : i2 > r2 - 180 && i2 <= r2 && (i2 += 360);
      break;
    default:
      i2 > r2 + 180 ? r2 += 360 : i2 < r2 - 180 && (i2 += 360);
  }
  return [r2, i2];
}, nt = (e2, t2, n2 = {}) => {
  let { dimension: r2 = {} } = n2, { callback: i2, em: a2, rem: o2, vh: s2, vw: c2 } = r2;
  if (v(e2)) {
    let t3 = e2.toLowerCase().trim(), r3 = $e(n2);
    if (t3.length > r3) return NaN;
    let i3 = Ye.get(t3);
    if (i3 !== void 0 && typeof o2 == "number") return i3 * o2;
    let s3 = Xe.get(t3);
    return s3 !== void 0 && typeof a2 == "number" ? s3 * a2 : NaN;
  }
  if (Number.isFinite(e2) && t2) {
    let n3 = t2.toLowerCase();
    if (Object.hasOwn(r2, n3)) {
      let t3 = r2[n3];
      return typeof t3 == "number" ? e2 * t3 : NaN;
    }
    if (typeof i2 == "function") {
      let t3 = i2(n3);
      return typeof t3 == "number" ? e2 * t3 : NaN;
    }
    let l2 = Ze.get(n3);
    if (l2 !== void 0) return e2 * l2;
    let u2 = Qe.get(n3);
    if (u2 !== void 0 && typeof o2 == "number") return e2 * u2 * o2;
    let d2 = Qe.get(`r${n3}`);
    if (d2 !== void 0 && typeof a2 == "number") return e2 * d2 * a2;
    switch (n3) {
      case "vb":
        return typeof s2 == "number" ? e2 * s2 : NaN;
      case "vi":
        return typeof c2 == "number" ? e2 * c2 : NaN;
      case "vmax":
        return typeof s2 == "number" && typeof c2 == "number" ? e2 * Math.max(s2, c2) : NaN;
      case "vmin":
        return typeof s2 == "number" && typeof c2 == "number" ? e2 * Math.min(s2, c2) : NaN;
    }
  }
  return NaN;
}, rt = (e2) => {
  if (!Number.isFinite(e2)) throw TypeError(`${e2} is not a number.`);
  let t2 = Math.round(e2);
  if (t2 < 0 || t2 > 255) throw RangeError(`${t2} is not between 0 and 255.`);
  let n2 = t2.toString(16);
  return n2.length === 1 ? `0${n2}` : n2;
}, R = (e2 = "") => {
  if (!v(e2)) return 1;
  let t2 = e2.trim();
  if (!t2) return 1;
  if (t2 === "none") return 0;
  let n2;
  if (n2 = t2.endsWith("%") ? parseFloat(t2) / 100 : parseFloat(t2), !Number.isFinite(n2)) throw TypeError(`${n2} is not a finite number.`);
  return n2 < 1e-3 ? 0 : n2 > 1 ? 1 : parseFloat(n2.toFixed(3));
}, it = (e2) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  let t2 = e2.trim();
  if (!t2) throw SyntaxError("Invalid property value: (empty string)");
  let n2 = parseInt(t2, 16);
  if (n2 <= 0) return 0;
  if (n2 >= 255) return 1;
  let r2 = /* @__PURE__ */ new Map();
  for (let e3 = 1; e3 < 100; e3++) r2.set(Math.round(e3 * 255 / 100), e3);
  return n2 = r2.has(n2) ? r2.get(n2) / 100 : Math.round(n2 / 255 / Fe) * Fe, parseFloat(n2.toFixed(3));
}, at = (e2) => {
  let n2 = (0, import_css_tokenizer.tokenize)({ css: e2 });
  return (0, import_css_color_parser.color)((0, import_css_parser_algorithms.parseComponentValue)(n2)) || null;
}, ot = (e2, t2, n2 = false) => {
  if (t2 === "specifiedValue") return m(e2, ""), "";
  if (n2) return m(e2, null), null;
  let r2 = [
    "rgb",
    0,
    0,
    0,
    0
  ];
  return m(e2, r2), r2;
}, z = (e2, t2 = false) => {
  switch (e2) {
    case "hsl":
    case "hwb":
    case P:
      return null;
    case Oe:
      return "";
    default:
      return t2 ? null : [
        "rgb",
        0,
        0,
        0,
        0
      ];
  }
}, st = (e2) => {
  let t2 = (0, import_css_parser_algorithms.parseListOfComponentValues)((0, import_css_tokenizer.tokenize)({ css: e2 })), r2 = [];
  for (let e3 of t2) !(0, import_css_parser_algorithms.isCommentNode)(e3) && !(0, import_css_parser_algorithms.isWhitespaceNode)(e3) && r2.push(e3.toString().trim());
  return r2;
}, ct = [
  0.3457 / 0.3585,
  1,
  0.2958 / 0.3585
], lt = [
  [
    0.955473421488075,
    -0.02309845494876471,
    0.06325924320057072
  ],
  [
    -0.0283697093338637,
    1.0099953980813041,
    0.021041441191917323
  ],
  [
    0.012314014864481998,
    -0.020507649298898964,
    1.330365926242124
  ]
], B = [
  [
    1.0479297925449969,
    0.022946870601609652,
    -0.05019226628920524
  ],
  [
    0.02962780877005599,
    0.9904344267538799,
    -0.017073799063418826
  ],
  [
    -0.009243040646204504,
    0.015055191490298152,
    0.7518742814281371
  ]
], ut = [
  [
    506752 / 1228815,
    87881 / 245763,
    12673 / 70218
  ],
  [
    87098 / 409605,
    175762 / 245763,
    12673 / 175545
  ],
  [
    7918 / 409605,
    87881 / 737289,
    1001167 / 1053270
  ]
], dt = [
  [
    12831 / 3959,
    -329 / 214,
    -1974 / 3959
  ],
  [
    -851781 / 878810,
    1648619 / 878810,
    36519 / 878810
  ],
  [
    705 / 12673,
    -2585 / 12673,
    705 / 667
  ]
], ft = [
  [
    0.819022437996703,
    0.3619062600528904,
    -0.1288737815209879
  ],
  [
    0.0329836539323885,
    0.9292868615863434,
    0.0361446663506424
  ],
  [
    0.0481771893596242,
    0.2642395317527308,
    0.6335478284694309
  ]
], pt = [
  [
    1.2268798758459243,
    -0.5578149944602171,
    0.2813910456659647
  ],
  [
    -0.0405757452148008,
    1.112286803280317,
    -0.0717110580655164
  ],
  [
    -0.0763729366746601,
    -0.4214933324022432,
    1.5869240198367816
  ]
], mt = [
  [
    1,
    0.3963377773761749,
    0.2158037573099136
  ],
  [
    1,
    -0.1055613458156586,
    -0.0638541728258133
  ],
  [
    1,
    -0.0894841775298119,
    -1.2914855480194092
  ]
], ht = [
  [
    0.210454268309314,
    0.7936177747023054,
    -0.0040720430116193
  ],
  [
    1.9779985324311684,
    -2.42859224204858,
    0.450593709617411
  ],
  [
    0.0259040424655478,
    0.7827717124575296,
    -0.8086757549230774
  ]
], gt = [
  [
    608311 / 1250200,
    189793 / 714400,
    198249 / 1000160
  ],
  [
    35783 / 156275,
    247089 / 357200,
    198249 / 2500400
  ],
  [
    0,
    32229 / 714400,
    5220557 / 5000800
  ]
], _t = [
  [
    63426534 / 99577255,
    20160776 / 139408157,
    47086771 / 278816314
  ],
  [
    26158966 / 99577255,
    472592308 / 697040785,
    8267143 / 139408157
  ],
  [
    0,
    19567812 / 697040785,
    295819943 / 278816314
  ]
], vt = [
  [
    573536 / 994567,
    263643 / 1420810,
    187206 / 994567
  ],
  [
    591459 / 1989134,
    6239551 / 9945670,
    374412 / 4972835
  ],
  [
    53769 / 1989134,
    351524 / 4972835,
    4929758 / 4972835
  ]
], yt = [
  [
    0.7977666449006423,
    0.13518129740053308,
    0.0313477341283922
  ],
  [
    0.2880748288194013,
    0.711835234241873,
    8993693872564e-17
  ],
  [
    0,
    0,
    0.8251046025104602
  ]
], V = (e2, t2 = {}) => {
  if (!Array.isArray(e2)) throw TypeError(`${e2} is not an array.`);
  let { alpha: n2 = false, minLength: r2 = 3, maxLength: i2 = 4, minRange: a2 = 0, maxRange: o2 = 1, validateRange: s2 = true } = t2;
  if (!Number.isFinite(r2)) throw TypeError(`${r2} is not a number.`);
  if (!Number.isFinite(i2)) throw TypeError(`${i2} is not a number.`);
  if (!Number.isFinite(a2)) throw TypeError(`${a2} is not a number.`);
  if (!Number.isFinite(o2)) throw TypeError(`${o2} is not a number.`);
  let c2 = e2.length;
  if (c2 < r2 || c2 > i2) throw Error(`Unexpected array length ${c2}.`);
  let l2 = 0;
  for (; l2 < c2; ) {
    let t3 = e2[l2];
    if (!Number.isFinite(t3)) throw TypeError(`${t3} is not a number.`);
    if (l2 < 3 && s2 && (t3 < a2 || t3 > o2)) throw RangeError(`${t3} is not between ${a2} and ${o2}.`);
    if (l2 === 3 && (t3 < 0 || t3 > 1)) throw RangeError(`${t3} is not between 0 and 1.`);
    l2++;
  }
  return n2 && c2 === 3 && e2.push(1), e2;
}, bt = (e2, t2, n2 = false) => {
  if (!Array.isArray(e2)) throw TypeError(`${e2} is not an array.`);
  if (e2.length !== 4) throw Error(`Unexpected array length ${e2.length}.`);
  if (!Array.isArray(t2)) throw TypeError(`${t2} is not an array.`);
  if (t2.length !== 4) throw Error(`Unexpected array length ${t2.length}.`);
  let r2 = 0;
  for (; r2 < 4; ) e2[r2] === "none" && t2[r2] === "none" ? (e2[r2] = 0, t2[r2] = 0) : e2[r2] === "none" ? e2[r2] = t2[r2] : t2[r2] === "none" && (t2[r2] = e2[r2]), r2++;
  return n2 ? [e2, t2] : [V(e2, {
    minLength: 4,
    validateRange: false
  }), V(t2, {
    minLength: 4,
    validateRange: false
  })];
}, H = (e2, t2, n2 = false) => {
  if (!Array.isArray(e2)) throw TypeError(`${e2} is not an array.`);
  if (e2.length !== 3) throw Error(`Unexpected array length ${e2.length}.`);
  if (!n2) for (let t3 of e2) t3 = V(t3, {
    maxLength: 3,
    validateRange: false
  });
  let [[r2, i2, a2], [o2, s2, c2], [l2, u2, d2]] = e2, f2, p2, m2;
  return n2 ? [f2, p2, m2] = t2 : [f2, p2, m2] = V(t2, {
    maxLength: 3,
    validateRange: false
  }), [
    r2 * f2 + i2 * p2 + a2 * m2,
    o2 * f2 + s2 * p2 + c2 * m2,
    l2 * f2 + u2 * p2 + d2 * m2
  ];
}, xt = (e2, t2 = false) => {
  let n2, r2, i2;
  t2 ? [n2, r2, i2] = e2 : [n2, r2, i2] = V(e2, {
    maxLength: 3,
    maxRange: 255
  });
  let a2 = n2 / 255, o2 = r2 / 255, s2 = i2 / 255, c2 = 0.04045;
  return a2 > c2 ? a2 = ((a2 + F) / (1 + F)) ** +Pe : a2 /= je, o2 > c2 ? o2 = ((o2 + F) / (1 + F)) ** +Pe : o2 /= je, s2 > c2 ? s2 = ((s2 + F) / (1 + F)) ** +Pe : s2 /= je, [
    a2,
    o2,
    s2
  ];
}, St = (e2, t2 = false) => (t2 || (e2 = V(e2, {
  maxLength: 3,
  maxRange: 255
})), e2 = xt(e2, true), H(ut, e2, true)), Ct = (e2, t2 = false) => {
  let [n2, r2, i2] = V(e2, { maxLength: 3 }), a2 = 809 / 258400;
  return n2 > a2 ? n2 = n2 ** (1 / Pe) * (1 + F) - F : n2 *= je, n2 *= 255, r2 > a2 ? r2 = r2 ** (1 / Pe) * (1 + F) - F : r2 *= je, r2 *= 255, i2 > a2 ? i2 = i2 ** (1 / Pe) * (1 + F) - F : i2 *= je, i2 *= 255, [
    t2 ? Math.round(n2) : n2,
    t2 ? Math.round(r2) : r2,
    t2 ? Math.round(i2) : i2
  ];
}, wt = (e2, t2 = false) => {
  t2 || (e2 = V(e2, {
    maxLength: 3,
    validateRange: false
  }));
  let [n2, r2, i2] = H(dt, e2, true);
  return [n2, r2, i2] = Ct([
    Math.min(Math.max(n2, 0), 1),
    Math.min(Math.max(r2, 0), 1),
    Math.min(Math.max(i2, 0), 1)
  ], true), [
    n2,
    r2,
    i2
  ];
}, Tt = (e2, t2 = false) => {
  let [n2, r2, i2] = wt(e2, t2), a2 = n2 / 255, o2 = r2 / 255, s2 = i2 / 255, c2 = Math.max(a2, o2, s2), l2 = Math.min(a2, o2, s2), u2 = c2 - l2, d2 = (c2 + l2) * ke * 100, f2, p2;
  if (Math.round(d2) === 0 || Math.round(d2) === 100) f2 = 0, p2 = 0;
  else if (p2 = u2 / (1 - Math.abs(c2 + l2 - 1)) * 100, p2 === 0) f2 = 0;
  else {
    switch (c2) {
      case a2:
        f2 = (o2 - s2) / u2;
        break;
      case o2:
        f2 = (s2 - a2) / u2 + 2;
        break;
      case s2:
      default:
        f2 = (a2 - o2) / u2 + 4;
    }
    f2 = f2 * 60 % 360, f2 < 0 && (f2 += 360);
  }
  return [
    f2,
    p2,
    d2
  ];
}, Et = (e2, t2 = false) => {
  let [n2, r2, i2] = wt(e2, t2), a2 = Math.min(n2, r2, i2) / 255, o2 = 1 - Math.max(n2, r2, i2) / 255, s2;
  return a2 + o2 === 1 ? s2 = 0 : [s2] = Tt(e2), [
    s2,
    a2 * 100,
    o2 * 100
  ];
}, Dt = (e2, t2 = false) => {
  t2 || (e2 = V(e2, {
    maxLength: 3,
    validateRange: false
  }));
  let [n2, r2, i2] = H(ht, H(ft, e2, true).map((e3) => Math.cbrt(e3)), true);
  n2 = Math.min(Math.max(n2, 0), 1);
  let a2 = Math.round(parseFloat(n2.toFixed(4)) * 100);
  return (a2 === 0 || a2 === 100) && (r2 = 0, i2 = 0), [
    n2,
    r2,
    i2
  ];
}, Ot = (e2, t2 = false) => {
  let [n2, r2, i2] = Dt(e2, t2), a2, o2, s2 = Math.round(parseFloat(n2.toFixed(4)) * 100);
  return s2 === 0 || s2 === 100 ? (a2 = 0, o2 = 0) : (a2 = Math.max(Math.sqrt(r2 ** 2 + i2 ** 2), 0), parseFloat(a2.toFixed(4)) === 0 ? o2 = 0 : (o2 = Math.atan2(i2, r2) * 180 / Math.PI, o2 < 0 && (o2 += 360))), [
    n2,
    a2,
    o2
  ];
}, kt = (e2, t2 = false) => (t2 || (e2 = V(e2, {
  maxLength: 3,
  validateRange: false
})), wt(H(lt, e2, true), true)), At = (e2, t2 = false) => {
  t2 || (e2 = V(e2, {
    maxLength: 3,
    validateRange: false
  }));
  let [n2, r2, i2] = e2.map((e3, t3) => e3 / ct[t3]).map((e3) => e3 > 0.008856451679035631 ? Math.cbrt(e3) : (Ae * e3 + 16) / 116), a2 = Math.min(Math.max(116 * r2 - 16, 0), 100), o2, s2;
  return a2 === 0 || a2 === 100 ? (o2 = 0, s2 = 0) : (o2 = (n2 - r2) * 500, s2 = (r2 - i2) * 200), [
    a2,
    o2,
    s2
  ];
}, jt = (e2, t2 = false) => {
  let [n2, r2, i2] = At(e2, t2), a2, o2;
  return n2 === 0 || n2 === 100 ? (a2 = 0, o2 = 0) : (a2 = Math.max(Math.sqrt(r2 ** 2 + i2 ** 2), 0), o2 = Math.atan2(i2, r2) * 180 / Math.PI, o2 < 0 && (o2 += 360)), [
    n2,
    a2,
    o2
  ];
}, Mt = (e2) => {
  let [t2, n2, r2, i2] = V(e2, {
    alpha: true,
    maxRange: 255
  }), a2 = rt(t2), o2 = rt(n2), s2 = rt(r2), c2 = rt(i2 * 255);
  return c2 === "ff" ? `#${a2}${o2}${s2}` : `#${a2}${o2}${s2}${c2}`;
}, Nt = (e2) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  if (e2 = e2.toLowerCase().trim(), !(/^#[\da-f]{6}$/.test(e2) || /^#[\da-f]{3}$/.test(e2) || /^#[\da-f]{8}$/.test(e2) || /^#[\da-f]{4}$/.test(e2))) throw SyntaxError(`Invalid property value: ${e2}`);
  let t2 = [];
  if (/^#[\da-f]{3}$/.test(e2)) {
    let [, n2, r2, i2] = e2.match(/^#([\da-f])([\da-f])([\da-f])$/);
    t2.push(parseInt(`${n2}${n2}`, 16), parseInt(`${r2}${r2}`, 16), parseInt(`${i2}${i2}`, 16), 1);
  } else if (/^#[\da-f]{4}$/.test(e2)) {
    let [, n2, r2, i2, a2] = e2.match(/^#([\da-f])([\da-f])([\da-f])([\da-f])$/);
    t2.push(parseInt(`${n2}${n2}`, 16), parseInt(`${r2}${r2}`, 16), parseInt(`${i2}${i2}`, 16), it(`${a2}${a2}`));
  } else if (/^#[\da-f]{8}$/.test(e2)) {
    let [, n2, r2, i2, a2] = e2.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})$/);
    t2.push(parseInt(n2, 16), parseInt(r2, 16), parseInt(i2, 16), it(a2));
  } else {
    let [, n2, r2, i2] = e2.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/);
    t2.push(parseInt(n2, 16), parseInt(r2, 16), parseInt(i2, 16), 1);
  }
  return t2;
}, Pt = (e2) => {
  let [t2, n2, r2, i2] = Nt(e2), [a2, o2, s2] = xt([
    t2,
    n2,
    r2
  ], true);
  return [
    a2,
    o2,
    s2,
    i2
  ];
}, Ft = (e2) => {
  let [t2, n2, r2, i2] = Pt(e2), [a2, o2, s2] = H(ut, [
    t2,
    n2,
    r2
  ], true);
  return [
    a2,
    o2,
    s2,
    i2
  ];
}, { CloseParen: It, Comment: Lt, Delim: Rt, Dimension: zt, EOF: Bt, Function: Vt, Ident: Ht, Number: Ut, OpenParen: Wt, Whitespace: Gt } = import_css_tokenizer.TokenType, Kt = "css-calc-var", qt = /* @__PURE__ */ new Set([
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset"
]), Jt = /* @__PURE__ */ new Set([
  "+",
  "-",
  "*",
  "/"
]), Yt = new RegExp(A, "i"), Xt = RegExp(`^calc\\((${E})\\)$`, "i"), Zt = new RegExp(j, "i"), Qt = new RegExp(ee, "i"), $t = new RegExp(te, "i"), en = /\s[-+*/]\s/, tn = (e2) => {
  if (typeof e2 == "number") return {
    num: e2,
    unit: ""
  };
  if (!v(e2)) return null;
  let t2 = (0, import_css_tokenizer.tokenize)({ css: e2 }).filter(([e3]) => e3 !== Gt && e3 !== Lt && e3 !== Bt);
  if (t2.length !== 1) return null;
  let [n2, r2, , , i2] = t2[0];
  return n2 === Ut ? {
    num: Number(r2),
    unit: ""
  } : n2 === zt && i2 ? {
    num: Number(i2.value),
    unit: i2.unit
  } : r2.endsWith("%") ? {
    num: parseFloat(r2),
    unit: "%"
  } : null;
}, nn = class {
  #e;
  #t;
  #n;
  #r;
  #i;
  #a;
  #o;
  #s;
  #c;
  #l;
  #u;
  #d;
  #f;
  #p;
  #m;
  #h;
  #g;
  constructor() {
    this.#e = false, this.#t = [], this.#n = [], this.#r = false, this.#i = [], this.#a = [], this.#o = false, this.#s = [], this.#c = [], this.#l = [], this.#u = [], this.#d = false, this.#f = [], this.#p = [], this.#m = [], this.#h = [], this.#g = { toCanonicalUnits: true };
  }
  get hasNum() {
    return this.#e;
  }
  set hasNum(e2) {
    this.#e = !!e2;
  }
  get numSum() {
    return this.#t;
  }
  get numMul() {
    return this.#n;
  }
  get hasPct() {
    return this.#r;
  }
  set hasPct(e2) {
    this.#r = !!e2;
  }
  get pctSum() {
    return this.#i;
  }
  get pctMul() {
    return this.#a;
  }
  get hasDim() {
    return this.#o;
  }
  set hasDim(e2) {
    this.#o = !!e2;
  }
  get dimSum() {
    return this.#s;
  }
  get dimSub() {
    return this.#c;
  }
  get dimMul() {
    return this.#l;
  }
  get dimDiv() {
    return this.#u;
  }
  get hasEtc() {
    return this.#d;
  }
  set hasEtc(e2) {
    this.#d = !!e2;
  }
  get etcSum() {
    return this.#f;
  }
  get etcSub() {
    return this.#p;
  }
  get etcMul() {
    return this.#m;
  }
  get etcDiv() {
    return this.#h;
  }
  clear() {
    this.#e = false, this.#t.length = 0, this.#n.length = 0, this.#r = false, this.#i.length = 0, this.#a.length = 0, this.#o = false, this.#s.length = 0, this.#c.length = 0, this.#l.length = 0, this.#u.length = 0, this.#d = false, this.#f.length = 0, this.#p.length = 0, this.#m.length = 0, this.#h.length = 0;
  }
  sort(e2 = []) {
    let t2 = [...e2];
    return t2.length > 1 && t2.sort((e3, t3) => {
      let n2 = tn(e3), r2 = tn(t3);
      if (n2 && r2 && n2.unit && r2.unit) {
        let { num: e4, unit: t4 } = n2, { num: i2, unit: a2 } = r2;
        return t4 === a2 ? e4 === i2 ? 0 : e4 > i2 ? 1 : -1 : t4 > a2 ? 1 : -1;
      }
      return e3 === t3 ? 0 : e3 > t3 ? 1 : -1;
    }), t2;
  }
  multiply() {
    let e2 = [], t2;
    if (this.#e) {
      t2 = 1;
      for (let e3 of this.#n) if (t2 *= e3, t2 === 0 || !Number.isFinite(t2) || Number.isNaN(t2)) break;
      this.#r || this.#o || this.hasEtc || (Number.isFinite(t2) && (t2 = L(t2, 16)), e2.push(t2));
    }
    if (this.#r) {
      typeof t2 != "number" && (t2 = 1);
      for (let e3 of this.#a) if (t2 *= e3, t2 === 0 || !Number.isFinite(t2) || Number.isNaN(t2)) break;
      Number.isFinite(t2) && (t2 = `${L(t2, 16)}%`), !this.#o && !this.hasEtc && e2.push(t2);
    }
    if (this.#o) {
      let n2 = "", r2 = "", i2 = "";
      this.#l.length && (this.#l.length === 1 ? [r2] = this.#l : r2 = `${this.sort(this.#l).join(" * ")}`), this.#u.length && (this.#u.length === 1 ? [i2] = this.#u : i2 = `${this.sort(this.#u).join(" * ")}`), Number.isFinite(t2) ? (n2 = r2 ? i2 ? i2.includes("*") ? (0, import_css_calc.calc)(`calc(${t2} * ${r2} / (${i2}))`, this.#g) : (0, import_css_calc.calc)(`calc(${t2} * ${r2} / ${i2})`, this.#g) : (0, import_css_calc.calc)(`calc(${t2} * ${r2})`, this.#g) : i2.includes("*") ? (0, import_css_calc.calc)(`calc(${t2} / (${i2}))`, this.#g) : (0, import_css_calc.calc)(`calc(${t2} / ${i2})`, this.#g), e2.push(n2.replace(/^calc/, ""))) : (!e2.length && t2 !== void 0 && e2.push(t2), r2 ? (n2 = i2 ? i2.includes("*") ? (0, import_css_calc.calc)(`calc(${r2} / (${i2}))`, this.#g) : (0, import_css_calc.calc)(`calc(${r2} / ${i2})`, this.#g) : (0, import_css_calc.calc)(`calc(${r2})`, this.#g), e2.length ? e2.push("*", n2.replace(/^calc/, "")) : e2.push(n2.replace(/^calc/, ""))) : (n2 = (0, import_css_calc.calc)(`calc(${i2})`, this.#g), e2.length ? e2.push("/", n2.replace(/^calc/, "")) : e2.push("1", "/", n2.replace(/^calc/, ""))));
    }
    if (this.#d) {
      if (this.#m.length) {
        !e2.length && t2 !== void 0 && e2.push(t2);
        let n2 = this.sort(this.#m).join(" * ");
        e2.length ? e2.push(`* ${n2}`) : e2.push(`${n2}`);
      }
      if (this.#h.length) {
        let t3 = this.sort(this.#h).join(" * ");
        t3.includes("*") ? e2.length ? e2.push(`/ (${t3})`) : e2.push(`1 / (${t3})`) : e2.length ? e2.push(`/ ${t3}`) : e2.push(`1 / ${t3}`);
      }
    }
    return e2.length ? e2.join(" ") : "";
  }
  sum() {
    let e2 = [];
    if (this.#e) {
      let t2 = 0;
      for (let e3 of this.#t) if (t2 += e3, !Number.isFinite(t2) || Number.isNaN(t2)) break;
      e2.push(t2);
    }
    if (this.#r) {
      let t2 = 0;
      for (let e3 of this.#i) if (t2 += e3, !Number.isFinite(t2)) break;
      Number.isFinite(t2) && (t2 = `${t2}%`), e2.length ? e2.push(`+ ${t2}`) : e2.push(t2);
    }
    if (this.#o) {
      let t2, n2, r2;
      this.#s.length && (n2 = this.sort(this.#s).join(" + ")), this.#c.length && (r2 = this.sort(this.#c).join(" + ")), t2 = n2 ? r2 ? r2.includes("-") ? (0, import_css_calc.calc)(`calc(${n2} - (${r2}))`, this.#g) : (0, import_css_calc.calc)(`calc(${n2} - ${r2})`, this.#g) : (0, import_css_calc.calc)(`calc(${n2})`, this.#g) : (0, import_css_calc.calc)(`calc(-1 * (${r2}))`, this.#g), e2.length ? e2.push("+", t2.replace(/^calc/, "")) : e2.push(t2.replace(/^calc/, ""));
    }
    if (this.#d) {
      if (this.#f.length) {
        let t2 = this.sort(this.#f).map((e3) => {
          let t3;
          return t3 = (0, import_css_tokenizer.tokenize)({ css: e3 }).some(([e4, t4]) => e4 === Rt && Jt.has(t4)) && !e3.startsWith("(") && !e3.endsWith(")") ? `(${e3})` : e3, t3;
        }).join(" + ");
        e2.length ? this.#f.length > 1 ? e2.push(`+ (${t2})`) : e2.push(`+ ${t2}`) : e2.push(`${t2}`);
      }
      if (this.#p.length) {
        let t2 = this.sort(this.#p).map((e3) => {
          let t3;
          return t3 = (0, import_css_tokenizer.tokenize)({ css: e3 }).some(([e4, t4]) => e4 === Rt && Jt.has(t4)) && !e3.startsWith("(") && !e3.endsWith(")") ? `(${e3})` : e3, t3;
        }).join(" + ");
        e2.length ? this.#p.length > 1 ? e2.push(`- (${t2})`) : e2.push(`- ${t2}`) : this.#p.length > 1 ? e2.push(`-1 * (${t2})`) : e2.push(`-1 * ${t2}`);
      }
    }
    return e2.length ? e2.join(" ") : "";
  }
}, rn = (e2 = [], t2 = false) => {
  if (e2.length < 3) throw Error(`Unexpected array length ${e2.length}.`);
  let n2 = e2.shift();
  if (!v(n2) || !n2.endsWith("(")) throw Error(`Unexpected token ${n2}.`);
  let r2 = e2.pop();
  if (r2 !== ")") throw Error(`Unexpected token ${r2}.`);
  if (e2.length === 1) {
    let [t3] = e2;
    if (!y(t3)) throw Error(`Unexpected token ${t3}.`);
    return `${n2}${t3}${r2}`;
  }
  let i2 = [], a2 = new nn(), o2 = "", s2 = false;
  for (let t3 of e2) {
    if (!y(t3)) throw Error(`Unexpected token ${t3}.`);
    if (t3 === "*" || t3 === "/") o2 = t3;
    else if (t3 === "+" || t3 === "-") {
      let e3 = a2.multiply();
      e3 && i2.push(e3, t3), s2 = true, a2.clear(), o2 = "";
    } else {
      let e3 = Number(t3), n3 = `${t3}`, r3 = tn(n3), i3 = r3 && r3.unit !== "" && r3.unit !== "%";
      switch (o2) {
        case "/":
          Number.isFinite(e3) ? (a2.hasNum = true, a2.numMul.push(1 / e3)) : r3 && r3.unit === "%" ? (a2.hasPct = true, a2.pctMul.push(1e4 / r3.num)) : i3 ? (a2.hasDim = true, a2.dimDiv.push(n3)) : (a2.hasEtc = true, a2.etcDiv.push(n3));
          break;
        default:
          Number.isFinite(e3) ? (a2.hasNum = true, a2.numMul.push(e3)) : r3 && r3.unit === "%" ? (a2.hasPct = true, a2.pctMul.push(r3.num)) : i3 ? (a2.hasDim = true, a2.dimMul.push(n3)) : (a2.hasEtc = true, a2.etcMul.push(n3));
      }
    }
  }
  let c2 = a2.multiply();
  c2 && i2.push(c2);
  let l2 = "";
  if (t2 && s2) {
    let e3 = [];
    a2.clear(), o2 = "";
    for (let e4 of i2) if (e4 === "+" || e4 === "-") o2 = e4;
    else {
      let t4 = Number(e4), n3 = `${e4}`, r3 = tn(n3), i3 = r3 && r3.unit !== "" && r3.unit !== "%";
      switch (o2) {
        case "-":
          Number.isFinite(t4) ? (a2.hasNum = true, a2.numSum.push(-1 * t4)) : r3 && r3.unit === "%" ? (a2.hasPct = true, a2.pctSum.push(-1 * r3.num)) : i3 ? (a2.hasDim = true, a2.dimSub.push(n3)) : (a2.hasEtc = true, a2.etcSub.push(n3));
          break;
        default:
          Number.isFinite(t4) ? (a2.hasNum = true, a2.numSum.push(t4)) : r3 && r3.unit === "%" ? (a2.hasPct = true, a2.pctSum.push(r3.num)) : i3 ? (a2.hasDim = true, a2.dimSum.push(n3)) : (a2.hasEtc = true, a2.etcSum.push(n3));
      }
    }
    let t3 = a2.sum();
    e3.push(t3), a2.clear(), o2 = "", l2 = e3.join(" ").replace(/\+\s-/g, "- ");
  } else l2 = i2.join(" ").replace(/\+\s-/g, "- ");
  return l2.startsWith("(") && l2.endsWith(")") && l2.lastIndexOf("(") === 0 && l2.indexOf(")") === l2.length - 1 && (l2 = l2.substring(1, l2.length - 1)), `${n2}${l2}${r2}`;
}, an = (e2) => {
  let t2 = (0, import_css_tokenizer.tokenize)({ css: e2 }), n2 = [], r2 = [], i2 = "", a2 = 0;
  for (let e3 of t2) {
    let [t3, o3] = e3;
    if (t3 === Wt || t3 === Vt ? a2++ : t3 === It && a2--, a2 === 0 && (o3 === "+" || o3 === "-")) {
      let e4 = r2.join("").trim();
      e4 && n2.push((i2 === "-" ? "-" : "") + e4), r2 = [], i2 = o3;
    } else r2.push(o3);
  }
  let o2 = r2.join("").trim();
  if (o2 && n2.push((i2 === "-" ? "-" : "") + o2), n2.length === 0) return e2;
  n2.sort((e3, t3) => {
    let n3 = tn(e3), r3 = tn(t3);
    return n3 && r3 ? n3.unit === r3.unit ? n3.num - r3.num : n3.unit > r3.unit ? 1 : -1 : e3 === t3 ? 0 : e3 > t3 ? 1 : -1;
  });
  let [s2, ...l2] = n2, u2 = s2;
  for (let e3 of l2) e3.startsWith("-") ? u2 += ` - ${e3.substring(1)}` : u2 += ` + ${e3}`;
  return u2;
}, on = (e2, t2) => {
  let n2 = e2[0], r2 = v(n2) && Zt.test(n2), i2 = [];
  for (let t3 of e2) Array.isArray(t3) ? i2.push(on(t3, r2)) : i2.push(t3);
  let a2 = i2.includes(","), o2 = i2[0] ?? "", s2 = v(o2) && Zt.test(o2);
  if (a2 && s2 && i2.at(-1) === ")") {
    let e3 = i2.shift(), t3 = i2.pop(), n3 = [], r3 = [];
    for (let e4 of i2) e4 === "," ? (n3.push(r3), r3 = []) : r3.push(e4);
    return r3.length && n3.push(r3), `${e3}${n3.map((e4) => {
      if (e4.length >= 3) {
        let t4 = rn([
          ge,
          ...e4,
          ")"
        ], true);
        return an(t4.substring(5, t4.length - 1));
      }
      if (e4.length === 1) {
        let t4 = e4[0];
        if (v(t4) && t4.startsWith("calc(") && t4.endsWith(")")) return an(t4.substring(5, t4.length - 1));
      }
      return e4.join("");
    }).join(", ")}${t3}`;
  }
  if (t2) {
    if (!a2) {
      if (i2.length >= 3) return rn(i2, true);
      let e3 = i2[0] ?? "";
      return e3.endsWith("(") ? i2.join("") : /^[a-z-]+\(/.test(e3) ? e3 : `calc(${e3})`;
    }
    return i2.join("").replace(/,\s*/g, ", ");
  }
  if (i2.length >= 3 && !a2) {
    let e3 = rn(i2, false);
    return $t.test(e3) && (e3 = (0, import_css_calc.calc)(e3, { toCanonicalUnits: true })), e3;
  }
  return i2.join("").replace(/,\s*/g, ", ");
}, sn = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  let { format: n2 = "" } = t2;
  if (!$t.test(e2) || n2 !== "specifiedValue") return e2;
  let r2 = e2.trim(), i2 = _({
    namespace: Kt,
    name: "serializeCalc",
    value: r2
  }, t2), a2 = h(i2);
  if (a2 !== false) return a2.item;
  let o2 = (0, import_css_tokenizer.tokenize)({ css: r2 }).filter((e3) => {
    let [t3] = e3;
    return t3 !== Gt && t3 !== Lt && t3 !== Bt;
  }), s2 = [[]];
  for (let e3 of o2) {
    let [t3, n3] = e3;
    if (t3 === Wt || t3 === Vt) {
      let e4 = [n3];
      s2.at(-1).push(e4), s2.push(e4);
    } else t3 === It ? s2.length > 1 ? s2.pop().push(n3) : s2[0].push(n3) : s2.at(-1).push(n3);
  }
  let l2 = "", u2 = s2[0];
  return l2 = u2.length === 1 && Array.isArray(u2[0]) ? on(u2[0], true) : on(u2, true), m(i2, l2), l2;
}, cn = (e2, t2 = {}) => {
  if (!Array.isArray(e2)) throw TypeError(`${e2} is not an array.`);
  let [, , , , n2 = {}] = e2, { unit: r2, value: i2 } = n2;
  if (r2 === "px") return `${i2}${r2}`;
  let a2 = nt(Number(i2), r2, t2);
  return Number.isFinite(a2) ? `${L(a2, 16)}px` : null;
}, ln = (e2, t2 = {}) => {
  if (!Array.isArray(e2)) throw TypeError(`${e2} is not an array.`);
  let { format: n2 = "" } = t2, r2 = /* @__PURE__ */ new Set(), i2 = 0, a2 = [];
  for (let o2 of e2) {
    if (!Array.isArray(o2)) throw TypeError(`${o2} is not an array.`);
    let [e3 = "", s2 = ""] = o2;
    switch (e3) {
      case zt:
        if (n2 === "specifiedValue" && !r2.has(i2)) a2.push(s2);
        else {
          let e4 = cn(o2, t2);
          v(e4) ? a2.push(e4) : a2.push(s2);
        }
        break;
      case Vt:
      case Wt:
        a2.push(s2), i2++, Zt.test(s2) && r2.add(i2);
        break;
      case It:
        a2.length && a2.at(-1) === " " ? a2.splice(-1, 1, s2) : a2.push(s2), r2.has(i2) && r2.delete(i2), i2--;
        break;
      case Gt:
        if (a2.length) {
          let e4 = a2.at(-1);
          v(e4) && !e4.endsWith("(") && e4 !== " " && a2.push(s2);
        }
        break;
      default:
        e3 !== Lt && e3 !== Bt && a2.push(s2);
    }
  }
  return a2;
}, U = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  let n2 = { ...t2 }, r2 = $e(n2);
  if (e2.length > r2) return "";
  let { format: i2 } = n2;
  if (Qt.test(e2)) {
    if (i2 === "specifiedValue") return e2;
    {
      let t3 = fn(e2, n2);
      return v(t3) ? t3 : "";
    }
  }
  if (!Yt.test(e2)) return e2;
  let a2 = e2.trim(), o2 = _({
    namespace: Kt,
    name: "cssCalc",
    value: a2
  }, n2), s2 = h(o2);
  if (s2 !== false) return s2.item;
  let l2 = ln((0, import_css_tokenizer.tokenize)({ css: a2 }), n2), d2 = (0, import_css_calc.calc)(l2.join(""), { toCanonicalUnits: true });
  if ($t.test(e2)) {
    let e3 = tn(d2);
    e3 && e3.unit !== "" && (d2 = `${L(Number(e3.num), 16)}${e3.unit}`), d2 && !$t.test(d2) && i2 === "specifiedValue" && (d2 = `calc(${d2})`);
  }
  if (i2 === "specifiedValue") {
    if (en.test(d2) && !d2.includes("NaN")) d2 = sn(d2, n2);
    else if (Xt.test(d2)) {
      let [, e3] = d2.match(Xt);
      d2 = `calc(${L(Number(e3), 16)})`;
    }
  }
  return m(o2, d2), d2;
};
function un(e2, t2 = {}) {
  if (!Array.isArray(e2)) throw TypeError(`${e2} is not an array.`);
  let { customProperty: n2 = {} } = t2, r2 = [];
  for (; e2.length; ) {
    let i3 = e2.shift();
    if (!i3) break;
    if (!Array.isArray(i3)) throw TypeError(`${i3} is not an array.`);
    let [a3, o2] = i3;
    if (a3 === It) break;
    if (o2 === "var(") {
      let [, n3] = un(e2, t2);
      n3 && r2.push(n3);
    } else if (o2 && a3 === Ht) {
      if (o2.startsWith("--")) {
        let e3;
        if (n2[o2]) {
          let t3 = n2[o2];
          e3 = typeof t3 == "function" ? t3(o2) : t3;
        } else typeof n2.callback == "function" && (e3 = n2.callback(o2));
        e3 && r2.push(e3);
      } else r2.push(o2);
    }
  }
  let i2 = false;
  r2.length > 1 && (i2 = Qr(r2.at(-1)));
  let a2 = "";
  for (let e3 of r2) {
    if (e3 = e3.trim(), Qt.test(e3)) {
      let n3 = fn(e3, t2);
      v(n3) && (!i2 || Qr(n3)) && (a2 = n3);
    } else Yt.test(e3) ? (e3 = U(e3, t2), (!i2 || Qr(e3)) && (a2 = e3)) : e3 && !qt.has(e3) && (!i2 || Qr(e3)) && (a2 = e3);
    if (a2) break;
  }
  return [e2, a2];
}
function dn(e2, t2 = {}) {
  let n2 = [];
  for (; e2.length; ) {
    let r2 = e2.shift();
    if (!r2) break;
    let [i2 = "", a2 = ""] = r2;
    if (a2 === "var(") {
      let [, r3] = un(e2, t2);
      if (!r3) return null;
      n2.push(r3);
    } else switch (i2) {
      case It:
        n2.length && n2.at(-1) === " " ? n2[n2.length - 1] = a2 : n2.push(a2);
        break;
      case Gt:
        if (n2.length) {
          let e3 = n2.at(-1);
          v(e3) && !e3.endsWith("(") && e3 !== " " && n2.push(a2);
        }
        break;
      default:
        i2 !== Lt && i2 !== Bt && n2.push(a2);
    }
  }
  return n2;
}
function fn(e2, t2 = {}) {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  let n2 = $e(t2);
  if (e2.length > n2) return null;
  if (!Qt.test(e2) || t2.format === "specifiedValue") return e2;
  let r2 = e2.trim(), i2 = _({
    namespace: Kt,
    name: "resolveVar",
    value: r2
  }, t2), a2 = h(i2);
  if (a2 !== false) return a2.item;
  let o2 = dn((0, import_css_tokenizer.tokenize)({ css: r2 }), t2);
  if (Array.isArray(o2)) {
    let e3 = o2.join("");
    return e3.length > n2 ? (m(i2, null), null) : (Yt.test(e3) && (e3 = U(e3, t2)), m(i2, e3), e3);
  }
  return m(i2, null), null;
}
var pn = (e2, t2 = {}) => {
  let n2 = fn(e2, { ...t2 });
  return v(n2) ? n2 : "";
}, mn = {
  aliceblue: [
    240,
    248,
    255
  ],
  antiquewhite: [
    250,
    235,
    215
  ],
  aqua: [
    0,
    255,
    255
  ],
  aquamarine: [
    127,
    255,
    212
  ],
  azure: [
    240,
    255,
    255
  ],
  beige: [
    245,
    245,
    220
  ],
  bisque: [
    255,
    228,
    196
  ],
  black: [
    0,
    0,
    0
  ],
  blanchedalmond: [
    255,
    235,
    205
  ],
  blue: [
    0,
    0,
    255
  ],
  blueviolet: [
    138,
    43,
    226
  ],
  brown: [
    165,
    42,
    42
  ],
  burlywood: [
    222,
    184,
    135
  ],
  cadetblue: [
    95,
    158,
    160
  ],
  chartreuse: [
    127,
    255,
    0
  ],
  chocolate: [
    210,
    105,
    30
  ],
  coral: [
    255,
    127,
    80
  ],
  cornflowerblue: [
    100,
    149,
    237
  ],
  cornsilk: [
    255,
    248,
    220
  ],
  crimson: [
    220,
    20,
    60
  ],
  cyan: [
    0,
    255,
    255
  ],
  darkblue: [
    0,
    0,
    139
  ],
  darkcyan: [
    0,
    139,
    139
  ],
  darkgoldenrod: [
    184,
    134,
    11
  ],
  darkgray: [
    169,
    169,
    169
  ],
  darkgreen: [
    0,
    100,
    0
  ],
  darkgrey: [
    169,
    169,
    169
  ],
  darkkhaki: [
    189,
    183,
    107
  ],
  darkmagenta: [
    139,
    0,
    139
  ],
  darkolivegreen: [
    85,
    107,
    47
  ],
  darkorange: [
    255,
    140,
    0
  ],
  darkorchid: [
    153,
    50,
    204
  ],
  darkred: [
    139,
    0,
    0
  ],
  darksalmon: [
    233,
    150,
    122
  ],
  darkseagreen: [
    143,
    188,
    143
  ],
  darkslateblue: [
    72,
    61,
    139
  ],
  darkslategray: [
    47,
    79,
    79
  ],
  darkslategrey: [
    47,
    79,
    79
  ],
  darkturquoise: [
    0,
    206,
    209
  ],
  darkviolet: [
    148,
    0,
    211
  ],
  deeppink: [
    255,
    20,
    147
  ],
  deepskyblue: [
    0,
    191,
    255
  ],
  dimgray: [
    105,
    105,
    105
  ],
  dimgrey: [
    105,
    105,
    105
  ],
  dodgerblue: [
    30,
    144,
    255
  ],
  firebrick: [
    178,
    34,
    34
  ],
  floralwhite: [
    255,
    250,
    240
  ],
  forestgreen: [
    34,
    139,
    34
  ],
  fuchsia: [
    255,
    0,
    255
  ],
  gainsboro: [
    220,
    220,
    220
  ],
  ghostwhite: [
    248,
    248,
    255
  ],
  gold: [
    255,
    215,
    0
  ],
  goldenrod: [
    218,
    165,
    32
  ],
  gray: [
    128,
    128,
    128
  ],
  green: [
    0,
    128,
    0
  ],
  greenyellow: [
    173,
    255,
    47
  ],
  grey: [
    128,
    128,
    128
  ],
  honeydew: [
    240,
    255,
    240
  ],
  hotpink: [
    255,
    105,
    180
  ],
  indianred: [
    205,
    92,
    92
  ],
  indigo: [
    75,
    0,
    130
  ],
  ivory: [
    255,
    255,
    240
  ],
  khaki: [
    240,
    230,
    140
  ],
  lavender: [
    230,
    230,
    250
  ],
  lavenderblush: [
    255,
    240,
    245
  ],
  lawngreen: [
    124,
    252,
    0
  ],
  lemonchiffon: [
    255,
    250,
    205
  ],
  lightblue: [
    173,
    216,
    230
  ],
  lightcoral: [
    240,
    128,
    128
  ],
  lightcyan: [
    224,
    255,
    255
  ],
  lightgoldenrodyellow: [
    250,
    250,
    210
  ],
  lightgray: [
    211,
    211,
    211
  ],
  lightgreen: [
    144,
    238,
    144
  ],
  lightgrey: [
    211,
    211,
    211
  ],
  lightpink: [
    255,
    182,
    193
  ],
  lightsalmon: [
    255,
    160,
    122
  ],
  lightseagreen: [
    32,
    178,
    170
  ],
  lightskyblue: [
    135,
    206,
    250
  ],
  lightslategray: [
    119,
    136,
    153
  ],
  lightslategrey: [
    119,
    136,
    153
  ],
  lightsteelblue: [
    176,
    196,
    222
  ],
  lightyellow: [
    255,
    255,
    224
  ],
  lime: [
    0,
    255,
    0
  ],
  limegreen: [
    50,
    205,
    50
  ],
  linen: [
    250,
    240,
    230
  ],
  magenta: [
    255,
    0,
    255
  ],
  maroon: [
    128,
    0,
    0
  ],
  mediumaquamarine: [
    102,
    205,
    170
  ],
  mediumblue: [
    0,
    0,
    205
  ],
  mediumorchid: [
    186,
    85,
    211
  ],
  mediumpurple: [
    147,
    112,
    219
  ],
  mediumseagreen: [
    60,
    179,
    113
  ],
  mediumslateblue: [
    123,
    104,
    238
  ],
  mediumspringgreen: [
    0,
    250,
    154
  ],
  mediumturquoise: [
    72,
    209,
    204
  ],
  mediumvioletred: [
    199,
    21,
    133
  ],
  midnightblue: [
    25,
    25,
    112
  ],
  mintcream: [
    245,
    255,
    250
  ],
  mistyrose: [
    255,
    228,
    225
  ],
  moccasin: [
    255,
    228,
    181
  ],
  navajowhite: [
    255,
    222,
    173
  ],
  navy: [
    0,
    0,
    128
  ],
  oldlace: [
    253,
    245,
    230
  ],
  olive: [
    128,
    128,
    0
  ],
  olivedrab: [
    107,
    142,
    35
  ],
  orange: [
    255,
    165,
    0
  ],
  orangered: [
    255,
    69,
    0
  ],
  orchid: [
    218,
    112,
    214
  ],
  palegoldenrod: [
    238,
    232,
    170
  ],
  palegreen: [
    152,
    251,
    152
  ],
  paleturquoise: [
    175,
    238,
    238
  ],
  palevioletred: [
    219,
    112,
    147
  ],
  papayawhip: [
    255,
    239,
    213
  ],
  peachpuff: [
    255,
    218,
    185
  ],
  peru: [
    205,
    133,
    63
  ],
  pink: [
    255,
    192,
    203
  ],
  plum: [
    221,
    160,
    221
  ],
  powderblue: [
    176,
    224,
    230
  ],
  purple: [
    128,
    0,
    128
  ],
  rebeccapurple: [
    102,
    51,
    153
  ],
  red: [
    255,
    0,
    0
  ],
  rosybrown: [
    188,
    143,
    143
  ],
  royalblue: [
    65,
    105,
    225
  ],
  saddlebrown: [
    139,
    69,
    19
  ],
  salmon: [
    250,
    128,
    114
  ],
  sandybrown: [
    244,
    164,
    96
  ],
  seagreen: [
    46,
    139,
    87
  ],
  seashell: [
    255,
    245,
    238
  ],
  sienna: [
    160,
    82,
    45
  ],
  silver: [
    192,
    192,
    192
  ],
  skyblue: [
    135,
    206,
    235
  ],
  slateblue: [
    106,
    90,
    205
  ],
  slategray: [
    112,
    128,
    144
  ],
  slategrey: [
    112,
    128,
    144
  ],
  snow: [
    255,
    250,
    250
  ],
  springgreen: [
    0,
    255,
    127
  ],
  steelblue: [
    70,
    130,
    180
  ],
  tan: [
    210,
    180,
    140
  ],
  teal: [
    0,
    128,
    128
  ],
  thistle: [
    216,
    191,
    216
  ],
  tomato: [
    255,
    99,
    71
  ],
  turquoise: [
    64,
    224,
    208
  ],
  violet: [
    238,
    130,
    238
  ],
  wheat: [
    245,
    222,
    179
  ],
  white: [
    255,
    255,
    255
  ],
  whitesmoke: [
    245,
    245,
    245
  ],
  yellow: [
    255,
    255,
    0
  ],
  yellowgreen: [
    154,
    205,
    50
  ]
}, hn = RegExp(`^(?:${we})$`), gn = /^currentColor$/i, W = /^(?:specifi|comput)edValue$/, _n = (t2, n2 = {}) => {
  if (!v(t2)) throw TypeError(`${t2} is not a string.`);
  t2 = t2.toLowerCase().trim();
  let { format: r2 = "", nullable: i2 = false } = n2, a2 = at(t2);
  if (!a2 || a2.colorNotation !== "rgb") {
    let e2 = z(r2, i2);
    return e2 === null ? null : (v(e2), e2);
  }
  let [o2, s2, c2] = a2.channels, l2 = a2.alpha, u2 = a2.syntaxFlags instanceof Set && a2.syntaxFlags.has(import_css_color_parser.SyntaxFlag.HasNoneKeywords), d2 = Number.isNaN(o2) ? 0 : Math.min(Math.max(L(o2 * 255, 16), 0), 255), f2 = Number.isNaN(s2) ? 0 : Math.min(Math.max(L(s2 * 255, 16), 0), 255), p2 = Number.isNaN(c2) ? 0 : Math.min(Math.max(L(c2 * 255, 16), 0), 255), m2;
  return m2 = typeof l2 == "number" && !Number.isNaN(l2) ? R(String(l2)) : 0, [
    "rgb",
    d2,
    f2,
    p2,
    r2 === "mixValue" && Number.isNaN(l2) && u2 ? O : m2
  ];
}, vn = (t2, n2 = {}) => {
  if (!v(t2)) throw TypeError(`${t2} is not a string.`);
  t2 = t2.trim();
  let { format: r2 = "", nullable: i2 = false } = n2, a2 = at(t2);
  if (!a2 || a2.colorNotation !== "hsl") {
    let e2 = z(r2, i2);
    return e2 === null ? null : (v(e2), e2);
  }
  let [o2, s2, c2] = a2.channels, l2 = a2.alpha, u2 = a2.syntaxFlags instanceof Set && a2.syntaxFlags.has(import_css_color_parser.SyntaxFlag.HasNoneKeywords), d2 = Number.isNaN(o2) ? 0 : o2, f2 = Number.isNaN(s2) ? 0 : Math.min(Math.max(s2, 0), 100), p2 = Number.isNaN(c2) ? 0 : Math.min(Math.max(c2, 0), 100), m2;
  m2 = typeof l2 == "number" && !Number.isNaN(l2) ? R(String(l2)) : 0;
  let h2 = Number.isNaN(l2) && u2;
  if (r2 === "hsl") return [
    r2,
    Number.isNaN(o2) ? O : d2,
    Number.isNaN(s2) ? O : f2,
    Number.isNaN(c2) ? O : p2,
    h2 ? O : m2
  ];
  d2 = d2 / 360 * 12, p2 /= 100;
  let g2 = f2 / 100 * Math.min(p2, 1 - p2), _2 = d2 % 12, y2 = (8 + d2) % 12, b2 = (4 + d2) % 12, x2 = p2 - g2 * Math.max(-1, Math.min(_2 - 3, 9 - _2, 1)), S2 = p2 - g2 * Math.max(-1, Math.min(y2 - 3, 9 - y2, 1)), C2 = p2 - g2 * Math.max(-1, Math.min(b2 - 3, 9 - b2, 1));
  return [
    "rgb",
    Math.min(Math.max(L(x2 * 255, 16), 0), 255),
    Math.min(Math.max(L(S2 * 255, 16), 0), 255),
    Math.min(Math.max(L(C2 * 255, 16), 0), 255),
    m2
  ];
}, yn = (t2, n2 = {}) => {
  if (!v(t2)) throw TypeError(`${t2} is not a string.`);
  t2 = t2.trim();
  let { format: r2 = "", nullable: i2 = false } = n2, a2 = at(t2);
  if (!a2 || a2.colorNotation !== "hwb") {
    let e2 = z(r2, i2);
    return e2 === null ? null : (v(e2), e2);
  }
  let [o2, s2, c2] = a2.channels, l2 = a2.alpha, u2 = a2.syntaxFlags instanceof Set && a2.syntaxFlags.has(import_css_color_parser.SyntaxFlag.HasNoneKeywords), d2 = Number.isNaN(o2) ? 0 : o2, f2 = Number.isNaN(s2) ? 0 : Math.min(Math.max(s2, 0), 100) / 100, p2 = Number.isNaN(c2) ? 0 : Math.min(Math.max(c2, 0), 100) / 100, m2;
  m2 = typeof l2 == "number" && !Number.isNaN(l2) ? R(String(l2)) : 0;
  let h2 = Number.isNaN(l2) && u2;
  if (r2 === "hwb") return [
    r2,
    Number.isNaN(o2) ? O : d2,
    Number.isNaN(s2) ? O : f2 * 100,
    Number.isNaN(c2) ? O : p2 * 100,
    h2 ? O : m2
  ];
  if (f2 + p2 >= 1) {
    let e2 = L(f2 / (f2 + p2) * 255, 16);
    return [
      "rgb",
      e2,
      e2,
      e2,
      m2
    ];
  }
  let g2 = (1 - f2 - p2) / 255, [, _2, y2, b2] = vn(`hsl(${d2} 100 50)`);
  return _2 = L((_2 * g2 + f2) * 255, 16), y2 = L((y2 * g2 + f2) * 255, 16), b2 = L((b2 * g2 + f2) * 255, 16), [
    "rgb",
    Math.min(Math.max(_2, 0), 255),
    Math.min(Math.max(y2, 0), 255),
    Math.min(Math.max(b2, 0), 255),
    m2
  ];
}, bn = (t2, n2 = {}) => {
  if (!v(t2)) throw TypeError(`${t2} is not a string.`);
  t2 = t2.trim();
  let { format: r2 = "", nullable: i2 = false } = n2, a2 = at(t2);
  if (!a2 || a2.colorNotation !== "lab") {
    let e2 = z(r2, i2);
    return e2 === null ? null : (v(e2), e2);
  }
  let [o2, s2, c2] = a2.channels, l2 = a2.alpha, u2 = a2.syntaxFlags instanceof Set && a2.syntaxFlags.has(import_css_color_parser.SyntaxFlag.HasNoneKeywords), d2 = Number.isNaN(o2) ? 0 : Math.max(o2, 0), f2 = Number.isNaN(s2) ? 0 : s2, p2 = Number.isNaN(c2) ? 0 : c2, m2;
  m2 = typeof l2 == "number" && !Number.isNaN(l2) ? R(String(l2)) : 0;
  let h2 = Number.isNaN(l2) && u2;
  if (W.test(r2)) return [
    "lab",
    Number.isNaN(o2) ? O : L(d2, 16),
    Number.isNaN(s2) ? O : L(f2, 16),
    Number.isNaN(c2) ? O : L(p2, 16),
    h2 ? O : m2
  ];
  let g2 = (d2 + 16) / 116, _2 = f2 / 500 + g2, y2 = g2 - p2 / 200, b2 = g2 ** 3, x2 = _2 ** 3, S2 = y2 ** 3, [C2, w2, T2] = [
    x2 > 0.008856451679035631 ? x2 : (_2 * 116 - 16) / Ae,
    d2 > 8 ? b2 : d2 / Ae,
    S2 > 0.008856451679035631 ? S2 : (y2 * 116 - 16) / Ae
  ].map((e2, t3) => e2 * ct[t3]);
  return [
    "xyz-d50",
    L(C2, 16),
    L(w2, 16),
    L(T2, 16),
    m2
  ];
}, xn = (t2, n2 = {}) => {
  if (!v(t2)) throw TypeError(`${t2} is not a string.`);
  t2 = t2.trim();
  let { format: r2 = "", nullable: i2 = false } = n2, a2 = at(t2);
  if (!a2 || a2.colorNotation !== "lch") {
    let e2 = z(r2, i2);
    return e2 === null ? null : (v(e2), e2);
  }
  let [o2, s2, c2] = a2.channels, l2 = a2.alpha, u2 = a2.syntaxFlags instanceof Set && a2.syntaxFlags.has(import_css_color_parser.SyntaxFlag.HasNoneKeywords), d2 = Number.isNaN(o2) ? 0 : Math.max(o2, 0), f2 = Number.isNaN(s2) ? 0 : Math.max(s2, 0), p2 = Number.isNaN(c2) ? 0 : c2, m2;
  m2 = typeof l2 == "number" && !Number.isNaN(l2) ? R(String(l2)) : 0;
  let h2 = Number.isNaN(l2) && u2;
  if (W.test(r2)) return [
    "lch",
    Number.isNaN(o2) ? O : L(d2, 16),
    Number.isNaN(s2) ? O : L(f2, 16),
    Number.isNaN(c2) ? O : L(p2, 16),
    h2 ? O : m2
  ];
  let [, g2, _2, y2] = bn(`lab(${d2} ${f2 * Math.cos(p2 * Math.PI / 180)} ${f2 * Math.sin(p2 * Math.PI / 180)})`);
  return [
    "xyz-d50",
    L(g2, 16),
    L(_2, 16),
    L(y2, 16),
    m2
  ];
}, Sn = (t2, n2 = {}) => {
  if (!v(t2)) throw TypeError(`${t2} is not a string.`);
  t2 = t2.trim();
  let { format: r2 = "", nullable: i2 = false } = n2, a2 = at(t2);
  if (!a2 || a2.colorNotation !== "oklab") {
    let e2 = z(r2, i2);
    return e2 === null ? null : (v(e2), e2);
  }
  let [o2, s2, c2] = a2.channels, l2 = a2.alpha, u2 = a2.syntaxFlags instanceof Set && a2.syntaxFlags.has(import_css_color_parser.SyntaxFlag.HasNoneKeywords), d2 = Number.isNaN(o2) ? 0 : Math.max(o2, 0), f2 = Number.isNaN(s2) ? 0 : s2, p2 = Number.isNaN(c2) ? 0 : c2, m2;
  m2 = typeof l2 == "number" && !Number.isNaN(l2) ? R(String(l2)) : 0;
  let h2 = Number.isNaN(l2) && u2;
  if (W.test(r2)) return [
    "oklab",
    Number.isNaN(o2) ? O : L(d2, 16),
    Number.isNaN(s2) ? O : L(f2, 16),
    Number.isNaN(c2) ? O : L(p2, 16),
    h2 ? O : m2
  ];
  let [g2, _2, y2] = H(pt, H(mt, [
    d2,
    f2,
    p2
  ]).map((e2) => e2 ** 3), true);
  return [
    "xyz-d65",
    L(g2, 16),
    L(_2, 16),
    L(y2, 16),
    m2
  ];
}, Cn = (t2, n2 = {}) => {
  if (!v(t2)) throw TypeError(`${t2} is not a string.`);
  t2 = t2.trim();
  let { format: r2 = "", nullable: i2 = false } = n2, a2 = at(t2);
  if (!a2 || a2.colorNotation !== "oklch") {
    let e2 = z(r2, i2);
    return e2 === null ? null : (v(e2), e2);
  }
  let [o2, s2, c2] = a2.channels, l2 = a2.alpha, u2 = a2.syntaxFlags instanceof Set && a2.syntaxFlags.has(import_css_color_parser.SyntaxFlag.HasNoneKeywords), d2 = Number.isNaN(o2) ? 0 : Math.max(o2, 0), f2 = Number.isNaN(s2) ? 0 : Math.max(s2, 0), p2 = Number.isNaN(c2) ? 0 : c2, m2;
  m2 = typeof l2 == "number" && !Number.isNaN(l2) ? R(String(l2)) : 0;
  let h2 = Number.isNaN(l2) && u2;
  if (W.test(r2)) return [
    "oklch",
    Number.isNaN(o2) ? O : L(d2, 16),
    Number.isNaN(s2) ? O : L(f2, 16),
    Number.isNaN(c2) ? O : L(p2, 16),
    h2 ? O : m2
  ];
  let [g2, _2, y2] = H(pt, H(mt, [
    d2,
    f2 * Math.cos(p2 * Math.PI / 180),
    f2 * Math.sin(p2 * Math.PI / 180)
  ]).map((e2) => e2 ** 3), true);
  return [
    "xyz-d65",
    L(g2, 16),
    L(_2, 16),
    L(y2, 16),
    m2
  ];
}, G = (t2, n2 = {}) => {
  if (!v(t2)) throw TypeError(`${t2} is not a string.`);
  t2 = t2.trim();
  let { colorSpace: r2 = "", d50: i2 = false, format: a2 = "", nullable: o2 = false } = n2, s2 = at(t2);
  if (!s2) {
    let e2 = z(a2, o2);
    return e2 === null ? null : (v(e2), e2);
  }
  let c2 = s2.colorNotation, [l2, u2, d2] = s2.channels, f2 = s2.alpha, p2 = s2.syntaxFlags instanceof Set && s2.syntaxFlags.has(import_css_color_parser.SyntaxFlag.HasNoneKeywords), m2 = Number.isNaN(l2) ? 0 : l2, h2 = Number.isNaN(u2) ? 0 : u2, g2 = Number.isNaN(d2) ? 0 : d2, _2;
  _2 = typeof f2 == "number" && !Number.isNaN(f2) ? R(String(f2)) : 0;
  let y2 = Number.isNaN(f2) && p2;
  if (W.test(a2) || a2 === "mixValue" && c2 === r2) return [
    c2,
    Number.isNaN(l2) ? O : L(m2, 16),
    Number.isNaN(u2) ? O : L(h2, 16),
    Number.isNaN(d2) ? O : L(g2, 16),
    y2 ? O : _2
  ];
  let b2 = 0, x2 = 0, S2 = 0;
  if (c2 === "srgb-linear") [b2, x2, S2] = H(ut, [
    m2,
    h2,
    g2
  ]), i2 && ([b2, x2, S2] = H(B, [
    b2,
    x2,
    S2
  ], true));
  else if (c2 === "display-p3") {
    let e2 = xt([
      m2 * 255,
      h2 * 255,
      g2 * 255
    ]);
    [b2, x2, S2] = H(gt, e2), i2 && ([b2, x2, S2] = H(B, [
      b2,
      x2,
      S2
    ], true));
  } else if (c2 === "rec2020") {
    let e2 = 1.09929682680944, t3 = 0.45, n3 = [
      m2,
      h2,
      g2
    ].map((n4) => {
      let r3;
      return r3 = n4 < 0.018053968510807 * t3 * 10 ? n4 / (t3 * 10) : ((n4 + e2 - 1) / e2) ** (1 / t3), r3;
    });
    [b2, x2, S2] = H(_t, n3), i2 && ([b2, x2, S2] = H(B, [
      b2,
      x2,
      S2
    ], true));
  } else if (c2 === "a98-rgb") {
    let e2 = [
      m2,
      h2,
      g2
    ].map((e3) => e3 ** 2.19921875);
    [b2, x2, S2] = H(vt, e2), i2 && ([b2, x2, S2] = H(B, [
      b2,
      x2,
      S2
    ], true));
  } else if (c2 === "prophoto-rgb") {
    let e2 = [
      m2,
      h2,
      g2
    ].map((e3) => {
      let t3;
      return t3 = e3 > 1 / 32 ? e3 ** 1.8 : e3 / 16, t3;
    });
    [b2, x2, S2] = H(yt, e2), i2 || ([b2, x2, S2] = H(lt, [
      b2,
      x2,
      S2
    ], true));
  } else /^xyz(?:-d(?:50|65))?$/.test(c2) ? ([b2, x2, S2] = [
    m2,
    h2,
    g2
  ], c2 === "xyz-d50" ? i2 || ([b2, x2, S2] = H(lt, [
    b2,
    x2,
    S2
  ])) : i2 && ([b2, x2, S2] = H(B, [
    b2,
    x2,
    S2
  ], true))) : ([b2, x2, S2] = St([
    m2 * 255,
    h2 * 255,
    g2 * 255
  ]), i2 && ([b2, x2, S2] = H(B, [
    b2,
    x2,
    S2
  ], true)));
  return [
    i2 ? "xyz-d50" : "xyz-d65",
    L(b2, 16),
    L(x2, 16),
    L(S2, 16),
    a2 === "mixValue" && y2 ? O : _2
  ];
}, K = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.toLowerCase().trim();
  let { d50: n2 = false, format: r2 = "", nullable: i2 = false } = t2;
  if (!hn.test(e2)) {
    let e3 = z(r2, i2);
    return e3 === null ? null : (v(e3), e3);
  }
  let a2 = 0, o2 = 0, s2 = 0, c2 = 0;
  if (gn.test(e2)) {
    if (r2 === "computedValue") return [
      "rgb",
      0,
      0,
      0,
      0
    ];
    if (r2 === "specifiedValue") return e2;
  } else if (/^[a-z]+$/.test(e2)) {
    if (Object.hasOwn(mn, e2)) {
      if (r2 === "specifiedValue") return e2;
      let [t3, i3, l2] = mn[e2];
      if (c2 = 1, r2 === "computedValue") return [
        "rgb",
        t3,
        i3,
        l2,
        c2
      ];
      [a2, o2, s2] = St([
        t3,
        i3,
        l2
      ], true), n2 && ([a2, o2, s2] = H(B, [
        a2,
        o2,
        s2
      ], true));
    } else switch (r2) {
      case N:
        return i2 && e2 !== "transparent" ? null : [
          "rgb",
          0,
          0,
          0,
          0
        ];
      case Oe:
        return e2 === "transparent" ? e2 : "";
      case P:
        return e2 === "transparent" ? [
          "rgb",
          0,
          0,
          0,
          0
        ] : null;
    }
  } else if (e2[0] === "#") {
    if (W.test(r2)) return ["rgb", ...Nt(e2)];
    [a2, o2, s2, c2] = Ft(e2), n2 && ([a2, o2, s2] = H(B, [
      a2,
      o2,
      s2
    ], true));
  } else if (e2.startsWith("lab")) {
    if (W.test(r2)) return bn(e2, t2);
    [, a2, o2, s2, c2] = bn(e2), n2 || ([a2, o2, s2] = H(lt, [
      a2,
      o2,
      s2
    ], true));
  } else if (e2.startsWith("lch")) {
    if (W.test(r2)) return xn(e2, t2);
    [, a2, o2, s2, c2] = xn(e2), n2 || ([a2, o2, s2] = H(lt, [
      a2,
      o2,
      s2
    ], true));
  } else if (e2.startsWith("oklab")) {
    if (W.test(r2)) return Sn(e2, t2);
    [, a2, o2, s2, c2] = Sn(e2), n2 && ([a2, o2, s2] = H(B, [
      a2,
      o2,
      s2
    ], true));
  } else if (e2.startsWith("oklch")) {
    if (W.test(r2)) return Cn(e2, t2);
    [, a2, o2, s2, c2] = Cn(e2), n2 && ([a2, o2, s2] = H(B, [
      a2,
      o2,
      s2
    ], true));
  } else {
    let i3, l2, u2;
    if (e2.startsWith("hsl") ? [, i3, l2, u2, c2] = vn(e2) : e2.startsWith("hwb") ? [, i3, l2, u2, c2] = yn(e2) : [, i3, l2, u2, c2] = _n(e2, t2), W.test(r2)) return [
      "rgb",
      Math.round(i3),
      Math.round(l2),
      Math.round(u2),
      c2
    ];
    [a2, o2, s2] = St([
      i3,
      l2,
      u2
    ]), n2 && ([a2, o2, s2] = H(B, [
      a2,
      o2,
      s2
    ], true));
  }
  return [
    n2 ? "xyz-d50" : "xyz-d65",
    L(a2, 16),
    L(o2, 16),
    L(s2, 16),
    c2
  ];
}, wn = RegExp(`^color\\(\\s*(${_e})\\s*\\)$`), Tn = RegExp(`^hsla?\\(\\s*(${be}|${xe})\\s*\\)$`), En = RegExp(`^hwb\\(\\s*(${be})\\s*\\)$`), Dn = RegExp(`^lab\\(\\s*(${Ce})\\s*\\)$`), On = RegExp(`^lch\\(\\s*(${Se})\\s*\\)$`), kn = RegExp(`^oklab\\(\\s*(${Ce})\\s*\\)$`), An = RegExp(`^oklch\\(\\s*(${Se})\\s*\\)$`), jn = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { colorSpace: n2 = "", format: r2 = "" } = t2, i2 = "", a2, o2, s2, c2, l2, u2, d2;
  if (r2 === "mixValue") {
    let r3;
    if (r3 = e2.startsWith("color(") ? G(e2, t2) : K(e2, t2), r3 === null) return null;
    if ([i2, l2, u2, d2, c2] = r3, i2 === n2) return [
      l2,
      u2,
      d2,
      c2
    ];
    [a2, o2, s2] = H(dt, [
      l2,
      u2,
      d2
    ], true);
  } else if (e2.startsWith("color(")) {
    let [, t3] = e2.match(wn), [n3] = t3.match(/[^\s,/]+/g);
    n3 === "srgb-linear" ? [, a2, o2, s2, c2] = J(e2, { format: N }) : ([, l2, u2, d2, c2] = G(e2), [a2, o2, s2] = H(dt, [
      l2,
      u2,
      d2
    ], true));
  } else [, l2, u2, d2, c2] = K(e2), [a2, o2, s2] = H(dt, [
    l2,
    u2,
    d2
  ], true);
  return [
    Math.min(Math.max(a2, 0), 1),
    Math.min(Math.max(o2, 0), 1),
    Math.min(Math.max(s2, 0), 1),
    c2
  ];
}, Mn = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { format: n2 = "" } = t2, r2, i2, a2, o2;
  if (n2 === "mixValue") {
    let n3;
    if (n3 = e2.startsWith("color(") ? J(e2, t2) : Zr(e2, t2), n3 === null) return null;
    [, r2, i2, a2, o2] = n3;
  } else if (e2.startsWith("color(")) {
    let [, t3] = e2.match(wn), [n3] = t3.match(/[^\s,/]+/g);
    n3 === "srgb" ? ([, r2, i2, a2, o2] = J(e2, { format: N }), r2 *= 255, i2 *= 255, a2 *= 255) : [, r2, i2, a2, o2] = J(e2);
  } else /^(?:ok)?l(?:ab|ch)/.test(e2) ? ([r2, i2, a2, o2] = jn(e2), [r2, i2, a2] = Ct([
    r2,
    i2,
    a2
  ])) : [, r2, i2, a2, o2] = Zr(e2, { format: N });
  return [
    r2,
    i2,
    a2,
    o2
  ];
}, Nn = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { d50: n2 = false, format: r2 = "" } = t2, i2, a2, o2, s2;
  if (r2 === "mixValue") {
    let n3;
    if (n3 = e2.startsWith("color(") ? G(e2, t2) : K(e2, t2), n3 === null) return null;
    [, i2, a2, o2, s2] = n3;
  } else if (e2.startsWith("color(")) {
    let [, r3] = e2.match(wn), [c2] = r3.match(/[^\s,/]+/g);
    n2 ? c2 === "xyz-d50" ? [, i2, a2, o2, s2] = J(e2, { format: N }) : [, i2, a2, o2, s2] = G(e2, t2) : /^xyz(?:-d65)?$/.test(c2) ? [, i2, a2, o2, s2] = J(e2, { format: N }) : [, i2, a2, o2, s2] = G(e2);
  } else [, i2, a2, o2, s2] = K(e2, t2);
  return [
    i2,
    a2,
    o2,
    s2
  ];
}, Pn = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { format: n2 = "" } = t2, r2, i2, a2, o2;
  if (Tn.test(e2)) return [, r2, i2, a2, o2] = vn(e2, { format: "hsl" }), n2 === "hsl" ? [
    Math.round(r2),
    Math.round(i2),
    Math.round(a2),
    o2
  ] : [
    r2,
    i2,
    a2,
    o2
  ];
  let s2, c2, l2;
  if (n2 === "mixValue") {
    let n3;
    if (n3 = e2.startsWith("color(") ? G(e2, t2) : K(e2, t2), n3 === null) return null;
    [, s2, c2, l2, o2] = n3;
  } else e2.startsWith("color(") ? [, s2, c2, l2, o2] = G(e2) : [, s2, c2, l2, o2] = K(e2);
  return [r2, i2, a2] = Tt([
    s2,
    c2,
    l2
  ], true), n2 === "hsl" ? [
    Math.round(r2),
    Math.round(i2),
    Math.round(a2),
    o2
  ] : [
    n2 === "mixValue" && i2 === 0 ? O : r2,
    i2,
    a2,
    o2
  ];
}, Fn = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { format: n2 = "" } = t2, r2, i2, a2, o2;
  if (En.test(e2)) return [, r2, i2, a2, o2] = yn(e2, { format: "hwb" }), n2 === "hwb" ? [
    Math.round(r2),
    Math.round(i2),
    Math.round(a2),
    o2
  ] : [
    r2,
    i2,
    a2,
    o2
  ];
  let s2, c2, l2;
  if (n2 === "mixValue") {
    let n3;
    if (n3 = e2.startsWith("color(") ? G(e2, t2) : K(e2, t2), n3 === null) return null;
    [, s2, c2, l2, o2] = n3;
  } else e2.startsWith("color(") ? [, s2, c2, l2, o2] = G(e2) : [, s2, c2, l2, o2] = K(e2);
  return [r2, i2, a2] = Et([
    s2,
    c2,
    l2
  ], true), n2 === "hwb" ? [
    Math.round(r2),
    Math.round(i2),
    Math.round(a2),
    o2
  ] : [
    n2 === "mixValue" && i2 + a2 >= 100 ? O : r2,
    i2,
    a2,
    o2
  ];
}, In = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { format: n2 = "" } = t2, r2, i2, a2, o2;
  if (Dn.test(e2)) return [, r2, i2, a2, o2] = bn(e2, { format: N }), [
    r2,
    i2,
    a2,
    o2
  ];
  let s2, c2, l2;
  if (n2 === "mixValue") {
    let n3, r3 = {
      ...t2,
      d50: true
    };
    if (n3 = e2.startsWith("color(") ? G(e2, r3) : K(e2, r3), n3 === null) return null;
    [, s2, c2, l2, o2] = n3;
  } else e2.startsWith("color(") ? [, s2, c2, l2, o2] = G(e2, { d50: true }) : [, s2, c2, l2, o2] = K(e2, { d50: true });
  return [r2, i2, a2] = At([
    s2,
    c2,
    l2
  ], true), [
    r2,
    i2,
    a2,
    o2
  ];
}, Ln = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { format: n2 = "" } = t2, r2, i2, a2, o2;
  if (On.test(e2)) return [, r2, i2, a2, o2] = xn(e2, { format: N }), [
    r2,
    i2,
    a2,
    o2
  ];
  let s2, c2, l2;
  if (n2 === "mixValue") {
    let n3, r3 = {
      ...t2,
      d50: true
    };
    if (n3 = e2.startsWith("color(") ? G(e2, r3) : K(e2, r3), n3 === null) return null;
    [, s2, c2, l2, o2] = n3;
  } else e2.startsWith("color(") ? [, s2, c2, l2, o2] = G(e2, { d50: true }) : [, s2, c2, l2, o2] = K(e2, { d50: true });
  return [r2, i2, a2] = jt([
    s2,
    c2,
    l2
  ], true), [
    r2,
    i2,
    n2 === "mixValue" && i2 === 0 ? O : a2,
    o2
  ];
}, Rn = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { format: n2 = "" } = t2, r2, i2, a2, o2;
  if (kn.test(e2)) return [, r2, i2, a2, o2] = Sn(e2, { format: N }), [
    r2,
    i2,
    a2,
    o2
  ];
  let s2, c2, l2;
  if (n2 === "mixValue") {
    let n3;
    if (n3 = e2.startsWith("color(") ? G(e2, t2) : K(e2, t2), n3 === null) return null;
    [, s2, c2, l2, o2] = n3;
  } else e2.startsWith("color(") ? [, s2, c2, l2, o2] = G(e2) : [, s2, c2, l2, o2] = K(e2);
  return [r2, i2, a2] = Dt([
    s2,
    c2,
    l2
  ], true), [
    r2,
    i2,
    a2,
    o2
  ];
}, zn = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { format: n2 = "" } = t2, r2, i2, a2, o2;
  if (An.test(e2)) return [, r2, i2, a2, o2] = Cn(e2, { format: N }), [
    r2,
    i2,
    a2,
    o2
  ];
  let s2, c2, l2;
  if (n2 === "mixValue") {
    let n3;
    if (n3 = e2.startsWith("color(") ? G(e2, t2) : K(e2, t2), n3 === null) return null;
    [, s2, c2, l2, o2] = n3;
  } else e2.startsWith("color(") ? [, s2, c2, l2, o2] = G(e2) : [, s2, c2, l2, o2] = K(e2);
  return [r2, i2, a2] = Ot([
    s2,
    c2,
    l2
  ], true), [
    r2,
    i2,
    n2 === "mixValue" && i2 === 0 ? O : a2,
    o2
  ];
}, Bn = "color-mix", Vn = (e2, t2, n2, r2, i2, a2, o2 = false) => {
  let s2 = Math.max(0, Math.min(1, n2)), c2 = Math.max(0, Math.min(1, r2)), l2 = s2 * i2, u2 = c2 * a2, d2 = l2 + u2, f2;
  return f2 = d2 === 0 ? o2 ? [
    0,
    0,
    0
  ] : [
    e2[0] * i2 + t2[0] * a2,
    e2[1] * i2 + t2[1] * a2,
    e2[2] * i2 + t2[2] * a2
  ] : [
    (e2[0] * l2 + t2[0] * u2) / d2,
    (e2[1] * l2 + t2[1] * u2) / d2,
    (e2[2] * l2 + t2[2] * u2) / d2
  ], {
    comps: f2,
    alpha: Math.max(0, Math.min(1, d2))
  };
}, Hn = (e2, t2, n2, r2, i2, a2, o2) => {
  let [s2, c2, l2, u2] = n2, [d2, f2, p2] = t2;
  if (a2 === "computedValue") return [
    e2,
    s2 ? O : L(d2, 16),
    c2 ? O : L(f2, 16),
    l2 ? O : L(p2, 16),
    u2 ? O : r2 * i2
  ];
  let [m2, h2, g2] = o2 ?? t2;
  return [
    "rgb",
    Math.round(m2),
    Math.round(h2),
    Math.round(g2),
    parseFloat((r2 * i2).toFixed(3))
  ];
}, q = (e2, t2, n2) => Array.isArray(e2) ? e2 : /^currentcolor$/i.test(e2) ? [
  O,
  O,
  O,
  O
] : t2(e2, n2), Un = (e2, t2, n2, r2, i2, a2, o2) => {
  let s2 = e2 === "srgb" ? Mn : jn, c2 = q(t2, s2, {
    colorSpace: e2,
    format: P
  }), l2 = q(n2, s2, {
    colorSpace: e2,
    format: P
  });
  if (!c2 || !l2) return null;
  let [u2, d2, f2, p2] = c2, [m2, h2, g2, _2] = l2, v2 = [
    u2 === "none" && m2 === "none",
    d2 === "none" && h2 === "none",
    f2 === "none" && g2 === "none",
    p2 === "none" && _2 === "none"
  ], [[y2, b2, x2, S2], [C2, w2, T2, E2]] = bt(c2, l2, true), { comps: D2, alpha: O2 } = Vn([
    y2,
    b2,
    x2
  ], [
    C2,
    w2,
    T2
  ], S2, E2, r2, i2, true);
  return Hn(e2, D2, v2, O2, o2, a2, [
    D2[0] * 255,
    D2[1] * 255,
    D2[2] * 255
  ]);
}, Wn = (e2, t2, n2, r2, i2, a2, o2) => {
  let s2 = e2 === "xyz-d50", c2 = {
    colorSpace: e2,
    d50: s2,
    format: P
  }, l2 = q(t2, Nn, c2), u2 = q(n2, Nn, c2);
  if (!l2 || !u2) return null;
  let [d2, f2, p2, m2] = l2, [h2, g2, _2, v2] = u2, y2 = [
    d2 === "none" && h2 === "none",
    f2 === "none" && g2 === "none",
    p2 === "none" && _2 === "none",
    m2 === "none" && v2 === "none"
  ], [[b2, x2, S2, C2], [w2, T2, E2, D2]] = bt(l2, u2, true), { comps: O2, alpha: k2 } = Vn([
    b2,
    x2,
    S2
  ], [
    w2,
    T2,
    E2
  ], C2, D2, r2, i2, true);
  return Hn(e2, O2, y2, k2, o2, a2, s2 ? kt(O2, true) : wt(O2, true));
}, Gn = (e2, t2, n2, r2, i2, a2, o2, s2) => {
  let c2 = e2 === "hsl" ? Pn : Fn, l2 = {
    colorSpace: e2,
    format: P
  }, u2 = q(n2, c2, l2), d2 = q(r2, c2, l2);
  if (!u2 || !d2) return null;
  let [f2, p2, m2, h2] = u2, [g2, _2, v2, y2] = d2, b2 = [
    f2 === "none" && g2 === "none",
    p2 === "none" && _2 === "none",
    m2 === "none" && v2 === "none",
    h2 === "none" && y2 === "none"
  ], [[x2, S2, C2, w2], [T2, E2, D2, O2]] = bt(u2, d2, true);
  [x2, T2] = tt(x2, T2, t2);
  let k2 = w2 * i2, A2 = O2 * a2, j2 = k2 + A2, ee2 = (x2 * i2 + T2 * a2) % 360, te2, M2;
  j2 === 0 ? (te2 = S2 * i2 + E2 * a2, M2 = C2 * i2 + D2 * a2) : (te2 = (S2 * k2 + E2 * A2) / j2, M2 = (C2 * k2 + D2 * A2) / j2);
  let [ne2, re2, ie2] = Mn(`${e2}(${ee2} ${te2} ${M2})`), ae2 = [
    ne2 / 255,
    re2 / 255,
    ie2 / 255
  ];
  return Hn(o2 === "computedValue" ? "srgb" : e2, ae2, b2, j2, s2, o2, [
    ne2,
    re2,
    ie2
  ]);
}, Kn = (e2, t2, n2, r2, i2, a2, o2, s2) => {
  let c2 = e2 === "lch" ? Ln : zn, l2 = {
    colorSpace: e2,
    format: P
  }, u2 = q(n2, c2, l2), d2 = q(r2, c2, l2);
  if (!u2 || !d2) return null;
  let [f2, p2, m2, h2] = u2, [g2, _2, v2, y2] = d2, b2 = [
    f2 === "none" && g2 === "none",
    p2 === "none" && _2 === "none",
    m2 === "none" && v2 === "none",
    h2 === "none" && y2 === "none"
  ], [[x2, S2, C2, w2], [T2, E2, D2, O2]] = bt(u2, d2, true);
  [C2, D2] = tt(C2, D2, t2);
  let k2 = w2 * i2, A2 = O2 * a2, j2 = k2 + A2, ee2 = (C2 * i2 + D2 * a2) % 360, te2, M2;
  j2 === 0 ? (te2 = x2 * i2 + T2 * a2, M2 = S2 * i2 + E2 * a2) : (te2 = (x2 * k2 + T2 * A2) / j2, M2 = (S2 * k2 + E2 * A2) / j2);
  let ne2;
  if (o2 !== "computedValue") {
    let [, t3, n3, r3] = Zr(`${e2}(${te2} ${M2} ${ee2})`);
    ne2 = [
      t3,
      n3,
      r3
    ];
  }
  return Hn(e2, [
    te2,
    M2,
    ee2
  ], b2, j2, s2, o2, ne2);
}, qn = (e2, t2, n2, r2, i2, a2, o2) => {
  let s2 = e2 === "lab" ? In : Rn, c2 = {
    colorSpace: e2,
    format: P
  }, l2 = q(t2, s2, c2), u2 = q(n2, s2, c2);
  if (!l2 || !u2) return null;
  let [d2, f2, p2, m2] = l2, [h2, g2, _2, v2] = u2, y2 = [
    d2 === "none" && h2 === "none",
    f2 === "none" && g2 === "none",
    p2 === "none" && _2 === "none",
    m2 === "none" && v2 === "none"
  ], [[b2, x2, S2, C2], [w2, T2, E2, D2]] = bt(l2, u2, true), { comps: O2, alpha: k2 } = Vn([
    b2,
    x2,
    S2
  ], [
    w2,
    T2,
    E2
  ], C2, D2, r2, i2), A2;
  if (a2 !== "computedValue") {
    let [, t3, n3, r3] = Zr(`${e2}(${O2[0]} ${O2[1]} ${O2[2]})`);
    A2 = [
      t3,
      n3,
      r3
    ];
  }
  return Hn(e2, O2, y2, k2, o2, a2, A2);
}, Jn = (e2, t2, n2, r2, i2, a2, o2, s2) => {
  let c2 = null;
  return /^srgb(?:-linear)?$/.test(e2) ? c2 = Un(e2, n2, r2, i2, a2, s2, o2) : /^xyz(?:-d65|-d50)?$/.test(e2) ? c2 = Wn(e2, n2, r2, i2, a2, s2, o2) : /^h(?:sl|wb)$/.test(e2) ? c2 = Gn(e2, t2, n2, r2, i2, a2, s2, o2) : /^(?:ok)?lch$/.test(e2) ? c2 = Kn(e2, t2, n2, r2, i2, a2, s2, o2) : /^(?:ok)?lab$/.test(e2) && (c2 = qn(e2, n2, r2, i2, a2, s2, o2)), c2;
}, Yn = (e2) => {
  if (!v(e2)) return false;
  let t2 = e2.toLowerCase().trim();
  return t2.endsWith("%") || t2.startsWith("calc(") || t2.startsWith("var(");
}, Xn = (e2) => {
  let t2 = I(e2).filter(Boolean), n2 = "", r2 = "";
  return t2.length === 1 ? n2 = t2[0] : Yn(t2.at(-1)) ? (r2 = t2.pop(), n2 = t2.join(" ")) : (Yn(t2[0]) && (r2 = t2.shift()), n2 = t2.join(" ")), {
    color: n2,
    pct: r2
  };
}, Zn = (e2) => {
  let t2 = [], n2 = 0, r2 = false;
  for (let i2 of e2) {
    let e3 = Xn(i2), { color: a2, pct: o2 } = e3;
    if (!a2) return null;
    a2.toLowerCase().startsWith("var(") && (r2 = true, n2 = NaN);
    let s2 = o2.toLowerCase();
    if (s2.startsWith("calc(") || s2.startsWith("var(")) r2 = true, n2 = NaN;
    else if (o2.endsWith("%")) {
      let e4 = parseFloat(o2);
      if (e4 < 0) return null;
      r2 || (n2 += e4);
    }
    t2.push(e3);
  }
  return {
    colors: t2,
    totalPercentage: n2
  };
}, Qn = (e2) => {
  let t2 = I(e2).filter(Boolean);
  if (t2[0] !== "in" || t2.length < 2) return null;
  let n2 = t2.indexOf("hue");
  return t2.length > 2 && n2 > -1 ? {
    colorSpace: t2[1],
    hueArc: t2.slice(2, n2).join(" ")
  } : {
    colorSpace: t2.slice(1).join(" "),
    hueArc: ""
  };
}, $n = (e2) => {
  if (!v(e2)) return null;
  e2 = e2.trim();
  let t2 = e2.toLowerCase();
  if (!t2.startsWith("color-mix(") || !t2.endsWith(")")) return null;
  let n2 = e2.slice(10, -1).trim();
  if (!n2) return null;
  let [r2, ...i2] = I(n2, { delimiter: "," }).map((e3) => e3.trim()), a2 = [], o2 = 0, s2 = Qn(r2);
  if (s2) {
    let { colorSpace: e3, hueArc: t3 } = s2, n3 = Zn(i2);
    return !n3 || (a2.push(...n3.colors), o2 += n3.totalPercentage, !a2.length) ? null : {
      colors: a2,
      colorSpace: e3,
      hueArc: t3,
      totalPercentage: o2
    };
  }
  let c2 = Zn([r2]);
  if (!c2) return null;
  a2.push(...c2.colors), o2 += c2.totalPercentage;
  let l2 = Zn(i2);
  return l2 ? (a2.push(...l2.colors), o2 += l2.totalPercentage, {
    colors: a2,
    colorSpace: null,
    hueArc: "",
    totalPercentage: o2
  }) : null;
}, er = (e2, t2, n2) => {
  let r2 = e2, i2 = r2.toLowerCase();
  for (; v(i2) && (i2.startsWith("color-mix(") || i2.startsWith("var(") || i2.startsWith("light-dark(")); ) {
    let e3 = n2(r2, {
      ...t2,
      format: t2.format === "specifiedValue" ? t2.format : N
    });
    if (!e3) break;
    if (Array.isArray(e3)) {
      let [t3, n3, i3, a2, o2] = e3, s2 = o2 === 1 || o2 === void 0 ? "" : ` / ${o2}`, c2 = o2 === 1 || o2 === void 0 ? "" : `, ${o2}`;
      r2 = /^rgb$/.test(t3) ? o2 === 1 || o2 === void 0 ? `rgb(${n3}, ${i3}, ${a2})` : `rgba(${n3}, ${i3}, ${a2}${c2})` : /^(?:hsl|hwb|lab|lch|oklab|oklch)$/.test(t3) ? `${t3}(${n3} ${i3} ${a2}${s2})` : `color(${t3} ${n3} ${i3} ${a2}${s2})`;
      break;
    }
    if (typeof e3 == "string") {
      if (e3 === r2) break;
      r2 = e3, i2 = r2.toLowerCase();
    } else break;
  }
  return r2;
}, tr = (e2, t2, n2) => {
  let r2 = e2.length;
  if (r2 === 0) return null;
  let i2 = [], a2 = 0, o2 = 0;
  for (let s3 = 0; s3 < r2; s3++) {
    let r3 = e2[s3];
    r3.color = er(r3.color, t2, n2);
    let c3 = r3.pct.trim();
    if (c3 === "") i2.push(null), o2++;
    else {
      let e3 = parseFloat(c3);
      if (Number.isNaN(e3) || e3 < 0 || e3 > 100) return null;
      i2.push(e3), a2 += e3;
    }
  }
  let s2 = Array(r2), c2 = 1;
  if (o2 === r2) {
    let e3 = 100 / r2;
    for (let t3 = 0; t3 < r2; t3++) s2[t3] = e3;
    a2 = 100;
  } else if (o2 > 0) {
    let e3 = 100 - a2, t3 = e3 > 0 ? e3 / o2 : 0;
    for (let e4 = 0; e4 < r2; e4++) i2[e4] === null ? s2[e4] = t3 : s2[e4] = i2[e4];
    a2 = Math.max(100, a2);
  } else for (let e3 = 0; e3 < r2; e3++) s2[e3] = i2[e3];
  if (a2 === 0) {
    let e3 = 100 / r2;
    for (let t3 = 0; t3 < r2; t3++) s2[t3] = e3;
    c2 = 0;
  } else {
    let e3 = a2 / 100;
    if (a2 > 100) {
      for (let t3 = 0; t3 < r2; t3++) s2[t3] = s2[t3] / e3;
      c2 = 1;
    } else if (a2 < 100) {
      for (let t3 = 0; t3 < r2; t3++) s2[t3] = s2[t3] / e3;
      c2 = e3;
    }
  }
  return {
    colors: e2.map((e3, t3) => ({
      color: e3.color,
      ratio: s2[t3] / 100
    })),
    m: c2
  };
}, nr = (e2, t2, n2, r2) => {
  let i2 = e2.length, a2 = [];
  for (let o2 = 0; o2 < i2; o2++) {
    let i3 = e2[o2], { color: s2, pct: c2 } = i3;
    i3.color = er(s2, n2, r2), c2 === "" && (t2 > 100 ? i3.pct = "0%" : t2 > 0 && a2.push(o2));
  }
  if (a2.length) {
    let n3 = L((100 - t2) / a2.length, 16);
    for (let t3 of a2) {
      let r3 = e2[t3];
      r3.pct = `${n3}%`;
    }
    t2 += n3 * a2.length;
  }
  return {
    colors: e2,
    totalPercentage: t2
  };
}, rr = (e2, t2) => {
  if (!v(e2)) return "";
  let n2 = e2.toLowerCase();
  if (n2.startsWith("color-mix(") || n2.startsWith("light-dark(")) return e2;
  if (n2.startsWith("color(")) {
    let [n3, r3, i2, a2, o2] = G(e2, t2);
    return o2 === 1 ? `color(${n3} ${r3} ${i2} ${a2})` : `color(${n3} ${r3} ${i2} ${a2} / ${o2})`;
  }
  let r2 = K(e2, t2);
  if (Array.isArray(r2)) {
    let [e3, t3, n3, i2, a2] = r2;
    return a2 === 1 ? e3 === "rgb" ? `${e3}(${t3}, ${n3}, ${i2})` : `${e3}(${t3} ${n3} ${i2})` : e3 === "rgb" ? `${e3}a(${t3}, ${n3}, ${i2}, ${a2})` : `${e3}(${t3} ${n3} ${i2} / ${a2})`;
  }
  return !v(r2) || !r2 ? "" : r2;
}, ir = (e2, t2, n2, r2) => {
  let i2 = [];
  for (let { color: e3, pct: t3 } of n2) {
    let n3 = rr(e3, r2);
    if (!n3) return "";
    i2.push(`${n3} ${t3}`.trim());
  }
  let a2 = i2.join(", ");
  return e2 ? t2 ? `color-mix(in ${e2} ${t2} hue, ${a2})` : `color-mix(in ${e2}, ${a2})` : `color-mix(${a2})`;
}, ar = (e2, t2 = {}, n2 = () => null) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let r2 = _({
    namespace: Bn,
    name: "resolveColorMix",
    value: e2
  }, t2), i2 = h(r2);
  if (i2 !== false) {
    let { item: e3 } = i2;
    return Array.isArray(e3) ? [...e3] : v(e3) ? e3 : null;
  }
  let { format: a2 = "", nullable: o2 = false } = t2, s2 = $n(U(e2, t2));
  if (!s2) return ot(r2, a2, o2);
  let { colorSpace: c2, colors: l2, hueArc: u2, totalPercentage: d2 } = s2;
  !c2 && a2 !== "specifiedValue" ? c2 = "oklab" : c2 === "xyz" && (c2 = "xyz-d65");
  let f2 = nr(l2, d2, t2, n2);
  if (l2 = f2.colors, d2 = f2.totalPercentage, a2 === "specifiedValue") {
    let e3 = ir(c2, u2, l2, t2);
    return e3 ? (m(r2, e3), e3) : ot(r2, a2, o2);
  }
  let p2 = tr(l2, t2, n2);
  if (!p2) return ot(r2, a2, o2);
  let { colors: g2, m: y2 } = p2, b2 = g2.length, x2 = g2[0], S2 = x2.color, C2 = x2.ratio, w2 = null;
  if (b2 === 1) w2 = Jn(c2, u2, S2, S2, 1, 0, y2, a2);
  else for (let e3 = 1; e3 < b2; e3++) {
    let t3 = g2[e3], n3 = t3.color, i3 = t3.ratio, s3 = C2 + i3, l3 = 0.5, d3 = 0.5;
    if (s3 > 0 && (l3 = C2 / s3, d3 = i3 / s3), w2 = Jn(c2, u2, S2, n3, l3, d3, e3 === b2 - 1 ? y2 : 1, a2), !Array.isArray(w2)) return ot(r2, a2, o2);
    let [f3, p3, m2, h2, _2] = w2, v2 = _2 === 1 || _2 === void 0 ? "" : ` / ${_2}`, x3 = _2 === 1 || _2 === void 0 ? "" : `, ${_2}`;
    S2 = /^rgb$/.test(f3) ? _2 === 1 || _2 === void 0 ? `rgb(${p3}, ${m2}, ${h2})` : `rgba(${p3}, ${m2}, ${h2}${x3})` : /^(?:hsl|hwb|lab|lch|oklab|oklch)$/.test(f3) ? `${f3}(${p3} ${m2} ${h2}${v2})` : `color(${f3} ${p3} ${m2} ${h2}${v2})`, C2 = s3;
  }
  return w2 ? (m(r2, w2), w2) : ot(r2, a2, o2);
}, or = "relative-color", { CloseParen: sr, Comment: cr, Delim: lr, Dimension: ur, EOF: dr, Function: fr, Ident: pr, Number: mr, OpenParen: hr, Percentage: gr, Whitespace: _r } = import_css_tokenizer.TokenType, { HasNoneKeywords: vr } = import_css_color_parser.SyntaxFlag, yr = /* @__PURE__ */ new Map([
  ["color", [
    "r",
    "g",
    "b",
    "alpha"
  ]],
  ["hsl", [
    "h",
    "s",
    "l",
    "alpha"
  ]],
  ["hsla", [
    "h",
    "s",
    "l",
    "alpha"
  ]],
  ["hwb", [
    "h",
    "w",
    "b",
    "alpha"
  ]],
  ["lab", [
    "l",
    "a",
    "b",
    "alpha"
  ]],
  ["lch", [
    "l",
    "c",
    "h",
    "alpha"
  ]],
  ["oklab", [
    "l",
    "a",
    "b",
    "alpha"
  ]],
  ["oklch", [
    "l",
    "c",
    "h",
    "alpha"
  ]],
  ["rgb", [
    "r",
    "g",
    "b",
    "alpha"
  ]],
  ["rgba", [
    "r",
    "g",
    "b",
    "alpha"
  ]]
]), br = /* @__PURE__ */ new Set([
  "lab",
  "lch",
  "oklab",
  "oklch"
]), xr = /* @__PURE__ */ new Set([
  "hsl",
  "hsla",
  "hwb"
]), Sr = /* @__PURE__ */ new Set([
  "color(",
  "hsl(",
  "hsla(",
  "hwb(",
  "lab(",
  "lch(",
  "oklab(",
  "oklch(",
  "rgb(",
  "rgba("
]), Cr = /* @__PURE__ */ new Set([
  "abs(",
  "acos(",
  "asin(",
  "atan(",
  "atan2(",
  "clamp(",
  "cos(",
  "exp(",
  "hypot(",
  "log(",
  "max(",
  "min(",
  "mod(",
  "pow(",
  "rem(",
  "round(",
  "sign(",
  "sin(",
  "sqrt(",
  "tan("
]), wr = /* @__PURE__ */ new Set([
  "abs(",
  "cos(",
  "sign(",
  "sin(",
  "tan("
]), Tr = RegExp(`^(?:${le})\\(\\s*from\\s+(${we}|${Ee})\\s+`, "i"), Er = RegExp(`^(${le})\\(\\s*from\\s+`, "i"), Dr = RegExp(`^(?:${le})\\(\\s*from\\s+`, "i"), Or = (e2, t2) => {
  let n2 = [];
  for (let r2 of e2) if (r2.length === 1) {
    let [e3] = r2;
    y(e3) && n2.push(e3);
  } else if (r2.length) {
    let e3 = sn(r2.join(""), { format: t2 });
    n2.push(e3);
  }
  return n2;
}, kr = (e2) => {
  for (let t2 = e2.length - 1; t2 >= 0; t2--) if (e2[t2] !== " ") return e2[t2];
}, Ar = (e2, t2 = {}) => {
  if (!Array.isArray(e2)) throw TypeError(`${e2} is not an array.`);
  let { colorSpace: n2 = "", format: r2 = "" } = t2, i2 = yr.get(n2);
  if (!i2) return null;
  let a2 = /* @__PURE__ */ new Set(), o2 = [
    [],
    [],
    [],
    []
  ], s2 = 0, c2 = 0, l2 = "", u2 = false;
  for (let n3 of e2) {
    if (!Array.isArray(n3)) throw TypeError(`${n3} is not an array.`);
    let [e3, r3, , , d2] = n3, f2 = o2[s2];
    if (Array.isArray(f2)) switch (e3) {
      case lr:
        if (l2) {
          if ((r3 === "+" || r3 === "-") && u2 && !wr.has(l2)) return null;
          u2 = false, f2.push(r3);
        }
        break;
      case ur: {
        if (!l2 || !wr.has(l2)) return null;
        let e4 = cn(n3, t2);
        v(e4) ? f2.push(e4) : f2.push(r3);
        break;
      }
      case fr:
        f2.push(r3), l2 = r3, c2++, Cr.has(r3) && a2.add(c2);
        break;
      case pr:
        if (!i2.includes(r3)) return null;
        f2.push(r3), l2 || s2++;
        break;
      case mr:
        f2.push(Number(d2?.value)), l2 || s2++;
        break;
      case hr:
        f2.push(r3), c2++;
        break;
      case sr:
        l2 && (f2.at(-1) === " " ? f2[f2.length - 1] = r3 : f2.push(r3), a2.has(c2) && a2.delete(c2), c2--, c2 === 0 && (l2 = "", s2++));
        break;
      case gr:
        if (!l2) return null;
        if (!wr.has(l2)) {
          let e4 = kr(f2);
          if (e4 === "+" || e4 === "-") return null;
          u2 = e4 !== "*" && e4 !== "/";
        }
        f2.push(Number(d2?.value) / 100);
        break;
      case _r:
        if (f2.length && l2) {
          let e4 = f2.at(-1);
          (typeof e4 == "number" || v(e4) && !e4.endsWith("(") && e4 !== " ") && f2.push(r3);
        }
        break;
      default:
        e3 !== cr && e3 !== dr && l2 && f2.push(r3);
    }
  }
  return Or(o2, r2);
}, jr = (e2, t2, n2, r2) => {
  let { colorScheme: i2, format: a2 } = n2, [, o2] = I(e2.replace(RegExp(`^${t2}\\(`), "").replace(/\)$/, "")), s2 = r2(o2, {
    colorScheme: i2,
    format: Oe
  });
  if (!s2) return null;
  if (a2 === "specifiedValue") return e2.replace(o2, s2);
  let c2 = r2(s2, n2);
  return v(c2) ? e2.replace(o2, c2) : null;
}, Mr = (e2, t2, n2) => {
  let [, r2] = e2.match(Er), i2 = {
    ...t2,
    colorSpace: r2
  }, [, a2] = e2.split(Dr), o2 = (0, import_css_tokenizer.tokenize)({ css: a2 }), s2 = [], l2 = 0, u2 = 0;
  for (let [e3, t3] of o2) {
    switch (u2++, e3) {
      case fr:
      case hr:
        s2.push(t3), l2++;
        break;
      case sr:
        s2.at(-1) === " " ? s2[s2.length - 1] = t3 : s2.push(t3), l2--;
        break;
      case _r: {
        let e4 = s2.at(-1);
        v(e4) && !e4.endsWith("(") && e4 !== " " && s2.push(t3);
        break;
      }
      default:
        e3 !== cr && e3 !== dr && s2.push(t3);
    }
    if (l2 === 0) break;
  }
  let d2 = Lr(s2.join("").trim(), i2, n2);
  if (d2 === null) return null;
  let f2 = Ar(o2.slice(u2), i2);
  if (f2 === null) return null;
  let [p2, m2, h2, g2] = f2, _2 = "";
  return _2 = y(g2) ? ` ${p2} ${m2} ${h2} / ${g2})` : ` ${f2.join(" ")})`, e2.replace(a2, `${d2}${_2}`);
}, Nr = (e2, t2 = {}, n2 = () => null) => {
  if (!v(e2) || (e2 = e2.trim(), !e2)) return null;
  if (!Dr.test(e2)) return e2;
  let { currentColor: r2, format: i2 } = t2, a2 = _({
    namespace: or,
    name: "extractOriginColor",
    value: e2
  }, t2), o2 = h(a2);
  if (o2 !== false) return o2.item;
  if (/currentcolor/i.test(e2)) {
    if (!r2) return m(a2, null), null;
    e2 = e2.replace(/currentcolor/gi, r2);
  }
  let [, s2] = e2.match(Er), l2 = {
    ...t2,
    colorSpace: s2
  };
  if (e2.includes("light-dark(")) {
    let t3 = jr(e2, s2, l2, n2);
    if (t3 === null) return m(a2, null), null;
    e2 = t3;
  }
  if (Tr.test(e2)) {
    let [, t3] = e2.match(Tr), [, r3] = e2.split(t3);
    if (/^[a-z]+$/.test(t3)) {
      if (!/^transparent$/.test(t3) && !Object.hasOwn(mn, t3)) return m(a2, null), null;
    } else if (i2 === "specifiedValue") {
      let r4 = n2(t3, l2);
      e2 = e2.replace(t3, r4);
    }
    if (i2 === "specifiedValue") {
      let t4 = Ar((0, import_css_tokenizer.tokenize)({ css: r3 }), l2);
      if (t4 === null) return m(a2, null), null;
      let [n3, i3, o3, s3] = t4, u2 = "";
      u2 = y(s3) ? ` ${n3} ${i3} ${o3} / ${s3})` : ` ${t4.join(" ")})`, r3 !== u2 && (e2 = e2.replace(r3, u2));
    }
  } else {
    let t3 = Mr(e2, l2, n2);
    if (t3 === null) return m(a2, null), null;
    e2 = t3;
  }
  return m(a2, e2), e2;
}, Pr = (e2) => {
  for (let t2 of e2) {
    let [e3, n2] = t2;
    if (e3 === fr && n2 === "var(") return true;
  }
  return false;
}, Fr = (e2) => {
  for (let t2 = 0; t2 < e2.length - 1; t2++) {
    let [n2, r2] = e2[t2];
    if (n2 === fr && Sr.has(r2)) for (let n3 = t2 + 1; n3 < e2.length; n3++) {
      let [t3, r3] = e2[n3];
      if (t3 !== _r && t3 !== cr) {
        if (t3 === pr && r3 === "from") return true;
        break;
      }
    }
  }
  return false;
}, Ir = (e2) => {
  if (!e2) return null;
  let { alpha: t2, channels: n2, colorNotation: r2, syntaxFlags: i2 } = e2, a2;
  a2 = Number.isNaN(Number(t2)) ? i2 instanceof Set && i2.has(vr) ? O : 0 : L(Number(t2), 8);
  let o2, s2, c2;
  [o2, s2, c2] = n2;
  let l2;
  if (br.has(r2)) {
    let e3 = i2 instanceof Set && i2.has(vr);
    o2 = Number.isNaN(o2) ? e3 ? O : 0 : L(o2, 16), s2 = Number.isNaN(s2) ? e3 ? O : 0 : L(s2, 16), c2 = Number.isNaN(c2) ? e3 ? O : 0 : L(c2, 16), l2 = a2 === 1 ? `${r2}(${o2} ${s2} ${c2})` : `${r2}(${o2} ${s2} ${c2} / ${a2})`;
  } else if (xr.has(r2)) {
    Number.isNaN(o2) && (o2 = 0), Number.isNaN(s2) && (s2 = 0), Number.isNaN(c2) && (c2 = 0);
    let [e3, t3, n3] = Mn(`${r2}(${o2} ${s2} ${c2} / ${a2})`);
    e3 = L(e3 / 255, 10), t3 = L(t3 / 255, 10), n3 = L(n3 / 255, 10), l2 = a2 === 1 ? `color(srgb ${e3} ${t3} ${n3})` : `color(srgb ${e3} ${t3} ${n3} / ${a2})`;
  } else {
    let e3 = r2 === "rgb" ? "srgb" : r2, t3 = i2 instanceof Set && i2.has(vr);
    o2 = Number.isNaN(o2) ? t3 ? O : 0 : L(o2, 10), s2 = Number.isNaN(s2) ? t3 ? O : 0 : L(s2, 10), c2 = Number.isNaN(c2) ? t3 ? O : 0 : L(c2, 10), l2 = a2 === 1 ? `color(${e3} ${o2} ${s2} ${c2})` : `color(${e3} ${o2} ${s2} ${c2} / ${a2})`;
  }
  return l2;
};
function Lr(e2, n2 = {}, r2 = () => null) {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let i2 = { ...n2 }, { format: o2 = "" } = i2, s2 = (0, import_css_tokenizer.tokenize)({ css: e2 });
  if (Pr(s2)) {
    if (o2 !== "specifiedValue") throw SyntaxError("Unexpected token var( found.");
    return e2;
  }
  if (!Fr(s2)) return e2;
  let l2 = _({
    namespace: or,
    name: "resolveRelativeColor",
    value: e2
  }, i2), u2 = h(l2);
  if (u2 !== false) return u2.item;
  let d2 = Nr(e2, i2, r2);
  if (d2 === null) return m(l2, null), null;
  let f2 = d2;
  if (o2 === "specifiedValue") return f2.startsWith("rgba(") ? f2.replace("rgba(", "rgb(") : f2.startsWith("hsla(") ? f2.replace("hsla(", "hsl(") : f2;
  let p2 = (0, import_css_tokenizer.tokenize)({ css: f2 }), g2 = (0, import_css_parser_algorithms.parseComponentValue)(p2), y2 = Ir((0, import_css_color_parser.color)(g2));
  return y2 === null ? (m(l2, null), null) : (m(l2, y2), y2);
}
var Rr = "resolve-color", zr = "rgba(0, 0, 0, 0)", Br = RegExp(`^(?:${we})$`, "i"), Vr = RegExp(`^color\\(\\s*(${_e})\\s*\\)$`, "i"), Hr = /^currentColor$/i, Ur = new RegExp(A, "i"), Wr = /^(?:(?:ok)?l(?:ab|ch)|color(?:-mix)?|hsla?|hwb|rgba?|var)\(/i, Gr = new RegExp(ve, "i"), Kr = new RegExp(Ee, "i"), qr = new RegExp(ye, "i"), Jr = new RegExp(ee, "i"), Yr = /^[a-z]+$/i, Xr = /^(?:specifi|comput)edValue$/, Zr = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { colorSpace: n2 = "", format: r2 = "", nullable: i2 = false } = t2, a2 = _({
    namespace: Rr,
    name: "resolveColorValue",
    value: e2
  }, t2), o2 = h(a2);
  if (o2 !== false) {
    let { item: e3 } = o2;
    return Array.isArray(e3) ? [...e3] : e3;
  }
  if (!Br.test(e2)) {
    let e3 = z(r2, i2);
    return e3 === null ? (m(a2, null), null) : (m(a2, e3), v(e3), e3);
  }
  let s2 = "", c2 = 0, l2 = 0, u2 = 0, d2 = 0;
  if (Hr.test(e2)) {
    if (r2 === "specifiedValue") return m(a2, e2), e2;
  } else if (Yr.test(e2)) {
    if (Object.hasOwn(mn, e2)) {
      if (r2 === "specifiedValue") return m(a2, e2), e2;
      [c2, l2, u2] = mn[e2], d2 = 1;
    } else switch (r2) {
      case Oe:
        return e2 === "transparent" ? (m(a2, e2), e2) : (m(a2, ""), "");
      case P:
        if (e2 === "transparent") {
          let e3 = [
            "rgb",
            0,
            0,
            0,
            0
          ];
          return m(a2, e3), [...e3];
        }
        return m(a2, null), null;
      case N:
      default: {
        if (i2 && e2 !== "transparent") return m(a2, null), null;
        let t3 = [
          "rgb",
          0,
          0,
          0,
          0
        ];
        return m(a2, t3), [...t3];
      }
    }
  } else if (e2[0] === "#") [c2, l2, u2, d2] = Nt(e2);
  else if (e2.startsWith("hsl")) [, c2, l2, u2, d2] = vn(e2, t2);
  else if (e2.startsWith("hwb")) [, c2, l2, u2, d2] = yn(e2, t2);
  else if (/^l(?:ab|ch)/.test(e2)) {
    let n3, i3, o3;
    if (e2.startsWith("lab") ? [s2, n3, i3, o3, d2] = bn(e2, t2) : [s2, n3, i3, o3, d2] = xn(e2, t2), Xr.test(r2)) {
      let e3 = [
        s2,
        n3,
        i3,
        o3,
        d2
      ];
      return m(a2, e3), [...e3];
    }
    [c2, l2, u2] = kt([
      n3,
      i3,
      o3
    ]);
  } else if (/^okl(?:ab|ch)/.test(e2)) {
    let n3, i3, o3;
    if (e2.startsWith("oklab") ? [s2, n3, i3, o3, d2] = Sn(e2, t2) : [s2, n3, i3, o3, d2] = Cn(e2, t2), Xr.test(r2)) {
      let e3 = [
        s2,
        n3,
        i3,
        o3,
        d2
      ];
      return m(a2, e3), [...e3];
    }
    [c2, l2, u2] = wt([
      n3,
      i3,
      o3
    ]);
  } else [, c2, l2, u2, d2] = _n(e2, t2);
  if (r2 === "mixValue" && n2 === "srgb") {
    let e3 = [
      "srgb",
      c2 / 255,
      l2 / 255,
      u2 / 255,
      d2
    ];
    return m(a2, e3), [...e3];
  }
  let f2 = [
    "rgb",
    Math.round(c2),
    Math.round(l2),
    Math.round(u2),
    d2
  ];
  return m(a2, f2), [...f2];
}, J = (e2, t2 = {}) => {
  if (!v(e2)) return null;
  let n2 = e2.trim(), { colorSpace: r2 = "", format: i2 = "", nullable: a2 = false } = t2, o2 = _({
    namespace: Rr,
    name: "resolveColorFunc",
    value: n2
  }, t2), s2 = h(o2);
  if (s2 !== false) {
    let { item: e3 } = s2;
    return Array.isArray(e3) ? [...e3] : e3;
  }
  if (!Vr.test(n2)) {
    let e3 = z(i2, a2);
    return e3 === null ? (m(o2, null), null) : (m(o2, e3), v(e3), e3);
  }
  let [c2, l2, u2, d2, f2] = G(n2, t2);
  if (Xr.test(i2) || i2 === "mixValue" && c2 === r2) {
    let e3 = [
      c2,
      l2,
      u2,
      d2,
      f2
    ];
    return m(o2, e3), [...e3];
  }
  let p2 = parseFloat(`${l2}`), g2 = parseFloat(`${u2}`), y2 = parseFloat(`${d2}`), b2 = R(`${f2}`), [x2, S2, C2] = wt([
    p2,
    g2,
    y2
  ], true), w2 = [
    "rgb",
    x2,
    S2,
    C2,
    b2
  ];
  return m(o2, w2), [...w2];
}, Y = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  e2 = e2.trim();
  let { colorScheme: n2 = "normal", currentColor: r2 = "", format: i2 = N, nullable: a2 = false } = t2, o2 = _({
    namespace: Rr,
    name: "resolve",
    value: e2
  }, t2), s2 = h(o2);
  if (s2 !== false) return s2.item;
  if (Jr.test(e2)) {
    if (i2 === "specifiedValue") return m(o2, e2), e2;
    let n3 = fn(e2, t2);
    if (n3 === null) {
      let e3 = i2 === "hex" || i2 === "hexAlpha" || a2 ? null : zr;
      return m(o2, e3), e3;
    }
    e2 = n3;
  }
  if (t2.format !== i2 && (t2.format = i2), Gr.test(e2) && e2.endsWith(")")) {
    let [r3 = "", a3 = ""] = I(e2.replace(Gr, "").replace(/\)$/, ""), { delimiter: "," });
    if (r3 && a3) {
      if (i2 === "specifiedValue") {
        let e4 = Y(r3, t2), n3 = Y(a3, t2), i3 = e4 && n3 ? `light-dark(${e4}, ${n3})` : "";
        return m(o2, i3), i3;
      }
      let e3 = Y(n2 === "dark" ? a3 : r3, t2);
      return m(o2, e3), e3;
    }
    let s3;
    return s3 = i2 === "specifiedValue" ? "" : i2 === "hex" || i2 === "hexAlpha" ? null : zr, m(o2, s3), s3;
  }
  if (qr.test(e2)) {
    let n3 = Lr(e2, t2, Y);
    if (i2 === "computedValue") {
      let e3 = n3 === null && !a2 ? zr : n3;
      return m(o2, e3), e3;
    }
    if (i2 === "specifiedValue") {
      let e3 = n3 === null ? "" : n3;
      return m(o2, e3), e3;
    }
    e2 = n3 === null ? "" : n3;
  }
  Ur.test(e2) && (e2 = U(e2, t2));
  let c2 = "", l2 = NaN, u2 = NaN, d2 = NaN, f2 = NaN;
  if (e2 === "transparent") {
    let t3;
    switch (i2) {
      case Oe:
        t3 = e2;
        break;
      case "hex":
        t3 = null;
        break;
      case "hexAlpha":
        t3 = "#00000000";
        break;
      default:
        t3 = zr;
    }
    return m(o2, t3), t3;
  }
  if (/^currentcolor$/i.test(e2)) {
    if (i2 === "specifiedValue") return m(o2, e2), e2;
    if (r2) {
      let e3;
      if (e3 = r2.startsWith("color-mix(") ? ar(r2, t2, Y) : r2.startsWith("color(") ? J(r2, t2) : Zr(r2, t2), e3 === null) return m(o2, null), null;
      [c2, l2, u2, d2, f2] = e3;
    } else {
      let t3 = i2 === "computedValue" ? zr : e2;
      if (i2 === "computedValue") return m(o2, t3), t3;
    }
  } else if (i2 === "specifiedValue") {
    let n3 = "";
    if (e2.startsWith("color-mix(")) {
      let r3 = ar(e2, t2, Y);
      v(r3) && r3 && (n3 = r3);
    } else if (e2.startsWith("color(")) {
      let r3 = J(e2, t2);
      if (Array.isArray(r3)) {
        let [e3, t3, i3, a3, o3] = r3;
        n3 = o3 === 1 ? `color(${e3} ${t3} ${i3} ${a3})` : `color(${e3} ${t3} ${i3} ${a3} / ${o3})`;
      }
    } else {
      let r3 = Zr(e2, t2);
      if (Array.isArray(r3)) {
        let [e3, t3, i3, a3, o3] = r3;
        n3 = e3 === "rgb" ? o3 === 1 ? `${e3}(${t3}, ${i3}, ${a3})` : `${e3}a(${t3}, ${i3}, ${a3}, ${o3})` : o3 === 1 ? `${e3}(${t3} ${i3} ${a3})` : `${e3}(${t3} ${i3} ${a3} / ${o3})`;
      } else r3 && (n3 = r3);
    }
    return m(o2, n3), n3;
  } else if (e2.startsWith("color-mix(")) {
    r2 && (e2 = e2.replace(/currentcolor/gi, r2)), e2 = e2.replace(/transparent/g, zr);
    let n3 = ar(e2, t2, Y);
    if (n3 === null) return m(o2, null), null;
    [c2, l2, u2, d2, f2] = n3;
  } else if (e2.startsWith("color(")) {
    let n3 = J(e2, t2);
    if (n3 === null) return m(o2, null), null;
    [c2, l2, u2, d2, f2] = n3;
  } else if (e2) {
    let n3 = Zr(e2, t2);
    if (n3 === null) return m(o2, null), null;
    [c2, l2, u2, d2, f2] = n3;
  }
  let p2 = "";
  switch (i2) {
    case "hex":
    case "hexAlpha":
      p2 = Number.isNaN(l2) || Number.isNaN(u2) || Number.isNaN(d2) || Number.isNaN(f2) || i2 === "hex" && f2 === 0 ? null : Mt([
        l2,
        u2,
        d2,
        i2 === "hex" ? 1 : f2
      ]);
      break;
    default:
      p2 = c2 === "rgb" ? f2 === 1 ? `${c2}(${l2}, ${u2}, ${d2})` : `${c2}a(${l2}, ${u2}, ${d2}, ${f2})` : [
        "lab",
        "lch",
        "oklab",
        "oklch"
      ].includes(c2) ? f2 === 1 ? `${c2}(${l2} ${u2} ${d2})` : `${c2}(${l2} ${u2} ${d2} / ${f2})` : f2 === 1 ? `color(${c2} ${l2} ${u2} ${d2})` : `color(${c2} ${l2} ${u2} ${d2} / ${f2})`;
  }
  return m(o2, p2), p2;
}, Qr = (e2, t2 = {}) => {
  if (!v(e2)) return false;
  let n2 = e2.trim();
  if (!n2) return false;
  if (Yr.test(n2)) {
    let e3 = n2.toLowerCase();
    return e3 === "currentcolor" || e3 === "transparent" || Object.hasOwn(mn, e3);
  }
  return Br.test(n2) || Kr.test(n2) ? true : Wr.test(n2) ? !!Y(n2, {
    ...t2,
    nullable: true
  }) : false;
}, { CloseParen: $r, Comma: ei, Comment: ti, Delim: ni, Dimension: ri, EOF: ii, Function: ai, Ident: oi, Number: si, OpenParen: ci, Percentage: li, Whitespace: ui } = import_css_tokenizer.TokenType, di = RegExp(`^(?:${T})$`, "i"), fi = /^(?:calc|min|max|clamp)\(/i, pi = /^(?:e|pi|-?infinity|NaN)$/i, mi = (e2) => {
  let t2 = e2.tokens[e2.index];
  for (; t2 && (t2[0] === ui || t2[0] === ti); ) e2.index++, t2 = e2.tokens[e2.index];
}, hi = (e2, t2, n2) => {
  for (let r2 = t2; r2 >= 0 && r2 < e2.length; r2 += n2) {
    let [t3] = e2[r2];
    if (t3 === ui) return true;
    if (t3 !== ti) break;
  }
  return false;
}, gi = (e2) => {
  let t2 = vi(e2);
  if (t2 === null) return null;
  mi(e2);
  let n2 = e2.tokens[e2.index];
  for (; n2 && n2[0] === ni && (n2[1] === "*" || n2[1] === "/"); ) {
    let r2 = n2[1];
    e2.index++;
    let i2 = vi(e2);
    if (i2 === null || (r2 === "*" ? t2 !== 0 && i2 !== 0 : i2 !== 0)) return null;
    t2 += i2, mi(e2), n2 = e2.tokens[e2.index];
  }
  return t2;
}, _i = (e2) => {
  let t2 = gi(e2);
  if (t2 === null) return null;
  let n2 = e2.tokens[e2.index];
  for (; n2 && n2[0] === ni && (n2[1] === "+" || n2[1] === "-"); ) {
    if (!hi(e2.tokens, e2.index - 1, -1) || !hi(e2.tokens, e2.index + 1, 1) || (e2.index++, gi(e2) !== t2)) return null;
    n2 = e2.tokens[e2.index];
  }
  return t2;
};
function vi(e2) {
  mi(e2);
  let t2 = e2.tokens[e2.index];
  if (!t2 || t2[0] === ii) return null;
  e2.index++;
  let [n2, , , , r2] = t2;
  switch (n2) {
    case si:
      return 0;
    case li:
      return 1;
    case ri:
      return di.test(r2.unit) ? 1 : null;
    case oi:
      return pi.test(r2.value) ? 0 : null;
    case ci:
    case ai: {
      let t3 = n2 === ai ? r2.value.toLowerCase() : "calc";
      if (![
        "calc",
        "min",
        "max",
        "clamp"
      ].includes(t3)) return null;
      let i2 = _i(e2);
      if (i2 === null) return null;
      let a2 = 1, o2 = e2.tokens[e2.index];
      for (; o2 && o2[0] === ei; ) {
        if (e2.index++, _i(e2) !== i2) return null;
        a2++, o2 = e2.tokens[e2.index];
      }
      let s2 = e2.tokens[e2.index];
      return !s2 || s2[0] !== $r || t3 === "calc" && a2 !== 1 || t3 === "clamp" && a2 !== 3 ? null : (e2.index++, i2);
    }
    default:
      return null;
  }
}
var yi = (e2) => {
  if (!v(e2) || !fi.test(e2)) return false;
  let t2 = [], n2 = {
    tokens: (0, import_css_tokenizer.tokenize)({ css: e2 }, { onParseError: t2.push.bind(t2) }),
    index: 0
  }, r2 = vi(n2);
  mi(n2);
  let i2 = n2.tokens[n2.index];
  return t2.length === 0 && r2 === 1 && !!i2 && i2[0] === ii;
}, { Function: bi } = import_css_tokenizer.TokenType, xi = `${E}(?:${w})`, X = `${`${E}(?:${T})|0`}|${k}`, Si = `${D}(?:${T}|%)|0`, Ci = `${D}(?:${T})|0`, Z = "center", wi = "left|right", Ti = "top|bottom", Ei = "start|end", Di = `${wi}|x-(?:${Ei})`, Oi = `${Ti}|y-(?:${Ei})`, ki = `block-(?:${Ei})`, Ai = `inline-(?:${Ei})`, ji = `${Z}|${Di}|${Oi}|${ki}|${Ai}|${X}`, Mi = [
  `(?:${Z}|${Di})\\s+(?:${Z}|${Oi})`,
  `(?:${Z}|${Oi})\\s+(?:${Z}|${Di})`,
  `(?:${Z}|${Di}|${X})\\s+(?:${Z}|${Oi}|${X})`,
  `(?:${Z}|${ki})\\s+(?:${Z}|${Ai})`,
  `(?:${Z}|${Ai})\\s+(?:${Z}|${ki})`,
  `(?:${Z}|${Ei})\\s+(?:${Z}|${Ei})`
].join("|"), Ni = [
  `(?:${Di})\\s+(?:${X})\\s+(?:${Oi})\\s+(?:${X})`,
  `(?:${Oi})\\s+(?:${X})\\s+(?:${Di})\\s+(?:${X})`,
  `(?:${ki})\\s+(?:${X})\\s+(?:${Oi})\\s+(?:${X})`,
  `(?:${Ai})\\s+(?:${X})\\s+(?:${ki})\\s+(?:${X})`,
  `(?:${Ei})\\s+(?:${X})\\s+(?:${Ei})\\s+(?:${X})`
].join("|"), Pi = "(?:clos|farth)est-(?:corner|side)", Fi = [
  `${Pi}(?:\\s+${Pi})?`,
  `${Ci}`,
  `(?:${Si})\\s+(?:${Si})`
].join("|"), Ii = "circle|ellipse", Li = `from\\s+${xi}`, Q = `at\\s+(?:${ji}|${Mi}|${Ni})`, Ri = `to\\s+(?:(?:${wi})(?:\\s(?:${Ti}))?|(?:${Ti})(?:\\s(?:${wi}))?)`, $ = `in\\s+(?:${me}|${ue})`, zi = [
  /ellipse/,
  /farthest-corner/,
  /at\s+center/
], Bi = [/at\s+center/], Vi = {
  format: Oe,
  nullable: true
}, Hi = /^(?:repeating-)?conic-gradient$/, Ui = /^(?:repeating-)?linear-gradient$/, Wi = /^(?:repeating-)?radial-gradient$/;
RegExp(`^${De}$`, "i");
var Gi = RegExp(`^(?:${T})$`, "i"), Ki = /^to\s+bottom$/i, qi = [
  RegExp(`^${Li}(?:\\s+${Q})?(?:\\s+${$})?$`, "i"),
  RegExp(`^${Q}(?:\\s+${$})?$`, "i"),
  RegExp(`^${$}(?:\\s+${Li})?(?:\\s+${Q})?$`, "i")
], Ji = [RegExp(`^(?:${xi}|${Ri})(?:\\s+${$})?$`, "i"), RegExp(`^${$}(?:\\s+(?:${xi}|${Ri}))?$`, "i")], Yi = [
  RegExp(`^(?:${Ii})(?:\\s+(?:${Fi}))?(?:\\s+${Q})?(?:\\s+${$})?$`, "i"),
  RegExp(`^(?:${Fi})(?:\\s+(?:${Ii}))?(?:\\s+${Q})?(?:\\s+${$})?$`, "i"),
  RegExp(`^${Q}(?:\\s+${$})?$`, "i"),
  RegExp(`^${$}(?:\\s+${Ii})(?:\\s+(?:${Fi}))?(?:\\s+${Q})?$`, "i"),
  RegExp(`^${$}(?:\\s+${Fi})(?:\\s+(?:${Ii}))?(?:\\s+${Q})?$`, "i"),
  RegExp(`^${$}(?:\\s+${Q})?$`, "i")
], Xi = (e2) => {
  if (!v(e2)) return {
    line: "",
    valid: false
  };
  let t2 = e2.trim();
  if (!t2) return {
    line: "",
    valid: true
  };
  let n2 = st(t2);
  if (n2.length === 0) return {
    line: e2,
    valid: false
  };
  let r2 = n2.join(" ");
  if (!Ji.some((e3) => e3.test(r2))) return {
    line: e2,
    valid: false
  };
  let i2 = r2.replace(/\s+/g, " ").trim();
  return Ki.test(i2) ? {
    line: "",
    valid: true
  } : {
    line: i2.replace(/^to\sbottom\s/i, "").replace(/\sto\sbottom$/i, "").trim(),
    valid: true
  };
}, Zi = (e2) => {
  if (!v(e2)) return {
    line: "",
    valid: false
  };
  let t2 = e2.trim();
  if (!t2) return {
    line: "",
    valid: true
  };
  let n2 = st(t2);
  if (n2.length === 0) return {
    line: e2,
    valid: false
  };
  let r2 = n2.join(" ");
  if (!Yi.some((e3) => e3.test(r2))) return {
    line: e2,
    valid: false
  };
  let i2 = r2;
  for (let e3 of zi) i2 = i2.replace(e3, "");
  return i2 = i2.replace(/\s{2,}/g, " ").trim(), {
    line: i2,
    valid: true
  };
}, Qi = (e2) => {
  if (!v(e2)) return {
    line: "",
    valid: false
  };
  let t2 = e2.trim();
  if (!t2) return {
    line: "",
    valid: true
  };
  let n2 = st(t2);
  if (n2.length === 0) return {
    line: e2,
    valid: false
  };
  let r2 = n2.join(" ");
  if (!qi.some((e3) => e3.test(r2))) return {
    line: e2,
    valid: false
  };
  let i2 = r2;
  for (let e3 of Bi) i2 = i2.replace(e3, "");
  return i2 = i2.replace(/\s{2,}/g, " ").trim(), {
    line: i2,
    valid: true
  };
}, $i = (e2, t2) => {
  if (v(e2) && v(t2)) {
    let n2 = e2.trim(), r2 = t2.trim();
    if (Ui.test(r2)) return Xi(n2);
    if (Wi.test(r2)) return Zi(n2);
    if (Hi.test(r2)) return Qi(n2);
  }
  return {
    line: e2,
    valid: false
  };
}, ea = (e2) => st(e2), ta = (e2, t2) => {
  if (!v(e2)) return false;
  let n2 = e2.trim();
  if (!n2) return false;
  let r2 = (0, import_css_tokenizer.tokenize)({ css: n2 }).filter((e3) => e3[0] !== import_css_tokenizer.TokenType.Whitespace && e3[0] !== import_css_tokenizer.TokenType.Comment && e3[0] !== import_css_tokenizer.TokenType.EOF);
  if (r2.length === 1) {
    let [e3, n3, , , i2] = r2[0];
    if (e3 === import_css_tokenizer.TokenType.Number) return !t2 && Number(n3) === 0;
    if (e3 === import_css_tokenizer.TokenType.Percentage) return true;
    if (e3 === import_css_tokenizer.TokenType.Dimension) {
      let e4 = i2.unit.toLowerCase();
      return t2 ? w.split("|").some((t3) => RegExp(`^${t3}$`, "i").test(e4)) : Gi.test(e4);
    }
    return false;
  }
  return !t2 && yi(n2);
}, na = (e2, t2, n2 = {}) => {
  if (!Array.isArray(e2) || e2.length <= 1) return {
    colorStops: e2,
    valid: false
  };
  let r2 = Hi.test(t2), i2 = [], a2 = "";
  for (let [t3, o2] of e2.entries()) {
    if (!v(o2)) return {
      colorStops: e2,
      valid: false
    };
    let s2 = ea(o2), [c2, ...l2] = s2;
    if (!c2 || s2.length > 3) return {
      colorStops: e2,
      valid: false
    };
    if (s2.length === 1 && ta(c2, r2)) {
      if (t3 === 0 || a2 === "hint") return {
        colorStops: e2,
        valid: false
      };
      a2 = "hint";
      let r3 = yi(c2) ? U(c2, n2) : c2;
      i2.push(r3);
      continue;
    }
    let u2 = [];
    for (let t4 of l2) {
      if (!ta(t4, r2)) return {
        colorStops: e2,
        valid: false
      };
      let i3 = yi(t4) ? U(t4, n2) : t4;
      u2.push(i3);
    }
    let d2 = I(c2).join(" ");
    if (!Qr(d2, Vi)) return {
      colorStops: e2,
      valid: false
    };
    let f2 = Y(d2, n2);
    if (!f2 || !Qr(f2, Vi)) return {
      colorStops: e2,
      valid: false
    };
    a2 = "color";
    let p2 = u2.length > 0 ? `${f2} ${u2.join(" ")}` : f2;
    i2.push(p2);
  }
  return a2 === "color" ? {
    colorStops: i2,
    valid: true
  } : {
    colorStops: e2,
    valid: false
  };
}, ra = "gradient", ia = {
  format: Oe,
  nullable: true
}, aa = RegExp(`^${De}$`, "i"), oa = (e2, t2 = {}) => {
  if (!v(e2)) return null;
  let n2 = e2.trim(), i2 = _({
    namespace: ra,
    name: "parseGradient",
    value: n2
  }, t2), a2 = h(i2);
  if (a2 !== false) return a2.item;
  let s2 = (0, import_css_tokenizer.tokenize)({ css: n2 }), l2 = (0, import_css_parser_algorithms.parseListOfComponentValues)(s2);
  if (l2.length !== 1 || !(0, import_css_parser_algorithms.isFunctionNode)(l2[0])) return m(i2, null), null;
  let u2 = l2[0], d2 = u2.getName().toLowerCase();
  if (!aa.test(d2)) return m(i2, null), null;
  let f2 = u2.value.map((e3) => e3.toString()).join("");
  if (f2) {
    let [e3, ...r2] = I(f2, {
      delimiter: ",",
      preserveComment: true
    });
    if (!e3) return m(i2, null), null;
    let [a3] = ea(e3);
    if (a3 && Qr(I(a3).join(" "), ia)) {
      r2.unshift(e3);
      let { colorStops: a4, valid: o2 } = na(r2, d2, t2);
      if (o2) {
        let e4 = {
          value: n2,
          type: d2,
          colorStopList: a4
        };
        return m(i2, e4), e4;
      }
    } else if (r2.length > 1) {
      let { line: a4, valid: o2 } = $i(I(e3).join(" "), d2), { colorStops: s3, valid: c2 } = na(r2, d2, t2);
      if (o2 && c2) {
        let e4 = {
          value: n2,
          type: d2,
          gradientLine: a4,
          colorStopList: s3
        };
        return m(i2, e4), e4;
      }
    }
  }
  return m(i2, null), null;
}, sa = (e2, t2 = {}) => {
  let n2 = { ...t2 }, r2 = $e(n2);
  if (e2 && e2.length <= r2) {
    let t3 = oa(e2, n2);
    if (t3) {
      let { type: e3, gradientLine: n3, colorStopList: r3 } = t3;
      return n3 ? `${e3}(${n3}, ${r3.join(", ")})` : `${e3}(${r3.join(", ")})`;
    }
  }
  return n2.format === "specifiedValue" ? "" : O;
}, ca = (e2, t2 = {}) => !!oa(e2, { ...t2 }), la = (e2, t2 = {}) => Y(e2, { ...t2 }), ua = (e2, t2 = {}) => !!Qr(e2, {
  ...t2,
  nullable: true
}), da = "convert", fa = new RegExp(A), pa = new RegExp(ye), ma = new RegExp(ee), ha = (e2, t2) => {
  if (!v(e2)) return null;
  e2 = e2.trim();
  let n2 = $e(t2);
  if (!e2 || e2.length > n2) return null;
  let r2 = _({
    namespace: da,
    name: "preProcess",
    value: e2
  }, t2), i2 = h(r2);
  if (i2 !== false) return i2.item;
  let a2 = e2;
  if (ma.test(e2)) {
    let n3 = fn(e2, t2);
    if (!v(n3)) return m(r2, null), null;
    a2 = n3;
  }
  if (pa.test(a2)) {
    let e3 = Lr(a2, t2);
    if (!v(e3)) return m(r2, null), null;
    a2 = e3;
  } else fa.test(a2) && (a2 = U(a2, t2));
  if (a2.startsWith("color-mix")) {
    let e3 = Y(a2, {
      ...t2,
      format: N,
      nullable: true
    });
    a2 = typeof e3 == "string" ? e3 : null;
  }
  return !a2 || a2.length > n2 ? (m(r2, null), null) : (m(r2, a2), a2);
}, ga = (e2, t2, n2) => (r2, i2 = {}) => {
  if (!v(r2)) throw TypeError(`${r2} is not a string.`);
  let a2 = { ...i2 }, o2 = ha(r2, a2);
  if (o2 === null) return [
    0,
    0,
    0,
    0
  ];
  let s2 = o2.toLowerCase(), c2 = _({
    namespace: da,
    name: e2,
    value: s2
  }, a2), l2 = h(c2);
  if (l2 !== false) return [...l2.item];
  let u2 = n2(s2, {
    ...a2,
    format: t2
  });
  return m(c2, u2), [...u2];
}, _a = (e2) => rt(e2), va = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  let n2 = { ...t2 }, r2 = ha(e2, n2);
  if (r2 === null) return null;
  let i2 = r2.toLowerCase(), a2 = _({
    namespace: da,
    name: "colorToHex",
    value: i2
  }, n2), o2 = h(a2);
  if (o2 !== false) return o2.item;
  let s2 = Y(i2, {
    ...n2,
    nullable: true,
    format: n2.alpha ? "hexAlpha" : "hex"
  });
  return v(s2) ? (m(a2, s2), s2) : (m(a2, null), null);
}, ya = ga("colorToHsl", "hsl", Pn), ba = ga("colorToHwb", "hwb", Fn), xa = ga("colorToLab", "lab", In), Sa = ga("colorToLch", "lch", Ln), Ca = ga("colorToOklab", "oklab", Rn), wa = ga("colorToOklch", "oklch", zn), Ta = ga("colorToRgb", "rgb", Mn), Ea = (e2, t2 = {}) => {
  if (!v(e2)) throw TypeError(`${e2} is not a string.`);
  let n2 = { ...t2 }, r2 = ha(e2, n2);
  if (r2 === null) return [
    0,
    0,
    0,
    0
  ];
  let i2 = r2.toLowerCase(), a2 = _({
    namespace: da,
    name: "colorToXyz",
    value: i2
  }, n2), o2 = h(a2);
  if (o2 !== false) return [...o2.item];
  let s2;
  s2 = i2.startsWith("color(") ? G(i2, n2) : K(i2, n2);
  let [, ...c2] = s2;
  return m(a2, c2), [...c2];
}, Da = {
  colorToHex: va,
  colorToHsl: ya,
  colorToHwb: ba,
  colorToLab: xa,
  colorToLch: Sa,
  colorToOklab: Ca,
  colorToOklch: wa,
  colorToRgb: Ta,
  colorToXyz: Ea,
  colorToXyzD50: (e2, t2 = {}) => Ea(e2, {
    ...t2,
    d50: true
  }),
  numberToHex: _a
}, Oa = {
  cssCalc: U,
  cssVar: pn,
  extractDashedIdent: et,
  isColor: ua,
  isGradient: ca,
  resolveGradient: sa,
  resolveLengthInPixels: nt,
  splitValue: I
};
