# _bpmn_create_or_update_node

## 技能ID
bpmn_create_or_update_node

## 描述
创建或更新工作流中某个工作流节点的详细配置。包括名称、说明、审批人、多实例及 AI 任务设置。

【表达式统一使用规则】
本工具中凡属于【表达式字段】的参数（包括：assignee、multiInstanceLoopCharacteristics.collection、multiInstanceLoopCharacteristics.completionCondition、taskSetting.completeSetVarList[].expression、taskSetting.autoCompleteExpression 以及所有以 *Expression / *Var 命名的字段），在填写前 AI 必须先调用系统工具 `_read_informat_expression_doc` 阅读织信表达式规范。

若未调用该工具，不得生成任何表达式内容，必须先补充调用。

所有表达式必须符合织信表达式 DSL 规范，禁止使用 JavaScript / SQL / Java / 伪代码 风格。

【全局一致性强约束（必须遵守）】
- 所有 UserTask 节点中 taskSetting.formSetting.tableId，必须与流程启动配置工具 `_bpmn_update_start_setting` 中配置的启动表单 tableId 完全一致。
- 启动表单定义的是流程实例的主业务数据表，所有审批节点只能操作该表单数据。
- 不允许在任意 UserTask 中切换或使用其他数据表作为 formSetting.tableId。
- 若违反该规则，将导致表单上下文（form）失效，流程定义视为非法，应在设计期直接阻止。
- 不用创建开始节点，系统自带开始节点。

## 工具调用

### 思考
调用_bpmn_create_or_update_node工具

### 工具名称
_bpmn_create_or_update_node

### 参数
{
  "type": "object",
  "properties": {
    "moduleId": {
      "type": "string",
      "description": "工作流模块ID。"
    },
    "processDefineId": {
      "type": "string",
      "description": "工作流流程定义ID。"
    },
    "node": {
      "type": "object",
      "description": "需要创建或更新的节点详细信息。",
      "properties": {
        "id": {
          "type": "string",
          "description": "节点ID，需符合规范，如 UserTask_Approve_1。",
          "pattern": "^(EndEvent|UserTask|ServiceTask|Task)_[A-Za-z][A-Za-z0-9_]{0,39}$"
        },
        "type": {
          "type": "string",
          "description": "BPMN 节点类型（创建新节点时必填，更新节点时可省略；一旦创建后不可修改）",
          "enum": [
            "endEvent",
            "userTask",
            "task"
          ]
        },
        "name": {
          "type": "string",
          "description": "节点名称，对应 BPMN 的 name 属性。"
        },
        "documentation": {
          "type": "string",
          "description": "节点说明文字，对应 BPMN 的 <documentation> 内容。"
        },
        "assignee": {
          "type": "string",
          "description": "审批人表达式（仅对 UserTask 节点生效;gateway / event 节点不支持），对应 flowable:assignee 属性，如：${initiator}。assignee 字段仅用于【单个审批人】场景，其表达式必须满足：1. 表达式执行结果类型：String（单个用户ID）2. 严禁返回： Array / List /多个用户ID。可以这样使用${Array.first(User.superiorUsers(initiator))}。3.如需用到数组，不能使用数组字面量，而是必须使用 Array.of 构造数组。\n\n❌ 错误示例（一定会报错）：\n${Array.first(User.usersWithRole(['researcher']))}\n\n✅ 正确示例：\n${Array.first(User.usersWithRole(Array.of('researcher')))}"
        },
        "multiInstanceLoopCharacteristics": {
          "type": "object",
          "description": "多实例（会签/或签）配置。",
          "properties": {
            "collection": {
              "type": "string",
              "description": "集合表达式，对应 flowable:collection，如：${User.superiorUsers(initiator)}。"
            },
            "elementVariable": {
              "type": "string",
              "description": "集合元素变量名，对应 flowable:elementVariable，如：superiorUsers。"
            },
            "completionCondition": {
              "type": "string",
              "description": "多实例完成条件表达式（Flowable tFormalExpression）。用于控制会签 / 或签何时结束。表达式中可直接使用 nrOfInstances、nrOfCompletedInstances、nrOfActiveInstances、initiator、form 等变量。或签：当任意一个实例完成即可结束，推荐表达式:${nrOfCompletedInstances > 0};会签：当所有实例完成后才结束，推荐表达式:${nrOfCompletedInstances == nrOfInstances}",
              "examples": [
                "${nrOfCompletedInstances > 0}",
                "${nrOfCompletedInstances == nrOfInstances}",
                "${nrOfCompletedInstances / nrOfInstances >= 0.5}"
              ]
            }
          },
          "additionalProperties": false
        },
        "taskSetting": {
          "type": "object",
          "description": "AI 任务设置（BpmnTaskSettingAi）。",
          "properties": {
            "userAction": {
              "type": "string",
              "description": "用户操作类型，例如：approve、reject、confirm 等。"
            },
            "completeAutomaticId": {
              "type": "string",
              "description": "自动完成配置ID，用于关联 AutomaticSetting。"
            },
            "automaticSetting": {
              "type": "object",
              "description": "自动化执行配置（AutomaticSetting）。",
              "properties": {
                "type": {
                  "type": "string",
                  "description": "自动执行类型。"
                },
                "config": {
                  "type": "object",
                  "description": "自动执行的具体配置参数。",
                  "additionalProperties": false
                }
              },
              "additionalProperties": false
            },
            "formSetting": {
              "type": "object",
              "description": "表单相关配置（BpmnFormSettingAi）。",
              "properties": {
                "tableId": {
                  "type": "string",
                  "description": "绑定的数据表ID（必须与流程启动表单 tableId 完全一致）"
                },
                "tableFieldSettingList": {
                  "type": "array",
                  "description": "当前【用户任务节点（UserTask）】中，审批人可查看与可编辑的数据表字段配置列表，用于定义该审批节点的操作表单。",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "数据表字段ID，表示在当前审批节点中展示给审批人的字段。若为关联表或子表字段，可使用“主字段ID-子字段ID”的形式，如 approvalRecord-name。"
                      },
                      "editable": {
                        "type": "boolean",
                        "description": "审批人在【当前节点】是否可以编辑该字段。true 表示可编辑；false 表示只读（仅用于查看或确认信息）。"
                      },
                      "visible": {
                        "type": "boolean",
                        "description": "该字段是否在【当前审批节点】的表单中对审批人可见。false 表示该字段在该节点完全隐藏。"
                      }
                    },
                    "required": [
                      "id",
                      "editable",
                      "visible"
                    ]
                  }
                },
                "toolBarButtonList": {
                  "type": "array",
                  "description": "当前【用户任务节点（UserTask）】中，审批人可见并可执行的操作按钮列表，如“同意”“驳回”“退回修改”等。",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "按钮ID，仅允许英文小写字母，固定10位，随机生成，需在当前节点内唯一",
                        "pattern": "^[a-z]{10}$"
                      },
                      "name": {
                        "type": "string",
                        "description": "按钮名称"
                      },
                      "action": {
                        "type": "string",
                        "description": "按钮触发的流程操作类型，用于定义点击该按钮后对当前任务执行的工作流引擎级行为。对于【同意 / 通过 / 确认】等正向流转操作请使用TaskComplete，而【驳回 / 退回修改 / 打回】等否决类操作请使用TaskMoveToActivity",
                        "enum": [
                          "TaskComplete",
                          "TaskMoveToActivity"
                        ]
                      },
                      "actionSetting": {
                        "type": "object",
                        "description": "按钮触发的流程操作类型，用于定义点击该按钮后对当前任务执行的工作流引擎级行为。TaskComplete 表示完成当前任务并按流程定义继续流转；TaskMoveToActivity 表示强制将流程实例从当前任务跳转到指定的目标节点，常用于驳回或退回场景。",
                        "properties": {
                          "enableComment": {
                            "type": "boolean",
                            "description": "是否启用审批意见输入。\n\n【使用建议】\n- 一般情况下，仅在【驳回 / 退回修改 / 打回】等否决类操作按钮中，将 enableComment 设置为 true。\n- 对于【同意 / 通过 / 确认】等正向流转操作，通常不需要填写审批意见，建议设置为 false。\n\n【典型示例】\n- 同意 / 通过：enableComment = false\n- 驳回 / 退回修改：enableComment = true"
                          },
                          "bpmnModuleId": {
                            "type": "string",
                            "description": "所属 BPMN 模块ID，用于在执行按钮动作时定位流程上下文。"
                          },
                          "taskIdExpression": {
                            "type": "string",
                            "description": "任务ID表达式，用于动态定位当前 Flowable 任务，如：${task.id}。"
                          },
                          "tableId": {
                            "type": "string",
                            "description": "关联的表单数据表ID，用于在按钮动作中读写业务数据。"
                          },
                          "activityId": {
                            "type": "string",
                            "description": "跳转到的节点ID。当action='TaskMoveToActivity'时必填。节点ID格式如：UserTask_HrApprove，EndEvent_Complete等"
                          }
                        },
                        "required": [
                          "enableComment",
                          "bpmnModuleId",
                          "taskIdExpression",
                          "tableId"
                        ],
                        "additionalProperties": false
                      }
                    },
                    "required": [
                      "id",
                      "name",
                      "action",
                      "actionSetting"
                    ]
                  }
                },
                "completeSetVarList": {
                  "type": "array",
                  "description": "当前【用户任务节点（UserTask）】完成任务后，需要自动写入或更新的表单字段赋值规则列表。用于在任务完成时，根据审批结果或流程上下文，统一更新业务数据状态。。",
                  "items": {
                    "type": "object",
                    "properties": {
                      "fieldId": {
                        "type": "string",
                        "description": "需要被设置新值的数据表字段ID。"
                      },
                      "expression": {
                        "type": "string",
                        "description": "字段新值的计算表达式。表达式中可直接使用 processId、instanceId、initiator、form 等流程与表单上下文变量，其中 form 表示当前任务节点对应的表单数据。"
                      }
                    },
                    "required": [
                      "fieldId",
                      "expression"
                    ]
                  }
                }
              },
              "required": [
                "tableId",
                "tableFieldSettingList",
                "toolBarButtonList"
              ],
              "additionalProperties": false
            },
            "enableAutocomplete": {
              "type": "boolean",
              "description": "是否启用任务自动完成。"
            },
            "autocompleteNodeIds": {
              "type": "array",
              "description": "当这些节点的审批人与当前节点相同时，自动完成当前任务。",
              "items": {
                "type": "string"
              }
            },
            "noAssigneeHandleType": {
              "type": "string",
              "description": "无审批人时的处理方式，如：autoComplete、skip、error。"
            },
            "autoCompleteExpression": {
              "type": "string",
              "description": "满足该表达式时自动完成任务，如：${amount < 1000}。"
            }
          },
          "additionalProperties": false
        }
      },
      "allOf": [
        {
          "if": {
            "properties": {
              "type": {
                "const": "userTask"
              }
            }
          },
          "then": {
            "required": [
              "taskSetting"
            ],
            "properties": {
              "taskSetting": {
                "required": [
                  "formSetting"
                ]
              }
            }
          }
        }
      ],
      "required": [
        "id"
      ],
      "additionalProperties": false
    }
  },
  "required": [
    "moduleId",
    "processDefineId",
    "node"
  ],
  "additionalProperties": false
}
