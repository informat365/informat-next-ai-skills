# _create_table_filter_condition

## 技能ID
create_table_filter_condition

## 描述
生成数据表记录的筛选器。字段ID是指调用数据表结构里的fieldList里每个field的id属性，以下涉及到fieldId的地方全是字段ID。返回的数据表记录的key也是字段ID

## 工具调用

### 思考
调用_create_table_filter_condition工具

### 工具名称
_create_table_filter_condition

### 参数
{
  "type": "object",
  "properties": {
    "filter": {
      "type": "object",
      "description": "树形过滤条件结构",
      "properties": {
        "opt": {
          "type": "string",
          "enum": [
            "and",
            "or"
          ],
          "default": "and",
          "description": "逻辑运算符：与/或"
        },
        "conditionList": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "fieldId": {
                "type": "string",
                "description": "字段ID"
              },
              "opt": {
                "type": "string",
                "enum": [
                  "eq",
                  "ne",
                  "gt",
                  "ge",
                  "lt",
                  "le",
                  "contains",
                  "notcontains",
                  "startswith",
                  "endswith",
                  "isnull",
                  "isnotnull",
                  "in",
                  "notin",
                  "between",
                  "notbetween",
                  "parentrooteq",
                  "parenteq",
                  "parentcontains",
                  "intree"
                ]
              },
              "value": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "number"
                  },
                  {
                    "type": "boolean"
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": [
                        "string",
                        "number",
                        "boolean"
                      ]
                    }
                  },
                  {
                    "type": "null"
                  }
                ],
                "description": "根据操作符类型动态变化的值"
              },
              "func": {
                "type": "string",
                "enum": [
                  "month",
                  "week",
                  "nlevel"
                ],
                "description": "特殊函数处理"
              }
            },
            "required": [
              "fieldId",
              "opt"
            ]
          }
        },
        "children": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/filterCondition"
          },
          "description": "嵌套子条件"
        }
      },
      "required": [
        "opt"
      ],
      "definitions": {
        "filterCondition": {
          "type": "object",
          "properties": {
            "opt": {
              "$ref": "#/properties/filter/properties/opt"
            },
            "conditions": {
              "$ref": "#/properties/filter/properties/conditions"
            },
            "children": {
              "$ref": "#/properties/filter/properties/children"
            }
          }
        }
      }
    }
  },
  "required": [
    "filter"
  ]
}
