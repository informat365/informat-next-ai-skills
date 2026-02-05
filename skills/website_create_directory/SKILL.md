# _website_create_directory

## 技能ID
website_create_directory

## 描述
创建网站模块资源目录。

## 工具调用

### 思考
调用_website_create_directory工具

### 工具名称
_website_create_directory

### 参数
{
  "type": "object",
  "properties": {
    "websiteId": {
      "type": "string",
      "description": "网站模块ID。"
    },
    "name": {
      "type": "string",
      "description": "目录名称，推荐使用英文小写字母"
    },
    "parentId": {
      "type": "string",
      "description": "父目录ID，可以为空，如果为空表示父目录是根目录"
    }
  },
  "required": [
    "websiteId",
    "name"
  ]
}
