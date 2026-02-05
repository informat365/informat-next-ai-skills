# _bpmn_delete_flow

## 技能ID
bpmn_delete_flow

## 描述
删除 BPMN 流程中的一条流转线。

## 工具调用

### 思考
调用_bpmn_delete_flow工具

### 工具名称
_bpmn_delete_flow

### 参数
{
  "type": "object",
  "properties": {
    "moduleId": {
      "type": "string"
    },
    "processDefineId": {
      "type": "string"
    },
    "flowId": {
      "type": "string"
    }
  },
  "required": [
    "moduleId",
    "processDefineId",
    "flowId"
  ],
  "additionalProperties": false
}
