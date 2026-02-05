# _designer_knowledge_database

## 技能ID
designer_knowledge_database

## 描述
查询和低代码相关的知识。

## 工具调用

### 思考
调用_designer_knowledge_database工具

### 工具名称
_designer_knowledge_database

### 参数
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "description": "知识库类型,可选值有数据表字段定义,模块定义,表达式文档,自动化步骤定义,仪表盘卡片定义,控件调用行为定义"
    }
  },
  "required": [
    "type"
  ]
}
