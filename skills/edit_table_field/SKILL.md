# _edit_table_field

## 技能ID
edit_table_field

## 描述
编辑单个数据表字段。采用单字段编辑模式，允许针对不同字段类型配置其完整、专属的参数结构，适用于字段级的精细化调整与复杂关联定义。字段类型及相关配置必须严格遵守定义规则。必须使用真实存在的表ID和字段ID。调用前必须通过 _query_table_list_designer 和 _query_table_define_designer 获取真实结构;

【表达式统一使用规则】
本工具中凡属于【织信表达式字段】的参数（包括但不限于：editableExpression、visibleExpression、requiredExpression、defaultValueExpression、defaultValueRuleList[].expression、iDSetting.expression 以及所有以 *Expression 结尾的字段），在填写前 AI 必须先调用系统工具 `_read_informat_expression_doc` 阅读织信表达式规范。

若未调用该工具，不得生成任何表达式内容，必须先补充调用。

【表达式语法强约束】。如果需要在表达式里使用角色，先提前调用_query_app_define_designer获取应用里的角色列表。

【表达式上下文说明】
本接口中所有 *Expression 结尾的字段（包括但不限于 visibleExpression、editableExpression、defaultValueExpression、defaultValueRuleList.expression 等），均运行在统一的表达式上下文中，支持以下内置变量与函数：- user：当前登录用户对象
  - user.roleList：用户角色ID列表
  - user.departmentList：用户所属部门ID列表
- Date / Math / Array / String / Misc：系统内置工具函数

表达式需使用 ${ } 包裹，支持多行表达式、三元运算符（?:）、逻辑判断、函数调用及复杂计算。

## 工具调用

### 思考
调用_edit_table_field工具

### 工具名称
_edit_table_field

### 参数
{
  "type": "object",
  "properties": {
    "tableId": {
      "type": "string",
      "description": "数据表ID（必须真实存在）。"
    },
    "field": {
      "type": "object",
      "description": "单个字段配置（一次只允许操作一个字段）。",
      "properties": {
        "method": {
          "type": "string",
          "description": "操作方法：add=新增字段；edit=编辑字段；delete=删除字段",
          "enum": [
            "add",
            "edit",
            "delete"
          ]
        },
        "updateFieldList": {
          "type": "array",
          "description": "本次编辑操作中明确要修改的字段属性路径列表。支持字段级与对象内部属性级更新。仅在 method=edit 时生效，用于精确声明本次更新涉及的字段，避免因空值或缺省字段导致的误更新。",
          "items": {
            "type": "string",
            "pattern": "^[a-zA-Z][a-zA-Z0-9]*(\\.[a-zA-Z][a-zA-Z0-9]*)*$"
          },
          "examples": [
            [
              "name",
              "remark"
            ],
            [
              "readonly",
              "editableExpression"
            ],
            [
              "childrenSetting.nullable"
            ],
            [
              "integerSetting.min",
              "integerSetting.max"
            ],
            [
              "defaultValueRuleList"
            ]
          ]
        },
        "id": {
          "type": "string",
          "description": "字段ID（英文驼峰命名，必须真实存在；add 时为新字段ID）。"
        },
        "newId": {
          "type": "string",
          "description": "新字段ID，仅在 method=edit 时允许。"
        },
        "name": {
          "type": "string",
          "description": "字段中文名称。"
        },
        "type": {
          "type": "string",
          "description": "字段类型。字段类型说明：\n\n-Type 'ID' Used for business numbering (e.g. order number, asset number);Not a technical identifier;Value is auto-generated or managed by the system；- RelationRecord：外键字段，用于在当前表中引用另一张表的一条记录（存储目标记录ID）。\n- RelationRecordField：外键字段映射，通过 RelationRecord 外键字段，读取并展示目标表中的某个字段值（不存储数据）。\n\n使用规则：必须先定义 RelationRecord，才能定义依赖它的 RelationRecordField。\n\n- LookupList：查找列表，用于建模一对多（1:N）关系中的子表记录集合，必须通过 filter 显式指定关联条件。\n\n- LookupRollup：基于子表 RelationRecord 外键字段，对子表记录进行聚合统计，并将结果展示在主表中（标准 1:N 汇总方式）。\n\n- Relation：关联列表字段，用于表达弱关联或多对多关系。\n\n- RelationRollup：基于本表 Relation（关联列表）字段，对关联记录进行聚合统计，仅适用于方向明确的一对多 Relation；多对多 Relation 禁止使用 Rollup。",
          "enum": [
            "SingleText",
            "MultiText",
            "RichText",
            "Integer",
            "Double",
            "Date",
            "ListSelect",
            "Attachment",
            "Formula",
            "Checkbox",
            "Checkbox",
            "User",
            "Department",
            "Coordinate",
            "Relation",
            "RelationRecord",
            "RelationRecord",
            "RelationRecordField",
            "Children",
            "ID",
            "LookupList",
            "LookupRollup"
          ]
        },
        "icon": {
          "type": "string",
          "enum": [
            "text",
            "number-1",
            "checkbox-circle",
            "attachment",
            "check",
            "user",
            "map-2",
            "link",
            "node-tree",
            "hashtag"
          ]
        },
        "displayWidth": {
          "type": "integer",
          "enum": [
            25,
            50,
            75,
            100
          ],
          "default": 50,
          "description": "字段在表格中的显示宽度。可选值：25, 50, 75, 100。默认值为 50。对于 Children、LookupList、Relation、 RichText类型字段，推荐使用 100 其它类型字段推荐使用50。"
        },
        "remark": {
          "type": "string"
        },
        "readonly": {
          "type": "boolean",
          "description": "可以配置字段在表单中不可编辑,默认false，表示都可以编辑"
        },
        "editableExpression": {
          "type": "string",
          "description": "配置字段在表单中可以编辑的表达式，表达式可引用 当前表单记录(formRecord) / 当前用户user 等上下文对象及表达式函数。仅在readonly设置为true时有效。如果表达式执行结果为true，那么字段可以编辑。比如配置如下:${Array.containsAny(user.roleList,['admin'])},表示只有管理员可以编辑"
        },
        "hidden": {
          "type": "boolean",
          "description": "可以配置字段在表单中隐藏此字段,默认false，表示不隐藏"
        },
        "visibleExpression": {
          "type": "string",
          "description": "配置字段在表单中显示的表达式，表达式可引用 当前表单记录(formRecord) / 当前用户user 等上下文对象及表达式函数。仅在hidden设置为true时有效。如果表达式执行结果为true，那么字段可见。比如配置如下:${Array.containsAny(user.roleList,['admin'])},表示只有管理员可以看到此字段"
        },
        "requiredExpression": {
          "type": "string",
          "description": "字段必填条件表达式。当表达式返回 true 时，字段在表单中必须填写。表达式运行在统一上下文中，可引用 formRecord / user / 表达式函数。",
          "examples": [
            "${ record.type == 'purchase' }",
            "${ Array.containsAny(user.roleList, ['admin']) }",
            "${ formRecord.startDate != null }"
          ]
        },
        "defaultValueExpression": {
          "type": "string",
          "description": "字段的默认值表达式，仅在新建记录或字段为空时生效。 如1:${Math.ceil(Math.random()*10000)};如2:${Date.dateAdd(Date.sysdate(),'day_of_year',1)};如3:如3:${Array.of('o1','o3')}"
        },
        "defaultValueRuleList": {
          "type": "array",
          "description": "字段联动计算规则列表。当指定字段的值发生变化时，自动重新计算当前字段的值。",
          "items": {
            "type": "object",
            "properties": {
              "fieldId": {
                "type": "string",
                "description": "监听变化的字段ID。当该字段的值发生变化时，会触发当前字段的重新计算。"
              },
              "expression": {
                "type": "string",
                "description": "用于计算当前字段新值的表达式。支持 ${ } 包裹的多行表达式、三元运算符（?:）、逻辑判断及内置函数。表达式可引用 当前表单记录(record) / 当前用户user 等上下文对象及表达式函数，例如：${record.price * record.count}",
                "examples": [
                  "${ record.startDate == null || record.endDate == null ? 0 : Date.dateDiff(record.endDate, record.startDate) }"
                ]
              }
            },
            "required": [
              "fieldId",
              "expression"
            ]
          }
        },
        "enableChangeLog": {
          "type": "boolean",
          "description": "在修改时记录变更日志"
        },
        "listSelectSetting": {
          "type": "object",
          "properties": {
            "nullable": {
              "type": "boolean",
              "description": "是否可以为空。默认true"
            },
            "multiple": {
              "type": "boolean",
              "description": "是否可以多选。默认false"
            },
            "optionList": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "checked": {
                    "type": "boolean"
                  },
                  "color": {
                    "type": "string"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "color"
                ]
              }
            }
          },
          "required": [
            "nullable",
            "multiple",
            "optionList"
          ]
        },
        "attachmentSetting": {
          "type": "object",
          "description": "当 type 为 Attachment 时必填，用于定义附件.",
          "properties": {
            "nullable": {
              "type": "boolean"
            },
            "multiple": {
              "type": "boolean"
            },
            "acceptTypes": {
              "type": "string",
              "description": "只接受以下类型的文件类型后缀，如.png,.jpg等默认为空表示不限制文件类型"
            }
          },
          "required": [
            "nullable",
            "multiple"
          ]
        },
        "formulaSetting": {
          "type": "object",
          "description": "当 type 为 Formula 时必填。Formula 为【数据库计算字段】，其计算逻辑完全由 PostgreSQL 执行，而非织信表达式或前端表达式。\n\n重要说明（请严格遵守）：\n- formula 不是织信表达式，不支持 ${ }、if、三元运算符或任何织信内置函数\n- formula 必须是合法的 PostgreSQL 表达式（SELECT 子句级别）\n- 仅允许使用 PostgreSQL 内置函数、运算符以及 SQL 语法\n- 条件判断请使用 SQL 的 case when 语法，而不是 if\n【字段引用强约束规则】：\n- formula 仅允许引用【本表中实际存储到数据库的字段】作为计算元素\n- 严禁引用以下类型的字段：\n  1）关联记录字段（RelationRecord / RelationList 等）\n  2）非存储计算字段（如 Formula、Expression 类型字段）\n  3）来自其他数据表的字段（禁止跨表引用）\n- formula 中出现的字段名，必须在当前数据表中有对应的物理存储列\n\n适用场景：\n- 字符串拼接、数值计算、条件派生\n- 金额合计、状态计算、字段派生展示\n\n该字段的值由数据库在查询时动态计算，通常为只读字段.",
          "properties": {
            "formula": {
              "type": "string",
              "description": "PostgreSQL 计算表达式（非织信表达式）。\n\n规则说明：\n- 表达式需符合 PostgreSQL 13 语法规范\n- 可直接使用本表字段 ID 作为列名参与计算\n- 支持 PostgreSQL 内置函数与 SQL 表达式\n- 不支持 ${ }、if、?: 等织信表达式语法\n\n示例：\n- concat(name, '-', grade)\n- price * quantity\n- coalesce(actual_cost, 0) - coalesce(budget, 0)\n- case when progress >= 100 then '完成' else '进行中' end"
            }
          },
          "required": [
            "formula"
          ]
        },
        "checkboxSetting": {
          "type": "object",
          "description": "当 type 为 Checkbox 时必填，用于定义复选框.",
          "properties": {
            "defaultValue": {
              "type": "boolean",
              "description": "是否选中,默认值为false"
            }
          },
          "required": [
            "defaultValue"
          ]
        },
        "relationSetting": {
          "type": "object",
          "description": "关联列表（Relation），用于建模两个数据表之间的多对多（M:N）关系。系统会通过中间关联关系维护双方的映射。\n\n适用场景：\n- 一个记录可以关联多个目标记录\n- 一个目标记录也可以被多个当前记录关联\n\n典型示例：\n- 学生 ↔ 荣誉（一个学生可获得多个荣誉，一个荣誉可属于多个学生）\n- 用户 ↔ 角色（一个用户多个角色，一个角色多个用户）\n\n不适用场景：\n- 如果目标记录只能属于当前记录中的一个，请使用 LookupList。\n\n说明：\nRelation 字段本身不表示外键归属，而是表示一种对等的关联关系。",
          "properties": {
            "tableId": {
              "type": "string"
            }
          },
          "required": [
            "tableId"
          ]
        },
        "relationRollupSetting": {
          "type": "object",
          "description": "当 type 为 RelationRollup 时必填。RelationRollup 汇总字段定义：\n\n基于本表中的 Relation（关联列表）字段，对关联记录进行聚合统计，并将结果展示在当前表中。\n\n注意：\n- 仅适用于具备明确方向性的 Relation（建议用于一对多关系）\n- 多对多 Relation 不建议使用 Rollup。relationFieldId 所指向的 Relation 字段已包含目标表定义（relationSetting.tableId），RelationRollup 的目标表由 Relation 字段隐式确定，无需额外配置。",
          "properties": {
            "relationFieldId": {
              "type": "string",
              "description": "本表中的 Relation 类型字段ID（关联列表字段）。"
            },
            "func": {
              "type": "string",
              "description": "聚合计算方式。",
              "enum": [
                "count",
                "avg",
                "sum",
                "max",
                "min"
              ]
            },
            "rollupFieldId": {
              "type": "string",
              "description": "子表中参与聚合计算的字段ID（count 时可不填，其余必须）。。"
            }
          },
          "required": [
            "relationFieldId",
            "func"
          ]
        },
        "relationRecordSetting": {
          "type": "object",
          "properties": {
            "nullable": {
              "type": "boolean",
              "description": "是否可以为空。默认true"
            },
            "tableId": {
              "type": "string"
            },
            "nameFieldId": {
              "type": "string"
            }
          },
          "required": [
            "nullable",
            "tableId",
            "nameFieldId"
          ]
        },
        "relationRecordFieldSetting": {
          "type": "object",
          "properties": {
            "fieldId": {
              "type": "string"
            },
            "targetTableId": {
              "type": "string"
            },
            "targetFieldId": {
              "type": "string"
            }
          },
          "required": [
            "fieldId",
            "targetTableId",
            "targetFieldId"
          ]
        },
        "lookupListSetting": {
          "type": "object",
          "description": "查找列表（LookupList），用于建模一对多（1:N）关系中的子表记录列表。\n\n重要说明：\n- LookupList 默认不会自动建立主子表关联。\n- 必须通过 filter 明确指定子表记录与当前主表记录之间的关联条件。\n- 如果不配置 filter，将返回目标表的全部记录，这在一对多关系建模中通常是错误的用法。\n\n典型用法：\n通过 filter.conditionList 使用子表外键字段等于当前主表记录 ID（${record.id}），只返回属于当前记录的子表数据。",
          "properties": {
            "tableId": {
              "type": "string",
              "description": "子表ID（真实存在）。"
            },
            "filter": {
              "type": "object",
              "description": "用于限定子表记录范围的过滤条件。通常用于建立子表外键与当前主表记录之间的关联。系统不会自动推断外键字段，必须显式配置。",
              "properties": {
                "conditionList": {
                  "type": "array",
                  "examples": [
                    [
                      {
                        "fieldId": "projectId",
                        "opt": "eq",
                        "var": true,
                        "value": "${record.id}"
                      }
                    ]
                  ],
                  "items": {
                    "type": "object",
                    "properties": {
                      "fieldId": {
                        "type": "string",
                        "description": "通常是子表中的外键字段ID"
                      },
                      "opt": {
                        "type": "string",
                        "description": "比较运算符，可选值为: eq, ne, gt, ge, lt, le, contains, notcontains, startswith, endswith, isnull, isnotnull, in, notin, between, notbetween, parenteq, parentrooteq, parentcontains, multipleandquery, multipleorquery, intree。不得使用未定义操作符。"
                      },
                      "var": {
                        "type": "boolean",
                        "description": "比较值是否是表达式,默认为true"
                      },
                      "value": {
                        "type": "string",
                        "description": "比较值，通常使用 ${record.id} 引用当前主表记录"
                      }
                    },
                    "required": [
                      "fieldId",
                      "opt",
                      "var",
                      "value"
                    ]
                  }
                }
              },
              "required": [
                "conditionList"
              ]
            }
          },
          "required": [
            "tableId",
            "filter"
          ]
        },
        "lookupRollupSetting": {
          "type": "object",
          "description": "当 type 为 LookupRollup 时必填。LookupRollup 汇总字段定义：\n\n用于对一对多（1:N）子表记录进行聚合统计，并将结果展示在主表中。\n\n工作方式：\n- 基于子表中的 RelationRecord 外键字段，关联到当前主表记录\n- 对符合条件的子表记录执行聚合计算\n\n注意：\n- count 不需要 rollupFieldId\n- sum / avg / max / min 必须指定 rollupFieldId",
          "properties": {
            "tableId": {
              "type": "string",
              "description": "子表ID"
            },
            "relationRecordFieldId": {
              "type": "string",
              "description": "子表中指向当前主表的 RelationRecord 外键字段ID（注意：不是 RelationRecordField）。"
            },
            "func": {
              "type": "string",
              "description": "聚合计算方式。",
              "enum": [
                "count",
                "avg",
                "sum",
                "max",
                "min"
              ]
            },
            "rollupFieldId": {
              "type": "string",
              "description": "子表的汇总字段。当汇总方式为求和、最大值、最小值、平均值时此字段必填。"
            }
          },
          "required": [
            "tableId",
            "relationRecordFieldId",
            "func"
          ]
        },
        "childrenSetting": {
          "type": "object",
          "description": "当 type 为 Children 时必填。仅用于在【同一张表内】构建父子层级（树形结构），主要用于组织架构 / 分类树等场景。",
          "properties": {
            "nullable": {
              "type": "boolean",
              "description": "是否可以为空。默认true"
            },
            "nameFieldId": {
              "type": "string"
            }
          },
          "required": [
            "nullable",
            "nameFieldId"
          ]
        },
        "userSetting": {
          "type": "object",
          "properties": {
            "nullable": {
              "type": "boolean"
            },
            "multiple": {
              "type": "boolean"
            }
          },
          "required": [
            "nullable",
            "multiple"
          ]
        },
        "departmentSetting": {
          "type": "object",
          "properties": {
            "nullable": {
              "type": "boolean"
            },
            "multiple": {
              "type": "boolean"
            }
          },
          "required": [
            "nullable",
            "multiple"
          ]
        },
        "dateSetting": {
          "type": "object",
          "properties": {
            "nullable": {
              "type": "boolean"
            }
          },
          "required": [
            "nullable"
          ]
        },
        "integerSetting": {
          "type": "object",
          "properties": {
            "nullable": {
              "type": "boolean"
            },
            "enableRange": {
              "type": "boolean"
            },
            "min": {
              "type": "integer"
            },
            "max": {
              "type": "integer"
            }
          },
          "required": [
            "nullable"
          ]
        },
        "doubleSetting": {
          "type": "object",
          "properties": {
            "nullable": {
              "type": "boolean"
            },
            "enableRange": {
              "type": "boolean"
            },
            "min": {
              "type": "integer"
            },
            "max": {
              "type": "integer"
            }
          },
          "required": [
            "nullable"
          ]
        },
        "singleTextSetting": {
          "type": "object",
          "properties": {
            "nullable": {
              "type": "boolean"
            },
            "placeholder": {
              "type": "string"
            }
          },
          "required": [
            "nullable",
            "placeholder"
          ]
        },
        "iDSetting": {
          "type": "object",
          "description": "当 type 为 ID 时必填，用于定义编号字段。",
          "properties": {
            "expression": {
              "type": "string",
              "description": "编号计算表达式，可以使用seq作为一个自增序列的变量，seq是数据库自增序列。如你希望编号是带日期的递增6位数字，如2024-07-19-000001 那么可以用如下表达式:${Misc.formatDate(Date.sysdate(),'yyyy-MM-dd')}-${String.lpad(seq,4,'0')}"
            },
            "resetType": {
              "type": "string",
              "enum": [
                "day",
                "month",
                "year"
              ],
              "description": "自动重置seq序列的方式，day表示每天零点；month表示每月1号零点；year表示1月1号零点"
            }
          },
          "required": [
            "expression"
          ]
        }
      },
      "required": [
        "method",
        "id"
      ],
      "allOf": [
        {
          "if": {
            "properties": {
              "method": {
                "const": "add"
              }
            }
          },
          "then": {
            "required": [
              "name",
              "type",
              "icon"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "method": {
                "const": "edit"
              }
            }
          },
          "then": {
            "required": [
              "updateFieldList"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "ListSelect"
              }
            }
          },
          "then": {
            "required": [
              "listSelectSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Attachment"
              }
            }
          },
          "then": {
            "required": [
              "attachmentSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Formula"
              }
            }
          },
          "then": {
            "required": [
              "formulaSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Checkbox"
              }
            }
          },
          "then": {
            "required": [
              "checkboxSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Relation"
              }
            }
          },
          "then": {
            "required": [
              "relationSetting"
            ],
            "properties": {
              "displayWidth": {
                "const": 100
              }
            }
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "RelationRollup"
              }
            }
          },
          "then": {
            "required": [
              "relationRollupSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "RelationRecord"
              }
            }
          },
          "then": {
            "required": [
              "relationRecordSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "RelationRecordField"
              }
            }
          },
          "then": {
            "required": [
              "relationRecordFieldSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "LookupList"
              }
            }
          },
          "then": {
            "required": [
              "lookupListSetting"
            ],
            "properties": {
              "displayWidth": {
                "const": 100
              }
            }
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "LookupRollup"
              }
            }
          },
          "then": {
            "required": [
              "lookupRollupSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Children"
              }
            }
          },
          "then": {
            "required": [
              "childrenSetting"
            ],
            "properties": {
              "displayWidth": {
                "const": 100
              }
            }
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "User"
              }
            }
          },
          "then": {
            "required": [
              "userSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Department"
              }
            }
          },
          "then": {
            "required": [
              "departmentSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Date"
              }
            }
          },
          "then": {
            "required": [
              "dateSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Integer"
              }
            }
          },
          "then": {
            "required": [
              "integerSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "Double"
              }
            }
          },
          "then": {
            "required": [
              "doubleSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "SingleText"
              }
            }
          },
          "then": {
            "required": [
              "singleTextSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "MultiText"
              }
            }
          },
          "then": {
            "required": [
              "multiTextSetting"
            ]
          }
        },
        {
          "if": {
            "properties": {
              "type": {
                "const": "RichText"
              }
            }
          },
          "then": {
            "required": [
              "richTextSetting"
            ],
            "properties": {
              "displayWidth": {
                "const": 100
              }
            }
          }
        }
      ]
    }
  },
  "required": [
    "tableId",
    "field"
  ]
}
