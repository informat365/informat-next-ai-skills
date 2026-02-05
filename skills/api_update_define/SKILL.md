# _api_update_define

## 技能ID
api_update_define

## 描述
更新已有 API 的定义配置。必须通过 updateFieldList 明确声明本次要修改的字段，且 updateFieldList 中列出的每一个字段都必须在参数中提供对应的新值；脚本相关字段（scriptId / scriptFunc、before*、after*、error*）必须成对出现，禁止只更新其中一项。

## 工具调用

### 思考
调用_api_update_define工具

### 工具名称
_api_update_define

### 参数
{
  "type": "object",
  "properties": {
    "updateFieldList": {
      "type": "array",
      "description": "本次编辑操作中明确要修改的属性列表。updateFieldList 中声明的字段必须在本次参数中提供对应的新值，否则视为非法更新。",
      "items": {
        "type": "string",
        "pattern": "^[a-zA-Z][a-zA-Z0-9]*(\\.[a-zA-Z][a-zA-Z0-9]*)*$"
      },
      "examples": [
        [
          "path",
          "method"
        ],
        [
          "view",
          "invokeType"
        ],
        [
          "beforeScriptId",
          "beforeScriptFunc"
        ],
        [
          "scriptId",
          "scriptFunc"
        ]
      ]
    },
    "id": {
      "type": "string",
      "description": "API 的唯一 ID"
    },
    "name": {
      "type": "string",
      "description": "API 的名称"
    },
    "path": {
      "type": "string",
      "description": "API 访问路径"
    },
    "method": {
      "type": "string",
      "description": "HTTP 方法，如 GET、POST，空值表示不限制。"
    },
    "view": {
      "type": "string",
      "description": "返回值类型"
    },
    "invokeType": {
      "type": "string",
      "description": "调用类型：script",
      "enum": [
        "script"
      ]
    },
    "apiDesc": {
      "type": "string",
      "description": "API 描述说明"
    },
    "beforeScriptId": {
      "type": "string",
      "description": "调用前处理脚本 ID"
    },
    "beforeScriptFunc": {
      "type": "string",
      "description": "调用前处理脚本函数名"
    },
    "scriptId": {
      "type": "string",
      "description": "脚本 ID（invokeType=script 时）"
    },
    "scriptFunc": {
      "type": "string",
      "description": "脚本函数名"
    },
    "afterScriptId": {
      "type": "string",
      "description": "调用后处理脚本 ID"
    },
    "afterScriptFunc": {
      "type": "string",
      "description": "调用后处理脚本函数名"
    },
    "errorScriptId": {
      "type": "string",
      "description": "异常处理脚本 ID"
    },
    "errorScriptFunc": {
      "type": "string",
      "description": "异常处理脚本函数名"
    },
    "enableRateLimiter": {
      "type": "boolean",
      "description": "是否启用限流"
    }
  },
  "required": [
    "id",
    "updateFieldList"
  ],
  "additionalProperties": false
}
