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
  Parser: () => Parser
});
module.exports = __toCommonJS(stdin_exports);
var import_tokenizer = require("../tokenizer/index.js");
var import_open_element_stack = require("./open-element-stack.js");
var import_formatting_element_list = require("./formatting-element-list.js");
var import_default = require("../tree-adapters/default.js");
var doctype = __toESM(require("../common/doctype.js"));
var foreignContent = __toESM(require("../common/foreign-content.js"));
var import_error_codes = require("../common/error-codes.js");
var unicode = __toESM(require("../common/unicode.js"));
var import_html = require("../common/html.js");
var import_token = require("../common/token.js");
const HIDDEN_INPUT_TYPE = "hidden";
const AA_OUTER_LOOP_ITER = 8;
const AA_INNER_LOOP_ITER = 3;
var InsertionMode;
(function(InsertionMode2) {
  InsertionMode2[InsertionMode2["INITIAL"] = 0] = "INITIAL";
  InsertionMode2[InsertionMode2["BEFORE_HTML"] = 1] = "BEFORE_HTML";
  InsertionMode2[InsertionMode2["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
  InsertionMode2[InsertionMode2["IN_HEAD"] = 3] = "IN_HEAD";
  InsertionMode2[InsertionMode2["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
  InsertionMode2[InsertionMode2["AFTER_HEAD"] = 5] = "AFTER_HEAD";
  InsertionMode2[InsertionMode2["IN_BODY"] = 6] = "IN_BODY";
  InsertionMode2[InsertionMode2["TEXT"] = 7] = "TEXT";
  InsertionMode2[InsertionMode2["IN_TABLE"] = 8] = "IN_TABLE";
  InsertionMode2[InsertionMode2["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
  InsertionMode2[InsertionMode2["IN_CAPTION"] = 10] = "IN_CAPTION";
  InsertionMode2[InsertionMode2["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
  InsertionMode2[InsertionMode2["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
  InsertionMode2[InsertionMode2["IN_ROW"] = 13] = "IN_ROW";
  InsertionMode2[InsertionMode2["IN_CELL"] = 14] = "IN_CELL";
  InsertionMode2[InsertionMode2["IN_SELECT"] = 15] = "IN_SELECT";
  InsertionMode2[InsertionMode2["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
  InsertionMode2[InsertionMode2["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
  InsertionMode2[InsertionMode2["AFTER_BODY"] = 18] = "AFTER_BODY";
  InsertionMode2[InsertionMode2["IN_FRAMESET"] = 19] = "IN_FRAMESET";
  InsertionMode2[InsertionMode2["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
  InsertionMode2[InsertionMode2["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
  InsertionMode2[InsertionMode2["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
const BASE_LOC = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
};
const TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([import_html.TAG_ID.TABLE, import_html.TAG_ID.TBODY, import_html.TAG_ID.TFOOT, import_html.TAG_ID.THEAD, import_html.TAG_ID.TR]);
const defaultParserOptions = {
  scriptingEnabled: true,
  sourceCodeLocationInfo: false,
  treeAdapter: import_default.defaultTreeAdapter,
  onParseError: null
};
class Parser {
  constructor(options, document, fragmentContext = null, scriptHandler = null) {
    this.fragmentContext = fragmentContext;
    this.scriptHandler = scriptHandler;
    this.currentToken = null;
    this.stopped = false;
    this.insertionMode = InsertionMode.INITIAL;
    this.originalInsertionMode = InsertionMode.INITIAL;
    this.headElement = null;
    this.formElement = null;
    this.currentNotInHTML = false;
    this.tmplInsertionModeStack = [];
    this.pendingCharacterTokens = [];
    this.hasNonWhitespacePendingCharacterToken = false;
    this.framesetOk = true;
    this.skipNextNewLine = false;
    this.fosterParentingEnabled = false;
    this.options = {
      ...defaultParserOptions,
      ...options
    };
    this.treeAdapter = this.options.treeAdapter;
    this.onParseError = this.options.onParseError;
    if (this.onParseError) {
      this.options.sourceCodeLocationInfo = true;
    }
    this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
    this.tokenizer = new import_tokenizer.Tokenizer(this.options, this);
    this.activeFormattingElements = new import_formatting_element_list.FormattingElementList(this.treeAdapter);
    this.fragmentContextID = fragmentContext ? (0, import_html.getTagID)(this.treeAdapter.getTagName(fragmentContext)) : import_html.TAG_ID.UNKNOWN;
    this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
    this.openElements = new import_open_element_stack.OpenElementStack(this.document, this.treeAdapter, this);
  }
  // API
  static parse(html, options) {
    const parser = new this(options);
    parser.tokenizer.write(html, true);
    return parser.document;
  }
  static getFragmentParser(fragmentContext, options) {
    const opts = {
      ...defaultParserOptions,
      ...options
    };
    fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : fragmentContext = opts.treeAdapter.createElement(import_html.TAG_NAMES.TEMPLATE, import_html.NS.HTML, []);
    const documentMock = opts.treeAdapter.createElement("documentmock", import_html.NS.HTML, []);
    const parser = new this(opts, documentMock, fragmentContext);
    if (parser.fragmentContextID === import_html.TAG_ID.TEMPLATE) {
      parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
    }
    parser._initTokenizerForFragmentParsing();
    parser._insertFakeRootElement();
    parser._resetInsertionMode();
    parser._findFormInFragmentContext();
    return parser;
  }
  getFragment() {
    const rootElement = this.treeAdapter.getFirstChild(this.document);
    const fragment = this.treeAdapter.createDocumentFragment();
    this._adoptNodes(rootElement, fragment);
    return fragment;
  }
  //Errors
  /** @internal */
  _err(token, code, beforeToken) {
    var _a;
    if (!this.onParseError)
      return;
    const loc = (_a = token.location) !== null && _a !== void 0 ? _a : BASE_LOC;
    const err = {
      code,
      startLine: loc.startLine,
      startCol: loc.startCol,
      startOffset: loc.startOffset,
      endLine: beforeToken ? loc.startLine : loc.endLine,
      endCol: beforeToken ? loc.startCol : loc.endCol,
      endOffset: beforeToken ? loc.startOffset : loc.endOffset
    };
    this.onParseError(err);
  }
  //Stack events
  /** @internal */
  onItemPush(node, tid, isTop) {
    var _a, _b;
    (_b = (_a = this.treeAdapter).onItemPush) === null || _b === void 0 ? void 0 : _b.call(_a, node);
    if (isTop && this.openElements.stackTop > 0)
      this._setContextModes(node, tid);
  }
  /** @internal */
  onItemPop(node, isTop) {
    var _a, _b;
    if (this.options.sourceCodeLocationInfo) {
      this._setEndLocation(node, this.currentToken);
    }
    (_b = (_a = this.treeAdapter).onItemPop) === null || _b === void 0 ? void 0 : _b.call(_a, node, this.openElements.current);
    if (isTop) {
      let current;
      let currentTagId;
      if (this.openElements.stackTop === 0 && this.fragmentContext) {
        current = this.fragmentContext;
        currentTagId = this.fragmentContextID;
      } else {
        ({ current, currentTagId } = this.openElements);
      }
      this._setContextModes(current, currentTagId);
    }
  }
  _setContextModes(current, tid) {
    const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === import_html.NS.HTML;
    this.currentNotInHTML = !isHTML;
    this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
  }
  /** @protected */
  _switchToTextParsing(currentToken, nextTokenizerState) {
    this._insertElement(currentToken, import_html.NS.HTML);
    this.tokenizer.state = nextTokenizerState;
    this.originalInsertionMode = this.insertionMode;
    this.insertionMode = InsertionMode.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = InsertionMode.TEXT;
    this.originalInsertionMode = InsertionMode.IN_BODY;
    this.tokenizer.state = import_tokenizer.TokenizerMode.PLAINTEXT;
  }
  //Fragment parsing
  /** @protected */
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  /** @protected */
  _findFormInFragmentContext() {
    let node = this.fragmentContext;
    while (node) {
      if (this.treeAdapter.getTagName(node) === import_html.TAG_NAMES.FORM) {
        this.formElement = node;
        break;
      }
      node = this.treeAdapter.getParentNode(node);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== import_html.NS.HTML) {
      return;
    }
    switch (this.fragmentContextID) {
      case import_html.TAG_ID.TITLE:
      case import_html.TAG_ID.TEXTAREA: {
        this.tokenizer.state = import_tokenizer.TokenizerMode.RCDATA;
        break;
      }
      case import_html.TAG_ID.STYLE:
      case import_html.TAG_ID.XMP:
      case import_html.TAG_ID.IFRAME:
      case import_html.TAG_ID.NOEMBED:
      case import_html.TAG_ID.NOFRAMES:
      case import_html.TAG_ID.NOSCRIPT: {
        this.tokenizer.state = import_tokenizer.TokenizerMode.RAWTEXT;
        break;
      }
      case import_html.TAG_ID.SCRIPT: {
        this.tokenizer.state = import_tokenizer.TokenizerMode.SCRIPT_DATA;
        break;
      }
      case import_html.TAG_ID.PLAINTEXT: {
        this.tokenizer.state = import_tokenizer.TokenizerMode.PLAINTEXT;
        break;
      }
      default:
    }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(token) {
    const name = token.name || "";
    const publicId = token.publicId || "";
    const systemId = token.systemId || "";
    this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
    if (token.location) {
      const documentChildren = this.treeAdapter.getChildNodes(this.document);
      const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
      if (docTypeNode) {
        this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
      }
    }
  }
  /** @protected */
  _attachElementToTree(element, location) {
    if (this.options.sourceCodeLocationInfo) {
      const loc = location && {
        ...location,
        startTag: location
      };
      this.treeAdapter.setNodeSourceCodeLocation(element, loc);
    }
    if (this._shouldFosterParentOnInsertion()) {
      this._fosterParentElement(element);
    } else {
      const parent = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(token, namespaceURI) {
    const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element, token.location);
  }
  /** @protected */
  _insertElement(token, namespaceURI) {
    const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element, token.location);
    this.openElements.push(element, token.tagID);
  }
  /** @protected */
  _insertFakeElement(tagName, tagID) {
    const element = this.treeAdapter.createElement(tagName, import_html.NS.HTML, []);
    this._attachElementToTree(element, null);
    this.openElements.push(element, tagID);
  }
  /** @protected */
  _insertTemplate(token) {
    const tmpl = this.treeAdapter.createElement(token.tagName, import_html.NS.HTML, token.attrs);
    const content = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(tmpl, content);
    this._attachElementToTree(tmpl, token.location);
    this.openElements.push(tmpl, token.tagID);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(content, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const element = this.treeAdapter.createElement(import_html.TAG_NAMES.HTML, import_html.NS.HTML, []);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(element, null);
    this.treeAdapter.appendChild(this.openElements.current, element);
    this.openElements.push(element, import_html.TAG_ID.HTML);
  }
  /** @protected */
  _appendCommentNode(token, parent) {
    const commentNode = this.treeAdapter.createCommentNode(token.data);
    this.treeAdapter.appendChild(parent, commentNode);
    if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
    }
  }
  /** @protected */
  _insertCharacters(token) {
    let parent;
    let beforeElement;
    if (this._shouldFosterParentOnInsertion()) {
      ({ parent, beforeElement } = this._findFosterParentingLocation());
      if (beforeElement) {
        this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
      } else {
        this.treeAdapter.insertText(parent, token.chars);
      }
    } else {
      parent = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.insertText(parent, token.chars);
    }
    if (!token.location)
      return;
    const siblings = this.treeAdapter.getChildNodes(parent);
    const textNodeIdx = beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length;
    const textNode = siblings[textNodeIdx - 1];
    const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
    if (tnLoc) {
      const { endLine, endCol, endOffset } = token.location;
      this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
    } else if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
    }
  }
  /** @protected */
  _adoptNodes(donor, recipient) {
    for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
      this.treeAdapter.detachNode(child);
      this.treeAdapter.appendChild(recipient, child);
    }
  }
  /** @protected */
  _setEndLocation(element, closingToken) {
    if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
      const ctLoc = closingToken.location;
      const tn = this.treeAdapter.getTagName(element);
      const endLoc = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        closingToken.type === import_token.TokenType.END_TAG && tn === closingToken.tagName ? {
          endTag: { ...ctLoc },
          endLine: ctLoc.endLine,
          endCol: ctLoc.endCol,
          endOffset: ctLoc.endOffset
        } : {
          endLine: ctLoc.startLine,
          endCol: ctLoc.startCol,
          endOffset: ctLoc.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(token) {
    if (!this.currentNotInHTML)
      return false;
    let current;
    let currentTagId;
    if (this.openElements.stackTop === 0 && this.fragmentContext) {
      current = this.fragmentContext;
      currentTagId = this.fragmentContextID;
    } else {
      ({ current, currentTagId } = this.openElements);
    }
    if (token.tagID === import_html.TAG_ID.SVG && this.treeAdapter.getTagName(current) === import_html.TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === import_html.NS.MATHML) {
      return false;
    }
    return (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (token.tagID === import_html.TAG_ID.MGLYPH || token.tagID === import_html.TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, import_html.NS.HTML)
    );
  }
  /** @protected */
  _processToken(token) {
    switch (token.type) {
      case import_token.TokenType.CHARACTER: {
        this.onCharacter(token);
        break;
      }
      case import_token.TokenType.NULL_CHARACTER: {
        this.onNullCharacter(token);
        break;
      }
      case import_token.TokenType.COMMENT: {
        this.onComment(token);
        break;
      }
      case import_token.TokenType.DOCTYPE: {
        this.onDoctype(token);
        break;
      }
      case import_token.TokenType.START_TAG: {
        this._processStartTag(token);
        break;
      }
      case import_token.TokenType.END_TAG: {
        this.onEndTag(token);
        break;
      }
      case import_token.TokenType.EOF: {
        this.onEof(token);
        break;
      }
      case import_token.TokenType.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(token);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(tid, element, foreignNS) {
    const ns = this.treeAdapter.getNamespaceURI(element);
    const attrs = this.treeAdapter.getAttrList(element);
    return foreignContent.isIntegrationPoint(tid, ns, attrs, foreignNS);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const listLength = this.activeFormattingElements.entries.length;
    if (listLength) {
      const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === import_formatting_element_list.EntryType.Marker || this.openElements.contains(entry.element));
      const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
      for (let i = unopenIdx; i >= 0; i--) {
        const entry = this.activeFormattingElements.entries[i];
        this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
        entry.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags();
    this.openElements.popUntilTableCellPopped();
    this.activeFormattingElements.clearToLastMarker();
    this.insertionMode = InsertionMode.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(import_html.TAG_ID.P);
    this.openElements.popUntilTagNamePopped(import_html.TAG_ID.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let i = this.openElements.stackTop; i >= 0; i--) {
      switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
        case import_html.TAG_ID.TR: {
          this.insertionMode = InsertionMode.IN_ROW;
          return;
        }
        case import_html.TAG_ID.TBODY:
        case import_html.TAG_ID.THEAD:
        case import_html.TAG_ID.TFOOT: {
          this.insertionMode = InsertionMode.IN_TABLE_BODY;
          return;
        }
        case import_html.TAG_ID.CAPTION: {
          this.insertionMode = InsertionMode.IN_CAPTION;
          return;
        }
        case import_html.TAG_ID.COLGROUP: {
          this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
          return;
        }
        case import_html.TAG_ID.TABLE: {
          this.insertionMode = InsertionMode.IN_TABLE;
          return;
        }
        case import_html.TAG_ID.BODY: {
          this.insertionMode = InsertionMode.IN_BODY;
          return;
        }
        case import_html.TAG_ID.FRAMESET: {
          this.insertionMode = InsertionMode.IN_FRAMESET;
          return;
        }
        case import_html.TAG_ID.SELECT: {
          this._resetInsertionModeForSelect(i);
          return;
        }
        case import_html.TAG_ID.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case import_html.TAG_ID.HTML: {
          this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
          return;
        }
        case import_html.TAG_ID.TD:
        case import_html.TAG_ID.TH: {
          if (i > 0) {
            this.insertionMode = InsertionMode.IN_CELL;
            return;
          }
          break;
        }
        case import_html.TAG_ID.HEAD: {
          if (i > 0) {
            this.insertionMode = InsertionMode.IN_HEAD;
            return;
          }
          break;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(selectIdx) {
    if (selectIdx > 0) {
      for (let i = selectIdx - 1; i > 0; i--) {
        const tn = this.openElements.tagIDs[i];
        if (tn === import_html.TAG_ID.TEMPLATE) {
          break;
        } else if (tn === import_html.TAG_ID.TABLE) {
          this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
          return;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(tn) {
    return TABLE_STRUCTURE_TAGS.has(tn);
  }
  /** @protected */
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  /** @protected */
  _findFosterParentingLocation() {
    for (let i = this.openElements.stackTop; i >= 0; i--) {
      const openElement = this.openElements.items[i];
      switch (this.openElements.tagIDs[i]) {
        case import_html.TAG_ID.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(openElement) === import_html.NS.HTML) {
            return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
          }
          break;
        }
        case import_html.TAG_ID.TABLE: {
          const parent = this.treeAdapter.getParentNode(openElement);
          if (parent) {
            return { parent, beforeElement: openElement };
          }
          return { parent: this.openElements.items[i - 1], beforeElement: null };
        }
        default:
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  /** @protected */
  _fosterParentElement(element) {
    const location = this._findFosterParentingLocation();
    if (location.beforeElement) {
      this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
    } else {
      this.treeAdapter.appendChild(location.parent, element);
    }
  }
  //Special elements
  /** @protected */
  _isSpecialElement(element, id) {
    const ns = this.treeAdapter.getNamespaceURI(element);
    return import_html.SPECIAL_ELEMENTS[ns].has(id);
  }
  /** @internal */
  onCharacter(token) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      characterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE: {
        characterInBody(this, token);
        break;
      }
      case InsertionMode.TEXT:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        characterInTableText(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onNullCharacter(token) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      nullCharacterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onComment(token) {
    this.skipNextNewLine = false;
    if (this.currentNotInHTML) {
      appendComment(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL:
      case InsertionMode.BEFORE_HTML:
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        appendComment(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        appendCommentToRootHtmlElement(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        appendCommentToDocument(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onDoctype(token) {
    this.skipNextNewLine = false;
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        doctypeInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD: {
        this._err(token, import_error_codes.ERR.misplacedDoctype);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onStartTag(token) {
    this.skipNextNewLine = false;
    this.currentToken = token;
    this._processStartTag(token);
    if (token.selfClosing && !token.ackSelfClosing) {
      this._err(token, import_error_codes.ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   * @protected
   */
  _processStartTag(token) {
    if (this.shouldProcessStartTagTokenInForeignContent(token)) {
      startTagInForeignContent(this, token);
    } else {
      this._startTagOutsideForeignContent(token);
    }
  }
  /** @protected */
  _startTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        startTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        startTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        startTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        startTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        startTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        startTagInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        startTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        startTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        startTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        startTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        startTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        startTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        startTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        startTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        startTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        startTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        startTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        startTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        startTagAfterAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        startTagAfterAfterFrameset(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onEndTag(token) {
    this.skipNextNewLine = false;
    this.currentToken = token;
    if (this.currentNotInHTML) {
      endTagInForeignContent(this, token);
    } else {
      this._endTagOutsideForeignContent(token);
    }
  }
  /** @protected */
  _endTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        endTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        endTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        endTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        endTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        endTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        endTagInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        endTagInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        endTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        endTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        endTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        endTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        endTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        endTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        endTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        endTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        endTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        endTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        endTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        endTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onEof(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        eofInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        eofInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        eofInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        stopParsing(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onWhitespaceCharacter(token) {
    if (this.skipNextNewLine) {
      this.skipNextNewLine = false;
      if (token.chars.charCodeAt(0) === unicode.CODE_POINTS.LINE_FEED) {
        if (token.chars.length === 1) {
          return;
        }
        token.chars = token.chars.substr(1);
      }
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.TEXT:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.AFTER_BODY:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        whitespaceCharacterInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        whitespaceCharacterInTableText(this, token);
        break;
      }
      default:
    }
  }
}
function aaObtainFormattingElementEntry(p, token) {
  let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
  if (formattingElementEntry) {
    if (!p.openElements.contains(formattingElementEntry.element)) {
      p.activeFormattingElements.removeEntry(formattingElementEntry);
      formattingElementEntry = null;
    } else if (!p.openElements.hasInScope(token.tagID)) {
      formattingElementEntry = null;
    }
  } else {
    genericEndTagInBody(p, token);
  }
  return formattingElementEntry;
}
function aaObtainFurthestBlock(p, formattingElementEntry) {
  let furthestBlock = null;
  let idx = p.openElements.stackTop;
  for (; idx >= 0; idx--) {
    const element = p.openElements.items[idx];
    if (element === formattingElementEntry.element) {
      break;
    }
    if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) {
      furthestBlock = element;
    }
  }
  if (!furthestBlock) {
    p.openElements.shortenToLength(Math.max(idx, 0));
    p.activeFormattingElements.removeEntry(formattingElementEntry);
  }
  return furthestBlock;
}
function aaInnerLoop(p, furthestBlock, formattingElement) {
  let lastElement = furthestBlock;
  let nextElement = p.openElements.getCommonAncestor(furthestBlock);
  for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
    nextElement = p.openElements.getCommonAncestor(element);
    const elementEntry = p.activeFormattingElements.getElementEntry(element);
    const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
    const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
    if (shouldRemoveFromOpenElements) {
      if (counterOverflow) {
        p.activeFormattingElements.removeEntry(elementEntry);
      }
      p.openElements.remove(element);
    } else {
      element = aaRecreateElementFromEntry(p, elementEntry);
      if (lastElement === furthestBlock) {
        p.activeFormattingElements.bookmark = elementEntry;
      }
      p.treeAdapter.detachNode(lastElement);
      p.treeAdapter.appendChild(element, lastElement);
      lastElement = element;
    }
  }
  return lastElement;
}
function aaRecreateElementFromEntry(p, elementEntry) {
  const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
  const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
  p.openElements.replace(elementEntry.element, newElement);
  elementEntry.element = newElement;
  return newElement;
}
function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
  const tn = p.treeAdapter.getTagName(commonAncestor);
  const tid = (0, import_html.getTagID)(tn);
  if (p._isElementCausesFosterParenting(tid)) {
    p._fosterParentElement(lastElement);
  } else {
    const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
    if (tid === import_html.TAG_ID.TEMPLATE && ns === import_html.NS.HTML) {
      commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
    }
    p.treeAdapter.appendChild(commonAncestor, lastElement);
  }
}
function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
  const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
  const { token } = formattingElementEntry;
  const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
  p._adoptNodes(furthestBlock, newElement);
  p.treeAdapter.appendChild(furthestBlock, newElement);
  p.activeFormattingElements.insertElementAfterBookmark(newElement, token);
  p.activeFormattingElements.removeEntry(formattingElementEntry);
  p.openElements.remove(formattingElementEntry.element);
  p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
function callAdoptionAgency(p, token) {
  for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
    const formattingElementEntry = aaObtainFormattingElementEntry(p, token);
    if (!formattingElementEntry) {
      break;
    }
    const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
    if (!furthestBlock) {
      break;
    }
    p.activeFormattingElements.bookmark = formattingElementEntry;
    const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
    const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
    p.treeAdapter.detachNode(lastElement);
    if (commonAncestor)
      aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
    aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
  }
}
function appendComment(p, token) {
  p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p, token) {
  p._appendCommentNode(token, p.openElements.items[0]);
}
function appendCommentToDocument(p, token) {
  p._appendCommentNode(token, p.document);
}
function stopParsing(p, token) {
  p.stopped = true;
  if (token.location) {
    const target = p.fragmentContext ? 0 : 2;
    for (let i = p.openElements.stackTop; i >= target; i--) {
      p._setEndLocation(p.openElements.items[i], token);
    }
    if (!p.fragmentContext && p.openElements.stackTop >= 0) {
      const htmlElement = p.openElements.items[0];
      const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
      if (htmlLocation && !htmlLocation.endTag) {
        p._setEndLocation(htmlElement, token);
        if (p.openElements.stackTop >= 1) {
          const bodyElement = p.openElements.items[1];
          const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
          if (bodyLocation && !bodyLocation.endTag) {
            p._setEndLocation(bodyElement, token);
          }
        }
      }
    }
  }
}
function doctypeInInitialMode(p, token) {
  p._setDocumentType(token);
  const mode = token.forceQuirks ? import_html.DOCUMENT_MODE.QUIRKS : doctype.getDocumentMode(token);
  if (!doctype.isConforming(token)) {
    p._err(token, import_error_codes.ERR.nonConformingDoctype);
  }
  p.treeAdapter.setDocumentMode(p.document, mode);
  p.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p, token) {
  p._err(token, import_error_codes.ERR.missingDoctype, true);
  p.treeAdapter.setDocumentMode(p.document, import_html.DOCUMENT_MODE.QUIRKS);
  p.insertionMode = InsertionMode.BEFORE_HTML;
  p._processToken(token);
}
function startTagBeforeHtml(p, token) {
  if (token.tagID === import_html.TAG_ID.HTML) {
    p._insertElement(token, import_html.NS.HTML);
    p.insertionMode = InsertionMode.BEFORE_HEAD;
  } else {
    tokenBeforeHtml(p, token);
  }
}
function endTagBeforeHtml(p, token) {
  const tn = token.tagID;
  if (tn === import_html.TAG_ID.HTML || tn === import_html.TAG_ID.HEAD || tn === import_html.TAG_ID.BODY || tn === import_html.TAG_ID.BR) {
    tokenBeforeHtml(p, token);
  }
}
function tokenBeforeHtml(p, token) {
  p._insertFakeRootElement();
  p.insertionMode = InsertionMode.BEFORE_HEAD;
  p._processToken(token);
}
function startTagBeforeHead(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.HEAD: {
      p._insertElement(token, import_html.NS.HTML);
      p.headElement = p.openElements.current;
      p.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    default: {
      tokenBeforeHead(p, token);
    }
  }
}
function endTagBeforeHead(p, token) {
  const tn = token.tagID;
  if (tn === import_html.TAG_ID.HEAD || tn === import_html.TAG_ID.BODY || tn === import_html.TAG_ID.HTML || tn === import_html.TAG_ID.BR) {
    tokenBeforeHead(p, token);
  } else {
    p._err(token, import_error_codes.ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenBeforeHead(p, token) {
  p._insertFakeElement(import_html.TAG_NAMES.HEAD, import_html.TAG_ID.HEAD);
  p.headElement = p.openElements.current;
  p.insertionMode = InsertionMode.IN_HEAD;
  p._processToken(token);
}
function startTagInHead(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.BASE:
    case import_html.TAG_ID.BASEFONT:
    case import_html.TAG_ID.BGSOUND:
    case import_html.TAG_ID.LINK:
    case import_html.TAG_ID.META: {
      p._appendElement(token, import_html.NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case import_html.TAG_ID.TITLE: {
      p._switchToTextParsing(token, import_tokenizer.TokenizerMode.RCDATA);
      break;
    }
    case import_html.TAG_ID.NOSCRIPT: {
      if (p.options.scriptingEnabled) {
        p._switchToTextParsing(token, import_tokenizer.TokenizerMode.RAWTEXT);
      } else {
        p._insertElement(token, import_html.NS.HTML);
        p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
      }
      break;
    }
    case import_html.TAG_ID.NOFRAMES:
    case import_html.TAG_ID.STYLE: {
      p._switchToTextParsing(token, import_tokenizer.TokenizerMode.RAWTEXT);
      break;
    }
    case import_html.TAG_ID.SCRIPT: {
      p._switchToTextParsing(token, import_tokenizer.TokenizerMode.SCRIPT_DATA);
      break;
    }
    case import_html.TAG_ID.TEMPLATE: {
      p._insertTemplate(token);
      p.activeFormattingElements.insertMarker();
      p.framesetOk = false;
      p.insertionMode = InsertionMode.IN_TEMPLATE;
      p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      break;
    }
    case import_html.TAG_ID.HEAD: {
      p._err(token, import_error_codes.ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenInHead(p, token);
    }
  }
}
function endTagInHead(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HEAD: {
      p.openElements.pop();
      p.insertionMode = InsertionMode.AFTER_HEAD;
      break;
    }
    case import_html.TAG_ID.BODY:
    case import_html.TAG_ID.BR:
    case import_html.TAG_ID.HTML: {
      tokenInHead(p, token);
      break;
    }
    case import_html.TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default: {
      p._err(token, import_error_codes.ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function templateEndTagInHead(p, token) {
  if (p.openElements.tmplCount > 0) {
    p.openElements.generateImpliedEndTagsThoroughly();
    if (p.openElements.currentTagId !== import_html.TAG_ID.TEMPLATE) {
      p._err(token, import_error_codes.ERR.closingOfElementWithOpenChildElements);
    }
    p.openElements.popUntilTagNamePopped(import_html.TAG_ID.TEMPLATE);
    p.activeFormattingElements.clearToLastMarker();
    p.tmplInsertionModeStack.shift();
    p._resetInsertionMode();
  } else {
    p._err(token, import_error_codes.ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenInHead(p, token) {
  p.openElements.pop();
  p.insertionMode = InsertionMode.AFTER_HEAD;
  p._processToken(token);
}
function startTagInHeadNoScript(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.BASEFONT:
    case import_html.TAG_ID.BGSOUND:
    case import_html.TAG_ID.HEAD:
    case import_html.TAG_ID.LINK:
    case import_html.TAG_ID.META:
    case import_html.TAG_ID.NOFRAMES:
    case import_html.TAG_ID.STYLE: {
      startTagInHead(p, token);
      break;
    }
    case import_html.TAG_ID.NOSCRIPT: {
      p._err(token, import_error_codes.ERR.nestedNoscriptInHead);
      break;
    }
    default: {
      tokenInHeadNoScript(p, token);
    }
  }
}
function endTagInHeadNoScript(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.NOSCRIPT: {
      p.openElements.pop();
      p.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    case import_html.TAG_ID.BR: {
      tokenInHeadNoScript(p, token);
      break;
    }
    default: {
      p._err(token, import_error_codes.ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function tokenInHeadNoScript(p, token) {
  const errCode = token.type === import_token.TokenType.EOF ? import_error_codes.ERR.openElementsLeftAfterEof : import_error_codes.ERR.disallowedContentInNoscriptInHead;
  p._err(token, errCode);
  p.openElements.pop();
  p.insertionMode = InsertionMode.IN_HEAD;
  p._processToken(token);
}
function startTagAfterHead(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.BODY: {
      p._insertElement(token, import_html.NS.HTML);
      p.framesetOk = false;
      p.insertionMode = InsertionMode.IN_BODY;
      break;
    }
    case import_html.TAG_ID.FRAMESET: {
      p._insertElement(token, import_html.NS.HTML);
      p.insertionMode = InsertionMode.IN_FRAMESET;
      break;
    }
    case import_html.TAG_ID.BASE:
    case import_html.TAG_ID.BASEFONT:
    case import_html.TAG_ID.BGSOUND:
    case import_html.TAG_ID.LINK:
    case import_html.TAG_ID.META:
    case import_html.TAG_ID.NOFRAMES:
    case import_html.TAG_ID.SCRIPT:
    case import_html.TAG_ID.STYLE:
    case import_html.TAG_ID.TEMPLATE:
    case import_html.TAG_ID.TITLE: {
      p._err(token, import_error_codes.ERR.abandonedHeadElementChild);
      p.openElements.push(p.headElement, import_html.TAG_ID.HEAD);
      startTagInHead(p, token);
      p.openElements.remove(p.headElement);
      break;
    }
    case import_html.TAG_ID.HEAD: {
      p._err(token, import_error_codes.ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenAfterHead(p, token);
    }
  }
}
function endTagAfterHead(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.BODY:
    case import_html.TAG_ID.HTML:
    case import_html.TAG_ID.BR: {
      tokenAfterHead(p, token);
      break;
    }
    case import_html.TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default: {
      p._err(token, import_error_codes.ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function tokenAfterHead(p, token) {
  p._insertFakeElement(import_html.TAG_NAMES.BODY, import_html.TAG_ID.BODY);
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token);
}
function modeInBody(p, token) {
  switch (token.type) {
    case import_token.TokenType.CHARACTER: {
      characterInBody(p, token);
      break;
    }
    case import_token.TokenType.WHITESPACE_CHARACTER: {
      whitespaceCharacterInBody(p, token);
      break;
    }
    case import_token.TokenType.COMMENT: {
      appendComment(p, token);
      break;
    }
    case import_token.TokenType.START_TAG: {
      startTagInBody(p, token);
      break;
    }
    case import_token.TokenType.END_TAG: {
      endTagInBody(p, token);
      break;
    }
    case import_token.TokenType.EOF: {
      eofInBody(p, token);
      break;
    }
    default:
  }
}
function whitespaceCharacterInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertCharacters(token);
}
function characterInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertCharacters(token);
  p.framesetOk = false;
}
function htmlStartTagInBody(p, token) {
  if (p.openElements.tmplCount === 0) {
    p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
  }
}
function bodyStartTagInBody(p, token) {
  const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  if (bodyElement && p.openElements.tmplCount === 0) {
    p.framesetOk = false;
    p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
  }
}
function framesetStartTagInBody(p, token) {
  const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  if (p.framesetOk && bodyElement) {
    p.treeAdapter.detachNode(bodyElement);
    p.openElements.popAllUpToHtmlElement();
    p._insertElement(token, import_html.NS.HTML);
    p.insertionMode = InsertionMode.IN_FRAMESET;
  }
}
function addressStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, import_html.NS.HTML);
}
function numberedHeaderStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._closePElement();
  }
  if (p.openElements.currentTagId !== void 0 && import_html.NUMBERED_HEADERS.has(p.openElements.currentTagId)) {
    p.openElements.pop();
  }
  p._insertElement(token, import_html.NS.HTML);
}
function preStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, import_html.NS.HTML);
  p.skipNextNewLine = true;
  p.framesetOk = false;
}
function formStartTagInBody(p, token) {
  const inTemplate = p.openElements.tmplCount > 0;
  if (!p.formElement || inTemplate) {
    if (p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token, import_html.NS.HTML);
    if (!inTemplate) {
      p.formElement = p.openElements.current;
    }
  }
}
function listItemStartTagInBody(p, token) {
  p.framesetOk = false;
  const tn = token.tagID;
  for (let i = p.openElements.stackTop; i >= 0; i--) {
    const elementId = p.openElements.tagIDs[i];
    if (tn === import_html.TAG_ID.LI && elementId === import_html.TAG_ID.LI || (tn === import_html.TAG_ID.DD || tn === import_html.TAG_ID.DT) && (elementId === import_html.TAG_ID.DD || elementId === import_html.TAG_ID.DT)) {
      p.openElements.generateImpliedEndTagsWithExclusion(elementId);
      p.openElements.popUntilTagNamePopped(elementId);
      break;
    }
    if (elementId !== import_html.TAG_ID.ADDRESS && elementId !== import_html.TAG_ID.DIV && elementId !== import_html.TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId)) {
      break;
    }
  }
  if (p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, import_html.NS.HTML);
}
function plaintextStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, import_html.NS.HTML);
  p.tokenizer.state = import_tokenizer.TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p, token) {
  if (p.openElements.hasInScope(import_html.TAG_ID.BUTTON)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(import_html.TAG_ID.BUTTON);
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token, import_html.NS.HTML);
  p.framesetOk = false;
}
function aStartTagInBody(p, token) {
  const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(import_html.TAG_NAMES.A);
  if (activeElementEntry) {
    callAdoptionAgency(p, token);
    p.openElements.remove(activeElementEntry.element);
    p.activeFormattingElements.removeEntry(activeElementEntry);
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token, import_html.NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function bStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token, import_html.NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function nobrStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  if (p.openElements.hasInScope(import_html.TAG_ID.NOBR)) {
    callAdoptionAgency(p, token);
    p._reconstructActiveFormattingElements();
  }
  p._insertElement(token, import_html.NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function appletStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token, import_html.NS.HTML);
  p.activeFormattingElements.insertMarker();
  p.framesetOk = false;
}
function tableStartTagInBody(p, token) {
  if (p.treeAdapter.getDocumentMode(p.document) !== import_html.DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, import_html.NS.HTML);
  p.framesetOk = false;
  p.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._appendElement(token, import_html.NS.HTML);
  p.framesetOk = false;
  token.ackSelfClosing = true;
}
function isHiddenInput(token) {
  const inputType = (0, import_token.getTokenAttr)(token, import_html.ATTRS.TYPE);
  return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._appendElement(token, import_html.NS.HTML);
  if (!isHiddenInput(token)) {
    p.framesetOk = false;
  }
  token.ackSelfClosing = true;
}
function paramStartTagInBody(p, token) {
  p._appendElement(token, import_html.NS.HTML);
  token.ackSelfClosing = true;
}
function hrStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._closePElement();
  }
  p._appendElement(token, import_html.NS.HTML);
  p.framesetOk = false;
  token.ackSelfClosing = true;
}
function imageStartTagInBody(p, token) {
  token.tagName = import_html.TAG_NAMES.IMG;
  token.tagID = import_html.TAG_ID.IMG;
  areaStartTagInBody(p, token);
}
function textareaStartTagInBody(p, token) {
  p._insertElement(token, import_html.NS.HTML);
  p.skipNextNewLine = true;
  p.tokenizer.state = import_tokenizer.TokenizerMode.RCDATA;
  p.originalInsertionMode = p.insertionMode;
  p.framesetOk = false;
  p.insertionMode = InsertionMode.TEXT;
}
function xmpStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._closePElement();
  }
  p._reconstructActiveFormattingElements();
  p.framesetOk = false;
  p._switchToTextParsing(token, import_tokenizer.TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p, token) {
  p.framesetOk = false;
  p._switchToTextParsing(token, import_tokenizer.TokenizerMode.RAWTEXT);
}
function rawTextStartTagInBody(p, token) {
  p._switchToTextParsing(token, import_tokenizer.TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token, import_html.NS.HTML);
  p.framesetOk = false;
  p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p, token) {
  if (p.openElements.currentTagId === import_html.TAG_ID.OPTION) {
    p.openElements.pop();
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token, import_html.NS.HTML);
}
function rbStartTagInBody(p, token) {
  if (p.openElements.hasInScope(import_html.TAG_ID.RUBY)) {
    p.openElements.generateImpliedEndTags();
  }
  p._insertElement(token, import_html.NS.HTML);
}
function rtStartTagInBody(p, token) {
  if (p.openElements.hasInScope(import_html.TAG_ID.RUBY)) {
    p.openElements.generateImpliedEndTagsWithExclusion(import_html.TAG_ID.RTC);
  }
  p._insertElement(token, import_html.NS.HTML);
}
function mathStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  foreignContent.adjustTokenMathMLAttrs(token);
  foreignContent.adjustTokenXMLAttrs(token);
  if (token.selfClosing) {
    p._appendElement(token, import_html.NS.MATHML);
  } else {
    p._insertElement(token, import_html.NS.MATHML);
  }
  token.ackSelfClosing = true;
}
function svgStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  foreignContent.adjustTokenSVGAttrs(token);
  foreignContent.adjustTokenXMLAttrs(token);
  if (token.selfClosing) {
    p._appendElement(token, import_html.NS.SVG);
  } else {
    p._insertElement(token, import_html.NS.SVG);
  }
  token.ackSelfClosing = true;
}
function genericStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token, import_html.NS.HTML);
}
function startTagInBody(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.I:
    case import_html.TAG_ID.S:
    case import_html.TAG_ID.B:
    case import_html.TAG_ID.U:
    case import_html.TAG_ID.EM:
    case import_html.TAG_ID.TT:
    case import_html.TAG_ID.BIG:
    case import_html.TAG_ID.CODE:
    case import_html.TAG_ID.FONT:
    case import_html.TAG_ID.SMALL:
    case import_html.TAG_ID.STRIKE:
    case import_html.TAG_ID.STRONG: {
      bStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.A: {
      aStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.H1:
    case import_html.TAG_ID.H2:
    case import_html.TAG_ID.H3:
    case import_html.TAG_ID.H4:
    case import_html.TAG_ID.H5:
    case import_html.TAG_ID.H6: {
      numberedHeaderStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.P:
    case import_html.TAG_ID.DL:
    case import_html.TAG_ID.OL:
    case import_html.TAG_ID.UL:
    case import_html.TAG_ID.DIV:
    case import_html.TAG_ID.DIR:
    case import_html.TAG_ID.NAV:
    case import_html.TAG_ID.MAIN:
    case import_html.TAG_ID.MENU:
    case import_html.TAG_ID.ASIDE:
    case import_html.TAG_ID.CENTER:
    case import_html.TAG_ID.FIGURE:
    case import_html.TAG_ID.FOOTER:
    case import_html.TAG_ID.HEADER:
    case import_html.TAG_ID.HGROUP:
    case import_html.TAG_ID.DIALOG:
    case import_html.TAG_ID.DETAILS:
    case import_html.TAG_ID.ADDRESS:
    case import_html.TAG_ID.ARTICLE:
    case import_html.TAG_ID.SEARCH:
    case import_html.TAG_ID.SECTION:
    case import_html.TAG_ID.SUMMARY:
    case import_html.TAG_ID.FIELDSET:
    case import_html.TAG_ID.BLOCKQUOTE:
    case import_html.TAG_ID.FIGCAPTION: {
      addressStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.LI:
    case import_html.TAG_ID.DD:
    case import_html.TAG_ID.DT: {
      listItemStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.BR:
    case import_html.TAG_ID.IMG:
    case import_html.TAG_ID.WBR:
    case import_html.TAG_ID.AREA:
    case import_html.TAG_ID.EMBED:
    case import_html.TAG_ID.KEYGEN: {
      areaStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.HR: {
      hrStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.RB:
    case import_html.TAG_ID.RTC: {
      rbStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.RT:
    case import_html.TAG_ID.RP: {
      rtStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.PRE:
    case import_html.TAG_ID.LISTING: {
      preStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.XMP: {
      xmpStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.SVG: {
      svgStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.HTML: {
      htmlStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.BASE:
    case import_html.TAG_ID.LINK:
    case import_html.TAG_ID.META:
    case import_html.TAG_ID.STYLE:
    case import_html.TAG_ID.TITLE:
    case import_html.TAG_ID.SCRIPT:
    case import_html.TAG_ID.BGSOUND:
    case import_html.TAG_ID.BASEFONT:
    case import_html.TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    case import_html.TAG_ID.BODY: {
      bodyStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.FORM: {
      formStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.NOBR: {
      nobrStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.MATH: {
      mathStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.TABLE: {
      tableStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.INPUT: {
      inputStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.PARAM:
    case import_html.TAG_ID.TRACK:
    case import_html.TAG_ID.SOURCE: {
      paramStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.IMAGE: {
      imageStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.BUTTON: {
      buttonStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.APPLET:
    case import_html.TAG_ID.OBJECT:
    case import_html.TAG_ID.MARQUEE: {
      appletStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.IFRAME: {
      iframeStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.SELECT: {
      selectStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.OPTION:
    case import_html.TAG_ID.OPTGROUP: {
      optgroupStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.NOEMBED:
    case import_html.TAG_ID.NOFRAMES: {
      rawTextStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.FRAMESET: {
      framesetStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.TEXTAREA: {
      textareaStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.NOSCRIPT: {
      if (p.options.scriptingEnabled) {
        rawTextStartTagInBody(p, token);
      } else {
        genericStartTagInBody(p, token);
      }
      break;
    }
    case import_html.TAG_ID.PLAINTEXT: {
      plaintextStartTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.COL:
    case import_html.TAG_ID.TH:
    case import_html.TAG_ID.TD:
    case import_html.TAG_ID.TR:
    case import_html.TAG_ID.HEAD:
    case import_html.TAG_ID.FRAME:
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.THEAD:
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.COLGROUP: {
      break;
    }
    default: {
      genericStartTagInBody(p, token);
    }
  }
}
function bodyEndTagInBody(p, token) {
  if (p.openElements.hasInScope(import_html.TAG_ID.BODY)) {
    p.insertionMode = InsertionMode.AFTER_BODY;
    if (p.options.sourceCodeLocationInfo) {
      const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
      if (bodyElement) {
        p._setEndLocation(bodyElement, token);
      }
    }
  }
}
function htmlEndTagInBody(p, token) {
  if (p.openElements.hasInScope(import_html.TAG_ID.BODY)) {
    p.insertionMode = InsertionMode.AFTER_BODY;
    endTagAfterBody(p, token);
  }
}
function addressEndTagInBody(p, token) {
  const tn = token.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(tn);
  }
}
function formEndTagInBody(p) {
  const inTemplate = p.openElements.tmplCount > 0;
  const { formElement } = p;
  if (!inTemplate) {
    p.formElement = null;
  }
  if ((formElement || inTemplate) && p.openElements.hasInScope(import_html.TAG_ID.FORM)) {
    p.openElements.generateImpliedEndTags();
    if (inTemplate) {
      p.openElements.popUntilTagNamePopped(import_html.TAG_ID.FORM);
    } else if (formElement) {
      p.openElements.remove(formElement);
    }
  }
}
function pEndTagInBody(p) {
  if (!p.openElements.hasInButtonScope(import_html.TAG_ID.P)) {
    p._insertFakeElement(import_html.TAG_NAMES.P, import_html.TAG_ID.P);
  }
  p._closePElement();
}
function liEndTagInBody(p) {
  if (p.openElements.hasInListItemScope(import_html.TAG_ID.LI)) {
    p.openElements.generateImpliedEndTagsWithExclusion(import_html.TAG_ID.LI);
    p.openElements.popUntilTagNamePopped(import_html.TAG_ID.LI);
  }
}
function ddEndTagInBody(p, token) {
  const tn = token.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTagsWithExclusion(tn);
    p.openElements.popUntilTagNamePopped(tn);
  }
}
function numberedHeaderEndTagInBody(p) {
  if (p.openElements.hasNumberedHeaderInScope()) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilNumberedHeaderPopped();
  }
}
function appletEndTagInBody(p, token) {
  const tn = token.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(tn);
    p.activeFormattingElements.clearToLastMarker();
  }
}
function brEndTagInBody(p) {
  p._reconstructActiveFormattingElements();
  p._insertFakeElement(import_html.TAG_NAMES.BR, import_html.TAG_ID.BR);
  p.openElements.pop();
  p.framesetOk = false;
}
function genericEndTagInBody(p, token) {
  const tn = token.tagName;
  const tid = token.tagID;
  for (let i = p.openElements.stackTop; i > 0; i--) {
    const element = p.openElements.items[i];
    const elementId = p.openElements.tagIDs[i];
    if (tid === elementId && (tid !== import_html.TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
      p.openElements.generateImpliedEndTagsWithExclusion(tid);
      if (p.openElements.stackTop >= i)
        p.openElements.shortenToLength(i);
      break;
    }
    if (p._isSpecialElement(element, elementId)) {
      break;
    }
  }
}
function endTagInBody(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.A:
    case import_html.TAG_ID.B:
    case import_html.TAG_ID.I:
    case import_html.TAG_ID.S:
    case import_html.TAG_ID.U:
    case import_html.TAG_ID.EM:
    case import_html.TAG_ID.TT:
    case import_html.TAG_ID.BIG:
    case import_html.TAG_ID.CODE:
    case import_html.TAG_ID.FONT:
    case import_html.TAG_ID.NOBR:
    case import_html.TAG_ID.SMALL:
    case import_html.TAG_ID.STRIKE:
    case import_html.TAG_ID.STRONG: {
      callAdoptionAgency(p, token);
      break;
    }
    case import_html.TAG_ID.P: {
      pEndTagInBody(p);
      break;
    }
    case import_html.TAG_ID.DL:
    case import_html.TAG_ID.UL:
    case import_html.TAG_ID.OL:
    case import_html.TAG_ID.DIR:
    case import_html.TAG_ID.DIV:
    case import_html.TAG_ID.NAV:
    case import_html.TAG_ID.PRE:
    case import_html.TAG_ID.MAIN:
    case import_html.TAG_ID.MENU:
    case import_html.TAG_ID.ASIDE:
    case import_html.TAG_ID.BUTTON:
    case import_html.TAG_ID.CENTER:
    case import_html.TAG_ID.FIGURE:
    case import_html.TAG_ID.FOOTER:
    case import_html.TAG_ID.HEADER:
    case import_html.TAG_ID.HGROUP:
    case import_html.TAG_ID.DIALOG:
    case import_html.TAG_ID.ADDRESS:
    case import_html.TAG_ID.ARTICLE:
    case import_html.TAG_ID.DETAILS:
    case import_html.TAG_ID.SEARCH:
    case import_html.TAG_ID.SECTION:
    case import_html.TAG_ID.SUMMARY:
    case import_html.TAG_ID.LISTING:
    case import_html.TAG_ID.FIELDSET:
    case import_html.TAG_ID.BLOCKQUOTE:
    case import_html.TAG_ID.FIGCAPTION: {
      addressEndTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.LI: {
      liEndTagInBody(p);
      break;
    }
    case import_html.TAG_ID.DD:
    case import_html.TAG_ID.DT: {
      ddEndTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.H1:
    case import_html.TAG_ID.H2:
    case import_html.TAG_ID.H3:
    case import_html.TAG_ID.H4:
    case import_html.TAG_ID.H5:
    case import_html.TAG_ID.H6: {
      numberedHeaderEndTagInBody(p);
      break;
    }
    case import_html.TAG_ID.BR: {
      brEndTagInBody(p);
      break;
    }
    case import_html.TAG_ID.BODY: {
      bodyEndTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.HTML: {
      htmlEndTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.FORM: {
      formEndTagInBody(p);
      break;
    }
    case import_html.TAG_ID.APPLET:
    case import_html.TAG_ID.OBJECT:
    case import_html.TAG_ID.MARQUEE: {
      appletEndTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default: {
      genericEndTagInBody(p, token);
    }
  }
}
function eofInBody(p, token) {
  if (p.tmplInsertionModeStack.length > 0) {
    eofInTemplate(p, token);
  } else {
    stopParsing(p, token);
  }
}
function endTagInText(p, token) {
  var _a;
  if (token.tagID === import_html.TAG_ID.SCRIPT) {
    (_a = p.scriptHandler) === null || _a === void 0 ? void 0 : _a.call(p, p.openElements.current);
  }
  p.openElements.pop();
  p.insertionMode = p.originalInsertionMode;
}
function eofInText(p, token) {
  p._err(token, import_error_codes.ERR.eofInElementThatCanContainOnlyText);
  p.openElements.pop();
  p.insertionMode = p.originalInsertionMode;
  p.onEof(token);
}
function characterInTable(p, token) {
  if (p.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
    p.pendingCharacterTokens.length = 0;
    p.hasNonWhitespacePendingCharacterToken = false;
    p.originalInsertionMode = p.insertionMode;
    p.insertionMode = InsertionMode.IN_TABLE_TEXT;
    switch (token.type) {
      case import_token.TokenType.CHARACTER: {
        characterInTableText(p, token);
        break;
      }
      case import_token.TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInTableText(p, token);
        break;
      }
    }
  } else {
    tokenInTable(p, token);
  }
}
function captionStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p.activeFormattingElements.insertMarker();
  p._insertElement(token, import_html.NS.HTML);
  p.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p._insertElement(token, import_html.NS.HTML);
  p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p._insertFakeElement(import_html.TAG_NAMES.COLGROUP, import_html.TAG_ID.COLGROUP);
  p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  startTagInColumnGroup(p, token);
}
function tbodyStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p._insertElement(token, import_html.NS.HTML);
  p.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p._insertFakeElement(import_html.TAG_NAMES.TBODY, import_html.TAG_ID.TBODY);
  p.insertionMode = InsertionMode.IN_TABLE_BODY;
  startTagInTableBody(p, token);
}
function tableStartTagInTable(p, token) {
  if (p.openElements.hasInTableScope(import_html.TAG_ID.TABLE)) {
    p.openElements.popUntilTagNamePopped(import_html.TAG_ID.TABLE);
    p._resetInsertionMode();
    p._processStartTag(token);
  }
}
function inputStartTagInTable(p, token) {
  if (isHiddenInput(token)) {
    p._appendElement(token, import_html.NS.HTML);
  } else {
    tokenInTable(p, token);
  }
  token.ackSelfClosing = true;
}
function formStartTagInTable(p, token) {
  if (!p.formElement && p.openElements.tmplCount === 0) {
    p._insertElement(token, import_html.NS.HTML);
    p.formElement = p.openElements.current;
    p.openElements.pop();
  }
}
function startTagInTable(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.TD:
    case import_html.TAG_ID.TH:
    case import_html.TAG_ID.TR: {
      tdStartTagInTable(p, token);
      break;
    }
    case import_html.TAG_ID.STYLE:
    case import_html.TAG_ID.SCRIPT:
    case import_html.TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    case import_html.TAG_ID.COL: {
      colStartTagInTable(p, token);
      break;
    }
    case import_html.TAG_ID.FORM: {
      formStartTagInTable(p, token);
      break;
    }
    case import_html.TAG_ID.TABLE: {
      tableStartTagInTable(p, token);
      break;
    }
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.THEAD: {
      tbodyStartTagInTable(p, token);
      break;
    }
    case import_html.TAG_ID.INPUT: {
      inputStartTagInTable(p, token);
      break;
    }
    case import_html.TAG_ID.CAPTION: {
      captionStartTagInTable(p, token);
      break;
    }
    case import_html.TAG_ID.COLGROUP: {
      colgroupStartTagInTable(p, token);
      break;
    }
    default: {
      tokenInTable(p, token);
    }
  }
}
function endTagInTable(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(import_html.TAG_ID.TABLE)) {
        p.openElements.popUntilTagNamePopped(import_html.TAG_ID.TABLE);
        p._resetInsertionMode();
      }
      break;
    }
    case import_html.TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    case import_html.TAG_ID.BODY:
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.COL:
    case import_html.TAG_ID.COLGROUP:
    case import_html.TAG_ID.HTML:
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TD:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.TH:
    case import_html.TAG_ID.THEAD:
    case import_html.TAG_ID.TR: {
      break;
    }
    default: {
      tokenInTable(p, token);
    }
  }
}
function tokenInTable(p, token) {
  const savedFosterParentingState = p.fosterParentingEnabled;
  p.fosterParentingEnabled = true;
  modeInBody(p, token);
  p.fosterParentingEnabled = savedFosterParentingState;
}
function whitespaceCharacterInTableText(p, token) {
  p.pendingCharacterTokens.push(token);
}
function characterInTableText(p, token) {
  p.pendingCharacterTokens.push(token);
  p.hasNonWhitespacePendingCharacterToken = true;
}
function tokenInTableText(p, token) {
  let i = 0;
  if (p.hasNonWhitespacePendingCharacterToken) {
    for (; i < p.pendingCharacterTokens.length; i++) {
      tokenInTable(p, p.pendingCharacterTokens[i]);
    }
  } else {
    for (; i < p.pendingCharacterTokens.length; i++) {
      p._insertCharacters(p.pendingCharacterTokens[i]);
    }
  }
  p.insertionMode = p.originalInsertionMode;
  p._processToken(token);
}
const TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([import_html.TAG_ID.CAPTION, import_html.TAG_ID.COL, import_html.TAG_ID.COLGROUP, import_html.TAG_ID.TBODY, import_html.TAG_ID.TD, import_html.TAG_ID.TFOOT, import_html.TAG_ID.TH, import_html.TAG_ID.THEAD, import_html.TAG_ID.TR]);
function startTagInCaption(p, token) {
  const tn = token.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn)) {
    if (p.openElements.hasInTableScope(import_html.TAG_ID.CAPTION)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(import_html.TAG_ID.CAPTION);
      p.activeFormattingElements.clearToLastMarker();
      p.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p, token);
    }
  } else {
    startTagInBody(p, token);
  }
}
function endTagInCaption(p, token) {
  const tn = token.tagID;
  switch (tn) {
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(import_html.TAG_ID.CAPTION)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(import_html.TAG_ID.CAPTION);
        p.activeFormattingElements.clearToLastMarker();
        p.insertionMode = InsertionMode.IN_TABLE;
        if (tn === import_html.TAG_ID.TABLE) {
          endTagInTable(p, token);
        }
      }
      break;
    }
    case import_html.TAG_ID.BODY:
    case import_html.TAG_ID.COL:
    case import_html.TAG_ID.COLGROUP:
    case import_html.TAG_ID.HTML:
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TD:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.TH:
    case import_html.TAG_ID.THEAD:
    case import_html.TAG_ID.TR: {
      break;
    }
    default: {
      endTagInBody(p, token);
    }
  }
}
function startTagInColumnGroup(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.COL: {
      p._appendElement(token, import_html.NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case import_html.TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    default: {
      tokenInColumnGroup(p, token);
    }
  }
}
function endTagInColumnGroup(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.COLGROUP: {
      if (p.openElements.currentTagId === import_html.TAG_ID.COLGROUP) {
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case import_html.TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    case import_html.TAG_ID.COL: {
      break;
    }
    default: {
      tokenInColumnGroup(p, token);
    }
  }
}
function tokenInColumnGroup(p, token) {
  if (p.openElements.currentTagId === import_html.TAG_ID.COLGROUP) {
    p.openElements.pop();
    p.insertionMode = InsertionMode.IN_TABLE;
    p._processToken(token);
  }
}
function startTagInTableBody(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.TR: {
      p.openElements.clearBackToTableBodyContext();
      p._insertElement(token, import_html.NS.HTML);
      p.insertionMode = InsertionMode.IN_ROW;
      break;
    }
    case import_html.TAG_ID.TH:
    case import_html.TAG_ID.TD: {
      p.openElements.clearBackToTableBodyContext();
      p._insertFakeElement(import_html.TAG_NAMES.TR, import_html.TAG_ID.TR);
      p.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p, token);
      break;
    }
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.COL:
    case import_html.TAG_ID.COLGROUP:
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.THEAD: {
      if (p.openElements.hasTableBodyContextInTableScope()) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p, token);
      }
      break;
    }
    default: {
      startTagInTable(p, token);
    }
  }
}
function endTagInTableBody(p, token) {
  const tn = token.tagID;
  switch (token.tagID) {
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.THEAD: {
      if (p.openElements.hasInTableScope(tn)) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case import_html.TAG_ID.TABLE: {
      if (p.openElements.hasTableBodyContextInTableScope()) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
        endTagInTable(p, token);
      }
      break;
    }
    case import_html.TAG_ID.BODY:
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.COL:
    case import_html.TAG_ID.COLGROUP:
    case import_html.TAG_ID.HTML:
    case import_html.TAG_ID.TD:
    case import_html.TAG_ID.TH:
    case import_html.TAG_ID.TR: {
      break;
    }
    default: {
      endTagInTable(p, token);
    }
  }
}
function startTagInRow(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.TH:
    case import_html.TAG_ID.TD: {
      p.openElements.clearBackToTableRowContext();
      p._insertElement(token, import_html.NS.HTML);
      p.insertionMode = InsertionMode.IN_CELL;
      p.activeFormattingElements.insertMarker();
      break;
    }
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.COL:
    case import_html.TAG_ID.COLGROUP:
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.THEAD:
    case import_html.TAG_ID.TR: {
      if (p.openElements.hasInTableScope(import_html.TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p, token);
      }
      break;
    }
    default: {
      startTagInTable(p, token);
    }
  }
}
function endTagInRow(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.TR: {
      if (p.openElements.hasInTableScope(import_html.TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
      }
      break;
    }
    case import_html.TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(import_html.TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p, token);
      }
      break;
    }
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.THEAD: {
      if (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(import_html.TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p, token);
      }
      break;
    }
    case import_html.TAG_ID.BODY:
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.COL:
    case import_html.TAG_ID.COLGROUP:
    case import_html.TAG_ID.HTML:
    case import_html.TAG_ID.TD:
    case import_html.TAG_ID.TH: {
      break;
    }
    default: {
      endTagInTable(p, token);
    }
  }
}
function startTagInCell(p, token) {
  const tn = token.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn)) {
    if (p.openElements.hasInTableScope(import_html.TAG_ID.TD) || p.openElements.hasInTableScope(import_html.TAG_ID.TH)) {
      p._closeTableCell();
      startTagInRow(p, token);
    }
  } else {
    startTagInBody(p, token);
  }
}
function endTagInCell(p, token) {
  const tn = token.tagID;
  switch (tn) {
    case import_html.TAG_ID.TD:
    case import_html.TAG_ID.TH: {
      if (p.openElements.hasInTableScope(tn)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(tn);
        p.activeFormattingElements.clearToLastMarker();
        p.insertionMode = InsertionMode.IN_ROW;
      }
      break;
    }
    case import_html.TAG_ID.TABLE:
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.THEAD:
    case import_html.TAG_ID.TR: {
      if (p.openElements.hasInTableScope(tn)) {
        p._closeTableCell();
        endTagInRow(p, token);
      }
      break;
    }
    case import_html.TAG_ID.BODY:
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.COL:
    case import_html.TAG_ID.COLGROUP:
    case import_html.TAG_ID.HTML: {
      break;
    }
    default: {
      endTagInBody(p, token);
    }
  }
}
function startTagInSelect(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.OPTION: {
      if (p.openElements.currentTagId === import_html.TAG_ID.OPTION) {
        p.openElements.pop();
      }
      p._insertElement(token, import_html.NS.HTML);
      break;
    }
    case import_html.TAG_ID.OPTGROUP: {
      if (p.openElements.currentTagId === import_html.TAG_ID.OPTION) {
        p.openElements.pop();
      }
      if (p.openElements.currentTagId === import_html.TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      p._insertElement(token, import_html.NS.HTML);
      break;
    }
    case import_html.TAG_ID.HR: {
      if (p.openElements.currentTagId === import_html.TAG_ID.OPTION) {
        p.openElements.pop();
      }
      if (p.openElements.currentTagId === import_html.TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      p._appendElement(token, import_html.NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case import_html.TAG_ID.INPUT:
    case import_html.TAG_ID.KEYGEN:
    case import_html.TAG_ID.TEXTAREA:
    case import_html.TAG_ID.SELECT: {
      if (p.openElements.hasInSelectScope(import_html.TAG_ID.SELECT)) {
        p.openElements.popUntilTagNamePopped(import_html.TAG_ID.SELECT);
        p._resetInsertionMode();
        if (token.tagID !== import_html.TAG_ID.SELECT) {
          p._processStartTag(token);
        }
      }
      break;
    }
    case import_html.TAG_ID.SCRIPT:
    case import_html.TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    default:
  }
}
function endTagInSelect(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.OPTGROUP: {
      if (p.openElements.stackTop > 0 && p.openElements.currentTagId === import_html.TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === import_html.TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      if (p.openElements.currentTagId === import_html.TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      break;
    }
    case import_html.TAG_ID.OPTION: {
      if (p.openElements.currentTagId === import_html.TAG_ID.OPTION) {
        p.openElements.pop();
      }
      break;
    }
    case import_html.TAG_ID.SELECT: {
      if (p.openElements.hasInSelectScope(import_html.TAG_ID.SELECT)) {
        p.openElements.popUntilTagNamePopped(import_html.TAG_ID.SELECT);
        p._resetInsertionMode();
      }
      break;
    }
    case import_html.TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default:
  }
}
function startTagInSelectInTable(p, token) {
  const tn = token.tagID;
  if (tn === import_html.TAG_ID.CAPTION || tn === import_html.TAG_ID.TABLE || tn === import_html.TAG_ID.TBODY || tn === import_html.TAG_ID.TFOOT || tn === import_html.TAG_ID.THEAD || tn === import_html.TAG_ID.TR || tn === import_html.TAG_ID.TD || tn === import_html.TAG_ID.TH) {
    p.openElements.popUntilTagNamePopped(import_html.TAG_ID.SELECT);
    p._resetInsertionMode();
    p._processStartTag(token);
  } else {
    startTagInSelect(p, token);
  }
}
function endTagInSelectInTable(p, token) {
  const tn = token.tagID;
  if (tn === import_html.TAG_ID.CAPTION || tn === import_html.TAG_ID.TABLE || tn === import_html.TAG_ID.TBODY || tn === import_html.TAG_ID.TFOOT || tn === import_html.TAG_ID.THEAD || tn === import_html.TAG_ID.TR || tn === import_html.TAG_ID.TD || tn === import_html.TAG_ID.TH) {
    if (p.openElements.hasInTableScope(tn)) {
      p.openElements.popUntilTagNamePopped(import_html.TAG_ID.SELECT);
      p._resetInsertionMode();
      p.onEndTag(token);
    }
  } else {
    endTagInSelect(p, token);
  }
}
function startTagInTemplate(p, token) {
  switch (token.tagID) {
    // First, handle tags that can start without a mode change
    case import_html.TAG_ID.BASE:
    case import_html.TAG_ID.BASEFONT:
    case import_html.TAG_ID.BGSOUND:
    case import_html.TAG_ID.LINK:
    case import_html.TAG_ID.META:
    case import_html.TAG_ID.NOFRAMES:
    case import_html.TAG_ID.SCRIPT:
    case import_html.TAG_ID.STYLE:
    case import_html.TAG_ID.TEMPLATE:
    case import_html.TAG_ID.TITLE: {
      startTagInHead(p, token);
      break;
    }
    // Re-process the token in the appropriate mode
    case import_html.TAG_ID.CAPTION:
    case import_html.TAG_ID.COLGROUP:
    case import_html.TAG_ID.TBODY:
    case import_html.TAG_ID.TFOOT:
    case import_html.TAG_ID.THEAD: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
      p.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p, token);
      break;
    }
    case import_html.TAG_ID.COL: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
      p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
      startTagInColumnGroup(p, token);
      break;
    }
    case import_html.TAG_ID.TR: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
      p.insertionMode = InsertionMode.IN_TABLE_BODY;
      startTagInTableBody(p, token);
      break;
    }
    case import_html.TAG_ID.TD:
    case import_html.TAG_ID.TH: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
      p.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p, token);
      break;
    }
    default: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
      p.insertionMode = InsertionMode.IN_BODY;
      startTagInBody(p, token);
    }
  }
}
function endTagInTemplate(p, token) {
  if (token.tagID === import_html.TAG_ID.TEMPLATE) {
    templateEndTagInHead(p, token);
  }
}
function eofInTemplate(p, token) {
  if (p.openElements.tmplCount > 0) {
    p.openElements.popUntilTagNamePopped(import_html.TAG_ID.TEMPLATE);
    p.activeFormattingElements.clearToLastMarker();
    p.tmplInsertionModeStack.shift();
    p._resetInsertionMode();
    p.onEof(token);
  } else {
    stopParsing(p, token);
  }
}
function startTagAfterBody(p, token) {
  if (token.tagID === import_html.TAG_ID.HTML) {
    startTagInBody(p, token);
  } else {
    tokenAfterBody(p, token);
  }
}
function endTagAfterBody(p, token) {
  var _a;
  if (token.tagID === import_html.TAG_ID.HTML) {
    if (!p.fragmentContext) {
      p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
    }
    if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === import_html.TAG_ID.HTML) {
      p._setEndLocation(p.openElements.items[0], token);
      const bodyElement = p.openElements.items[1];
      if (bodyElement && !((_a = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a === void 0 ? void 0 : _a.endTag)) {
        p._setEndLocation(bodyElement, token);
      }
    }
  } else {
    tokenAfterBody(p, token);
  }
}
function tokenAfterBody(p, token) {
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token);
}
function startTagInFrameset(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.FRAMESET: {
      p._insertElement(token, import_html.NS.HTML);
      break;
    }
    case import_html.TAG_ID.FRAME: {
      p._appendElement(token, import_html.NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case import_html.TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
    default:
  }
}
function endTagInFrameset(p, token) {
  if (token.tagID === import_html.TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
    p.openElements.pop();
    if (!p.fragmentContext && p.openElements.currentTagId !== import_html.TAG_ID.FRAMESET) {
      p.insertionMode = InsertionMode.AFTER_FRAMESET;
    }
  }
}
function startTagAfterFrameset(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
    default:
  }
}
function endTagAfterFrameset(p, token) {
  if (token.tagID === import_html.TAG_ID.HTML) {
    p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
  }
}
function startTagAfterAfterBody(p, token) {
  if (token.tagID === import_html.TAG_ID.HTML) {
    startTagInBody(p, token);
  } else {
    tokenAfterAfterBody(p, token);
  }
}
function tokenAfterAfterBody(p, token) {
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token);
}
function startTagAfterAfterFrameset(p, token) {
  switch (token.tagID) {
    case import_html.TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case import_html.TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
    default:
  }
}
function nullCharacterInForeignContent(p, token) {
  token.chars = unicode.REPLACEMENT_CHARACTER;
  p._insertCharacters(token);
}
function characterInForeignContent(p, token) {
  p._insertCharacters(token);
  p.framesetOk = false;
}
function popUntilHtmlOrIntegrationPoint(p) {
  while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== import_html.NS.HTML && p.openElements.currentTagId !== void 0 && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) {
    p.openElements.pop();
  }
}
function startTagInForeignContent(p, token) {
  if (foreignContent.causesExit(token)) {
    popUntilHtmlOrIntegrationPoint(p);
    p._startTagOutsideForeignContent(token);
  } else {
    const current = p._getAdjustedCurrentElement();
    const currentNs = p.treeAdapter.getNamespaceURI(current);
    if (currentNs === import_html.NS.MATHML) {
      foreignContent.adjustTokenMathMLAttrs(token);
    } else if (currentNs === import_html.NS.SVG) {
      foreignContent.adjustTokenSVGTagName(token);
      foreignContent.adjustTokenSVGAttrs(token);
    }
    foreignContent.adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p._appendElement(token, currentNs);
    } else {
      p._insertElement(token, currentNs);
    }
    token.ackSelfClosing = true;
  }
}
function endTagInForeignContent(p, token) {
  if (token.tagID === import_html.TAG_ID.P || token.tagID === import_html.TAG_ID.BR) {
    popUntilHtmlOrIntegrationPoint(p);
    p._endTagOutsideForeignContent(token);
    return;
  }
  for (let i = p.openElements.stackTop; i > 0; i--) {
    const element = p.openElements.items[i];
    if (p.treeAdapter.getNamespaceURI(element) === import_html.NS.HTML) {
      p._endTagOutsideForeignContent(token);
      break;
    }
    const tagName = p.treeAdapter.getTagName(element);
    if (tagName.toLowerCase() === token.tagName) {
      token.tagName = tagName;
      p.openElements.shortenToLength(i);
      break;
    }
  }
}
