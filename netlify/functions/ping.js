// 临时自检函数：报告线上运行时真实信息（排障用，稍后删除）
const fs = require('fs');

exports.handler = async () => {
  const probe = (p) => {
    try {
      const st = fs.statSync(p);
      return st.isDirectory() ? 'dir' : 'file(' + st.size + ')';
    } catch (e) {
      return 'MISSING';
    }
  };
  let sniff = 'not-tested';
  try {
    require('html-encoding-sniffer');
    sniff = 'ok';
  } catch (e) {
    sniff = (e.code || 'ERR') + ': ' + String(e.message).split('\n')[0];
  }
  let parse5 = 'not-tested';
  try {
    require('parse5');
    parse5 = 'ok';
  } catch (e) {
    parse5 = (e.code || 'ERR') + ': ' + String(e.message).split('\n')[0];
  }
  const listDir = (p) => {
    try {
      return fs.readdirSync(p).slice(0, 30);
    } catch (e) {
      return 'MISSING';
    }
  };
  let lru = {};
  try {
    const lc = require('lru-cache');
    lru = {
      resolve: require.resolve('lru-cache'),
      typeof: typeof lc,
      keys: Object.keys(lc).slice(0, 10),
      LRUCache: typeof lc.LRUCache,
    };
  } catch (e) {
    lru = { err: (e.code || 'ERR') + ': ' + String(e.message).split('\n')[0] };
  }
  let cssColor = 'not-tested';
  try {
    require('@asamuzakjp/css-color');
    cssColor = 'ok';
  } catch (e) {
    cssColor = (e.code || 'ERR') + ': ' + String(e.message).split('\n')[0];
  }
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      node: process.version,
      require_html_encoding_sniffer: sniff,
      require_parse5: parse5,
      require_css_color: cssColor,
      lru_cache: lru,
      lru_cache_dir: listDir('/var/task/node_modules/lru-cache'),
      lru_cache_dist: listDir('/var/task/node_modules/lru-cache/dist'),
    }),
  };
};
