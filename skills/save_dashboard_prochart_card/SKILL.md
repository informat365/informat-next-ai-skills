# _save_dashboard_prochart_card

## 技能ID
save_dashboard_prochart_card

## 描述
在仪表盘中创建或编辑仪表盘卡片。只能创建或修改卡片类型为ProChart的卡片。特别注意：1、数据源规则：当type="table"时，dimensionList中的字段id必须是SQL查询结果中的真实列名。严禁杜撰或使用不存在的字段名。1.1 未开启聚合查询则字段来源为直接查询数据表所返回的原始字段，命名规则：id必须与数据库表中的列名完全一致 1.2 已开启聚合查询则聚合列格式为字段名_函数名，且禁止对id和seq字段聚合，即此处aggregationQueryList中fieldId不能为id或seq，需要使用其他字段；当type="expression"时，静态变量需用单引号包裹并置于内，格式如{'key':'A'}，此处不能杜撰不存在的非静态变量，可以使用的非静态变量为：filterRecord和filterFieldList 前提是改卡片定义或仪表盘定义开启了筛选。2. 堆叠图表规则：当需要实现堆叠效果时，必须为每一个堆叠系列单独创建一个数据源和一个对应的图表实例，：在图表列表series的每一项中datasetIndex对应数据源的索引，每个图标的datasetIndex值应该与对应数据源的下标一一对应示例：要用柱状图显示“每个员工的每种打卡类型数量”，则需要为“打卡类型A”、“打卡类型B”等每一种类型分别创建独立的数据源和图表，此时打卡类型A数据源在dataset中下标为0，打卡类型B在数据源中下标为1，则图表中datasetIndex需要分别设置为0和1，在每次创建或者修改卡片前，你都需要提前规划好有哪些数据源和图表，从而设置正确的datasetIndex。3、 样式规则：图表标题的位置必须进行设置，确保其不与图例区域发生重叠。4、最终生成的内容需要进行json解析，所以必须符合json规范，不允许出现函数。

## 工具调用

### 思考
调用_save_dashboard_prochart_card工具

### 工具名称
_save_dashboard_prochart_card

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "卡片ID。创建时不传，编辑时必传"
    },
    "name": {
      "type": "string",
      "description": "卡片名称"
    },
    "type": {
      "type": "string",
      "description": "卡片类型（目前仅支持 'ProChart'）。",
      "enum": [
        "ProChart"
      ]
    },
    "scope": {
      "type": "string",
      "description": "卡片所属仪表盘id。"
    },
    "width": {
      "type": "number",
      "description": "卡片宽度，最长为24，表示占24格，不能低于12。",
      "default": 12
    },
    "height": {
      "type": "number",
      "description": "卡片高度，也是按照占用格子表示，没有最长为24的限制。最短为12",
      "default": 12
    },
    "remark": {
      "type": "string",
      "description": "卡片备注。"
    },
    "isInTab": {
      "type": "boolean",
      "description": "是否在 Tab 内显示。"
    },
    "cardStyle": {
      "type": "object",
      "description": "卡片样式，控制背景、内边距、边框、标题位置等。",
      "properties": {
        "bgType": {
          "type": "string",
          "description": "背景类型，例如 'image' 或 'color' 或 'transparent'，默认为 image。"
        },
        "bgColor": {
          "type": "string",
          "description": "背景颜色（CSS 颜色值），仅在 bgType 合适时有效。"
        },
        "bgImageId": {
          "type": "string",
          "description": "背景图片ID（如果使用图片）。"
        },
        "padding": {
          "type": "number",
          "description": "四周内边距（像素）。"
        },
        "paddingTop": {
          "type": "number",
          "description": "上内边距"
        },
        "paddingRight": {
          "type": "number",
          "description": "右内边距"
        },
        "paddingBottom": {
          "type": "number",
          "description": "下内边距"
        },
        "paddingLeft": {
          "type": "number",
          "description": "左内边距"
        },
        "overflow": {
          "type": "string",
          "description": "溢出策略，例如 'auto'、'hidden'、'visible'。"
        },
        "borderWidth": {
          "type": "number",
          "description": "边框宽度"
        },
        "borderRadius": {
          "type": "number",
          "description": "圆角半径"
        },
        "titleFontSize": {
          "type": "string",
          "description": "标题字体大小（CSS 字符串，例如 '13px'）。"
        },
        "titlePosition": {
          "type": "string",
          "description": "标题位置，例如 'left'、'center'、'right'。"
        },
        "subTitleFontSize": {
          "type": "string",
          "description": "副标题字体大小（例如 '12px'）。"
        },
        "subTitlePosition": {
          "type": "string",
          "description": "副标题位置，例如 'titleBottom'。"
        },
        "enableBorderImage": {
          "type": "boolean",
          "description": "是否启用边框图片。仅当为 true 时使用 borderImage* 字段。"
        },
        "borderImageId": {
          "type": "string",
          "description": "边框图片 ID（可选）。"
        },
        "borderImageIsFill": {
          "type": "boolean",
          "description": "边框图像是否填充内容区域。"
        },
        "borderImageSlice": {
          "type": "array",
          "items": {
            "type": "number"
          },
          "description": "边框图像切片设置（按 CSS border-image-slice）。"
        },
        "borderImageRepeatX": {
          "type": "string",
          "description": "边框图像横向重复策略，如 'round'、'repeat'、'stretch'。"
        },
        "borderImageRepeatY": {
          "type": "string",
          "description": "边框图像纵向重复策略。"
        }
      }
    },
    "buttonList": {
      "type": "array",
      "items": {
        "type": "object"
      },
      "description": "卡片顶部或工具栏按钮配置数组。按钮对象结构应包含 id、label、action 等字段。"
    },
    "buttonStyle": {
      "type": "object",
      "description": "顶部按钮样式与布局配置。",
      "properties": {
        "size": {
          "type": "string",
          "description": "按钮大小，例如 'small'、'medium'、'large'。"
        },
        "orient": {
          "type": "string",
          "description": "排列方向，例如 'horizontal' 或 'vertical'。"
        },
        "vertical": {
          "type": "string",
          "description": "垂直对齐，如 'top'、'middle'、'bottom'。"
        },
        "horizontal": {
          "type": "string",
          "description": "水平对齐，如 'left'、'center'、'right'。"
        }
      }
    },
    "refreshTime": {
      "type": "integer",
      "description": "自动刷新间隔（秒）。0 或未设置表示不自动刷新。"
    },
    "enableButton": {
      "type": "boolean",
      "description": "是否启用按钮"
    },
    "enableRefresh": {
      "type": "boolean",
      "description": "是否启用自动刷新"
    },
    "disableToolbar": {
      "type": "boolean",
      "description": "是否禁用卡片的工具栏"
    },
    "enableCardStyle": {
      "type": "boolean",
      "description": "是否应用 cardStyle 中的样式"
    },
    "filterFieldList": {
      "type": "array",
      "items": {
        "type": "object"
      },
      "description": "卡片级别的过滤字段配置数组。每项应包含 fieldId、label、type 等。"
    },
    "proChartSetting": {
      "type": "object",
      "description": "图表的具体渲染配置。结构兼容 ECharts option",
      "properties": {
        "grid": {
          "type": "array",
          "items": {
            "type": "object"
          },
          "description": "grid 配置数组（参照 ECharts grid）。"
        },
        "polar": {
          "type": "array",
          "items": {
            "type": "object"
          },
          "description": "极坐标系配置数组（参照 ECharts polar）。"
        },
        "radar": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "radar 配置唯一 id（可选）。"
              },
              "name": {
                "type": "string",
                "description": "雷达名称（显示用，可选）。"
              },
              "shape": {
                "type": "string",
                "enum": [
                  "polygon",
                  "circle"
                ],
                "description": "雷达形状。'polygon' 或 'circle'。"
              },
              "radius": {
                "type": "string",
                "description": "雷达半径（例如 '75%' 或 '200'）。"
              },
              "indicator": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "指标名称。"
                    },
                    "max": {
                      "type": "number",
                      "description": "该指标允许的最大值（数值）。"
                    },
                    "min": {
                      "type": "number",
                      "description": "该指标允许的最小值（数值）。"
                    },
                    "color": {
                      "type": "string",
                      "description": "该指标文本颜色（可选）。"
                    }
                  },
                  "required": [
                    "name"
                  ]
                },
                "description": "雷达图的维度指示器数组（至少包含 name，建议包含 max）。"
              },
              "axisLine": {
                "type": "object",
                "description": "轴线样式配置（参照 ECharts axisLine）。"
              },
              "axisLabel": {
                "type": "object",
                "description": "轴标签样式配置。"
              },
              "splitLine": {
                "type": "object",
                "description": "分隔线样式配置。"
              },
              "axisName": {
                "type": "object",
                "description": "轴名称样式配置（文本样式等）。"
              }
            },
            "required": [
              "indicator"
            ]
          },
          "description": "雷达（radar）配置列表。"
        },
        "xAxis": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "xAxis 的 id（可选）。"
              },
              "name": {
                "type": "string",
                "description": "坐标轴名称（显示）。"
              },
              "show": {
                "type": "boolean",
                "description": "是否展示该坐标轴。"
              },
              "type": {
                "type": "string",
                "description": "坐标轴类型，例如 'category'、'value'、'time' 或 'log'。"
              },
              "position": {
                "type": "string",
                "description": "坐标轴位置，如 'bottom','top'。"
              },
              "axisLine": {
                "type": "object",
                "description": "轴线样式配置。"
              },
              "axisTick": {
                "type": "object",
                "description": "刻度线配置。"
              },
              "axisLabel": {
                "type": "object",
                "description": "刻度文字配置，包括 rotate、formatter 等。"
              },
              "splitLine": {
                "type": "object",
                "description": "分割线配置。"
              },
              "boundaryGap": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "boundaryGap 配置，category 类型通常为 ['0','0'] 或 true/false。"
              }
            },
            "required": [
              "type"
            ]
          },
          "description": "x 轴配置数组（支持多 x 轴）。"
        },
        "yAxis": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "yAxis 的 id（可选）。"
              },
              "name": {
                "type": "string",
                "description": "坐标轴名称（显示）。"
              },
              "show": {
                "type": "boolean",
                "description": "是否展示该坐标轴。"
              },
              "type": {
                "type": "string",
                "description": "坐标轴类型，例如 'value','category','time' 等。"
              },
              "position": {
                "type": "string",
                "description": "坐标轴位置，如 'left','right'。"
              },
              "axisLine": {
                "type": "object",
                "description": "轴线样式配置。"
              },
              "axisTick": {
                "type": "object",
                "description": "刻度线配置。"
              },
              "axisLabel": {
                "type": "object",
                "description": "刻度文字配置。"
              },
              "splitLine": {
                "type": "object",
                "description": "分隔线配置。"
              },
              "boundaryGap": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "boundaryGap 配置。"
              }
            }
          },
          "description": "y 轴配置数组（支持多 y 轴）。"
        },
        "legend": {
          "type": "object",
          "description": "图例配置，参照 ECharts legend（show、orient、data 等）。"
        },
        "title": {
          "type": "object",
          "description": "标题配置（text、subtext、left、top、textStyle 等）。"
        },
        "dataset": {
          "type": "array",
          "description": "图表数据源配置数组。当 type='table' 时支持动态过滤和聚合查询，返回字段由 dimensionList 定义，图表encode必须引用此处声明的字段ID。由于图表配置只能配置具体的值（查询的时候不能用聚合的方式进行分组，这样获取的字段不是具体的值，比如根据状态字段进行分组status，但是status根据状态分组后会有多个值，这是不符合要求的）所以当出现图表堆叠时，有多少个需要堆叠的图表就创建多少个数据源与图表，然后一一对应，对应的图表使用对应的数据源，例如以柱状图显示每个员工的每种打卡类型数量，针对每一种打卡类型都需要创建该打卡类型的数据源，",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "数据源标识"
              },
              "name": {
                "type": "string",
                "description": "数据源名称"
              },
              "type": {
                "type": "string",
                "enum": [
                  "table",
                  "expression"
                ],
                "description": "数据源类型：'table'-动态表查询，'expression'-静态表达式数据"
              },
              "tableId": {
                "type": "string",
                "description": "当 type='table' 时必填，需为系统中真实存在的表ID"
              },
              "expression": {
                "type": "string",
                "description": "当 type='expression' 时必填，需为合法的JS表达式字符串（如 `${[...]}`）"
              },
              "filter": {
                "type": "object",
                "description": "动态过滤条件配置（仅type='table'时生效），字段类型为：Checkbox 时，值为true/false",
                "properties": {
                  "opt": {
                    "type": "string",
                    "enum": [
                      "and",
                      "or"
                    ],
                    "description": "根条件组合逻辑"
                  },
                  "children": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "description": "嵌套条件组，不需要时置空",
                      "properties": {
                        "opt": {
                          "type": "string",
                          "enum": [
                            "and",
                            "or"
                          ]
                        },
                        "conditionList": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "fieldId": {
                                "type": "string"
                              },
                              "opt": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              },
                              "var": {
                                "type": "boolean"
                              }
                            },
                            "required": [
                              "fieldId",
                              "opt",
                              "value",
                              "var"
                            ]
                          }
                        }
                      }
                    }
                  },
                  "conditionList": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "description": "过滤条件，不需要时置空",
                      "properties": {
                        "fieldId": {
                          "type": "string",
                          "description": "过滤字段ID，特殊值 '$expression' 表示使用的是函数"
                        },
                        "opt": {
                          "type": "string",
                          "enum": [
                            "eq",
                            "ne",
                            "gt",
                            "ge",
                            "lt",
                            "le",
                            "contains",
                            "notcontains",
                            "startswith",
                            "endswith",
                            "isnull",
                            "isnotnull",
                            "in",
                            "notin",
                            "between",
                            "notbetween"
                          ],
                          "description": "比较运算符，可以使用的值有：\"eq\",\"ne\",\"gt\",\"ge\",\"lt\",\"le\",\"contains\",\"notcontains\",\"startswith\",\"endswith\",\"isnull\",\"isnotnull\",\"in\",\"notin\",\"between\",\"notbetween\""
                        },
                        "value": {
                          "type": "string",
                          "description": "比较值或表达式（如 '1=${filterRecord.name == null ? 1 : 0}'）;当值为布尔类型或者数值时，使用${}包裹，比如${true}，或者${100}"
                        },
                        "var": {
                          "type": "boolean",
                          "description": "标记value是否为表达式"
                        }
                      },
                      "required": [
                        "fieldId",
                        "opt",
                        "value",
                        "var"
                      ]
                    }
                  }
                },
                "required": [
                  "opt",
                  "children",
                  "conditionList"
                ]
              },
              "aggregation": {
                "type": "boolean",
                "description": "是否启用聚合计算",
                "default": false
              },
              "aggregationQueryList": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "fieldId": {
                      "type": "string",
                      "description": "被聚合的字段ID。不得使用id和seq字段进行聚合"
                    },
                    "func": {
                      "type": "string",
                      "enum": [
                        "count",
                        "avg",
                        "sum",
                        "max",
                        "min"
                      ],
                      "description": "聚合函数，可以选择：\"count\", \"avg\", \"sum\", \"max\", \"min\"，需要注意：avg、sum、max、min这些函数要求字段必须是数值类型，只有字段类型为Integer或者Double才能使用这几种函数"
                    },
                    "distinct": {
                      "type": "boolean",
                      "description": "是否去重",
                      "default": false
                    }
                  },
                  "required": [
                    "fieldId",
                    "func"
                  ]
                },
                "description": "聚合计算配置（当 aggregation=true 时必填）"
              },
              "groupByFieldList": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "分组字段ID列表（如 ['name']），使用分组需要开启聚合-aggregation=true"
              },
              "dimensionList": {
                "type": "array",
                "description": "最终输出的数据字段列表，必须包含图表encode中引用的字段，encode只能使用此处的字段列表，不得杜撰不存在的数据字段，如果使用了聚合字段，则字段ID格式为：'字段ID_函数名' 如：name_count",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "字段ID"
                    },
                    "name": {
                      "type": "string",
                      "description": "字段名"
                    }
                  },
                  "required": [
                    "id",
                    "name"
                  ]
                }
              },
              "orderByList": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "field": {
                      "type": "string",
                      "description": "排序字段ID"
                    },
                    "type": {
                      "type": "string",
                      "enum": [
                        "asc",
                        "desc"
                      ]
                    }
                  },
                  "required": [
                    "field",
                    "type"
                  ]
                },
                "description": "排序"
              }
            },
            "required": [
              "id",
              "name",
              "type"
            ],
            "allOf": [
              {
                "if": {
                  "properties": {
                    "type": {
                      "const": "table"
                    }
                  }
                },
                "then": {
                  "required": [
                    "tableId"
                  ]
                }
              },
              {
                "if": {
                  "properties": {
                    "type": {
                      "const": "expression"
                    }
                  }
                },
                "then": {
                  "required": [
                    "expression"
                  ]
                }
              },
              {
                "if": {
                  "properties": {
                    "aggregation": {
                      "const": true
                    }
                  }
                },
                "then": {
                  "required": [
                    "aggregationQueryList",
                    "groupByFieldList"
                  ],
                  "properties": {
                    "dimensionList": {
                      "items": {
                        "properties": {
                          "id": {
                            "pattern": "^(?!.*_count$|.*_avg$|.*_sum$|.*_max$|.*_min$).*$",
                            "description": "非聚合字段ID不得包含函数后缀"
                          }
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        },
        "series": {
          "type": "array",
          "description": "图表数组，必须提供（至少一个）。数组中每个对象必须包含 id、name、type、以及对应类型的 setting 配置（如 barSetting等）。",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "图表唯一id"
              },
              "name": {
                "type": "string",
                "description": "图表名称"
              },
              "type": {
                "type": "string",
                "description": "图表类型（必须与 chartType 匹配），例如 'bar','line','pie','scatter','radar','gauge','boxplot','candlestick','heatmap','funnel' 等。",
                "enum": [
                  "bar",
                  "line",
                  "pie",
                  "scatter",
                  "radar",
                  "gauge",
                  "boxplot",
                  "candlestick",
                  "heatmap",
                  "funnel"
                ]
              },
              "xAxisIndex": {
                "type": "integer",
                "description": "引用 xAxis 的索引（若有多 x 轴）"
              },
              "yAxisIndex": {
                "type": "integer",
                "description": "引用 yAxis 的索引（若有多 y 轴）"
              },
              "barSetting": {
                "type": "object",
                "description": "柱状图配置，当 type==='bar' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                    "properties": {
                      "x": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "X轴字段"
                      },
                      "y": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "Y轴字段"
                      },
                      "seriesName": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "图表名字段"
                      }
                    },
                    "required": [
                      "x",
                      "y"
                    ]
                  },
                  "barGap": {
                    "type": "string",
                    "description": "柱间距离（如'20%'或像素值）",
                    "default": "30%"
                  },
                  "barCategoryGap": {
                    "type": "string",
                    "description": "类目间柱形距离（如'20%'）",
                    "default": "20%"
                  },
                  "barWidth": {
                    "type": "string",
                    "description": "柱条宽度（如'40%'或像素值）"
                  },
                  "showBackground": {
                    "type": "boolean",
                    "description": "是否显示柱条背景",
                    "default": false
                  },
                  "backgroundStyle": {
                    "type": "object",
                    "properties": {
                      "color": {
                        "type": "string",
                        "description": "背景颜色"
                      },
                      "borderColor": {
                        "type": "string",
                        "description": "边框颜色"
                      },
                      "borderWidth": {
                        "type": "number",
                        "description": "边框宽度"
                      }
                    }
                  },
                  "itemStyle": {
                    "type": "object",
                    "properties": {
                      "color": {
                        "type": "string",
                        "description": "柱条颜色"
                      },
                      "borderColor": {
                        "type": "string",
                        "description": "边框颜色"
                      },
                      "borderWidth": {
                        "type": "number",
                        "default": 0
                      },
                      "borderType": {
                        "type": "string",
                        "enum": [
                          "solid",
                          "dashed",
                          "dotted"
                        ],
                        "default": "solid"
                      },
                      "opacity": {
                        "type": "number",
                        "minimum": 0,
                        "maximum": 1,
                        "default": 1
                      }
                    }
                  },
                  "label": {
                    "type": "object",
                    "properties": {
                      "show": {
                        "type": "boolean",
                        "default": true
                      },
                      "position": {
                        "type": "string",
                        "enum": [
                          "top",
                          "right",
                          "bottom",
                          "left",
                          "inside",
                          "insideLeft",
                          "insideRight"
                        ],
                        "default": "top"
                      },
                      "formatter": {
                        "type": "string",
                        "description": "标签内容格式器（如'{c}'）"
                      }
                    }
                  },
                  "stack": {
                    "type": "string",
                    "description": "堆叠标识（相同stack值的图表会堆叠）"
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "lineSetting": {
                "type": "object",
                "description": "折线图专属配置，当 type==='line' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                    "properties": {
                      "x": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "X轴字段"
                      },
                      "y": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "Y轴字段"
                      },
                      "seriesName": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "图表名字段"
                      }
                    },
                    "required": [
                      "x",
                      "y"
                    ]
                  },
                  "smooth": {
                    "type": "boolean",
                    "description": "是否平滑显示",
                    "default": false
                  },
                  "symbol": {
                    "type": "string",
                    "enum": [
                      "circle",
                      "rect",
                      "roundRect",
                      "triangle",
                      "diamond",
                      "pin",
                      "arrow",
                      "none"
                    ],
                    "description": "标记图形",
                    "default": "emptyCircle"
                  },
                  "symbolSize": {
                    "type": "number",
                    "description": "标记大小",
                    "default": 4
                  },
                  "showSymbol": {
                    "type": "boolean",
                    "description": "是否显示标记",
                    "default": true
                  },
                  "areaStyle": {
                    "type": "object",
                    "description": "区域填充样式",
                    "properties": {
                      "color": {
                        "type": "string",
                        "description": "填充颜色"
                      },
                      "opacity": {
                        "type": "number",
                        "minimum": 0,
                        "maximum": 1,
                        "default": 0.6
                      }
                    }
                  },
                  "lineStyle": {
                    "type": "object",
                    "description": "线条样式",
                    "properties": {
                      "width": {
                        "type": "number",
                        "default": 1
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "solid",
                          "dashed",
                          "dotted"
                        ],
                        "default": "solid"
                      }
                    }
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "pieSetting": {
                "type": "object",
                "description": "饼图专属配置，当 type==='pie' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                    "properties": {
                      "value": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "数值字段"
                      },
                      "itemName": {
                        "type": "string",
                        "description": "项名字段"
                      }
                    },
                    "required": [
                      "value",
                      "itemName"
                    ]
                  },
                  "radius": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "半径配置（如['0%','70%']）",
                    "default": [
                      "0%",
                      "75%"
                    ]
                  },
                  "center": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "圆心位置（如['50%','50%']）",
                    "default": [
                      "50%",
                      "50%"
                    ]
                  },
                  "label": {
                    "type": "object",
                    "properties": {
                      "show": {
                        "type": "boolean",
                        "default": true
                      },
                      "position": {
                        "type": "string",
                        "enum": [
                          "inside",
                          "outside",
                          "center"
                        ],
                        "default": "outside"
                      }
                    }
                  },
                  "labelLine": {
                    "type": "object",
                    "description": "标签引导线配置"
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "scatterSetting": {
                "type": "object",
                "description": "散点图专属配置，当当 type==='scatter' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                    "properties": {
                      "x": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "X轴字段"
                      },
                      "y": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "Y轴字段"
                      },
                      "value": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "数值字段"
                      }
                    },
                    "required": [
                      "x",
                      "y"
                    ]
                  },
                  "symbolSize": {
                    "type": "number",
                    "default": 4
                  },
                  "symbol": {
                    "type": "string",
                    "enum": [
                      "circle",
                      "rect",
                      "triangle",
                      "diamond",
                      "pin"
                    ],
                    "default": "circle"
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "radarSetting": {
                "type": "object",
                "description": "雷达图专属配置，当 type==='radar' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                    "properties": {
                      "value": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "数值字段"
                      }
                    },
                    "required": [
                      "value"
                    ]
                  },
                  "areaStyle": {
                    "type": "object",
                    "description": "区域填充样式"
                  },
                  "lineStyle": {
                    "type": "object",
                    "description": "线条样式"
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "gaugeSetting": {
                "type": "object",
                "description": "仪表图专属配置，当 type==='gauge' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                    "properties": {
                      "value": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "数值字段"
                      }
                    },
                    "required": [
                      "value"
                    ]
                  },
                  "min": {
                    "type": "number",
                    "default": 0
                  },
                  "max": {
                    "type": "number",
                    "default": 100
                  },
                  "axisLine": {
                    "type": "object",
                    "properties": {
                      "lineStyle": {
                        "type": "object",
                        "properties": {
                          "color": {
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "minItems": 2,
                              "maxItems": 2
                            },
                            "description": "颜色分段（如[[0.3,'#67e0e3'],[0.7,'#37a2da'],[1,'#fd666d']]）"
                          }
                        }
                      }
                    }
                  },
                  "detail": {
                    "type": "object",
                    "properties": {
                      "formatter": {
                        "type": "string",
                        "description": "格式化字符串（如'{value}%'）"
                      }
                    }
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "boxplotSetting": {
                "type": "object",
                "description": "箱型图专属配置，当 type==='boxplot' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                    "properties": {
                      "x": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "分类字段"
                      },
                      "y": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "minItems": 5,
                        "maxItems": 5,
                        "description": "数值字段数组（必须按[min,q1,median,q3,max]顺序）"
                      }
                    },
                    "required": [
                      "x",
                      "y"
                    ]
                  },
                  "boxWidth": {
                    "type": "array",
                    "items": {
                      "type": "number"
                    },
                    "description": "箱体宽度范围（如[10,30]）"
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "candlestickSetting": {
                "type": "object",
                "description": "K线图专属配置，当 type==='candlestick' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                    "properties": {
                      "x": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "X轴字段"
                      },
                      "y": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "minItems": 4,
                        "maxItems": 4,
                        "description": "价格字段（按[open,close,high,low]顺序）"
                      }
                    },
                    "required": [
                      "x",
                      "y"
                    ]
                  },
                  "barWidth": {
                    "type": "number",
                    "description": "K线柱宽度",
                    "default": 10
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "heatmapSetting": {
                "type": "object",
                "description": "热力图专属配置，当 type==='heatmap' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置",
                    "properties": {
                      "x": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "X轴分类字段"
                      },
                      "y": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "Y轴分类字段"
                      },
                      "value": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "数值字段"
                      }
                    },
                    "required": [
                      "x",
                      "y",
                      "value"
                    ]
                  },
                  "label": {
                    "type": "object",
                    "properties": {
                      "show": {
                        "type": "boolean",
                        "default": true
                      },
                      "formatter": {
                        "type": "string",
                        "description": "显示格式（如'{@[1]}'）"
                      }
                    }
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "funnelSetting": {
                "type": "object",
                "description": "漏斗图专属配置，当 type==='funnel' 时必填",
                "properties": {
                  "datasetIndex": {
                    "type": "integer",
                    "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。"
                  },
                  "encode": {
                    "type": "object",
                    "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID",
                    "properties": {
                      "value": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "数值字段"
                      },
                      "itemName": {
                        "type": "string",
                        "description": "项名字段"
                      }
                    },
                    "required": [
                      "value",
                      "itemName"
                    ]
                  },
                  "sort": {
                    "type": "string",
                    "enum": [
                      "ascending",
                      "descending",
                      "none"
                    ],
                    "default": "descending"
                  },
                  "gap": {
                    "type": "number",
                    "description": "数据项间隔",
                    "default": 0
                  }
                },
                "required": [
                  "encode",
                  "datasetIndex"
                ]
              },
              "labelLayout": {
                "type": "object",
                "description": "label 布局冲突的处理策略"
              },
              "silent": {
                "type": "boolean",
                "description": "是否静默"
              },
              "colorBy": {
                "type": "string",
                "description": "颜色使用策略，例如 'data' 或 'series' 等。"
              },
              "emphasis": {
                "type": "object",
                "description": "高亮/聚焦配置（参照 ECharts emphasis）。"
              },
              "itemStyle": {
                "type": "object",
                "description": "图形样式（borderWidth、borderColor、opacity 等）。"
              },
              "showSymbol": {
                "type": "boolean",
                "description": "折线/散点是否显示 symbol（布尔）。"
              }
            },
            "required": [
              "name",
              "type"
            ]
          }
        },
        "tooltip": {
          "type": "object",
          "description": "通用 tooltip 配置"
        },
        "dataZoom": {
          "type": "array",
          "items": {
            "type": "object"
          },
          "description": "dataZoom 配置数组"
        },
        "visualMap": {
          "type": "array",
          "items": {
            "type": "object"
          },
          "description": "visualMap 配置数组（用于热力图/色彩映射）"
        },
        "angleAxis": {
          "type": "array",
          "items": {
            "type": "object"
          },
          "description": "极坐标角度轴配置"
        },
        "radiusAxis": {
          "type": "array",
          "items": {
            "type": "object"
          },
          "description": "极坐标半径轴配置"
        },
        "style": {
          "type": "object",
          "description": "自定义样式片段"
        }
      },
      "required": [
        "series",
        "dataset",
        "tooltip"
      ]
    },
    "disableFilterCache": {
      "type": "boolean",
      "description": "是否禁用过滤缓存"
    },
    "filterLabelPosition": {
      "type": "string",
      "description": "过滤器标签位置，例如 'top'、'left'、'right' 等。"
    }
  },
  "required": [
    "name",
    "type",
    "scope",
    "width",
    "height",
    "cardStyle",
    "proChartSetting"
  ]
}
