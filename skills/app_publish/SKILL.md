# _app_publish

## 技能ID
app_publish

## 描述
将当前应用中所有处于【草稿状态】的配置一次性发布到【正式环境】。【正式发布应用】⚠️ 该操作不可撤销，发布后将立即对真实用户生效。

在执行前，必须向用户进行确认，并明确告知发布影响。

## 工具调用

### 思考
调用_app_publish工具

### 工具名称
_app_publish

### 参数
{
  "type": "object",
  "properties": {
    "confirm": {
      "type": "boolean",
      "description": "是否确认执行正式发布。只有当用户明确表示“确认发布 / 继续发布 / 确认执行”等肯定意图时，才允许传入 true。"
    }
  },
  "required": [
    "confirm"
  ]
}
