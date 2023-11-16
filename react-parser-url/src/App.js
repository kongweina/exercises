import './App.css';
import { useState, useEffect } from 'react';

const defaultParserResult = {
  protocol: '',
  hostname: '',
  port: '',
  pathname: '',
  params: {},
  hash: ''
}

function urlParamsToObject(url) {
  const params = new URLSearchParams(url.search);
  const paramObj = {};
  for (let [key, value] of params) {
    paramObj[key] = decodeURIComponent(value);
  }
  return paramObj;
}

const parserUrl = (url) => {
  // 你的实现
  const urls = new URL(url);
  return {
    protocol: urls.protocol,
    hostname: urls.hostname,
    port: urls.port,
    pathname: urls.pathname,
    hash: urls.hash,
    params: urlParamsToObject(urls),
  }
};

// 测试用例
parserUrl('https://baidu.com:443/s?wd=hello');
// 输出结果：{ protocol: 'https:', hostname: 'baidu.com', port: '443', pathname: '/s', params: { wd: 'hello' },  hash: '' }


function App() {
  const [result, setResult] = useState(defaultParserResult);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        const parserResult =  parserUrl(inputVal)
        setResult(parserResult);
      }
    }
    document.addEventListener('keydown', onKeyDown, false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现 App.js 中 parserUrl 方法，当用户在输入框中输入url时，</div>
        <div>点击解析按钮（或者按 enter 快捷键）能够识别出 url 各个组成部分</div>
        <div>并将结果渲染在页面上（tips: 请尽可能保证 parserUrl 的健壮性和完备性）</div>
      </header>
      <section className="App-content">
        <input type="text" value={inputVal} placeholder="请输入 url 字符串" onChange={(v) => {
          setInputVal(v.target.value)
        }} />
        <button id="J-parserBtn">解析</button>
      </section>
      <section className="App-result">
        <h2>解析结果</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
