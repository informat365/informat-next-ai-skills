此文档是织信低代码平台的网站模块文档。

## 概述
织信的网站和资源托管功能提供了静态资源的托管服务，服务器渲染（SSR）等能力，可以快速地实现静态或动态的网站上线。

## 资源与URL
创建一个网站模块相当于创建了一个站点根目录为${host}/web0/website/${appId}/${websiteId}/的站点。
其中 ${host}是平台的webUrl可以通过调用`_app_get_web_url`工具获取,${appId}是应用的ID，${websiteId}是网站模块的ID。
如果我在网站模块上传了一个index.html的文件，其对应的URL为${host}/web0/website/${appId}/${websiteId}/index.html，站点内的相对路径为./index.html

appId是系统自动生成的，在不同的环境中可能是不一样的，为了保证应用分发到任意环境都能访问到指定资源，需要在引用网站资源的代码，通过动态获取的appId设置访问的资源路径。
如果是站点内的资源相互依赖，建议使用相对路径。

## 示例1
.
├──css
│   └── index.css
└──index.html

### index.html

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>资源依赖关系</title>
        <link rel="stylesheet" type="text/css" href="./css/index.css">
    </head>
    <body>
        <h1>Hello Word !</h1>
    </body>
</html>
```

### index.css

```
body {
    background-color: #5b8ff9;
}

body h1 {
    color: #fff;
}
```

## 示例2：在通过 main.js 调用 API 

下面示例演示了在网站模块中，通过 main.js 调用织信低代码平台 API，并将返回数据渲染到页面中。

应用已创建 API 接口：
路径：news
返回类型：json
API 返回新闻列表数据
在前端页面中展示新闻标题列表

main.js

```js
/**
 * 网站模块 main.js
 * 演示如何在前端页面中调用织信 API
 */

// 织信服务地址（示例：使用当前站点）
const host = window.location.origin;

// 应用 ID（示例中写死，实际项目中建议动态获取）
const appId = 'demoAppId123';

// API 路径
const apiPath = 'news';

// API 完整地址
const apiUrl = `${host}/web0/api/${appId}/${apiPath}`;

// 页面加载完成后调用 API
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
});

// 调用 API 获取新闻数据
function loadNews() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            renderNews(data);
        })
        .catch(err => {
            console.error('API 调用失败', err);
        });
}

// 将数据渲染到页面
function renderNews(data) {
    const container = document.getElementById('news-container');
    if (!container || !data) return;

    container.innerHTML = data.map(item => `
        <div class="news-item">
            <h3>${item.title}</h3>
            <p>${item.summary || ''}</p>
        </div>
    `).join('');
}
```

index.html

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>API 调用示例</title>
</head>
<body>

<h1>新闻列表</h1>
<div id="news-container">加载中...</div>

<script src="./main.js"></script>
</body>
</html>

```
