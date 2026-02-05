# _api_query_define_designer

## 技能ID
api_query_define_designer

## 描述
根据 API ID 查询单个 API 的详细定义。（只读操作，不产生任何修改）

## 工具调用

### 思考
调用_api_query_define_designer工具

### 工具名称
_api_query_define_designer

### 参数
{
  "type": "object",
  "properties": {
    "apiId": {
      "type": "string",
      "description": "API 的唯一 ID"
    }
  },
  "required": [
    "apiId"
  ],
  "additionalProperties": false
}
