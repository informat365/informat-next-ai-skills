# _bpmn_create_module

## 技能ID
bpmn_create_module

## 描述
创建工作流模块。

## 工具调用

### 思考
调用_bpmn_create_module工具

### 工具名称
_bpmn_create_module

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "工作流模块ID（使用驼峰命名，且在系统内唯一，不得与现有模块重复）。"
    },
    "name": {
      "type": "string",
      "description": "工作流模块的名称。"
    },
    "parentId": {
      "type": "string",
      "description": "模块分组ID，工具_query_app_define_designer可以获取到模块分组定义列表"
    }
  },
  "required": [
    "id",
    "name"
  ]
}
