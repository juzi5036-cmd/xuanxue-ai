const fs = require('fs');
let html = fs.readFileSync('dist/index.html', 'utf8');

// 0. 提取 head 中的 script，移到 body 末尾
const scriptOpen = '<script type="module" crossorigin>';
const scriptStart = html.indexOf(scriptOpen);
const headEnd = html.indexOf('</head>');
const scriptEndPos = html.lastIndexOf('</script>', headEnd);
const scriptEndFull = scriptEndPos + '</script>'.length;
const scriptTag = html.substring(scriptStart, scriptEndFull);
// 从 head 移除
html = html.substring(0, scriptStart) + html.substring(scriptEndFull);
// 插入到 body 末尾
let bodyEnd = html.indexOf('</body>');
html = html.substring(0, bodyEnd) + '    ' + scriptTag + '\n  ' + html.substring(bodyEnd);

// 1. 去掉 type="module" crossorigin
html = html.replace('<script type="module" crossorigin>', '<script>');

// 2. 在 script 开头插入 polyfill
const polyfill = `
var __scriptSrc = document.currentScript ? document.currentScript.src : '';
var __metaUrl = __scriptSrc || location.href;
function __dynImport(mod) {
  return Promise.reject(new Error('Dynamic import not supported: ' + mod));
}
`;
html = html.replace('<script>', '<script>' + polyfill);

// 3. 替换 import.meta.url
while (html.includes('import.meta.url')) {
  html = html.replace('import.meta.url', '__metaUrl');
}

// 4. 替换所有其他 import.meta 引用
while (html.includes('import.meta')) {
  html = html.replace('import.meta', '{url:__metaUrl,resolve:function(s){return new URL(s,__metaUrl)}}');
}

// 5. 替换原生 import( 为 polyfill 函数调用
// 注意不要替换已经替换过的 __dynImport
while (html.includes('import(')) {
  html = html.replace('import(', '__dynImport(');
}

fs.writeFileSync('dist/index.html', html);

// 验证
const code = html.match(/<script[^>]*>([\s\S]*)<\/script>/)[1];
const dynImportCount = (code.match(/__dynImport\(/g) || []).length;
const metaUrlCount = (code.match(/import\.meta/g) || []).length;
const nativeImportCount = (code.match(/[^_a-zA-Z]import\(/g) || []).length;
console.log('polyfill __dynImport() 调用:', dynImportCount);
console.log('剩余 import.meta:', metaUrlCount);
console.log('剩余原生 import():', nativeImportCount);
console.log('文件大小:', (fs.statSync('dist/index.html').size / 1024).toFixed(0) + ' KB');
