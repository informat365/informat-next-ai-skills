# _send_system_email

## 技能ID
send_system_email

## 描述
发送系统邮件。

## 工具调用

### 思考
调用_send_system_email工具

### 工具名称
_send_system_email

### 参数
{
  "type": "object",
  "properties": {
    "recipients": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "address": {
            "type": "string",
            "description": "收件人邮箱地址"
          },
          "personal": {
            "type": "string",
            "description": "收件人昵称"
          },
          "type": {
            "type": "string",
            "enum": [
              "TO",
              "CC",
              "BCC"
            ],
            "default": "TO",
            "description": "邮件发送方式"
          }
        },
        "required": [
          "address",
          "type"
        ]
      },
      "description": "收件人列表"
    },
    "subject": {
      "type": "string",
      "description": "邮件主题"
    },
    "personal": {
      "type": "string",
      "description": "发件人昵称",
      "default": 1
    },
    "multiparts": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "content": {
            "type": "string",
            "description": "正文"
          },
          "contentType": {
            "type": "string",
            "description": "正文类型",
            "default": "text/html;charset=utf-8"
          },
          "type": {
            "type": "string",
            "enum": [
              "content"
            ],
            "default": "content",
            "description": "类型"
          }
        },
        "required": [
          "content",
          "type"
        ]
      },
      "description": "邮件内容"
    }
  },
  "required": [
    "recipients",
    "subject",
    "personal",
    "multiparts"
  ]
}
