# _website_create_module

## 技能ID
website_create_module

## 描述
创建网站资源与组件设计器模块。用于承载网站资源与页面结构。AI 在创建模块前应先查询现有网站模块，避免重复或命名冲突。

## 工具调用

### 思考
调用_website_create_module工具

### 工具名称
_website_create_module

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "网站资源与组件设计器模块ID（使用驼峰命名，且在系统内唯一，不得与现有模块重复）。"
    },
    "name": {
      "type": "string",
      "description": "网站资源与组件设计器模块的名称。"
    },
    "parentId": {
      "type": "string",
      "description": "模块分组ID，工具_query_app_define_designer可以获取到模块分组定义列表"
    }
  },
  "required": [
    "id",
    "name"
  ]
}
