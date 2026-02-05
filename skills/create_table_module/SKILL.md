# _create_table_module

## 技能ID
create_table_module

## 描述
创建新的数据表。必须提供表ID、表名称及字段配置列表。字段类型及相关配置必须严格遵守定义规则，不得编造不存在的类型、字段或表ID。

## 工具调用

### 思考
调用_create_table_module工具

### 工具名称
_create_table_module

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "数据表ID（使用驼峰命名，且在系统内唯一，不得与现有表重复）。"
    },
    "name": {
      "type": "string",
      "description": "数据表的中文名称。"
    },
    "parentId": {
      "type": "string",
      "description": "模块分组ID，工具_query_app_define_designer可以获取到模块分组定义列表"
    },
    "fieldGroups": {
      "type": "array",
      "items": {
        "type": "object",
        "description": "字段分组配置。",
        "properties": {
          "id": {
            "type": "string",
            "description": "分组id（英文全小写, 字母开头，10位随机字母。下面字段列表group字段存储的就是这个分组id"
          }
        }
      }
    },
    "fields": {
      "type": "array",
      "items": {
        "type": "object",
        "description": "字段配置。当 type 为特定类型时，必须包含对应的设置字段（例如 type=RelationRecord 时需包含 relationRecordSetting）。不得使用未定义的字段类型或属性。",
        "properties": {
          "id": {
            "type": "string",
            "description": "字段标识符（英文驼峰命名，不得使用JavaScript/Java保留字，如 id、class、function 等）。"
          },
          "name": {
            "type": "string",
            "description": "字段的中文显示名称。"
          },
          "type": {
            "type": "string",
            "description": "字段类型。【强约束】字段类型只能取 enum 中的值，严禁使用 Text、Number、Member、SingleSelect、LongText 等任何未列出的类型，否则为严重错误。字段类型说明：\n\n-Type 'ID' Used for business numbering (e.g. order number, asset number);Not a technical identifier;Value is auto-generated or managed by the system；- RelationRecord：外键字段，用于在当前表中引用另一张表的一条记录（存储目标记录ID）。\n- RelationRecordField：外键字段映射，通过 RelationRecord 外键字段，读取并展示目标表中的某个字段值（不存储数据）。\n\n使用规则：必须先定义 RelationRecord，才能定义依赖它的 RelationRecordField。特殊类型说明（重点）：\n\n- Children：\n  【结构型字段】仅用于在【同一张表内】构建树形/层级结构（Parent → Children）。\n  典型场景：组织架构、部门树、分类树、行政区划。\n  ⚠️ Children 不表示业务关系，不等同于主子表，不可跨表，不存储业务数据。\n\n- LookupList：查找列表，用于建模一对多（1:N）关系中的子表记录集合，必须通过 filter 显式指定关联条件。\n\n- LookupRollup：基于子表 RelationRecord 外键字段，对子表记录进行聚合统计，并将结果展示在主表中（标准 1:N 汇总方式）。\n\n- Relation：关联列表字段，用于表达弱关联或多对多关系。\n\n- RelationRollup：基于本表 Relation（关联列表）字段，对关联记录进行聚合统计，仅适用于方向明确的一对多 Relation；多对多 Relation 禁止使用 Rollup。",
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
              "User",
              "Department",
              "Coordinate",
              "Relation",
              "RelationRollup",
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
            "description": "字段图标标识。仅可使用以下值，不得编造其他图标：text, number-1, checkbox-circle, attachment, check, user, map-2, link, node-tree, hashtag。",
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
            "type": "string",
            "description": "字段备注说明，可选。"
          },
          "group": {
            "type": "string",
            "description": "分组ID。fieldGroups里的值，group可以为空就是默认分组"
          },
          "listSelectSetting": {
            "type": "object",
            "description": "当 type 为 ListSelect 时必填，用于定义选项列表。仅在 type=ListSelect 时使用，不得用于其他类型。",
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
                      "type": "string",
                      "description": "选项ID（英文驼峰命名，不得使用系统保留字）。"
                    },
                    "name": {
                      "type": "string",
                      "description": "选项的显示名称。"
                    },
                    "checked": {
                      "type": "boolean",
                      "description": "是否为默认选中项。"
                    },
                    "color": {
                      "type": "string",
                      "description": "颜色，如#5B8FF9,#57CA8C,#5D7092,#FAAD14,#E86452,#56C1EC,#945FB9,#FF9845等等，可以自己设计不同的颜色"
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
            "description": "当 type 为 Formula 时必填。Formula 为【数据库计算字段】，其计算逻辑完全由 PostgreSQL 执行，而非织信表达式或前端表达式。\n\n重要说明（请严格遵守）：\n- formula 不是织信表达式，不支持 ${ }、if、三元运算符或任何织信内置函数\n- formula 必须是合法的 PostgreSQL 表达式（SELECT 子句级别）\n- 仅允许使用 PostgreSQL 内置函数、运算符以及 SQL 语法\n- 条件判断请使用 SQL 的 case when 语法，而不是 if\n\n适用场景：\n- 字符串拼接、数值计算、条件派生\n- 金额合计、状态计算、字段派生展示\n\n该字段的值由数据库在查询时动态计算，通常为只读字段.",
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
            "description": "当 type 为 Relation 时必填，用于定义关联列表。仅在 type=Relation 时使用，不得用于其他类型。",
            "properties": {
              "tableId": {
                "type": "string",
                "description": "关联目标表ID（必须真实存在）。"
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
            "description": "当 type 为 RelationRecord 时必填。必须使用真实存在的表ID（通过 _query_table_list_designer 获取）和字段ID，不得编造。RelationRecord 外键定义：\n\n用于在当前表中建立对另一张表记录的引用关系，是 RelationRecordField 的唯一依赖来源。",
            "properties": {
              "nullable": {
                "type": "boolean",
                "description": "是否可以为空。默认true"
              },
              "tableId": {
                "type": "string",
                "description": "关联目标表ID（必须真实存在）。"
              },
              "nameFieldId": {
                "type": "string",
                "description": "目标表中用于显示名称的字段ID（必须真实存在）。"
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
            "description": "当 type 为 RelationRecordField 时必填。必须引用真实存在的表和字段，不得编造。RelationRecordField 外键字段映射定义：\n\n通过 RelationRecord 外键字段，从目标表中派生并展示某个字段值。\n\n特性：\n• 不存储数据\n• 强依赖 RelationRecord\n• 通常为只读字段",
            "properties": {
              "fieldId": {
                "type": "string",
                "description": "本表中 RelationRecord 外键字段的 ID。"
              },
              "targetTableId": {
                "type": "string",
                "description": "目标表ID（应与 RelationRecord 指向的表一致）。"
              },
              "targetFieldId": {
                "type": "string",
                "description": "目标表中被派生展示的字段ID。"
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
            "description": "当 type 为 LookupList 时必填。tableId 和 filter 中的字段ID必须真实存在，不得编造。查找列表（LookupList），用于建模一对多（1:N）关系中的子表记录列表。\n\n重要说明：\n- LookupList 默认不会自动建立主子表关联。\n- 必须通过 filter 明确指定子表记录与当前主表记录之间的关联条件。\n- 如果不配置 filter，将返回目标表的全部记录，这在一对多关系建模中通常是错误的用法。\n\n典型用法：\n通过 filter.conditionList 使用子表外键字段等于当前主表记录 ID（${record.id}），只返回属于当前记录的子表数据。",
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
                          "description": "比较运算符，可选值为:：eq, ne, gt, ge, lt, le, contains, notcontains, startswith, endswith, isnull, isnotnull, in, notin, between, notbetween, parenteq, parentrooteq, parentcontains, multipleandquery, multipleorquery, intree。不得使用未定义操作符。"
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
                "type": "string",
                "description": "用于显示名称的字段ID（通常为 SingleText 类型字段）。"
              }
            },
            "required": [
              "nullable",
              "nameFieldId"
            ]
          },
          "userSetting": {
            "type": "object",
            "description": "当 type 为 User 时必填，用于定义用户选择",
            "properties": {
              "nullable": {
                "type": "boolean",
                "description": "是否可以为空。默认true"
              },
              "multiple": {
                "type": "boolean",
                "description": "是否支持多选。默认false"
              }
            },
            "required": [
              "nullable",
              "multiple"
            ]
          },
          "departmentSetting": {
            "type": "object",
            "description": "当 type 为 Department 时必填，用于定义部门选择",
            "properties": {
              "nullable": {
                "type": "boolean",
                "description": "是否可以为空。默认true"
              },
              "multiple": {
                "type": "boolean",
                "description": "是否支持多选。默认false"
              }
            },
            "required": [
              "nullable",
              "multiple"
            ]
          },
          "dateSetting": {
            "type": "object",
            "description": "当 type 为 Date 时必填，用于定义日期",
            "properties": {
              "nullable": {
                "type": "boolean",
                "description": "是否可以为空。默认true"
              }
            },
            "required": [
              "nullable"
            ]
          },
          "integerSetting": {
            "type": "object",
            "description": "当 type 为 Integer 时必填，用于定义整数",
            "properties": {
              "nullable": {
                "type": "boolean",
                "description": "是否可以为空。默认true"
              },
              "enableRange": {
                "type": "boolean",
                "description": "是否限定取值范围"
              },
              "min": {
                "type": "integer",
                "description": "最小值,仅在enableRange为true是有效"
              },
              "max": {
                "type": "integer",
                "description": "最大值,仅在enableRange为true是有效"
              }
            },
            "required": [
              "nullable"
            ]
          },
          "doubleSetting": {
            "type": "object",
            "description": "当 type 为 Double 时必填，用于定义小数",
            "properties": {
              "nullable": {
                "type": "boolean",
                "description": "是否可以为空。默认true"
              },
              "enableRange": {
                "type": "boolean",
                "description": "是否限定取值范围"
              },
              "min": {
                "type": "integer",
                "description": "最小值,仅在enableRange为true是有效"
              },
              "max": {
                "type": "integer",
                "description": "最大值,仅在enableRange为true是有效"
              }
            },
            "required": [
              "nullable"
            ]
          },
          "singleTextSetting": {
            "type": "object",
            "description": "当 type 为 SingleText 时必填，用于定义单行文本",
            "properties": {
              "nullable": {
                "type": "boolean",
                "description": "是否可以为空。默认true"
              },
              "placeholder": {
                "type": "string",
                "description": "未填写时在表单中的占位符"
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
          "id",
          "name",
          "type",
          "icon"
        ],
        "allOf": [
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
              ]
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
              ]
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
              ]
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
                  "const": "ID"
                }
              }
            },
            "then": {
              "required": [
                "iDSetting"
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
    }
  },
  "required": [
    "id",
    "name",
    "fields"
  ]
}
