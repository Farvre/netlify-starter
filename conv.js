// 把指定 ESM 包原地转换为 CJS（逐文件 esbuild 语法转换，保留目录结构与相对引用）
// 用法: node conv.js <node_modules源目录> <输出目录> <pkg1> <pkg2> ...
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const [srcNm, outRoot, ...pkgs] = process.argv.slice(2);

function walk(d, cb, skip = new Set(['node_modules', '.git'])) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (skip.has(e.name)) continue;
      walk(path.join(d, e.name), cb, skip);
    } else cb(path.join(d, e.name));
  }
}

function flattenExports(v) {
  if (typeof v === 'string') return v;
  if (v && typeof v === 'object') {
    for (const k of ['require', 'default', 'import', 'node']) {
      if (k in v) return flattenExports(v[k]);
    }
    for (const k of Object.keys(v)) return flattenExports(v[k]);
  }
  return undefined;
}

for (const pkg of pkgs) {
  const src = path.join(srcNm, pkg);
  const out = path.join(outRoot, pkg);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });

  let converted = 0, skipped = 0;
  walk(src, (f) => {
    const rel = path.relative(src, f);
    const dest = path.join(out, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (f.endsWith('.mjs')) {
      const code = fs.readFileSync(f, 'utf8');
      try {
        const r = esbuild.transformSync(code, { loader: 'js', format: 'cjs', target: 'node18' });
        fs.writeFileSync(dest.replace(/\.mjs$/, '.cjs'), r.code);
        converted++;
      } catch (e) {
        console.log('  !! transform failed, copied raw:', rel, e.message.split('\n')[0]);
        fs.copyFileSync(f, dest);
        skipped++;
      }
    } else if (f.endsWith('.js')) {
      const code = fs.readFileSync(f, 'utf8');
      try {
        const r = esbuild.transformSync(code, { loader: 'js', format: 'cjs', target: 'node18' });
        fs.writeFileSync(dest, r.code);
        converted++;
      } catch (e) {
        console.log('  !! transform failed, copied raw:', rel, e.message.split('\n')[0]);
        fs.copyFileSync(f, dest);
        skipped++;
      }
    } else if (f.endsWith('.cjs')) {
      fs.copyFileSync(f, dest);
    } else if (f.endsWith('package.json')) {
      const pj = JSON.parse(fs.readFileSync(f, 'utf8'));
      delete pj.type;
      delete pj.module;
      if (pj.exports && typeof pj.exports === 'object') {
        const flat = {};
        for (const [k, v] of Object.entries(pj.exports)) {
          const s = flattenExports(v);
          if (s !== undefined) flat[k] = s.replace(/\.mjs$/, '.cjs');
        }
        pj.exports = flat;
      }
      if (typeof pj.main === 'string') pj.main = pj.main.replace(/\.mjs$/, '.cjs');
      fs.writeFileSync(dest, JSON.stringify(pj, null, 2));
    } else {
      fs.copyFileSync(f, dest);
    }
  });
  console.log(pkg, '-> converted:', converted, 'raw-copied:', skipped);
}
