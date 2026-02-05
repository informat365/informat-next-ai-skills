# _api_create_define

## 技能ID
api_create_define

## 描述
创建一个新的 API 定义

## 工具调用

### 思考
调用_api_create_define工具

### 工具名称
_api_create_define

### 参数
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "API 的名称"
    },
    "path": {
      "type": "string",
      "description": "API 的访问路径（不包含 appId）"
    },
    "method": {
      "type": "string",
      "description": "HTTP 方法，如 GET、POST，空值表示不限制。"
    },
    "view": {
      "type": "string",
      "description": "返回值类型，如 json、text、file、redirect",
      "enum": [
        "json",
        "text",
        "file",
        "redirect"
      ]
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
      "description": "调用前处理脚本 ID。【强调】不是脚本目录的ID，是脚本文件的ID。"
    },
    "beforeScriptFunc": {
      "type": "string",
      "description": "调用前处理脚本函数名"
    },
    "scriptId": {
      "type": "string",
      "description": "脚本 ID（invokeType=script 时）.【强调】不是脚本目录的ID，是脚本文件的ID。"
    },
    "scriptFunc": {
      "type": "string",
      "description": "脚本函数名"
    },
    "afterScriptId": {
      "type": "string",
      "description": "调用后处理脚本 ID。【强调】不是脚本目录的ID，是脚本文件的ID。"
    },
    "afterScriptFunc": {
      "type": "string",
      "description": "调用后处理脚本函数名"
    },
    "errorScriptId": {
      "type": "string",
      "description": "异常处理脚本 ID。【强调】不是脚本目录的ID，是脚本文件的ID。"
    },
    "errorScriptFunc": {
      "type": "string",
      "description": "异常处理脚本函数名"
    }
  },
  "required": [
    "name",
    "path",
    "view",
    "invokeType",
    "scriptId",
    "scriptFunc"
  ],
  "additionalProperties": false
}
