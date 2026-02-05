# _i18n_set_module_name

## 技能ID
i18n_set_module_name

## 描述
使用国际化表达式设置模块显示名称。

## 工具调用

### 思考
调用_i18n_set_module_name工具

### 工具名称
_i18n_set_module_name

### 参数
{
  "type": "object",
  "properties": {
    "displayNameList": {
      "type": "array",
      "description": "模块显示名称配置列表",
      "items": {
        "type": "object",
        "properties": {
          "moduleId": {
            "type": "string",
            "description": "模块ID"
          },
          "displayName": {
            "type": "string",
            "description": "模块显示名称表达式（支持国际化表达式）。必须使用国际化表达式形式：${T.t('path')}。其中 path 为国际化翻译定义（translateList）中翻译项的完整路径，例如：${T.t('module.crm.name')}"
          }
        },
        "required": ["moduleId", "displayName"],
        "additionalProperties": false
      },
      "minItems": 1
    }
  },
  "required": ["displayNameList"],
  "additionalProperties": false
}
