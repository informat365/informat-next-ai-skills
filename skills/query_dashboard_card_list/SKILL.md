# _query_dashboard_card_list

## 技能ID
query_dashboard_card_list

## 描述
查询应用中指定仪表盘下的卡片列表。返回结果包含卡片 ID、名称以及卡片的其他基础信息。

## 工具调用

### 思考
调用_query_dashboard_card_list工具

### 工具名称
_query_dashboard_card_list

### 参数
{
  "type": "object",
  "properties": {
    "dashboardId": {
      "description": "仪表盘 ID",
      "type": "string"
    }
  },
  "required": [
    "dashboardId"
  ]
}
