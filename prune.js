// 构建时精简依赖：评论服务用不到数学公式渲染、LeanCloud、SQLite，
// 把这些重型包替换为空壳（供打包器解析引用，运行时永不加载），
// 使函数包体积低于 Netlify 的 250MB 上限。
const fs = require('fs');
const path = require('path');

const NM = path.join(__dirname, 'node_modules');

function stub(name, files) {
  const dir = path.join(NM, ...name.split('/'));
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify({ name, version: '0.0.0', main: 'index.js' })
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

// 数学公式渲染（评论区不需要）
stub('@mdit/plugin-mathjax', {
  'index.js': 'module.exports = { createMathjaxInstance: () => ({}), mathjax: () => ({}) };',
  'sync.js': 'module.exports = {};',
});
stub('@mdit/plugin-katex');
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
