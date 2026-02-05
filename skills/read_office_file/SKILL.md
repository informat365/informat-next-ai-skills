# _read_office_file

## 技能ID
read_office_file

## 描述
根据附件字段中的文件路径读取 Office 文档的文本内容。支持解析 PDF、Word（.docx）和 Excel（.xlsx）文件，仅返回文件中的可读取文本信息。

## 工具调用

### 思考
调用_read_office_file工具

### 工具名称
_read_office_file

### 参数
{
  "type": "object",
  "properties": {
    "filePath": {
      "description": "文件路径，对应是附件字段里的path字段,如：cfjo72nfvk5cf/fw5cpegf53nvc/ddyixt34smvwhavweozko.pdf",
      "type": "string"
    }
  },
  "required": [
    "filePath"
  ]
}
