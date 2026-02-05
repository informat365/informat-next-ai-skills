# _web_content

## 技能ID
web_content

## 描述
从网络获取指定 URL 的内容。支持 GET / POST 请求、自定义请求头、超时控制与请求体设置，仅用于获取公开网络资源内容。

## 工具调用

### 思考
调用_web_content工具

### 工具名称
_web_content

### 参数
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "要访问的完整 URL 地址（必须是 http 或 https）"
    },
    "method": {
      "type": "string",
      "description": "HTTP 请求方法",
      "enum": [
        "GET",
        "POST"
      ]
    },
    "timeout": {
      "type": "integer",
      "description": "请求超时时间（毫秒），0 或不传表示使用系统默认超时"
    },
    "followRedirect": {
      "type": "boolean",
      "description": "是否自动跟随 HTTP 重定向（3xx 响应），默认 false"
    },
    "maxRedirectCount": {
      "type": "integer",
      "description": "最大重定向次数，followRedirect=true 时生效，默认 10"
    },
    "headers": {
      "type": "object",
      "description": "自定义请求头（key-value 形式）",
      "additionalProperties": {
        "type": "string"
      }
    },
    "charset": {
      "type": "string",
      "description": "响应内容字符集（如 UTF-8），不传则自动识别"
    },
    "body": {
      "type": "string",
      "description": "POST 请求体（通常为 JSON 或纯文本，method=POST 时使用）"
    },
    "form": {
      "type": "object",
      "description": "POST 表单参数（method=POST 时使用，与 body 二选一）",
      "additionalProperties": {}
    }
  },
  "required": [
    "url",
    "method"
  ],
  "additionalProperties": false
}
