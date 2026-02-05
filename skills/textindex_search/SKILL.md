# _textindex_search

## 技能ID
textindex_search

## 描述
通过关键字搜索搜索引擎的数据。支持筛选、分页。通常先调用_query_all_textindex_list后再调用这个工具

## 工具调用

### 思考
调用_textindex_search工具

### 工具名称
_textindex_search

### 参数
{
  "type": "object",
  "properties": {
    "moduleId": {
      "type": "string",
      "description": "通过_textindex_module_list接口获取的搜索引擎模块ID"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字"
    },
    "pageIndex": {
      "type": "integer",
      "description": "页码，从1开始",
      "default": 1
    },
    "pageSize": {
      "type": "integer",
      "description": "每页记录数",
      "default": 50
    }
  },
  "required": [
    "moduleId",
    "keyword"
  ]
}
