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
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);
var stdin_exports = {};
__export(stdin_exports, {
  ParseError: () => ParseError,
  ParseErrorMessage: () => S,
  ParseErrorWithComponentValues: () => ParseErrorWithComponentValues,
  calc: () => calc,
  calcFromComponentValues: () => calcFromComponentValues,
  mathFunctionNames: () => Q
});
module.exports = __toCommonJS(stdin_exports);
var import_css_parser_algorithms = require("@csstools/css-parser-algorithms");
var import_css_tokenizer = require("@csstools/css-tokenizer");
class ParseError extends Error {
  sourceStart;
  sourceEnd;
  constructor(e2, n2, t2) {
    super(e2), this.name = "ParseError", this.sourceStart = n2, this.sourceEnd = t2;
  }
}
class ParseErrorWithComponentValues extends ParseError {
  componentValues;
  constructor(n2, t2) {
    super(n2, ...(0, import_css_parser_algorithms.sourceIndices)(t2)), this.componentValues = t2;
  }
}
const S = { UnexpectedAdditionOfDimensionOrPercentageWithNumber: "Unexpected addition of a dimension or percentage with a number.", UnexpectedSubtractionOfDimensionOrPercentageWithNumber: "Unexpected subtraction of a dimension or percentage with a number." }, y = /[A-Z]/g;
function toLowerCaseAZ(e2) {
  return e2.replace(y, (e3) => String.fromCharCode(e3.charCodeAt(0) + 32));
}
const I = { cm: "px", in: "px", mm: "px", pc: "px", pt: "px", px: "px", q: "px", deg: "deg", grad: "deg", rad: "deg", turn: "deg", ms: "s", s: "s", hz: "hz", khz: "hz" }, x = /* @__PURE__ */ new Map([["cm", (e2) => e2], ["mm", (e2) => 10 * e2], ["q", (e2) => 40 * e2], ["in", (e2) => e2 / 2.54], ["pc", (e2) => e2 / 2.54 * 6], ["pt", (e2) => e2 / 2.54 * 72], ["px", (e2) => e2 / 2.54 * 96]]), M = /* @__PURE__ */ new Map([["deg", (e2) => e2], ["grad", (e2) => e2 / 0.9], ["rad", (e2) => e2 / 180 * Math.PI], ["turn", (e2) => e2 / 360]]), T = /* @__PURE__ */ new Map([["deg", (e2) => 0.9 * e2], ["grad", (e2) => e2], ["rad", (e2) => 0.9 * e2 / 180 * Math.PI], ["turn", (e2) => 0.9 * e2 / 360]]), P = /* @__PURE__ */ new Map([["hz", (e2) => e2], ["khz", (e2) => e2 / 1e3]]), k = /* @__PURE__ */ new Map([["cm", (e2) => 2.54 * e2], ["mm", (e2) => 25.4 * e2], ["q", (e2) => 25.4 * e2 * 4], ["in", (e2) => e2], ["pc", (e2) => 6 * e2], ["pt", (e2) => 72 * e2], ["px", (e2) => 96 * e2]]), W = /* @__PURE__ */ new Map([["hz", (e2) => 1e3 * e2], ["khz", (e2) => e2]]), O = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 10], ["mm", (e2) => e2], ["q", (e2) => 4 * e2], ["in", (e2) => e2 / 25.4], ["pc", (e2) => e2 / 25.4 * 6], ["pt", (e2) => e2 / 25.4 * 72], ["px", (e2) => e2 / 25.4 * 96]]), U = /* @__PURE__ */ new Map([["ms", (e2) => e2], ["s", (e2) => e2 / 1e3]]), L = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 6 * 2.54], ["mm", (e2) => e2 / 6 * 25.4], ["q", (e2) => e2 / 6 * 25.4 * 4], ["in", (e2) => e2 / 6], ["pc", (e2) => e2], ["pt", (e2) => e2 / 6 * 72], ["px", (e2) => e2 / 6 * 96]]), $ = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 72 * 2.54], ["mm", (e2) => e2 / 72 * 25.4], ["q", (e2) => e2 / 72 * 25.4 * 4], ["in", (e2) => e2 / 72], ["pc", (e2) => e2 / 72 * 6], ["pt", (e2) => e2], ["px", (e2) => e2 / 72 * 96]]), V = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 96 * 2.54], ["mm", (e2) => e2 / 96 * 25.4], ["q", (e2) => e2 / 96 * 25.4 * 4], ["in", (e2) => e2 / 96], ["pc", (e2) => e2 / 96 * 6], ["pt", (e2) => e2 / 96 * 72], ["px", (e2) => e2]]), Z = /* @__PURE__ */ new Map([["cm", (e2) => e2 / 4 / 10], ["mm", (e2) => e2 / 4], ["q", (e2) => e2], ["in", (e2) => e2 / 4 / 25.4], ["pc", (e2) => e2 / 4 / 25.4 * 6], ["pt", (e2) => e2 / 4 / 25.4 * 72], ["px", (e2) => e2 / 4 / 25.4 * 96]]), z = /* @__PURE__ */ new Map([["deg", (e2) => 180 * e2 / Math.PI], ["grad", (e2) => 180 * e2 / Math.PI / 0.9], ["rad", (e2) => e2], ["turn", (e2) => 180 * e2 / Math.PI / 360]]), q = /* @__PURE__ */ new Map([["ms", (e2) => 1e3 * e2], ["s", (e2) => e2]]), R = /* @__PURE__ */ new Map([["deg", (e2) => 360 * e2], ["grad", (e2) => 360 * e2 / 0.9], ["rad", (e2) => 360 * e2 / 180 * Math.PI], ["turn", (e2) => e2]]), G = /* @__PURE__ */ new Map([["cm", x], ["mm", O], ["q", Z], ["in", k], ["pc", L], ["pt", $], ["px", V], ["ms", U], ["s", q], ["deg", M], ["grad", T], ["rad", z], ["turn", R], ["hz", P], ["khz", W]]);
function convertUnit(e2, n2) {
  if (!(0, import_css_tokenizer.isTokenDimension)(e2)) return n2;
  if (!(0, import_css_tokenizer.isTokenDimension)(n2)) return n2;
  const t2 = toLowerCaseAZ(e2[4].unit), r2 = toLowerCaseAZ(n2[4].unit);
  if (t2 === r2) return n2;
  const u2 = G.get(r2);
  if (!u2) return n2;
  const a2 = u2.get(t2);
  if (!a2) return n2;
  const o2 = a2(n2[4].value), i2 = [import_css_tokenizer.TokenType.Dimension, "", n2[2], n2[3], { ...n2[4], signCharacter: o2 < 0 ? "-" : void 0, type: Number.isInteger(o2) ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number, value: o2 }];
  return (0, import_css_tokenizer.mutateUnit)(i2, e2[4].unit), i2;
}
function toCanonicalUnit(e2) {
  if (!(0, import_css_tokenizer.isTokenDimension)(e2)) return e2;
  const n2 = toLowerCaseAZ(e2[4].unit), t2 = I[n2];
  if (n2 === t2) return e2;
  const r2 = G.get(n2);
  if (!r2) return e2;
  const u2 = r2.get(t2);
  if (!u2) return e2;
  const a2 = u2(e2[4].value), o2 = [import_css_tokenizer.TokenType.Dimension, "", e2[2], e2[3], { ...e2[4], signCharacter: a2 < 0 ? "-" : void 0, type: Number.isInteger(a2) ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number, value: a2 }];
  return (0, import_css_tokenizer.mutateUnit)(o2, t2), o2;
}
function addition(e2, t2) {
  if (2 !== e2.length) return -1;
  const r2 = e2[0].value;
  let u2 = e2[1].value;
  if ((0, import_css_tokenizer.isTokenNumber)(r2) && (0, import_css_tokenizer.isTokenNumber)(u2)) {
    const e3 = r2[4].value + u2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, e3.toString(), r2[2], u2[3], { value: e3, type: r2[4].type === import_css_tokenizer.NumberType.Integer && u2[4].type === import_css_tokenizer.NumberType.Integer ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number }]);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(r2) && (0, import_css_tokenizer.isTokenPercentage)(u2)) {
    const e3 = r2[4].value + u2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, e3.toString() + "%", r2[2], u2[3], { value: e3 }]);
  }
  if ((0, import_css_tokenizer.isTokenDimension)(r2) && (0, import_css_tokenizer.isTokenDimension)(u2) && (u2 = convertUnit(r2, u2), toLowerCaseAZ(r2[4].unit) === toLowerCaseAZ(u2[4].unit))) {
    const e3 = r2[4].value + u2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Dimension, e3.toString() + r2[4].unit, r2[2], u2[3], { value: e3, type: r2[4].type === import_css_tokenizer.NumberType.Integer && u2[4].type === import_css_tokenizer.NumberType.Integer ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number, unit: r2[4].unit }]);
  }
  return ((0, import_css_tokenizer.isTokenNumber)(r2) && ((0, import_css_tokenizer.isTokenDimension)(u2) || (0, import_css_tokenizer.isTokenPercentage)(u2)) || (0, import_css_tokenizer.isTokenNumber)(u2) && ((0, import_css_tokenizer.isTokenDimension)(r2) || (0, import_css_tokenizer.isTokenPercentage)(r2))) && t2.onParseError?.(new ParseErrorWithComponentValues(S.UnexpectedAdditionOfDimensionOrPercentageWithNumber, e2)), -1;
}
function division(e2) {
  if (2 !== e2.length) return -1;
  const t2 = e2[0].value, r2 = e2[1].value;
  if ((0, import_css_tokenizer.isTokenNumber)(t2) && (0, import_css_tokenizer.isTokenNumber)(r2)) {
    const e3 = t2[4].value / r2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, e3.toString(), t2[2], r2[3], { value: e3, type: Number.isInteger(e3) ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number }]);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(t2) && (0, import_css_tokenizer.isTokenNumber)(r2)) {
    const e3 = t2[4].value / r2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, e3.toString() + "%", t2[2], r2[3], { value: e3 }]);
  }
  if ((0, import_css_tokenizer.isTokenDimension)(t2) && (0, import_css_tokenizer.isTokenNumber)(r2)) {
    const e3 = t2[4].value / r2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Dimension, e3.toString() + t2[4].unit, t2[2], r2[3], { value: e3, type: Number.isInteger(e3) ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number, unit: t2[4].unit }]);
  }
  return -1;
}
function isCalculation(e2) {
  return !!e2 && "object" == typeof e2 && "inputs" in e2 && Array.isArray(e2.inputs) && "operation" in e2;
}
function solve(e2, n2) {
  if (-1 === e2) return -1;
  const r2 = [{ calculation: e2, inputs: [], index: 0 }];
  let u2 = -1;
  for (; r2.length; ) {
    const e3 = r2[r2.length - 1];
    if (e3.index < e3.calculation.inputs.length) {
      const n3 = e3.calculation.inputs[e3.index];
      if (e3.index++, (0, import_css_parser_algorithms.isTokenNode)(n3)) {
        e3.inputs.push(n3);
        continue;
      }
      r2.push({ calculation: n3, inputs: [], index: 0 });
      continue;
    }
    const a2 = e3.calculation.operation(e3.inputs, n2);
    if (r2.pop(), -1 === a2) return -1;
    if (!r2.length) {
      u2 = a2;
      break;
    }
    r2[r2.length - 1].inputs.push(a2);
  }
  return u2;
}
function multiplication(e2) {
  if (2 !== e2.length) return -1;
  const t2 = e2[0].value, r2 = e2[1].value;
  if ((0, import_css_tokenizer.isTokenNumber)(t2) && (0, import_css_tokenizer.isTokenNumber)(r2)) {
    const e3 = t2[4].value * r2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, e3.toString(), t2[2], r2[3], { value: e3, type: t2[4].type === import_css_tokenizer.NumberType.Integer && r2[4].type === import_css_tokenizer.NumberType.Integer ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number }]);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(t2) && (0, import_css_tokenizer.isTokenNumber)(r2)) {
    const e3 = t2[4].value * r2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, e3.toString() + "%", t2[2], r2[3], { value: e3 }]);
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2) && (0, import_css_tokenizer.isTokenPercentage)(r2)) {
    const e3 = t2[4].value * r2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, e3.toString() + "%", t2[2], r2[3], { value: e3 }]);
  }
  if ((0, import_css_tokenizer.isTokenDimension)(t2) && (0, import_css_tokenizer.isTokenNumber)(r2)) {
    const e3 = t2[4].value * r2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Dimension, e3.toString() + t2[4].unit, t2[2], r2[3], { value: e3, type: t2[4].type === import_css_tokenizer.NumberType.Integer && r2[4].type === import_css_tokenizer.NumberType.Integer ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number, unit: t2[4].unit }]);
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2) && (0, import_css_tokenizer.isTokenDimension)(r2)) {
    const e3 = t2[4].value * r2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Dimension, e3.toString() + r2[4].unit, t2[2], r2[3], { value: e3, type: t2[4].type === import_css_tokenizer.NumberType.Integer && r2[4].type === import_css_tokenizer.NumberType.Integer ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number, unit: r2[4].unit }]);
  }
  return -1;
}
function resolveGlobalsAndConstants(e2, r2) {
  for (let u2 = 0; u2 < e2.length; u2++) {
    const a2 = e2[u2];
    if (!(0, import_css_parser_algorithms.isTokenNode)(a2)) continue;
    const o2 = a2.value;
    if (!(0, import_css_tokenizer.isTokenIdent)(o2)) continue;
    const i2 = toLowerCaseAZ(o2[4].value);
    switch (i2) {
      case "e":
        e2.splice(u2, 1, new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, Math.E.toString(), o2[2], o2[3], { value: Math.E, type: import_css_tokenizer.NumberType.Number }]));
        break;
      case "pi":
        e2.splice(u2, 1, new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, Math.PI.toString(), o2[2], o2[3], { value: Math.PI, type: import_css_tokenizer.NumberType.Number }]));
        break;
      case "infinity":
        e2.splice(u2, 1, new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, "infinity", o2[2], o2[3], { value: 1 / 0, type: import_css_tokenizer.NumberType.Number }]));
        break;
      case "-infinity":
        e2.splice(u2, 1, new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, "-infinity", o2[2], o2[3], { value: -1 / 0, type: import_css_tokenizer.NumberType.Number }]));
        break;
      case "nan":
        e2.splice(u2, 1, new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, "NaN", o2[2], o2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }]));
        break;
      default:
        if (r2.has(i2)) {
          const t2 = r2.get(i2);
          e2.splice(u2, 1, new import_css_parser_algorithms.TokenNode(t2));
        }
    }
  }
  return e2;
}
function unary(e2) {
  if (1 !== e2.length) return -1;
  const n2 = e2[0].value;
  return (0, import_css_tokenizer.isTokenNumeric)(n2) ? e2[0] : -1;
}
function resultToCalculation(e2, n2, t2) {
  return (0, import_css_tokenizer.isTokenDimension)(n2) ? dimensionToCalculation(e2, n2[4].unit, t2) : (0, import_css_tokenizer.isTokenPercentage)(n2) ? percentageToCalculation(e2, t2) : (0, import_css_tokenizer.isTokenNumber)(n2) ? numberToCalculation(e2, t2) : -1;
}
function dimensionToCalculation(e2, t2, r2) {
  const u2 = e2.tokens();
  return { inputs: [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Dimension, r2.toString() + t2, u2[0][2], u2[u2.length - 1][3], { value: r2, type: Number.isInteger(r2) ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number, unit: t2 }])], operation: unary };
}
function percentageToCalculation(e2, t2) {
  const r2 = e2.tokens();
  return { inputs: [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, t2.toString() + "%", r2[0][2], r2[r2.length - 1][3], { value: t2 }])], operation: unary };
}
function numberToCalculation(e2, t2) {
  const r2 = e2.tokens();
  return { inputs: [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, t2.toString(), r2[0][2], r2[r2.length - 1][3], { value: t2, type: Number.isInteger(t2) ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number }])], operation: unary };
}
function solveACos(e2, n2) {
  const t2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumber)(t2)) return -1;
  return dimensionToCalculation(e2, "rad", Math.acos(t2[4].value));
}
function solveASin(e2, n2) {
  const t2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumber)(t2)) return -1;
  return dimensionToCalculation(e2, "rad", Math.asin(t2[4].value));
}
function solveATan(e2, n2) {
  const t2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumber)(t2)) return -1;
  return dimensionToCalculation(e2, "rad", Math.atan(t2[4].value));
}
function isDimensionOrNumber(e2) {
  return (0, import_css_tokenizer.isTokenDimension)(e2) || (0, import_css_tokenizer.isTokenNumber)(e2);
}
function arrayOfSameNumeric(e2) {
  if (0 === e2.length) return true;
  const n2 = e2[0];
  if (!(0, import_css_tokenizer.isTokenNumeric)(n2)) return false;
  if (1 === e2.length) return true;
  if ((0, import_css_tokenizer.isTokenDimension)(n2)) {
    const t2 = toLowerCaseAZ(n2[4].unit);
    for (let r2 = 1; r2 < e2.length; r2++) {
      const u2 = e2[r2];
      if (n2[0] !== u2[0]) return false;
      if (t2 !== toLowerCaseAZ(u2[4].unit)) return false;
    }
    return true;
  }
  for (let t2 = 1; t2 < e2.length; t2++) {
    const r2 = e2[t2];
    if (n2[0] !== r2[0]) return false;
  }
  return true;
}
function twoOfSameNumeric(e2, n2) {
  return !!(0, import_css_tokenizer.isTokenNumeric)(e2) && ((0, import_css_tokenizer.isTokenDimension)(e2) ? e2[0] === n2[0] && toLowerCaseAZ(e2[4].unit) === toLowerCaseAZ(n2[4].unit) : e2[0] === n2[0]);
}
function solveATan2(e2, n2, t2) {
  const r2 = n2.value;
  if (!isDimensionOrNumber(r2)) return -1;
  const u2 = convertUnit(r2, t2.value);
  if (!twoOfSameNumeric(r2, u2)) return -1;
  return dimensionToCalculation(e2, "rad", Math.atan2(r2[4].value, u2[4].value));
}
function solveAbs(e2, n2, t2) {
  const r2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(r2)) return -1;
  if (Number.isNaN(r2[4].value)) return resultToCalculation(e2, r2, Number.NaN);
  if (!t2.rawPercentages && (0, import_css_tokenizer.isTokenPercentage)(r2)) return -1;
  return resultToCalculation(e2, r2, Math.abs(r2[4].value));
}
function solveClamp(e2, n2, r2, u2, a2) {
  if (!(0, import_css_parser_algorithms.isTokenNode)(n2) || !(0, import_css_parser_algorithms.isTokenNode)(r2) || !(0, import_css_parser_algorithms.isTokenNode)(u2)) return -1;
  const o2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(o2)) return -1;
  const i2 = convertUnit(o2, r2.value);
  if (!twoOfSameNumeric(o2, i2)) return -1;
  const l2 = convertUnit(o2, u2.value);
  if (!twoOfSameNumeric(o2, l2)) return -1;
  if (Number.isNaN(o2[4].value) || Number.isNaN(i2[4].value) || Number.isNaN(l2[4].value)) return resultToCalculation(e2, o2, Number.NaN);
  if (!a2.rawPercentages && (0, import_css_tokenizer.isTokenPercentage)(o2)) return -1;
  return resultToCalculation(e2, o2, Math.max(o2[4].value, Math.min(i2[4].value, l2[4].value)));
}
function solveCos(e2, n2) {
  const t2 = n2.value;
  if (!isDimensionOrNumber(t2)) return -1;
  let r2 = t2[4].value;
  if ((0, import_css_tokenizer.isTokenDimension)(t2)) switch (t2[4].unit.toLowerCase()) {
    case "rad":
      break;
    case "deg":
      r2 = M.get("rad")(t2[4].value);
      break;
    case "grad":
      r2 = T.get("rad")(t2[4].value);
      break;
    case "turn":
      r2 = R.get("rad")(t2[4].value);
      break;
    default:
      return -1;
  }
  return r2 = Math.cos(r2), numberToCalculation(e2, r2);
}
function solveExp(e2, n2) {
  const t2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumber)(t2)) return -1;
  return numberToCalculation(e2, Math.exp(t2[4].value));
}
function solveHypot(e2, n2, r2) {
  if (!n2.every(import_css_parser_algorithms.isTokenNode)) return -1;
  const u2 = n2[0].value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(u2)) return -1;
  const a2 = n2.map((e3) => convertUnit(u2, e3.value));
  if (!arrayOfSameNumeric(a2)) return -1;
  if (a2.some((e3) => Number.isNaN(e3[4].value))) return resultToCalculation(e2, u2, Number.NaN);
  if (!r2.rawPercentages && (0, import_css_tokenizer.isTokenPercentage)(u2)) return -1;
  const o2 = a2.map((e3) => e3[4].value);
  if (o2.some(Number.isNaN)) return resultToCalculation(e2, u2, Number.NaN);
  const i2 = Math.hypot(...o2);
  return resultToCalculation(e2, u2, i2);
}
function solveMax(e2, n2, r2) {
  if (!n2.every(import_css_parser_algorithms.isTokenNode)) return -1;
  const u2 = n2[0].value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(u2)) return -1;
  const a2 = n2.map((e3) => convertUnit(u2, e3.value));
  if (!arrayOfSameNumeric(a2)) return -1;
  if (a2.some((e3) => Number.isNaN(e3[4].value))) return resultToCalculation(e2, u2, Number.NaN);
  if (!r2.rawPercentages && (0, import_css_tokenizer.isTokenPercentage)(u2)) return -1;
  const o2 = a2.map((e3) => e3[4].value), i2 = Math.max(...o2);
  return resultToCalculation(e2, u2, i2);
}
function solveMin(e2, n2, r2) {
  if (!n2.every(import_css_parser_algorithms.isTokenNode)) return -1;
  const u2 = n2[0].value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(u2)) return -1;
  const a2 = n2.map((e3) => convertUnit(u2, e3.value));
  if (!arrayOfSameNumeric(a2)) return -1;
  if (a2.some((e3) => Number.isNaN(e3[4].value))) return resultToCalculation(e2, u2, Number.NaN);
  if (!r2.rawPercentages && (0, import_css_tokenizer.isTokenPercentage)(u2)) return -1;
  const o2 = a2.map((e3) => e3[4].value), i2 = Math.min(...o2);
  return resultToCalculation(e2, u2, i2);
}
function solveMod(e2, n2, t2) {
  const r2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(r2)) return -1;
  const u2 = convertUnit(r2, t2.value);
  if (!twoOfSameNumeric(r2, u2)) return -1;
  let a2;
  return a2 = Number.isNaN(r2[4].value) || Number.isNaN(u2[4].value) || 0 === u2[4].value ? Number.NaN : Number.isFinite(r2[4].value) && (Number.isFinite(u2[4].value) || (u2[4].value !== Number.POSITIVE_INFINITY || r2[4].value !== Number.NEGATIVE_INFINITY && !Object.is(0 * r2[4].value, -0)) && (u2[4].value !== Number.NEGATIVE_INFINITY || r2[4].value !== Number.POSITIVE_INFINITY && !Object.is(0 * r2[4].value, 0))) ? Number.isFinite(u2[4].value) ? (r2[4].value % u2[4].value + u2[4].value) % u2[4].value : r2[4].value : Number.NaN, resultToCalculation(e2, r2, a2);
}
function solvePow(e2, n2, t2) {
  const r2 = n2.value, u2 = t2.value;
  if (!(0, import_css_tokenizer.isTokenNumber)(r2)) return -1;
  if (!twoOfSameNumeric(r2, u2)) return -1;
  if (Number.isNaN(r2[4].value) || Number.isNaN(u2[4].value)) return numberToCalculation(e2, Number.NaN);
  return numberToCalculation(e2, Math.pow(r2[4].value, u2[4].value));
}
function solveRem(e2, n2, t2) {
  const r2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(r2)) return -1;
  const u2 = convertUnit(r2, t2.value);
  if (!twoOfSameNumeric(r2, u2)) return -1;
  let a2;
  return a2 = Number.isNaN(r2[4].value) || Number.isNaN(u2[4].value) || 0 === u2[4].value ? Number.NaN : Number.isFinite(r2[4].value) ? Number.isFinite(u2[4].value) ? r2[4].value % u2[4].value : r2[4].value : Number.NaN, resultToCalculation(e2, r2, a2);
}
function snapAsBorderWidth(e2, n2, t2) {
  if (!(0, import_css_tokenizer.isTokenDimension)(n2)) return -1;
  const r2 = t2.devicePixelLength ?? 1, u2 = [import_css_tokenizer.TokenType.Dimension, `${r2}px`, n2[2], n2[3], { value: r2, type: import_css_tokenizer.NumberType.Integer, unit: "px" }], a2 = convertUnit(u2, n2);
  if (!twoOfSameNumeric(a2, u2)) return -1;
  if (Number.isInteger(a2[4].value / r2)) return resultToCalculation(e2, n2, n2[4].value);
  if (a2[4].value > 0) {
    if (a2[4].value < r2) return resultToCalculation(e2, n2, convertUnit(n2, u2)[4].value);
    const t3 = Math.floor(a2[4].value / u2[4].value) * u2[4].value;
    return a2[4].value = t3, resultToCalculation(e2, n2, convertUnit(n2, a2)[4].value);
  }
  if (Math.abs(a2[4].value) < r2) return resultToCalculation(e2, n2, -1 * convertUnit(n2, u2)[4].value);
  const o2 = Math.ceil(a2[4].value / u2[4].value) * u2[4].value;
  return a2[4].value = o2, resultToCalculation(e2, n2, convertUnit(n2, a2)[4].value);
}
function solveRound(e2, n2, t2, r2, u2) {
  const a2 = t2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(a2)) return -1;
  if ("line-width" === n2 && !(0, import_css_tokenizer.isTokenDimension)(a2)) return -1;
  const o2 = convertUnit(a2, r2.value);
  if (!twoOfSameNumeric(a2, o2)) return -1;
  if (Number.isNaN(a2[4].value) || Number.isNaN(o2[4].value)) return resultToCalculation(e2, a2, Number.NaN);
  if (!u2.rawPercentages && (0, import_css_tokenizer.isTokenPercentage)(a2)) return -1;
  let i2;
  if (0 === o2[4].value) i2 = Number.NaN;
  else if (Number.isFinite(a2[4].value) || Number.isFinite(o2[4].value)) if (!Number.isFinite(a2[4].value) && Number.isFinite(o2[4].value)) i2 = a2[4].value;
  else if (Number.isFinite(a2[4].value) && !Number.isFinite(o2[4].value)) switch (n2) {
    case "down":
      i2 = a2[4].value < 0 ? -1 / 0 : Object.is(-0, 0 * a2[4].value) ? -0 : 0;
      break;
    case "up":
      i2 = a2[4].value > 0 ? 1 / 0 : Object.is(0, 0 * a2[4].value) ? 0 : -0;
      break;
    default:
      i2 = Object.is(0, 0 * a2[4].value) ? 0 : -0;
  }
  else switch (n2) {
    case "down":
      i2 = (o2[4].value > 0 ? Math.floor : Math.ceil)(a2[4].value / o2[4].value) * o2[4].value;
      break;
    case "up":
      i2 = (o2[4].value > 0 ? Math.ceil : Math.floor)(a2[4].value / o2[4].value) * o2[4].value;
      break;
    case "to-zero":
      i2 = Math.trunc(a2[4].value / o2[4].value) * o2[4].value;
      break;
    default: {
      let t3 = Math.floor(a2[4].value / o2[4].value) * o2[4].value, r3 = Math.ceil(a2[4].value / o2[4].value) * o2[4].value;
      if (t3 > r3) {
        const e3 = t3;
        t3 = r3, r3 = e3;
      }
      const l2 = Math.abs(a2[4].value - t3), c2 = Math.abs(a2[4].value - r3);
      if (i2 = "line-width" !== n2 || 0 !== r3 && 0 !== t3 ? l2 === c2 ? r3 : l2 < c2 ? t3 : r3 : 0 !== r3 ? r3 : t3, "line-width" === n2) {
        const n3 = solve(resultToCalculation(e2, a2, i2), u2);
        return -1 === n3 ? -1 : snapAsBorderWidth(e2, n3.value, u2);
      }
      break;
    }
  }
  else i2 = Number.NaN;
  return resultToCalculation(e2, a2, i2);
}
function solveSign(e2, n2, t2) {
  const r2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(r2)) return -1;
  if (Number.isNaN(r2[4].value)) return numberToCalculation(e2, Number.NaN);
  if (!t2.rawPercentages && (0, import_css_tokenizer.isTokenPercentage)(r2)) return -1;
  return numberToCalculation(e2, Math.sign(r2[4].value));
}
function solveSin(e2, n2) {
  const t2 = n2.value;
  if (!isDimensionOrNumber(t2)) return -1;
  let r2 = t2[4].value;
  if ((0, import_css_tokenizer.isTokenDimension)(t2)) switch (toLowerCaseAZ(t2[4].unit)) {
    case "rad":
      break;
    case "deg":
      r2 = M.get("rad")(t2[4].value);
      break;
    case "grad":
      r2 = T.get("rad")(t2[4].value);
      break;
    case "turn":
      r2 = R.get("rad")(t2[4].value);
      break;
    default:
      return -1;
  }
  return r2 = Math.sin(r2), numberToCalculation(e2, r2);
}
function solveSqrt(e2, n2) {
  const t2 = n2.value;
  if (!(0, import_css_tokenizer.isTokenNumber)(t2)) return -1;
  return numberToCalculation(e2, Math.sqrt(t2[4].value));
}
function solveTan(e2, n2) {
  const t2 = n2.value;
  if (!isDimensionOrNumber(t2)) return -1;
  const r2 = t2[4].value;
  let u2 = 0, a2 = t2[4].value;
  if ((0, import_css_tokenizer.isTokenDimension)(t2)) switch (toLowerCaseAZ(t2[4].unit)) {
    case "rad":
      u2 = z.get("deg")(r2);
      break;
    case "deg":
      u2 = r2, a2 = M.get("rad")(r2);
      break;
    case "grad":
      u2 = T.get("deg")(r2), a2 = T.get("rad")(r2);
      break;
    case "turn":
      u2 = R.get("deg")(r2), a2 = R.get("rad")(r2);
      break;
    default:
      return -1;
  }
  const o2 = u2 / 90;
  return a2 = u2 % 90 == 0 && o2 % 2 != 0 ? (o2 % 4 + 4) % 4 == 1 ? 1 / 0 : -1 / 0 : Math.tan(a2), numberToCalculation(e2, a2);
}
function subtraction(e2, t2) {
  if (2 !== e2.length) return -1;
  const r2 = e2[0].value;
  let u2 = e2[1].value;
  if ((0, import_css_tokenizer.isTokenNumber)(r2) && (0, import_css_tokenizer.isTokenNumber)(u2)) {
    const e3 = r2[4].value - u2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, e3.toString(), r2[2], u2[3], { value: e3, type: r2[4].type === import_css_tokenizer.NumberType.Integer && u2[4].type === import_css_tokenizer.NumberType.Integer ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number }]);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(r2) && (0, import_css_tokenizer.isTokenPercentage)(u2)) {
    const e3 = r2[4].value - u2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, e3.toString() + "%", r2[2], u2[3], { value: e3 }]);
  }
  if ((0, import_css_tokenizer.isTokenDimension)(r2) && (0, import_css_tokenizer.isTokenDimension)(u2) && (u2 = convertUnit(r2, u2), toLowerCaseAZ(r2[4].unit) === toLowerCaseAZ(u2[4].unit))) {
    const e3 = r2[4].value - u2[4].value;
    return new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Dimension, e3.toString() + r2[4].unit, r2[2], u2[3], { value: e3, type: r2[4].type === import_css_tokenizer.NumberType.Integer && u2[4].type === import_css_tokenizer.NumberType.Integer ? import_css_tokenizer.NumberType.Integer : import_css_tokenizer.NumberType.Number, unit: r2[4].unit }]);
  }
  return ((0, import_css_tokenizer.isTokenNumber)(r2) && ((0, import_css_tokenizer.isTokenDimension)(u2) || (0, import_css_tokenizer.isTokenPercentage)(u2)) || (0, import_css_tokenizer.isTokenNumber)(u2) && ((0, import_css_tokenizer.isTokenDimension)(r2) || (0, import_css_tokenizer.isTokenPercentage)(r2))) && t2.onParseError?.(new ParseErrorWithComponentValues(S.UnexpectedSubtractionOfDimensionOrPercentageWithNumber, e2)), -1;
}
function solveLog(e2, n2) {
  if (1 === n2.length) {
    const r2 = n2[0];
    if (!r2 || !(0, import_css_parser_algorithms.isTokenNode)(r2)) return -1;
    const u2 = r2.value;
    if (!(0, import_css_tokenizer.isTokenNumber)(u2)) return -1;
    return numberToCalculation(e2, Math.log(u2[4].value));
  }
  if (2 === n2.length) {
    const r2 = n2[0];
    if (!r2 || !(0, import_css_parser_algorithms.isTokenNode)(r2)) return -1;
    const u2 = r2.value;
    if (!(0, import_css_tokenizer.isTokenNumber)(u2)) return -1;
    const a2 = n2[1];
    if (!a2 || !(0, import_css_parser_algorithms.isTokenNode)(a2)) return -1;
    const o2 = a2.value;
    if (!(0, import_css_tokenizer.isTokenNumber)(o2)) return -1;
    if (Number.isNaN(u2[4].value) || Number.isNaN(o2[4].value)) return numberToCalculation(e2, Number.NaN);
    if (1 === o2[4].value || o2[4].value <= 0) return numberToCalculation(e2, Number.NaN);
    if (1 === u2[4].value) return numberToCalculation(e2, 0);
    return numberToCalculation(e2, Math.log(u2[4].value) / Math.log(o2[4].value));
  }
  return -1;
}
const j = /^none$/i;
function isNone(e2) {
  if (Array.isArray(e2)) {
    const n3 = e2.filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3));
    return 1 === n3.length && isNone(n3[0]);
  }
  if (!(0, import_css_parser_algorithms.isTokenNode)(e2)) return false;
  const n2 = e2.value;
  return !!(0, import_css_tokenizer.isTokenIdent)(n2) && j.test(n2[4].value);
}
function patchPrecision(e2, n2 = 13) {
  if (-1 === e2) return -1;
  if (n2 <= 0) return e2;
  if ((0, import_css_parser_algorithms.isFunctionNode)(e2)) return e2;
  const t2 = e2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(t2)) return e2;
  if (shouldSkipPrecisionRounding(t2[4].value)) return e2;
  const r2 = roundToPrecision(t2[4].value, n2).toString();
  return (0, import_css_tokenizer.isTokenNumber)(t2) ? t2[1] = r2 : (0, import_css_tokenizer.isTokenPercentage)(t2) ? t2[1] = r2 + "%" : (0, import_css_tokenizer.isTokenDimension)(t2) && (t2[1] = r2 + t2[4].unit), e2;
}
function shouldSkipPrecisionRounding(e2) {
  if (!Number.isFinite(e2) || 0 === e2) return true;
  if (Number.isInteger(e2)) return true;
  const n2 = e2.toString();
  return n2.includes("e") || n2.includes("E");
}
function roundToPrecision(e2, n2 = 13) {
  return shouldSkipPrecisionRounding(e2) ? e2 : Number(e2.toFixed(n2));
}
const Y = String.fromCodePoint(0);
function solveRandom(e2, n2, t2, r2, u2, a2) {
  if (-1 === n2.fixed && !a2.randomCaching) return -1;
  const o2 = t2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(o2)) return -1;
  const i2 = convertUnit(o2, r2.value);
  if (!twoOfSameNumeric(o2, i2)) return -1;
  let l2 = null;
  if (u2 && (l2 = convertUnit(o2, u2.value), !twoOfSameNumeric(o2, l2))) return -1;
  if (Number.isNaN(o2[4].value) || Number.isNaN(i2[4].value)) return resultToCalculation(e2, o2, Number.NaN);
  if (!Number.isFinite(o2[4].value)) return resultToCalculation(e2, o2, o2[4].value);
  if (!Number.isFinite(i2[4].value) || !Number.isFinite(i2[4].value - o2[4].value)) return resultToCalculation(e2, o2, Number.NaN);
  if (l2) {
    if (Number.isNaN(l2[4].value)) return resultToCalculation(e2, o2, Number.NaN);
    if (!Number.isFinite(l2[4].value)) return resultToCalculation(e2, o2, o2[4].value);
  }
  const c2 = -1 !== n2.fixed ? () => n2.fixed : (a2.randomCaching.propertyN || (a2.randomCaching.propertyN = 0), sfc32(crc32([n2.dashedIdent ? n2.dashedIdent : "", n2.elementScoped ? a2.randomCaching.elementID : "", n2.propertyScoped || n2.propertyIndexScoped ? a2.randomCaching.propertyName : "", n2.propertyIndexScoped ? a2.randomCaching.propertyN : "", a2.randomCaching.documentID].join(Y)))), s2 = o2[4].value;
  let v2 = i2[4].value;
  if (v2 < s2 && (v2 = s2), l2 && (l2[4].value <= 0 || Math.abs(s2 - v2) / l2[4].value > 1e10) && (l2 = null), l2) {
    const n3 = l2[4].value, t3 = Math.max(n3 / 1e3, 1e-9);
    let r3 = Math.floor((v2 - s2) / n3);
    Math.abs(s2 + r3 * n3 - v2) >= t3 && Math.abs(s2 + (r3 + 1) * n3 - v2) < t3 && (r3 += 1);
    const u3 = Math.floor(c2() * (r3 + 1));
    let a3 = s2 + u3 * n3;
    return u3 === r3 && Math.abs(a3 - v2) < t3 && (a3 = v2), resultToCalculation(e2, o2, roundToPrecision(a3, 5));
  }
  return resultToCalculation(e2, o2, roundToPrecision(c2() * (v2 - s2) + s2, 5));
}
function sfc32(e2 = 0.34944106645296036, n2 = 0.19228640875738723, t2 = 0.8784393832007205, r2 = 0.04850964319275053) {
  return () => {
    const u2 = ((e2 |= 0) + (n2 |= 0) | 0) + (r2 |= 0) | 0;
    return r2 = r2 + 1 | 0, e2 = n2 ^ n2 >>> 9, n2 = (t2 |= 0) + (t2 << 3) | 0, t2 = (t2 = t2 << 21 | t2 >>> 11) + u2 | 0, (u2 >>> 0) / 4294967296;
  };
}
const _ = (() => {
  const e2 = new Uint32Array(256);
  for (let n2 = 0; n2 < 256; n2++) e2[n2] = Number("0x" + "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".substring(9 * n2, 9 * n2 + 8));
  return e2;
})();
function crc32(e2) {
  let n2, t2, r2 = 0;
  r2 ^= -1;
  for (let u2 = 0, a2 = e2.length; u2 < a2; u2++) t2 = 255 & (r2 ^ e2.charCodeAt(u2)), n2 = _[t2], r2 = r2 >>> 8 ^ n2;
  return (-1 ^ r2) >>> 0;
}
function solveCalcMix(e2, n2) {
  const t2 = n2[0].calcSum.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(t2)) return -1;
  const r2 = n2.map((e3) => ({ calcSum: convertUnit(t2, e3.calcSum.value), percentage: e3.percentage }));
  if (!arrayOfSameNumeric(r2.map((e3) => e3.calcSum))) return -1;
  const { items: u2 } = normalizeMixPercentages(r2, false), a2 = u2.map((e3) => e3.calcSum[4].value * e3.percentage / 100);
  let o2 = 0;
  for (let e3 = 0; e3 < a2.length; e3++) o2 += a2[e3];
  return resultToCalculation(e2, t2, o2);
}
function normalizeMixPercentages(e2, n2 = false) {
  let t2 = 0, r2 = 0;
  for (const n3 of e2) n3.percentage && (t2 += n3.percentage), false === n3.percentage && r2++;
  t2 = Math.min(100, t2);
  for (const n3 of e2) false === n3.percentage && (n3.percentage = (100 - t2) / r2);
  const u2 = e2.slice();
  let a2 = 0;
  for (const e3 of u2) a2 += e3.percentage;
  if (a2 > 100 || a2 > 0 && n2) for (const e3 of u2) e3.percentage = e3.percentage * (100 / a2);
  let o2 = 0;
  return a2 < 100 && (o2 = 100 - a2), { items: u2, leftover: o2 };
}
const H = /* @__PURE__ */ new Map([["abs", function abs(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveAbs);
}], ["acos", function acos(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveACos);
}], ["asin", function asin(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveASin);
}], ["atan", function atan(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveATan);
}], ["atan2", function atan2(e2, n2, t2) {
  return twoCommaSeparatedNodesSolver(e2, n2, t2, solveATan2);
}], ["calc", calc$1], ["calc-mix", function calcMix(e2, n2, t2) {
  const r2 = variadicArgumentsCalcMix(e2, e2.value, n2, t2);
  if (-1 === r2) return -1;
  return solveCalcMix(e2, r2);
}], ["clamp", function clamp(u2, a2, i2) {
  const l2 = resolveGlobalsAndConstants([...u2.value.filter((e2) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e2))], a2), c2 = [], s2 = [], f2 = [];
  {
    let e2 = c2;
    for (let n2 = 0; n2 < l2.length; n2++) {
      const r2 = l2[n2];
      if ((0, import_css_parser_algorithms.isTokenNode)(r2) && (0, import_css_tokenizer.isTokenComma)(r2.value)) {
        if (e2 === f2) return -1;
        if (e2 === s2) {
          e2 = f2;
          continue;
        }
        if (e2 === c2) {
          e2 = s2;
          continue;
        }
        return -1;
      }
      e2.push(r2);
    }
  }
  const p2 = isNone(c2), m2 = isNone(f2);
  if (p2 && m2) return calc$1(calcWrapper(u2, s2), a2, i2);
  const d2 = solve(calc$1(calcWrapper(u2, s2), a2, i2), i2);
  if (-1 === d2) return -1;
  if (p2) {
    const t2 = solve(calc$1(calcWrapper(u2, f2), a2, i2), i2);
    return -1 === t2 ? -1 : solveMin((N2 = u2, C2 = d2, g2 = t2, new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "min(", N2.name[2], N2.name[3], { value: "min" }], [import_css_tokenizer.TokenType.CloseParen, ")", N2.endToken[2], N2.endToken[3], void 0], [C2, new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Comma, ",", ...(0, import_css_parser_algorithms.sourceIndices)(C2), void 0]), g2])), [d2, t2], i2);
  }
  if (m2) {
    const e2 = solve(calc$1(calcWrapper(u2, c2), a2, i2), i2);
    return -1 === e2 ? -1 : solveMax(maxWrapper(u2, e2, d2), [e2, d2], i2);
  }
  var N2, C2, g2;
  const h2 = solve(calc$1(calcWrapper(u2, c2), a2, i2), i2);
  if (-1 === h2) return -1;
  const b2 = solve(calc$1(calcWrapper(u2, f2), a2, i2), i2);
  if (-1 === b2) return -1;
  return solveClamp(u2, h2, d2, b2, i2);
}], ["cos", function cos(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveCos);
}], ["exp", function exp(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveExp);
}], ["hypot", function hypot(e2, n2, t2) {
  return variadicNodesSolver(e2, n2, t2, solveHypot);
}], ["log", function log(e2, n2, t2) {
  return variadicNodesSolver(e2, n2, t2, solveLog);
}], ["max", function max(e2, n2, t2) {
  return variadicNodesSolver(e2, n2, t2, solveMax);
}], ["min", function min(e2, n2, t2) {
  return variadicNodesSolver(e2, n2, t2, solveMin);
}], ["mod", function mod(e2, n2, t2) {
  return twoCommaSeparatedNodesSolver(e2, n2, t2, solveMod);
}], ["pow", function pow(e2, n2, t2) {
  return twoCommaSeparatedNodesSolver(e2, n2, t2, solvePow);
}], ["random", function random(e2, n2, t2) {
  const u2 = parseRandomValueSharing(e2, e2.value.filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3)), n2, t2);
  if (-1 === u2) return -1;
  const [a2, o2] = u2, i2 = variadicArguments(e2, o2, n2, t2);
  if (-1 === i2) return -1;
  const [l2, c2, s2] = i2;
  if (!l2 || !c2) return -1;
  return solveRandom(e2, a2, l2, c2, s2, t2);
}], ["rem", function rem(e2, n2, t2) {
  return twoCommaSeparatedNodesSolver(e2, n2, t2, solveRem);
}], ["round", function round(e2, u2, a2) {
  const o2 = resolveGlobalsAndConstants([...e2.value.filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3))], u2);
  let i2 = "", l2 = false;
  const c2 = [], p2 = [];
  {
    let e3 = c2;
    for (let n2 = 0; n2 < o2.length; n2++) {
      const r2 = o2[n2];
      if (!i2 && 0 === c2.length && 0 === p2.length && (0, import_css_parser_algorithms.isTokenNode)(r2) && (0, import_css_tokenizer.isTokenIdent)(r2.value)) {
        const e4 = r2.value[4].value.toLowerCase();
        if (K.has(e4)) {
          i2 = e4;
          continue;
        }
      }
      if ((0, import_css_parser_algorithms.isTokenNode)(r2) && (0, import_css_tokenizer.isTokenComma)(r2.value)) {
        if (e3 === p2) return -1;
        if (e3 === c2 && i2 && 0 === c2.length) continue;
        if (e3 === c2) {
          l2 = true, e3 = p2;
          continue;
        }
        return -1;
      }
      e3.push(r2);
    }
  }
  const m2 = solve(calc$1(calcWrapper(e2, c2), u2, a2), a2);
  if (-1 === m2) return -1;
  if ("line-width" === i2) {
    const e3 = convertUnit([import_css_tokenizer.TokenType.Dimension, "1px", m2.value[2], m2.value[3], { value: 1, type: import_css_tokenizer.NumberType.Integer, unit: "px" }], m2.value);
    if (!(0, import_css_tokenizer.isTokenDimension)(e3) || "px" !== e3[4].unit) return -1;
  }
  if (!l2 && 0 === p2.length) {
    if ("line-width" === i2) return snapAsBorderWidth(e2, m2.value, a2);
    p2.push(new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, "1", m2.value[2], m2.value[3], { value: 1, type: import_css_tokenizer.NumberType.Integer }]));
  }
  const d2 = solve(calc$1(calcWrapper(e2, p2), u2, a2), a2);
  if (-1 === d2) return -1;
  i2 || (i2 = "nearest");
  return solveRound(e2, i2, m2, d2, a2);
}], ["sign", function sign(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveSign);
}], ["sin", function sin(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveSin);
}], ["sqrt", function sqrt(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveSqrt);
}], ["tan", function tan(e2, n2, t2) {
  return singleNodeSolver(e2, n2, t2, solveTan);
}]]), J = 5e4;
function calc$1(e2, n2, o2) {
  const i2 = resolveGlobalsAndConstants([...e2.value.filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3))], n2);
  if (i2.length > J) throw new Error(`Maximum number of nodes in a math function (${J}) exceeded, reduce the complexity of your expression`);
  if (1 === i2.length && (0, import_css_parser_algorithms.isTokenNode)(i2[0])) return { inputs: [i2[0]], operation: unary };
  let l2 = 0;
  for (; l2 < i2.length; ) {
    const e3 = i2[l2];
    if ((0, import_css_parser_algorithms.isSimpleBlockNode)(e3) && (0, import_css_tokenizer.isTokenOpenParen)(e3.startToken)) {
      const t2 = calc$1(e3, n2, o2);
      if (-1 === t2) return -1;
      i2.splice(l2, 1, t2);
      continue;
    }
    if ((0, import_css_parser_algorithms.isFunctionNode)(e3)) {
      const t2 = H.get(e3.getName().toLowerCase());
      if (!t2) return -1;
      const r2 = t2(e3, n2, o2);
      if (-1 === r2) return -1;
      i2.splice(l2, 1, r2);
      continue;
    }
    l2++;
  }
  if (l2 = 0, 1 === i2.length && isCalculation(i2[0])) return i2[0];
  for (; l2 < i2.length; ) {
    const e3 = i2[l2];
    if (!e3 || !(0, import_css_parser_algorithms.isTokenNode)(e3) && !isCalculation(e3)) {
      l2++;
      continue;
    }
    const n3 = i2[l2 + 1];
    if (!n3 || !(0, import_css_parser_algorithms.isTokenNode)(n3)) {
      l2++;
      continue;
    }
    const r2 = n3.value;
    if (!(0, import_css_tokenizer.isTokenDelim)(r2) || "*" !== r2[4].value && "/" !== r2[4].value) {
      l2++;
      continue;
    }
    const u2 = i2[l2 + 2];
    if (!u2 || !(0, import_css_parser_algorithms.isTokenNode)(u2) && !isCalculation(u2)) return -1;
    "*" !== r2[4].value ? "/" !== r2[4].value ? l2++ : i2.splice(l2, 3, { inputs: [e3, u2], operation: division }) : i2.splice(l2, 3, { inputs: [e3, u2], operation: multiplication });
  }
  if (l2 = 0, 1 === i2.length && isCalculation(i2[0])) return i2[0];
  for (; l2 < i2.length; ) {
    const e3 = i2[l2];
    if (!e3 || !(0, import_css_parser_algorithms.isTokenNode)(e3) && !isCalculation(e3)) {
      l2++;
      continue;
    }
    const n3 = i2[l2 + 1];
    if (!n3 || !(0, import_css_parser_algorithms.isTokenNode)(n3)) {
      l2++;
      continue;
    }
    const r2 = n3.value;
    if (!(0, import_css_tokenizer.isTokenDelim)(r2) || "+" !== r2[4].value && "-" !== r2[4].value) {
      l2++;
      continue;
    }
    const u2 = i2[l2 + 2];
    if (!u2 || !(0, import_css_parser_algorithms.isTokenNode)(u2) && !isCalculation(u2)) return -1;
    "+" !== r2[4].value ? "-" !== r2[4].value ? l2++ : i2.splice(l2, 3, { inputs: [e3, u2], operation: subtraction }) : i2.splice(l2, 3, { inputs: [e3, u2], operation: addition });
  }
  return 1 === i2.length && isCalculation(i2[0]) ? i2[0] : -1;
}
function singleNodeSolver(e2, n2, t2, r2) {
  const u2 = singleArgument(e2, n2, t2);
  return -1 === u2 ? -1 : r2(e2, u2, t2);
}
function singleArgument(e2, n2, t2) {
  const u2 = resolveGlobalsAndConstants([...e2.value.filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3))], n2), a2 = solve(calc$1(calcWrapper(e2, u2), n2, t2), t2);
  return -1 === a2 ? -1 : a2;
}
function twoCommaSeparatedNodesSolver(e2, n2, t2, r2) {
  const u2 = twoCommaSeparatedArguments(e2, n2, t2);
  if (-1 === u2) return -1;
  const [a2, o2] = u2;
  return r2(e2, a2, o2, t2);
}
function twoCommaSeparatedArguments(e2, n2, u2) {
  const a2 = resolveGlobalsAndConstants([...e2.value.filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3))], n2), o2 = [], i2 = [];
  {
    let e3 = o2;
    for (let n3 = 0; n3 < a2.length; n3++) {
      const r2 = a2[n3];
      if ((0, import_css_parser_algorithms.isTokenNode)(r2) && (0, import_css_tokenizer.isTokenComma)(r2.value)) {
        if (e3 === i2) return -1;
        if (e3 === o2) {
          e3 = i2;
          continue;
        }
        return -1;
      }
      e3.push(r2);
    }
  }
  const l2 = solve(calc$1(calcWrapper(e2, o2), n2, u2), u2);
  if (-1 === l2) return -1;
  const c2 = solve(calc$1(calcWrapper(e2, i2), n2, u2), u2);
  return -1 === c2 ? -1 : [l2, c2];
}
function variadicNodesSolver(e2, n2, t2, r2) {
  const u2 = variadicArguments(e2, e2.value, n2, t2);
  return -1 === u2 ? -1 : r2(e2, u2, t2);
}
function variadicArguments(e2, n2, u2, a2) {
  const o2 = resolveGlobalsAndConstants([...n2.filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3))], u2), i2 = [];
  {
    const n3 = [];
    let r2 = [];
    for (let e3 = 0; e3 < o2.length; e3++) {
      const u3 = o2[e3];
      (0, import_css_parser_algorithms.isTokenNode)(u3) && (0, import_css_tokenizer.isTokenComma)(u3.value) ? (n3.push(r2), r2 = []) : r2.push(u3);
    }
    n3.push(r2);
    for (let t2 = 0; t2 < n3.length; t2++) {
      if (0 === n3[t2].length) return -1;
      const r3 = solve(calc$1(calcWrapper(e2, n3[t2]), u2, a2), a2);
      if (-1 === r3) return -1;
      i2.push(r3);
    }
  }
  return i2;
}
function variadicArgumentsCalcMix(e2, n2, u2, a2) {
  const o2 = resolveGlobalsAndConstants([...n2.filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3))], u2), i2 = [];
  {
    const n3 = [];
    let l2 = [];
    for (let e3 = 0; e3 < o2.length; e3++) {
      const r2 = o2[e3];
      (0, import_css_parser_algorithms.isTokenNode)(r2) && (0, import_css_tokenizer.isTokenComma)(r2.value) ? (n3.push(l2), l2 = []) : l2.push(r2);
    }
    n3.push(l2);
    for (let o3 = 0; o3 < n3.length; o3++) {
      if (0 === n3[o3].length) return -1;
      let l3 = -1, c2 = false;
      for (let i3 = n3[o3].length - 1; i3 >= 0; i3--) {
        if ((0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(n3[o3][i3])) continue;
        if (l3 = solve(calc$1(calcWrapper(e2, n3[o3].slice(0, i3 + 1)), u2, a2), a2), -1 === l3) continue;
        const s2 = n3[o3].slice(i3 + 1).filter((e3) => !(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(e3));
        if (s2.length) if (1 === s2.length && (0, import_css_parser_algorithms.isTokenNode)(s2[0]) && (0, import_css_tokenizer.isTokenPercentage)(s2[0].value)) {
          if (c2 = s2[0].value[4].value, c2 < 0 || c2 > 100) return -1;
        } else {
          const n4 = solve(calc$1(calcWrapper(e2, s2), u2, a2), a2);
          if (-1 === n4) return -1;
          if (!(0, import_css_tokenizer.isTokenPercentage)(n4.value)) return -1;
          c2 = n4.value[4].value, c2 = Math.min(100, Math.max(0, c2));
        }
        break;
      }
      if (-1 === l3) return -1;
      i2.push({ calcSum: l3, percentage: c2 });
    }
  }
  return i2;
}
const K = /* @__PURE__ */ new Set(["nearest", "line-width", "up", "down", "to-zero"]);
function parseRandomValueSharing(e2, n2, r2, u2) {
  const a2 = { dashedIdent: "", fixed: -1, elementScoped: false, propertyScoped: false, propertyIndexScoped: false };
  let o2 = false;
  const i2 = n2[0];
  if (!(0, import_css_parser_algorithms.isTokenNode)(i2) || !(0, import_css_tokenizer.isTokenIdent)(i2.value)) return [a2, n2];
  for (let i3 = 0; i3 < n2.length; i3++) {
    const l2 = n2[i3];
    if (!(0, import_css_parser_algorithms.isTokenNode)(l2)) return -1;
    if ((0, import_css_tokenizer.isTokenComma)(l2.value)) return [a2, n2.slice(i3 + 1)];
    if (!(0, import_css_tokenizer.isTokenIdent)(l2.value)) return -1;
    const c2 = l2.value[4].value.toLowerCase();
    if ("element-scoped" !== c2) if ("property-scoped" !== c2) if ("property-index-scoped" !== c2) {
      if ("fixed" === c2) {
        if (-1 !== a2.fixed || o2 || a2.dashedIdent || a2.elementScoped || a2.propertyScoped || a2.propertyIndexScoped) return -1;
        i3++;
        const t2 = n2[i3];
        if (!t2) return -1;
        const l3 = solve(calc$1(calcWrapper(e2, [t2]), r2, u2), u2);
        if (-1 === l3) return -1;
        if (!(0, import_css_tokenizer.isTokenNumber)(l3.value)) return -1;
        if (l3.value[4].value < 0 || l3.value[4].value > 1) return -1;
        a2.fixed = Math.max(0, Math.min(l3.value[4].value, 1 - Number.EPSILON / 2));
        continue;
      }
      if ("auto" !== c2) {
        if (!c2.startsWith("--")) return 0 === i3 ? [a2, n2] : -1;
        if (-1 !== a2.fixed || o2 || a2.dashedIdent) return -1;
        a2.dashedIdent = c2;
      } else {
        if (-1 !== a2.fixed || o2 || a2.dashedIdent || a2.elementScoped || a2.propertyScoped || a2.propertyIndexScoped) return -1;
        a2.elementScoped = true, a2.propertyIndexScoped = true, o2 = true;
      }
    } else {
      if (-1 !== a2.fixed || o2 || a2.propertyScoped || a2.propertyIndexScoped) return -1;
      a2.propertyIndexScoped = true;
    }
    else {
      if (-1 !== a2.fixed || o2 || a2.propertyScoped || a2.propertyIndexScoped) return -1;
      a2.propertyScoped = true;
    }
    else {
      if (-1 !== a2.fixed || o2 || a2.elementScoped) return -1;
      a2.elementScoped = true;
    }
  }
  return -1;
}
function calcWrapper(e2, n2) {
  return new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "calc(", e2.name[2], e2.name[3], { value: "calc" }], [import_css_tokenizer.TokenType.CloseParen, ")", e2.endToken[2], e2.endToken[3], void 0], n2);
}
function maxWrapper(t2, r2, u2) {
  return new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "max(", t2.name[2], t2.name[3], { value: "max" }], [import_css_tokenizer.TokenType.CloseParen, ")", t2.endToken[2], t2.endToken[3], void 0], [r2, new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Comma, ",", ...(0, import_css_parser_algorithms.sourceIndices)(r2), void 0]), u2]);
}
function patchNaN(e2) {
  if (-1 === e2) return -1;
  if ((0, import_css_parser_algorithms.isFunctionNode)(e2)) return e2;
  const t2 = e2.value;
  return (0, import_css_tokenizer.isTokenNumeric)(t2) && Number.isNaN(t2[4].value) ? (0, import_css_tokenizer.isTokenNumber)(t2) ? new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "calc(", t2[2], t2[3], { value: "calc" }], [import_css_tokenizer.TokenType.CloseParen, ")", t2[2], t2[3], void 0], [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Ident, "NaN", t2[2], t2[3], { value: "NaN" }])]) : (0, import_css_tokenizer.isTokenDimension)(t2) ? new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "calc(", t2[2], t2[3], { value: "calc" }], [import_css_tokenizer.TokenType.CloseParen, ")", t2[2], t2[3], void 0], [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Ident, "NaN", t2[2], t2[3], { value: "NaN" }]), new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", t2[2], t2[3], void 0]]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Delim, "*", t2[2], t2[3], { value: "*" }]), new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", t2[2], t2[3], void 0]]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Dimension, "1" + t2[4].unit, t2[2], t2[3], { value: 1, type: import_css_tokenizer.NumberType.Integer, unit: t2[4].unit }])]) : (0, import_css_tokenizer.isTokenPercentage)(t2) ? new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "calc(", t2[2], t2[3], { value: "calc" }], [import_css_tokenizer.TokenType.CloseParen, ")", t2[2], t2[3], void 0], [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Ident, "NaN", t2[2], t2[3], { value: "NaN" }]), new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", t2[2], t2[3], void 0]]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Delim, "*", t2[2], t2[3], { value: "*" }]), new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", t2[2], t2[3], void 0]]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, "1%", t2[2], t2[3], { value: 1 }])]) : -1 : e2;
}
function patchInfinity(e2) {
  if (-1 === e2) return -1;
  if ((0, import_css_parser_algorithms.isFunctionNode)(e2)) return e2;
  const t2 = e2.value;
  if (!(0, import_css_tokenizer.isTokenNumeric)(t2)) return e2;
  if (Number.isFinite(t2[4].value) || Number.isNaN(t2[4].value)) return e2;
  let r2 = "";
  return Number.NEGATIVE_INFINITY === t2[4].value && (r2 = "-"), (0, import_css_tokenizer.isTokenNumber)(t2) ? new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "calc(", t2[2], t2[3], { value: "calc" }], [import_css_tokenizer.TokenType.CloseParen, ")", t2[2], t2[3], void 0], [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Ident, r2 + "infinity", t2[2], t2[3], { value: r2 + "infinity" }])]) : (0, import_css_tokenizer.isTokenDimension)(t2) ? new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "calc(", t2[2], t2[3], { value: "calc" }], [import_css_tokenizer.TokenType.CloseParen, ")", t2[2], t2[3], void 0], [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Ident, r2 + "infinity", t2[2], t2[3], { value: r2 + "infinity" }]), new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", t2[2], t2[3], void 0]]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Delim, "*", t2[2], t2[3], { value: "*" }]), new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", t2[2], t2[3], void 0]]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Dimension, "1" + t2[4].unit, t2[2], t2[3], { value: 1, type: import_css_tokenizer.NumberType.Integer, unit: t2[4].unit }])]) : new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "calc(", t2[2], t2[3], { value: "calc" }], [import_css_tokenizer.TokenType.CloseParen, ")", t2[2], t2[3], void 0], [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Ident, r2 + "infinity", t2[2], t2[3], { value: r2 + "infinity" }]), new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", t2[2], t2[3], void 0]]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Delim, "*", t2[2], t2[3], { value: "*" }]), new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", t2[2], t2[3], void 0]]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, "1%", t2[2], t2[3], { value: 1 }])]);
}
function patchMinusZero(e2) {
  if (-1 === e2) return -1;
  if ((0, import_css_parser_algorithms.isFunctionNode)(e2)) return e2;
  const n2 = e2.value;
  return (0, import_css_tokenizer.isTokenNumeric)(n2) && Object.is(-0, n2[4].value) ? ("-0" === n2[1] || ((0, import_css_tokenizer.isTokenPercentage)(n2) ? n2[1] = "-0%" : (0, import_css_tokenizer.isTokenDimension)(n2) ? n2[1] = "-0" + n2[4].unit : n2[1] = "-0"), e2) : e2;
}
function patchCanonicalUnit(e2) {
  return -1 === e2 ? -1 : (0, import_css_parser_algorithms.isFunctionNode)(e2) ? e2 : (0, import_css_tokenizer.isTokenDimension)(e2.value) ? (e2.value = toCanonicalUnit(e2.value), e2) : e2;
}
function patchCalcResult(e2, n2) {
  let t2 = e2;
  return n2?.toCanonicalUnits && (t2 = patchCanonicalUnit(t2)), t2 = patchPrecision(t2, n2?.precision), t2 = patchMinusZero(t2), n2?.censorIntoStandardRepresentableValues || (t2 = patchNaN(t2), t2 = patchInfinity(t2)), t2;
}
function tokenizeGlobals(e2) {
  const n2 = /* @__PURE__ */ new Map();
  if (!e2) return n2;
  for (const [t2, r2] of e2) if ((0, import_css_tokenizer.isToken)(r2)) n2.set(t2, r2);
  else if ("string" == typeof r2) {
    const e3 = (0, import_css_tokenizer.tokenizer)({ css: r2 }), u2 = e3.nextToken();
    if (e3.nextToken(), !e3.endOfFile()) continue;
    if (!(0, import_css_tokenizer.isTokenNumeric)(u2)) continue;
    n2.set(t2, u2);
    continue;
  }
  return n2;
}
function calc(e2, n2) {
  return calcFromComponentValues((0, import_css_parser_algorithms.parseCommaSeparatedListOfComponentValues)((0, import_css_tokenizer.tokenize)({ css: e2 }), {}), n2).map((e3) => e3.map((e4) => (0, import_css_tokenizer.stringify)(e4.tokens())).join("")).join(",");
}
function calcFromComponentValues(e2, n2) {
  const t2 = tokenizeGlobals(n2?.globals);
  return replaceComponentValues(e2, (e3) => {
    if (!(0, import_css_parser_algorithms.isFunctionNode)(e3)) return;
    const r2 = H.get(e3.getName().toLowerCase());
    if (!r2) return;
    const a2 = patchCalcResult(solve(r2(e3, t2, n2 ?? {}), n2 ?? {}), n2);
    return -1 !== a2 ? n2?.calcWrapper ? calcWrapper(e3, [a2]) : a2 : void 0;
  });
}
function replaceComponentValues(n2, u2) {
  for (let a2 = 0; a2 < n2.length; a2++) {
    const o2 = n2[a2];
    (0, import_css_parser_algorithms.walk)(o2, (n3, a3) => {
      if ("number" != typeof a3) return;
      const o3 = u2(n3.node);
      if (!o3) return;
      const l2 = [o3], c2 = n3.parent.value[a3 - 1];
      (0, import_css_parser_algorithms.isTokenNode)(c2) && (0, import_css_tokenizer.isTokenDelim)(c2.value) && ("-" === c2.value[4].value || "+" === c2.value[4].value) && l2.splice(0, 0, new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", ...(0, import_css_parser_algorithms.sourceIndices)(n3.node), void 0]]));
      const s2 = n3.parent.value[a3 + 1];
      !s2 || (0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(s2) || (0, import_css_parser_algorithms.isTokenNode)(s2) && ((0, import_css_tokenizer.isTokenComma)(s2.value) || (0, import_css_tokenizer.isTokenColon)(s2.value) || (0, import_css_tokenizer.isTokenSemicolon)(s2.value) || (0, import_css_tokenizer.isTokenDelim)(s2.value) && "-" !== s2.value[4].value && "+" !== s2.value[4].value) || l2.push(new import_css_parser_algorithms.WhitespaceNode([[import_css_tokenizer.TokenType.Whitespace, " ", ...(0, import_css_parser_algorithms.sourceIndices)(n3.node), void 0]])), n3.parent.value.splice(a3, 1, ...l2);
    });
  }
  return n2;
}
const Q = new Set(H.keys());
