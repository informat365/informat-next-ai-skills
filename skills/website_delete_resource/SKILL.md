# _website_delete_resource

## 技能ID
website_delete_resource

## 描述
删除网站模块资源。

## 工具调用

### 思考
调用_website_delete_resource工具

### 工具名称
_website_delete_resource

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
      "description": "网站模块资源ID。"
    }
  },
  "required": [
    "websiteId",
    "id"
  ]
}
