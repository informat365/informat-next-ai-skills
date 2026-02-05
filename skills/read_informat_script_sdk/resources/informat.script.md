:::
此文档是织信低代码平台的脚本SDK文档，基于织信平台的业务逻辑可以用如下sdk方法去实现。读取该文档，根据该文档中提供的方法解决我提出的问题，请直接给出实现的js方法代码。需要注意除了可以使用普通的js自带方法，其余方法只能使用文档中提供的方法，不能杜撰文档中没有的方法。
如果使用文档中的方法不能完全实现需求则给出不能实现的原因。
织信采用多租户架构，系统中用户分为系统账号 Account、 团队成员 CompanyMember、 应用成员 User 三种。每个Account可加入到多个团队中成为CompanyMember, 每个CompanyMember在团队中可以加入多个应用成为 User。每一个团队成员可以归属于一个或者多个部门 Dept，部门之间也有父子关系。每个部门可以有一个或者多个CompanyMember作为部门负责人。
脚本都运行在某一个应用下。
:::

::: warning 注意
织信脚本运行在 GraalVM JavaScript 引擎中，  
SDK 提供的 `informat.*` 方法均为 **同步调用**，不返回 Promise。

❌ 不支持 `async / await` 写法  
❌ 不支持基于 Promise 的异步模型  

请直接使用同步方式调用 SDK 方法，例如：

```js
const list = informat.table.queryList(tableId, query);
```

# informat.system 系统全局操作


## getAccount(id: String): [Account]?
查询账号信息。

## getAccountByUserName(userName: String): [Account]?
通过用户名查询账号信息。

## getAccountByMobileNo(mobileNo: String): [Account]?
通过手机号查询账号信息。

## getAccountByEmail(email: String): [Account]?
通过邮箱查询账号信息。

## queryAccountList(query: Query): Array<[Account]>
查询账号列表。  
- `query`: 账号查询条件（支持以下字段）:  
  - `id` (String)
  - `name` (String) 
  - `userName` (String)
  - `mobileNo` (String)
  - `email` (String)
  - `oid` (String): 第三方ID  

## queryAccountListCount(filter: [Filter]): int
查询账号列表总数。
返回匹配的记录总数。

## addAccount(account: [Account]): String
新增账号
- `account`: 账号信息（ID、创建时间无需填写）  
返回新增的账号ID

## updateAccount(account: [Account]): int
更新账号信息
- `account`:
  - `oid` (String): 标识符  
  - `name` (String)
  - `userName` (String)
  - `mobileNo` (String)
  - `email` (String)
  - `avatar` (String)
  - `language` (String): 语言  
  - `needUpdatePassword` (Boolean)
返回更新的记录数量

## queryCompanyList(query: Query): Array<[Company]>
查询团队列表
- `query`: 
  - `id` (String): 团队ID  
  - `name` (String): 团队名称  
返回团队列表

## queryCompanyListCount(filter: [Filter]): int
查询团队总数
- `filter`: 参考 `queryCompanyList`
返回匹配的团队数量

## addCompanyMember(companyId: String, accountId: String, departmentList: Array<String>, roleList: Array<String>): void
添加团队成员。  
- `companyId`: 团队ID  
- `departmentList`: 部门ID列表  
- `roleList`: 角色ID列表

## queryCompanyDeptList(companyId: String, query: [Query]): Array<[Dept]>
查询部门列表。  
- `companyId`: 团队ID  
- `query`: 
  - `id` (String): 部门ID  
  - `parentId` (String): 父部门ID  
  - `name` (String)
  - `createTime` (Date)
返回部门列表

## getCompanyAllRoles(companyId: String): Array<[CompanyRole]>
查询团队所有角色列表
返回角色列表

## addOptLog(optLog: [OptLog]): void
添加操作日志。  
- `optLog`: 操作日志信息

# informat.app 应用信息相关函数

## abort(message: String, code?: int): void、abort(message): void
终止当前脚本运行。`code`为可选错误码

## appId(): String
查询当前应用ID

## userId(): String
查询当前操作用户ID

## weworkAccessToken(): String
获取企业微信AccessToken

## dingtalkAccessToken(): String
获取钉钉AccessToken

## feishuAccessToken(): String
获取飞书应用AccessToken

## feishuTenantAccessToken(): String
获取飞书租户AccessToken

## appEnvProp(id: String): String
获取环境变量值

## pushEvent(event: [PushEvent]): void
推送事件给客户端

## addAppChangeLog(content: String): void
创建应用变更日志

# informat.company 团队


## queryRoleList(): Array<[Role]>
查询团队角色列表

## addCompanyMember(accountId: String, departmentList: Array<String>, roleList: Array<String>): void
添加团队成员。`departmentList`为空时加入根部门
-`accountId`:账号ID
-`departmentList`:部门ID列表
-`roleList`:角色ID列表

## deleteCompanyMember(accountId: String): Boolean
移除团队成员。返回是否成功

## updateCompanyMember(member: [CompanyMember]): void
更新团队成员信息

## queryCompanyMemberList(query: [Query]): Array<[CompanyMember]>
查询团队成员列表

## queryCompanyMemberListCount(filter: [Filter]): int
查询团队成员数量


# informat.dept 部门组织架构操作

## queryDeptList(query: [Query]): Array<[Dept]>
查询部门列表

## queryDeptListCount(filter: [Filter]): int
查询部门总数

## getDept(id: String): [Dept]?
查询部门信息。不存在时返回`null`
-`id`:部门标识符

## getParentOfDept(deptId: String): Array<[Dept]>
查询部门的所有上级部门

## getChildrenOfDept(deptId: String): Array<[Dept]>
查询部门的所有下级部门

## getDirectChildrenOfDept(deptId: String): Array<[Dept]>
查询部门的直接下级部门

## addDept(dept: [Dept]): String
新增部门。返回部门标识符

## updateDept(dept: [Dept]): void
更新部门信息

## deleteDept(deptId: String): void
删除部门

# informat.user 用户操作

## getUser(id: String): [User]?
查询用户信息。不存在时返回 `null`
-`id`:用户ID

## getUserInfo(id: String): [UserInfo]?
查询用户详细信息。不存在时返回 `null`

## getUserList(idList: Array<String>): Array<[User]>
根据用户ID列表查询用户列表（不包含扩展信息）

## getAppUserList(): Array<[User]>
查询应用成员列表（不包含扩展信息）

## getUserByRoleList(roleList: Array<String>): Array<[User]>
根据应用角色查询用户列表（不包含扩展信息）

## getUserByDeptList(deptList: Array<String>): Array<[User]>
根据部门查询用户列表
-`deptList`:部门标识符列表

## getSuperiorUsers(userId: String): Array<[User]>
查询用户的直接上级列表

## getSubordinateUsers(userId: String): Array<[User]>
查询用户的直接下属列表

## getLeaderOfDeptList(deptList: Array<String>): Array<[User]>
查询部门的负责人列表

## getUserRoleList(): Array<[UserRole]>
查询应用角色列表

## addUser(userId: String, roleList: Array<String>): void
添加用户到应用中

## updateUserRole(userId: String, roleList: Array<String>): void
更新应用成员的角色

## deleteUser(userId: String): void
将用户从应用中移除

## getUserPermissions(userId: String): Array<String>
查询用户所有应用权限列表

## getAllPermissions(): Array<String>
查询所有应用权限定义

# informat.table 数据表操作

## Query使用示例
```js
const query = {
    // 页码，从1开始。默认为1
    pageIndex: 1,
    // 每页数据量 默认值100，-1表示查询所有数据
    pageSize: 10,
    // 过滤器 TableRecordFilter
    filter: {
        // 过滤条件 TableRecordCondition
        conditionList: [
            {
                // 查询的字段标识符
                fieldId: 'name',
                /**
                 * 比较方式 TableRecordConditionOpt ，取值如下
                 * eq                等于
                 * ne                不等于
                 * gt                大于
                 * ge                大于等于
                 * lt                小于
                 * le                小于等于
                 * contains          包含
                 * notcontains       不包含
                 * startswith        开始是
                 * endswith          结尾是
                 * isnull            等于空值
                 * isnotnull         不等于空值
                 * in                在列表内
                 * notin             不在列表内
                 * between           在范围内
                 * notbetween        不在范围内
                 * parenteq          父对象等于
                 * parentrooteq      根节点等于
                 * parentcontains    父对象包含
                 * multipleandquery  多值且模糊查询
                 * multipleorquery   多值或模糊查询
                 * intree            在树中
                 */
                opt: 'eq',
                /**
                 * 对数据值的处理函数 TableRecordConditionFunc
                 * 日期类型字段取值如下：
                 * week                 一周内的第几天
                 * month                年度的第几月
                 * quarter              年度的第几季度
                 * year                 年份
                 * dayofyear            年度天数
                 * weekofyear           年度周数
                 * dayofmonth           月内天数
                 * daytonow             距离今天的天数
                 * weektonow            距离今天的周数
                 * monthtonow           距离今天的月份数
                 * quartertonow         距离今天的季度数
                 * yeartonow            距离今天的年份数
                 * fmtday               年-月-日 格式:2021-01-01
                 * fmtweek              年-周 格式:2021-1
                 * fmtmonth             年-月 格式:2021-01
                 * fmtquarter           年-季度 格式:2021-1
                 * 成员类型字段取值如下：
                 * nameOfAccount        姓名
                 */
                func: null,
                // 对比值
                value: '张三'
            }
        ],
        // 嵌套子过滤器,值为 TableRecordFilter 的数组，支持逐层嵌套结构
        children: [],
        /**
         * 子过滤器与上层过滤器组合方式
         * 取值如下
         * and      全部匹配
         * or       任意匹配
         */
        opt: 'and'
    },
    // 返回值包含的字段标识符列表,不传递或传递空数组时查询全部字段
    includeFields: ['id', 'name', 'age'],
    // 分组字段标识符列表
    groupByList: [],
    // 聚合查询列表 TableRecordAggregationQuery
    aggregationQueryList: [
        {
            // 聚合的字段
            fieldId: 'sex',
            /**
             * 聚合方式
             * 取值如下
             * count        数量
             * avg          平均值(数字、日期类型)
             * sum          求和(数字、日期类型)
             * max          最大值(数字、日期类型)
             * min          最小值(数字、日期类型)
             */
            func: 'count',
            // 是否去重
            distinct: false
        }
    ],
    // 排序方式数组，OrderBy
    orderByList: [
        {
            // 排序的字段标识符
            field: 'name',
            /**
             * 排序方式取值如下
             * asc      正序
             * desc     倒序
             */
            type: 'desc'
        }
    ],
    // 去重字段标识符列表
    distinctFieldList: [],
    // 返回值排除的字段标识符列表,不传递或传递空数组时查询全部字段
    excludeFields: [],
    // 是否返回选项名称,`列表选择`、`级联选择`、`树形选择`返回选项名称
    returnOptionName: false
}
```

## getTableInfo(tableId: String): [TableInfo]
查询数据表信息
-`tableId`:数据表的标识符

## getTableFieldInfo(tableId: String, fieldId: String): [TableFieldInfo]
查询数据表字段信息
-`fieldId`:数据表字段的标识符

## queryById(tableId: String, recordId: String): Object
根据ID查询单条数据
-`recordId`:需要查询的数据ID

## queryOne(tableId: String, query: [TableRecordQuery]): Object
根据条件查询满足条件的第一条数据


### TableRecordQuerySetting 参数说明：
- `forUpdate?: Boolean` - 是否锁定行（默认false）
- `returnOptionName?: Boolean` - 是否返回选项字段的显示名称（默认false）
- `includeFields?: Array<String>` - 指定返回的字段列表（默认返回全部字段）

例子
```JS
// 查询姓名中包含张或李且年龄大于20岁的前3位员工，按照年龄从低到高排序
informat.table.queryList('staffs', {
    pageIndex: 1,
    pageSize: 3,
    filter: {
        opt: 'and',
        conditionList: [
            { fieldId: 'age', opt: 'gt', value: '20' }
        ],
        children: [
            {
                opt: 'or',
                conditionList: [
                    { fieldId: 'name', opt: 'startswith', value: '张' },
                    { fieldId: 'name', opt: 'startswith', value: '李' }
                ]
            }
        ]
    },
    orderByList: [{ field: 'age', type: 'asc' }]
});
```

## queryList(tableId: String, query: [TableRecordQuery]): Array<Object>
通过条件查询多条数据记录

## queryListCount(tableId: String, filter: [TableRecordFilter]): int
查询满足条件的数据记录数量

## insert(tableId: String, data: Object): String
创建单条记录。系统会自动处理创建人、创建时间、最后修改人、最后修改时间字段。返回创建的记录ID

## batchInsert(tableId: String, dataList: Array<Object>): int
批量创建记录。注意：子对象编号、编号、查找汇总、关联列表汇总字段不会自动计算。返回创建的记录数量

## update(tableId: String, data: Object): int
更新单条记录。返回更新的记录数量

## batchUpdate(tableId: String, dataList: Array<Object>): int
批量更新记录。所有记录更新的字段列表必须一致，null值也会被更新。注意：汇总字段不会自动计算。返回更新的记录数量

## delete(tableId: String, recordId: String): int
删除单条记录。返回删除的记录数量

## batchDelete(tableId: String, idList: Array<String>): int
批量删除记录。记录不会放入回收站。返回删除的记录数量

## queryRelationList(tableId: String, relationFieldId: String, recordId: String, query: [Query]): Array<Object>
通过主表记录ID查询关联列表字段对应的子表记录列表
-`relationFieldId`:关联列表字段ID
-`query`:子表查询条件

## addRelation(tableId: String, relationFieldId: String, recordId: String, relationRecordId: String): void
添加关联列表值（建立主表记录与子表记录的关联关系）
-`relationRecordId`:关联列表的记录ID

## deleteRelation(tableId: String, relationFieldId: String, recordId: String, relationRecordId: String): void
删除关联列表值（解除主表记录与子表记录的关联关系）

## hasRelation(tableId: String, relationFieldId: String, recordId: String, relationRecordIdList: Array<String>): Array<String>
查询指定记录ID列表是否存在于关联列表中。返回实际存在的记录ID列表
例如关联列表[`record1`,`record1`,`record3`]，relationRecordIdList为[`record1`,`record2`,`record4`]，则返回值为[`record1`,`record2`]

## getRelationRecordIdList(tableId: String, relationFieldId: String, recordId: String): Array<String>
通过子表记录ID查询关联的主表记录ID列表（反向查询关联关系）
例如数据表存储的数据如下
| 主表记录ID | 关联列表              |
|--------|-------------------|
| m1     | [record1,record2] |
| m2     | [record1,record3] |
| m3     | [record3,record4] |
指定记录为`record3`  则返回值为 `m2``m3`

## updateChildrenField(tableId: String, childrenFieldId: String, recordId: String, parentRecordId: String?): void
更新子对象字段的父节点关系。`parentRecordId`为null时移动到根目录
-`childrenFieldId`:子对象字段
-`recordId`:要更新的记录ID
-`parentRecordId`:要移动到的父节点

## queryChildrenList(tableId: String, childrenFieldId: String, recordId: String, query: [Query]): Array<Object>
查询指定记录的子树记录列表（子对象字段的层级查询）

## cloneAttachment(sourceTableId: String, sourceFieldId: String, targetTableId: String, targetFieldId: String, attachment: [TableAttachment]): [TableAttachment]
拷贝附件字段的文件到目标字段
-`sourceTableId`:源数据表的标识符
-`sourceFieldId`:源字段的标识符
-`targetTableId`:目标数据表的标识符
-`targetFieldId`:目标字段的标识符
-`attachment`:附件对象

## moveAttachment(sourceTableId: String, sourceFieldId: String, targetTableId: String, targetFieldId: String, attachment: [TableAttachment]): [TableAttachment]
移动附件字段的文件到目标附件字段

## createAttachment(tableId: String, fieldId: String, path: String): [TableAttachment]
使用本地沙盒文件生成附件（上传本地沙盒中的文件到共享存储中,自动生成缩略图和水印）
-`path`:本地沙盒中的文件路径

## createAttachmentStorage(tableId: String, fieldId: String, path: String): [TableAttachment]
使用远程存储文件生成附件（不生成缩略图和水印）
-`path`:远程存储中的文件路径

## cloneTableSignature(sourceTableId: String, sourceFieldId: String, targetTableId: String, targetFieldId: String, signature: [TableSignature]): [TableSignature]
拷贝手写签名字段的文件到目标字段

## refreshDataSource(tableId: String): void
刷新物化视图的数据（仅适用于数据库视图且开启物化视图选项的表）

## refreshRelationRollup(tableId: String, fieldId: String, recordIdList?: Array<String>): void
重新计算关联列表汇总字段的值。`recordIdList`为空时全表计算
-`fieldId`:关联列表汇总字段标识符

## refreshLookupRollup(tableId: String, fieldId: String, recordIdList?: Array<String>, subFilter?: [Filter]): void
重新计算查找列表汇总字段的值。支持子表过滤条件
-`recordIdList`:主表记录ID列表,如果为空，则全表计算

## addComment(tableId: String, tableComment: [TableCommentForm]): int
添加表单评论。返回新增的评论ID

## deleteComment(tableId: String, commentId: int): void
删除表单评论（有回复时逻辑删除，无回复时物理删除）

## getIdFieldSeq(tableId: String, fieldId: String): int
查询编号字段当前自增序号
-`fieldId`:编号字段标识符

## setIdFieldSeq(tableId: String, fieldId: String, seq: int): void
设置编号字段自增序号

# informat.http http请求

## informat.http.request(request: [HttpRequest]): HttpResponse
发送HTTP请求。返回响应对象

## HttpResponse 响应对象方法

### statusCode(): int
HTTP状态码

### body(): String
获取响应内容

### headers(): Object<String, String>
获取HTTP响应头

### contentEncoding(): String
获取内容编码方式

### contentLength(): int
获取内容长度

### saveBodyAsFile(path: String): void
保存响应内容到本地文件

### saveBodyAsStorage(path: String): void
保存响应内容到文件共享存储

### saveBodyAsAttachment(tableKey: String, fieldKey: String, fileName: String): TableAttachment
保存响应内容为附件对象
-`tableKey`:数据表标识符
-`fieldKey`:字段标识符

示例1：http下载远程文件后，存储到本地沙盒环境
```js 
const req = {
    url: 'https://next.informat.cn/logo.png',
    followRedirect: true,
    maxRedirectCount: 10,
}
const rsp = informat.http.request(req);
rsp.saveBodyAsFile('logo.png');
```

示例2：http下载远程文件后，存储到s3共享存储
```js 
const req = {
    url: 'https://next.informat.cn/logo.png',
    followRedirect: true,
    maxRedirectCount: 10,
}
const rsp = informat.http.request(req);
rsp.saveBodyAsFile('logo.png');
```

# informat.datasource 数据源

## getConnection(moduleId: String, dataSourceKey: String, setting: [DataSourceConnnectionSetting]): [JDBCConnection]
从数据库连接池获取连接
- 设置了`autoCommit`等于`true`时，在执行update、insert、delete语句时将会自动提交事务
- 执行过程中出错会自动回滚
- 在脚本执行结束后，需要手动关闭创建的连接

## Connection 连接对象方法

### select(sql: String, handler: Function([ResultSet]), ...args: Object): void
执行查询,结果通过回调处理

### insert(sql: String, returnAutoGeneratedKeys: Boolean, ...args: Object): String
执行插入，`returnAutoGeneratedKeys`为true时返回自增ID

### update(sql: String, ...args: Object): int
执行更新或者删除

### commit(): void
提交事务

### rollback(): void
回滚事务

### close(): void
关闭数据连接

**示例**
```javascript
const connection = informat.datasource.getConnection('dataSource', 'db_informat', {
    "autoCommit": true
})
connection.select('select * form table', (row) => {
    console.log(row.getString(1))
})
// 关闭连接
connection.close();
```

# informat.bpmn 工作流操作

## processEngine(): ProcessEngine
获取流程引擎实例，可用于直接调用底层API
**示例**
```js
// 设置工作流任务负责人
let processEngine = informat.bpmn.processEngine();
let taskService = processEngine.getTaskService();
taskService.setAssignee('dcc50d2e-0601-11ef-92a9-0e6cd3d9f023', 'zhangsan');
```

## getBpmnProcessDefineList(moduleId: String, query: [InformatBpmnProcessQuery]): Array<[BpmnProcess]>
查询工作流定义列表
-`moduleId`:工作流模块标识符

## isMultiInstanceActivity(procDefId: String, activityId: String): Boolean
判断节点是否为多实例节点
-`procDefId`:流程定义ID

## queryInstanceList(moduleId: String, query: [BpmnInstanceQuery]): Array<[BpmnInstance]>
查询工作流实例列表

## addComment(moduleId: String, taskId: String, msg: String): String
添加工作流评论。返回评论ID

## deleteComment(moduleId: String, taskId: String, id: String): int
删除工作流评论。返回删除数量

## queryInstanceById(moduleId: String, instanceId: String): [BpmnInstance]
根据ID查询工作流实例

## queryTaskList(moduleId: String, query: [BpmnTaskQuery]): Array<[BpmnTask]>
查询任务列表

## queryTaskListCount(moduleId: String, query: [BpmnTaskQuery]): int
查询任务总数

## queryTaskById(moduleId: String, taskId: String): [BpmnTask]
根据ID查询任务

## createInstance(moduleId: String, processDefineId: String, startUserId: String, form: Object, vars: Object): String
创建工作流实例。返回实例ID

## setTaskAssignee(moduleId: String, taskId: String, userId: String): void
设置任务处理人

## setTaskOwner(moduleId: String, taskId: String, userId: String): void
设置任务所有者

## claimTask(moduleId: String, taskId: String, userId: String): void
指派任务（将任务的责任分配给一个具体的参与者）

## unclaimTask(moduleId: String, taskId: String): void
取消任务的指派

## transferTask(moduleId: String, taskId: String, userId: String): void
转交任务

## delegateTask(moduleId: String, taskId: String, userId: String, autoDelegate: Boolean): void
委托任务

## completeTask(moduleId: String, taskId: String, variables: Object): void
完成任务
-`variables`:完成任务时需要传递给后续步骤的输出数据和流程变量

## moveToActivity(moduleId: String, taskId: String, targetActivityId: String): void
移动流程节点

## revokeInstance(moduleId: String, instanceId: String, reason: String): void
撤销流程实例

## deleteInstance(moduleId: String, instanceId: String, reason: String): void
删除流程实例

## getHistoryTaskVariables(taskId: String): Object
获取历史任务变量

## getHistoryTaskVariable(taskId: String, variableName: String): Object
获取历史任务变量

## deleteTasks(moduleId: String, taskIds: Array<String>, deleteReason: String, cascade: Boolean): void
批量删除任务


# informat.codec 编码解码

## hash(str: String, method: String): String
计算字符串的哈希值。  
支持算法：`md5`, `sha1`, `sha256`, `sha224`, `sha384`, `sha512`

## base64Encode(str: String): String
将字符串编码为Base64格式

## base64EncodeToBytes(str: String): Array<Byte>
将字符串编码为Base64字节数组

## base64Decode(str: String): Array<Byte>
将Base64字符串解码为字节数组

## base64DecodeToString(str: String): String
将Base64字符串解码为原始字符串

## base64DecodeFromBytes(bytes: Array<Byte>): Array<Byte>
将Base64字节数组解码为原始字节数组

## sign(str: String, method: String, privateKey: String): String
使用RSA私钥对字符串进行签名。  
支持签名算法：  
`MD2withRSA`, `MD5withRSA`, `SHA1withRSA`, `SHA224withRSA`,  
`SHA256withRSA`, `SHA384withRSA`, `SHA512withRSA`, `MD5andSHA1withRSA`

## rsaEncryptHexByPrivateKey(data: String, privateKey: String): String
使用RSA私钥加密数据，返回十六进制字符串

## rsaEncryptBase64ByPrivateKey(data: String, privateKey: String): String
使用RSA私钥加密数据，返回Base64字符串

## rsaEncryptHexByPublicKey(data: String, publicKey: String): String
使用RSA公钥加密数据，返回十六进制字符串

## rsaEncryptBase64ByPublicKey(data: String, publicKey: String): String
使用RSA公钥加密数据，返回Base64字符串

## rsaDecryptByPublicKey(data: String, publicKey: String): String
使用RSA公钥解密数据。

## rsaDecryptByPrivateKey(data: String, privateKey: String): String
使用RSA私钥解密数据


# informat.email 邮件相关操作

## informat.email.send(server: [EmailServer], message: [EmailMessage])
发送邮件

## informat.email.sendWithSystemServer(message: [EmailMessage])
使用系统邮箱发送邮件

# informat.file 本地文件

使用`informat.file`对象进行文件操作,所有的文件都会存储在app沙盒环境
*术语说明*
- app沙盒环境：app的运行环境。每个app都是在自己的沙盒中运行的，不能直接访问其他app的资源文件和数据。
- app沙盒中的文件路径：以app目录作为根目录的文件路径，例如，app的沙盒环境的根目录是`/`

## getFile(path: String): [File]
获取文件信息

## getRealPath(path: String): String
获取文件完整路径
**示例**
```
/home/appadmin/informat_home/file_storage/localfiles/g09aj7cus3d8s/ey89pc358ousw/gzb.xlsx
```

## create(path: String): Boolean
创建文件。返回是否成功

## mkdirs(path: String): Boolean
创建文件夹。返回是否成功

## delete(path: String): Boolean
删除文件,文件不存在时报错

## deleteDirectory(path: String): Boolean
递归删除文件夹及其所有内容。返回是否成功

## exists(path: String): Boolean
检查文件或文件夹是否存在

## isDirectory(path: String): Boolean
判断路径是否为文件夹

## listFile(path: String): Array<String>
列出文件夹下的所有文件和子文件夹名称

## move(source: String, target: String): Boolean
移动文件或文件夹。返回是否成功

## copy(source: String, target: String): Boolean
复制文件（不支持文件夹）。返回是否成功

## zip(sourcePath: String, targetPath: String, charsetName?: String, withSrcDir?: Boolean): Boolean
压缩文件或文件夹。
- `charsetName`: 字符编码（默认UTF-8）
- `withSrcDir`: 是否包含源目录结构

## unzip(sourcePath: String, targetPath: String, charsetName?: String): Boolean
解压缩文件。
- `charsetName`: 字符编码（默认UTF-8）


# informat.storage 文件存储操作

## 概述
使用`informat.storage`对象进行文件存储操作,文件存储使用S3协议存储在文件服务器中。下方所有的文件都会存储在共享存储中。

## exists(path: String): Boolean
判断文件是否存在

## download(path: String, localPath: String): void
下载共享存储文件到本地沙盒

## upload(localPath: String, remotePath: String): void
上传本地文件到共享存储

# informat.jdbc 数据库操作

## createConnection(config: ConnectionInfo): Connection
创建数据库连接。连接会自动关闭，支持事务控制

- 连接创建不成功会抛出异常
- 设置了`autoCommit`等于`true`时，在执行update、insert、delete语句时将会自动提交事务
- 执行过程中出错会自动回滚
- 在脚本执行结束后，创建的连接会自动关闭

## Connection 连接对象方法

### select(sql: String, handler: Function([ResultSet]), ...args: Object): void
执行查询SQL，结果通过回调处理

### insert(sql: String, returnAutoGeneratedKeys: Boolean, ...args: Object): int
执行插入SQL。`returnAutoGeneratedKeys`为true时返回自增ID

### update(sql: String, ...args: Object): int
执行更新/删除SQL，返回影响行数

### commit(): void
提交事务

### rollback(): void
回滚事务

## informat.jdbc.tableConnection()
获取应用数据表的数据库连接
- 使用应用数据表的数据库连接可以查询、更新、删除应用的数据表。
- 在使用数据表连接执行查询的时候，需要将数据表的标识符转换为小写形式
返回数据库连接对象[Connection]

**示例**
例如有数据表`tableDemo`
| 字段标识符  |
|--------|
| id     | 
| name   |
| maxAge |

需要使用以下SQL执行查询
```sql
select id, name, max_age from table_demo;
```

::: tip 如果想查询关联列表字段对应的`邻接表`,查询的格式为：
数据表标识符$字段标识符(驼峰转为下划线)
:::
**示例**
```javascript
var ret = []
var conn = informat.jdbc.tableConnection();
var sql = `select a.id from task$report a 
		inner join task b on a.id=b.id`;
conn.select(sql, (rs) => {
    ret.push(rs.getString('id'))
})
console.log('ret', ret);
```



# informat.notification 系统通知

## informat.notification.sendNotification(notification)

参数:notification [Notification]
```js
const notificationId = informat.notification.sendNotification({
    title: '通知标题',
    content: '通知内容',
    accountId: informat.app.userId(),
    type: "openurl", // openurl||openrecord|openbpmntask
    urlSetting: {
        url: "https://next.informat.cn/",
        "isAppURL": false
    },
    recordSetting: {
        recordId: null,
        moduleId: null,
    },
    bpmnTaskSetting: {
        taskId: null,
        moduleId: null
    }
})
```

# informat.excel excel文件相关
底层使用poi-4.1.2版本

## informat.notification.openExistFile(file)
打开一个已经存在的Excel文件，参数file是app的沙盒环境中的文件地址
返回Workbook对象

## informat.notification.openNewFile(file)
创建一个新的Excel文件,参数file是app的沙盒环境中的文件地址
返回Workbook对象

## informat.notification.openWithTemplate(file, templateFile, data)
根据模版创建Workbook,返回Workbook对象

## Workbook 对象
### workbook.createSheet(sheetName)
返回Sheet对象
### workbook.getSheet(sheetName)
返回Sheet对象
### workbook.getSheetAt(sheetIndex)
sheetIndex从0开始,返回Sheet对象
### workbook.getNumberOfSheets()
获取sheet的数量
### workbook.write()
将内容写入文件
## Sheet 对象
### sheet.getSheetName()
### sheet.createRow(row)
### sheet.getRow(row)
返回Row对象
### sheet.removeRow(row)
### sheet.getFirstRowNum()
### sheet.getLastRowNum()
### sheet.addMergedRegion(firstRow, lastRow, firstColumn, lastColumn)
### sheet.addPicture(col, row, filePath)

## Row 对象
### row.createCell(colIdx)
### row.createCellWithValue(colIdx, value)
### row.getCell(colIdx)
返回Cell 对象
### row.removeCell(colIdx)
### row.getFirstCellNum()
### row.getLastCellNum()
### row.getRowNum()

## Cell 对象
### cell.setValue(value)
### cell.getValue()
### cell.getValueEvaluated()
### cell.setStyle(cs)
### cell.getStyle()
### cell.setHyperlink(link)
### cell.getHyperlink()

# 模型定义
## 应用
### Account 账号
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| avatar | string | |
| userName | string | |
| mobileNo | string | |
| email | string | |
| companyId | string | |
| companyList | string | 团队列表 |
| oid | string | 第三方ID |
| createTime | Date | |
| updateTime | Date | |
| language | string | |
| needUpdatePassword | boolean | |
| isValid | boolean | |

### AccountAddForm 添加账号
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| userName | string | |
| mobileNo | string | |
| email | string | |
| password | string | |
| oid | string | 第三方ID |
| avatar | string | |
| remark | string | |
| needUpdatePassword | boolean | |

### AccountToken 账号登录凭证
| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | 类型 |
| accountId | string | |
| companyId | string | |
| token | string | 凭证 |
| expireTime | Date | |
| createTime | Date | |
| dbIndex | number | 数据库索引 |

### App 应用
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| icon | string | |
| color | string | |
| appDefineId | string | 应用标识符 |
| logLevel | string | 日志级别 |
| env | string | 运行环境 |
| groupId | string | 分组 |
| createAccountId | string | |
| updateAccountId | string | |
| createTime | Date | |
| updateTime | Date | |

### AppChangeLog 应用操作日志
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| type | string | 类型 |
| content | string | |
| createAccountId | string | |
| createAccountAvatar | string | |
| createAccountName | string | |
| createTime | Date | |

### AppDefine 应用配置
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| color | string | |
| roleList | array<ObjectRef> | |
| moduleList | array<ObjectRef> | |
| automaticList | array<ObjectRef> | 自动化列表 |
| scriptList | array<ObjectRef> | 脚本列表 |
| scheduleList | array<ObjectRef> | 定时任务列表 |
| apiList | array<ObjectRef> | |

### AppEvent 应用事件
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| content | object | |

### AppEventDefine 应用事件定义
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| key | string | 标识符 |
| name | string | |
| remark | string | |

---

## 工作流
### BpmnComment 工作流评论
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| createTime | Date | |
| userId | string | |
| taskId | string | |
| procInstId | string | 流程实例ID |
| message | string | |
| type | string | 类型 |

### BpmnCommentQuery 工作流评论查询
| 字段 | 类型 | 说明 |
|------|------|------|
| procInstId | string | |
| taskId | string | |
| executionId | string | 执行ID |
| filter | InformatFilter | 过滤器 |
| pageIndex | number | 页码，默认 1 |
| pageSize | number | 每页大小，默认 50 |
| orderByList | array<OrderBy> | |
| includeFields | LinkedHashSet | 返回字段列表 |
| excludeFields | Set | 包含字段列表 |

### BpmnInstance 工作流实例
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| procInstId | string | 工作流实例ID |
| businessKey | string | 业务key |
| procDefId | string | 工作流定义ID |
| isActive | boolean | |
| startTime | Date | |
| endTime | Date | |
| taskCount | number | |
| startUserId | string | |
| startUserName | string | |
| startUserAvatar | string | |
| procDefName | string | 工作流定义名称 |
| tenantId | string | 应用ID和模块ID |
| deleteReason | string | |

### BpmnInstanceQuery 工作流实例查询
| 字段 | 类型 | 说明 |
|------|------|------|
| status | string | 实例状态 doing/done |
| processDefineId | string | 工作流定义标识符 |
| name | string | |
| startUserId | string | |
| startTimeStart | Date | |
| startTimeEnd | Date | |
| endTimeStart | Date | |
| endTimeEnd | Date | |
| varList | array<BpmnVar> | 工作流变量列表 |
| filter | InformatFilter | 过滤器 |
| pageIndex | number | 默认 1 |
| pageSize | number | 默认 50 |
| orderByList | array<OrderBy> | |
| includeFields | LinkedHashSet | 返回字段列表 |
| excludeFields | Set | 包含字段列表 |

### BpmnProcess 工作流定义
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 流程ID |
| key | string | 标识符 |
| name | string | |
| icon | string | |
| remark | string | |
| color | string | |
| rowNumber | number | |
| createTime | Date | |
| updateTime | Date | |

### BpmnProcessQuery
| 字段 | 类型 | 说明 |
|------|------|------|
| accountId | string | 可以发起流程的账号ID |
| name | string | |
| filter | InformatFilter | 过滤器 |
| pageIndex | number | 默认 1 |
| pageSize | number | 默认 50 |
| orderByList | array<OrderBy> | |
| includeFields | LinkedHashSet | 返回字段列表 |
| excludeFields | Set | 包含字段列表 |

### InformatBpmnProcessQuery 工作流定义查询
| 字段 | 类型 | 说明             |
|------|------|----------------|
| accountId | string | 可以发起流程的账号ID,必传 |
| name | string |                |

### BpmnTask 工作流任务
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| procDefId | string | 工作流定义ID |
| procDefName | string | |
| procInstId | string | 工作流实例ID |
| procInstName | string | |
| taskDefKey | string | 任务定义Key |
| executionId | string | 任务执行ID |
| tenantId | string | 应用ID和模块ID |
| assignee | string | 责任人ID |
| assigneeName | string | |
| assigneeAvatar | string | |
| delegation | string | 委托状态 |
| owner | string | 委托或转交人 |
| ownerName | string | |
| ownerAvatar | string | |
| startUserId | string | 发起人 |
| startUserName | string | |
| startUserAvatar | string | |
| dueDate | Date | 逾期时间 |
| claimTime | Date | 认领时间 |
| startTime | Date | |
| endTime | Date | |
| duration | number | 持续时间 |
| deleteReason | string | |
| lastUpdatedTime | Date | |

### BpmnTaskCc 工作流任务抄送
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| taskId | string | |
| copyUserId | string | |
| startUserId | string | |
| copyUserAvatar | string | |
| copyUserName | string | |

### BpmnTaskQuery 工作流任务查询
| 字段 | 类型 | 说明 |
|------|------|------|
| accountId | string | 责任人账号ID |
| status | string | 状态 doing/done |
| assignee | string | 指派类型 |
| taskName | string | |
| procInstId | string | |
| createTimeStart | Date | |
| createTimeEnd | Date | |
| executionId | string | |
| filter | InformatFilter | 过滤器 |
| pageIndex | number | 默认 1 |
| pageSize | number | 默认 50 |
| orderByList | array<OrderBy> | |
| includeFields | LinkedHashSet | |
| excludeFields | Set | |

---

## 团队
### AppGroup 应用分组
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| rowNumber | number | |
| createTime | Date | |
| updateTime | Date | |

### Company 团队
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| dbIndex | number | 数据库索引 |
| avatar | string | |
| favicon | string | 浏览器图标 |
| version | string | |
| createAccountId | string | |
| maxUserNum | number | |
| maxApplicationNum | number | |
| createTime | Date | |
| updateTime | Date | |

### CompanyMember 团队成员
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| leaderList | array<String> | 直属上级列表 |
| roleList | array<String> | 角色列表 |
| departmentList | array<String> | |
| departmentKeyList | array<String> | 所在部门标识符列表 |
| dingtalkUserId | string | 钉钉账号ID |
| weworkUserId | string | 企业微信账号ID |
| feishuUserId | string | 飞书账号ID |
| rowNumber | number | |
| createTime | Date | |
| updateTime | Date | |

### CompanyRole 团队角色
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 标识符 |
| name | string | |
| isAdmin | boolean | 是否为管理员 |
| permissionIds | Set | |
| createTime | Date | |

### UserAppList 应用列表
| 字段 | 类型 | 说明 |
|------|------|------|
| appList | array<App> | |
| appGroupList | array<AppGroup> | |

---

## 部门
### Department 部门
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| shortName | string | |
| remark | string | |
| parentId | string | 上级部门ID |
| ownerList | array<String> | 负责人列表 |
| rowNumber | number | |
| isDisable | boolean | |

---

## 应用设计
### DefineObject 应用设计模型
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| key | string | 标识符 |
| scope | string | 作用域 |
| name | string | |
| displayName | string | |
| remark | string | |
| build | number | |
| draftVersion | number | |
| isDeleted | boolean | |
| parentId | string | |
| parentName | string | |
| createUser | string | |
| updateUser | string | |
| createTime | string | |
| updateTime | string | |

---

## 邮箱
### EmailRecipient email收件人
| 字段 | 类型 | 说明 |
|------|------|------|
| address | string | |
| personal | string | |
| type | string | |

### EmailServer email服务器
| 字段 | 类型 | 说明 |
|------|------|------|
| host | string | |
| port | number | |
| ssl | boolean | 是否启用ssl |
| auth | boolean | 是否启用认证 |
| account | string | |
| password | string | |
| protocol | string | |

---

## 文件
### File 文件
| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | |
| path | string | 文件路径 |
| absolutePath | string | 绝对路径 |
| isAbsolute | boolean | 是否绝对路径 |
| canRead | boolean | 是否可读 |
| canWrite | boolean | 是否可写 |
| isDirectory | boolean | |
| isFile | boolean | |
| totalSpace | number | |
| usableSpace | number | 可用大小 |
| lastModified | number | |
| length | number | |

---

## Http
### HttpRequest HTTP请求
| 字段 | 类型 | 说明 |
|------|------|------|
| url | string | |
| method | string | |
| timeout | number | |
| body | string | |
| charset | string | |
| followRedirect | boolean | |
| maxRedirectCount | number | |
| headers | Map | |
| overrideHeaders | Map | |
| form | Map | |
| files | Map | |
| storages | Map | |

---

## Jdbc
### ConnnectionInfo 数据库连接
| 字段 | 类型 | 说明 |
|------|------|------|
| dburl | string | |
| dbuser | string | |
| dbpassword | string | |
| driverClassName | string | |
| autoCommit | boolean | 默认为true |

### JDBCResultSet JDBC结果集
| 字段 | 类型 | 说明 |
|------|------|------|
| rs | ResultSet | 结果集 |

---

## 通知
### Notification 通知
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| accountId | string | |
| companyId | string | |
| applicationId | string | |
| name | string | |
| type | string | 类型 |
| content | string | |
| data | string | |
| isRead | boolean | |
| isWebSend | boolean | web是否发送 |
| isWeworkSend | boolean | 企业微信是否发送 |
| isDingTalkSend | boolean | 钉钉是否发送 |
| isFeishuSend | boolean | 飞书是否发送 |
| isCustomSend | boolean | 自定义通知是否发送 |
| createTime | Date | |
| updateTime | Date | |

### NotificationAutomaticSetting 调用自动化配置
| 字段 | 类型 | 说明 |
|------|------|------|
| automaticId | string | |
| args | array<Object> | 参数列表 |

### NotificationBpmnTaskSetting 工作流任务配置信息
| 字段 | 类型 | 说明 |
|------|------|------|
| taskId | string | |
| moduleId | string | |

### NotificationForm 系统通知表单
| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | |
| content | string | |
| accountId | string | |
| type | string | 类型 |
| name | string | |
| urlSetting | InformatNotificationUrlSetting | 链接配置信息 |
| recordSetting | InformatNotificationReocrdSetting | 数据表记录配置信息 |
| bpmnTaskSetting | InformatNotificationBpmnTaskSetting | 工作流任务配置信息 |
| automaticSetting | InformatNotificationAutomaticSetting | 自动化配置 |

### NotificationReocrdSetting 数据表记录配置信息
| 字段 | 类型 | 说明 |
|------|------|------|
| recordId | string | |
| moduleId | string | |

### NotificationUrlSetting 链接配置信息
| 字段 | 类型 | 说明 |
|------|------|------|
| url | string | |
| isAppURL | boolean | |

### AggregationQuery
| 字段 | 类型 | 说明 |
|------|------|------|
| func | string | |
| fieldId | string | |
| distinct | boolean | |

### Condition
| 字段 | 类型 | 说明 |
|------|------|------|
| fieldId | string | |
| opt | string | |
| value | object | |
| func | string | |
| var | boolean | |
| formula | boolean | |
| ignoreNull | boolean | |

### Filter
| 字段 | 类型 | 说明 |
|------|------|------|
| opt | string | |
| conditionList | array<Condition> | 过滤条件 |
| children | array<Filter> | 子过滤条件 |

### OrderBy
| 字段 | 类型 | 说明 |
|------|------|------|
| field | string | 字段名 |
| type | string | 排序类型 |

### Query
| 字段 | 类型 | 说明 |
|------|------|------|
| filter | InformatFilter | 过滤器 |
| pageIndex | number | 默认值：1 |
| pageSize | number | 默认值：50 |
| orderByList | array<OrderBy> | |
| includeFields | LinkedHashSet | |
| excludeFields | Set | |

### LoginForm
| 字段 | 类型 | 说明 |
|------|------|------|
| userName | string | |
| password | string | |
| type | string | |
| ip | string | |

### DataAutomaticVar
| 字段 | 类型 | 说明 |
|------|------|------|
| value | string | 参数值 |

### DefaultValue
| 字段 | 类型 | 说明 |
|------|------|------|
| fieldId | string | |
| value | string | 表达式 |

### Table
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| key | string | 标识符 |

### TableAccountSimple
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| avatar | string | |

### TableAttachment
| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | |
| size | number | |
| id | string | |
| thumbnail | string | |
| path | string | |
| md5 | string | |

### TableField
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| key | string | |
| type | string | |

### TableRecordQuery
| 字段 | 类型 | 说明 |
|------|------|------|
| filter | InformatFilter | 过滤条件 |
| pageIndex | number | |
| pageSize | number | |
| orderByList | array<OrderBy> | |
| groupByList | array<String> | |
| returnOptionName | boolean | 返回optionName |
| aggregationQueryList | array<AggregationQuery> | 聚合查询 |
| includeFields | LinkedHashSet | 返回字段列表 |

### UpdateRecordConfig
| 字段 | 类型 | 说明 |
|------|------|------|
| enableChangeLog | boolean | 是否启用变更记录, 默认false |
| disableCalculateRollupField | boolean | 是否不计算查找汇总字段, 默认false表示计算 |

### User
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| avatar | string | |
| roleList | array<String> | |
| departmentList | array<String> | |
| leaderList | array<String> | |
| companyRoleList | array<String> | |
| weworkUserId | string | 企业微信账户ID |
| dingtalkUserId | string | 钉钉账号ID |
| feishuUserId | string | 飞书账号ID |
| userInfo | object | |
| permissionList | Set | |

### UserInfo
| 字段 | 类型 | 说明 |
|------|------|------|
| userName | string | |
| mobileNo | string | |
| email | string | |
| oid | string | |
| remark | string | |
| id | string | |
| name | string | |
| avatar | string | |
| roleList | array<String> | 角色 |
| departmentList | array<String> | 所属部门 |
| leaderList | array<String> | 直接上级 |
| companyRoleList | array<String> | 团队角色列表 |
| weworkUserId | string | 企业微信账户ID |
| dingtalkUserId | string | 钉钉账号ID |
| feishuUserId | string | 飞书账号ID |
| userInfo | object | 自动化扩展信息 |
| permissionList | Set | 权限列表 |

### UserRole
| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | |
| name | string | |
| isAdmin | boolean | |
| permissionList | array<String> | 权限列表 |





