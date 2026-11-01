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
  ColorNotation: () => xe,
  SyntaxFlag: () => De,
  color: () => color,
  colorDataFitsDisplayP3_Gamut: () => colorDataFitsDisplayP3_Gamut,
  colorDataFitsRGB_Gamut: () => colorDataFitsRGB_Gamut,
  computedValue: () => computedValue,
  serializeHSL: () => serializeHSL,
  serializeOKLCH: () => serializeOKLCH,
  serializeP3: () => serializeP3,
  serializeRGB: () => serializeRGB
});
module.exports = __toCommonJS(stdin_exports);
var import_css_tokenizer = require("@csstools/css-tokenizer");
var import_color_helpers = require("@csstools/color-helpers");
var import_css_parser_algorithms = require("@csstools/css-parser-algorithms");
var import_css_calc = require("@csstools/css-calc");
var xe, De;
function normalize(e2, n2, a2, o2) {
  return Math.min(Math.max(e2 / n2, a2), o2);
}
function convertNaNToZero(e2) {
  return [Number.isNaN(e2[0]) ? 0 : e2[0], Number.isNaN(e2[1]) ? 0 : e2[1], Number.isNaN(e2[2]) ? 0 : e2[2]];
}
function colorData_to_XYZ_D50(e2) {
  switch (e2.colorNotation) {
    case xe.HEX:
    case xe.RGB:
    case xe.sRGB:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.sRGB_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.Linear_sRGB:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.lin_sRGB_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.Display_P3:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.P3_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.Linear_Display_P3:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.lin_P3_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.Rec2020:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.rec_2020_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.A98_RGB:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.a98_RGB_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.ProPhoto_RGB:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.ProPhoto_RGB_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.HSL:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.HSL_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.HWB:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.HWB_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.Lab:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.Lab_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.OKLab:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.OKLab_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.LCH:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.LCH_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.OKLCH:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.OKLCH_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.XYZ_D50:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.XYZ_D50_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    case xe.XYZ_D65:
      return { ...e2, colorNotation: xe.XYZ_D50, channels: (0, import_color_helpers.XYZ_D65_to_XYZ_D50)(convertNaNToZero(e2.channels)) };
    default:
      throw new Error("Unsupported color notation");
  }
}
function colorData_to_XYZ_D65(e2) {
  switch (e2.colorNotation) {
    case xe.HEX:
    case xe.RGB:
    case xe.sRGB:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.sRGB_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.Linear_sRGB:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.lin_sRGB_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.Display_P3:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.P3_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.Linear_Display_P3:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.lin_P3_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.Rec2020:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.rec_2020_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.A98_RGB:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.a98_RGB_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.ProPhoto_RGB:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.ProPhoto_RGB_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.HSL:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.HSL_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.HWB:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.HWB_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.Lab:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.Lab_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.OKLab:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.OKLab_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.LCH:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.LCH_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.OKLCH:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.OKLCH_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.XYZ_D50:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.XYZ_D50_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    case xe.XYZ_D65:
      return { ...e2, colorNotation: xe.XYZ_D65, channels: (0, import_color_helpers.XYZ_D65_to_XYZ_D65)(convertNaNToZero(e2.channels)) };
    default:
      throw new Error("Unsupported color notation");
  }
}
!(function(e2) {
  e2.A98_RGB = "a98-rgb", e2.Display_P3 = "display-p3", e2.Linear_Display_P3 = "display-p3-linear", e2.HEX = "hex", e2.HSL = "hsl", e2.HWB = "hwb", e2.LCH = "lch", e2.Lab = "lab", e2.Linear_sRGB = "srgb-linear", e2.OKLCH = "oklch", e2.OKLab = "oklab", e2.ProPhoto_RGB = "prophoto-rgb", e2.RGB = "rgb", e2.sRGB = "srgb", e2.Rec2020 = "rec2020", e2.XYZ_D50 = "xyz-d50", e2.XYZ_D65 = "xyz-d65";
})(xe || (xe = {})), (function(e2) {
  e2.ColorKeyword = "color-keyword", e2.HasAlpha = "has-alpha", e2.HasDimensionValues = "has-dimension-values", e2.HasNoneKeywords = "has-none-keywords", e2.HasNumberValues = "has-number-values", e2.HasPercentageAlpha = "has-percentage-alpha", e2.HasPercentageValues = "has-percentage-values", e2.HasVariableAlpha = "has-variable-alpha", e2.Hex = "hex", e2.LegacyHSL = "legacy-hsl", e2.LegacyRGB = "legacy-rgb", e2.NamedColor = "named-color", e2.RelativeColorSyntax = "relative-color-syntax", e2.ColorMix = "color-mix", e2.ColorMixVariadic = "color-mix-variadic", e2.ContrastColor = "contrast-color", e2.RelativeAlphaSyntax = "relative-alpha-syntax", e2.Experimental = "experimental";
})(De || (De = {}));
const Le = /* @__PURE__ */ new Set([xe.A98_RGB, xe.Display_P3, xe.Linear_Display_P3, xe.HEX, xe.Linear_sRGB, xe.ProPhoto_RGB, xe.RGB, xe.sRGB, xe.Rec2020, xe.XYZ_D50, xe.XYZ_D65]);
function colorDataToForInterpolation(e2, n2) {
  if (e2.colorNotation === n2) return { ...e2 };
  const a2 = [...e2.channels];
  let o2 = { ...e2 };
  return o2.channels = convertPowerlessComponentsToMissingComponents(o2.channels, e2.colorNotation), o2 = convertToDestination(o2, n2), o2.channels = carryForwardMissingComponentsForColorAndNotation(o2, e2.colorNotation, n2, a2), o2;
}
function colorDataToForRelativeColorSyntax(e2, n2) {
  if (e2.colorNotation === n2) return { ...e2 };
  const a2 = [...e2.channels];
  let o2 = { ...e2 };
  return o2.channels = convertPowerlessComponentsToMissingComponents(o2.channels, e2.colorNotation), o2 = convertToDestination(o2, n2), o2.channels = carryForwardMissingComponentsForColorAndNotation(o2, e2.colorNotation, n2, a2), o2;
}
function convertToDestination(e2, n2) {
  if (e2.colorNotation === n2) return e2.channels = convertNaNToZero(e2.channels), e2.channels = convertPowerlessComponentsToMissingComponents(e2.channels, n2), e2;
  switch (n2) {
    case xe.HEX:
    case xe.RGB: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.RGB, e2.channels = (0, import_color_helpers.XYZ_D65_to_sRGB)(n3.channels), e2.channels = e2.channels.map((e3) => reducePrecisionOrNaN(e3, 8)), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.sRGB: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.sRGB, e2.channels = (0, import_color_helpers.XYZ_D65_to_sRGB)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.Linear_sRGB: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.Linear_sRGB, e2.channels = (0, import_color_helpers.XYZ_D65_to_lin_sRGB)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.Display_P3: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.Display_P3, e2.channels = (0, import_color_helpers.XYZ_D65_to_P3)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.Linear_Display_P3: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.Linear_Display_P3, e2.channels = (0, import_color_helpers.XYZ_D65_to_lin_P3)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.Rec2020: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.Rec2020, e2.channels = (0, import_color_helpers.XYZ_D65_to_rec_2020)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.ProPhoto_RGB: {
      const n3 = colorData_to_XYZ_D50(e2);
      e2.colorNotation = xe.ProPhoto_RGB, e2.channels = (0, import_color_helpers.XYZ_D50_to_ProPhoto)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.A98_RGB: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.A98_RGB, e2.channels = (0, import_color_helpers.XYZ_D65_to_a98_RGB)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.HSL: {
      const a2 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.HSL, e2.channels = (0, import_color_helpers.XYZ_D65_to_HSL)(a2.channels), e2.channels = e2.channels.map((e3) => reducePrecisionOrNaN(e3, 8)), e2.channels = normalizeAfterColorConversion(e2.channels, 0), e2.channels = convertPowerlessComponentsToMissingComponents(e2.channels, n2);
      break;
    }
    case xe.HWB: {
      const a2 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.HWB, e2.channels = (0, import_color_helpers.XYZ_D65_to_HWB)(a2.channels), e2.channels = e2.channels.map((e3) => reducePrecisionOrNaN(e3, 8)), e2.channels = normalizeAfterColorConversion(e2.channels, 0), e2.channels = convertPowerlessComponentsToMissingComponents(e2.channels, n2);
      break;
    }
    case xe.Lab: {
      const n3 = colorData_to_XYZ_D50(e2);
      e2.colorNotation = xe.Lab, e2.channels = (0, import_color_helpers.XYZ_D50_to_Lab)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.LCH: {
      const a2 = colorData_to_XYZ_D50(e2);
      e2.colorNotation = xe.LCH, e2.channels = (0, import_color_helpers.XYZ_D50_to_LCH)(a2.channels), e2.channels = normalizeAfterColorConversion(e2.channels, 2), e2.channels = convertPowerlessComponentsToMissingComponents(e2.channels, n2);
      break;
    }
    case xe.OKLCH: {
      const a2 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.OKLCH, e2.channels = (0, import_color_helpers.XYZ_D65_to_OKLCH)(a2.channels), e2.channels = normalizeAfterColorConversion(e2.channels, 2), e2.channels = convertPowerlessComponentsToMissingComponents(e2.channels, n2);
      break;
    }
    case xe.OKLab: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.OKLab, e2.channels = (0, import_color_helpers.XYZ_D65_to_OKLab)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.XYZ_D50: {
      const n3 = colorData_to_XYZ_D50(e2);
      e2.colorNotation = xe.XYZ_D50, e2.channels = (0, import_color_helpers.XYZ_D50_to_XYZ_D50)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    case xe.XYZ_D65: {
      const n3 = colorData_to_XYZ_D65(e2);
      e2.colorNotation = xe.XYZ_D65, e2.channels = (0, import_color_helpers.XYZ_D65_to_XYZ_D65)(n3.channels), e2.channels = normalizeAfterColorConversion(e2.channels);
      break;
    }
    default:
      throw new Error("Unsupported color notation");
  }
  return e2;
}
function carryForwardMissingComponentsForColorAndNotation(e2, n2, a2, o2) {
  if (n2 === a2) return carryForwardMissingComponents(o2, [0, 1, 2], [], e2.channels, [0, 1, 2], []);
  if (Le.has(a2) && Le.has(n2)) return carryForwardMissingComponents(o2, [0, 1, 2], [], e2.channels, [0, 1, 2], []);
  switch (a2) {
    case xe.HSL:
      switch (n2) {
        case xe.HWB:
          return carryForwardMissingComponents(o2, [0], [1, 2], e2.channels, [0], [1, 2]);
        case xe.Lab:
        case xe.OKLab:
          return carryForwardMissingComponents(o2, [0], [1, 2], e2.channels, [2], [0, 1]);
        case xe.LCH:
        case xe.OKLCH:
          return carryForwardMissingComponents(o2, [0, 1, 2], [], e2.channels, [2, 1, 0], []);
        default:
          return carryForwardMissingComponents(o2, [], [], e2.channels, [], []);
      }
    case xe.HWB:
      switch (n2) {
        case xe.HSL:
          return carryForwardMissingComponents(o2, [0], [1, 2], e2.channels, [0], [1, 2]);
        case xe.LCH:
        case xe.OKLCH:
          return carryForwardMissingComponents(o2, [2], [0, 1], e2.channels, [0], [1, 2]);
        default:
          return carryForwardMissingComponents(o2, [], [], e2.channels, [], []);
      }
    case xe.Lab:
    case xe.OKLab:
      switch (n2) {
        case xe.HSL:
          return carryForwardMissingComponents(o2, [2], [0, 1], e2.channels, [0], [1, 2]);
        case xe.Lab:
        case xe.OKLab:
          return carryForwardMissingComponents(o2, [0, 1, 2], [], e2.channels, [0, 1, 2], []);
        case xe.LCH:
        case xe.OKLCH:
          return carryForwardMissingComponents(o2, [0], [1, 2], e2.channels, [0], [1, 2]);
        default:
          return carryForwardMissingComponents(o2, [], [], e2.channels, [], []);
      }
    case xe.LCH:
    case xe.OKLCH:
      switch (n2) {
        case xe.HSL:
          return carryForwardMissingComponents(o2, [0, 1, 2], [], e2.channels, [2, 1, 0], []);
        case xe.HWB:
          return carryForwardMissingComponents(o2, [0], [1, 2], e2.channels, [2], [0, 1]);
        case xe.Lab:
        case xe.OKLab:
          return carryForwardMissingComponents(o2, [0], [1, 2], e2.channels, [0], [1, 2]);
        case xe.LCH:
        case xe.OKLCH:
          return carryForwardMissingComponents(o2, [0, 1, 2], [], e2.channels, [0, 1, 2], []);
        default:
          return carryForwardMissingComponents(o2, [], [], e2.channels, [], []);
      }
    default:
      return carryForwardMissingComponents(o2, [], [], e2.channels, [], []);
  }
}
function convertPowerlessComponentsToMissingComponents(e2, n2) {
  const a2 = [...e2];
  switch (n2) {
    case xe.HSL:
      (Number.isNaN(a2[1]) ? 0 : a2[1]) <= 1e-3 && (a2[0] = Number.NaN, !Number.isNaN(a2[1]) && a2[1] > 0 && (a2[1] = 0));
      break;
    case xe.HWB:
      Math.max(0, Number.isNaN(a2[1]) ? 0 : a2[1]) + Math.max(0, Number.isNaN(a2[2]) ? 0 : a2[2]) >= 99.999 && (a2[0] = Number.NaN, Math.max(0, Number.isNaN(a2[1]) ? 0 : a2[1]) + Math.max(0, Number.isNaN(a2[2]) ? 0 : a2[2]) < 100 && (Number.isNaN(a2[1]) ? a2[2] = 100 : Number.isNaN(a2[2]) ? a2[1] = 100 : a2[2] = 100 - a2[1]));
      break;
    case xe.LCH:
      (Number.isNaN(a2[1]) ? 0 : a2[1]) <= 15e-4 && (a2[2] = Number.NaN, !Number.isNaN(a2[1]) && a2[1] > 0 && (a2[1] = 0));
      break;
    case xe.OKLCH:
      (Number.isNaN(a2[1]) ? 0 : a2[1]) <= 4e-6 && (a2[2] = Number.NaN, !Number.isNaN(a2[1]) && a2[1] > 0 && (a2[1] = 0));
  }
  return a2;
}
function convertPowerlessComponentsToZeroValuesForDisplay(e2, n2) {
  const a2 = [...e2];
  switch (n2) {
    case xe.HSL:
      (Number.isNaN(a2[1]) ? 0 : a2[1]) <= 1e-3 && (a2[0] = Number.NaN), (reducePrecision$1(a2[2]) <= 0 || reducePrecision$1(a2[2]) >= 100) && (a2[0] = Number.NaN, a2[1] = Number.NaN);
      break;
    case xe.HWB:
      Math.max(0, Number.isNaN(a2[1]) ? 0 : a2[1]) + Math.max(0, Number.isNaN(a2[2]) ? 0 : a2[2]) >= 99.999 && (a2[0] = Number.NaN);
      break;
    case xe.Lab:
      (reducePrecision$1(a2[0]) <= 0 || reducePrecision$1(a2[0]) >= 100) && (a2[1] = Number.NaN, a2[2] = Number.NaN);
      break;
    case xe.LCH:
      (Number.isNaN(a2[1]) ? 0 : a2[1]) <= 15e-4 && (a2[2] = Number.NaN), (reducePrecision$1(a2[0]) <= 0 || reducePrecision$1(a2[0]) >= 100) && (a2[1] = Number.NaN, a2[2] = Number.NaN);
      break;
    case xe.OKLab:
      (reducePrecision$1(a2[0]) <= 0 || reducePrecision$1(a2[0]) >= 1) && (a2[1] = Number.NaN, a2[2] = Number.NaN);
      break;
    case xe.OKLCH:
      (Number.isNaN(a2[1]) ? 0 : a2[1]) <= 4e-6 && (a2[2] = Number.NaN), (reducePrecision$1(a2[0]) <= 0 || reducePrecision$1(a2[0]) >= 1) && (a2[1] = Number.NaN, a2[2] = Number.NaN);
  }
  return a2;
}
function carryForwardMissingComponents(e2, n2, a2, o2, r2, t2) {
  if (n2.length < 3 && e2.every(Number.isNaN)) return [Number.NaN, Number.NaN, Number.NaN];
  const l2 = [...o2];
  for (let a3 = 0; a3 < n2.length; a3++) Number.isNaN(e2[n2[a3]]) && (l2[r2[a3]] = Number.NaN);
  if (a2.length && a2.every((n3) => Number.isNaN(e2[n3]))) for (let e3 = 0; e3 < t2.length; e3++) l2[t2[e3]] = Number.NaN;
  return l2;
}
function normalizeRelativeColorDataChannels(e2) {
  const n2 = /* @__PURE__ */ new Map();
  switch (e2.colorNotation) {
    case xe.RGB:
    case xe.HEX:
      n2.set("r", dummyNumberToken(255 * e2.channels[0])), n2.set("g", dummyNumberToken(255 * e2.channels[1])), n2.set("b", dummyNumberToken(255 * e2.channels[2])), "number" == typeof e2.alpha && n2.set("alpha", dummyNumberToken(e2.alpha));
      break;
    case xe.HSL:
      n2.set("h", dummyNumberToken(e2.channels[0])), n2.set("s", dummyNumberToken(e2.channels[1])), n2.set("l", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && n2.set("alpha", dummyNumberToken(e2.alpha));
      break;
    case xe.HWB:
      n2.set("h", dummyNumberToken(e2.channels[0])), n2.set("w", dummyNumberToken(e2.channels[1])), n2.set("b", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && n2.set("alpha", dummyNumberToken(e2.alpha));
      break;
    case xe.Lab:
    case xe.OKLab:
      n2.set("l", dummyNumberToken(e2.channels[0])), n2.set("a", dummyNumberToken(e2.channels[1])), n2.set("b", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && n2.set("alpha", dummyNumberToken(e2.alpha));
      break;
    case xe.LCH:
    case xe.OKLCH:
      n2.set("l", dummyNumberToken(e2.channels[0])), n2.set("c", dummyNumberToken(e2.channels[1])), n2.set("h", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && n2.set("alpha", dummyNumberToken(e2.alpha));
      break;
    case xe.sRGB:
    case xe.A98_RGB:
    case xe.Display_P3:
    case xe.Linear_Display_P3:
    case xe.Rec2020:
    case xe.Linear_sRGB:
    case xe.ProPhoto_RGB:
      n2.set("r", dummyNumberToken(e2.channels[0])), n2.set("g", dummyNumberToken(e2.channels[1])), n2.set("b", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && n2.set("alpha", dummyNumberToken(e2.alpha));
      break;
    case xe.XYZ_D50:
    case xe.XYZ_D65:
      n2.set("x", dummyNumberToken(e2.channels[0])), n2.set("y", dummyNumberToken(e2.channels[1])), n2.set("z", dummyNumberToken(e2.channels[2])), "number" == typeof e2.alpha && n2.set("alpha", dummyNumberToken(e2.alpha));
  }
  return n2;
}
function noneToZeroInRelativeColorDataChannels(e2) {
  const n2 = new Map(e2);
  for (const [a2, o2] of e2) Number.isNaN(o2[4].value) && n2.set(a2, dummyNumberToken(0));
  return n2;
}
function normalizeAfterColorConversion(e2, n2 = -1) {
  return e2 = convertNaNToZero(e2), e2 = [0 === n2 ? e2[0] : normalize(e2[0], 1, -2147483647, 2147483647), 1 === n2 ? e2[1] : normalize(e2[1], 1, -2147483647, 2147483647), 2 === n2 ? e2[2] : normalize(e2[2], 1, -2147483647, 2147483647)], Number.isNaN(e2[n2]) || Number.isFinite(e2[n2]) || (e2[n2] = 0), e2;
}
function dummyNumberToken(a2) {
  return Number.isNaN(a2) ? [import_css_tokenizer.TokenType.Number, "none", -1, -1, { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }] : [import_css_tokenizer.TokenType.Number, a2.toString(), -1, -1, { value: a2, type: import_css_tokenizer.NumberType.Number }];
}
function reducePrecisionOrNaN(e2, n2 = 7) {
  if (Number.isNaN(e2)) return e2;
  const a2 = Math.pow(10, n2);
  return Math.round(e2 * a2) / a2;
}
function reducePrecision$1(e2, n2 = 7) {
  if (Number.isNaN(e2)) return 0;
  const a2 = Math.pow(10, n2);
  return Math.round(e2 * a2) / a2;
}
function colorDataFitsRGB_Gamut(e2) {
  const n2 = { ...e2, channels: [...e2.channels] };
  n2.channels = convertPowerlessComponentsToZeroValuesForDisplay(n2.channels, n2.colorNotation);
  return !colorDataToForRelativeColorSyntax(n2, xe.RGB).channels.find((e3) => e3 < -1e-5 || e3 > 1.00001);
}
function colorDataFitsDisplayP3_Gamut(e2) {
  const n2 = { ...e2, channels: [...e2.channels] };
  n2.channels = convertPowerlessComponentsToZeroValuesForDisplay(n2.channels, n2.colorNotation);
  return !colorDataToForRelativeColorSyntax(n2, xe.Display_P3).channels.find((e3) => e3 < -1e-5 || e3 > 1.00001);
}
const He = /[A-Z]/g;
function toLowerCaseAZ(e2) {
  return e2.replace(He, (e3) => String.fromCharCode(e3.charCodeAt(0) + 32));
}
function normalize_Color_ChannelValues(t2, l2, s2) {
  if ((0, import_css_tokenizer.isTokenIdent)(t2) && "none" === toLowerCaseAZ(t2[4].value)) return s2.syntaxFlags.add(De.HasNoneKeywords), [import_css_tokenizer.TokenType.Number, "none", t2[2], t2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }];
  if ((0, import_css_tokenizer.isTokenPercentage)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasPercentageValues), a2 = 3 === l2 ? normalize(t2[4].value, 100, 0, 1) : normalize(t2[4].value, 100, -2147483647, 2147483647), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasNumberValues), a2 = 3 === l2 ? normalize(t2[4].value, 1, 0, 1) : normalize(t2[4].value, 1, -2147483647, 2147483647), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
const Pe = /* @__PURE__ */ new Set(["srgb", "srgb-linear", "display-p3", "display-p3-linear", "a98-rgb", "prophoto-rgb", "rec2020", "xyz", "xyz-d50", "xyz-d65"]);
function color$1(e2, n2) {
  const o2 = [], s2 = [], c2 = [], i2 = [];
  let u2, h2, N2 = false, m2 = false;
  const p2 = { colorNotation: xe.sRGB, channels: [0, 0, 0], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([]) };
  let b2 = o2;
  for (let r2 = 0; r2 < e2.value.length; r2++) {
    let v3 = e2.value[r2];
    if ((0, import_css_parser_algorithms.isWhitespaceNode)(v3) || (0, import_css_parser_algorithms.isCommentNode)(v3)) for (; (0, import_css_parser_algorithms.isWhitespaceNode)(e2.value[r2 + 1]) || (0, import_css_parser_algorithms.isCommentNode)(e2.value[r2 + 1]); ) r2++;
    else if (b2 === o2 && o2.length && (b2 = s2), b2 === s2 && s2.length && (b2 = c2), (0, import_css_parser_algorithms.isTokenNode)(v3) && (0, import_css_tokenizer.isTokenDelim)(v3.value) && "/" === v3.value[4].value) {
      if (b2 === i2) return false;
      b2 = i2;
    } else {
      if ((0, import_css_parser_algorithms.isFunctionNode)(v3)) {
        if (b2 === i2 && "var" === toLowerCaseAZ(v3.getName())) {
          p2.syntaxFlags.add(De.HasVariableAlpha), b2.push(v3);
          continue;
        }
        if (!import_css_calc.mathFunctionNames.has(toLowerCaseAZ(v3.getName()))) return false;
        const [[e3]] = (0, import_css_calc.calcFromComponentValues)([[v3]], { censorIntoStandardRepresentableValues: true, globals: h2, precision: -1, toCanonicalUnits: true, rawPercentages: true });
        if (!e3 || !(0, import_css_parser_algorithms.isTokenNode)(e3) || !(0, import_css_tokenizer.isTokenNumeric)(e3.value)) return false;
        Number.isNaN(e3.value[4].value) && (e3.value[4].value = 0), v3 = e3;
      }
      if (b2 === o2 && 0 === o2.length && (0, import_css_parser_algorithms.isTokenNode)(v3) && (0, import_css_tokenizer.isTokenIdent)(v3.value) && Pe.has(toLowerCaseAZ(v3.value[4].value))) {
        if (N2) return false;
        N2 = toLowerCaseAZ(v3.value[4].value), p2.colorNotation = colorSpaceNameToColorNotation(N2), m2 && (m2 = colorDataToForRelativeColorSyntax(m2, p2.colorNotation), u2 = normalizeRelativeColorDataChannels(m2), h2 = noneToZeroInRelativeColorDataChannels(u2));
      } else if (b2 === o2 && 0 === o2.length && (0, import_css_parser_algorithms.isTokenNode)(v3) && (0, import_css_tokenizer.isTokenIdent)(v3.value) && "from" === toLowerCaseAZ(v3.value[4].value)) {
        if (m2) return false;
        if (N2) return false;
        for (; (0, import_css_parser_algorithms.isWhitespaceNode)(e2.value[r2 + 1]) || (0, import_css_parser_algorithms.isCommentNode)(e2.value[r2 + 1]); ) r2++;
        if (r2++, v3 = e2.value[r2], m2 = n2(v3), false === m2) return false;
        m2.syntaxFlags.has(De.Experimental) && p2.syntaxFlags.add(De.Experimental), p2.syntaxFlags.add(De.RelativeColorSyntax);
      } else {
        if (!(0, import_css_parser_algorithms.isTokenNode)(v3)) return false;
        if ((0, import_css_tokenizer.isTokenIdent)(v3.value) && u2 && u2.has(toLowerCaseAZ(v3.value[4].value))) {
          b2.push(new import_css_parser_algorithms.TokenNode(u2.get(toLowerCaseAZ(v3.value[4].value))));
          continue;
        }
        b2.push(v3);
      }
    }
  }
  if (!N2) return false;
  if (1 !== b2.length) return false;
  if (1 !== o2.length || 1 !== s2.length || 1 !== c2.length) return false;
  if (!(0, import_css_parser_algorithms.isTokenNode)(o2[0]) || !(0, import_css_parser_algorithms.isTokenNode)(s2[0]) || !(0, import_css_parser_algorithms.isTokenNode)(c2[0])) return false;
  if (u2 && !u2.has("alpha")) return false;
  const v2 = normalize_Color_ChannelValues(o2[0].value, 0, p2);
  if (!v2 || !(0, import_css_tokenizer.isTokenNumber)(v2)) return false;
  const f2 = normalize_Color_ChannelValues(s2[0].value, 1, p2);
  if (!f2 || !(0, import_css_tokenizer.isTokenNumber)(f2)) return false;
  const g2 = normalize_Color_ChannelValues(c2[0].value, 2, p2);
  if (!g2 || !(0, import_css_tokenizer.isTokenNumber)(g2)) return false;
  const d2 = [v2, f2, g2];
  if (1 === i2.length) if (p2.syntaxFlags.add(De.HasAlpha), (0, import_css_parser_algorithms.isTokenNode)(i2[0])) {
    const e3 = normalize_Color_ChannelValues(i2[0].value, 3, p2);
    if (!e3 || !(0, import_css_tokenizer.isTokenNumber)(e3)) return false;
    d2.push(e3);
  } else p2.alpha = i2[0];
  else if (u2 && u2.has("alpha")) {
    const e3 = normalize_Color_ChannelValues(u2.get("alpha"), 3, p2);
    if (!e3 || !(0, import_css_tokenizer.isTokenNumber)(e3)) return false;
    d2.push(e3);
  }
  return p2.channels = [d2[0][4].value, d2[1][4].value, d2[2][4].value], 4 === d2.length && (p2.alpha = d2[3][4].value), p2;
}
function colorSpaceNameToColorNotation(e2) {
  switch (e2) {
    case "srgb":
      return xe.sRGB;
    case "srgb-linear":
      return xe.Linear_sRGB;
    case "display-p3":
      return xe.Display_P3;
    case "display-p3-linear":
      return xe.Linear_Display_P3;
    case "a98-rgb":
      return xe.A98_RGB;
    case "prophoto-rgb":
      return xe.ProPhoto_RGB;
    case "rec2020":
      return xe.Rec2020;
    case "xyz":
    case "xyz-d65":
      return xe.XYZ_D65;
    case "xyz-d50":
      return xe.XYZ_D50;
    default:
      throw new Error("Unknown color space name: " + e2);
  }
}
const Ze = /* @__PURE__ */ new Set(["srgb", "srgb-linear", "display-p3", "display-p3-linear", "a98-rgb", "prophoto-rgb", "rec2020", "lab", "oklab", "xyz", "xyz-d50", "xyz-d65"]), Me = /* @__PURE__ */ new Set(["hsl", "hwb", "lch", "oklch"]), $e = /* @__PURE__ */ new Set(["shorter", "longer", "increasing", "decreasing"]);
function colorMix(e2, n2) {
  let o2 = null, r2 = null, t2 = null, l2 = false;
  for (let c2 = 0; c2 < e2.value.length; c2++) {
    const i2 = e2.value[c2];
    if (!(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(i2)) {
      if (!(o2 || (0, import_css_parser_algorithms.isTokenNode)(i2) && (0, import_css_tokenizer.isTokenIdent)(i2.value) && "in" === toLowerCaseAZ(i2.value[4].value))) return colorMixRectangular("oklab", colorMixComponents(e2.value, n2));
      if ((0, import_css_parser_algorithms.isTokenNode)(i2) && (0, import_css_tokenizer.isTokenIdent)(i2.value)) {
        if (!o2 && "in" === toLowerCaseAZ(i2.value[4].value)) {
          o2 = i2;
          continue;
        }
        if (o2 && !r2) {
          r2 = toLowerCaseAZ(i2.value[4].value);
          continue;
        }
        if (o2 && r2 && !t2 && Me.has(r2)) {
          t2 = toLowerCaseAZ(i2.value[4].value);
          continue;
        }
        if (o2 && r2 && t2 && !l2 && "hue" === toLowerCaseAZ(i2.value[4].value)) {
          l2 = true;
          continue;
        }
        return false;
      }
      return !(!(0, import_css_parser_algorithms.isTokenNode)(i2) || !(0, import_css_tokenizer.isTokenComma)(i2.value)) && (!!r2 && (t2 || l2 ? !!(t2 && l2 && Me.has(r2) && $e.has(t2)) && colorMixPolar(r2, t2, colorMixComponents(e2.value.slice(c2 + 1), n2)) : Ze.has(r2) ? colorMixRectangular(r2, colorMixComponents(e2.value.slice(c2 + 1), n2)) : !!Me.has(r2) && colorMixPolar(r2, "shorter", colorMixComponents(e2.value.slice(c2 + 1), n2))));
    }
  }
  return false;
}
function colorMixComponents(e2, n2) {
  const a2 = [];
  let r2 = false, t2 = false;
  for (let c2 = 0; c2 < e2.length; c2++) {
    let i2 = e2[c2];
    if (!(0, import_css_parser_algorithms.isWhiteSpaceOrCommentNode)(i2)) {
      if (!(0, import_css_parser_algorithms.isTokenNode)(i2) || !(0, import_css_tokenizer.isTokenComma)(i2.value)) {
        if (!r2) {
          const e3 = n2(i2);
          if (e3) {
            r2 = e3;
            continue;
          }
        }
        if (!t2) {
          if ((0, import_css_parser_algorithms.isFunctionNode)(i2) && import_css_calc.mathFunctionNames.has(toLowerCaseAZ(i2.getName()))) {
            if ([[i2]] = (0, import_css_calc.calcFromComponentValues)([[i2]], { censorIntoStandardRepresentableValues: true, precision: -1, toCanonicalUnits: true, rawPercentages: true }), !i2 || !(0, import_css_parser_algorithms.isTokenNode)(i2) || !(0, import_css_tokenizer.isTokenNumeric)(i2.value)) return false;
            Number.isNaN(i2.value[4].value) && (i2.value[4].value = 0);
          }
          if ((0, import_css_parser_algorithms.isTokenNode)(i2) && (0, import_css_tokenizer.isTokenPercentage)(i2.value) && i2.value[4].value >= 0) {
            t2 = i2.value[4].value;
            continue;
          }
        }
        return false;
      }
      if (!r2) return false;
      a2.push({ color: r2, percentage: t2 }), r2 = false, t2 = false;
    }
  }
  return !!r2 && (a2.push({ color: r2, percentage: t2 }), a2);
}
function colorMixRectangular(e2, n2) {
  if (!n2 || !n2.length) return false;
  for (const e3 of n2) if (e3.percentage && (e3.percentage < 0 || e3.percentage > 100)) return false;
  const { items: a2, leftover: o2 } = normalizeMixPercentages(n2, true), r2 = 1 - o2 / 100;
  let t2;
  switch (e2) {
    case "srgb":
      t2 = xe.RGB;
      break;
    case "srgb-linear":
      t2 = xe.Linear_sRGB;
      break;
    case "display-p3":
      t2 = xe.Display_P3;
      break;
    case "display-p3-linear":
      t2 = xe.Linear_Display_P3;
      break;
    case "a98-rgb":
      t2 = xe.A98_RGB;
      break;
    case "prophoto-rgb":
      t2 = xe.ProPhoto_RGB;
      break;
    case "rec2020":
      t2 = xe.Rec2020;
      break;
    case "lab":
      t2 = xe.Lab;
      break;
    case "oklab":
      t2 = xe.OKLab;
      break;
    case "xyz-d50":
      t2 = xe.XYZ_D50;
      break;
    case "xyz":
    case "xyz-d65":
      t2 = xe.XYZ_D65;
      break;
    default:
      return false;
  }
  if (1 === a2.length) {
    const e3 = colorDataToForInterpolation(a2[0].color, t2);
    return e3.colorNotation = t2, e3.syntaxFlags.add(De.ColorMixVariadic), e3.syntaxFlags.add(De.ColorMix), "number" != typeof e3.alpha ? false : (e3.alpha = e3.alpha * r2, e3);
  }
  for (a2.reverse(); a2.length >= 2; ) {
    const e3 = a2.pop(), n3 = a2.pop();
    if (!e3 || !n3) return false;
    const o3 = e3.percentage + n3.percentage, r3 = o3 > 0 ? n3.percentage / o3 : 0.5, l3 = colorMixRectangularPair(t2, e3.color, n3.color, r3);
    if (!l3) return false;
    a2.push({ color: l3, percentage: o3 });
  }
  const l2 = a2[0]?.color;
  return !!l2 && ("number" == typeof l2.alpha && (l2.alpha = l2.alpha * r2, n2.some((e3) => e3.color.syntaxFlags.has(De.Experimental)) && l2.syntaxFlags.add(De.Experimental), 2 !== n2.length && l2.syntaxFlags.add(De.ColorMixVariadic), l2));
}
function colorMixRectangularPair(e2, n2, a2, o2) {
  let r2 = n2.alpha;
  if ("number" != typeof r2) return false;
  let t2 = a2.alpha;
  if ("number" != typeof t2) return false;
  r2 = Number.isNaN(r2) ? t2 : r2, t2 = Number.isNaN(t2) ? r2 : t2;
  const l2 = colorDataToForInterpolation(n2, e2).channels, s2 = colorDataToForInterpolation(a2, e2).channels;
  l2[0] = fillInMissingComponent(l2[0], s2[0]), s2[0] = fillInMissingComponent(s2[0], l2[0]), l2[1] = fillInMissingComponent(l2[1], s2[1]), s2[1] = fillInMissingComponent(s2[1], l2[1]), l2[2] = fillInMissingComponent(l2[2], s2[2]), s2[2] = fillInMissingComponent(s2[2], l2[2]), l2[0] = premultiply(l2[0], r2), l2[1] = premultiply(l2[1], r2), l2[2] = premultiply(l2[2], r2), s2[0] = premultiply(s2[0], t2), s2[1] = premultiply(s2[1], t2), s2[2] = premultiply(s2[2], t2);
  const c2 = interpolate(r2, t2, o2);
  return { colorNotation: e2, channels: [un_premultiply(interpolate(l2[0], s2[0], o2), c2), un_premultiply(interpolate(l2[1], s2[1], o2), c2), un_premultiply(interpolate(l2[2], s2[2], o2), c2)], alpha: c2, syntaxFlags: /* @__PURE__ */ new Set([De.ColorMix]) };
}
function colorMixPolar(e2, n2, a2) {
  if (!a2 || !a2.length) return false;
  for (const e3 of a2) if (e3.percentage && (e3.percentage < 0 || e3.percentage > 100)) return false;
  const { items: o2, leftover: r2 } = normalizeMixPercentages(a2, true), t2 = 1 - r2 / 100;
  let l2;
  switch (e2) {
    case "hsl":
      l2 = xe.HSL;
      break;
    case "hwb":
      l2 = xe.HWB;
      break;
    case "lch":
      l2 = xe.LCH;
      break;
    case "oklch":
      l2 = xe.OKLCH;
      break;
    default:
      return false;
  }
  if (1 === o2.length) {
    const e3 = colorDataToForInterpolation(o2[0].color, l2);
    return e3.colorNotation = l2, e3.syntaxFlags.add(De.ColorMixVariadic), e3.syntaxFlags.add(De.ColorMix), "number" != typeof e3.alpha ? false : (e3.alpha = e3.alpha * t2, e3);
  }
  for (o2.reverse(); o2.length >= 2; ) {
    const e3 = o2.pop(), a3 = o2.pop();
    if (!e3 || !a3) return false;
    const r3 = e3.percentage + a3.percentage, t3 = r3 > 0 ? a3.percentage / r3 : 0.5, s3 = colorMixPolarPair(l2, n2, e3.color, a3.color, t3);
    if (!s3) return false;
    o2.push({ color: s3, percentage: r3 });
  }
  const s2 = o2[0]?.color;
  return !!s2 && ("number" == typeof s2.alpha && (s2.alpha = s2.alpha * t2, a2.some((e3) => e3.color.syntaxFlags.has(De.Experimental)) && s2.syntaxFlags.add(De.Experimental), 2 !== a2.length && s2.syntaxFlags.add(De.ColorMixVariadic), s2));
}
function colorMixPolarPair(e2, n2, a2, o2, r2) {
  let t2 = 0, l2 = 0, s2 = 0, c2 = 0, i2 = 0, u2 = 0, h2 = a2.alpha;
  if ("number" != typeof h2) return false;
  let N2 = o2.alpha;
  if ("number" != typeof N2) return false;
  h2 = Number.isNaN(h2) ? N2 : h2, N2 = Number.isNaN(N2) ? h2 : N2;
  const m2 = colorDataToForInterpolation(a2, e2).channels, p2 = colorDataToForInterpolation(o2, e2).channels;
  switch (e2) {
    case xe.HSL:
    case xe.HWB:
      t2 = m2[0], l2 = p2[0], s2 = m2[1], c2 = p2[1], i2 = m2[2], u2 = p2[2];
      break;
    case xe.LCH:
    case xe.OKLCH:
      s2 = m2[0], c2 = p2[0], i2 = m2[1], u2 = p2[1], t2 = m2[2], l2 = p2[2];
  }
  if (s2 = fillInMissingComponent(s2, c2), c2 = fillInMissingComponent(c2, s2), i2 = fillInMissingComponent(i2, u2), u2 = fillInMissingComponent(u2, i2), t2 = fillInMissingComponent(t2, l2), l2 = fillInMissingComponent(l2, t2), Number.isNaN(t2) && Number.isNaN(l2)) ;
  else {
    const e3 = l2 - t2;
    switch (n2) {
      case "shorter":
        e3 > 180 ? t2 += 360 : e3 < -180 && (l2 += 360);
        break;
      case "longer":
        -180 < e3 && e3 < 180 && (e3 > 0 ? t2 += 360 : l2 += 360);
        break;
      case "increasing":
        e3 < 0 && (l2 += 360);
        break;
      case "decreasing":
        e3 > 0 && (t2 += 360);
        break;
      default:
        throw new Error("Unknown hue interpolation method");
    }
  }
  s2 = premultiply(s2, h2), i2 = premultiply(i2, h2), c2 = premultiply(c2, N2), u2 = premultiply(u2, N2);
  let b2 = [0, 0, 0];
  const v2 = interpolate(h2, N2, r2);
  switch (e2) {
    case xe.HSL:
    case xe.HWB:
      b2 = [interpolate(t2, l2, r2), un_premultiply(interpolate(s2, c2, r2), v2), un_premultiply(interpolate(i2, u2, r2), v2)];
      break;
    case xe.LCH:
    case xe.OKLCH:
      b2 = [un_premultiply(interpolate(s2, c2, r2), v2), un_premultiply(interpolate(i2, u2, r2), v2), interpolate(t2, l2, r2)];
  }
  return { colorNotation: e2, channels: b2, alpha: v2, syntaxFlags: /* @__PURE__ */ new Set([De.ColorMix]) };
}
function fillInMissingComponent(e2, n2) {
  return Number.isNaN(e2) ? n2 : e2;
}
function interpolate(e2, n2, a2) {
  return e2 * (1 - a2) + n2 * a2;
}
function premultiply(e2, n2) {
  return Number.isNaN(n2) ? e2 : Number.isNaN(e2) ? Number.NaN : e2 * n2;
}
function un_premultiply(e2, n2) {
  return 0 === n2 || Number.isNaN(n2) ? e2 : Number.isNaN(e2) ? Number.NaN : e2 / n2;
}
function normalizeMixPercentages(e2, n2 = false) {
  let a2 = 0, o2 = 0;
  for (const n3 of e2) n3.percentage && (a2 += n3.percentage), false === n3.percentage && o2++;
  a2 = Math.min(100, a2);
  for (const n3 of e2) false === n3.percentage && (n3.percentage = (100 - a2) / o2);
  const r2 = e2.slice();
  let t2 = 0;
  for (const e3 of r2) t2 += e3.percentage;
  if (t2 > 100 || t2 > 0 && n2) for (const e3 of r2) e3.percentage = e3.percentage * (100 / t2);
  let l2 = 0;
  return t2 < 100 && (l2 = 100 - t2), { items: r2, leftover: l2 };
}
function hex(e2) {
  const n2 = toLowerCaseAZ(e2[4].value);
  if (n2.match(/[^a-f0-9]/)) return false;
  const a2 = { colorNotation: xe.HEX, channels: [0, 0, 0], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([De.Hex]) }, o2 = n2.length;
  if (3 === o2) {
    const e3 = n2[0], o3 = n2[1], r2 = n2[2];
    return a2.channels = [parseInt(e3 + e3, 16) / 255, parseInt(o3 + o3, 16) / 255, parseInt(r2 + r2, 16) / 255], a2;
  }
  if (6 === o2) {
    const e3 = n2[0] + n2[1], o3 = n2[2] + n2[3], r2 = n2[4] + n2[5];
    return a2.channels = [parseInt(e3, 16) / 255, parseInt(o3, 16) / 255, parseInt(r2, 16) / 255], a2;
  }
  if (4 === o2) {
    const e3 = n2[0], o3 = n2[1], r2 = n2[2], t2 = n2[3];
    return a2.channels = [parseInt(e3 + e3, 16) / 255, parseInt(o3 + o3, 16) / 255, parseInt(r2 + r2, 16) / 255], a2.alpha = parseInt(t2 + t2, 16) / 255, a2.syntaxFlags.add(De.HasAlpha), a2;
  }
  if (8 === o2) {
    const e3 = n2[0] + n2[1], o3 = n2[2] + n2[3], r2 = n2[4] + n2[5], t2 = n2[6] + n2[7];
    return a2.channels = [parseInt(e3, 16) / 255, parseInt(o3, 16) / 255, parseInt(r2, 16) / 255], a2.alpha = parseInt(t2, 16) / 255, a2.syntaxFlags.add(De.HasAlpha), a2;
  }
  return false;
}
function normalizeHue$1(a2) {
  if ((0, import_css_tokenizer.isTokenNumber)(a2)) return Number.isNaN(a2[4].value) || Number.isFinite(a2[4].value) || (a2[4].value = 0), a2[4].value = a2[4].value % 360, a2[4].value < 0 && (a2[4].value += 360), a2[1] = a2[4].value.toString(), a2;
  if ((0, import_css_tokenizer.isTokenDimension)(a2)) {
    let o2 = a2[4].value;
    switch (toLowerCaseAZ(a2[4].unit)) {
      case "deg":
        break;
      case "rad":
        o2 = 180 * a2[4].value / Math.PI;
        break;
      case "grad":
        o2 = 0.9 * a2[4].value;
        break;
      case "turn":
        o2 = 360 * a2[4].value;
        break;
      default:
        return false;
    }
    return Number.isNaN(a2[4].value) || Number.isFinite(a2[4].value) || (a2[4].value = 0), o2 %= 360, o2 < 0 && (o2 += 360), [import_css_tokenizer.TokenType.Number, o2.toString(), a2[2], a2[3], { value: o2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function normalize_legacy_HSL_ChannelValues(a2, t2, l2) {
  if (0 === t2) {
    const e2 = normalizeHue$1(a2);
    return false !== e2 && ((0, import_css_tokenizer.isTokenDimension)(a2) && l2.syntaxFlags.add(De.HasDimensionValues), e2);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(a2)) {
    let o2;
    return 3 === t2 ? l2.syntaxFlags.add(De.HasPercentageAlpha) : l2.syntaxFlags.add(De.HasPercentageValues), o2 = 3 === t2 ? normalize(a2[4].value, 100, 0, 1) : normalize(a2[4].value, 1, 0, 100), [import_css_tokenizer.TokenType.Number, o2.toString(), a2[2], a2[3], { value: o2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(a2)) {
    if (3 !== t2) return false;
    let o2;
    return o2 = normalize(a2[4].value, 1, 0, 3 === t2 ? 1 : 100), [import_css_tokenizer.TokenType.Number, o2.toString(), a2[2], a2[3], { value: o2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function normalize_modern_HSL_ChannelValues(t2, l2, s2) {
  if ((0, import_css_tokenizer.isTokenIdent)(t2) && "none" === toLowerCaseAZ(t2[4].value)) return s2.syntaxFlags.add(De.HasNoneKeywords), [import_css_tokenizer.TokenType.Number, "none", t2[2], t2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }];
  if (0 === l2) {
    const e2 = normalizeHue$1(t2);
    return false !== e2 && ((0, import_css_tokenizer.isTokenDimension)(t2) && s2.syntaxFlags.add(De.HasDimensionValues), e2);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(t2)) {
    let a2;
    return 3 === l2 ? s2.syntaxFlags.add(De.HasPercentageAlpha) : s2.syntaxFlags.add(De.HasPercentageValues), a2 = 3 === l2 ? normalize(t2[4].value, 100, 0, 1) : normalize(t2[4].value, 1, 1 === l2 ? 0 : -2147483647, 2147483647), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasNumberValues), a2 = 3 === l2 ? normalize(t2[4].value, 1, 0, 1) : normalize(t2[4].value, 1, 1 === l2 ? 0 : -2147483647, 2147483647), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function threeChannelLegacySyntax(e2, n2, a2, o2) {
  const t2 = [], c2 = [], i2 = [], u2 = [], h2 = { colorNotation: a2, channels: [0, 0, 0], alpha: 1, syntaxFlags: new Set(o2) };
  let N2 = t2;
  for (let n3 = 0; n3 < e2.value.length; n3++) {
    let a3 = e2.value[n3];
    if (!(0, import_css_parser_algorithms.isWhitespaceNode)(a3) && !(0, import_css_parser_algorithms.isCommentNode)(a3)) {
      if ((0, import_css_parser_algorithms.isTokenNode)(a3) && (0, import_css_tokenizer.isTokenComma)(a3.value)) {
        if (N2 === t2) {
          N2 = c2;
          continue;
        }
        if (N2 === c2) {
          N2 = i2;
          continue;
        }
        if (N2 === i2) {
          N2 = u2;
          continue;
        }
        if (N2 === u2) return false;
      }
      if ((0, import_css_parser_algorithms.isFunctionNode)(a3)) {
        if (N2 === u2 && "var" === a3.getName().toLowerCase()) {
          h2.syntaxFlags.add(De.HasVariableAlpha), N2.push(a3);
          continue;
        }
        if (!import_css_calc.mathFunctionNames.has(a3.getName().toLowerCase())) return false;
        const [[e3]] = (0, import_css_calc.calcFromComponentValues)([[a3]], { censorIntoStandardRepresentableValues: true, precision: -1, toCanonicalUnits: true, rawPercentages: true });
        if (!e3 || !(0, import_css_parser_algorithms.isTokenNode)(e3) || !(0, import_css_tokenizer.isTokenNumeric)(e3.value)) return false;
        Number.isNaN(e3.value[4].value) && (e3.value[4].value = 0), a3 = e3;
      }
      if (!(0, import_css_parser_algorithms.isTokenNode)(a3)) return false;
      N2.push(a3);
    }
  }
  if (1 !== N2.length) return false;
  if (1 !== t2.length || 1 !== c2.length || 1 !== i2.length) return false;
  if (!(0, import_css_parser_algorithms.isTokenNode)(t2[0]) || !(0, import_css_parser_algorithms.isTokenNode)(c2[0]) || !(0, import_css_parser_algorithms.isTokenNode)(i2[0])) return false;
  const m2 = n2(t2[0].value, 0, h2);
  if (!m2 || !(0, import_css_tokenizer.isTokenNumber)(m2)) return false;
  const p2 = n2(c2[0].value, 1, h2);
  if (!p2 || !(0, import_css_tokenizer.isTokenNumber)(p2)) return false;
  const b2 = n2(i2[0].value, 2, h2);
  if (!b2 || !(0, import_css_tokenizer.isTokenNumber)(b2)) return false;
  const v2 = [m2, p2, b2];
  if (1 === u2.length) if (h2.syntaxFlags.add(De.HasAlpha), (0, import_css_parser_algorithms.isTokenNode)(u2[0])) {
    const e3 = n2(u2[0].value, 3, h2);
    if (!e3 || !(0, import_css_tokenizer.isTokenNumber)(e3)) return false;
    v2.push(e3);
  } else h2.alpha = u2[0];
  return h2.channels = [v2[0][4].value, v2[1][4].value, v2[2][4].value], 4 === v2.length && (h2.alpha = v2[3][4].value), h2;
}
function threeChannelSpaceSeparated(e2, n2, o2, s2, c2) {
  const i2 = [], u2 = [], h2 = [], N2 = [];
  let m2, p2, b2 = false;
  const v2 = { colorNotation: o2, channels: [0, 0, 0], alpha: 1, syntaxFlags: new Set(s2) };
  let f2 = i2;
  for (let n3 = 0; n3 < e2.value.length; n3++) {
    let r2 = e2.value[n3];
    if ((0, import_css_parser_algorithms.isWhitespaceNode)(r2) || (0, import_css_parser_algorithms.isCommentNode)(r2)) for (; (0, import_css_parser_algorithms.isWhitespaceNode)(e2.value[n3 + 1]) || (0, import_css_parser_algorithms.isCommentNode)(e2.value[n3 + 1]); ) n3++;
    else if (f2 === i2 && i2.length && (f2 = u2), f2 === u2 && u2.length && (f2 = h2), (0, import_css_parser_algorithms.isTokenNode)(r2) && (0, import_css_tokenizer.isTokenDelim)(r2.value) && "/" === r2.value[4].value) {
      if (f2 === N2) return false;
      f2 = N2;
    } else {
      if ((0, import_css_parser_algorithms.isFunctionNode)(r2)) {
        if (f2 === N2 && "var" === r2.getName().toLowerCase()) {
          v2.syntaxFlags.add(De.HasVariableAlpha), f2.push(r2);
          continue;
        }
        if (!import_css_calc.mathFunctionNames.has(r2.getName().toLowerCase())) return false;
        const [[e3]] = (0, import_css_calc.calcFromComponentValues)([[r2]], { censorIntoStandardRepresentableValues: true, globals: p2, precision: -1, toCanonicalUnits: true, rawPercentages: true });
        if (!e3 || !(0, import_css_parser_algorithms.isTokenNode)(e3) || !(0, import_css_tokenizer.isTokenNumeric)(e3.value)) return false;
        Number.isNaN(e3.value[4].value) && (e3.value[4].value = 0), r2 = e3;
      }
      if (f2 === i2 && 0 === i2.length && (0, import_css_parser_algorithms.isTokenNode)(r2) && (0, import_css_tokenizer.isTokenIdent)(r2.value) && "from" === r2.value[4].value.toLowerCase()) {
        if (b2) return false;
        for (; (0, import_css_parser_algorithms.isWhitespaceNode)(e2.value[n3 + 1]) || (0, import_css_parser_algorithms.isCommentNode)(e2.value[n3 + 1]); ) n3++;
        if (n3++, r2 = e2.value[n3], b2 = c2(r2), false === b2) return false;
        b2.syntaxFlags.has(De.Experimental) && v2.syntaxFlags.add(De.Experimental), v2.syntaxFlags.add(De.RelativeColorSyntax), b2 = colorDataToForRelativeColorSyntax(b2, o2), m2 = normalizeRelativeColorDataChannels(b2), p2 = noneToZeroInRelativeColorDataChannels(m2);
      } else {
        if (!(0, import_css_parser_algorithms.isTokenNode)(r2)) return false;
        if ((0, import_css_tokenizer.isTokenIdent)(r2.value) && m2) {
          const e3 = r2.value[4].value.toLowerCase();
          if (m2.has(e3)) {
            f2.push(new import_css_parser_algorithms.TokenNode(m2.get(e3)));
            continue;
          }
        }
        f2.push(r2);
      }
    }
  }
  if (1 !== f2.length) return false;
  if (1 !== i2.length || 1 !== u2.length || 1 !== h2.length) return false;
  if (!(0, import_css_parser_algorithms.isTokenNode)(i2[0]) || !(0, import_css_parser_algorithms.isTokenNode)(u2[0]) || !(0, import_css_parser_algorithms.isTokenNode)(h2[0])) return false;
  if (m2 && !m2.has("alpha")) return false;
  const g2 = n2(i2[0].value, 0, v2);
  if (!g2 || !(0, import_css_tokenizer.isTokenNumber)(g2)) return false;
  const d2 = n2(u2[0].value, 1, v2);
  if (!d2 || !(0, import_css_tokenizer.isTokenNumber)(d2)) return false;
  const y2 = n2(h2[0].value, 2, v2);
  if (!y2 || !(0, import_css_tokenizer.isTokenNumber)(y2)) return false;
  const _2 = [g2, d2, y2];
  if (1 === N2.length) if (v2.syntaxFlags.add(De.HasAlpha), (0, import_css_parser_algorithms.isTokenNode)(N2[0])) {
    const e3 = n2(N2[0].value, 3, v2);
    if (!e3 || !(0, import_css_tokenizer.isTokenNumber)(e3)) return false;
    _2.push(e3);
  } else v2.alpha = N2[0];
  else if (m2 && m2.has("alpha")) {
    const e3 = n2(m2.get("alpha"), 3, v2);
    if (!e3 || !(0, import_css_tokenizer.isTokenNumber)(e3)) return false;
    _2.push(e3);
  }
  return v2.channels = [_2[0][4].value, _2[1][4].value, _2[2][4].value], 4 === _2.length && (v2.alpha = _2[3][4].value), v2;
}
function hsl(e2, n2) {
  if (e2.value.some((e3) => (0, import_css_parser_algorithms.isTokenNode)(e3) && (0, import_css_tokenizer.isTokenComma)(e3.value))) {
    const n3 = hslCommaSeparated(e2);
    if (false !== n3) return n3;
  }
  {
    const a2 = hslSpaceSeparated(e2, n2);
    if (false !== a2) return a2;
  }
  return false;
}
function hslCommaSeparated(e2) {
  return threeChannelLegacySyntax(e2, normalize_legacy_HSL_ChannelValues, xe.HSL, [De.LegacyHSL]);
}
function hslSpaceSeparated(e2, n2) {
  return threeChannelSpaceSeparated(e2, normalize_modern_HSL_ChannelValues, xe.HSL, [], n2);
}
function normalize_HWB_ChannelValues(t2, l2, s2) {
  if ((0, import_css_tokenizer.isTokenIdent)(t2) && "none" === toLowerCaseAZ(t2[4].value)) return s2.syntaxFlags.add(De.HasNoneKeywords), [import_css_tokenizer.TokenType.Number, "none", t2[2], t2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }];
  if (0 === l2) {
    const e2 = normalizeHue$1(t2);
    return false !== e2 && ((0, import_css_tokenizer.isTokenDimension)(t2) && s2.syntaxFlags.add(De.HasDimensionValues), e2);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(t2)) {
    let a2;
    return 3 === l2 ? s2.syntaxFlags.add(De.HasPercentageAlpha) : s2.syntaxFlags.add(De.HasPercentageValues), a2 = 3 === l2 ? normalize(t2[4].value, 100, 0, 1) : normalize(t2[4].value, 1, -2147483647, 2147483647), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasNumberValues), a2 = 3 === l2 ? normalize(t2[4].value, 1, 0, 1) : normalize(t2[4].value, 1, -2147483647, 2147483647), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function normalize_Lab_ChannelValues(t2, l2, s2) {
  if ((0, import_css_tokenizer.isTokenIdent)(t2) && "none" === toLowerCaseAZ(t2[4].value)) return s2.syntaxFlags.add(De.HasNoneKeywords), [import_css_tokenizer.TokenType.Number, "none", t2[2], t2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }];
  if ((0, import_css_tokenizer.isTokenPercentage)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasPercentageValues), a2 = 1 === l2 || 2 === l2 ? normalize(t2[4].value, 0.8, -2147483647, 2147483647) : 3 === l2 ? normalize(t2[4].value, 100, 0, 1) : normalize(t2[4].value, 1, 0, 100), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasNumberValues), a2 = 1 === l2 || 2 === l2 ? normalize(t2[4].value, 1, -2147483647, 2147483647) : normalize(t2[4].value, 1, 0, 3 === l2 ? 1 : 100), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function lab(e2, n2) {
  return threeChannelSpaceSeparated(e2, normalize_Lab_ChannelValues, xe.Lab, [], n2);
}
function normalize_LCH_ChannelValues(t2, l2, s2) {
  if ((0, import_css_tokenizer.isTokenIdent)(t2) && "none" === toLowerCaseAZ(t2[4].value)) return s2.syntaxFlags.add(De.HasNoneKeywords), [import_css_tokenizer.TokenType.Number, "none", t2[2], t2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }];
  if (2 === l2) {
    const e2 = normalizeHue$1(t2);
    return false !== e2 && ((0, import_css_tokenizer.isTokenDimension)(t2) && s2.syntaxFlags.add(De.HasDimensionValues), e2);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasPercentageValues), a2 = 1 === l2 ? normalize(t2[4].value, 100 / 150, 0, 2147483647) : 3 === l2 ? normalize(t2[4].value, 100, 0, 1) : normalize(t2[4].value, 1, 0, 100), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasNumberValues), a2 = normalize(t2[4].value, 1, 0, 1 === l2 ? 2147483647 : 3 === l2 ? 1 : 100), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function lch(e2, n2) {
  return threeChannelSpaceSeparated(e2, normalize_LCH_ChannelValues, xe.LCH, [], n2);
}
const Fe = /* @__PURE__ */ new Map();
for (const [e2, n2] of Object.entries(import_color_helpers.namedColors)) Fe.set(e2, n2);
function namedColor(e2) {
  const n2 = Fe.get(toLowerCaseAZ(e2));
  return !!n2 && { colorNotation: xe.RGB, channels: [n2[0] / 255, n2[1] / 255, n2[2] / 255], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([De.ColorKeyword, De.NamedColor]) };
}
function normalize_OKLab_ChannelValues(t2, l2, s2) {
  if ((0, import_css_tokenizer.isTokenIdent)(t2) && "none" === toLowerCaseAZ(t2[4].value)) return s2.syntaxFlags.add(De.HasNoneKeywords), [import_css_tokenizer.TokenType.Number, "none", t2[2], t2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }];
  if ((0, import_css_tokenizer.isTokenPercentage)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasPercentageValues), a2 = 1 === l2 || 2 === l2 ? normalize(t2[4].value, 250, -2147483647, 2147483647) : normalize(t2[4].value, 100, 0, 1), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasNumberValues), a2 = 1 === l2 || 2 === l2 ? normalize(t2[4].value, 1, -2147483647, 2147483647) : normalize(t2[4].value, 1, 0, 1), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function oklab(e2, n2) {
  return threeChannelSpaceSeparated(e2, normalize_OKLab_ChannelValues, xe.OKLab, [], n2);
}
function normalize_OKLCH_ChannelValues(t2, l2, s2) {
  if ((0, import_css_tokenizer.isTokenIdent)(t2) && "none" === toLowerCaseAZ(t2[4].value)) return s2.syntaxFlags.add(De.HasNoneKeywords), [import_css_tokenizer.TokenType.Number, "none", t2[2], t2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }];
  if (2 === l2) {
    const e2 = normalizeHue$1(t2);
    return false !== e2 && ((0, import_css_tokenizer.isTokenDimension)(t2) && s2.syntaxFlags.add(De.HasDimensionValues), e2);
  }
  if ((0, import_css_tokenizer.isTokenPercentage)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasPercentageValues), a2 = 1 === l2 ? normalize(t2[4].value, 250, 0, 2147483647) : normalize(t2[4].value, 100, 0, 1), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasNumberValues), a2 = normalize(t2[4].value, 1, 0, 1 === l2 ? 2147483647 : 1), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function oklch(e2, n2) {
  return threeChannelSpaceSeparated(e2, normalize_OKLCH_ChannelValues, xe.OKLCH, [], n2);
}
function normalize_legacy_sRGB_ChannelValues(a2, t2, l2) {
  if ((0, import_css_tokenizer.isTokenPercentage)(a2)) {
    3 === t2 ? l2.syntaxFlags.add(De.HasPercentageAlpha) : l2.syntaxFlags.add(De.HasPercentageValues);
    const o2 = normalize(a2[4].value, 100, 0, 1);
    return [import_css_tokenizer.TokenType.Number, o2.toString(), a2[2], a2[3], { value: o2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(a2)) {
    let o2;
    return 3 !== t2 && l2.syntaxFlags.add(De.HasNumberValues), o2 = normalize(a2[4].value, 3 === t2 ? 1 : 255, 0, 1), [import_css_tokenizer.TokenType.Number, o2.toString(), a2[2], a2[3], { value: o2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function normalize_modern_sRGB_ChannelValues(t2, l2, s2) {
  if ((0, import_css_tokenizer.isTokenIdent)(t2) && "none" === t2[4].value.toLowerCase()) return s2.syntaxFlags.add(De.HasNoneKeywords), [import_css_tokenizer.TokenType.Number, "none", t2[2], t2[3], { value: Number.NaN, type: import_css_tokenizer.NumberType.Number }];
  if ((0, import_css_tokenizer.isTokenPercentage)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasPercentageValues), a2 = 3 === l2 ? normalize(t2[4].value, 100, 0, 1) : normalize(t2[4].value, 100, -2147483647, 2147483647), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  if ((0, import_css_tokenizer.isTokenNumber)(t2)) {
    let a2;
    return 3 !== l2 && s2.syntaxFlags.add(De.HasNumberValues), a2 = 3 === l2 ? normalize(t2[4].value, 1, 0, 1) : normalize(t2[4].value, 255, -2147483647, 2147483647), [import_css_tokenizer.TokenType.Number, a2.toString(), t2[2], t2[3], { value: a2, type: import_css_tokenizer.NumberType.Number }];
  }
  return false;
}
function rgb(e2, n2) {
  if (e2.value.some((e3) => (0, import_css_parser_algorithms.isTokenNode)(e3) && (0, import_css_tokenizer.isTokenComma)(e3.value))) {
    const n3 = rgbCommaSeparated(e2);
    if (false !== n3) return (!n3.syntaxFlags.has(De.HasNumberValues) || !n3.syntaxFlags.has(De.HasPercentageValues)) && n3;
  } else {
    const a2 = rgbSpaceSeparated(e2, n2);
    if (false !== a2) return a2;
  }
  return false;
}
function rgbCommaSeparated(e2) {
  return threeChannelLegacySyntax(e2, normalize_legacy_sRGB_ChannelValues, xe.RGB, [De.LegacyRGB]);
}
function rgbSpaceSeparated(e2, n2) {
  return threeChannelSpaceSeparated(e2, normalize_modern_sRGB_ChannelValues, xe.RGB, [], n2);
}
function XYZ_D65_to_sRGB_Gamut(e2) {
  const n2 = (0, import_color_helpers.XYZ_D65_to_sRGB)(e2);
  if ((0, import_color_helpers.inGamut)(n2)) return (0, import_color_helpers.clip)(n2);
  let a2 = e2;
  return a2 = (0, import_color_helpers.XYZ_D65_to_OKLCH)(a2), a2[0] < 1e-6 && (a2 = [0, 0, 0]), a2[0] > 0.999999 && (a2 = [1, 0, 0]), (0, import_color_helpers.gam_sRGB)((0, import_color_helpers.mapGamutRayTrace)(a2, oklch_to_lin_srgb, lin_srgb_to_oklch));
}
function oklch_to_lin_srgb(e2) {
  return e2 = (0, import_color_helpers.OKLCH_to_OKLab)(e2), e2 = (0, import_color_helpers.OKLab_to_XYZ)(e2), (0, import_color_helpers.XYZ_to_lin_sRGB)(e2);
}
function lin_srgb_to_oklch(e2) {
  return e2 = (0, import_color_helpers.lin_sRGB_to_XYZ)(e2), e2 = (0, import_color_helpers.XYZ_to_OKLab)(e2), (0, import_color_helpers.OKLab_to_OKLCH)(e2);
}
function contrastColor(e2, n2) {
  let a2 = false;
  for (let o3 = 0; o3 < e2.value.length; o3++) {
    const r3 = e2.value[o3];
    if (!(0, import_css_parser_algorithms.isWhitespaceNode)(r3) && !(0, import_css_parser_algorithms.isCommentNode)(r3) && (a2 || (a2 = n2(r3), !a2))) return false;
  }
  if (!a2) return false;
  a2.channels = convertNaNToZero(a2.channels), a2.channels = XYZ_D65_to_sRGB_Gamut(colorData_to_XYZ_D65(a2).channels), a2.colorNotation = xe.sRGB;
  const o2 = { colorNotation: xe.RGB, channels: [0, 0, 0], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([De.ContrastColor, De.Experimental]) }, r2 = (0, import_color_helpers.contrast_ratio_wcag_2_1)(a2.channels, [1, 1, 1]), t2 = (0, import_color_helpers.contrast_ratio_wcag_2_1)(a2.channels, [0, 0, 0]);
  return o2.channels = r2 > t2 ? [1, 1, 1] : [0, 0, 0], o2;
}
function alpha(e2, n2) {
  let o2, s2, c2 = false, i2 = false, u2 = false;
  const h2 = { colorNotation: xe.sRGB, channels: [0, 0, 0], alpha: 1, syntaxFlags: /* @__PURE__ */ new Set([]) };
  for (let N2 = 0; N2 < e2.value.length; N2++) {
    let m2 = e2.value[N2];
    if ((0, import_css_parser_algorithms.isWhitespaceNode)(m2) || (0, import_css_parser_algorithms.isCommentNode)(m2)) for (; (0, import_css_parser_algorithms.isWhitespaceNode)(e2.value[N2 + 1]) || (0, import_css_parser_algorithms.isCommentNode)(e2.value[N2 + 1]); ) N2++;
    else if (u2 && !c2 && !i2 && (0, import_css_parser_algorithms.isTokenNode)(m2) && (0, import_css_tokenizer.isTokenDelim)(m2.value) && "/" === m2.value[4].value) c2 = true;
    else {
      if ((0, import_css_parser_algorithms.isFunctionNode)(m2) && import_css_calc.mathFunctionNames.has(toLowerCaseAZ(m2.getName()))) {
        const [[e3]] = (0, import_css_calc.calcFromComponentValues)([[m2]], { censorIntoStandardRepresentableValues: true, globals: s2, precision: -1, toCanonicalUnits: true, rawPercentages: true });
        if (!e3 || !(0, import_css_parser_algorithms.isTokenNode)(e3) || !(0, import_css_tokenizer.isTokenNumeric)(e3.value)) return false;
        Number.isNaN(e3.value[4].value) && (e3.value[4].value = 0), m2 = e3;
      }
      if (c2 || i2 || !(0, import_css_parser_algorithms.isTokenNode)(m2) || !(0, import_css_tokenizer.isTokenIdent)(m2.value) || "from" !== toLowerCaseAZ(m2.value[4].value)) {
        if (!c2) return false;
        if (i2) return false;
        if ((0, import_css_parser_algorithms.isTokenNode)(m2)) {
          if ((0, import_css_tokenizer.isTokenIdent)(m2.value) && "alpha" === toLowerCaseAZ(m2.value[4].value) && o2 && o2.has("alpha")) {
            h2.alpha = o2.get("alpha")[4].value, i2 = true;
            continue;
          }
          const e3 = normalize_Color_ChannelValues(m2.value, 3, h2);
          if (!e3 || !(0, import_css_tokenizer.isTokenNumber)(e3)) return false;
          h2.alpha = e3[4].value, i2 = true;
          continue;
        }
        if ((0, import_css_parser_algorithms.isFunctionNode)(m2)) {
          const e3 = (0, import_css_parser_algorithms.replaceComponentValues)([[m2]], (e4) => {
            if ((0, import_css_parser_algorithms.isTokenNode)(e4) && (0, import_css_tokenizer.isTokenIdent)(e4.value) && "alpha" === toLowerCaseAZ(e4.value[4].value) && o2 && o2.has("alpha")) return new import_css_parser_algorithms.TokenNode(o2.get("alpha"));
          });
          h2.alpha = e3[0][0], i2 = true;
          continue;
        }
        return false;
      }
      if (u2) return false;
      for (; (0, import_css_parser_algorithms.isWhitespaceNode)(e2.value[N2 + 1]) || (0, import_css_parser_algorithms.isCommentNode)(e2.value[N2 + 1]); ) N2++;
      if (N2++, m2 = e2.value[N2], u2 = n2(m2), false === u2) return false;
      o2 = normalizeRelativeColorDataChannels(u2), s2 = noneToZeroInRelativeColorDataChannels(o2), h2.syntaxFlags = new Set(u2.syntaxFlags), h2.syntaxFlags.add(De.RelativeAlphaSyntax), h2.channels = [...u2.channels], h2.colorNotation = u2.colorNotation, h2.alpha = u2.alpha;
    }
  }
  return !!o2 && (!!i2 && h2);
}
function XYZ_D65_to_P3_Gamut(e2) {
  const n2 = (0, import_color_helpers.XYZ_D65_to_P3)(e2);
  if ((0, import_color_helpers.inGamut)(n2)) return (0, import_color_helpers.clip)(n2);
  let a2 = e2;
  return a2 = (0, import_color_helpers.XYZ_D65_to_OKLCH)(a2), a2[0] < 1e-6 && (a2 = [0, 0, 0]), a2[0] > 0.999999 && (a2 = [1, 0, 0]), (0, import_color_helpers.gam_P3)((0, import_color_helpers.mapGamutRayTrace)(a2, oklch_to_lin_p3, lin_p3_to_oklch));
}
function oklch_to_lin_p3(e2) {
  return e2 = (0, import_color_helpers.OKLCH_to_OKLab)(e2), e2 = (0, import_color_helpers.OKLab_to_XYZ)(e2), (0, import_color_helpers.XYZ_to_lin_P3)(e2);
}
function lin_p3_to_oklch(e2) {
  return e2 = (0, import_color_helpers.lin_P3_to_XYZ)(e2), e2 = (0, import_color_helpers.XYZ_to_OKLab)(e2), (0, import_color_helpers.OKLab_to_OKLCH)(e2);
}
function toPrecision(e2, n2 = 7) {
  e2 = +e2, n2 = +n2;
  const a2 = (Math.floor(Math.abs(e2)) + "").length;
  if (n2 > a2) return +e2.toFixed(n2 - a2);
  {
    const o2 = 10 ** (a2 - n2);
    return Math.round(e2 / o2) * o2;
  }
}
function serializeWithAlpha(a2, o2, r2, t2) {
  const l2 = [import_css_tokenizer.TokenType.CloseParen, ")", -1, -1, void 0];
  if ("number" == typeof a2.alpha) {
    const s2 = Math.min(1, Math.max(0, toPrecision(Number.isNaN(a2.alpha) ? 0 : a2.alpha)));
    return 1 === toPrecision(s2, 4) ? new import_css_parser_algorithms.FunctionNode(o2, l2, t2) : new import_css_parser_algorithms.FunctionNode(o2, l2, [...t2, new import_css_parser_algorithms.WhitespaceNode([r2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Delim, "/", -1, -1, { value: "/" }]), new import_css_parser_algorithms.WhitespaceNode([r2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, toPrecision(s2, 4).toString(), -1, -1, { value: a2.alpha, type: import_css_tokenizer.NumberType.Integer }])]);
  }
  return new import_css_parser_algorithms.FunctionNode(o2, l2, [...t2, new import_css_parser_algorithms.WhitespaceNode([r2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Delim, "/", -1, -1, { value: "/" }]), new import_css_parser_algorithms.WhitespaceNode([r2]), a2.alpha]);
}
function serializeP3(a2, o2 = true) {
  a2.channels = convertPowerlessComponentsToZeroValuesForDisplay(a2.channels, a2.colorNotation);
  let r2 = a2.channels.map((e2) => Number.isNaN(e2) ? 0 : e2);
  o2 ? r2 = XYZ_D65_to_P3_Gamut(colorData_to_XYZ_D65(a2).channels) : a2.colorNotation !== xe.Display_P3 && (r2 = (0, import_color_helpers.XYZ_D65_to_P3)(colorData_to_XYZ_D65(a2).channels));
  const t2 = o2 ? Math.min(1, Math.max(0, toPrecision(r2[0], 6))) : toPrecision(r2[0], 6), l2 = o2 ? Math.min(1, Math.max(0, toPrecision(r2[1], 6))) : toPrecision(r2[1], 6), s2 = o2 ? Math.min(1, Math.max(0, toPrecision(r2[2], 6))) : toPrecision(r2[2], 6), c2 = [import_css_tokenizer.TokenType.Function, "color(", -1, -1, { value: "color" }], i2 = [import_css_tokenizer.TokenType.Whitespace, " ", -1, -1, void 0];
  return serializeWithAlpha(a2, c2, i2, [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Ident, "display-p3", -1, -1, { value: "display-p3" }]), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, t2.toString(), -1, -1, { value: r2[0], type: import_css_tokenizer.NumberType.Number }]), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, l2.toString(), -1, -1, { value: r2[1], type: import_css_tokenizer.NumberType.Number }]), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, s2.toString(), -1, -1, { value: r2[2], type: import_css_tokenizer.NumberType.Number }])]);
}
function serializeRGB(a2, o2 = true) {
  let r2;
  a2.channels = convertPowerlessComponentsToZeroValuesForDisplay(a2.channels, a2.colorNotation), r2 = o2 ? XYZ_D65_to_sRGB_Gamut(colorData_to_XYZ_D65(a2).channels) : (0, import_color_helpers.XYZ_D65_to_sRGB)(colorData_to_XYZ_D65(a2).channels);
  const t2 = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r2[0])))), l2 = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r2[1])))), s2 = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r2[2])))), c2 = [import_css_tokenizer.TokenType.CloseParen, ")", -1, -1, void 0], i2 = [import_css_tokenizer.TokenType.Whitespace, " ", -1, -1, void 0], u2 = [import_css_tokenizer.TokenType.Comma, ",", -1, -1, void 0], h2 = [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, t2.toString(), -1, -1, { value: Math.min(255, 255 * Math.max(0, r2[0])), type: import_css_tokenizer.NumberType.Integer }]), new import_css_parser_algorithms.TokenNode(u2), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, l2.toString(), -1, -1, { value: Math.min(255, 255 * Math.max(0, r2[1])), type: import_css_tokenizer.NumberType.Integer }]), new import_css_parser_algorithms.TokenNode(u2), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, s2.toString(), -1, -1, { value: Math.min(255, 255 * Math.max(0, r2[2])), type: import_css_tokenizer.NumberType.Integer }])];
  if ("number" == typeof a2.alpha) {
    const o3 = Math.min(1, Math.max(0, toPrecision(Number.isNaN(a2.alpha) ? 0 : a2.alpha)));
    return 1 === toPrecision(o3, 4) ? new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "rgb(", -1, -1, { value: "rgb" }], c2, h2) : new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "rgba(", -1, -1, { value: "rgba" }], c2, [...h2, new import_css_parser_algorithms.TokenNode(u2), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, toPrecision(o3, 4).toString(), -1, -1, { value: a2.alpha, type: import_css_tokenizer.NumberType.Number }])]);
  }
  return new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "rgba(", -1, -1, { value: "rgba" }], c2, [...h2, new import_css_parser_algorithms.TokenNode(u2), new import_css_parser_algorithms.WhitespaceNode([i2]), a2.alpha]);
}
function serializeHSL(a2, o2 = true) {
  let r2;
  a2.channels = convertPowerlessComponentsToZeroValuesForDisplay(a2.channels, a2.colorNotation), r2 = (0, import_color_helpers.XYZ_D65_to_HSL)(o2 ? (0, import_color_helpers.sRGB_to_XYZ_D65)(XYZ_D65_to_sRGB_Gamut(colorData_to_XYZ_D65(a2).channels)) : colorData_to_XYZ_D65(a2).channels), r2 = r2.map((e2) => Number.isNaN(e2) ? 0 : e2);
  const t2 = Math.min(360, Math.max(0, Math.round(toPrecision(r2[0])))) % 360, l2 = Math.min(100, Math.max(0, Math.round(toPrecision(r2[1])))), s2 = Math.min(100, Math.max(0, Math.round(toPrecision(r2[2])))), c2 = [import_css_tokenizer.TokenType.CloseParen, ")", -1, -1, void 0], i2 = [import_css_tokenizer.TokenType.Whitespace, " ", -1, -1, void 0], u2 = [import_css_tokenizer.TokenType.Comma, ",", -1, -1, void 0], h2 = [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, t2.toString(), -1, -1, { value: r2[0], type: import_css_tokenizer.NumberType.Integer }]), new import_css_parser_algorithms.TokenNode(u2), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, l2.toString() + "%", -1, -1, { value: r2[1] }]), new import_css_parser_algorithms.TokenNode(u2), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Percentage, s2.toString() + "%", -1, -1, { value: r2[2] }])];
  if ("number" == typeof a2.alpha) {
    const o3 = Math.min(1, Math.max(0, toPrecision(Number.isNaN(a2.alpha) ? 0 : a2.alpha)));
    return 1 === toPrecision(o3, 4) ? new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "hsl(", -1, -1, { value: "hsl" }], c2, h2) : new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "hsla(", -1, -1, { value: "hsla" }], c2, [...h2, new import_css_parser_algorithms.TokenNode(u2), new import_css_parser_algorithms.WhitespaceNode([i2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, toPrecision(o3, 4).toString(), -1, -1, { value: a2.alpha, type: import_css_tokenizer.NumberType.Number }])]);
  }
  return new import_css_parser_algorithms.FunctionNode([import_css_tokenizer.TokenType.Function, "hsla(", -1, -1, { value: "hsla" }], c2, [...h2, new import_css_parser_algorithms.TokenNode(u2), new import_css_parser_algorithms.WhitespaceNode([i2]), a2.alpha]);
}
function serializeOKLCH(a2) {
  a2.channels = convertPowerlessComponentsToZeroValuesForDisplay(a2.channels, a2.colorNotation);
  let o2 = a2.channels.map((e2) => Number.isNaN(e2) ? 0 : e2);
  a2.colorNotation !== xe.OKLCH && (o2 = (0, import_color_helpers.XYZ_D65_to_OKLCH)(colorData_to_XYZ_D65(a2).channels));
  const r2 = toPrecision(o2[0], 6), t2 = toPrecision(o2[1], 6), l2 = toPrecision(o2[2], 6), s2 = [import_css_tokenizer.TokenType.Function, "oklch(", -1, -1, { value: "oklch" }], c2 = [import_css_tokenizer.TokenType.Whitespace, " ", -1, -1, void 0];
  return serializeWithAlpha(a2, s2, c2, [new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, r2.toString(), -1, -1, { value: o2[0], type: import_css_tokenizer.NumberType.Number }]), new import_css_parser_algorithms.WhitespaceNode([c2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, t2.toString(), -1, -1, { value: o2[1], type: import_css_tokenizer.NumberType.Number }]), new import_css_parser_algorithms.WhitespaceNode([c2]), new import_css_parser_algorithms.TokenNode([import_css_tokenizer.TokenType.Number, l2.toString(), -1, -1, { value: o2[2], type: import_css_tokenizer.NumberType.Number }])]);
}
function computedValue(e2, n2 = true) {
  const a2 = e2.channels;
  switch (e2.colorNotation) {
    case xe.Lab:
      return a2[0] = nanToNone(a2[0]), a2[1] = nanToNone(a2[1]), a2[2] = nanToNone(a2[2]), 1 !== e2.alpha ? `lab(${a2[0]} ${a2[1]} ${a2[2]} / ${nanToNone(e2.alpha)})` : `lab(${a2[0]} ${a2[1]} ${a2[2]})`;
    case xe.LCH:
      return a2[0] = nanToNone(a2[0]), a2[1] = nanToNone(a2[1]), a2[2] = nanToNone(normalizeHue(a2[2])), 1 !== e2.alpha ? `lch(${a2[0]} ${a2[1]} ${a2[2]} / ${nanToNone(e2.alpha)})` : `lch(${a2[0]} ${a2[1]} ${a2[2]})`;
    case xe.OKLab:
      return a2[0] = nanToNone(a2[0]), a2[1] = nanToNone(a2[1]), a2[2] = nanToNone(a2[2]), 1 !== e2.alpha ? `oklab(${a2[0]} ${a2[1]} ${a2[2]} / ${nanToNone(e2.alpha)})` : `oklab(${a2[0]} ${a2[1]} ${a2[2]})`;
    case xe.OKLCH:
      return a2[0] = nanToNone(a2[0]), a2[1] = nanToNone(a2[1]), a2[2] = nanToNone(normalizeHue(a2[2])), 1 !== e2.alpha ? `oklch(${a2[0]} ${a2[1]} ${a2[2]} / ${nanToNone(e2.alpha)})` : `oklch(${a2[0]} ${a2[1]} ${a2[2]})`;
    case xe.RGB:
    case xe.HEX:
      return a2.some(Number.isNaN) || Number.isNaN(e2.alpha) ? 1 !== e2.alpha ? `color(srgb ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(srgb ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})` : e2.syntaxFlags.has(De.RelativeColorSyntax) || e2.syntaxFlags.has(De.ColorMix) || e2.syntaxFlags.has(De.RelativeAlphaSyntax) ? computedValue(colorDataToForRelativeColorSyntax(e2, xe.sRGB)) : 1 !== e2.alpha ? `rgba(${nanToNone(Math.round(255 * reducePrecision(e2.channels[0], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(e2.channels[1], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(e2.channels[2], 5)))}, ${nanToNone(e2.alpha)})` : `rgb(${nanToNone(Math.round(255 * reducePrecision(e2.channels[0], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(e2.channels[1], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(e2.channels[2], 5)))})`;
    case xe.HSL: {
      if (a2.some(Number.isNaN) || Number.isNaN(e2.alpha) || false === n2) return 1 !== e2.alpha ? `hsl(${nanToNone(normalizeHue(a2[0]))} ${nanToNone(a2[1], "%")} ${nanToNone(a2[2], "%")} / ${nanToNone(e2.alpha)})` : `hsl(${nanToNone(normalizeHue(a2[0]))} ${nanToNone(a2[1], "%")} ${nanToNone(a2[2], "%")})`;
      if (e2.syntaxFlags.has(De.RelativeColorSyntax) || e2.syntaxFlags.has(De.ColorMix) || e2.syntaxFlags.has(De.RelativeAlphaSyntax)) return computedValue(colorDataToForRelativeColorSyntax(e2, xe.sRGB));
      const o2 = colorDataToForRelativeColorSyntax(e2, xe.RGB);
      return 1 !== o2.alpha ? `rgba(${nanToNone(Math.round(255 * reducePrecision(o2.channels[0], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(o2.channels[1], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(o2.channels[2], 5)))}, ${nanToNone(o2.alpha)})` : `rgb(${nanToNone(Math.round(255 * reducePrecision(o2.channels[0], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(o2.channels[1], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(o2.channels[2], 5)))})`;
    }
    case xe.HWB: {
      if (a2.some(Number.isNaN) || Number.isNaN(e2.alpha) || false === n2) return 1 !== e2.alpha ? `hwb(${nanToNone(normalizeHue(a2[0]))} ${nanToNone(a2[1], "%")} ${nanToNone(a2[2], "%")} / ${nanToNone(e2.alpha)})` : `hwb(${nanToNone(normalizeHue(a2[0]))} ${nanToNone(a2[1], "%")} ${nanToNone(a2[2], "%")})`;
      if (e2.syntaxFlags.has(De.RelativeColorSyntax) || e2.syntaxFlags.has(De.ColorMix) || e2.syntaxFlags.has(De.RelativeAlphaSyntax)) return computedValue(colorDataToForRelativeColorSyntax(e2, xe.sRGB));
      const o2 = colorDataToForRelativeColorSyntax(e2, xe.RGB);
      return 1 !== o2.alpha ? `rgba(${nanToNone(Math.round(255 * reducePrecision(o2.channels[0], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(o2.channels[1], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(o2.channels[2], 5)))}, ${nanToNone(o2.alpha)})` : `rgb(${nanToNone(Math.round(255 * reducePrecision(o2.channels[0], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(o2.channels[1], 5)))}, ${nanToNone(Math.round(255 * reducePrecision(o2.channels[2], 5)))})`;
    }
    case xe.sRGB:
      return 1 !== e2.alpha ? `color(srgb ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(srgb ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
    case xe.Linear_sRGB:
      return 1 !== e2.alpha ? `color(srgb-linear ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(srgb-linear ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
    case xe.Display_P3:
      return 1 !== e2.alpha ? `color(display-p3 ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(display-p3 ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
    case xe.Linear_Display_P3:
      return 1 !== e2.alpha ? `color(display-p3-linear ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(display-p3-linear ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
    case xe.A98_RGB:
      return 1 !== e2.alpha ? `color(a98-rgb ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(a98-rgb ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
    case xe.ProPhoto_RGB:
      return 1 !== e2.alpha ? `color(prophoto-rgb ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(prophoto-rgb ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
    case xe.Rec2020:
      return 1 !== e2.alpha ? `color(rec2020 ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(rec2020 ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
    case xe.XYZ_D65:
      return 1 !== e2.alpha ? `color(xyz-d65 ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(xyz-d65 ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
    case xe.XYZ_D50:
      return 1 !== e2.alpha ? `color(xyz-d50 ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])} / ${nanToNone(e2.alpha)})` : `color(xyz-d50 ${nanToNone(a2[0])} ${nanToNone(a2[1])} ${nanToNone(a2[2])})`;
  }
  throw new Error("unsupported color");
}
function nanToNone(e2, n2 = "") {
  return "string" == typeof e2 ? e2 : "number" != typeof e2 ? e2.toString() : Number.isNaN(e2) ? "none" : n2 ? e2.toString() + n2 : e2.toString();
}
function normalizeHue(e2) {
  return "number" != typeof e2 || Number.isNaN(e2) ? e2 : e2 % 360;
}
function reducePrecision(e2, n2 = 8) {
  return Number.isNaN(e2) || !Number.isFinite(e2) ? e2 : (n2 = Math.pow(10, n2), Math.round(e2 * n2) / n2);
}
function color(e2) {
  if ((0, import_css_parser_algorithms.isFunctionNode)(e2)) {
    switch (toLowerCaseAZ(e2.getName())) {
      case "rgb":
      case "rgba":
        return rgb(e2, color);
      case "hsl":
      case "hsla":
        return hsl(e2, color);
      case "hwb":
        return n2 = color, threeChannelSpaceSeparated(e2, normalize_HWB_ChannelValues, xe.HWB, [], n2);
      case "lab":
        return lab(e2, color);
      case "lch":
        return lch(e2, color);
      case "oklab":
        return oklab(e2, color);
      case "oklch":
        return oklch(e2, color);
      case "color":
        return color$1(e2, color);
      case "color-mix":
        return colorMix(e2, color);
      case "contrast-color":
        return contrastColor(e2, color);
      case "alpha":
        return alpha(e2, color);
    }
  }
  var n2;
  if ((0, import_css_parser_algorithms.isTokenNode)(e2)) {
    if ((0, import_css_tokenizer.isTokenHash)(e2.value)) return hex(e2.value);
    if ((0, import_css_tokenizer.isTokenIdent)(e2.value)) {
      const n3 = namedColor(e2.value[4].value);
      return false !== n3 ? n3 : "transparent" === toLowerCaseAZ(e2.value[4].value) && { colorNotation: xe.RGB, channels: [0, 0, 0], alpha: 0, syntaxFlags: /* @__PURE__ */ new Set([De.ColorKeyword]) };
    }
  }
  return false;
}
