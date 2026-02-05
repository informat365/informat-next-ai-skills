# _bpmn_create_or_update_flow

## 技能ID
bpmn_create_or_update_flow

## 描述
创建或更新工作流中某一条流转线（SequenceFlow）的详细配置。包括名称、起止节点、条件表达式及说明。【流程拓扑最低保障规则】
- 每个流程必须至少包含一条从【开始节点（StartEvent）】出发的流转线。
- 若流程中存在 StartEvent 但尚未配置任何 outgoing 的 SequenceFlow，AI 必须优先创建一条从 StartEvent 指向第一个业务节点或网关的流转线。
- 禁止生成“有开始节点但无连线”的流程结构。
- 本规则为流程结构级强约束，优先级高于业务规则。

## 工具调用

### 思考
调用_bpmn_create_or_update_flow工具

### 工具名称
_bpmn_create_or_update_flow

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
    "flow": {
      "type": "object",
      "description": "需要创建或更新的流转线详细信息。",
      "properties": {
        "id": {
          "type": "string",
          "description": "流转线ID，对应 BPMN sequenceFlow 的 id，如：Flow_Approve_1。",
          "pattern": "^Flow_[A-Za-z][A-Za-z0-9_]{0,40}$"
        },
        "name": {
          "type": "string",
          "description": "流转线名称，用于 BPMN 中的 name 属性。"
        },
        "sourceRef": {
          "type": "string",
          "description": "起始节点ID，对应 BPMN 节点 id。"
        },
        "targetRef": {
          "type": "string",
          "description": "目标节点ID，对应 BPMN 节点 id。"
        },
        "conditionExpression": {
          "type": "string",
          "description": "流转条件表达式（Flowable 表达式），必须使用 ${} 包裹。可使用的变量仅限：1）initiator：流程发起人ID；2）form.xxx：启动节点绑定的数据表字段，例如 form.totalDays、form.leaveType。表达式必须返回布尔值，例如：${form.totalDays > 3}。若不填写，则表示无条件流转（默认流转线）",
          "pattern": "^\\$\\{.+\\}$"
        },
        "remark": {
          "type": "string",
          "description": "流转线备注说明，对应 BPMN 中 <documentation> 内容。"
        }
      },
      "required": [
        "id"
      ],
      "additionalProperties": false
    }
  },
  "required": [
    "moduleId",
    "processDefineId",
    "flow"
  ],
  "additionalProperties": false
}
