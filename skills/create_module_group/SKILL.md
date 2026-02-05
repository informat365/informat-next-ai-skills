# _create_module_group

## 技能ID
create_module_group

## 描述
创建模块分组。

## 工具调用

### 思考
调用_create_module_group工具

### 工具名称
_create_module_group

### 参数
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "分组名称，名称不能使用,。/\\等特殊字符"
    },
    "expand": {
      "type": "boolean",
      "description": "是否默认展开分组"
    },
    "parentId": {
      "type": "string",
      "description": "父分组ID"
    }
  },
  "required": [
    "name",
    "expand"
  ]
}
