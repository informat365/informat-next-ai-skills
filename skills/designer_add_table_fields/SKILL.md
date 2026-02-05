# _designer_add_table_fields

## 技能ID
designer_add_table_fields

## 描述
创建低代码平台数据表字段。字段类型需要设置成低代码平台的知识库中描述的字段类型

## 工具调用

### 思考
调用_designer_add_table_fields工具

### 工具名称
_designer_add_table_fields

### 参数
{
  "type": "object",
  "properties": {
    "fields": {
      "type": "array",
      "description": "数据表字段列表",
      "items": {
        "type": "object",
        "required": [
          "id",
          "name",
          "type"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "字段标识符"
          },
          "name": {
            "type": "string",
            "description": "字段名称"
          },
          "type": {
            "type": "string",
            "description": "低代码平台支持的字段类型"
          },
          "options": {
            "type": "array",
            "description": "待选值列表",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "选项值标识符"
                },
                "name": {
                  "type": "string",
                  "description": "选项值名称"
                }
              },
              "required": [
                "id",
                "name"
              ]
            }
          }
        }
      }
    }
  },
  "required": [
    "fields"
  ]
}
