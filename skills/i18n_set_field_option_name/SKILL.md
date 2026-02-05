# _i18n_set_field_option_name

## 技能ID
i18n_set_field_option_name

## 描述
使用国际化表达式设置数据表字段显示名称。

## 工具调用

### 思考
调用_i18n_set_field_option_name工具

### 工具名称
_i18n_set_field_option_name

### 参数
{
  "type": "object",
  "properties": {
    "moduleId": {
      "type": "string",
      "description": "所属模块ID"
    },
    "fieldId": {
      "type": "string",
      "description": "字段ID"
    },
    "optionList": {
      "type": "array",
      "description": "数据表字段选项值配置列表",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "选项值ID"
          },
          "displayName": {
            "type": "string",
            "description": "选项值显示名称表达式（支持国际化表达式）。必须使用国际化表达式形式：${T.t('path')}。其中 path 为国际化翻译定义（translateList）中翻译项的完整路径，例如：${T.t('grade.name')}"
          }
        },
        "required": ["id", "displayName"],
        "additionalProperties": false
      },
      "minItems": 1
    }
  },
  "required": ["moduleId", "fieldId", "optionList"],
  "additionalProperties": false
}
