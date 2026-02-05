# _query_table_record_list_count

## 技能ID
query_table_record_list_count

## 描述
统计符合条件的数据表记录数量。支持筛选条件、分组和聚合函数

## 工具调用

### 思考
调用_query_table_record_list_count工具

### 工具名称
_query_table_record_list_count

### 参数
{
  "type": "object",
  "properties": {
    "tableId": {
      "type": "string",
      "description": "通过query_all_table_list接口获取的数据表ID"
    },
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
                  "dayofyear",
                  "dayofmonth",
                  "weekofyear",
                  "quarter",
                  "year",
                  "daytonow",
                  "weektonow",
                  "yeartonow",
                  "monthtonow",
                  "quartertonow",
                  "fmtday",
                  "fmtmonth",
                  "fmtquarter",
                  "fmtyear",
                  "fmtweek"
                ],
                "description": "特殊函数处理。重要规则：当字段为 Date 类型并使用 opt=eq 按“某一天”查询时，必须使用 func=fmtday，value 使用 yyyy-MM-dd 格式（例如 2025-05-15）。否则由于字段包含时分秒，将无法匹配到记录。"
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
    },
    "groupByList": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "字段ID（通过query_table_define获取）;如果是按照日期的聚合查询，格式为:分组字段ID$func,func有如下选择:day,month,quarter,year,week。例如按月分组查询则为:分组字段ID$month"
      },
      "description": "分组字段列表（与aggregationQueryList配合使用）"
    },
    "aggregationQueryList": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "func": {
            "type": "string",
            "enum": [
              "count",
              "avg",
              "sum",
              "max",
              "min"
            ],
            "description": "聚合函数类型"
          },
          "fieldId": {
            "type": "string",
            "description": "需要聚合的字段ID（通过query_table_define获取）"
          },
          "distinct": {
            "type": "boolean",
            "default": false,
            "description": "是否去重计算"
          }
        },
        "required": [
          "func",
          "fieldId"
        ]
      },
      "description": "聚合查询配置列表（如需要统计平均值、总数等时使用）"
    }
  },
  "required": [
    "tableId"
  ]
}
