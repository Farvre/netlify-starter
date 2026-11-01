// 临时自检函数：报告线上运行时真实信息（排障用，稍后删除）
exports.handler = async () => {
  let sniff = 'not-tested';
  try {
    require('html-encoding-sniffer');
    sniff = 'ok';
  } catch (e) {
    sniff = (e.code || 'ERR') + ': ' + String(e.message).split('\n')[0];
  }
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      node: process.version,
      execArgv: process.execArgv,
      NODE_OPTIONS: process.env.NODE_OPTIONS || null,
      AWS_LAMBDA_JS_RUNTIME: process.env.AWS_LAMBDA_JS_RUNTIME || null,
      require_html_encoding_sniffer: sniff,
    }),
  };
};
