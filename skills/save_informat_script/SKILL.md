# _save_informat_script

## 技能ID
save_informat_script

## 描述
保存织信脚本文件。如果id为空就是新增脚本文件，如果id不为空就是编辑脚本文件，如果该脚本在目录下，则必须传目录parentId。如果上下文过长报错可以分为多个脚本文件。单个文件内容超过 300 行或 8000 字符，必须主动拆分为多个文件。【重要函数导出规范（必须遵守）】

1️⃣ 如果脚本中的函数会被【自动化 / API / 控件 / AI Agent/ 定时任务】调用，**必须显式导出该函数**

2️⃣ 只允许使用 ES Module 方式导出函数：

✅ 正确示例：
```js
export function getNewsList() {}
export function getNewsDetail(id) {}
```

❌ 禁止使用 CommonJS 的 module.exports / exports 方式，例如：
```js
// ❌ 禁止
module.exports = {
  getNewsList,
  getNewsDetail
}
```

3️⃣ 原因说明：
- 织信脚本运行环境基于 ES Module 规范
- 自动化、API、控件与 AI 调用依赖静态函数解析
- 使用 module.exports 会导致函数无法被识别与绑定

4️⃣ 未导出的函数：
- 仅可作为脚本内部私有方法使用
- 不允许被自动化、API、控件、定时任务或 AI 直接调用。
- 平台内置 API 统一通过全局命名空间 `informat` 调用 
 ✅ 正确示例：informat.table.query(query) 

❌ 错误示例（禁止）：$informat.table.query(query)。

## 工具调用

### 思考
调用_save_informat_script工具

### 工具名称
_save_informat_script

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "description": "脚本ID",
      "type": "string"
    },
    "name": {
      "description": "文件名称 如index.js,文件名不能重复 一定是.js结尾,都是使用英文",
      "type": "string"
    },
    "content": {
      "description": "文件内容,脚本内容都存储到这里",
      "type": "string"
    },
    "parentId": {
      "description": "父目录id，没有可以不传",
      "type": "string"
    }
  },
  "required": [
    "name",
    "content"
  ]
}
