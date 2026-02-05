# _query_table_record_list

## 技能ID
query_table_record_list

## 描述
按条件查询数据表记录。支持筛选、分页、排序、分组和聚合操作询。字段ID是指调用query_table_define得到的fieldList里每个field的id属性，以下涉及到fieldId的地方全是字段ID。返回的数据表记录的key也是字段ID

## 工具调用

### 思考
调用_query_table_record_list工具

### 工具名称
_query_table_record_list

### 参数
{
  "type": "object",
  "properties": {
    "excludeFields": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "需要排除返回的字段ID列表",
      "example": [
        "created_by",
        "updated_time"
      ]
    },
    "includeFields": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "仅查询并返回 includeFields 中指定的字段；如果未提供 includeFields，则默认查询并返回所有字段。",
      "example": [
        "name",
        "age"
      ]
    },
    "tableId": {
      "type": "string",
      "description": "通过query_all_table_list接口获取的数据表ID"
    },
    "pageIndex": {
      "type": "integer",
      "description": "页码，从1开始",
      "default": 1
    },
    "pageSize": {
      "type": "integer",
      "description": "每页记录数。重要规则：当未指定 filter 且未指定 aggregationQueryList 时，pageSize 最大为 1000",
      "default": 1000
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
                ],
                "description": "操作符类型说明：基础比较：eq=等于(精确匹配值，不适用列表字段), ne=不等于(排除值,不适用列表字段), gt=大于(数值/日期), ge=大于等于(数值/日期), lt=小于(数值/日期), le=小于等于(数值/日期); 字符串集合匹配：contains=包含子串(模糊搜索;列表包含), notcontains=不包含子串(排除关键词,列表不包含), startswith=以指定字符串开头(前缀匹配), endswith=以指定字符串结尾(后缀匹配); 空值判断：isnull=字段为空(缺失数据), isnotnull=字段非空(有效数据); 集合操作：in=值在集合内(多选匹配), notin=值不在集合内(排除多选); 范围判断：between=值在区间内(范围查询), notbetween=值在区间外(范围排除); 树形结构：parentrooteq=根节点匹配(直属根节点), parenteq=父节点匹配(指定父节点), parentcontains=父节点路径包含(树形路径), intree=在子树中(所有子节点)"
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
                "description": "根据操作符类型动态变化的值,如果字段类型是Cascader,那么值应该是一个数组如[\"浙江省\",\"杭州市\"]"
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
            "conditionList": {
              "$ref": "#/properties/filter/properties/conditionList"
            },
            "children": {
              "$ref": "#/properties/filter/properties/children"
            }
          }
        }
      }
    },
    "orderByList": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "description": "不按照聚合值排序时为字段ID；而在聚合查询(count,sum,max,min,avg)时，比如按照薪资求和排序 field应该为:字段ID_sum"
          },
          "type": {
            "type": "string",
            "enum": [
              "asc",
              "desc"
            ],
            "default": "asc",
            "description": "排序类型"
          }
        },
        "required": [
          "field",
          "type"
        ]
      },
      "description": "支持多字段排序，优先级按数组顺序"
    },
    "groupByList": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "分组字段ID（通过query_table_define获取）;如果是按照日期的聚合查询，格式为:分组字段ID$func,func有如下选择:day,month,quarter,year,week。例如按月分组查询则为:分组字段ID$month"
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
  ],
  "allOf": [
    {
      "if": {
        "not": {
          "anyOf": [
            {
              "required": [
                "filter"
              ]
            },
            {
              "required": [
                "aggregationQueryList"
              ]
            }
          ]
        }
      },
      "then": {
        "properties": {
          "pageSize": {
            "type": "integer",
            "maximum": 1000
          }
        }
      }
    }
  ]
}
