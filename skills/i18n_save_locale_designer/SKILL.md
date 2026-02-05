# _i18n_save_locale_designer

## 技能ID
i18n_save_locale_designer

## 描述
保存应用支持的语言列表。用于国际化翻译与界面语言切换配置

## 工具调用

### 思考
调用_i18n_save_locale_designer工具

### 工具名称
_i18n_save_locale_designer

### 参数
{
  "type": "object",
  "properties": {
    "localeList": {
      "type": "array",
      "description": "应用支持的语言代码列表",
      "items": {
        "type": "string",
        "enum": [
          "zh_CN",
          "zh_TW",
          "en_US",
          "ja"
        ],
        "description": "语言代码"
      },
      "minItems": 1,
      "uniqueItems": true
    }
  },
  "required": [
    "localeList"
  ],
  "additionalProperties": false
}
