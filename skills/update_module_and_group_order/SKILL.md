# _update_module_and_group_order

## 技能ID
update_module_and_group_order

## 描述
更新模块和分组顺序。需要一次性传入完整 moduleList。

## 工具调用

### 思考
调用_update_module_and_group_order工具

### 工具名称
_update_module_and_group_order

### 参数
{
  "type": "object",
  "properties": {
    "moduleList": {
      "type": "array",
      "description": "模块列表（包含分组，树形结构，支持多级嵌套）",
      "items": {
        "$ref": "#/definitions/ObjectRef"
      }
    }
  },
  "required": [
    "moduleList"
  ],
  "definitions": {
    "ObjectRef": {
      "type": "object",
      "description": "模块或目录节点",
      "properties": {
        "id": {
          "type": "string",
          "description": "模块ID（可为空，由系统生成）"
        },
        "children": {
          "type": "array",
          "description": "子模块列表",
          "items": {
            "$ref": "#/definitions/ObjectRef"
          }
        }
      },
      "required": [
        "id"
      ]
    }
  }
}
