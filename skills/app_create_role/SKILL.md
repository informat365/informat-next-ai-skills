# _app_create_role

## 技能ID
app_create_role

## 描述
在当前应用下创建一个新的自定义角色。【创建应用角色】用于权限控制与功能授权。角色 ID 与名称必须在应用内唯一，且不得使用系统保留角色标识。

## 工具调用

### 思考
调用_app_create_role工具

### 工具名称
_app_create_role

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "角色唯一标识（应用内唯一）。必须使用驼峰命名（camelCase），仅支持英文字母与数字，不得包含下划线或特殊字符，且不得使用系统保留标识（如：admin）。示例：dataManager、orderViewer、workflowApprover。",
      "minLength": 2,
      "maxLength": 50,
      "pattern": "^(?!admin$)[a-z][A-Za-z0-9]{1,49}$"
    },
    "name": {
      "type": "string",
      "description": "角色名称（应用内唯一，用于界面展示）。不得使用系统保留名称（如：管理员）。示例：数据管理角色、订单查看角色。",
      "minLength": 1,
      "maxLength": 50,
      "pattern": "^(?!管理员$).+$"
    },
    "remark": {
      "type": "string",
      "description": "角色说明，用于描述该角色的职责范围与使用场景。",
      "maxLength": 200
    }
  },
  "required": [
    "id",
    "name"
  ]
}
