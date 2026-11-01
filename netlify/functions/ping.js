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
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      node: process.version,
      require_html_encoding_sniffer: sniff,
      require_parse5: parse5,
      parse5_dir: listDir('/var/task/node_modules/parse5'),
      parse5_dist: listDir('/var/task/node_modules/parse5/dist'),
      parse5_dist_index: probe('/var/task/node_modules/parse5/dist/index.js'),
      entities_dir: listDir('/var/task/node_modules/entities'),
    }),
  };
};
