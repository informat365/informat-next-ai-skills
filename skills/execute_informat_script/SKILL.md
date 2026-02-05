# _execute_informat_script

## 技能ID
execute_informat_script

## 描述
在【已发布的应用运行环境】中执行织信脚本文件的指定方法。用于模拟或触发应用正式运行时的脚本逻辑。

执行说明：
- 执行的脚本必须已随应用发布，存在于【已发布应用】中
- 仅能执行发布版本中的脚本内容，不会读取或影响设计器中的未发布脚本
- 如果未指定 scriptId，可根据上下文推断应执行的脚本
- 如果未指定 functionName，可根据用户意图推断应调用的方法
- 只能调用脚本中通过 export 导出的真实函数，禁止调用不存在的方法
- 执行过程不会修改脚本内容，也不会创建测试或临时脚本文件

适用场景：
- 验证发布后脚本的实际执行效果
- 模拟真实业务调用
- 排查运行环境中的脚本问题。

## 工具调用

### 思考
调用_execute_informat_script工具

### 工具名称
_execute_informat_script

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
