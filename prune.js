// 构建时精简依赖：评论服务用不到数学公式渲染、LeanCloud、SQLite，
// 把这些重型包替换为空壳（供打包器解析引用，运行时永不加载），
// 使函数包体积低于 Netlify 的 250MB 上限。
const fs = require('fs');
const path = require('path');

const NM = path.join(__dirname, 'node_modules');

function stub(name, files, pkgExtra) {
  const dir = path.join(NM, ...name.split('/'));
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify({ name, version: '0.0.0', main: 'index.js', ...pkgExtra })
  );
  const entries = files || { 'index.js': 'module.exports = {};' };
  for (const [f, content] of Object.entries(entries)) {
    fs.writeFileSync(path.join(dir, f), content);
  }
  console.log('stubbed  ', name);
}

function remove(name) {
  fs.rmSync(path.join(NM, ...name.split('/')), { recursive: true, force: true });
  console.log('removed  ', name);
}

// 数学公式渲染（评论区不需要，替换为无害的假插件）
const noopPlugin =
  'function createMathjaxInstance() { return {}; }\nfunction mathjax() {}\nfunction katex() {}\nexports.createMathjaxInstance = createMathjaxInstance;\nexports.mathjax = mathjax;\nexports.katex = katex;\n';
stub('@mdit/plugin-mathjax', {
  'index.js': noopPlugin,
  'sync.js': noopPlugin,
}, { exports: { '.': './index.js', './sync': './sync.js', './package.json': './package.json' } });
stub('@mdit/plugin-katex', { 'index.js': noopPlugin }, { exports: { '.': './index.js', './package.json': './package.json' } });
// @mdit/plugin-emoji 是纯 ESM 包，某些 Node 运行时 require() 会直接崩 —— 换成 CJS 空壳
stub('@mdit/plugin-emoji', { 'index.js': 'exports.fullEmoji = function fullEmoji() {};\n' });
stub('katex');
stub('@mathjax/src');
stub('@mathjax/mathjax-newcm-font');
stub('@mathjax/mathjax-tex-font');
stub('speech-rule-engine');

// LeanCloud 存储（本站用 MongoDB）
stub('leancloud-storage');
stub('leancloud-realtime');

// SQLite 存储（本站用 MongoDB）
stub('better-sqlite3', {
  'index.js':
    'class Database {}\nDatabase.verbose = () => Database;\nmodule.exports = Database;\nmodule.exports.default = Database;\n',
});

// 腾讯云类型定义包（纯类型，无运行时代码）
stub('@cloudbase/types');

// ── ESM → CJS 转换补丁 ──────────────────────────────────────────────
// AWS Lambda 启动时带 --no-experimental-require-module（禁用 require 加载 ESM），
// 而 jsdom 等 CJS 包会 require() 纯 ESM 依赖，启动即崩（502）。
// cjs-patches/ 里是预先用 esbuild 转成 CJS 的等价包（功能完全一致），
// 覆盖到 node_modules 上即可（用 conv.js 可在依赖升级后重新生成）。
function restoreCjs(name) {
  const src = path.join(__dirname, 'cjs-patches', ...name.split('/'));
  const dest = path.join(NM, ...name.split('/'));
  // 嵌套 node_modules 必须保留（包内依赖的版本可能与顶层不同，zisi 会原样带上）
  const nested = path.join(dest, 'node_modules');
  const saved = path.join(__dirname, '.nested-save', ...name.split('/'));
  const hasNested = fs.existsSync(nested);
  if (hasNested) {
    fs.mkdirSync(path.dirname(saved), { recursive: true });
    fs.renameSync(nested, saved);
  }
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
  if (hasNested) {
    fs.mkdirSync(dest, { recursive: true });
    fs.renameSync(saved, nested);
  }
  console.log('cjsified ', name, hasNested ? '(nested node_modules 保留)' : '');
}
[
  '@exodus/bytes',
  'parse5',
  'entities',
  '@asamuzakjp/css-color',
  '@asamuzakjp/dom-selector',
  '@csstools/css-calc',
  '@csstools/css-color-parser',
  '@csstools/css-parser-algorithms',
  '@csstools/css-tokenizer',
  '@csstools/color-helpers',
].forEach(restoreCjs);

console.log('prune done');
