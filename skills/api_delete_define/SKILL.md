# _api_delete_define

## 技能ID
api_delete_define

## 描述
删除已有 API 的定义配置。（危险操作，仅在用户明确要求删除指定 API 时才允许调用）

## 工具调用

### 思考
调用_api_delete_define工具

### 工具名称
_api_delete_define

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "API 的唯一 ID（必须真实存在）"
    }
  },
  "required": [
    "id"
  ],
  "additionalProperties": false
}
