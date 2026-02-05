# 折线图

**折线图**是用直线线段将各数据点连接组成的图形，以折线方式可以直观地显示数据变化趋势。折线图常用来分析数据随时间的变化趋势，也可用来分析多组数据随时间变化的相互作用和相互影响。

例如，我们可用折线图来分析某类商品或是某几类相关的商品随时间变化的销售情况，从而进一步预测未来的销售情况。在折线图中，一般水平轴（X轴）用来表示时间的推移，并且间隔相同；而垂直轴（Y轴）代表不同时刻的数据的大小。

**优势：** 折线图易于理解，可用来分析多组数据随时间变化的相互作用和相互影响，并可即时感知趋势。

**缺点：** 在折线图中使用多个线形会导致折线图混乱，难以解释。因此，需避免使用两三个以上的度量。

## 配置结构对应关系

以下设置项对应 `_save_dashboard_prochart_card` 文档中 `proChartSetting.series[n].lineSetting` 及相关配置字段：

| 用户界面设置项 | 对应 JSON 字段路径 | 类型/枚举值 | 说明 |
|----------------|-------------------|-------------|------|
| **数据设置** | | | |
| 数据源 | `proChartSetting.dataset[n].id`<br>`proChartSetting.series[n].lineSetting.datasetIndex` | `integer` | 选择数据源索引，必须与 `dataset` 数组下标对应 |
| 坐标系类型 | `proChartSetting.series[n].xAxisIndex`<br>`proChartSetting.series[n].yAxisIndex` | `integer` | 通过索引引用对应的坐标轴配置 |
| 名称字段 | `proChartSetting.series[n].lineSetting.encode.seriesName` | `array<string>` | 用于图例显示的字段名 |
| 横轴字段 | `proChartSetting.series[n].lineSetting.encode.x` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| 纵轴字段 | `proChartSetting.series[n].lineSetting.encode.y` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| **图表设置** | | | |
| X坐标轴 | `proChartSetting.xAxis` | `array<object>` | 支持多个X轴配置 |
| Y坐标轴 | `proChartSetting.yAxis` | `array<object>` | 支持多个Y轴配置 |
| 颜色分配类型 | `proChartSetting.series[n].colorBy` | `string` | `'data'` 或 `'series'` |
| 显示图形 | `proChartSetting.series[n].lineSetting.showSymbol` | `boolean` | 是否显示数据点标记 |
| 图形样式 | `proChartSetting.series[n].lineSetting.symbol` | `string` | `'circle'`, `'rect'`, `'roundRect'`, `'triangle'`, `'diamond'`, `'pin'`, `'arrow'`, `'none'` |
| 图形大小 | `proChartSetting.series[n].lineSetting.symbolSize` | `number` | 标记图形大小 |
| 图形旋转角度 | `proChartSetting.series[n].lineSetting.symbolRotate` | `number` | （如需配置，可在扩展中支持） |
| 显示为阶梯图 | `proChartSetting.series[n].lineSetting.step` | `string` | `'start'`, `'middle'`, `'end'`（如需配置） |
| 平滑曲线显示 | `proChartSetting.series[n].lineSetting.smooth` | `boolean` | 是否显示为平滑曲线 |
| **标签设置** | | | |
| 显示标签 | `proChartSetting.series[n].lineSetting.label.show` | `boolean` | 是否显示数据标签 |
| 显示内容表达式 | `proChartSetting.series[n].lineSetting.label.formatter` | `string` | ECharts 格式化字符串，如 `'{c}'` |
| 位置 | `proChartSetting.series[n].lineSetting.label.position` | `string` | `'top'`, `'left'`, `'right'`, `'bottom'`, `'inside'` 等 |
| 距离图形的距离 | `proChartSetting.series[n].lineSetting.label.distance` | `number` | 标签与数据点的距离 |
| 标签旋转 | `proChartSetting.series[n].lineSetting.label.rotate` | `number` | 标签旋转角度 |
| 文字偏移X | `proChartSetting.series[n].lineSetting.label.offset[0]` | `number` | 水平偏移量 |
| 文字偏移Y | `proChartSetting.series[n].lineSetting.label.offset[1]` | `number` | 垂直偏移量 |
| 颜色 | `proChartSetting.series[n].lineSetting.label.color` | `string` | 标签文字颜色 |
| 背景色 | `proChartSetting.series[n].lineSetting.label.backgroundColor` | `string` | 标签背景颜色 |
| 字体粗细 | `proChartSetting.series[n].lineSetting.label.fontWeight` | `string` | `'normal'`, `'bold'`, `'bolder'`, `'lighter'` |
| 字体 | `proChartSetting.series[n].lineSetting.label.fontFamily` | `string` | 字体族 |
| 字号 | `proChartSetting.series[n].lineSetting.label.fontSize` | `number/string` | 字体大小 |
| 水平对齐 | `proChartSetting.series[n].lineSetting.label.align` | `string` | `'left'`, `'center'`, `'right'` |
| 垂直对齐 | `proChartSetting.series[n].lineSetting.label.verticalAlign` | `string` | `'top'`, `'middle'`, `'bottom'` |
| 描边宽度 | `proChartSetting.series[n].lineSetting.label.borderWidth` | `number` | 标签边框宽度 |
| 描边颜色 | `proChartSetting.series[n].lineSetting.label.borderColor` | `string` | 标签边框颜色 |
| 描边圆角 | `proChartSetting.series[n].lineSetting.label.borderRadius` | `number` | 标签边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].lineSetting.label.shadowColor` | `string` | 阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].lineSetting.label.shadowBlur` | `number` | 阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].lineSetting.label.shadowOffsetX` | `number` | 阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].lineSetting.label.shadowOffsetY` | `number` | 阴影垂直偏移 |
| **线条样式** | | | |
| 图形的颜色 | `proChartSetting.series[n].itemStyle.color` | `string` | 折线颜色 |
| 边框颜色 | `proChartSetting.series[n].itemStyle.borderColor` | `string` | 线条边框颜色 |
| 描边类型 | `proChartSetting.series[n].lineSetting.lineStyle.type` | `string` | `'solid'`, `'dashed'`, `'dotted'` |
| 描边宽度 | `proChartSetting.series[n].lineSetting.lineStyle.width` | `number` | 线条宽度 |
| 透明度 | `proChartSetting.series[n].itemStyle.opacity` | `number` | 透明度 (0-1) |
| **标签布局** | | | |
| 隐藏重叠的标签 | `proChartSetting.series[n].labelLayout.hideOverlap` | `boolean` | 是否隐藏重叠标签 |
| 重叠式偏移方向 | `proChartSetting.series[n].labelLayout.moveOverlap` | `string` | 重叠时移动方向 |
| **高亮设置** | | | |
| 禁用高亮 | `proChartSetting.series[n].emphasis.disabled` | `boolean` | 是否禁用高亮 |
| 高亮时行为 | `proChartSetting.series[n].emphasis.focus` | `string` | `'self'`, `'series'`, `'none'` |
| 淡出的范围 | `proChartSetting.series[n].emphasis.blurScope` | `string` | `'coordinateSystem'`, `'series'`, `'global'` |
| **面积图设置** | | | |
| 启用面积 | `proChartSetting.series[n].lineSetting.areaStyle` | `object` | 不为空则启用面积填充 |
| 填充模式 | `proChartSetting.series[n].lineSetting.areaStyle.origin` | `string` | `'auto'`, `'start'`, `'end'` |
| 颜色 | `proChartSetting.series[n].lineSetting.areaStyle.color` | `string/object` | 填充颜色或渐变 |
| 不透明度 | `proChartSetting.series[n].lineSetting.areaStyle.opacity` | `number` | 填充透明度 (0-1) |
| **堆叠设置** | | | |
| 堆叠标识 | `proChartSetting.series[n].lineSetting.stack` | `string` | 相同标识的图表会堆叠 |
| 堆叠策略 | `proChartSetting.series[n].lineSetting.stackStrategy` | `string` | `'all'`, `'positive'`, `'negative'`（如需配置） |

## 堆叠配置

### 堆叠规则说明

堆叠是指将多个图表数值叠加在一起，形成一个新的图表的展示方式。堆叠常用于`柱状图堆叠`和`折线图面积堆叠`两种方式中，相比于柱状图堆叠，折线图面积堆叠更适用于在分组数量较多的场景中使用，需要注意的是折线图面积堆叠`不适用于带有负值的数据集`。

其中折线图面积堆叠是指将多个数据集绘制为垂直堆叠的区域，堆叠面积图和基本面积图一样，唯一的区别就是图上每一个数据集的起点不同，起点是基于前一个数据集，用于显示每个数值所占大小随时间或类别变化的趋势线，展示的是部分与整体的关系。

**重要规则：** 当需要实现堆叠效果时，必须为每一个堆叠系列单独创建一个数据源和一个对应的图表实例。在图表列表`series`的每一项中`datasetIndex`对应数据源的索引，每个图表的`datasetIndex`值应该与对应数据源的下标一一对应。

### 堆叠配置项
| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 堆叠标识 | 可分别设置每个图表的堆叠标识符，系统会将标识符相同的图表形状堆叠在一起。 | `stack` |
| 堆叠策略 | 根据图表数值的正负，可设置堆叠的不同取值策略。 | `stackStrategy` |

### 堆叠示例
**示例：** 要用折线图显示"每个部门的每月销售额趋势"，则需要为"部门A"、"部门B"等每个部门分别创建独立的数据源和图表：
- 部门A数据源在`dataset`中下标为0，部门B数据源下标为1
- 对应的折线图配置中`datasetIndex`需要分别设置为0和1
- 设置相同的`stack`值来实现堆叠效果

## 事件配置
| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 不可点击 | 开启后该图表内所有标签数据无法进行点击，关闭后可设置对应的数据点击交互事件 | `silent` |
| 点击后调用自动化 | 可通过选择对应的自动化实现相关数据标签单击交互事件，如点击后打开对应的数据表单详情或者打开其他网页链接等 | `eventHandlers.click` |
| 双击后调用自动化 | 功能与点击调用相同，交互由单击触发改为双击触发，可同时设置点击、双击事件 | `eventHandlers.dblclick` |

## 极坐标补充
极坐标简单来说就是用角度和长度描述位置的坐标系，与折线图、柱状图在直角坐标系中的展示效果有明显差异，一般可以在柱状图、折线图、散点图三种图表中选择极坐标系进行使用。

极坐标在使用时需先了解以下内容：
极坐标系一般有两个坐标轴，分别称`极径`和`极角`，分别对应极坐标的径向（即半径）轴线和角度（即圆弧）轴线。同时坐标轴度量类型也有四种类型选择，分别是`数值轴`、`类目轴`、`时间轴`、`对数轴`四种，选择不同类型的坐标轴，则图表对应展示的数据刻度不同，四种坐标轴使用场景如下：

| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 数值轴 | 'value'： 数值轴，适用于连续数据，通过半径的长短表示数值的大小。 | `radiusAxis.type: 'value'` |
| 类目轴 | 'category'： 类目轴，适用于离散的类目数据，通过固定的半径长度表示各个分类值 | `angleAxis.type: 'category'` |
| 时间轴 | 'time'： 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，半径反映的是时间点的顺序变化。 | `radiusAxis.type: 'time'` |
| 对数轴 | 'log'： 对数轴，适用于对数数据，常用在折线图中做双数值轴呈现。 | `radiusAxis.type: 'log'` |

## 重要规则说明

### 1. 数据源字段匹配规则
- **字段来源**：`encode` 中使用的字段必须存在于对应 `dataset` 的 `dimensionList` 中
- **聚合字段命名**：如果启用聚合查询（`aggregation=true`），字段 ID 格式为 `字段ID_函数名`，如 `sales_sum`
- **禁止聚合字段**：`id` 和 `seq` 字段不能用于聚合

### 2. 堆叠图表实现
- 每个堆叠系列需要独立的数据源和图表实例
- 示例：显示“每个员工的每种打卡类型数量”，需要为每种打卡类型创建独立的数据源
- 数据源在 `dataset` 数组中的索引必须与 `series.lineSetting.datasetIndex` 对应

### 3. 多坐标系支持
- 支持直角坐标系（X/Y轴）和极坐标系（角度/半径轴）
- 极坐标配置在 `proChartSetting.angleAxis` 和 `proChartSetting.radiusAxis` 中
- 折线图可通过 `xAxisIndex` 和 `yAxisIndex` 引用特定坐标轴

### 4. 样式优先级
- 图表标题位置必须明确设置，避免与图例重叠
- `cardStyle.titlePosition` 控制卡片标题位置
- `proChartSetting.title.left/top` 控制图表标题位置


# 柱状图

**柱状图**是一种以宽度相同的长方形长度为变量的统计图表。

一般来说，柱形图只有一个变量，比较适用于较小数据集的分析。长方形柱条一般用于显示变量各个水平的计数值，通过观察图形的长短和变化波动，得到一个或多个柱状数据变量之间的差异情况，从而反馈得到数据的稳定性、差异量等情况，从而对实际业务进行指导优化。

**优势：** 柱形图简单直观，很容易根据柱子的长短看出值的大小，易于比较各组数据之间的差别。

**缺点：** 柱状图不适合用于表达趋势的数据，这种数据更适合用折线图或者面积图，也不适合用于表达占比的数据，这种数据更适合用于饼图。

## 配置结构对应关系

以下设置项对应 `_save_dashboard_prochart_card` 文档中 `proChartSetting.series[n].barSetting` 及相关配置字段：

| 用户界面设置项 | 对应 JSON 字段路径 | 类型/枚举值 | 说明 |
|----------------|-------------------|-------------|------|
| **数据设置** | | | |
| 数据源 | `proChartSetting.dataset[n].id`<br>`proChartSetting.series[n].barSetting.datasetIndex` | `integer` | 选择数据源索引，必须与 `dataset` 数组下标对应 |
| 坐标系类型 | `proChartSetting.series[n].xAxisIndex`<br>`proChartSetting.series[n].yAxisIndex` | `integer` | 通过索引引用对应的坐标轴配置 |
| 名称字段 | `proChartSetting.series[n].barSetting.encode.seriesName` | `array<string>` | 用于图例显示的字段名 |
| 横轴字段 | `proChartSetting.series[n].barSetting.encode.x` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| 纵轴字段 | `proChartSetting.series[n].barSetting.encode.y` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| **图表设置** | | | |
| X坐标轴 | `proChartSetting.xAxis` | `array<object>` | 支持多个X轴配置 |
| Y坐标轴 | `proChartSetting.yAxis` | `array<object>` | 支持多个Y轴配置 |
| 颜色分配类型 | `proChartSetting.series[n].colorBy` | `string` | `'data'` 或 `'series'` |
| 柱条的宽度 | `proChartSetting.series[n].barSetting.barWidth` | `string/number` | 柱条宽度（如 `'40%'` 或像素值） |
| 柱条的最大宽度 | `proChartSetting.series[n].barSetting.barMaxWidth` | `string/number` | 柱条最大宽度 |
| 柱条的最小宽度 | `proChartSetting.series[n].barSetting.barMinWidth` | `string/number` | 柱条最小宽度 |
| 柱条的最小高度 | `proChartSetting.series[n].barSetting.barMinHeight` | `number` | 柱条最小高度（像素） |
| 不同图表柱间距离 | `proChartSetting.series[n].barSetting.barGap` | `string` | 不同系列柱条间距（如 `'30%'`） |
| 同一图表柱间距离 | `proChartSetting.series[n].barSetting.barCategoryGap` | `string` | 同一系列柱条间距（如 `'20%'`） |
| **标签设置** | | | |
| 显示标签 | `proChartSetting.series[n].barSetting.label.show` | `boolean` | 是否显示数据标签 |
| 显示内容表达式 | `proChartSetting.series[n].barSetting.label.formatter` | `string` | ECharts 格式化字符串，如 `'{c}'` |
| 位置 | `proChartSetting.series[n].barSetting.label.position` | `string` | `'top'`, `'insideTop'`, `'inside'`, `'right'` 等 |
| 距离图形的距离 | `proChartSetting.series[n].barSetting.label.distance` | `number` | 标签与柱条的距离 |
| 标签旋转 | `proChartSetting.series[n].barSetting.label.rotate` | `number` | 标签旋转角度 |
| 文字偏移X | `proChartSetting.series[n].barSetting.label.offset[0]` | `number` | 水平偏移量 |
| 文字偏移Y | `proChartSetting.series[n].barSetting.label.offset[1]` | `number` | 垂直偏移量 |
| 颜色 | `proChartSetting.series[n].barSetting.label.color` | `string` | 标签文字颜色 |
| 背景色 | `proChartSetting.series[n].barSetting.label.backgroundColor` | `string` | 标签背景颜色 |
| 字体粗细 | `proChartSetting.series[n].barSetting.label.fontWeight` | `string` | `'normal'`, `'bold'`, `'bolder'`, `'lighter'` |
| 字体 | `proChartSetting.series[n].barSetting.label.fontFamily` | `string` | 字体族 |
| 字号 | `proChartSetting.series[n].barSetting.label.fontSize` | `number/string` | 字体大小 |
| 水平对齐 | `proChartSetting.series[n].barSetting.label.align` | `string` | `'left'`, `'center'`, `'right'` |
| 垂直对齐 | `proChartSetting.series[n].barSetting.label.verticalAlign` | `string` | `'top'`, `'middle'`, `'bottom'` |
| 描边宽度 | `proChartSetting.series[n].barSetting.label.borderWidth` | `number` | 标签边框宽度 |
| 描边颜色 | `proChartSetting.series[n].barSetting.label.borderColor` | `string` | 标签边框颜色 |
| 描边圆角 | `proChartSetting.series[n].barSetting.label.borderRadius` | `number` | 标签边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].barSetting.label.shadowColor` | `string` | 阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].barSetting.label.shadowBlur` | `number` | 阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].barSetting.label.shadowOffsetX` | `number` | 阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].barSetting.label.shadowOffsetY` | `number` | 阴影垂直偏移 |
| **柱条样式** | | | |
| 颜色 | `proChartSetting.series[n].barSetting.itemStyle.color` | `string` | 柱条颜色 |
| 边框颜色 | `proChartSetting.series[n].barSetting.itemStyle.borderColor` | `string` | 柱条边框颜色 |
| 描边类型 | `proChartSetting.series[n].barSetting.itemStyle.borderType` | `string` | `'solid'`, `'dashed'`, `'dotted'` |
| 描边宽度 | `proChartSetting.series[n].barSetting.itemStyle.borderWidth` | `number` | 柱条边框宽度 |
| 描边圆角 | `proChartSetting.series[n].barSetting.itemStyle.borderRadius` | `number/array` | 柱条圆角半径 |
| 透明度 | `proChartSetting.series[n].barSetting.itemStyle.opacity` | `number` | 柱条透明度 (0-1) |
| **标签布局** | | | |
| 隐藏重叠的标签 | `proChartSetting.series[n].labelLayout.hideOverlap` | `boolean` | 是否隐藏重叠标签 |
| 重叠式偏移方向 | `proChartSetting.series[n].labelLayout.moveOverlap` | `string` | 重叠时移动方向 |
| **高亮设置** | | | |
| 禁用高亮 | `proChartSetting.series[n].emphasis.disabled` | `boolean` | 是否禁用高亮 |
| 高亮时行为 | `proChartSetting.series[n].emphasis.focus` | `string` | `'self'`, `'series'`, `'none'` |
| 淡出的范围 | `proChartSetting.series[n].emphasis.blurScope` | `string` | `'coordinateSystem'`, `'series'`, `'global'` |
| **背景设置** | | | |
| 显示柱条背景 | `proChartSetting.series[n].barSetting.showBackground` | `boolean` | 是否显示柱条背景 |
| 背景颜色 | `proChartSetting.series[n].barSetting.backgroundStyle.color` | `string` | 柱条背景颜色 |
| 背景边框颜色 | `proChartSetting.series[n].barSetting.backgroundStyle.borderColor` | `string` | 背景边框颜色 |
| 背景边框宽度 | `proChartSetting.series[n].barSetting.backgroundStyle.borderWidth` | `number` | 背景边框宽度 |

## 堆叠配置

### 堆叠规则说明

堆叠是指将多个图表数值叠加在一起，形成一个新的图表的展示方式。其中柱状图表的柱形条叠在一个柱形条上，得到一个新的柱状条即为柱状图堆叠。堆叠柱状图可以形象地展示一个大分类包含的每个小分类的数据，以及各个小分类的占比，显示的是单个项目与整体之间的关系。

**重要规则：** 当需要实现堆叠效果时，必须为每一个堆叠系列单独创建一个数据源和一个对应的图表实例。在图表列表`series`的每一项中`datasetIndex`对应数据源的索引，每个图表的`datasetIndex`值应该与对应数据源的下标一一对应。

### 堆叠配置项
| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 堆叠标识 | 可分别设置每个图表的堆叠标识符，系统会将标识符相同的图表形状堆叠在一起。 | `stack` |
| 堆叠策略 | 根据图表数值的正负，可设置堆叠的不同取值策略。 | `stackStrategy` |

### 堆叠示例
**示例：** 要用柱状图显示"每个部门的每月销售额"，则需要为"部门A"、"部门B"等每个部门分别创建独立的数据源和图表：
- 部门A数据源在`dataset`中下标为0，部门B数据源下标为1
- 对应的柱状图配置中`datasetIndex`需要分别设置为0和1
- 设置相同的`stack`值来实现堆叠效果

## 事件配置
| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 不可点击 | 开启后该图表内所有标签数据无法进行点击，关闭后可设置对应的数据点击交互事件 | `silent` |
| 点击后调用自动化 | 可通过选择对应的自动化实现相关数据标签单击交互事件，如点击后打开对应的数据表单详情或者打开其他网页链接等 | `eventHandlers.click` |
| 双击后调用自动化 | 功能与点击调用相同，交互由单击触发改为双击触发，可同时设置点击、双击事件 | `eventHandlers.dblclick` |

## 极坐标补充

极坐标简单来说就是用角度和长度描述位置的坐标系，与折线图、柱状图在直角坐标系中的展示效果有明显差异，一般可以在柱状图、折线图、散点图三种图表中选择极坐标系进行使用。

### 极坐标轴类型
| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 数值轴 | 数值轴，适用于连续数据，通过半径的长短表示数值的大小 | `radiusAxis.type: 'value'` |
| 类目轴 | 类目轴，适用于离散的类目数据，通过固定的半径长度表示各个分类值 | `angleAxis.type: 'category'` |
| 时间轴 | 时间轴，适用于连续的时序数据，半径反映的是时间点的顺序变化 | `radiusAxis.type: 'time'` |
| 对数轴 | 对数轴，适用于对数数据，常用在折线图中做双数值轴呈现 | `radiusAxis.type: 'log'` |


# 饼图

**饼图**也称馅饼图，用扇形的面积，也就是圆心角的度数来表示变量的计数或百分比。圆饼图主要用来表示组数不多的资料或间断性数量资料的内部构成，且各部份百分比之和必须是100%。

饼图主要用于名义型或分类型数据，便于用户了解变量的部分与整体之间的关系，根据圆中各个扇形面积的大小，判断某一部分在总体中所占比例的多少。当变量拥有多个水平时，条形图或堆叠填充条形图可以为数据提供更好的可视化展示。

**优势：** 饼图由于采用图形方式的特殊性，展示图形效果更直观，更易于展示占比情况。

**缺点：** 饼图不适合用于数据分类过多、存在负值和零值的数据展示。当数据的比例相差比较接近时，人眼判别有难度的，则建议用环形图、3D 饼图。

## 配置结构对应关系

以下设置项对应 `_save_dashboard_prochart_card` 文档中 `proChartSetting.series[n].pieSetting` 及相关配置字段：

| 用户界面设置项 | 对应 JSON 字段路径 | 类型/枚举值 | 说明 |
|----------------|-------------------|-------------|------|
| **数据设置** | | | |
| 数据源 | `proChartSetting.dataset[n].id`<br>`proChartSetting.series[n].pieSetting.datasetIndex` | `integer` | 选择数据源索引，必须与 `dataset` 数组下标对应 |
| 名称字段 | `proChartSetting.series[n].pieSetting.encode.itemName` | `string` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| 值字段 | `proChartSetting.series[n].pieSetting.encode.value` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| **图表设置** | | | |
| 颜色分配类型 | `proChartSetting.series[n].colorBy` | `string` | `'data'` 或 `'series'` |
| 顺时针排列 | `proChartSetting.series[n].pieSetting.clockwise` | `boolean` | 是否顺时针排列扇形 |
| 玫瑰图样式 | `proChartSetting.series[n].pieSetting.roseType` | `string` | `'radius'`（扇区圆心角展现数据的百分比）、`'area'`（所有扇区圆心角相同）、`null`（普通饼图） |
| 防止标签重叠 | `proChartSetting.series[n].pieSetting.avoidLabelOverlap` | `boolean` | 是否启用防止标签重叠的自适应布局 |
| 内半径 | `proChartSetting.series[n].pieSetting.radius[0]` | `string` | 内圆半径（如 `'0%'`、`'40%'`） |
| 外半径 | `proChartSetting.series[n].pieSetting.radius[1]` | `string` | 外圆半径（如 `'75%'`、`'100%'`） |
| 中心点X | `proChartSetting.series[n].pieSetting.center[0]` | `string` | 圆心水平位置（如 `'50%'`、`'200'`） |
| 中心点Y | `proChartSetting.series[n].pieSetting.center[1]` | `string` | 圆心垂直位置（如 `'50%'`、`'300'`） |
| 层叠顺序 | `proChartSetting.series[n].z` | `number` | 图表的展示优先层级 |
| 左侧 | `proChartSetting.series[n].left` | `string/number` | 图表距离容器左侧的距离 |
| 右侧 | `proChartSetting.series[n].right` | `string/number` | 图表距离容器右侧的距离 |
| 顶部 | `proChartSetting.series[n].top` | `string/number` | 图表距离容器顶部的距离 |
| 底部 | `proChartSetting.series[n].bottom` | `string/number` | 图表距离容器底部的距离 |
| 宽度 | `proChartSetting.series[n].width` | `string/number` | 图表宽度，不填则自适应 |
| 高度 | `proChartSetting.series[n].height` | `string/number` | 图表高度，不填则自适应 |
| 显示标签线 | `proChartSetting.series[n].pieSetting.labelLine.show` | `boolean` | 是否显示标签引导线 |
| 显示在图形上方 | `proChartSetting.series[n].pieSetting.label.position` | `string` | `'inside'`、`'outside'`、`'center'` |
| 平滑线段 | `proChartSetting.series[n].pieSetting.labelLine.smooth` | `boolean` | 标签引导线是否为平滑效果 |
| **标签设置** | | | |
| 显示标签 | `proChartSetting.series[n].pieSetting.label.show` | `boolean` | 是否显示数据标签 |
| 显示内容表达式 | `proChartSetting.series[n].pieSetting.label.formatter` | `string` | ECharts 格式化字符串，如 `'{b}: {c} ({d}%)'` |
| 位置 | `proChartSetting.series[n].pieSetting.label.position` | `string` | `'inside'`、`'outside'`、`'center'` |
| 距离图形的距离 | `proChartSetting.series[n].pieSetting.label.distance` | `number` | 标签与扇形的距离 |
| 标签旋转 | `proChartSetting.series[n].pieSetting.label.rotate` | `number` | 标签旋转角度 |
| 文字偏移X | `proChartSetting.series[n].pieSetting.label.offset[0]` | `number` | 水平偏移量 |
| 文字偏移Y | `proChartSetting.series[n].pieSetting.label.offset[1]` | `number` | 垂直偏移量 |
| 颜色 | `proChartSetting.series[n].pieSetting.label.color` | `string` | 标签文字颜色 |
| 背景色 | `proChartSetting.series[n].pieSetting.label.backgroundColor` | `string` | 标签背景颜色 |
| 字体粗细 | `proChartSetting.series[n].pieSetting.label.fontWeight` | `string` | `'normal'`, `'bold'`, `'bolder'`, `'lighter'` |
| 字体 | `proChartSetting.series[n].pieSetting.label.fontFamily` | `string` | 字体族 |
| 字号 | `proChartSetting.series[n].pieSetting.label.fontSize` | `number/string` | 字体大小 |
| 水平对齐 | `proChartSetting.series[n].pieSetting.label.align` | `string` | `'left'`, `'center'`, `'right'` |
| 垂直对齐 | `proChartSetting.series[n].pieSetting.label.verticalAlign` | `string` | `'top'`, `'middle'`, `'bottom'` |
| 描边宽度 | `proChartSetting.series[n].pieSetting.label.borderWidth` | `number` | 标签边框宽度 |
| 描边颜色 | `proChartSetting.series[n].pieSetting.label.borderColor` | `string` | 标签边框颜色 |
| 描边圆角 | `proChartSetting.series[n].pieSetting.label.borderRadius` | `number` | 标签边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].pieSetting.label.shadowColor` | `string` | 阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].pieSetting.label.shadowBlur` | `number` | 阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].pieSetting.label.shadowOffsetX` | `number` | 阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].pieSetting.label.shadowOffsetY` | `number` | 阴影垂直偏移 |
| **扇区样式** | | | |
| 颜色 | `proChartSetting.series[n].itemStyle.color` | `string` | 扇形颜色 |
| 边框颜色 | `proChartSetting.series[n].itemStyle.borderColor` | `string` | 扇形边框颜色 |
| 描边类型 | `proChartSetting.series[n].itemStyle.borderType` | `string` | `'solid'`, `'dashed'`, `'dotted'` |
| 描边宽度 | `proChartSetting.series[n].itemStyle.borderWidth` | `number` | 扇形边框宽度 |
| 描边圆角 | `proChartSetting.series[n].itemStyle.borderRadius` | `number` | 扇形边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].itemStyle.shadowColor` | `string` | 扇形阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].itemStyle.shadowBlur` | `number` | 扇形阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetX` | `number` | 扇形阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetY` | `number` | 扇形阴影垂直偏移 |
| 透明度 | `proChartSetting.series[n].itemStyle.opacity` | `number` | 扇形透明度 (0-1) |
| **标签布局** | | | |
| 隐藏重叠的标签 | `proChartSetting.series[n].labelLayout.hideOverlap` | `boolean` | 是否隐藏重叠标签 |
| 重叠式偏移方向 | `proChartSetting.series[n].labelLayout.moveOverlap` | `string` | 重叠时移动方向 |
| **高亮设置** | | | |
| 禁用高亮 | `proChartSetting.series[n].emphasis.disabled` | `boolean` | 是否禁用高亮 |
| 高亮时行为 | `proChartSetting.series[n].emphasis.focus` | `string` | `'self'`, `'series'`, `'none'` |
| 淡出的范围 | `proChartSetting.series[n].emphasis.blurScope` | `string` | `'coordinateSystem'`, `'series'`, `'global'` |

## 环形图与玫瑰图配置

### 环形图配置
环形图是饼图的一种变体，通过设置内半径大于0来实现：
```json
{
  "proChartSetting": {
    "series": [{
      "type": "pie",
      "pieSetting": {
        "radius": ["40%", "70%"],  // 内半径40%，外半径70%
        "center": ["50%", "50%"]
      }
    }]
  }
}
```

### 玫瑰图配置

玫瑰图通过 `roseType` 参数配置：

- **面积玫瑰图**：`roseType: 'area'` - 所有扇区圆心角相同，半径不同
- **半径玫瑰图**：`roseType: 'radius'` - 扇区圆心角展现数据的百分比

```json
{
  "proChartSetting": {
    "series": [{
      "type": "pie",
      "pieSetting": {
        "roseType": "radius",
        "radius": ["30%", "90%"]
      }
    }]
  }
}
```

## 重要规则说明

### 1. 数据源字段匹配规则
- **字段来源**：`encode` 中使用的 `itemName` 和 `value` 字段必须存在于对应 `dataset` 的 `dimensionList` 中
- **聚合字段命名**：如果启用聚合查询（`aggregation=true`），值字段的 ID 格式为 `字段ID_函数名`，如 `sales_sum`
- **禁止聚合字段**：`id` 和 `seq` 字段不能用于聚合
- **数据类型要求**：饼图的值字段应为数值类型

### 2. 多饼图配置
- 可以在一个卡片中配置多个饼图系列
- 每个饼图系列可以引用不同的数据源（通过 `datasetIndex` 指定）
- 通过 `center`、`radius`、`width`、`height` 等参数控制每个饼图的位置和大小

### 3. 标签与引导线配置
- 饼图标签默认显示在扇形外部
- 当 `label.position` 设置为 `'inside'` 时，标签显示在扇形内部
- `labelLine` 配置标签引导线的样式和显示
- `avoidLabelOverlap` 可以自动调整标签位置避免重叠

### 4. 样式配置规则
- 图表标题位置必须明确设置，避免与图例重叠
- `cardStyle.titlePosition` 控制卡片标题位置
- `proChartSetting.title.left/top` 控制图表标题位置
- 饼图颜色可以通过 `itemStyle.color` 单独设置，或通过调色盘统一配置

## 最佳实践建议

### 1. 数据量控制
- 饼图适合展示 **3-8** 个数据分类
- 分类过多会导致扇形过小，影响可读性
- 对于过多分类，建议：
    - 将小比例数据合并为"其他"类别
    - 使用条形图替代
    - 使用多个饼图分组展示

### 2. 百分比显示
- 建议在标签中显示百分比，格式：`{b}: {c} ({d}%)`
- 确保各扇形百分比之和为100%（系统会自动计算）

### 3. 颜色使用
- 使用对比明显的颜色区分不同扇形
- 相邻扇形避免使用相似颜色
- 可以通过调色盘统一配置颜色主题

### 4. 环形图使用场景
- 当需要强调中间区域时使用环形图
- 环形图中间可以放置总计数据或其他重要信息
- 通过调整内半径控制环形的宽度

### 5. 交互优化
- 默认启用 `tooltip` 显示详细信息
- 考虑启用选中效果（`selectedMode`）突出重点数据
- 对于复杂饼图，可以启用高亮淡出效果

# 散点图

**散点图**又叫相关图，它是将两个可能相关的变数资料用点画在坐标图上，通过观察因变量（纵轴数值）随自变量（横轴数值）变化的的大致趋势，用于研究一种变量与其他变量之间的相互关系的图表。

当不知道两个因素之间的关系或两个因素之间关系在认识上比较模糊而需要对这两个因素之间的关系进行调查和确认时，可以通过散点图来确认二者之间的关系。需要强调的是，在使用散点图调查两个因素之间的关系时，应尽可能固定对这两个因素有影响的其他因素，才能使通过散点图得到的结果比较准确。

**优势：** 对于处理值的分布和数据点的分簇，散点图都很理想。

**缺点：** 散点图看上去比较乱，基本上只能看相关、分布和聚合，其他信息均不能很好展现。

## 配置结构对应关系

以下设置项对应 `_save_dashboard_prochart_card` 文档中 `proChartSetting.series[n].scatterSetting` 及相关配置字段：

| 用户界面设置项 | 对应 JSON 字段路径 | 类型/枚举值 | 说明 |
|----------------|-------------------|-------------|------|
| **数据设置** | | | |
| 数据源 | `proChartSetting.dataset[n].id`<br>`proChartSetting.series[n].scatterSetting.datasetIndex` | `integer` | 选择数据源索引，必须与 `dataset` 数组下标对应 |
| 坐标系类型 | `proChartSetting.series[n].xAxisIndex`<br>`proChartSetting.series[n].yAxisIndex` | `integer` | 通过索引引用对应的坐标轴配置 |
| 名称字段 | `proChartSetting.series[n].scatterSetting.encode.seriesName` | `array<string>` | 用于图例显示的字段名 |
| 横轴字段 | `proChartSetting.series[n].scatterSetting.encode.x` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| 纵轴字段 | `proChartSetting.series[n].scatterSetting.encode.y` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| **图表设置** | | | |
| X坐标轴 | `proChartSetting.xAxis` | `array<object>` | 支持多个X轴配置 |
| Y坐标轴 | `proChartSetting.yAxis` | `array<object>` | 支持多个Y轴配置 |
| 颜色分配类型 | `proChartSetting.series[n].colorBy` | `string` | `'data'` 或 `'series'` |
| 图形样式 | `proChartSetting.series[n].scatterSetting.symbol` | `string` | `'circle'`, `'rect'`, `'roundRect'`, `'triangle'`, `'diamond'`, `'pin'`, `'arrow'`, `'none'` |
| 图形大小 | `proChartSetting.series[n].scatterSetting.symbolSize` | `number` | 散点图形大小 |
| 图形旋转角度 | `proChartSetting.series[n].scatterSetting.symbolRotate` | `number` | 散点图形旋转角度 |
| **标签设置** | | | |
| 显示标签 | `proChartSetting.series[n].scatterSetting.label.show` | `boolean` | 是否显示数据标签 |
| 显示内容表达式 | `proChartSetting.series[n].scatterSetting.label.formatter` | `string` | ECharts 格式化字符串 |
| 位置 | `proChartSetting.series[n].scatterSetting.label.position` | `string` | `'top'`, `'left'`, `'right'`, `'bottom'`, `'inside'` 等 |
| 距离图形的距离 | `proChartSetting.series[n].scatterSetting.label.distance` | `number` | 标签与散点的距离 |
| 标签旋转 | `proChartSetting.series[n].scatterSetting.label.rotate` | `number` | 标签旋转角度 |
| 文字偏移X | `proChartSetting.series[n].scatterSetting.label.offset[0]` | `number` | 水平偏移量 |
| 文字偏移Y | `proChartSetting.series[n].scatterSetting.label.offset[1]` | `number` | 垂直偏移量 |
| 颜色 | `proChartSetting.series[n].scatterSetting.label.color` | `string` | 标签文字颜色 |
| 背景色 | `proChartSetting.series[n].scatterSetting.label.backgroundColor` | `string` | 标签背景颜色 |
| 字体粗细 | `proChartSetting.series[n].scatterSetting.label.fontWeight` | `string` | `'normal'`, `'bold'`, `'bolder'`, `'lighter'` |
| 字体 | `proChartSetting.series[n].scatterSetting.label.fontFamily` | `string` | 字体族 |
| 字号 | `proChartSetting.series[n].scatterSetting.label.fontSize` | `number/string` | 字体大小 |
| 水平对齐 | `proChartSetting.series[n].scatterSetting.label.align` | `string` | `'left'`, `'center'`, `'right'` |
| 垂直对齐 | `proChartSetting.series[n].scatterSetting.label.verticalAlign` | `string` | `'top'`, `'middle'`, `'bottom'` |
| 描边宽度 | `proChartSetting.series[n].scatterSetting.label.borderWidth` | `number` | 标签边框宽度 |
| 描边颜色 | `proChartSetting.series[n].scatterSetting.label.borderColor` | `string` | 标签边框颜色 |
| 描边圆角 | `proChartSetting.series[n].scatterSetting.label.borderRadius` | `number` | 标签边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].scatterSetting.label.shadowColor` | `string` | 阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].scatterSetting.label.shadowBlur` | `number` | 阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].scatterSetting.label.shadowOffsetX` | `number` | 阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].scatterSetting.label.shadowOffsetY` | `number` | 阴影垂直偏移 |
| **散点样式** | | | |
| 颜色 | `proChartSetting.series[n].itemStyle.color` | `string` | 散点颜色 |
| 边框颜色 | `proChartSetting.series[n].itemStyle.borderColor` | `string` | 散点边框颜色 |
| 描边类型 | `proChartSetting.series[n].itemStyle.borderType` | `string` | `'solid'`, `'dashed'`, `'dotted'` |
| 描边宽度 | `proChartSetting.series[n].itemStyle.borderWidth` | `number` | 散点边框宽度 |
| 描边圆角 | `proChartSetting.series[n].itemStyle.borderRadius` | `number` | 散点边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].itemStyle.shadowColor` | `string` | 散点阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].itemStyle.shadowBlur` | `number` | 散点阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetX` | `number` | 散点阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetY` | `number` | 散点阴影垂直偏移 |
| 透明度 | `proChartSetting.series[n].itemStyle.opacity` | `number` | 散点透明度 (0-1) |
| **标签布局** | | | |
| 隐藏重叠的标签 | `proChartSetting.series[n].labelLayout.hideOverlap` | `boolean` | 是否隐藏重叠标签 |
| 重叠式偏移方向 | `proChartSetting.series[n].labelLayout.moveOverlap` | `string` | 重叠时移动方向 |
| **高亮设置** | | | |
| 禁用高亮 | `proChartSetting.series[n].emphasis.disabled` | `boolean` | 是否禁用高亮 |
| 高亮时行为 | `proChartSetting.series[n].emphasis.focus` | `string` | `'self'`, `'series'`, `'none'` |
| 淡出的范围 | `proChartSetting.series[n].emphasis.blurScope` | `string` | `'coordinateSystem'`, `'series'`, `'global'` |

## 气泡图配置

### 气泡图实现原理
散点图可通过 `symbolSize` 字段实现气泡图效果：
- **固定大小**：`symbolSize: 10` - 所有散点大小相同
- **动态大小**：`symbolSize` 绑定到数据字段，实现气泡图

### 气泡图配置示例
```json
{
  "proChartSetting": {
    "series": [{
      "type": "scatter",
      "scatterSetting": {
        "datasetIndex": 0,
        "encode": {
          "x": ["sales"],
          "y": ["profit"],
          "value": ["market_share"]  // 用于控制气泡大小
        },
        "symbolSize": function(data) {
          return Math.sqrt(data[2]) * 5;  // 根据市场占有率计算气泡大小
        }
      }
    }]
  }
}
```

## 极坐标补充

极坐标简单来说就是用角度和长度描述位置的坐标系，与折线图、柱状图在直角坐标系中的展示效果有明显差异，一般可以在柱状图、折线图、散点图三种图表中选择极坐标系进行使用。

### 极坐标轴类型

| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 数值轴 | 数值轴，适用于连续数据，通过半径的长短表示数值的大小 | `radiusAxis.type: 'value'` |
| 类目轴 | 类目轴，适用于离散的类目数据，通过固定的半径长度表示各个分类值 | `angleAxis.type: 'category'` |
| 时间轴 | 时间轴，适用于连续的时序数据，半径反映的是时间点的顺序变化 | `radiusAxis.type: 'time'` |
| 对数轴 | 对数轴，适用于对数数据，常用在折线图中做双数值轴呈现 | `radiusAxis.type: 'log'` |

## 重要规则说明

### 1. 数据源字段匹配规则
- **字段来源**：`encode` 中使用的 `x` 和 `y` 字段必须存在于对应 `dataset` 的 `dimensionList` 中
- **聚合字段命名**：如果启用聚合查询（`aggregation=true`），字段 ID 格式为 `字段ID_函数名`，如 `sales_avg`
- **禁止聚合字段**：`id` 和 `seq` 字段不能用于聚合
- **数据类型要求**：散点图的 X 轴和 Y 轴字段通常为数值类型

### 2. 多数据源配置
- 可以在一个散点图系列中引用多个数据源
- 通过 `datasetIndex` 指定每个系列使用的数据源
- 支持在同一坐标系中展示多个数据集的散点分布

### 3. 气泡图实现
- 通过 `symbolSize` 绑定到数据字段实现气泡图效果
- `symbolSize` 可以是固定值、数据字段引用或函数
- 气泡图适合展示三个维度的数据（X、Y、大小）

### 4. 样式配置规则
- 图表标题位置必须明确设置，避免与图例重叠
- `cardStyle.titlePosition` 控制卡片标题位置
- `proChartSetting.title.left/top` 控制图表标题位置
- 散点颜色可以通过 `itemStyle.color` 单独设置，或通过调色盘统一配置

## 最佳实践建议

### 1. 数据量控制
- 散点图适合展示 **100-1000** 个数据点
- 数据点过多会导致重叠严重，影响可读性
- 对于大数据量，建议：
    - 使用透明度 (`opacity`) 避免完全重叠
    - 启用数据筛选和缩放 (`dataZoom`)
    - 使用聚类分析后展示

### 2. 相关性分析
- 散点图主要用于分析变量间的相关性
- 可通过回归线展示趋势关系
- 使用不同颜色或形状区分数据类别

### 3. 气泡图应用
- 气泡图适合展示三个维度的数据
- 气泡大小应该与数据值成比例
- 避免气泡大小差异过大，影响可视化效果

### 4. 极坐标应用
- 极坐标散点图适合展示周期性的数据分布
- 角度轴通常表示时间或类别
- 半径轴表示数值大小

### 5. 交互优化
- 默认启用 `tooltip` 显示详细信息
- 启用数据点选中和高亮效果
- 对于密集数据，可以启用淡化非选中点的效果

# 雷达图

**雷达图**是一种表现多维数据的图表，由坐标轴、点、线、多边形共同组成雷达图。

雷达图通过将多个维度的数据量映射到坐标轴上，每一个维度的数据都分别对应一个坐标轴，这些坐标轴以相同的间距沿着径向排列，并且刻度相同。将各个坐标轴上的数据点用线连接起来就形成了一个多边形，最终通过该多边形反映相关变量的权重高低情况，比较适用于展示各种性能指标数据。

**优势：** 雷达图可以直观地展现多维数据集，查看哪些变量具有相似的值、变量之间是否有异常值，适合用于查看哪些变量在数据集内得分较高或较低，可以很好的展示性能和优势，特别适合展现某个数据集的多个关键特征，或者展现某个数据集的多个关键特征和标准值的比对，一般适用于比较多条数据在多个维度上的取值。

**缺点：** 雷达图不适合种类太多的数据，会造成变形过多，使整体图形过于混乱。特别是有颜色填充的多边形的情况，上层会遮挡覆盖下层多边形，同时如果变量过多也会造成可读性下降。

## 配置结构对应关系

以下设置项对应 `_save_dashboard_prochart_card` 文档中 `proChartSetting.series[n].radarSetting` 及相关配置字段：

| 用户界面设置项 | 对应 JSON 字段路径 | 类型/枚举值 | 说明 |
|----------------|-------------------|-------------|------|
| **数据设置** | | | |
| 数据源 | `proChartSetting.dataset[n].id`<br>`proChartSetting.series[n].radarSetting.datasetIndex` | `integer` | 选择数据源索引，必须与 `dataset` 数组下标对应 |
| 名称字段 | `proChartSetting.series[n].radarSetting.encode.seriesName` | `array<string>` | 用于图例显示的字段名 |
| 值字段 | `proChartSetting.series[n].radarSetting.encode.value` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致，顺序需与雷达指标对应 |
| **图表设置** | | | |
| 雷达 | `proChartSetting.radar[n].id`<br>`proChartSetting.series[n].radarIndex` | `integer/string` | 引用雷达坐标系配置 |
| 颜色分配类型 | `proChartSetting.series[n].colorBy` | `string` | `'data'` 或 `'series'` |
| 图形样式 | `proChartSetting.series[n].radarSetting.symbol` | `string` | `'circle'`, `'rect'`, `'roundRect'`, `'triangle'`, `'diamond'`, `'pin'`, `'arrow'`, `'none'` |
| 图形大小 | `proChartSetting.series[n].radarSetting.symbolSize` | `number` | 数据点图形大小 |
| 图形旋转角度 | `proChartSetting.series[n].radarSetting.symbolRotate` | `number` | 数据点图形旋转角度 |
| **标签设置** | | | |
| 显示标签 | `proChartSetting.series[n].radarSetting.label.show` | `boolean` | 是否显示数据标签 |
| 显示内容表达式 | `proChartSetting.series[n].radarSetting.label.formatter` | `string` | ECharts 格式化字符串 |
| 位置 | `proChartSetting.series[n].radarSetting.label.position` | `string` | `'top'`, `'left'`, `'right'`, `'bottom'`, `'inside'` 等 |
| 距离图形的距离 | `proChartSetting.series[n].radarSetting.label.distance` | `number` | 标签与数据点的距离 |
| 标签旋转 | `proChartSetting.series[n].radarSetting.label.rotate` | `number` | 标签旋转角度 |
| 文字偏移X | `proChartSetting.series[n].radarSetting.label.offset[0]` | `number` | 水平偏移量 |
| 文字偏移Y | `proChartSetting.series[n].radarSetting.label.offset[1]` | `number` | 垂直偏移量 |
| 颜色 | `proChartSetting.series[n].radarSetting.label.color` | `string` | 标签文字颜色 |
| 背景色 | `proChartSetting.series[n].radarSetting.label.backgroundColor` | `string` | 标签背景颜色 |
| 字体粗细 | `proChartSetting.series[n].radarSetting.label.fontWeight` | `string` | `'normal'`, `'bold'`, `'bolder'`, `'lighter'` |
| 字体 | `proChartSetting.series[n].radarSetting.label.fontFamily` | `string` | 字体族 |
| 字号 | `proChartSetting.series[n].radarSetting.label.fontSize` | `number/string` | 字体大小 |
| 水平对齐 | `proChartSetting.series[n].radarSetting.label.align` | `string` | `'left'`, `'center'`, `'right'` |
| 垂直对齐 | `proChartSetting.series[n].radarSetting.label.verticalAlign` | `string` | `'top'`, `'middle'`, `'bottom'` |
| 描边宽度 | `proChartSetting.series[n].radarSetting.label.borderWidth` | `number` | 标签边框宽度 |
| 描边颜色 | `proChartSetting.series[n].radarSetting.label.borderColor` | `string` | 标签边框颜色 |
| 描边圆角 | `proChartSetting.series[n].radarSetting.label.borderRadius` | `number` | 标签边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].radarSetting.label.shadowColor` | `string` | 阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].radarSetting.label.shadowBlur` | `number` | 阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].radarSetting.label.shadowOffsetX` | `number` | 阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].radarSetting.label.shadowOffsetY` | `number` | 阴影垂直偏移 |
| **线条样式** | | | |
| 颜色 | `proChartSetting.series[n].itemStyle.color` | `string` | 雷达图连线颜色 |
| 边框颜色 | `proChartSetting.series[n].itemStyle.borderColor` | `string` | 多边形边框颜色 |
| 描边类型 | `proChartSetting.series[n].lineStyle.type` | `string` | `'solid'`, `'dashed'`, `'dotted'` |
| 描边宽度 | `proChartSetting.series[n].lineStyle.width` | `number` | 连线宽度 |
| 描边圆角 | `proChartSetting.series[n].itemStyle.borderRadius` | `number` | 数据点圆角 |
| 阴影颜色 | `proChartSetting.series[n].itemStyle.shadowColor` | `string` | 阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].itemStyle.shadowBlur` | `number` | 阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetX` | `number` | 阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetY` | `number` | 阴影垂直偏移 |
| 透明度 | `proChartSetting.series[n].itemStyle.opacity` | `number` | 透明度 (0-1) |
| **标签布局** | | | |
| 隐藏重叠的标签 | `proChartSetting.series[n].labelLayout.hideOverlap` | `boolean` | 是否隐藏重叠标签 |
| 重叠式偏移方向 | `proChartSetting.series[n].labelLayout.moveOverlap` | `string` | 重叠时移动方向 |
| **高亮设置** | | | |
| 禁用高亮 | `proChartSetting.series[n].emphasis.disabled` | `boolean` | 是否禁用高亮 |
| 高亮时行为 | `proChartSetting.series[n].emphasis.focus` | `string` | `'self'`, `'series'`, `'none'` |
| 淡出的范围 | `proChartSetting.series[n].emphasis.blurScope` | `string` | `'coordinateSystem'`, `'series'`, `'global'` |
| **面积填充** | | | |
| 启用面积填充 | `proChartSetting.series[n].radarSetting.areaStyle` | `object` | 不为空则启用面积填充 |
| 填充颜色 | `proChartSetting.series[n].radarSetting.areaStyle.color` | `string` | 面积填充颜色 |
| 填充透明度 | `proChartSetting.series[n].radarSetting.areaStyle.opacity` | `number` | 填充透明度 (0-1) |

## 雷达坐标系配置

雷达坐标系在 `proChartSetting.radar` 中配置，支持多个雷达坐标系：

### 雷达配置项
| 配置项 | 对应字段 | 类型/枚举值 | 说明 |
|--------|---------|-------------|------|
| 雷达ID | `id` | `string` | 雷达坐标系唯一标识 |
| 名称 | `name` | `string` | 雷达名称（显示用） |
| 形状 | `shape` | `string` | `'polygon'`（多边形）或 `'circle'`（圆形） |
| 半径 | `radius` | `string` | 雷达半径（如 `'75%'` 或 `'200'`） |
| 中心点 | `center` | `array<string>` | 雷达中心位置（如 `['50%', '50%']`） |
| 起始角度 | `startAngle` | `number` | 起始角度（度） |
| 分割段数 | `splitNumber` | `number` | 雷达分割段数 |
| 指标配置 | `indicator` | `array<object>` | 雷达图维度指示器数组 |

### 指标配置示例
```json
{
  "proChartSetting": {
    "radar": [{
      "id": "radar1",
      "name": "能力评估",
      "shape": "polygon",
      "radius": "75%",
      "indicator": [
        {"name": "销售能力", "max": 100},
        {"name": "沟通能力", "max": 100},
        {"name": "技术能力", "max": 100},
        {"name": "团队协作", "max": 100},
        {"name": "创新能力", "max": 100}
      ]
    }]
  }
}
```

## 重要规则说明

### 1. 数据源字段匹配规则
- **字段来源**：`encode` 中使用的 `value` 字段必须存在于对应 `dataset` 的 `dimensionList` 中
- **字段顺序**：`value` 字段数组的顺序必须与雷达 `indicator` 数组的顺序完全一致
- **聚合字段命名**：如果启用聚合查询（`aggregation=true`），字段 ID 格式为 `字段ID_函数名`，如 `score_avg`
- **禁止聚合字段**：`id` 和 `seq` 字段不能用于聚合
- **数据类型要求**：雷达图的值字段应为数值类型

### 2. 多雷达图配置
- 可以在一个卡片中配置多个雷达坐标系
- 每个雷达图系列通过 `radarIndex` 引用对应的雷达坐标系
- 支持在同一图表中展示多个数据系列在不同雷达坐标系上的表现

### 3. 指标配置要求
- `indicator` 数组中必须包含 `name` 字段
- 建议为每个指标设置 `max` 值，用于标准化数据范围
- 可以设置 `min` 值定义最小值范围
- 指标数量建议控制在 **3-8** 个，过多会影响可读性

### 4. 样式配置规则
- 图表标题位置必须明确设置，避免与图例重叠
- `cardStyle.titlePosition` 控制卡片标题位置
- `proChartSetting.title.left/top` 控制图表标题位置
- 雷达图颜色可以通过 `itemStyle.color` 单独设置，或通过调色盘统一配置

## 最佳实践建议

### 1. 数据量控制
- 雷达图适合展示 **2-5** 个数据系列进行比较
- 每个系列的数据维度建议控制在 **3-8** 个指标
- 过多的数据系列会导致图形重叠严重，影响可读性

### 2. 指标标准化
- 所有指标应使用相同的度量单位或标准化到相同范围
- 通过设置 `indicator.max` 统一数据上限
- 对于不同量纲的数据，建议先进行标准化处理

### 3. 形状选择
- **多边形雷达图**：更适合展示分类数据的对比
- **圆形雷达图**：更适合展示连续数据的分布
- 多边形雷达图在指标较少时视觉效果更好

### 4. 颜色与透明度
- 使用不同的颜色区分不同的数据系列
- 启用面积填充时，设置适当的透明度避免遮挡
- 建议透明度设置在 **0.3-0.6** 之间

### 5. 交互优化
- 默认启用 `tooltip` 显示详细指标数值
- 启用数据系列高亮和淡化效果
- 对于复杂雷达图，可以启用动画效果增强体验

# 盒须图（箱型图）

**盒须图**又叫箱线图、箱形图，是一种显示连续型变量的数据分布图表。盒须图可查看数据的中心和散布范围，以及作为直观的工具来检查正态性或识别可能是离群值的点，用于反映原始数据分布的特征，识别数据异常值。

盒须图适用于进行多组数据分布特征的比较，多用于数值统计，能提供有关数据位置和分散情况的关键信息，尤其在比较不同的母体数据时更可表现其差异。使用盒须图时，请检查数据有没有极端值。如果数据集很小，就要谨慎使用；如果有分类型或名义型变量，请使用柱状图等图表。

**优势：** 不受异常值的影响，可以以一种相对稳定的方式描述数据的离散分布情况。

**缺点：** 不能精确地衡量数据分布的偏态和尾重程度，并且对于批量比较大的数据，其反映的信息更加模糊。

## 关键数据点

- **最小值（Minimum）**：数据中的最小值
- **下四分位数（Lower Quartile，Q1）**：数据中位数以下的中位数
- **中位数（Median，Q2）**：数据的中心点
- **上四分位数（Upper Quartile，Q3）**：数据中位数以上的中位数
- **最大值（Maximum）**：数据中的最大值

## 配置结构对应关系

以下设置项对应 `_save_dashboard_prochart_card` 文档中 `proChartSetting.series[n].boxplotSetting` 及相关配置字段：

| 用户界面设置项 | 对应 JSON 字段路径 | 类型/枚举值 | 说明 |
|----------------|-------------------|-------------|------|
| **数据设置** | | | |
| 数据源 | `proChartSetting.dataset[n].id`<br>`proChartSetting.series[n].boxplotSetting.datasetIndex` | `integer` | 选择数据源索引，必须与 `dataset` 数组下标对应 |
| 名称字段 | `proChartSetting.series[n].boxplotSetting.encode.seriesName` | `array<string>` | 用于图例显示的字段名 |
| 横轴字段 | `proChartSetting.series[n].boxplotSetting.encode.x` | `array<string>` | 必须与 `dataset.dimensionList` 中的 `id` 一致 |
| 纵轴字段 | `proChartSetting.series[n].boxplotSetting.encode.y` | `array<string>` | 必须为5个字段，按 `[min, q1, median, q3, max]` 顺序 |
| **图表设置** | | | |
| X坐标轴 | `proChartSetting.xAxis` | `array<object>` | 支持多个X轴配置 |
| Y坐标轴 | `proChartSetting.yAxis` | `array<object>` | 支持多个Y轴配置 |
| 颜色分配类型 | `proChartSetting.series[n].colorBy` | `string` | `'data'` 或 `'series'` |
| 布局方式 | `proChartSetting.series[n].boxplotSetting.layout` | `string` | `'horizontal'`（水平）、`'vertical'`（垂直） |
| 盒子的宽度的下限 | `proChartSetting.series[n].boxplotSetting.boxWidth[0]` | `number` | 盒子最小宽度 |
| 盒子的宽度的上限 | `proChartSetting.series[n].boxplotSetting.boxWidth[1]` | `number` | 盒子最大宽度 |
| **标签设置** | | | |
| 显示标签 | `proChartSetting.series[n].boxplotSetting.label.show` | `boolean` | 是否显示数据标签 |
| 显示内容表达式 | `proChartSetting.series[n].boxplotSetting.label.formatter` | `string` | ECharts 格式化字符串 |
| 位置 | `proChartSetting.series[n].boxplotSetting.label.position` | `string` | `'top'`, `'left'`, `'right'`, `'bottom'`, `'inside'` 等 |
| 距离图形的距离 | `proChartSetting.series[n].boxplotSetting.label.distance` | `number` | 标签与箱体的距离 |
| 标签旋转 | `proChartSetting.series[n].boxplotSetting.label.rotate` | `number` | 标签旋转角度 |
| 文字偏移X | `proChartSetting.series[n].boxplotSetting.label.offset[0]` | `number` | 水平偏移量 |
| 文字偏移Y | `proChartSetting.series[n].boxplotSetting.label.offset[1]` | `number` | 垂直偏移量 |
| 颜色 | `proChartSetting.series[n].boxplotSetting.label.color` | `string` | 标签文字颜色 |
| 背景色 | `proChartSetting.series[n].boxplotSetting.label.backgroundColor` | `string` | 标签背景颜色 |
| 字体粗细 | `proChartSetting.series[n].boxplotSetting.label.fontWeight` | `string` | `'normal'`, `'bold'`, `'bolder'`, `'lighter'` |
| 字体 | `proChartSetting.series[n].boxplotSetting.label.fontFamily` | `string` | 字体族 |
| 字号 | `proChartSetting.series[n].boxplotSetting.label.fontSize` | `number/string` | 字体大小 |
| 水平对齐 | `proChartSetting.series[n].boxplotSetting.label.align` | `string` | `'left'`, `'center'`, `'right'` |
| 垂直对齐 | `proChartSetting.series[n].boxplotSetting.label.verticalAlign` | `string` | `'top'`, `'middle'`, `'bottom'` |
| 描边宽度 | `proChartSetting.series[n].boxplotSetting.label.borderWidth` | `number` | 标签边框宽度 |
| 描边颜色 | `proChartSetting.series[n].boxplotSetting.label.borderColor` | `string` | 标签边框颜色 |
| 描边圆角 | `proChartSetting.series[n].boxplotSetting.label.borderRadius` | `number` | 标签边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].boxplotSetting.label.shadowColor` | `string` | 阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].boxplotSetting.label.shadowBlur` | `number` | 阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].boxplotSetting.label.shadowOffsetX` | `number` | 阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].boxplotSetting.label.shadowOffsetY` | `number` | 阴影垂直偏移 |
| **箱体样式** | | | |
| 颜色 | `proChartSetting.series[n].itemStyle.color` | `string` | 箱体颜色 |
| 边框颜色 | `proChartSetting.series[n].itemStyle.borderColor` | `string` | 箱体边框颜色 |
| 描边类型 | `proChartSetting.series[n].itemStyle.borderType` | `string` | `'solid'`, `'dashed'`, `'dotted'` |
| 描边宽度 | `proChartSetting.series[n].itemStyle.borderWidth` | `number` | 箱体边框宽度 |
| 描边颜色 | `proChartSetting.series[n].itemStyle.borderColor` | `string` | 箱体描边颜色 |
| 描边圆角 | `proChartSetting.series[n].itemStyle.borderRadius` | `number` | 箱体边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].itemStyle.shadowColor` | `string` | 箱体阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].itemStyle.shadowBlur` | `number` | 箱体阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetX` | `number` | 箱体阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetY` | `number` | 箱体阴影垂直偏移 |
| 透明度 | `proChartSetting.series[n].itemStyle.opacity` | `number` | 箱体透明度 (0-1) |
| **标签布局** | | | |
| 隐藏重叠的标签 | `proChartSetting.series[n].labelLayout.hideOverlap` | `boolean` | 是否隐藏重叠标签 |
| 重叠式偏移方向 | `proChartSetting.series[n].labelLayout.moveOverlap` | `string` | 重叠时移动方向 |
| **高亮设置** | | | |
| 禁用高亮 | `proChartSetting.series[n].emphasis.disabled` | `boolean` | 是否禁用高亮 |
| 高亮时行为 | `proChartSetting.series[n].emphasis.focus` | `string` | `'self'`, `'series'`, `'none'` |
| 淡出的范围 | `proChartSetting.series[n].emphasis.blurScope` | `string` | `'coordinateSystem'`, `'series'`, `'global'` |
| **异常点样式** | | | |
| 异常点颜色 | `proChartSetting.series[n].boxplotSetting.itemStyle.outlierColor` | `string` | 异常值点颜色 |
| 异常点大小 | `proChartSetting.series[n].boxplotSetting.itemStyle.outlierSize` | `number` | 异常值点大小 |
| 异常点形状 | `proChartSetting.series[n].boxplotSetting.itemStyle.outlierSymbol` | `string` | 异常值点形状 |

## 事件配置
| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 不可点击 | 开启后该图表内所有标签数据无法进行点击，关闭后可设置对应的数据点击交互事件 | `silent` |
| 点击后调用自动化 | 可通过选择对应的自动化实现相关数据标签单击交互事件，如点击后打开对应的数据表单详情或者打开其他网页链接等 | `eventHandlers.click` |
| 双击后调用自动化 | 功能与点击调用相同，交互由单击触发改为双击触发，可同时设置点击、双击事件 | `eventHandlers.dblclick` |

## 重要规则说明

### 1. 数据源字段匹配规则
- **字段来源**：`encode` 中使用的 `x` 和 `y` 字段必须存在于对应 `dataset` 的 `dimensionList` 中
- **字段顺序**：`y` 字段数组必须包含 **5个字段**，按 `[min, q1, median, q3, max]` 顺序排列
- **聚合字段命名**：如果启用聚合查询（`aggregation=true`），字段 ID 格式为 `字段ID_函数名`，如 `score_avg`
- **禁止聚合字段**：`id` 和 `seq` 字段不能用于聚合
- **数据类型要求**：所有值字段必须为数值类型

### 2. 数据预处理要求
- 数据源需要预先计算五个关键统计量：最小值、Q1、中位数、Q3、最大值
- 可以通过 SQL 查询或应用程序计算这些统计量
- 数据格式必须符合箱型图的五数概括法要求

### 3. 布局与方向配置
- 通过 `layout` 参数控制箱型图的排列方向
- `'horizontal'`：水平排列，X轴为分类，Y轴为数值
- `'vertical'`：垂直排列，Y轴为分类，X轴为数值
- `boxWidth` 控制箱体的宽度范围，避免重叠

### 4. 异常值处理
- 箱型图可以自动识别和显示异常值（离群点）
- 异常值通常定义为小于 Q1-1.5×IQR 或大于 Q3+1.5×IQR 的数据点
- 可以通过 `itemStyle.outlier*` 配置异常值的样式

### 5. 样式配置规则
- 图表标题位置必须明确设置，避免与图例重叠
- `cardStyle.titlePosition` 控制卡片标题位置
- `proChartSetting.title.left/top` 控制图表标题位置
- 箱体颜色可以通过 `itemStyle.color` 单独设置，或通过调色盘统一配置

## 最佳实践建议

### 1. 数据量控制
- 箱型图适合展示 **3-10** 个分组的数据分布
- 每个分组应该有足够的数据点（建议 > 20个）以确保统计量可靠
- 过多的分组会导致箱体过窄，影响可读性

### 2. 异常值分析
- 使用箱型图的主要目的之一是识别异常值
- 异常值需要结合业务背景进行分析，不一定都是错误数据
- 可以配置不同的颜色和形状突出显示异常值

### 3. 数据预处理
- 确保数据已按分组计算五个关键统计量
- 对于大数据集，建议在数据库层面进行聚合计算
- 可以通过 `groupByFieldList` 进行数据分组

### 4. 比较分析
- 箱型图最适合多组数据的分布比较
- 通过并排箱型图直观比较不同组的数据分布特征
- 可以观察中位数位置、箱体长度、异常值分布等

### 5. 交互优化
- 默认启用 `tooltip` 显示五个关键统计量的具体数值
- 可以配置点击交互查看详细数据
- 对于多组数据，可以启用高亮和淡化效果

## 配置示例

### 基础箱型图配置
```json
{
  "proChartSetting": {
    "dataset": [{
      "id": "performance_data",
      "name": "绩效数据",
      "type": "table",
      "tableId": "employee_performance",
      "dimensionList": [
        {"id": "department", "name": "部门"},
        {"id": "min_score", "name": "最低分"},
        {"id": "q1_score", "name": "下四分位数"},
        {"id": "median_score", "name": "中位数"},
        {"id": "q3_score", "name": "上四分位数"},
        {"id": "max_score", "name": "最高分"}
      ]
    }],
    "series": [{
      "name": "部门绩效分布",
      "type": "boxplot",
      "boxplotSetting": {
        "datasetIndex": 0,
        "encode": {
          "x": ["department"],
          "y": ["min_score", "q1_score", "median_score", "q3_score", "max_score"]
        },
        "layout": "vertical",
        "boxWidth": [10, 30],
        "itemStyle": {
          "color": "#c23531",
          "borderColor": "#c23531",
          "borderWidth": 2
        }
      }
    }],
    "tooltip": {
      "trigger": "item",
      "formatter": function(params) {
        return `部门: ${params.name}<br/>
                最小值: ${params.data[0]}<br/>
                Q1: ${params.data[1]}<br/>
                中位数: ${params.data[2]}<br/>
                Q3: ${params.data[3]}<br/>
                最大值: ${params.data[4]}`;
      }
    }
  }
}
```

# K线图（蜡烛图）

**K线图**也称蜡烛图，是将股票、期货等金融产品的开盘价、收盘价、最高价、最低价等价格变化状况用图形的方式表现出来。

K线最上方的一条细线称为上影线，中间的一条粗线为实体，下面的一条细线为下影线。当收盘价高于开盘价，也就是股价走势呈上升趋势时，我们称这种情况下的K线为阳线，中部的实体以空白或红色表示。这时，上影线的长度表示最高价和收盘价之间的价差，实体的长短代表收盘价与开盘价之间的价差，下影线的长度则代表开盘价和最低价之间的差距。

**优势：** K线图既可以展现数据的变化趋势，同时可以观察数据的波动情形，非常适合展示时间序列的价格变化。

**缺点：** K线图绘制方法相对复杂，阴线与阳线的变化繁多，需要用户对金融图表有一定的理解。

## 关键数据点

- **开盘价（Open）**：指交易日开始时的价格
- **收盘价（Close）**：指交易日结束时的价格
- **最高价（High）**：指交易日中价格的最高值
- **最低价（Low）**：指交易日中价格的最低值

## 配置结构对应关系

以下设置项对应 `_save_dashboard_prochart_card` 文档中 `proChartSetting.series[n].candlestickSetting` 及相关配置字段：

| 用户界面设置项 | 对应 JSON 字段路径 | 类型/枚举值 | 说明 |
|----------------|-------------------|-------------|------|
| **数据设置** | | | |
| 数据源 | `proChartSetting.dataset[n].id`<br>`proChartSetting.series[n].candlestickSetting.datasetIndex` | `integer` | 选择数据源索引，必须与 `dataset` 数组下标对应 |
| 名称字段 | `proChartSetting.series[n].candlestickSetting.encode.seriesName` | `array<string>` | 用于图例显示的字段名 |
| 横轴字段 | `proChartSetting.series[n].candlestickSetting.encode.x` | `array<string>` | 通常为时间字段，必须与 `dataset.dimensionList` 中的 `id` 一致 |
| 纵轴字段 | `proChartSetting.series[n].candlestickSetting.encode.y` | `array<string>` | 必须为4个字段，按 `[open, close, high, low]` 顺序 |
| **图表设置** | | | |
| X坐标轴 | `proChartSetting.xAxis` | `array<object>` | 支持多个X轴配置，通常为时间轴 |
| Y坐标轴 | `proChartSetting.yAxis` | `array<object>` | 支持多个Y轴配置，通常为数值轴 |
| 颜色分配类型 | `proChartSetting.series[n].colorBy` | `string` | `'data'` 或 `'series'` |
| 布局方式 | `proChartSetting.series[n].candlestickSetting.layout` | `string` | `'horizontal'`（水平）、`'vertical'`（垂直） |
| 柱条的宽度 | `proChartSetting.series[n].candlestickSetting.barWidth` | `number/string` | K线柱条默认宽度 |
| 柱条的最大宽度 | `proChartSetting.series[n].candlestickSetting.barMaxWidth` | `number/string` | K线柱条最大宽度 |
| 柱条的最小宽度 | `proChartSetting.series[n].candlestickSetting.barMinWidth` | `number/string` | K线柱条最小宽度 |
| **标签设置** | | | |
| 显示标签 | `proChartSetting.series[n].candlestickSetting.label.show` | `boolean` | 是否显示数据标签 |
| 显示内容表达式 | `proChartSetting.series[n].candlestickSetting.label.formatter` | `string` | ECharts 格式化字符串 |
| 位置 | `proChartSetting.series[n].candlestickSetting.label.position` | `string` | `'top'`, `'left'`, `'right'`, `'bottom'`, `'inside'` 等 |
| 距离图形的距离 | `proChartSetting.series[n].candlestickSetting.label.distance` | `number` | 标签与K线柱的距离 |
| 标签旋转 | `proChartSetting.series[n].candlestickSetting.label.rotate` | `number` | 标签旋转角度 |
| 文字偏移X | `proChartSetting.series[n].candlestickSetting.label.offset[0]` | `number` | 水平偏移量 |
| 文字偏移Y | `proChartSetting.series[n].candlestickSetting.label.offset[1]` | `number` | 垂直偏移量 |
| 颜色 | `proChartSetting.series[n].candlestickSetting.label.color` | `string` | 标签文字颜色 |
| 背景色 | `proChartSetting.series[n].candlestickSetting.label.backgroundColor` | `string` | 标签背景颜色 |
| 字体粗细 | `proChartSetting.series[n].candlestickSetting.label.fontWeight` | `string` | `'normal'`, `'bold'`, `'bolder'`, `'lighter'` |
| 字体 | `proChartSetting.series[n].candlestickSetting.label.fontFamily` | `string` | 字体族 |
| 字号 | `proChartSetting.series[n].candlestickSetting.label.fontSize` | `number/string` | 字体大小 |
| 水平对齐 | `proChartSetting.series[n].candlestickSetting.label.align` | `string` | `'left'`, `'center'`, `'right'` |
| 垂直对齐 | `proChartSetting.series[n].candlestickSetting.label.verticalAlign` | `string` | `'top'`, `'middle'`, `'bottom'` |
| 描边宽度 | `proChartSetting.series[n].candlestickSetting.label.borderWidth` | `number` | 标签边框宽度 |
| 描边颜色 | `proChartSetting.series[n].candlestickSetting.label.borderColor` | `string` | 标签边框颜色 |
| 描边圆角 | `proChartSetting.series[n].candlestickSetting.label.borderRadius` | `number` | 标签边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].candlestickSetting.label.shadowColor` | `string` | 阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].candlestickSetting.label.shadowBlur` | `number` | 阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].candlestickSetting.label.shadowOffsetX` | `number` | 阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].candlestickSetting.label.shadowOffsetY` | `number` | 阴影垂直偏移 |
| **K线样式** | | | |
| 颜色 | `proChartSetting.series[n].itemStyle.color` | `string` | K线柱颜色（阳线） |
| 边框颜色 | `proChartSetting.series[n].itemStyle.borderColor` | `string` | K线柱边框颜色 |
| 描边类型 | `proChartSetting.series[n].itemStyle.borderType` | `string` | `'solid'`, `'dashed'`, `'dotted'` |
| 描边宽度 | `proChartSetting.series[n].itemStyle.borderWidth` | `number` | K线柱边框宽度 |
| 描边颜色 | `proChartSetting.series[n].itemStyle.borderColor0` | `string` | K线柱描边颜色（阴线边框） |
| 描边圆角 | `proChartSetting.series[n].itemStyle.borderRadius` | `number` | K线柱边框圆角 |
| 阴影颜色 | `proChartSetting.series[n].itemStyle.shadowColor` | `string` | K线柱阴影颜色 |
| 阴影大小 | `proChartSetting.series[n].itemStyle.shadowBlur` | `number` | K线柱阴影模糊大小 |
| 阴影水平偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetX` | `number` | K线柱阴影水平偏移 |
| 阴影垂直偏移 | `proChartSetting.series[n].itemStyle.shadowOffsetY` | `number` | K线柱阴影垂直偏移 |
| 透明度 | `proChartSetting.series[n].itemStyle.opacity` | `number` | K线柱透明度 (0-1) |
| **标签布局** | | | |
| 隐藏重叠的标签 | `proChartSetting.series[n].labelLayout.hideOverlap` | `boolean` | 是否隐藏重叠标签 |
| 重叠式偏移方向 | `proChartSetting.series[n].labelLayout.moveOverlap` | `string` | 重叠时移动方向 |
| **高亮设置** | | | |
| 禁用高亮 | `proChartSetting.series[n].emphasis.disabled` | `boolean` | 是否禁用高亮 |
| 高亮时行为 | `proChartSetting.series[n].emphasis.focus` | `string` | `'self'`, `'series'`, `'none'` |
| 淡出的范围 | `proChartSetting.series[n].emphasis.blurScope` | `string` | `'coordinateSystem'`, `'series'`, `'global'` |
| **阴阳线颜色** | | | |
| 阳线颜色 | `proChartSetting.series[n].itemStyle.color` | `string` | 收盘价>开盘价时的K线颜色 |
| 阴线颜色 | `proChartSetting.series[n].itemStyle.color0` | `string` | 收盘价<开盘价时的K线颜色 |
| 阳线边框颜色 | `proChartSetting.series[n].itemStyle.borderColor` | `string` | 阳线边框颜色 |
| 阴线边框颜色 | `proChartSetting.series[n].itemStyle.borderColor0` | `string` | 阴线边框颜色 |

## 事件配置
| 设置项 | 说明 | 对应字段标识 |
|--------|------|--------------|
| 不可点击 | 开启后该图表内所有标签数据无法进行点击，关闭后可设置对应的数据点击交互事件 | `silent` |
| 点击后调用自动化 | 可通过选择对应的自动化实现相关数据标签单击交互事件，如点击后打开对应的数据表单详情或者打开其他网页链接等 | `eventHandlers.click` |
| 双击后调用自动化 | 功能与点击调用相同，交互由单击触发改为双击触发，可同时设置点击、双击事件 | `eventHandlers.dblclick` |

## 重要规则说明

### 1. 数据源字段匹配规则
- **字段来源**：`encode` 中使用的 `x` 和 `y` 字段必须存在于对应 `dataset` 的 `dimensionList` 中
- **字段顺序**：`y` 字段数组必须包含 **4个字段**，按 `[open, close, high, low]` 顺序排列
- **聚合字段命名**：如果启用聚合查询（`aggregation=true`），字段 ID 格式为 `字段ID_函数名`，如 `price_avg`
- **禁止聚合字段**：`id` 和 `seq` 字段不能用于聚合
- **数据类型要求**：所有价格字段必须为数值类型，时间字段应为日期/时间类型

### 2. 阴阳线颜色规则
- **阳线（上涨）**：当 `close > open` 时，使用 `itemStyle.color` 和 `itemStyle.borderColor`
- **阴线（下跌）**：当 `close < open` 时，使用 `itemStyle.color0` 和 `itemStyle.borderColor0`
- **平盘**：当 `close = open` 时，通常按阳线处理或使用特殊颜色

### 3. 时间序列要求
- K线图通常用于展示时间序列数据
- X轴应为时间轴类型：`xAxis.type: 'time'`
- 数据应按时间顺序排列，可通过 `orderByList` 确保正确排序
- 支持日K、周K、月K等不同时间周期的数据

### 4. 样式配置规则
- 图表标题位置必须明确设置，避免与图例重叠
- `cardStyle.titlePosition` 控制卡片标题位置
- `proChartSetting.title.left/top` 控制图表标题位置
- 阴阳线颜色应使用对比明显的颜色，如红色/绿色或红色/蓝色

### 5. 数据完整性要求
- 每个数据点必须包含完整的四个价格字段
- 缺失数据可能导致K线显示异常
- 建议使用数据过滤排除不完整的数据记录

## 最佳实践建议

### 1. 数据量控制
- K线图适合展示 **50-200** 个周期的数据
- 数据点过多会导致K线过于密集，影响可读性
- 数据点过少则难以观察趋势和模式
- 可以使用 `dataZoom` 组件进行数据范围缩放

### 2. 时间周期选择
- **日K线**：展示每日的价格变化，适合短期分析
- **周K线**：展示每周的价格变化，适合中期分析
- **月K线**：展示每月的价格变化，适合长期分析
- 应根据分析需求选择合适的时间周期

### 3. 颜色配置
- 使用传统金融图表颜色：红涨绿跌或红涨蓝跌
- 确保阴阳线颜色对比明显
- 可以考虑使用空心/实心区分阴阳线
- 阳线通常使用红色或空心，阴线使用绿色或实心

### 4. 技术指标叠加
- K线图常与其他技术指标结合使用
- 可以叠加移动平均线（MA）展示趋势
- 可以叠加成交量柱状图分析价量关系
- 通过多图表组合实现综合分析

### 5. 交互优化
- 默认启用 `tooltip` 显示四个价格的详细数值
- 启用数据缩放（`dataZoom`）支持查看不同时间段
- 可以配置十字准线（`axisPointer`）进行精确查看
- 对于高频数据，可以启用动画效果增强体验

## 配置示例

### 基础K线图配置
```json
{
  "proChartSetting": {
    "dataset": [{
      "id": "stock_data",
      "name": "股票数据",
      "type": "table",
      "tableId": "stock_prices",
      "dimensionList": [
        {"id": "date", "name": "日期"},
        {"id": "open", "name": "开盘价"},
        {"id": "close", "name": "收盘价"},
        {"id": "high", "name": "最高价"},
        {"id": "low", "name": "最低价"},
        {"id": "volume", "name": "成交量"}
      ],
      "orderByList": [
        {"field": "date", "type": "asc"}
      ]
    }],
    "xAxis": [{
      "type": "time",
      "scale": true,
      "boundaryGap": false
    }],
    "yAxis": [{
      "type": "value",
      "scale": true,
      "splitLine": {
        "show": true
      }
    }],
    "series": [{
      "name": "股价K线",
      "type": "candlestick",
      "candlestickSetting": {
        "datasetIndex": 0,
        "encode": {
          "x": ["date"],
          "y": ["open", "close", "high", "low"]
        },
        "barWidth": 10,
        "itemStyle": {
          "color": "#c23531",      // 阳线颜色
          "color0": "#314656",     // 阴线颜色
          "borderColor": "#c23531", // 阳线边框
          "borderColor0": "#314656" // 阴线边框
        }
      }
    }],
    "tooltip": {
      "trigger": "axis",
      "axisPointer": {
        "type": "cross"
      },
      "formatter": function(params) {
        var data = params[0].data;
        return `日期: ${data[0]}<br/>
                开盘: ${data[1]}<br/>
                收盘: ${data[2]}<br/>
                最高: ${data[3]}<br/>
                最低: ${data[4]}`;
      }
    },
    "dataZoom": [{
      "type": "inside",
      "xAxisIndex": 0,
      "start": 70,
      "end": 100
    }, {
      "type": "slider",
      "xAxisIndex": 0,
      "start": 70,
      "end": 100
    }]
  }
}
```

# _save_dashboard_prochart_card 文档
```json
{
  "type": "function",
  "function": {
    "name": "_save_dashboard_prochart_card",
    "description": "在仪表盘中创建 ProChart 卡片,或者编辑已有的卡片，只能创建或修改卡片类型为ProChart的卡片。特别注意：1、数据源规则：当type=\"table\"时，dimensionList中的字段id必须是SQL查询结果中的真实列名。严禁杜撰或使用不存在的字段名。1.1 未开启聚合查询则字段来源为直接查询数据表所返回的原始字段，命名规则：id必须与数据库表中的列名完全一致 1.2 已开启聚合查询则聚合列格式为字段名_函数名，且禁止对id和seq字段聚合，即此处aggregationQueryList中fieldId不能为id或seq，需要使用其他字段；当type=\"expression\"时，静态变量需用单引号包裹并置于内，格式如{'key':'A'}，此处不能杜撰不存在的非静态变量，可以使用的非静态变量为：filterRecord和filterFieldList 前提是改卡片定义或仪表盘定义开启了筛选。2. 堆叠图表规则：当需要实现堆叠效果时，必须为每一个堆叠系列单独创建一个数据源和一个对应的图表实例，：在图表列表series的每一项中datasetIndex对应数据源的索引，每个图标的datasetIndex值应该与对应数据源的下标一一对应示例：要用柱状图显示“每个员工的每种打卡类型数量”，则需要为“打卡类型A”、“打卡类型B”等每一种类型分别创建独立的数据源和图表，此时打卡类型A数据源在dataset中下标为0，打卡类型B在数据源中下标为1，则图表中datasetIndex需要分别设置为0和1，在每次创建或者修改卡片前，你都需要提前规划好有哪些数据源和图表，从而设置正确的datasetIndex。3、 样式规则：图表标题的位置必须进行设置，确保其不与图例区域发生重叠。",
    "parameters": {
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
          "enum": ["ProChart"]
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
          "type": ["string", "null"],
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
            "bgType": { "type": "string", "description": "背景类型，例如 'image' 或 'color' 或 'transparent'，默认为 image。" },
            "bgColor": { "type": ["string", "null"], "description": "背景颜色（CSS 颜色值），仅在 bgType 合适时有效。" },
            "bgImageId": { "type": ["string", "null"], "description": "背景图片ID（如果使用图片）。" },
            "padding": { "type": "number", "description": "四周内边距（像素）。" },
            "paddingTop": { "type": "number", "description": "上内边距" },
            "paddingRight": { "type": "number", "description": "右内边距" },
            "paddingBottom": { "type": "number", "description": "下内边距" },
            "paddingLeft": { "type": "number", "description": "左内边距" },
            "overflow": { "type": "string", "description": "溢出策略，例如 'auto'、'hidden'、'visible'。" },
            "borderWidth": { "type": "number", "description": "边框宽度" },
            "borderRadius": { "type": "number", "description": "圆角半径" },
            "titleFontSize": { "type": "string", "description": "标题字体大小（CSS 字符串，例如 '13px'）。" },
            "titlePosition": { "type": "string", "description": "标题位置，例如 'left'、'center'、'right'。" },
            "subTitleFontSize": { "type": "string", "description": "副标题字体大小（例如 '12px'）。" },
            "subTitlePosition": { "type": "string", "description": "副标题位置，例如 'titleBottom'。" },
            "enableBorderImage": { "type": "boolean", "description": "是否启用边框图片。仅当为 true 时使用 borderImage* 字段。" },
            "borderImageId": { "type": ["string", "null"], "description": "边框图片 ID（可选）。" },
            "borderImageIsFill": { "type": "boolean", "description": "边框图像是否填充内容区域。" },
            "borderImageSlice": { "type": "array", "items": { "type": "number" }, "description": "边框图像切片设置（按 CSS border-image-slice）。" },
            "borderImageRepeatX": { "type": "string", "description": "边框图像横向重复策略，如 'round'、'repeat'、'stretch'。" },
            "borderImageRepeatY": { "type": "string", "description": "边框图像纵向重复策略。" }
          }
        },
        "buttonList": {
          "type": "array",
          "items": { "type": "object" },
          "description": "卡片顶部或工具栏按钮配置数组。按钮对象结构应包含 id、label、action 等字段。"
        },
        "buttonStyle": {
          "type": "object",
          "description": "顶部按钮样式与布局配置。",
          "properties": {
            "size": { "type": "string", "description": "按钮大小，例如 'small'、'medium'、'large'。" },
            "orient": { "type": "string", "description": "排列方向，例如 'horizontal' 或 'vertical'。" },
            "vertical": { "type": "string", "description": "垂直对齐，如 'top'、'middle'、'bottom'。" },
            "horizontal": { "type": "string", "description": "水平对齐，如 'left'、'center'、'right'。" }
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
          "items": { "type": "object" },
          "description": "卡片级别的过滤字段配置数组。每项应包含 fieldId、label、type 等。"
        },
        "proChartSetting": {
          "type": "object",
          "description": "图表的具体渲染配置。结构兼容 ECharts option",
          "properties": {
            "grid": {
              "type": "array",
              "items": { "type": "object" },
              "description": "grid 配置数组（参照 ECharts grid）。"
            },
            "polar": {
              "type": "array",
              "items": { "type": "object" },
              "description": "极坐标系配置数组（参照 ECharts polar）。"
            },
            "radar": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": { "type": "string", "description": "radar 配置唯一 id（可选）。" },
                  "name": { "type": "string", "description": "雷达名称（显示用，可选）。" },
                  "shape": { "type": "string", "enum": ["polygon", "circle"], "description": "雷达形状。'polygon' 或 'circle'。" },
                  "radius": { "type": "string", "description": "雷达半径（例如 '75%' 或 '200'）。" },
                  "indicator": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": { "type": "string", "description": "指标名称。" },
                        "max": { "type": "number", "description": "该指标允许的最大值（数值）。" },
                        "min": { "type": "number", "description": "该指标允许的最小值（数值）。" },
                        "color": { "type": ["string", "null"], "description": "该指标文本颜色（可选）。" }
                      },
                      "required": ["name"]
                    },
                    "description": "雷达图的维度指示器数组（至少包含 name，建议包含 max）。"
                  },
                  "axisLine": { "type": "object", "description": "轴线样式配置（参照 ECharts axisLine）。" },
                  "axisLabel": { "type": "object", "description": "轴标签样式配置。" },
                  "splitLine": { "type": "object", "description": "分隔线样式配置。" },
                  "axisName": { "type": "object", "description": "轴名称样式配置（文本样式等）。" }
                },
                "required": ["indicator"]
              },
              "description": "雷达（radar）配置列表。"
            },
            "xAxis": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": { "type": "string", "description": "xAxis 的 id（可选）。" },
                  "name": { "type": "string", "description": "坐标轴名称（显示）。" },
                  "show": { "type": "boolean", "description": "是否展示该坐标轴。" },
                  "type": { "type": "string", "description": "坐标轴类型，例如 'category'、'value'、'time' 或 'log'。" },
                  "position": { "type": "string", "description": "坐标轴位置，如 'bottom','top'。" },
                  "axisLine": { "type": "object", "description": "轴线样式配置。" },
                  "axisTick": { "type": "object", "description": "刻度线配置。" },
                  "axisLabel": { "type": "object", "description": "刻度文字配置，包括 rotate、formatter 等。" },
                  "splitLine": { "type": "object", "description": "分割线配置。" },
                  "boundaryGap": { "type": ["array", "boolean"], "description": "boundaryGap 配置，category 类型通常为 ['0','0'] 或 true/false。" }
                },
                "required": ["type"]
              },
              "description": "x 轴配置数组（支持多 x 轴）。"
            },
            "yAxis": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": { "type": "string", "description": "yAxis 的 id（可选）。" },
                  "name": { "type": "string", "description": "坐标轴名称（显示）。" },
                  "show": { "type": "boolean", "description": "是否展示该坐标轴。" },
                  "type": { "type": "string", "description": "坐标轴类型，例如 'value','category','time' 等。" },
                  "position": { "type": "string", "description": "坐标轴位置，如 'left','right'。" },
                  "axisLine": { "type": "object", "description": "轴线样式配置。" },
                  "axisTick": { "type": "object", "description": "刻度线配置。" },
                  "axisLabel": { "type": "object", "description": "刻度文字配置。" },
                  "splitLine": { "type": "object", "description": "分隔线配置。" },
                  "boundaryGap": { "type": ["array", "boolean"], "description": "boundaryGap 配置。" }
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
                    "enum": ["table", "expression"],
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
                        "enum": ["and", "or"],
                        "description": "根条件组合逻辑"
                      },
                      "children": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "description": "嵌套条件组，不需要时置空",
                          "properties": {
                            "opt": { "type": "string", "enum": ["and", "or"] },
                            "conditionList": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "fieldId": { "type": "string" },
                                  "opt": { "type": "string" },
                                  "value": { "type": "string" },
                                  "var": { "type": "boolean" }
                                },
                                "required": ["fieldId", "opt", "value", "var"]
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
                              "enum": ["eq","ne","gt","ge","lt","le","contains","notcontains","startswith","endswith","isnull","isnotnull","in","notin","between","notbetween"],
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
                          "required": ["fieldId", "opt", "value", "var"]
                        }
                      }
                    },
                    "required": ["opt", "children", "conditionList"]
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
                          "enum": ["count", "avg", "sum", "max", "min"],
                          "description": "聚合函数，可以选择：\"count\", \"avg\", \"sum\", \"max\", \"min\"，需要注意：avg、sum、max、min这些函数要求字段必须是数值类型，只有字段类型为Integer或者Double才能使用这几种函数"
                        },
                        "distinct": {
                          "type": "boolean",
                          "description": "是否去重",
                          "default": false
                        }
                      },
                      "required": ["fieldId", "func"]
                    },
                    "description": "聚合计算配置（当 aggregation=true 时必填）"
                  },
                  "groupByFieldList": {
                    "type": "array",
                    "items": { "type": "string" },
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
                      "required": ["id", "name"]
                    }
                  },
                  "orderByList": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "field": { "type": "string", "description": "排序字段ID" },
                        "type": { "type": "string", "enum": ["asc", "desc"] }
                      },
                      "required": ["field", "type"]
                    },
                    "description": "排序"
                  }
                },
                "required": ["id", "name", "type"],
                "allOf": [
                  {
                    "if": { "properties": { "type": { "const": "table" } } },
                    "then": { "required": ["tableId"] }
                  },
                  {
                    "if": { "properties": { "type": { "const": "expression" } } },
                    "then": { "required": ["expression"] }
                  },
                  {
                    "if": { "properties": { "aggregation": { "const": true } } },
                    "then": {
                      "required": ["aggregationQueryList", "groupByFieldList"],
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
                  "id": { "type": "string", "description": "图表唯一id" },
                  "name": { "type": "string", "description": "图表名称" },
                  "type": {
                    "type": "string",
                    "description": "图表类型（必须与 chartType 匹配），例如 'bar','line','pie','scatter','radar','gauge','boxplot','candlestick','heatmap','funnel' 等。",
                    "enum": ["bar","line","pie","scatter","radar","gauge","boxplot","candlestick","heatmap","funnel"]
                  },
                  "xAxisIndex": { "type": "integer", "description": "引用 xAxis 的索引（若有多 x 轴）" },
                  "yAxisIndex": { "type": "integer", "description": "引用 yAxis 的索引（若有多 y 轴）" },
                  "barSetting": {
                    "type": "object",
                    "description": "柱状图配置，当 type==='bar' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                        "properties": {
                          "x": {
                            "type": "array",
                            "items": { "type": "string" },
                            "description": "X轴字段"
                          },
                          "y": {
                            "type": "array",
                            "items": { "type": "string" },
                            "description": "Y轴字段"
                          },
                          "seriesName": {
                            "type": "array",
                            "items": { "type": "string" },
                            "description": "图表名字段"
                          }
                        },
                        "required": ["x", "y"]
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
                        "type": ["string", "number"],
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
                          "color": { "type": "string", "description": "背景颜色" },
                          "borderColor": { "type": "string", "description": "边框颜色" },
                          "borderWidth": { "type": "number", "description": "边框宽度" }
                        }
                      },
                      "itemStyle": {
                        "type": "object",
                        "properties": {
                          "color": { "type": "string", "description": "柱条颜色" },
                          "borderColor": { "type": "string", "description": "边框颜色" },
                          "borderWidth": { "type": "number", "default": 0 },
                          "borderType": {
                            "type": "string",
                            "enum": ["solid", "dashed", "dotted"],
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
                          "show": { "type": "boolean", "default": true },
                          "position": {
                            "type": "string",
                            "enum": ["top", "right", "bottom", "left", "inside", "insideLeft", "insideRight"],
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
                    "required": ["encode","datasetIndex"]
                  },
                  "lineSetting": {
                    "type": "object",
                    "description": "折线图专属配置，当 type==='line' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                        "properties": {
                          "x": { "type": "array", "items": { "type": "string" }, "description": "X轴字段" },
                          "y": { "type": "array", "items": { "type": "string" }, "description": "Y轴字段" },
                          "seriesName": { "type": "array", "items": { "type": "string" }, "description": "图表名字段" }
                        },
                        "required": ["x", "y"]
                      },
                      "smooth": { "type": "boolean", "description": "是否平滑显示", "default": false },
                      "symbol": {
                        "type": "string",
                        "enum": ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow", "none"],
                        "description": "标记图形",
                        "default": "emptyCircle"
                      },
                      "symbolSize": { "type": "number", "description": "标记大小", "default": 4 },
                      "showSymbol": { "type": "boolean", "description": "是否显示标记", "default": true },
                      "areaStyle": {
                        "type": "object",
                        "description": "区域填充样式",
                        "properties": {
                          "color": { "type": "string", "description": "填充颜色" },
                          "opacity": { "type": "number", "minimum": 0, "maximum": 1, "default": 0.6 }
                        }
                      },
                      "lineStyle": {
                        "type": "object",
                        "description": "线条样式",
                        "properties": {
                          "width": { "type": "number", "default": 1 },
                          "type": { "type": "string", "enum": ["solid", "dashed", "dotted"], "default": "solid" }
                        }
                      }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "pieSetting": {
                    "type": "object",
                    "description": "饼图专属配置，当 type==='pie' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                        "properties": {
                          "value": { "type": "array", "items": { "type": "string" }, "description": "数值字段" },
                          "itemName": { "type": "string", "description": "项名字段" }
                        },
                        "required": ["value", "itemName"]
                      },
                      "radius": {
                        "type": "array",
                        "items": { "type": "string" },
                        "description": "半径配置（如['0%','70%']）",
                        "default": ["0%", "75%"]
                      },
                      "center": {
                        "type": "array",
                        "items": { "type": "string" },
                        "description": "圆心位置（如['50%','50%']）",
                        "default": ["50%", "50%"]
                      },
                      "label": {
                        "type": "object",
                        "properties": {
                          "show": { "type": "boolean", "default": true },
                          "position": { "type": "string", "enum": ["inside", "outside", "center"], "default": "outside" }
                        }
                      },
                      "labelLine": { "type": "object", "description": "标签引导线配置" }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "scatterSetting": {
                    "type": "object",
                    "description": "散点图专属配置，当当 type==='scatter' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                        "properties": {
                          "x": { "type": "array", "items": { "type": "string" }, "description": "X轴字段" },
                          "y": { "type": "array", "items": { "type": "string" }, "description": "Y轴字段" },
                          "value": { "type": "array", "items": { "type": "string" }, "description": "数值字段" }
                        },
                        "required": ["x", "y"]
                      },
                      "symbolSize": { "type": "number", "default": 4 },
                      "symbol": {
                        "type": "string",
                        "enum": ["circle", "rect", "triangle", "diamond", "pin"],
                        "default": "circle"
                      }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "radarSetting": {
                    "type": "object",
                    "description": "雷达图专属配置，当 type==='radar' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                        "properties": {
                          "value": { "type": "array", "items": { "type": "string" }, "description": "数值字段" }
                        },
                        "required": ["value"]
                      },
                      "areaStyle": { "type": "object", "description": "区域填充样式" },
                      "lineStyle": { "type": "object", "description": "线条样式" }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "gaugeSetting": {
                    "type": "object",
                    "description": "仪表图专属配置，当 type==='gauge' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                        "properties": {
                          "value": { "type": "array", "items": { "type": "string" }, "description": "数值字段" }
                        },
                        "required": ["value"]
                      },
                      "min": { "type": "number", "default": 0 },
                      "max": { "type": "number", "default": 100 },
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
                                  "items": [
                                    { "type": "number" },
                                    { "type": "string" }
                                  ],
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
                          "formatter": { "type": "string", "description": "格式化字符串（如'{value}%'）" }
                        }
                      }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "boxplotSetting": {
                    "type": "object",
                    "description": "箱型图专属配置，当 type==='boxplot' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                        "properties": {
                          "x": { "type": "array", "items": { "type": "string" }, "description": "分类字段" },
                          "y": {
                            "type": "array",
                            "items": { "type": "string" },
                            "minItems": 5,
                            "maxItems": 5,
                            "description": "数值字段数组（必须按[min,q1,median,q3,max]顺序）"
                          }
                        },
                        "required": ["x", "y"]
                      },
                      "boxWidth": { "type": "array", "items": { "type": "number" }, "description": "箱体宽度范围（如[10,30]）" }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "candlestickSetting": {
                    "type": "object",
                    "description": "K线图专属配置，当 type==='candlestick' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID，不得杜撰",
                        "properties": {
                          "x": { "type": "array", "items": { "type": "string" }, "description": "X轴字段" },
                          "y": {
                            "type": "array",
                            "items": { "type": "string" },
                            "minItems": 4,
                            "maxItems": 4,
                            "description": "价格字段（按[open,close,high,low]顺序）"
                          }
                        },
                        "required": ["x", "y"]
                      },
                      "barWidth": { "type": "number", "description": "K线柱宽度", "default": 10 }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "heatmapSetting": {
                    "type": "object",
                    "description": "热力图专属配置，当 type==='heatmap' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置",
                        "properties": {
                          "x": { "type": "array", "items": { "type": "string" }, "description": "X轴分类字段" },
                          "y": { "type": "array", "items": { "type": "string" }, "description": "Y轴分类字段" },
                          "value": { "type": "array", "items": { "type": "string" }, "description": "数值字段" }
                        },
                        "required": ["x", "y", "value"]
                      },
                      "label": {
                        "type": "object",
                        "properties": {
                          "show": { "type": "boolean", "default": true },
                          "formatter": { "type": "string", "description": "显示格式（如'{@[1]}'）" }
                        }
                      }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "funnelSetting": {
                    "type": "object",
                    "description": "漏斗图专属配置，当 type==='funnel' 时必填",
                    "properties": {
                      "datasetIndex": { "type": "integer", "description": "数据源索引，引用数据源数组中的索引(0，1，2...)，只有一个数据源时，默认为0；有多个数据源时，根据功能填写对应数据源的数组下标。" },
                      "encode": {
                        "type": "object",
                        "description": "图表的数据配置，值取自对应dataset中的dimensionList中的字段ID或构建表达式中的字段ID",
                        "properties": {
                          "value": { "type": "array", "items": { "type": "string" }, "description": "数值字段" },
                          "itemName": { "type": "string", "description": "项名字段" }
                        },
                        "required": ["value", "itemName"]
                      },
                      "sort": { "type": "string", "enum": ["ascending", "descending", "none"], "default": "descending" },
                      "gap": { "type": "number", "description": "数据项间隔", "default": 0 }
                    },
                    "required": ["encode","datasetIndex"]
                  },
                  "labelLayout": { "type": "object", "description": "label 布局冲突的处理策略" },
                  "silent": { "type": "boolean", "description": "是否静默" },
                  "colorBy": { "type": "string", "description": "颜色使用策略，例如 'data' 或 'series' 等。" },
                  "emphasis": { "type": "object", "description": "高亮/聚焦配置（参照 ECharts emphasis）。" },
                  "itemStyle": { "type": "object", "description": "图形样式（borderWidth、borderColor、opacity 等）。" },
                  "showSymbol": { "type": "boolean", "description": "折线/散点是否显示 symbol（布尔）。" }
                },
                "required": ["name","type"]
              }
            },
            "tooltip": {
              "type": "object",
              "description": "通用 tooltip 配置"
            },
            "dataZoom": {
              "type": "array",
              "items": { "type": "object" },
              "description": "dataZoom 配置数组"
            },
            "visualMap": {
              "type": "array",
              "items": { "type": "object" },
              "description": "visualMap 配置数组（用于热力图/色彩映射）"
            },
            "angleAxis": {
              "type": "array",
              "items": { "type": "object" },
              "description": "极坐标角度轴配置"
            },
            "radiusAxis": {
              "type": "array",
              "items": { "type": "object" },
              "description": "极坐标半径轴配置"
            },
            "style": {
              "type": "object",
              "description": "自定义样式片段"
            }
          },
          "required": ["series", "dataset", "tooltip"]
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
      "required": ["name", "type", "scope", "width", "height", "cardStyle", "proChartSetting"]
    }
  }
}
```
