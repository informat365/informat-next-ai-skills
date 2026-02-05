# _render_html

## 技能ID
render_html

## 描述
使用 iframe 渲染 HTML 代码内容。

## 工具调用

### 思考
调用_render_html工具

### 工具名称
_render_html

### 参数
{
  "type": "object",
  "properties": {
    "srcdoc": {
      "type": "string",
      "description": "要嵌入并渲染的内联 HTML 内容"
    }
  },
  "required": [
    "srcdoc"
  ]
}
