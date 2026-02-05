# _generation_informat_script

## 技能ID
generation_informat_script

## 描述
你可以通过上下文和提示词生成织信脚本实现业务逻辑。

## 工具调用

### 思考
调用_generation_informat_script工具

### 工具名称
_generation_informat_script

### 参数
{
  "type": "object",
  "properties": {
    "prompt": {
      "description": "提示词上下文",
      "type": "string"
    }
  },
  "required": [
    "prompt"
  ]
}
