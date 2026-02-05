# _website_query_resource

## 技能ID
website_query_resource

## 描述
查询网站模块指定资源详情。包括资源文件内容

## 工具调用

### 思考
调用_website_query_resource工具

### 工具名称
_website_query_resource

### 参数
{
  "type": "object",
  "properties": {
    "websiteId": {
      "description": "website module ID",
      "type": "string"
    },
    "id": {
      "description": "resource ID",
      "type": "string"
    }
  },
  "required": [
    "websiteId",
    "id"
  ]
}
