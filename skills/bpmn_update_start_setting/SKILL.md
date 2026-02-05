# _bpmn_update_start_setting

## 技能ID
bpmn_update_start_setting

## 描述
更新工作流启动配置。

【表达式使用统一规则】
本工具中所有涉及“表达式”的字段（包括但不限于：instanceNameVar、draftNameVar、startVarList[].valueVar 以及未来新增的 *Expression / *Var 字段），在填写前 AI 必须先调用系统工具 `_read_informat_expression_doc` 阅读织信表达式规范。

若未调用该工具，不得生成任何表达式内容，必须先补充调用。

- 禁止使用 + 进行字符串拼接
- + 仅用于数值运算
- 所有字符串拼接必须使用 String.concat(...)。【重要约束】：1.当 enableStartForm=true 时，必须填写 formSetting 字段。
2.若启动表单中未配置 applicant 字段，则禁止使用 form.applicant,若需要获取流程发起人的姓名，应使用：User.user(initiator).name。

## 工具调用

### 思考
调用_bpmn_update_start_setting工具

### 工具名称
_bpmn_update_start_setting

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
    "instanceNameVar": {
      "type": "string",
      "description": "流程实例名称表达式。表达式中可使用流程变量（如 initiator）、系统函数以及启动表单变量 form，但仅限于在启动表单中已配置的字段。禁止引用不存在的 form 字段。"
    },
    "draftNameVar": {
      "type": "string",
      "description": "流程草稿名称表达式。表达式中可使用流程变量（如 initiator）、系统函数以及启动表单变量 form，但仅限于在启动表单中已配置的字段。禁止引用不存在的 form 字段。"
    },
    "enableStartForm": {
      "type": "boolean",
      "description": "是否在【发起流程时】要求用户填写启动表单。开启后，用户在点击“发起流程”时，需要先填写指定字段。"
    },
    "formSetting": {
      "type": "object",
      "description": "流程【启动表单】设置，用于定义在发起流程时，需要向用户展示并采集哪些业务字段的值。",
      "properties": {
        "tableId": {
          "type": "string",
          "description": "启动表单所绑定的数据表ID。发起流程时，用户填写的数据将写入该数据表中，作为流程的初始业务数据。"
        },
        "tableFieldSettingList": {
          "type": "array",
          "description": "启动表单字段配置列表，用于定义【发起流程时】用户需要填写或查看的字段。",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "数据表字段ID，用于指定在启动表单中展示的字段。若为关联表或子表字段，可使用“主字段ID-子字段ID”的形式，如 approvalRecord-name。"
              },
              "editable": {
                "type": "boolean",
                "description": "在【发起流程时】该字段是否允许用户输入或修改。false 表示只读展示，用于确认信息，不需要用户填写。"
              },
              "visible": {
                "type": "boolean",
                "description": "在【发起流程时】是否在启动表单中向用户展示该字段。false 表示该字段不会出现在启动页面。"
              }
            },
            "required": [
              "id",
              "editable",
              "visible"
            ]
          }
        }
      },
      "required": [
        "tableId",
        "tableFieldSettingList"
      ]
    },
    "startVarList": {
      "type": "array",
      "description": "流程启动变量列表。",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "变量名称。"
          },
          "valueVar": {
            "type": "string",
            "description": "变量值表达式。"
          }
        },
        "required": [
          "name",
          "valueVar"
        ]
      }
    }
  },
  "required": [
    "enableStartForm"
  ]
}
