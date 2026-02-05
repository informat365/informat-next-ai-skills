# _query_app_user_list

## 技能ID
query_app_user_list

## 描述
查询账号基本信息。包括账号ID、邮箱、直接上级、所属部门等信息

## 工具调用

### 思考
调用_query_app_user_list工具

### 工具名称
_query_app_user_list

### 参数
{
  "type": "object",
  "oneOf": [
    {
      "required": [
        "idList"
      ]
    },
    {
      "required": [
        "nameList"
      ]
    }
  ],
  "properties": {
    "idList": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "账号ID"
      },
      "description": "账号ID列表"
    },
    "nameList": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "账号名称"
      },
      "description": "账号名称列表"
    }
  }
}
