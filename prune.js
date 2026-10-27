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

console.log('prune done');
