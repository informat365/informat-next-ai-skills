此文档是织信低代码平台的定时任务文档。

## 概述
定时任务是一种预设任务，在特定的时间点执行预设的 自动化 程序或者脚本。例如每天早上10点钟，查询超时的任务，并且发送催办邮件。

定时任务的精度为 1分钟，也就是说所有的定时任务在执行时都会有+(0 - 60秒)的延迟。
## ScheduleDefine定义

一个 ScheduleDefine 对应一个 定时任务Schedule / Job），用于在指定时间或周期触发自动化或脚本执行，其定义结构如下：

```
{
  // =========================
  // 基本信息
  // =========================

  // 定时任务名称
  name: String,

  // 定时任务类型
  // 可选值:
  // - "default"  : 普通周期调度
  // - "cron"     : cron 表达式调度
  type: String,

  // cron 表达式（当 type = "cron" 时生效）
  cron: String,


  // =========================
  // 调用方式
  // =========================

  // 调用类型
  // 可选值:
  // - "script"    : 调用脚本
  invokeType: String,

  // 脚本ID（invokeType = "script" 时）
  scriptId: String,        // @Ref(CallScript)

  // 脚本函数名
  scriptFunc: String,


  // =========================
  // 调度规则（非 cron）
  // =========================

  // 调度周期类型
  // 可选值:
  // - "day"       : 每日
  // - "week"      : 每周
  // - "dualweek"  : 双周
  // - "month"     : 每月
  // - "interval"  : 间隔执行
  schedulePeriod: String,

  // 每周调度的星期列表（1-7，对应周一到周日）
  scheduleWeekList: List<Integer>,

  // 每月调度的日期列表（1-31）
  scheduleDayList: List<Integer>,

  // 首次触发时间
  scheduleTriggeredTime: Date,

  // 间隔执行时间（单位：分钟，仅当 schedulePeriod = "interval"）
  scheduleInterval: int,

  // =========================
  // 执行控制
  // =========================

  // 是否启用该定时任务
  isEnable: boolean,



```

【重要规则】
- ScheduleDefine 中引用的所有 scriptId / scriptFunc 必须在应用中真实存在，禁止在 ScheduleDefine 定义中引用尚未创建的脚本或函数。
- 所有脚本函数必须通过 export function 明确导出


## 触发类型
在织信AI低代码平台中，定时任务的类型主要有以下两种：

- 默认（周期触发）：这种类型的定时任务按照预设的周期性时间间隔自动触发。例如，可以设置任务每小时、每天或每周触发一次。

- cron表达式：这种类型的定时任务使用Cron表达式来定义复杂的时间调度规则。Cron表达式是一种字符串格式，用于表示时间表，允许用户精确地定义任务在特定时间点或时间间隔内触发。

## 示例

默认（周期触发）：
每天凌晨1点触发任务。
每周一早上8点触发任务。

cron表达式：

0 0 1 * * ?：每天凌晨1点触发任务。
0 0 8 ? * MON：每周一早上8点触发任务。