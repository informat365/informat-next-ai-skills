# _bpmn_query_process_define

## 技能ID
bpmn_query_process_define

## 描述
查询指定 BPMN 流程定义的详细信息。返回内容包括流程启动配置（startSetting）以及流程中的所有节点信息。

## 工具调用

### 思考
调用_bpmn_query_process_define工具

### 工具名称
_bpmn_query_process_define

### 参数
{
  "type": "object",
  "properties": {
    "moduleId": {
      "description": "BPMN 模块 ID",
      "type": "string"
    },
    "processDefineId": {
      "description": "BPMN 流程定义 ID",
      "type": "string"
    }
  },
  "required": [
    "moduleId",
    "processDefineId"
  ]
}
