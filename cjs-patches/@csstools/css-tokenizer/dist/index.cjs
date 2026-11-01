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
  HashType: () => d,
  NumberType: () => a,
  ParseError: () => ParseError,
  ParseErrorMessage: () => e,
  ParseErrorWithToken: () => ParseErrorWithToken,
  TokenType: () => u,
  cloneTokens: () => cloneTokens,
  isToken: () => isToken,
  isTokenAtKeyword: () => isTokenAtKeyword,
  isTokenBadString: () => isTokenBadString,
  isTokenBadURL: () => isTokenBadURL,
  isTokenCDC: () => isTokenCDC,
  isTokenCDO: () => isTokenCDO,
  isTokenCloseCurly: () => isTokenCloseCurly,
  isTokenCloseParen: () => isTokenCloseParen,
  isTokenCloseSquare: () => isTokenCloseSquare,
  isTokenColon: () => isTokenColon,
  isTokenComma: () => isTokenComma,
  isTokenComment: () => isTokenComment,
  isTokenDelim: () => isTokenDelim,
  isTokenDimension: () => isTokenDimension,
  isTokenEOF: () => isTokenEOF,
  isTokenFunction: () => isTokenFunction,
  isTokenHash: () => isTokenHash,
  isTokenIdent: () => isTokenIdent,
  isTokenNumber: () => isTokenNumber,
  isTokenNumeric: () => isTokenNumeric,
  isTokenOpenCurly: () => isTokenOpenCurly,
  isTokenOpenParen: () => isTokenOpenParen,
  isTokenOpenSquare: () => isTokenOpenSquare,
  isTokenPercentage: () => isTokenPercentage,
  isTokenSemicolon: () => isTokenSemicolon,
  isTokenString: () => isTokenString,
  isTokenURL: () => isTokenURL,
  isTokenUnicodeRange: () => isTokenUnicodeRange,
  isTokenWhiteSpaceOrComment: () => isTokenWhiteSpaceOrComment,
  isTokenWhitespace: () => isTokenWhitespace,
  mirrorVariant: () => mirrorVariant,
  mirrorVariantType: () => mirrorVariantType,
  mutateIdent: () => mutateIdent,
  mutateUnit: () => mutateUnit,
  stringify: () => stringify,
  tokenize: () => tokenize,
  tokenizer: () => tokenizer
});
module.exports = __toCommonJS(stdin_exports);
class ParseError extends Error {
  sourceStart;
  sourceEnd;
  parserState;
  constructor(e2, n2, t2, o2) {
    super(e2), this.name = "ParseError", this.sourceStart = n2, this.sourceEnd = t2, this.parserState = o2;
  }
}
class ParseErrorWithToken extends ParseError {
  token;
  constructor(e2, n2, t2, o2, r2) {
    super(e2, n2, t2, o2), this.token = r2;
  }
}
const e = { UnexpectedNewLineInString: "Unexpected newline while consuming a string token.", UnexpectedEOFInString: "Unexpected EOF while consuming a string token.", UnexpectedEOFInComment: "Unexpected EOF while consuming a comment.", UnexpectedEOFInURL: "Unexpected EOF while consuming a url token.", UnexpectedEOFInEscapedCodePoint: "Unexpected EOF while consuming an escaped code point.", UnexpectedCharacterInURL: "Unexpected character while consuming a url token.", InvalidEscapeSequenceInURL: "Invalid escape sequence while consuming a url token.", InvalidEscapeSequenceAfterBackslash: 'Invalid escape sequence after "\\"' }, n = "undefined" != typeof globalThis && "structuredClone" in globalThis;
function cloneTokens(e2) {
  return n ? structuredClone(e2) : JSON.parse(JSON.stringify(e2));
}
function stringify(...e2) {
  if (!e2 || !e2.length) return "";
  let n2;
  n2 = Array.isArray(e2) && Array.isArray(e2[0]) && Array.isArray(e2[0][0]) ? e2[0] : e2;
  let t2 = "";
  for (let e3 = 0; e3 < n2.length; e3++) t2 += n2[e3][1];
  return t2;
}
const t = 13, o = 45, r = 10, i = 43, c = 65533, s = 92;
var u, a, d;
function mirrorVariantType(e2) {
  switch (e2) {
    case u.OpenParen:
      return u.CloseParen;
    case u.CloseParen:
      return u.OpenParen;
    case u.OpenCurly:
      return u.CloseCurly;
    case u.CloseCurly:
      return u.OpenCurly;
    case u.OpenSquare:
      return u.CloseSquare;
    case u.CloseSquare:
      return u.OpenSquare;
    default:
      return null;
  }
}
function mirrorVariant(e2) {
  switch (e2[0]) {
    case u.OpenParen:
      return [u.CloseParen, ")", -1, -1, void 0];
    case u.CloseParen:
      return [u.OpenParen, "(", -1, -1, void 0];
    case u.OpenCurly:
      return [u.CloseCurly, "}", -1, -1, void 0];
    case u.CloseCurly:
      return [u.OpenCurly, "{", -1, -1, void 0];
    case u.OpenSquare:
      return [u.CloseSquare, "]", -1, -1, void 0];
    case u.CloseSquare:
      return [u.OpenSquare, "[", -1, -1, void 0];
    default:
      return null;
  }
}
function isHexDigitCodePoint(e2) {
  return e2 >= 48 && e2 <= 57 || e2 >= 97 && e2 <= 102 || e2 >= 65 && e2 <= 70;
}
function isIdentStartCodePoint(e2) {
  return e2 >= 97 && e2 <= 122 || e2 >= 65 && e2 <= 90 || 95 === e2 || isNonASCII_IdentCodePoint(e2);
}
function isIdentCodePoint(e2) {
  return e2 >= 97 && e2 <= 122 || e2 >= 65 && e2 <= 90 || e2 >= 48 && e2 <= 57 || e2 === o || 95 === e2 || isNonASCII_IdentCodePoint(e2);
}
function isNonASCII_IdentCodePoint(e2) {
  return e2 < 183 ? 0 === e2 : 183 === e2 || 8204 === e2 || 8205 === e2 || 8255 === e2 || 8256 === e2 || 8204 === e2 || (192 <= e2 && e2 <= 214 || 216 <= e2 && e2 <= 246 || 248 <= e2 && e2 <= 893 || 895 <= e2 && e2 <= 8191 || 8304 <= e2 && e2 <= 8591 || 11264 <= e2 && e2 <= 12271 || 12289 <= e2 && e2 <= 55295 || 63744 <= e2 && e2 <= 64975 || 65008 <= e2 && e2 <= 65533 || (0 === e2 || (e2 >= 55296 && e2 <= 57343 || e2 >= 65536)));
}
function isNonPrintableCodePoint(e2) {
  return 11 === e2 || 127 === e2 || 0 <= e2 && e2 <= 8 || 14 <= e2 && e2 <= 31;
}
function isNewLine(e2) {
  return e2 === r || e2 === t || 12 === e2;
}
function isWhitespace(e2) {
  return 32 === e2 || e2 === r || 9 === e2 || e2 === t || 12 === e2;
}
function isSurrogate(e2) {
  return e2 >= 55296 && e2 <= 57343;
}
function tokenize(e2, n2) {
  const t2 = tokenizer(e2, n2), o2 = [];
  for (; !t2.endOfFile(); ) o2.push(t2.nextToken());
  return o2.push(t2.nextToken()), o2;
}
function tokenizer(n2, l2) {
  const C = n2.css.valueOf(), f = n2.unicodeRangesAllowed ?? false;
  let m = 0, h = 0, k = -1, P = false;
  const p = l2?.onParseError ?? noop;
  function consumeIdentSequence() {
    const e2 = m;
    for (; ; ) {
      const e3 = C.charCodeAt(m);
      if (e3 >= 65 && e3 <= 90 || e3 >= 97 && e3 <= 122 || e3 >= 48 && e3 <= 57 || e3 === o || 95 === e3) {
        m += 1;
        continue;
      }
      const n4 = C.codePointAt(m) ?? -1;
      if (0 === n4 || n4 >= 55296 && n4 <= 57343 || n4 === s && !isNewLine(C.codePointAt(m + 1) ?? -1)) break;
      if (!isNonASCII_IdentCodePoint(n4)) break;
      m += +(n4 > 65535) + 1;
    }
    const n3 = C.codePointAt(m) ?? -1;
    if (0 !== n3 && !(n3 >= 55296 && n3 <= 57343) && (n3 !== s || isNewLine(C.codePointAt(m + 1) ?? -1))) return P = true, k = m - 1, C.slice(e2, m);
    P = false, m = e2, k = -1;
    let t2 = "";
    for (; ; ) {
      const e3 = C.codePointAt(m) ?? -1;
      if (0 === e3 || isSurrogate(e3)) t2 += String.fromCharCode(c), m += +(e3 > 65535) + 1, k = m - 1;
      else if (e3 >= 65 && e3 <= 90 || e3 >= 97 && e3 <= 122 || e3 >= 48 && e3 <= 57 || e3 === o || 95 === e3 || isNonASCII_IdentCodePoint(e3)) t2 += e3 > 65535 ? String.fromCodePoint(e3) : String.fromCharCode(e3), m += +(e3 > 65535) + 1, k = m - 1;
      else {
        if (C.codePointAt(m) !== s || isNewLine(C.codePointAt(m + 1) ?? -1)) return t2;
        m += 1, k = m - 1, t2 += String.fromCodePoint(consumeEscapedCodePoint());
      }
    }
  }
  function consumeEscapedCodePoint() {
    const n3 = C.codePointAt(m);
    if (void 0 === n3) return p(new ParseError(e.UnexpectedEOFInEscapedCodePoint, h, k, ["4.3.7. Consume an escaped code point", "Unexpected EOF"])), c;
    if (m += +(n3 > 65535) + 1, k = m - 1, isHexDigitCodePoint(n3)) {
      const e2 = [n3];
      let o2;
      for (; void 0 !== (o2 = C.codePointAt(m)) && isHexDigitCodePoint(o2) && e2.length < 6; ) e2.push(o2), m += 1, k = m - 1;
      isWhitespace(C.codePointAt(m) ?? -1) && (C.codePointAt(m) === t && C.codePointAt(m + 1) === r && (m += 1), m += 1, k = m - 1);
      const i2 = parseInt(String.fromCodePoint(...e2), 16);
      return 0 === i2 || isSurrogate(i2) || i2 > 1114111 ? c : i2;
    }
    return 0 === n3 || isSurrogate(n3) ? c : n3;
  }
  function consumeBadURL() {
    for (; ; ) {
      const e2 = C.codePointAt(m);
      if (void 0 === e2) return;
      if (41 === e2) return m += 1, void (k = m - 1);
      e2 !== s || isNewLine(C.codePointAt(m + 1) ?? -1) ? (m += 1, k = m - 1) : (m += 1, k = m - 1, consumeEscapedCodePoint());
    }
  }
  function consumeComment() {
    for (m += 2, k = m - 1; ; ) {
      const n3 = C.codePointAt(m);
      if (void 0 === n3) {
        const n4 = [u.Comment, C.slice(h, k + 1), h, k, void 0];
        return p(new ParseErrorWithToken(e.UnexpectedEOFInComment, h, k, ["4.3.2. Consume comments", "Unexpected EOF"], n4)), n4;
      }
      if (m += 1, k = m - 1, 42 === n3 && void 0 !== C.codePointAt(m) && 47 === C.codePointAt(m)) {
        m += 1, k = m - 1;
        break;
      }
    }
    return [u.Comment, C.slice(h, k + 1), h, k, void 0];
  }
  function consumeStringToken() {
    let n3 = "";
    const o2 = C.codePointAt(m);
    for (m += 1, k = m - 1; ; ) {
      const i2 = C.charCodeAt(m);
      if (m >= C.length) {
        const t2 = [u.String, C.slice(h, k + 1), h, k, { value: n3 }];
        return p(new ParseErrorWithToken(e.UnexpectedEOFInString, h, k, ["4.3.5. Consume a string token", "Unexpected EOF"], t2)), t2;
      }
      if (m += 1, k = m - 1, isNewLine(i2)) {
        m -= 1, k = m - 1;
        const n4 = [u.BadString, C.slice(h, k + 1), h, k, void 0];
        return p(new ParseErrorWithToken(e.UnexpectedNewLineInString, h, C.codePointAt(m) === t && C.codePointAt(m + 1) === r ? k + 2 : k + 1, ["4.3.5. Consume a string token", "Unexpected newline"], n4)), n4;
      }
      if (i2 === o2) return [u.String, C.slice(h, k + 1), h, k, { value: n3 }];
      if (i2 !== s) if (0 !== i2) if (i2 < 128) n3 += String.fromCharCode(i2);
      else {
        if (i2 >= 55296 && i2 <= 57343) {
          const e2 = C.codePointAt(m - 1) ?? -1;
          e2 >= 65536 ? (n3 += String.fromCodePoint(e2), m += 1, k = m - 1) : n3 += String.fromCharCode(c);
          continue;
        }
        n3 += String.fromCharCode(i2);
      }
      else n3 += String.fromCharCode(c);
      else {
        if (void 0 === C.codePointAt(m)) continue;
        if (isNewLine(C.codePointAt(m) ?? -1)) {
          C.codePointAt(m) === t && C.codePointAt(m + 1) === r && (m += 1), m += 1, k = m - 1;
          continue;
        }
        n3 += String.fromCodePoint(consumeEscapedCodePoint());
      }
    }
  }
  function consumeUnicodeRangeToken() {
    m += 2, k = m - 1;
    const e2 = [], n3 = [];
    let t2;
    for (; void 0 !== (t2 = C.codePointAt(m)) && e2.length < 6 && isHexDigitCodePoint(t2); ) e2.push(t2), m += 1, k = m - 1;
    for (; void 0 !== (t2 = C.codePointAt(m)) && e2.length < 6 && 63 === t2; ) 0 === n3.length && n3.push(...e2), e2.push(48), n3.push(70), m += 1, k = m - 1;
    if (!n3.length && C.codePointAt(m) === o && isHexDigitCodePoint(C.codePointAt(m + 1) ?? -1)) for (m += 1, k = m - 1; void 0 !== (t2 = C.codePointAt(m)) && n3.length < 6 && isHexDigitCodePoint(t2); ) n3.push(t2), m += 1, k = m - 1;
    if (!n3.length) {
      const n4 = parseInt(String.fromCodePoint(...e2), 16);
      return [u.UnicodeRange, C.slice(h, k + 1), h, k, { startOfRange: n4, endOfRange: n4 }];
    }
    const r2 = parseInt(String.fromCodePoint(...e2), 16), i2 = parseInt(String.fromCodePoint(...n3), 16);
    return [u.UnicodeRange, C.slice(h, k + 1), h, k, { startOfRange: r2, endOfRange: i2 }];
  }
  function consumeUrlToken() {
    for (; isWhitespace(C.codePointAt(m) ?? -1); ) m += 1, k = m - 1;
    let n3 = "";
    for (; ; ) {
      if (void 0 === C.codePointAt(m)) {
        const t3 = [u.URL, C.slice(h, k + 1), h, k, { value: n3 }];
        return p(new ParseErrorWithToken(e.UnexpectedEOFInURL, h, k, ["4.3.6. Consume a url token", "Unexpected EOF"], t3)), t3;
      }
      if (41 === C.codePointAt(m)) return m += 1, k = m - 1, [u.URL, C.slice(h, k + 1), h, k, { value: n3 }];
      if (isWhitespace(C.codePointAt(m) ?? -1)) {
        for (m += 1, k = m - 1; isWhitespace(C.codePointAt(m) ?? -1); ) m += 1, k = m - 1;
        if (void 0 === C.codePointAt(m)) {
          const t3 = [u.URL, C.slice(h, k + 1), h, k, { value: n3 }];
          return p(new ParseErrorWithToken(e.UnexpectedEOFInURL, h, k, ["4.3.6. Consume a url token", "Consume as much whitespace as possible", "Unexpected EOF"], t3)), t3;
        }
        return 41 === C.codePointAt(m) ? (m += 1, k = m - 1, [u.URL, C.slice(h, k + 1), h, k, { value: n3 }]) : (consumeBadURL(), [u.BadURL, C.slice(h, k + 1), h, k, void 0]);
      }
      const t2 = C.codePointAt(m);
      if (34 === t2 || 39 === t2 || 40 === t2 || isNonPrintableCodePoint(t2 ?? -1)) {
        consumeBadURL();
        const n4 = [u.BadURL, C.slice(h, k + 1), h, k, void 0];
        return p(new ParseErrorWithToken(e.UnexpectedCharacterInURL, h, k, ["4.3.6. Consume a url token", `Unexpected U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('), U+0028 LEFT PARENTHESIS (() or non-printable code point`], n4)), n4;
      }
      if (t2 === s) {
        if (t2 === s && !isNewLine(C.codePointAt(m + 1) ?? -1)) {
          m += 1, k = m - 1, n3 += String.fromCodePoint(consumeEscapedCodePoint());
          continue;
        }
        consumeBadURL();
        const o2 = [u.BadURL, C.slice(h, k + 1), h, k, void 0];
        return p(new ParseErrorWithToken(e.InvalidEscapeSequenceInURL, h, k, ["4.3.6. Consume a url token", "U+005C REVERSE SOLIDUS (\\)", "The input stream does not start with a valid escape sequence"], o2)), o2;
      }
      0 === t2 || isSurrogate(t2 ?? -1) ? (n3 += String.fromCharCode(c), m += 1, k = m - 1) : (n3 += String.fromCodePoint(t2 ?? c), m += +((t2 ?? -1) > 65535) + 1, k = m - 1);
    }
  }
  function consumeNumericToken() {
    let e2;
    {
      const n4 = C.charCodeAt(m);
      n4 === o ? e2 = "-" : n4 === i && (e2 = "+");
    }
    let n3 = a.Integer;
    const t2 = C.charCodeAt(m);
    t2 !== i && t2 !== o || (m += 1);
    let r2 = C.charCodeAt(m);
    for (; r2 >= 48 && r2 <= 57; ) m += 1, r2 = C.charCodeAt(m);
    if (46 === C.charCodeAt(m) && C.charCodeAt(m + 1) >= 48 && C.charCodeAt(m + 1) <= 57) for (m += 2, n3 = a.Number, r2 = C.charCodeAt(m); r2 >= 48 && r2 <= 57; ) m += 1, r2 = C.charCodeAt(m);
    const c2 = C.charCodeAt(m);
    if (101 === c2 || 69 === c2) {
      const e3 = C.charCodeAt(m + 1);
      if (e3 >= 48 && e3 <= 57) for (m += 2, n3 = a.Number, r2 = C.charCodeAt(m); r2 >= 48 && r2 <= 57; ) m += 1, r2 = C.charCodeAt(m);
      else if ((e3 === o || e3 === i) && C.charCodeAt(m + 2) >= 48 && C.charCodeAt(m + 2) <= 57) for (m += 3, n3 = a.Number, r2 = C.charCodeAt(m); r2 >= 48 && r2 <= 57; ) m += 1, r2 = C.charCodeAt(m);
    }
    k = m - 1;
    const s2 = parseFloat(C.slice(h, k + 1));
    if (checkIfThreeCodePointsWouldStartAnIdentSequence()) {
      const t3 = consumeIdentSequence();
      return [u.Dimension, C.slice(h, k + 1), h, k, { value: s2, signCharacter: e2, type: n3, unit: t3 }];
    }
    return 37 === C.charCodeAt(m) ? (m += 1, k = m - 1, [u.Percentage, C.slice(h, k + 1), h, k, { value: s2, signCharacter: e2 }]) : [u.Number, C.slice(h, k + 1), h, k, { value: s2, signCharacter: e2, type: n3 }];
  }
  function consumeIdentLikeToken() {
    const e2 = consumeIdentSequence();
    if (40 !== C.charCodeAt(m)) return [u.Ident, P ? e2 : C.slice(h, k + 1), h, k, { value: e2 }];
    if (!(3 !== e2.length || 117 !== e2.charCodeAt(0) && 85 !== e2.charCodeAt(0) || 114 !== e2.charCodeAt(1) && 82 !== e2.charCodeAt(1) || 108 !== e2.charCodeAt(2) && 76 !== e2.charCodeAt(2))) {
      m += 1, k = m - 1;
      let n3 = 0;
      for (; isWhitespace(C.charCodeAt(m)); ) n3 += 1, m += 1, k = m - 1;
      const t2 = C.charCodeAt(m);
      return 34 === t2 || 39 === t2 ? (n3 > 0 && (m -= n3, k = m - 1), [u.Function, C.slice(h, k + 1), h, k, { value: e2 }]) : consumeUrlToken();
    }
    return m += 1, k = m - 1, [u.Function, C.slice(h, k + 1), h, k, { value: e2 }];
  }
  function consumeHashToken() {
    m += 1, k = m - 1;
    const e2 = C.charCodeAt(m);
    if (e2 >= 65 && e2 <= 90 || e2 >= 97 && e2 <= 122 || e2 >= 48 && e2 <= 57 || e2 === o || 95 === e2 || isNonASCII_IdentCodePoint(e2) || e2 === s && !isNewLine(C.codePointAt(m + 1) ?? -1)) {
      let e3 = d.Unrestricted;
      checkIfThreeCodePointsWouldStartAnIdentSequence() && (e3 = d.ID);
      const n3 = consumeIdentSequence();
      return [u.Hash, C.slice(h, k + 1), h, k, { value: n3, type: e3 }];
    }
    return [u.Delim, "#", h, k, { value: "#" }];
  }
  function consumeAtKeywordToken() {
    if (m += 1, k = m - 1, checkIfThreeCodePointsWouldStartAnIdentSequence()) {
      const e2 = consumeIdentSequence();
      return [u.AtKeyword, C.slice(h, k + 1), h, k, { value: e2 }];
    }
    return [u.Delim, "@", h, k, { value: "@" }];
  }
  function consumeInvalidEscapeToken() {
    m += 1, k = m - 1;
    const n3 = [u.Delim, "\\", h, k, { value: "\\" }];
    return p(new ParseErrorWithToken(e.InvalidEscapeSequenceAfterBackslash, h, k, ["4.3.1. Consume a token", "U+005C REVERSE SOLIDUS (\\)", "The input stream does not start with a valid escape sequence"], n3)), n3;
  }
  function checkIfThreeCodePointsWouldStartAnIdentSequence(e2) {
    const n3 = void 0 === e2 ? C.charCodeAt(m) : e2;
    return n3 === o ? C.charCodeAt(m + 1) === o || (!!isIdentStartCodePoint(C.charCodeAt(m + 1)) || C.charCodeAt(m + 1) === s && !isNewLine(C.charCodeAt(m + 2))) : !!isIdentStartCodePoint(n3) || C.charCodeAt(m) === s && !isNewLine(C.charCodeAt(m + 1));
  }
  function checkIfThreeCodePointsWouldStartANumber(e2) {
    return e2 === i || e2 === o ? C.charCodeAt(m + 1) >= 48 && C.charCodeAt(m + 1) <= 57 || 46 === C.charCodeAt(m + 1) && (C.charCodeAt(m + 2) >= 48 && C.charCodeAt(m + 2) <= 57) : 46 === e2 ? C.charCodeAt(m + 1) >= 48 && C.charCodeAt(m + 1) <= 57 : e2 >= 48 && e2 <= 57;
  }
  return { nextToken: function nextToken() {
    if (h = m, k = -1, m >= C.length) return [u.EOF, "", -1, -1, void 0];
    const e2 = C.charCodeAt(m);
    if (47 === e2 && 42 === C.charCodeAt(m + 1)) return consumeComment();
    if (f && (117 === e2 || 85 === e2) && C.codePointAt(m + 1) === i && (63 === C.codePointAt(m + 2) || isHexDigitCodePoint(C.codePointAt(m + 2) ?? -1))) return consumeUnicodeRangeToken();
    if (isIdentStartCodePoint(e2)) return consumeIdentLikeToken();
    if ((n3 = e2) >= 48 && n3 <= 57) return consumeNumericToken();
    switch (e2) {
      case 44:
        return m += 1, k = m - 1, [u.Comma, ",", h, k, void 0];
      case 58:
        return m += 1, k = m - 1, [u.Colon, ":", h, k, void 0];
      case 59:
        return m += 1, k = m - 1, [u.Semicolon, ";", h, k, void 0];
      case 40:
        return m += 1, k = m - 1, [u.OpenParen, "(", h, k, void 0];
      case 41:
        return m += 1, k = m - 1, [u.CloseParen, ")", h, k, void 0];
      case 91:
        return m += 1, k = m - 1, [u.OpenSquare, "[", h, k, void 0];
      case 93:
        return m += 1, k = m - 1, [u.CloseSquare, "]", h, k, void 0];
      case 123:
        return m += 1, k = m - 1, [u.OpenCurly, "{", h, k, void 0];
      case 125:
        return m += 1, k = m - 1, [u.CloseCurly, "}", h, k, void 0];
      case 39:
      case 34:
        return consumeStringToken();
      case 35:
        return consumeHashToken();
      case i:
      case 46:
        return checkIfThreeCodePointsWouldStartANumber(e2) ? consumeNumericToken() : (m += 1, k = m - 1, [u.Delim, C[h], h, k, { value: C[h] }]);
      case r:
      case t:
      case 12:
      case 9:
      case 32:
        {
          let e3 = C.charCodeAt(m);
          for (; 32 === e3 || e3 === r || 9 === e3 || e3 === t || 12 === e3; ) m += 1, e3 = C.charCodeAt(m);
          k = m - 1;
        }
        return [u.Whitespace, C.slice(h, k + 1), h, k, void 0];
      case o:
        return checkIfThreeCodePointsWouldStartANumber(e2) ? consumeNumericToken() : C.charCodeAt(m + 1) === o && 62 === C.charCodeAt(m + 2) ? (m += 3, k = m - 1, [u.CDC, "-->", h, k, void 0]) : checkIfThreeCodePointsWouldStartAnIdentSequence(e2) ? consumeIdentLikeToken() : (m += 1, k = m - 1, [u.Delim, "-", h, k, { value: "-" }]);
      case 60:
        return 33 === C.charCodeAt(m + 1) && C.charCodeAt(m + 2) === o && C.charCodeAt(m + 3) === o ? (m += 4, k = m - 1, [u.CDO, "<!--", h, k, void 0]) : (m += 1, k = m - 1, [u.Delim, "<", h, k, { value: "<" }]);
      case 64:
        return consumeAtKeywordToken();
      case s:
        return e2 !== s || isNewLine(C.charCodeAt(m + 1)) ? consumeInvalidEscapeToken() : consumeIdentLikeToken();
      default:
        return m += 1, k = m - 1, [u.Delim, C[h], h, k, { value: C[h] }];
    }
    var n3;
  }, endOfFile: function endOfFile() {
    return m >= C.length;
  } };
}
function noop() {
}
function mutateIdent(e2, n2) {
  const t2 = [];
  for (const e3 of n2) t2.push(e3.codePointAt(0));
  const o2 = String.fromCodePoint(...serializeIdent(t2));
  e2[1] = o2, e2[4].value = n2;
}
function mutateUnit(e2, n2) {
  const t2 = [];
  for (const e3 of n2) t2.push(e3.codePointAt(0));
  const o2 = serializeIdent(t2);
  101 === o2[0] && insertEscapedCodePoint(o2, 0, o2[0]);
  const r2 = String.fromCodePoint(...o2), i2 = "+" === e2[4].signCharacter ? e2[4].signCharacter : "", c2 = e2[4].value.toString();
  e2[1] = `${i2}${c2}${r2}`, e2[4].unit = n2;
}
function serializeIdent(e2) {
  let n2;
  if (0 === e2[0]) e2.splice(0, 1, c), n2 = 1;
  else if (e2[0] === o && e2[1] === o) n2 = 2;
  else if (e2[0] === o && e2[1]) n2 = 2, isIdentStartCodePoint(e2[1]) || (n2 += insertEscapedCodePoint(e2, 1, e2[1]));
  else {
    if (e2[0] === o && !e2[1]) return [92, e2[0]];
    isIdentStartCodePoint(e2[0]) ? n2 = 1 : (n2 = 1, n2 += insertEscapedCodePoint(e2, 0, e2[0]));
  }
  for (let t2 = n2; t2 < e2.length; t2++) 0 !== e2[t2] ? isIdentCodePoint(e2[t2]) || (t2 += insertEscapedCharacter(e2, t2, e2[t2])) : (e2.splice(t2, 1, c), t2++);
  return e2;
}
function insertEscapedCharacter(e2, n2, t2) {
  return e2.splice(n2, 1, 92, t2), 1;
}
function insertEscapedCodePoint(e2, n2, t2) {
  const o2 = t2.toString(16), r2 = [];
  for (const e3 of o2) r2.push(e3.codePointAt(0));
  return e2.splice(n2, 1, 92, ...r2, 32), 1 + r2.length;
}
!(function(e2) {
  e2.Comment = "comment", e2.AtKeyword = "at-keyword-token", e2.BadString = "bad-string-token", e2.BadURL = "bad-url-token", e2.CDC = "CDC-token", e2.CDO = "CDO-token", e2.Colon = "colon-token", e2.Comma = "comma-token", e2.Delim = "delim-token", e2.Dimension = "dimension-token", e2.EOF = "EOF-token", e2.Function = "function-token", e2.Hash = "hash-token", e2.Ident = "ident-token", e2.Number = "number-token", e2.Percentage = "percentage-token", e2.Semicolon = "semicolon-token", e2.String = "string-token", e2.URL = "url-token", e2.Whitespace = "whitespace-token", e2.OpenParen = "(-token", e2.CloseParen = ")-token", e2.OpenSquare = "[-token", e2.CloseSquare = "]-token", e2.OpenCurly = "{-token", e2.CloseCurly = "}-token", e2.UnicodeRange = "unicode-range-token";
})(u || (u = {})), (function(e2) {
  e2.Integer = "integer", e2.Number = "number";
})(a || (a = {})), (function(e2) {
  e2.Unrestricted = "unrestricted", e2.ID = "id";
})(d || (d = {}));
const l = Object.values(u);
function isToken(e2) {
  return !!Array.isArray(e2) && (!(e2.length < 4) && (!!l.includes(e2[0]) && ("string" == typeof e2[1] && ("number" == typeof e2[2] && "number" == typeof e2[3]))));
}
function isTokenNumeric(e2) {
  if (!e2) return false;
  switch (e2[0]) {
    case u.Dimension:
    case u.Number:
    case u.Percentage:
      return true;
    default:
      return false;
  }
}
function isTokenWhiteSpaceOrComment(e2) {
  if (!e2) return false;
  switch (e2[0]) {
    case u.Whitespace:
    case u.Comment:
      return true;
    default:
      return false;
  }
}
function isTokenAtKeyword(e2) {
  return !!e2 && e2[0] === u.AtKeyword;
}
function isTokenBadString(e2) {
  return !!e2 && e2[0] === u.BadString;
}
function isTokenBadURL(e2) {
  return !!e2 && e2[0] === u.BadURL;
}
function isTokenCDC(e2) {
  return !!e2 && e2[0] === u.CDC;
}
function isTokenCDO(e2) {
  return !!e2 && e2[0] === u.CDO;
}
function isTokenColon(e2) {
  return !!e2 && e2[0] === u.Colon;
}
function isTokenComma(e2) {
  return !!e2 && e2[0] === u.Comma;
}
function isTokenComment(e2) {
  return !!e2 && e2[0] === u.Comment;
}
function isTokenDelim(e2) {
  return !!e2 && e2[0] === u.Delim;
}
function isTokenDimension(e2) {
  return !!e2 && e2[0] === u.Dimension;
}
function isTokenEOF(e2) {
  return !!e2 && e2[0] === u.EOF;
}
function isTokenFunction(e2) {
  return !!e2 && e2[0] === u.Function;
}
function isTokenHash(e2) {
  return !!e2 && e2[0] === u.Hash;
}
function isTokenIdent(e2) {
  return !!e2 && e2[0] === u.Ident;
}
function isTokenNumber(e2) {
  return !!e2 && e2[0] === u.Number;
}
function isTokenPercentage(e2) {
  return !!e2 && e2[0] === u.Percentage;
}
function isTokenSemicolon(e2) {
  return !!e2 && e2[0] === u.Semicolon;
}
function isTokenString(e2) {
  return !!e2 && e2[0] === u.String;
}
function isTokenURL(e2) {
  return !!e2 && e2[0] === u.URL;
}
function isTokenWhitespace(e2) {
  return !!e2 && e2[0] === u.Whitespace;
}
function isTokenOpenParen(e2) {
  return !!e2 && e2[0] === u.OpenParen;
}
function isTokenCloseParen(e2) {
  return !!e2 && e2[0] === u.CloseParen;
}
function isTokenOpenSquare(e2) {
  return !!e2 && e2[0] === u.OpenSquare;
}
function isTokenCloseSquare(e2) {
  return !!e2 && e2[0] === u.CloseSquare;
}
function isTokenOpenCurly(e2) {
  return !!e2 && e2[0] === u.OpenCurly;
}
function isTokenCloseCurly(e2) {
  return !!e2 && e2[0] === u.CloseCurly;
}
function isTokenUnicodeRange(e2) {
  return !!e2 && e2[0] === u.UnicodeRange;
}
