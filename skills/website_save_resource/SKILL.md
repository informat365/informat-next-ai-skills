# _website_save_resource

## 技能ID
website_save_resource

## 描述
创建或编辑网站模块资源信息。创建资源时，不得主动生成 id；编辑资源时，必须先调用 _website_query_resource 获取真实 id。单个文件内容超过 300 行或 8000 字符，必须主动拆分为多个文件。

## 工具调用

### 思考
调用_website_save_resource工具

### 工具名称
_website_save_resource

### 参数
{
  "type": "object",
  "properties": {
    "websiteId": {
      "type": "string",
      "description": "网站模块ID。"
    },
    "id": {
      "type": "string",
      "description": "资源ID。新增时可以为空，编辑时不能为空。"
    },
    "name": {
      "type": "string",
      "description": "资源名称。文件名，如 index.html、main.css、app.js。推荐使用英文小写字母、数字、中划线或下划线命名。"
    },
    "content": {
      "type": "string",
      "description": "资源文件内容。"
    },
    "parentId": {
      "type": "string",
      "description": "父目录ID。为空表示放在网站根目录。"
    }
  },
  "required": [
    "websiteId",
    "name",
    "content"
  ]
}
