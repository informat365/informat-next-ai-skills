# _create_informat_script_directory

## 技能ID
create_informat_script_directory

## 描述
创建织信脚本目录。该方法总是比_save_informat_script提前调用。如果存在父目录则传parentId，否则不穿传。return: 返回创建后的文件夹id，后续创建脚本文件时，如果文件属于该目录，则携带该id为parentId。该方法调用后需要再次调用_query_informat_script_list

## 工具调用

### 思考
调用_create_informat_script_directory工具

### 工具名称
_create_informat_script_directory

### 参数
{
  "type": "object",
  "properties": {
    "name": {
      "description": "文件夹名称，如tools,文件夹名称不能重复",
      "type": "string"
    },
    "parentId": {
      "description": "父目录id，没有可以不传",
      "type": "string"
    }
  },
  "required": [
    "name"
  ]
}
