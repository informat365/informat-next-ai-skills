此文档是织信低代码平台的表达式SDK文档。

## 一、概述

织信低代码平台提供了一套 **表达式 SDK（Expression SDK）**，用于在以下场景中进行动态计算与逻辑控制：

- 工作流（BPMN）节点配置、审批人、流转条件
- 启动配置、实例名称、自动完成条件
- 自动化规则
- 表单、仪表盘、API 返回值
- 脚本与规则引擎

## 二、表达式执行规则

织信表达式采用 UEL（统一表达式语言） 语法，在语法和语义上类似于 JavaScript 表达式，但并非 JavaScript 语法，存在严格的 DSL 约束。

### 2.1 表达式与模板规则

- 表达式使用 `${}` 包裹
- **`${}` 内的内容会被当作表达式执行**
- **`${}` 之外的内容会被当作普通字符串原样返回**
- 一个字符串中可以包含多个 `${}` 表达式
- 字符串拼接不支持使用+字符串拼接，而是如下使用 ${String.concat('123','456')} //返回'123456'

【字符串拼接强制规则】

在织信表达式中：
1. 运算符 + 仅允许用于数值运算（Integer / Double）。
2. 严禁使用 + 进行字符串拼接，例如：
    ${ 'A' + 'B' }
    ${ name + '-' + code }

3. 所有字符串拼接必须使用：
   ${ String.concat('A','B') }
   ${ String.concat(name,'-',code) }

违反该规则的表达式将被视为【非法表达式】。


## 三、运算符
运算: +（加法）, - （减法）, *（乘法）, /（除法）, %(取模)
逻辑: &&(并且), ||(或者), !（取反）
关系: ==（等于）, !=（不等于）, <（小于）, >（大于） <=（小于等于）, >=（大于等于）
空值: null（空值）
条件判断: A ? B : C. 返回 B or C, 如果A为true 返回B，否则返回C
## 四、保留关键字
and or not true false null empty div mod in matches eq ne lt gt le ge class
## 五、除0异常
在除法操作中，如果除数是0的话会抛出异常
## 六、数组（Array）使用强制规则（重要）
### 6.1 数组字面量【禁止使用】
在织信表达式中，严禁使用数组 / List 字面量语法：
['a']
['a','b']
上述写法在解析阶段会直接报错
### 6.2 正确的数组构造方式（唯一允许）
Array.of('a','b')

## 七、函数调用
织信提供了Math Array Date Misc String User Encode Record等对象来处理关于数学运算、数组、日期等方面的函数运算。函数调用过程如果发生异常，系统会回滚当前事务。以下是一个函数调用的示例
${Math.abs(-100)}//返回100
### 函数-Array数组集合函数
❌ 错误示例（一定会报错）：
${Array.first(User.usersWithRole(['researcher']))}
✅ 正确示例：
${Array.first(User.usersWithRole(Array.of('researcher')))}
数组集合相关函数
#### Array.of(...item)
将多个元素转化为数组
示例：Array.of('x', 2, 3, 4); //["x",2,3,4]
#### Array.join(array, separator);
按照 separator 将 array 数组的内容拼接在一起
| 参数        | 类型       | 描述      |
|-----------|----------|---------|
| array     | `Array`  | 需要拼接的数组 |
| separator | `String` | 分隔符     |
**返回值**
类型 `String`
返回拼接的字符串
#### Array.length(list)
list 的元素个数
#### Array.get(list, key)
获取集合中的一个元素
如果是 List 集合则 key 就是 0~(len - 1) 的索引位置整数，返回的是该位置的值， 超过范围内的访问将抛出异常；如果是 Map 集合则
key 就是键值对的 key，返回的是对应的 value；
#### Array.set(list, key, value)
设置集合中的元素值。如果是 List 集合则替换 list 集合中项的 key为 value，如果是 Map 集合则 key 就是键值对的 key
#### Array.add(list, item)
向集合 list 的尾部中添加元素 item
| 参数   | 类型       | 描述        |
|------|----------|-----------|
| list | `Array`  | 需要添加元素的集合 |
| item | `Object` | 要添加的元素    |
**返回值**
类型 `Array`
返回添加了元素后的集合
#### Array.remove(list, item)
将集合中的元素移除,如果集合是 Map 类型则 item 是 key
| 参数   | 类型                  | 描述             |
|------|---------------------|----------------|
| list | `Array` 或 `Map`     | 需要移除元素的集合      |
| item | `Object` 或 `String` | 要移除的元素、元素的 key |
#### Array.removeAll(list, item)
将集合中的元素移除,如果集合是 Map 类型则 item 是 key
#### Array.isEmpty(list)
判断 list 是否是空集合；如果 list 为`null`或者长度为 0 返回 true，否则返回 false
#### Array.isNotEmpty(list)
判断 list 是否不是空集合；如果 list 为`null`或者长度为 0 返回 false，否则返回 true
#### Array.contains(list, item)
#### Array.containsAny(list1, list2)
判断 list1 中是否包含 list2 中的任意元素
当 list1 为 null 时，始终返回`false`，当 list2 为空时始终返回`true`
#### Array.containsAll(list1, list2)
判断 list1 中是否包含 list2 中的所有元素
当 list1 或者 list2 为空时，始终返回`false`
#### Array.map(list, key)
返回 list 中 key 属性的列表
#### Array.props(list, props)
返回 list 中 元素的props列表组成的新对象列表
#### Array.transform(list, mapping)
返回 list 中 元素的按照mapping映射组成的新对象列表
#### Array.concat(list1, list2)
返回 list1 和 list2 拼接在一起
#### Array.sort(list, key)
将 list 按照 key 属性排序
#### Array.distinct(list)
将 list 中的元素去除重复项返回
#### Array.reverse(list)
将 list 反转后返回
#### Array.repeat
生成一个每一项是 element 且长度为 count 的数组
#### Array.sublist
返回 list 的 fromIndex 到 toIndex 的部分
#### Array.filter(list, key, value)
从列表 list 过滤列表项属性 key 的值等于 value 的项
#### Array.shift(list)
移除 list 头部的元素并返回被移除的元素
#### Array.pop(list)
移除 list 尾部的元素并返回被移除的元素
#### Array.sum(list)
对元素为数字类型的 list 进行求和计算
#### Array.avg(list)
对元素为数字类型的 list 进行求平均值计算
#### Array.max(list)
对元素为数字类型的 list 进行求最大值计算
#### Array.min(list)
对元素为数字类型的 list 进行求最小值计算
#### Array.first(list)
返回 list 中的第一个元素
#### Array.last(list)
返回 list 中的最后一个元素

### 函数-Context上下文函数
上下文相关函数。上下文表示在执行过程中的环境参数
#### Context.userId()
返回当前操作的用户ID
#### Context.appId()
返回当前的应用ID
#### Context.appEnvProp(propKey)
返回当前应用的环境变量
#### Context.httpHeaders()
返回当前操作的http header
#### clipboardType
返回当前应用剪切板中的存储的数据类型
::: tip 应用剪切板需要通过以下操作进行设值
- 自动化步骤`设置应用剪切板`
- 控件 `设置应用剪切板数据`
:::
#### Context.clipboardData()
返回当前应用剪切板中的存储的数据
#### Context.weworkAccessToken()
返回企业微信AccessToken
#### Context.dingtalkAccessToken()
返回钉钉AccessToken
#### Context.feishuAccessToken()
返回飞书应用AccessToken
#### Context.feishuTenantAccessToken()
返回飞书租户AccessToken
#### Context.requestIp()
返回当前请求的IP信息
#### Context.hasAppPerm(permKey)
判断当前用户是否有标识符为 permKey 的应用权限
#### Context.hasModulePerm(moduleKey, permKey)
判断当前用户是否有模块标识符为 moduleKey 且权限标识符为 permKey 的模块权限


### 函数-Date日期函数
日期运算的。包括有关月份和星期的值范围的信息，以及几种用于处理日期的方法，如`Date.sysdate`，`Date.now` 和 `Date.dateSet`
及有关月份和星期值范围的特殊说明

month的值范围

| 月份  | 值  |
|-----|----|
| 1月  | 0  |
| 2月  | 1  |
| 3月  | 2  |
| 4月  | 3  |
| 5月  | 4  |
| 6月  | 5  |
| 7月  | 6  |
| 8月  | 7  |
| 9月  | 8  |
| 10月 | 9  |
| 11月 | 10 |
| 12月 | 11 |

day_of_week的值范围

| 天   | 值   |
| ------ | ---- |
| 星期日 | 0    |
| 星期一 | 1    |
| 星期二 | 2    |
| 星期三 | 3    |
| 星期四 | 4    |
| 星期五 | 5    |
| 星期六 | 6    |


#### Date.sysdate()
返回当前日期和时间
#### Date.now()
返回当前时间的UNIX时间戳
#### Date.newDate(year, month, day, hour, minute, second, millisecond)
返回指定的日期

| 参数          | 类型        | 描述                              |
|-------------|-----------|---------------------------------|
| year        | `Integer` | 年份,非必填或可以传递为null,默认为**当前时间的年份** |
| month       | `Integer` | 月份,非必填或可以传递为null,默认为**1月**      |
| day         | `Integer` | 天,非必填或可以传递为null,默认为**1**        |
| hour        | `Integer` | 小时,非必填或可以传递为null,默认为**0点**      |
| minute      | `Integer` | 分钟,非必填或可以传递为null,默认为**0分**      |
| second      | `Integer` | 秒,非必填或可以传递为null,默认为**0秒**       |
| millisecond | `Integer` | 毫秒,非必填或可以传递为null,默认为**0毫秒**     |

#### Date.dateSet(d, type, value)
将日期d中type指定的部分设置为value
#### Date.dateAdd(d, type, diff)
计算日期d按照类型type加上diff的日期

| 参数   | 类型        | 描述                                        |
|------|-----------|-------------------------------------------|
| d    | Date或Long | 需要计算的日期或UNIX时间戳                           |
| type | String    | 运算类型                                      |
| diff | Integer   | 增加或者减少的值,如果为 null 则默认0 开始。增加则传递整数，减少则传递负数 |

::: info
type的取值为：`年:year`,`月:month`,`天:day_of_year`,`月天数:day_of_month`,`周天数:day_of_week`,`小时:hour`,`分钟:minute`,`秒:second`,`毫秒:millisecond`
:::

#### Date.datePart(d, type)

返回日期d中的type指定的部分

```javascript
Date.datePart(d, type)
```

| 参数   | 类型        | 描述              |
|------|-----------|-----------------|
| d    | `Date`或`Long` | 需要计算的日期或UNIX时间戳 |
| type | `String`    | 运算类型            |

::: info
type的取值为：`年:year`,`月:month`,`天:day_of_year`,`月天数:day_of_month`,`周天数:day_of_week`,`小时:hour`,`分钟:minute`,`秒:second`,`毫秒:millisecond`
:::


#### Date.dateBefore(d1, d2)
判定日期d1是否在日期d2之前
#### Date.dateAfter(d1, d2)
判定日期d1是否在日期d2之后
#### dateDiff
计算两个日期之间的天数差值
#### Date.monthDiff(d1, d2)
计算两个日期之间的月份数差值
#### Date.weekDiff(d1, d2)
计算两个日期之间的周差值
#### Date.quarterDiff(d1, d2)
计算两个日期之间的季度差值

### Encode加解密函数
字符串编解码相关函数
#### Encode.md5(s)
返回字符串 s 的 MD5 哈希
#### Encode.urlEncode(str)
将字符串str进行URL编码
#### Encode.urlDecode(str)
将字符串str进行URL解码


### Math数学运算函数
数学运算。它包括了一些数学函数，如 `Math.abs`、`Math.pow`、`Math.ceil`、`Math.random`、`Math.sqrt` 和 `Math.round`

#### Math.abs(x)
返回 x 的绝对值
#### Math.pow(d1, d2)
返回 d1 的 d2 次方
#### Math.ceil(x)
返回大于或等于 x 的最小整数
#### Math.floor(x)
返回小于或等于 x 的最大整数
#### Math.random()
返回0到1之间的随机数
#### Math.sqrt(x)
返回x的平方根
#### Math.round(n, digits)
返回数字n按照保留位数digits四舍五入的值
### Misc其它函数
工具函数
#### Misc.jsonStringify(obj)
将对象obj转换为JSON字符串
#### Misc.jsonParse(str)
将字符串str转换为JSON对象
#### Misc.parseFloat(str)
将字符串str转换为小数
#### Misc.parseInt(str)
将字符串str转换为整数
#### Misc.timestampToDate(timestamp)
距离UNIX时间戳数字值转换为日期类型
#### Misc.dateToTimestamp(date)
日期类型转换为距离UNIX时间戳数字值
#### Misc.formatDate(date, fmt)
将变量date按照格式fmt(yyyy-MM-dd HH:mm:ss,SSS)转换为字符串
#### Misc.parseDate(str, fmt)
将str按照格式fmt(yyyy-MM-dd HH:mm:ss,SSS)转换为日期
#### Misc.host()
返回系统的首页地址
#### Misc.pinyin(str)
返回字符串 str 的中文拼音
#### Misc.shortPinyin(str)
返回字符串 str 的每个中文汉字拼音的首字母
#### Misc.expectNotNull(obj, message)
判定对象是否为空,为空则抛出提示为 message 的异常,否则返回对象
#### Misc.expectFirst(array, message)
返回array第一个元素。如果array为空，则抛出提示为 message 的异常
#### Misc.expectLast(array, message)
返回array最后一个元素。如果array为空，则抛出提示为 message 的异常
#### Misc.invokeScript(script, func, ...args)
调用脚本中的函数
#### invokeAutomatic
调用自动化程序
Misc.invokeAutomatic(automaticId, ...args)
#### Misc.httpGet(url)
通过GET方式访问url地址，返回请求的内容
#### Misc.prop(object, key)
取出对象 object 中的属性 key 的值
#### Misc.props(object, props)
取出对象 object 中的属性 props列表 的新对象
#### Misc.transform(object, mapping)
返回 list 中 元素的按照mapping映射组成的新对象列表
#### Misc.appId()
获取所在应用的ID
#### Misc.getAppIdByKey(key)
通过应用标识符查询团队下的应用ID
#### Misc.attachmentURL(tableKey, fieldKey, value)
获取附件访问的链接地址
通过附件字段的数据表标识符、字段标识符、值获取访问链接地址

| 参数       | 类型     | 描述                    |
|----------|--------|-----------------------|
| tableKey | `String` | 数据表ID                 |
| fieldKey | `String` | 字段ID                  |
| value    | `String` | TableAttachment中的id属性 |

#### Misc.appResURL(appResId)
获取应用资源库的资源地址
#### Misc.websiteResURL(moduleKey,filePath)
获取应用网站模块的资源地址
通过传入网站模块ID和资源路径获取访问链接地址
#### Misc.eval(expression, context)
使用上下文 context 变量执行表达式引擎替换表达式字符串 str 模板中的数据

| 参数      | 类型     | 描述     |
|---------|--------|--------|
| expression     | `String` | 表达式字符串 |
| context | `Object` | 上下文变量  |

**示例**

```javascript
Misc.eval('name',{"name":"informat"}) // 'name'
Misc.eval('${name}',{"name":"informat"}) // 'informat'
Misc.eval('${detail.age}',{"name":"informat","detail":{"age":12}}) // 12
```

#### Misc.safesql(sql, params)
为带有占位符`?`的`sql`生成安全的完整sql
#### Misc.uuid16()
生成一个16位的uuid字符串
#### Misc.uuid32()
生成一个32位的uuid字符串
#### Misc.newObject()
构建一个空对象
#### Misc.recordSql(sql, parameters)
执行SQL查询数据表记录列表，只运行执行`Select`语句，并且只支持查询数据表模块的记录

| 参数       | 类型     | 描述                    |
|----------|--------|-----------------------|
| sql | `String` | SQL语句               |
| parameters | `Array<Object>` | 参数列表                 |

**返回值**

类型 `Array<Object>`
查询的结果集

**示例**
```javascript
Misc.recordSql('select id,name from task where status=? ',['1']);
```
返回值
```json
[
  {
    "name": "名称",
    "id": "pht21vzu5ozps"
  },
  {
    "name": "333",
    "id": "1"
  }
]
```


### Record数据表函数
数据表相关函数

#### Record.getById(tableId, recordId)

返回查询的数据表记录信息

| 参数       | 类型     | 描述      |
|----------|--------|---------|
| tableId  | `String` | 数据表的标识符 |
| recordId | `String` | 记录ID    |

**返回值**

类型 `Object`
数据表记录信息，如果不存在则返回`null`


#### Record.getFieldValue(tableId, recordId, fieldId)

返回数据表记录的字段值

| 参数       | 类型     | 描述      |
|----------|--------|---------|
| tableId  | `String` | 数据表的标识符 |
| recordId | `String` | 记录ID    |
| fieldId  | `String` | 字段标识符   |


**返回值** 

类型 `Object`
数据表记录的字段值，如果记录不存在则返回`null`，如果属性不存在则返回`null`。
如果数据表不存在则抛出异常



#### Record.getByField(tableId, fieldId, opt, value)
根据单个字段过滤数据表记录列表

| 参数      | 类型     | 描述                                           |
|---------|--------|----------------------------------------------|
| tableId | `String` | 数据表的标识符                                      |
| fieldId | `String` | 过滤的字段                                        |
| opt     | `String` | 操作符，关于操作符参见`ConditionOpt` |
| value   | `Object` | 过滤条件的值                                       |

**返回值**

类型 `Array<Record>`
返回满足条件的记录列表，最多返回10000条记录，如果没有满足条件的数据，返回空数组。
如果数据表不存在则抛出异常


#### Record.getByFields(tableId, conditions)
根据多个字段过滤数据表记录列表


| 参数         | 类型     | 描述                                           |
|------------|--------|----------------------------------------------|
| tableId    | `String` | 数据表的标识符                                      |
| conditions | `Array`  | 过滤条件，关于过滤条件参见[Condition](../script/model.html#condition) |

**返回值**

类型 `Array<Record>`
返回满足条件的记录列表，最多返回10000条记录，如果没有满足条件的数据，返回空数组。
如果数据表不存在则抛出异常


#### Record.getRecordOptionName(tableId, fieldId, value)
返回单个选项值的名称

| 参数      | 类型     | 描述      |
|---------|--------|---------|
| tableId | `String` | 数据表的标识符 |
| fieldId | `String` | 字段的标识符  |
| value   | `String` | 选项值     |

**返回值** 

类型 `String`
返回选项值的名称，如果选项值在选项列表中不存在，则返回传入的选项值
如果数据表不存在则抛出异常


#### Record.getRecordOptionNames(tableId, fieldId, valueList, join)

返回多个选项值的名称并且拼接到一起

| 参数        | 类型              | 描述      |
|-----------|-----------------|---------|
| tableId   | `String`          | 数据表的标识符 |
| fieldId   | `String`          | 字段的标识符  |
| valueList | `Array<String>` | 选项值列表   |
| join      | `String`          | 拼接的字符串  |

**返回值** 

类型 `String`
返回拼接的选项值的名称，如果选项值在选项列表中不存在，则使用选项值拼接。
如果数据表不存在则抛出异常


#### Record.getRecordOptions(tableId, fieldId)

返回选项值列表


| 参数      | 类型     | 描述      |
|---------|--------|---------|
| tableId | `String` | 数据表的标识符 |
| fieldId | `String` | 字段的标识符  |

**返回值**

类型 `Array<Option>`
返回选项值列表，如果字段不是`列表选择` `树形选择` `级联选择`则返回null。
如果数据表不存在则抛出异常

#### Record.getRelationList(tableId, fieldId, recordId)

返回查询的数据表关联列表字段的值

| 参数       | 类型     | 描述      |
|----------|--------|---------|
| tableId  | `String` | 数据表的标识符 |
| fieldId  | `String` | 字段的标识符  |
| recordId | `String` | 记录ID    |

**返回值** 

类型 `Array<Record>`
返回关联列表的值，如果字段不是`关联列表`则返回空数组。
如果数据表不存在则抛出异常

### String字符串函数

字符串相关函数

#### String.upper(s)
将字符串的所有字母变成大写字母
#### String.lower(s)
将字符串的所有字母变成小写字母
#### String.concat(s1, s2)
将字符串 s1 和 s2 字符串合并为一个字符串
#### String.lpad(s1, len, s2)
在字符串 s1 的开始处填充字符串 s2，使字符串长度达到 len
| 参数  | 类型      | 描述      |
|-----|---------|---------|
| s1  | `String`  | 要拼接的字符串 |
| len | `Integer` | 总长度     |
| s2  | `String`  | 重复的字符   |

#### String.rpad(s1, len, s2)
在字符串 s1 的结尾处填充字符串 s2，使字符串长度达到 len

| 参数  | 类型      | 描述      |
|-----|---------|---------|
| s1  | `String`  | 要拼接的字符串 |
| s2  | `String`  | 重复的字符   |
| len | `Integer` | 总长度     |

#### String.trim(s)
移除字符串 s 的左右的所有空白字符
#### String.replace(s, s1, s2)
用字符串 s2 替代字符串 s 中第一次出现的的字符串 s1
#### String.replaceAll(s, s1, s2)
用字符串 s2 替代字符串 s 中出现的的字符串 s1
#### String.substr(s,start,len)
截取从字符串s的索引位置start截取len个字符
#### String.substring(s,start,end)
截取从字符串s的开始位置start截取到结束位置end
#### String.indexOf(s,s2)
获取字符串s中字符s2首次出现的位置
#### String.lastIndexOf(s,s2)
获取字符串s中字符s2最后次出现的位置
#### String.contains(s,s2)
判定字符串s中是否包含字符s2
#### String.length(s)
获取字符串s的长度
#### String.startsWith(s,s2)
判定字符串s中是否以字符s2开头
#### String.endsWith(s,s2)
判定字符串s中是否以字符s2结尾
#### String.match(regex,input)
使用正则表达式regex验证input是否符合要求

| 参数    | 类型     | 描述                       |
|-------|--------|--------------------------|
| regex | `String` | 正则内容.暂不支持`\w`,`\d`等已`\`开头的正则简写 |
| input | `String` | 匹配的内容                    |

#### String.isEmpty(s)
判断输入字符串 s 是否为空
```javascript
String.isEmpty(''); //true
String.isEmpty(' '); //true
String.isEmpty(null); //true
```
#### String.isNotEmpty(s)
判断输入字符串 s 是否不为空

```javascript
String.isNotEmpty(' a '); //true
String.isNotEmpty(''); //false
String.isNotEmpty(' '); //false
String.isNotEmpty(null); //false
```

#### String.html2text(s)
将字符串 s 的html内容转换为文本内容。此过程会使用xss过滤器过滤内容后输出

### User用户函数

当前系统下的用户相关操作函数

#### User.usersWithRole(roleIdList)

返回拥有roleIdList角色中任意一个角色的用户ID列表

| 参数         | 类型              | 描述       |
|------------|-----------------|----------|
| roleIdList | `Array<String>` | 角色的标识符数组 |



#### User.usersWithDepartment(departmentIdList)
返回属于departmentIdList部门用的用户ID列表

| 参数         | 类型              | 描述      |
|------------|-----------------|---------|
| departmentIdList | `Array<String>` | 部门标识符数组 |

#### User.superiorUsers(userId)
返回userId的上级用户ID列表


#### User.superiorUsersWithLevel(userId,level)
返回userId的连续多级上级用户ID列表

| 参数     | 类型        | 描述         |
|--------|-----------|------------|
| userId | `String`  | 要查询上级的用户ID |
| level | `Integer` | 要查询上级层数    |


#### User.subordinateUsers(userId)
返回userId的下属用户ID列表

#### User.subordinateUsersWithLevel(userId, level)
返回userId的连续下属用户ID列表

| 参数     | 类型     | 描述         |
|--------|--------|------------|
| userId | `String` | 要查询下属的用户ID |
| level | `Integer` | 级数 |

#### User.leaderOfDept(departmentId)
返回单个部门负责人ID列表
#### User.leaderOfDeptWithLevel(departmentId,level)
返回连续上级部门负责人ID列表
#### User.leaderOfDeptList(departmentIdList)
返回多个部门的负责人ID列表
#### User.parentOfDept(departmentId)
返回部门的父部门ID
#### User.parentOfDeptList(departmentId)
返回部门的父部门ID列表
#### User.childrenOfDept(departmentId)
返回单个部门所有下级部门ID列表
部门的结构为树形结构，该接口会递归的返回指定部门下树形结构的所有子节点。
#### User.childrenOfDeptList(departmentList)
返回多个部门的所有下级部门ID列表
#### User.directChildrenOfDept(departmentId)
返回直接下级部门ID列表
#### User.user(userId)
返回单个UserInfo,用户信息 
#### User.userInfo(userId)
返回单个UserInfo,用户信息
#### User.deptList(departmentIdList)
返回Array<InformatDepartment>,departmentIdList部门的部门信息列表 
#### User.dept(deptId)
返回单个InformatDepartment,部门信息
### T国际化函数
国际化函数
#### T.t(key)


## 模型定义

### 用户信息

### UserInfo 用户信息

| 字段 | 类型 | 说明 |
|------|------|------|
| userName | string | 用户名 |
| mobileNo | string | 手机号 |
| email | string | 邮箱 |
| oid | string | OID |
| remark | string | 备注 |
| id | string | 用户 ID |
| name | string | 用户名称 |
| avatar | string | 头像 |
| roleList | Array&lt;string&gt; | 角色列表 |
| departmentList | Array&lt;string&gt; | 所属部门列表 |
| leaderList | Array&lt;string&gt; | 直接上级列表 |
| companyRoleList | Array&lt;string&gt; | 团队角色列表 |
| weworkUserId | string | 企业微信账户 ID |
| dingtalkUserId | string | 钉钉账号 ID |
| feishuUserId | string | 飞书账号 ID |
| userInfo | object | 自动化扩展信息 |
| permissionList | Set | 权限列表 |


### InformatDepartment 部门

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 部门唯一标识（OID） |
| name | string | 部门名称 |
| shortName | string | 部门简称 |
| remark | string | 部门描述 |
| parentId | string | 上级部门 ID（OID） |
| ownerList | List<string> | 部门负责人 ID 列表 |
| rowNumber | number | 排序号 |
| isDisable | boolean | 是否禁用 |
