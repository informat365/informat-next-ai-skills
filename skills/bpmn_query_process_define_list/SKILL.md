# _bpmn_query_process_define_list

## 技能ID
bpmn_query_process_define_list

## 描述
查询应用中指定 BPMN 模块下的流程定义列表。返回结果包含 processDefineId、processDefineName 以及流程定义的其他基础信息。

## 工具调用

### 思考
调用_bpmn_query_process_define_list工具

### 工具名称
_bpmn_query_process_define_list

### 参数
{
  "type": "object",
  "properties": {
    "moduleId": {
      "description": "BPMN 模块 ID",
      "type": "string"
    }
  },
  "required": [
    "moduleId"
  ]
}
