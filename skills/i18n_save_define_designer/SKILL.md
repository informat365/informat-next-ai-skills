# _i18n_save_define_designer

## 技能ID
i18n_save_define_designer

## 描述
保存国际化翻译定义。用于维护应用内多语言翻译结构与内容

## 工具调用

### 思考
调用_i18n_save_define_designer工具

### 工具名称
_i18n_save_define_designer

### 参数
{
  "type": "object",
  "properties": {
    "translateList": {
      "type": "array",
      "description": "国际化翻译列表（支持分组与多级结构）",
      "items": {
        "$ref": "#/definitions/Translate"
      }
    }
  },
  "required": [
    "translateList"
  ],
  "definitions": {
    "Translate": {
      "type": "object",
      "description": "国际化翻译项或翻译分组",
      "properties": {
        "id": {
          "type": "string",
          "description": "翻译项ID,16位小写英文随机字符串，例如dcukarpyabqke，不能重复"
        },
        "key": {
          "type": "string",
          "description": "翻译标识符（如 button.submit、menu.user）"
        },
        "isDirectory": {
          "type": "boolean",
          "description": "是否为分组目录"
        },
        "children": {
          "type": "array",
          "description": "子翻译项（当 isDirectory=true 时使用）",
          "items": {
            "$ref": "#/definitions/Translate"
          }
        },
        "content": {
          "type": "object",
          "description": "翻译内容，key 为语言ID，value 为对应语言的翻译文本",
          "additionalProperties": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "key",
        "isDirectory"
      ],
      "additionalProperties": false
    }
  }
}
