# _i18n_set_app_name

## 技能ID
i18n_set_app_name

## 描述
使用表达式设置应用名称。

## 工具调用

### 思考
调用_i18n_set_app_name工具

### 工具名称
_i18n_set_app_name

### 参数
{
  "type": "object",
  "properties": {
    "displayName": {
      "type": "string",
      "description": "表达式应用名称。必须使用国际化表达式形式：${T.t('path')}。其中 path 为国际化翻译定义（translateList）中翻译项的完整路径，例如：${T.t('app.name')}"
    }
  },
  "required": ["displayName"],
  "additionalProperties": false
}
