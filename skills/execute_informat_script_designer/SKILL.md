# _execute_informat_script_designer

## 技能ID
execute_informat_script_designer

## 描述
在【应用设计器环境】中执行织信脚本文件的指定方法。主要用于脚本的开发、调试与验证。

执行说明：
- 执行的脚本必须存在于【设计器脚本列表】中（未发布状态亦可）
- 如果未指定 scriptId，可根据上下文推断应执行的脚本
- 如果脚本为新建但尚未保存，应先保存脚本文件再执行方法
- 如果未指定 functionName，可根据用户意图推断应调用的方法
- 只能调用脚本中通过 export 导出的真实函数，禁止调用不存在的方法
- 执行过程不会修改脚本内容，也不会创建临时或测试脚本文件

适用场景：
- 设计器内脚本调试
- 功能验证与逻辑测试
- 应用发布前的脚本执行。

## 工具调用

### 思考
调用_execute_informat_script_designer工具

### 工具名称
_execute_informat_script_designer

### 参数
{
  "type": "object",
  "properties": {
    "scriptId": {
      "description": "脚本ID",
      "type": "string"
    },
    "functionName": {
      "description": "函数名称，需要export出来的方法",
      "type": "string"
    },
    "functionParams": {
      "description": "执行目标函数所需的入参，格式为对象数组；若函数无需参数，可传空数组 []",
      "type": "array",
      "items": {
        "type": [
          "string",
          "number",
          "boolean",
          "object",
          "array",
          "null"
        ],
        "description": "按顺序传递的参数值（类型需与函数定义的参数类型匹配）"
      },
      "default": []
    }
  },
  "required": [
    "scriptId",
    "functionName"
  ]
}
