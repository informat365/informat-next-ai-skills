# _bpmn_create_process_define

## 技能ID
bpmn_create_process_define

## 描述
创建工作流流程定义。

## 工具调用

### 思考
调用_bpmn_create_process_define工具

### 工具名称
_bpmn_create_process_define

### 参数
{
  "type": "object",
  "properties": {
    "key": {
      "type": "string",
      "description": "工作流模块ID。必须以字母开头,而且首字母小写，只能包含字母、数字或下划线，建议使用驼峰命名，长度不超过20。",
      "pattern": "^[A-Za-z][A-Za-z0-9_]{0,19}$",
      "maxLength": 20
    },
    "name": {
      "type": "string"
    },
    "moduleId": {
      "type": "string",
      "description": "工作流模块ID"
    },
    "enable": {
      "type": "boolean",
      "default": true
    },
    "roleList": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "允许以下应用角色成员发起此工作流,默认可以为空不选择，允许应用内所有成员发起流程"
    },
    "canComment": {
      "type": "boolean",
      "default": true,
      "description": "是否允许评论"
    },
    "canDeleteComment": {
      "type": "boolean",
      "default": true,
      "description": "是否允许删除评论"
    },
    "enableNotification": {
      "type": "boolean",
      "default": true,
      "description": "是否启用节点流转通知"
    },
    "enableRecordBindMultiInstances": {
      "type": "boolean",
      "default": false,
      "description": "是否允许数据表记录绑定多个工作流实例"
    }
  },
  "required": [
    "key",
    "name",
    "moduleId",
    "enable",
    "canComment",
    "canDeleteComment",
    "enableNotification",
    "enableRecordBindMultiInstances"
  ]
}
