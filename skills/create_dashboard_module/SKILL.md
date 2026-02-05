# _create_dashboard_module

## 技能ID
create_dashboard_module

## 描述
生成织信仪表盘

## 工具调用

### 思考
调用_create_dashboard_module工具

### 工具名称
_create_dashboard_module

### 参数
{
  "type": "object",
  "properties": {
    "name": {
      "description": "仪表盘名称",
      "type": "string"
    },
    "id": {
      "description": "仪表盘ID（英文驼峰命名，不得使用JavaScript/Java保留字，如id、class、function等）",
      "type": "string"
    },
    "remark": {
      "description": "仪表盘模块说明",
      "type": "string"
    }
  },
  "required": [
    "id",
    "name"
  ]
}
