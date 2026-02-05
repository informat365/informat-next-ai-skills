# _bpmn_delete_node

## 技能ID
bpmn_delete_node

## 描述
删除 BPMN 流程中的一个节点。

## 工具调用

### 思考
调用_bpmn_delete_node工具

### 工具名称
_bpmn_delete_node

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
    "nodeId": {
      "type": "string"
    }
  },
  "required": [
    "moduleId",
    "processDefineId",
    "nodeId"
  ],
  "additionalProperties": false
}
