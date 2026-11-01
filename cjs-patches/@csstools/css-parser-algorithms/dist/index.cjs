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
  CommentNode: () => CommentNode,
  ComponentValueType: () => k,
  ContainerNodeBaseClass: () => ContainerNodeBaseClass,
  FunctionNode: () => FunctionNode,
  SimpleBlockNode: () => SimpleBlockNode,
  TokenNode: () => TokenNode,
  WhitespaceNode: () => WhitespaceNode,
  forEach: () => forEach,
  gatherNodeAncestry: () => gatherNodeAncestry,
  isCommentNode: () => isCommentNode,
  isFunctionNode: () => isFunctionNode,
  isSimpleBlockNode: () => isSimpleBlockNode,
  isTokenNode: () => isTokenNode,
  isWhiteSpaceOrCommentNode: () => isWhiteSpaceOrCommentNode,
  isWhitespaceNode: () => isWhitespaceNode,
  parseCommaSeparatedListOfComponentValues: () => parseCommaSeparatedListOfComponentValues,
  parseComponentValue: () => parseComponentValue,
  parseListOfComponentValues: () => parseListOfComponentValues,
  replaceComponentValues: () => replaceComponentValues,
  sourceIndices: () => sourceIndices,
  stringify: () => stringify,
  walk: () => walk,
  walkerIndexGenerator: () => walkerIndexGenerator
});
module.exports = __toCommonJS(stdin_exports);
var import_css_tokenizer = require("@csstools/css-tokenizer");
var k;
function walkerIndexGenerator(e2) {
  let n2, t2 = e2.slice(), o2 = -1;
  return (e3, s2, i2) => {
    if (e3 === n2 && e3.length === o2 && e3[i2] === s2) {
      o2 = e3.length;
      const n3 = i2 + 1;
      return n3 < e3.length ? n3 : -1;
    }
    let r2 = -1;
    for (let n3 = t2.indexOf(s2); n3 < t2.length && (r2 = e3.indexOf(t2[n3]), -1 === r2 || r2 < i2); n3++) ;
    return -1 === r2 || r2 === i2 && s2 === e3[i2] && (r2++, r2 >= e3.length) ? (n2 = e3, o2 = e3.length, -1) : (t2 = e3.slice(), n2 = e3, o2 = e3.length, r2);
  };
}
!(function(e2) {
  e2.Function = "function", e2.SimpleBlock = "simple-block", e2.Whitespace = "whitespace", e2.Comment = "comment", e2.Token = "token";
})(k || (k = {}));
const N = 512;
function consumeComponentValue(e2, n2, t2 = 0, o2 = 0) {
  const s2 = n2[t2];
  if ((0, import_css_tokenizer.isTokenOpenParen)(s2) || (0, import_css_tokenizer.isTokenOpenCurly)(s2) || (0, import_css_tokenizer.isTokenOpenSquare)(s2)) {
    const s3 = consumeSimpleBlock(e2, n2, t2, o2);
    return { advance: s3.advance, node: s3.node };
  }
  if ((0, import_css_tokenizer.isTokenFunction)(s2)) {
    const s3 = consumeFunction(e2, n2, t2, o2);
    return { advance: s3.advance, node: s3.node };
  }
  if ((0, import_css_tokenizer.isTokenWhitespace)(s2)) {
    const o3 = consumeWhitespace(e2, n2, t2);
    return { advance: o3.advance, node: o3.node };
  }
  if ((0, import_css_tokenizer.isTokenComment)(s2)) {
    const o3 = consumeComment(e2, n2, t2);
    return { advance: o3.advance, node: o3.node };
  }
  return { advance: 1, node: new TokenNode(s2) };
}
class ContainerNodeBaseClass {
  value = [];
  indexOf(e2) {
    return this.value.indexOf(e2);
  }
  at(e2) {
    if ("number" == typeof e2) return e2 < 0 && (e2 = this.value.length + e2), this.value[e2];
  }
  forEach(e2, n2) {
    if (0 === this.value.length) return;
    const t2 = walkerIndexGenerator(this.value);
    let o2 = 0;
    for (; o2 < this.value.length; ) {
      const s2 = this.value[o2];
      let i2;
      if (n2 && (i2 = { ...n2 }), false === e2({ node: s2, parent: this, state: i2 }, o2)) return false;
      if (o2 = t2(this.value, s2, o2), -1 === o2) break;
    }
  }
  walk(e2, n2) {
    0 !== this.value.length && this.forEach((n3, t2) => false !== e2(n3, t2) && ((!("walk" in n3.node) || !("number" == typeof t2 && this.value[t2] === n3.node || this.value.includes(n3.node)) || false !== n3.node.walk(e2, n3.state)) && void 0), n2);
  }
}
class FunctionNode extends ContainerNodeBaseClass {
  type = k.Function;
  name;
  endToken;
  constructor(e2, n2, t2) {
    super(), this.name = e2, this.endToken = n2, this.value = t2;
  }
  getName() {
    return this.name[4].value;
  }
  normalize() {
    (0, import_css_tokenizer.isTokenEOF)(this.endToken) && (this.endToken = [import_css_tokenizer.TokenType.CloseParen, ")", -1, -1, void 0]);
  }
  tokens() {
    return (0, import_css_tokenizer.isTokenEOF)(this.endToken) ? [this.name, ...this.value.flatMap((e2) => e2.tokens())] : [this.name, ...this.value.flatMap((e2) => e2.tokens()), this.endToken];
  }
  toString() {
    const n2 = this.value.map((n3) => (0, import_css_tokenizer.isToken)(n3) ? (0, import_css_tokenizer.stringify)(n3) : n3.toString()).join("");
    return (0, import_css_tokenizer.stringify)(this.name) + n2 + (0, import_css_tokenizer.stringify)(this.endToken);
  }
  toJSON() {
    return { type: this.type, name: this.getName(), tokens: this.tokens(), value: this.value.map((e2) => e2.toJSON()) };
  }
  isFunctionNode() {
    return FunctionNode.isFunctionNode(this);
  }
  static isFunctionNode(e2) {
    return !!e2 && (e2 instanceof FunctionNode && e2.type === k.Function);
  }
}
function consumeFunction(e2, t2, o2, s2) {
  if (s2 >= N) throw new Error("Maximum nesting depth of 512 exceeded, reduce the complexity of your stylesheet.");
  const i2 = [];
  let r2 = o2 + 1;
  for (; ; ) {
    const a2 = t2[r2];
    if (!a2 || (0, import_css_tokenizer.isTokenEOF)(a2)) return e2.onParseError(new import_css_tokenizer.ParseError("Unexpected EOF while consuming a function.", t2[o2][2], t2[t2.length - 1][3], ["5.4.9. Consume a function", "Unexpected EOF"])), { advance: t2.length - o2, node: new FunctionNode(t2[o2], a2, i2) };
    if ((0, import_css_tokenizer.isTokenCloseParen)(a2)) return { advance: r2 - o2 + 1, node: new FunctionNode(t2[o2], a2, i2) };
    if ((0, import_css_tokenizer.isTokenWhiteSpaceOrComment)(a2)) {
      const n2 = consumeAllCommentsAndWhitespace(e2, t2, r2);
      r2 += n2.advance;
      for (let e3 = 0; e3 < n2.nodes.length; e3++) i2.push(n2.nodes[e3]);
      continue;
    }
    const c2 = consumeComponentValue(e2, t2, r2, s2 + 1);
    r2 += c2.advance, i2.push(c2.node);
  }
}
class SimpleBlockNode extends ContainerNodeBaseClass {
  type = k.SimpleBlock;
  startToken;
  endToken;
  constructor(e2, n2, t2) {
    super(), this.startToken = e2, this.endToken = n2, this.value = t2;
  }
  normalize() {
    if ((0, import_css_tokenizer.isTokenEOF)(this.endToken)) {
      const e2 = (0, import_css_tokenizer.mirrorVariant)(this.startToken);
      e2 && (this.endToken = e2);
    }
  }
  tokens() {
    return (0, import_css_tokenizer.isTokenEOF)(this.endToken) ? [this.startToken, ...this.value.flatMap((e2) => e2.tokens())] : [this.startToken, ...this.value.flatMap((e2) => e2.tokens()), this.endToken];
  }
  toString() {
    const n2 = this.value.map((n3) => (0, import_css_tokenizer.isToken)(n3) ? (0, import_css_tokenizer.stringify)(n3) : n3.toString()).join("");
    return (0, import_css_tokenizer.stringify)(this.startToken) + n2 + (0, import_css_tokenizer.stringify)(this.endToken);
  }
  toJSON() {
    return { type: this.type, startToken: this.startToken, tokens: this.tokens(), value: this.value.map((e2) => e2.toJSON()) };
  }
  isSimpleBlockNode() {
    return SimpleBlockNode.isSimpleBlockNode(this);
  }
  static isSimpleBlockNode(e2) {
    return !!e2 && (e2 instanceof SimpleBlockNode && e2.type === k.SimpleBlock);
  }
}
function consumeSimpleBlock(e2, t2, o2, s2) {
  if (s2 >= N) throw new Error("Maximum nesting depth of 512 exceeded, reduce the complexity of your stylesheet.");
  const i2 = (0, import_css_tokenizer.mirrorVariantType)(t2[o2][0]);
  if (!i2) throw new Error("Failed to parse, a mirror variant must exist for all block open tokens.");
  const r2 = [];
  let a2 = o2 + 1;
  for (; ; ) {
    const c2 = t2[a2];
    if (!c2 || (0, import_css_tokenizer.isTokenEOF)(c2)) return e2.onParseError(new import_css_tokenizer.ParseError("Unexpected EOF while consuming a simple block.", t2[o2][2], t2[t2.length - 1][3], ["5.4.8. Consume a simple block", "Unexpected EOF"])), { advance: t2.length - o2, node: new SimpleBlockNode(t2[o2], c2, r2) };
    if (c2[0] === i2) return { advance: a2 - o2 + 1, node: new SimpleBlockNode(t2[o2], c2, r2) };
    if ((0, import_css_tokenizer.isTokenWhiteSpaceOrComment)(c2)) {
      const n2 = consumeAllCommentsAndWhitespace(e2, t2, a2);
      a2 += n2.advance;
      for (let e3 = 0; e3 < n2.nodes.length; e3++) r2.push(n2.nodes[e3]);
      continue;
    }
    const u2 = consumeComponentValue(e2, t2, a2, s2 + 1);
    a2 += u2.advance, r2.push(u2.node);
  }
}
class WhitespaceNode {
  type = k.Whitespace;
  value;
  constructor(e2) {
    this.value = e2;
  }
  tokens() {
    return this.value;
  }
  toString() {
    return (0, import_css_tokenizer.stringify)(this.value);
  }
  toJSON() {
    return { type: this.type, tokens: this.tokens() };
  }
  isWhitespaceNode() {
    return WhitespaceNode.isWhitespaceNode(this);
  }
  static isWhitespaceNode(e2) {
    return !!e2 && (e2 instanceof WhitespaceNode && e2.type === k.Whitespace);
  }
}
function consumeWhitespace(e2, n2, t2) {
  let o2 = t2;
  for (; ; ) {
    const e3 = n2[o2];
    if (!(0, import_css_tokenizer.isTokenWhitespace)(e3)) return { advance: o2 - t2, node: new WhitespaceNode(n2.slice(t2, o2)) };
    o2++;
  }
}
class CommentNode {
  type = k.Comment;
  value;
  constructor(e2) {
    this.value = e2;
  }
  tokens() {
    return [this.value];
  }
  toString() {
    return (0, import_css_tokenizer.stringify)(this.value);
  }
  toJSON() {
    return { type: this.type, tokens: this.tokens() };
  }
  isCommentNode() {
    return CommentNode.isCommentNode(this);
  }
  static isCommentNode(e2) {
    return !!e2 && (e2 instanceof CommentNode && e2.type === k.Comment);
  }
}
function consumeComment(e2, n2, t2) {
  return { advance: 1, node: new CommentNode(n2[t2]) };
}
function consumeAllCommentsAndWhitespace(e2, n2, t2) {
  const o2 = [];
  let s2 = t2;
  for (; ; ) {
    if ((0, import_css_tokenizer.isTokenWhitespace)(n2[s2])) {
      const e3 = consumeWhitespace(0, n2, s2);
      s2 += e3.advance, o2.push(e3.node);
      continue;
    }
    if (!(0, import_css_tokenizer.isTokenComment)(n2[s2])) return { advance: s2 - t2, nodes: o2 };
    o2.push(new CommentNode(n2[s2])), s2++;
  }
}
class TokenNode {
  type = k.Token;
  value;
  constructor(e2) {
    this.value = e2;
  }
  tokens() {
    return [this.value];
  }
  toString() {
    return this.value[1];
  }
  toJSON() {
    return { type: this.type, tokens: this.tokens() };
  }
  isTokenNode() {
    return TokenNode.isTokenNode(this);
  }
  static isTokenNode(e2) {
    return !!e2 && (e2 instanceof TokenNode && e2.type === k.Token);
  }
}
function parseComponentValue(e2, o2) {
  const s2 = { onParseError: o2?.onParseError ?? (() => {
  }) }, i2 = [...e2];
  if (0 === i2.length) return;
  (0, import_css_tokenizer.isTokenEOF)(i2[i2.length - 1]) || i2.push([import_css_tokenizer.TokenType.EOF, "", i2[i2.length - 1][2], i2[i2.length - 1][3], void 0]);
  const r2 = consumeComponentValue(s2, i2);
  if ((0, import_css_tokenizer.isTokenEOF)(i2[Math.min(r2.advance, i2.length - 1)])) return r2.node;
  s2.onParseError(new import_css_tokenizer.ParseError("Expected EOF after parsing a component value.", e2[0][2], e2[e2.length - 1][3], ["5.3.9. Parse a component value", "Expected EOF"]));
}
function parseListOfComponentValues(e2, o2) {
  const s2 = { onParseError: o2?.onParseError ?? (() => {
  }) }, i2 = [...e2];
  if (0 === i2.length) return [];
  (0, import_css_tokenizer.isTokenEOF)(i2[i2.length - 1]) || i2.push([import_css_tokenizer.TokenType.EOF, "", i2[i2.length - 1][2], i2[i2.length - 1][3], void 0]);
  const r2 = [];
  let a2 = 0;
  for (; ; ) {
    if (!i2[a2] || (0, import_css_tokenizer.isTokenEOF)(i2[a2])) return r2;
    const e3 = consumeComponentValue(s2, i2, a2, 0);
    r2.push(e3.node), a2 += e3.advance;
  }
}
function parseCommaSeparatedListOfComponentValues(e2, o2) {
  const s2 = { onParseError: o2?.onParseError ?? (() => {
  }) }, i2 = [...e2];
  if (0 === e2.length) return [];
  (0, import_css_tokenizer.isTokenEOF)(i2[i2.length - 1]) || i2.push([import_css_tokenizer.TokenType.EOF, "", i2[i2.length - 1][2], i2[i2.length - 1][3], void 0]);
  const r2 = [];
  let a2 = [], c2 = 0;
  for (; ; ) {
    if (!i2[c2] || (0, import_css_tokenizer.isTokenEOF)(i2[c2])) return r2.push(a2), r2;
    if ((0, import_css_tokenizer.isTokenComma)(i2[c2])) {
      r2.push(a2), a2 = [], c2++;
      continue;
    }
    const e3 = consumeComponentValue(s2, i2, c2, 0);
    a2.push(e3.node), c2 += e3.advance;
  }
}
function gatherNodeAncestry(e2) {
  const n2 = /* @__PURE__ */ new Map();
  return e2.walk((e3) => {
    Array.isArray(e3.node) ? e3.node.forEach((t2) => {
      n2.set(t2, e3.parent);
    }) : n2.set(e3.node, e3.parent);
  }), n2;
}
function forEach(e2, n2, t2) {
  if (0 === e2.length) return;
  const o2 = walkerIndexGenerator(e2);
  let s2 = 0;
  for (; s2 < e2.length; ) {
    const i2 = e2[s2];
    let r2;
    if (t2 && (r2 = { ...t2 }), false === n2({ node: i2, parent: { value: e2 }, state: r2 }, s2)) return false;
    if (s2 = o2(e2, i2, s2), -1 === s2) break;
  }
}
function walk(e2, n2, t2) {
  0 !== e2.length && forEach(e2, (t3, o2) => false !== n2(t3, o2) && ((!("walk" in t3.node) || !("number" == typeof o2 && e2[o2] === t3.node || e2.includes(t3.node)) || false !== t3.node.walk(n2, t3.state)) && void 0), t2);
}
function replaceComponentValues(e2, n2) {
  for (let t2 = 0; t2 < e2.length; t2++) {
    walk(e2[t2], (e3, t3) => {
      if ("number" != typeof t3) return;
      const o2 = n2(e3.node);
      o2 && (Array.isArray(o2) ? e3.parent.value.splice(t3, 1, ...o2) : e3.parent.value.splice(t3, 1, o2));
    });
  }
  return e2;
}
function stringify(n2) {
  return n2.map((n3) => n3.map((n4) => (0, import_css_tokenizer.stringify)(n4.tokens())).join("")).join(",");
}
function isSimpleBlockNode(e2) {
  return SimpleBlockNode.isSimpleBlockNode(e2);
}
function isFunctionNode(e2) {
  return FunctionNode.isFunctionNode(e2);
}
function isWhitespaceNode(e2) {
  return WhitespaceNode.isWhitespaceNode(e2);
}
function isCommentNode(e2) {
  return CommentNode.isCommentNode(e2);
}
function isWhiteSpaceOrCommentNode(e2) {
  return isWhitespaceNode(e2) || isCommentNode(e2);
}
function isTokenNode(e2) {
  return TokenNode.isTokenNode(e2);
}
function sourceIndices(e2) {
  if (Array.isArray(e2)) {
    const n3 = e2[0];
    if (!n3) return [0, 0];
    const t3 = e2[e2.length - 1] || n3;
    return [sourceIndices(n3)[0], sourceIndices(t3)[1]];
  }
  const n2 = e2.tokens(), t2 = n2[0], o2 = n2[n2.length - 1];
  return t2 && o2 ? [t2[2], o2[3]] : [0, 0];
}
