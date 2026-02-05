# _query_dashboard_card_detail

## 技能ID
query_dashboard_card_detail

## 描述
查询应用中指定仪表盘卡片的详情。Returns: 卡片详情

## 工具调用

### 思考
调用_query_dashboard_card_detail工具

### 工具名称
_query_dashboard_card_detail

### 参数
{
  "type": "object",
  "properties": {
    "dashboardId": {
      "description": "仪表盘ID",
      "type": "string"
    },
    "cardId": {
      "description": "仪表盘卡片ID",
      "type": "string"
    }
  },
  "required": [
    "dashboardId",
    "cardId"
  ]
}
