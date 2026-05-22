---
name: informat
description: "织信(Informat)AI智能开发平台系统方法调用skill。核心规则：1.任何创建或修改操作前，必须先查询现有结构，获取真实ID后才能操作，严禁凭空构造ID或字段名。2.调用带参数的方法前，必须先用cat读取{baseDir}/references/目录下对应的参数文档（文件名格式system_<方法名去掉前缀_>.json），严格按文档定义传参。3.数据表id字段不得使用系统保留字段比如id、seq等。4.必须严格按照参数文档中的参数类型、必填项、枚举值、嵌套结构构建传参，不得虚构捏造。"
when_to_use: "当用户要操作织信(Informat)平台的数据表、应用、API、自动化、脚本等功能时，必须调用此技能。包括创建表、查询数据、配置自动化流程、开发脚本等所有织信平台相关操作。"
---

[English](README.md)

# 织信(Informat)平台系统方法

共 178 个方法。每个方法的参数定义文件在 `{baseDir}/references/` 下。
> 📚 **参考文档目录**：`{baseDir}/references/doc/` 下包含平台完整开发文档：
> - `references/doc/markdown/` 目录：平台核心功能官方文档（AI助手、API、自动化、仪表盘、表达式、定时任务、脚本、数据表、任务、网站等）
> - `references/doc/script/` 目录：脚本API参考文档，按模块分类（bpmn.md、table.md、form.md等），开发脚本时优先查阅


## 调用规则

根据方法名前缀，系统自动选择对应的智能体接口：

| 前缀 | 接口类型 | 必需参数 |
|------|---------|---------|
| `_wb_` | 工作台智能体 | 无额外参数 |
| `_company_` | 团队智能体 | 无额外参数 |
| 公共方法 | 公共智能体 | 无额外参数 |
| 其他 | 应用智能体 | `--appId` |

### 调用方式

```bash
# 步骤1：读取参数文档（带参数的方法必须先读）
cat {baseDir}/references/system_query_table_define.json

# 步骤2：写参数文件
echo '{"tableId":"myTable"}' > params.json

# 步骤3：执行
# 应用方法（需要 --appId）
node {baseDir}/scripts/call_informat.js _query_table_define --appId <appId> --file params.json

# 公共方法（无需 --appId）
node {baseDir}/scripts/call_informat.js _get_current_time

# 团队方法（无需 --appId）
node {baseDir}/scripts/call_informat.js _company_app_list

# 工作台方法（无需 --appId）
node {baseDir}/scripts/call_informat.js _wb_get_login_info
```

### 获取应用ID

```bash
# 1. 查询所有应用列表
node {baseDir}/scripts/call_informat.js _company_app_list

# 2. 从返回结果中找到目标应用的ID，用于后续调用
node {baseDir}/scripts/call_informat.js _query_app_define_designer --appId <appId>
```

## 配置

支持两种方式，系统环境变量优先于 `.env` 文件。

**INFORMAT_HOST**：织信平台地址，通常设置为 `https://ai.ainformat.com/`（公有云 SaaS），也可替换为私有部署地址。

```bash
# 方式一：系统环境变量（优先）
export INFORMAT_HOST=https://ai.ainformat.com/
export INFORMAT_AGENT_TOKEN=<your-agent-token>

# 方式二：编辑 {baseDir}/scripts/.env
INFORMAT_HOST=https://ai.ainformat.com/
INFORMAT_AGENT_TOKEN=<your-agent-token>
```

> 💡 **获取 Token**：登录后访问 `<INFORMAT_HOST>/workbench/account/aiAgentApiKey`（例如 `https://ai.ainformat.com/workbench/account/aiAgentApiKey`）获取 `INFORMAT_AGENT_TOKEN`。

## 操作前必须先查询 -- 最重要的规则

执行任何创建或修改操作前，必须先查询系统现有结构，获取真实ID。严禁凭空构造任何ID或字段名。

查询不能只查列表就够了，必须进一步查询每张相关表的完整字段结构。因为创建关联字段时需要目标表的字段ID，仅知道表ID是不够的。

### 创建应用前

```
1. _company_app_list          -> 获取现有所有的应用 包括应用标识符唯一
```

### 创建数据表前

```
1. _query_table_list_designer          -> 获取现有所有表及其ID
2. 对每张可能被关联的表分别调用
   _query_table_define_designer        -> 获取该表的完整字段列表（字段ID、字段类型、选项值等）
   这一步不能省略，因为关联字段需要目标表的字段ID
3. cat {baseDir}/references/system_create_table_module.json  -> 阅读参数文档
4. 用查询到的真实表ID和字段ID构造参数，创建新表
```

为什么必须查每张表的字段结构：
- RelationRecord 字段需要 tableId（目标表ID）和 nameFieldId（目标表中用于显示的字段ID）
- RelationRecordField 字段需要 fieldId（本表外键字段ID）、targetTableId、targetFieldId
- LookupList 字段需要子表ID和子表中外键字段的ID
- LookupRollup 字段需要子表ID和子表中的聚合字段ID
- 这些ID只有通过 _query_table_define_designer 查询才能获得

### 创建仪表盘卡片前

```
1. _query_table_list_designer          -> 获取所有表ID
2. 对目标数据源表调用
   _query_table_define_designer        -> 获取该表所有字段ID和字段类型
   不查字段结构就无法正确配置聚合字段、分组字段、筛选条件
3. _read_informat_dashboard_document   -> 获取仪表盘文档
4. cat {baseDir}/references/system_save_dashboard_prochart_card.json
   或 system_save_dashboard_number_card.json  -> 阅读参数文档
5. 用查询到的真实字段ID构造卡片参数
```

### 创建自动化前

```
1. _query_app_define_designer          -> 获取模块列表、已有自动化分组
2. _query_table_list_designer          -> 获取所有表ID
3. 对自动化涉及的每张表分别调用
   _query_table_define_designer        -> 获取字段ID（自动化步骤中的字段映射、筛选条件都需要真实字段ID）
4. _automatic_doc                      -> 获取自动化文档
5. cat {baseDir}/references/system_automatic_save_define.json  -> 阅读参数文档
6. 用查询到的真实ID构造自动化步骤
```

### 创建工作流前

```
1. _query_app_define_designer -> 获取模块列表
2. _query_table_list_designer + _query_table_define_designer -> 获取表和字段
3. _read_informat_expression_doc -> 获取表达式文档（工作流大量使用表达式）
4. 阅读对应的参数文档
5. 按顺序创建：模块 -> 流程定义 -> 启动配置 -> 节点 -> 流转线
```

### 创建脚本前

```
1. _query_informat_script_list -> 获取已有脚本和目录
2. _read_informat_script_sdk -> 获取脚本SDK文档
3. 查阅 {baseDir}/references/doc/script/ 下对应模块的脚本文档（如bpmn.md、table.md等），了解API使用规范
4. 需要时先创建目录 _create_informat_script_directory
5. 阅读 cat {baseDir}/references/system_save_informat_script.json
6. 创建或编辑脚本（编辑时必须传已有的脚本ID，不能重复创建）
```

### 编辑字段前

```
1. _query_table_list_designer -> 找到目标表
2. _query_table_define_designer -> 获取该表完整字段列表
3. _read_informat_expression_doc -> 如需配置表达式
4. 阅读 cat {baseDir}/references/system_edit_table_field.json
5. 用真实的tableId和fieldId操作
```

### 操作数据记录前

```
1. _query_all_table_list -> 获取已发布的表ID
2. _query_table_define -> 获取已发布的字段结构
3. 阅读对应参数文档
4. 用真实字段ID构造记录数据
```

## 工作台智能体方法列表

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [用户端] | `_wb_set_curr_appid` | 设置当前会话上下文的应用ID | `references/system_wb_set_curr_appid.json` MUST READ |
| [用户端] | `_wb_process_define_list` | 获取当前用户能发起的工作流列表 | `references/system_wb_process_define_list.json` MUST READ |
| [用户端] | `_wb_get_process_define` | 获取指定工作流流程定义配置 | `references/system_wb_get_process_define.json` MUST READ |
| [用户端] | `_wb_get_table_info` | 获取指定数据表结构信息 | `references/system_wb_get_table_info.json` MUST READ |
| [用户端] | `_wb_get_login_info` | 获取我的登录信息包括用户信息和系统配置信息 | none |
| [用户端] | `_wb_create_instance` | 创建启动工作流流程实例 | `references/system_wb_create_instance.json` MUST READ |
| [用户端] | `_wb_query_instance_list` | 查询当前用户发起的全部流程实例（跨应用） | `references/system_wb_query_instance_list.json` MUST READ |
| [用户端] | `_wb_query_instance_info` | 查询工作台流程实例详情 | `references/system_wb_query_instance_info.json` MUST READ |
| [用户端] | `_wb_query_task_list` | 查询工作台工作流任务列表（跨应用） | `references/system_wb_query_task_list.json` MUST READ |
| [用户端] | `_wb_query_task_info` | 查询工作台工作流任务详情 | `references/system_wb_query_task_info.json` MUST READ |
| [用户端] | `_wb_complete_task` | 完成（审批通过）工作台工作流任务 | `references/system_wb_complete_task.json` MUST READ |
| [用户端] | `_wb_ask_ai` | 向AI助手提问 | `references/system_wb_ask_ai.json` MUST READ |


## 团队智能体方法列表

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [团队] | `_company_app_list` | 查询应用列表 | `references/system_company_app_list.json` MUST READ |
| [团队] | `_company_app_create` | 创建应用 | `references/system_company_app_create.json` MUST READ |
| [团队] | `_company_app_update` | 修改团队应用信息（名称、分组等） | `references/system_company_app_update.json` MUST READ |
| [团队] | `_company_app_group_list` | 获取应用分组列表 | `references/system_company_app_group_list.json` MUST READ |
| [团队] | `_company_app_group_create` | 创建应用分组 | `references/system_company_app_group_create.json` MUST READ |
| [团队] | `_company_app_group_update` | 更新应用分组 | `references/system_company_app_group_update.json` MUST READ |
| [团队] | `_company_app_group_delete` | 删除应用分组（危险操作） | `references/system_company_app_group_delete.json` MUST READ |
| [团队] | `_company_department_list` | 获取团队部门列表 | `references/system_company_department_list.json` MUST READ |
| [团队] | `_company_department_create` | 在公司中创建新部门 | `references/system_company_department_create.json` MUST READ |
| [团队] | `_company_department_update` | 更新公司中的现有部门 | `references/system_company_department_update.json` MUST READ |
| [团队] | `_company_department_delete` | 删除公司中的现有部门（危险操作） | `references/system_company_department_delete.json` MUST READ |
| [团队] | `_company_role_list` | 查询角色列表 | `references/system_company_role_list.json` MUST READ |
| [团队] | `_company_role_create` | 在公司中创建新角色 | `references/system_company_role_create.json` MUST READ |
| [团队] | `_company_role_update` | 更新公司中的现有角色 | `references/system_company_role_update.json` MUST READ |
| [团队] | `_company_role_delete` | 删除公司中的现有角色（危险操作） | `references/system_company_role_delete.json` MUST READ |
| [团队] | `_company_role_permission_list` | 查询团队支持的角色权限列表 | none |
| [团队] | `_company_member_list` | 查询团队成员列表 | `references/system_company_member_list.json` MUST READ |
| [团队] | `_company_member_list_count` | 获取企业成员总数 | `references/system_company_member_list_count.json` MUST READ |
| [团队] | `_company_member_create` | 添加已有账号为团队成员 | `references/system_company_member_create.json` MUST READ |
| [团队] | `_company_member_create_new` | 创建新账号并添加为团队成员 | `references/system_company_member_create_new.json` MUST READ |
| [团队] | `_company_member_update` | 编辑团队成员 | `references/system_company_member_update.json` MUST READ |
| [团队] | `_company_member_delete` | 删除团队成员（危险操作） | `references/system_company_member_delete.json` MUST READ |
| [团队] | `_company_member_info` | 查询团队成员详情 | `references/system_company_member_info.json` MUST READ |
| [团队] | `_company_get_ai_model_list` | 获取团队AI模型列表 | none |


## 应用智能体方法列表

> [应用设计端] = 草稿环境。[用户端] = 已发布环境。

### API(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_api_create_define` | 创建API定义 | `references/system_api_create_define.json` MUST READ |
| [应用设计端] | `_api_delete_define` | 删除API定义（危险操作） | `references/system_api_delete_define.json` MUST READ |
| [应用设计端] | `_api_doc` | 查询织信API文档 | none |
| [应用设计端] | `_api_query_define_designer` | 查询单个API详细定义 | `references/system_api_query_define_designer.json` MUST READ |
| [应用设计端] | `_api_query_define_list` | 查询应用下API定义列表 | none |
| [应用设计端] | `_api_update_define` | 更新API定义，updateFieldList声明要修改的字段 | `references/system_api_update_define.json` MUST READ |

### 应用-App(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_app_check_setting` | 发布前校验草稿配置合法性 | none |
| [应用设计端] | `_app_create_role` | 创建应用角色 | `references/system_app_create_role.json` MUST READ |
| [应用设计端] | `_app_delete_draft_define` | 删除草稿版本Define（不可恢复） | `references/system_app_delete_draft_define.json` MUST READ |
| [应用设计端] | `_app_get_define_list` | 获取应用定义对象列表 | `references/system_app_get_define_list.json` MUST READ |
| [应用设计端] | `_app_get_define_object` | 获取单个定义对象详情 | `references/system_app_get_define_object.json` MUST READ |
| [应用设计端] | `_app_get_define_type` | 获取支持的定义对象类型 | none |
| [应用设计端] | `_app_get_draft_define_count` | 草稿变更数量统计 | none |
| [应用设计端] | `_app_get_draft_define_list` | 草稿对象列表 | none |
| [应用设计端] | `_app_publish` | 发布应用到正式环境（AI不应调用，提醒用户操作） | `references/system_app_publish.json` MUST READ |
| [应用设计端] | `_app_save_define_object` | 保存定义对象结构 | `references/system_app_save_define_object.json` MUST READ |
| [应用设计端] | `_app_set_themestyle` | 设置应用主题样式（调用前先查_app_themestyle_doc） | `references/system_app_set_themestyle.json` MUST READ |
| [应用设计端] | `_app_themestyle_doc` | 查询应用主题样式文档 | none |
| [应用设计端] | `_query_app_define_designer` | 查询应用设计端应用配置（模块列表、角色、API、自动化分组等） | none |
| [应用设计端] | `_create_module_group` | 创建模块分组 | `references/system_create_module_group.json` MUST READ |
| [应用设计端] | `_update_module_and_group_order` | 更新模块排序 | `references/system_update_module_and_group_order.json` MUST READ |

### 数据表-Table(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_create_table_module` | 创建数据表（创建前必须先查询已有表和字段结构） | `references/system_create_table_module.json` MUST READ |
| [应用设计端] | `_create_table_field_group` | 创建数据表字段分组 | `references/system_create_table_field_group.json` MUST READ |
| [应用设计端] | `_table_save_filter_condition` | 设置数据表视图筛选条件 | `references/system_table_save_filter_condition.json` MUST READ |
| [应用设计端] | `_table_save_datasource_dbview` | 保存数据库视图数据表SQL配置 | `references/system_table_save_datasource_dbview.json` MUST READ |
| [应用设计端] | `_table_create_tool_bar_button` | 创建数据表工具栏按钮（支持调用脚本或自动化） | `references/system_table_create_tool_bar_button.json` MUST READ |
| [应用设计端] | `_table_list_tool_bar_button` | 查询数据表工具栏按钮列表 | `references/system_table_list_tool_bar_button.json` MUST READ |
| [应用设计端] | `_table_update_tool_bar_button` | 更新数据表工具栏按钮 | `references/system_table_update_tool_bar_button.json` MUST READ |
| [应用设计端] | `_table_delete_tool_bar_button` | 删除数据表工具栏按钮 | `references/system_table_delete_tool_bar_button.json` MUST READ |
| [应用设计端] | `_table_create_form_tool_bar_btn` | 创建数据表表单工具栏按钮（支持调用脚本或自动化） | `references/system_table_create_form_tool_bar_btn.json` MUST READ |
| [应用设计端] | `_table_list_form_tool_bar_btn` | 查询数据表表单工具栏按钮列表 | `references/system_table_list_form_tool_bar_btn.json` MUST READ |
| [应用设计端] | `_table_update_form_tool_bar_btn` | 更新数据表表单工具栏按钮 | `references/system_table_update_form_tool_bar_btn.json` MUST READ |
| [应用设计端] | `_table_del_form_tool_bar_btn` | 删除数据表表单工具栏按钮 | `references/system_table_del_form_tool_bar_btn.json` MUST READ |
| [应用设计端] | `_subtable_create_tool_bar_btn` | 创建子表工具栏按钮（仅关联列表/查找列表字段，支持新增一行、删除、调用脚本或自动化） | `references/system_subtable_create_tool_bar_btn.json` MUST READ |
| [应用设计端] | `_subtable_list_tool_bar_btn` | 查询子表工具栏按钮列表 | `references/system_subtable_list_tool_bar_btn.json` MUST READ |
| [应用设计端] | `_subtable_update_tool_bar_btn` | 更新子表工具栏按钮 | `references/system_subtable_update_tool_bar_btn.json` MUST READ |
| [应用设计端] | `_subtable_delete_tool_bar_btn` | 删除子表工具栏按钮 | `references/system_subtable_delete_tool_bar_btn.json` MUST READ |
| [应用设计端] | `_query_table_list_designer` | 查询应用设计端所有表（含未发布的，不返回表字段结构） | none |
| [应用设计端] | `_query_table_define_designer` | 查询应用设计端数据表表字段结构 | `references/system_query_table_define_designer.json` MUST READ |
| [应用设计端] | `_query_table_field_designer` | 查询数据表单个字段详细配置 | `references/system_query_table_field_designer.json` MUST READ |
| [应用设计端] | `_edit_table_field` | 编辑字段（操作前必须先查询表结构获取真实ID） | `references/system_edit_table_field.json` MUST READ |
| [应用设计端] | `_edit_table_module` | 修改数据表模块信息 | `references/system_edit_table_module.json` MUST READ |

### 工作流-Bpmn(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_bpmn_create_module` | 创建工作流模块 | `references/system_bpmn_create_module.json` MUST READ |
| [应用设计端] | `_bpmn_create_process_define` | 创建流程定义 | `references/system_bpmn_create_process_define.json` MUST READ |
| [应用设计端] | `_bpmn_update_start_setting` | 更新流程启动配置 | `references/system_bpmn_update_start_setting.json` MUST READ |
| [应用设计端] | `_bpmn_create_or_update_node` | 创建/更新流程节点 | `references/system_bpmn_create_or_update_node.json` MUST READ |
| [应用设计端] | `_bpmn_create_or_update_flow` | 创建/更新流转线 | `references/system_bpmn_create_or_update_flow.json` MUST READ |
| [应用设计端] | `_bpmn_delete_node` | 删除流程节点 | `references/system_bpmn_delete_node.json` MUST READ |
| [应用设计端] | `_bpmn_delete_flow` | 删除流转线 | `references/system_bpmn_delete_flow.json` MUST READ |
| [应用设计端] | `_bpmn_query_process_define` | 查询流程定义详情 | `references/system_bpmn_query_process_define.json` MUST READ |
| [应用设计端] | `_bpmn_query_process_define_list` | 查询模块下流程定义列表 | `references/system_bpmn_query_process_define_list.json` MUST READ |

### 自动化流程-Automatic(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_automatic_create_group` | 创建自动化分组（先查_query_app_define_designer避免重复） | `references/system_automatic_create_group.json` MUST READ |
| [应用设计端] | `_automatic_delete_group` | 删除自动化分组 | `references/system_automatic_delete_group.json` MUST READ |
| [应用设计端] | `_automatic_update_group` | 编辑自动化分组 | `references/system_automatic_update_group.json` MUST READ |
| [应用设计端] | `_automatic_save_define` | 保存自动化配置（创建前必须先查表结构获取字段ID） | `references/system_automatic_save_define.json` MUST READ |
| [应用设计端] | `_automatic_query_define` | 查询自动化配置 | `references/system_automatic_query_define.json` MUST READ |
| [应用设计端] | `_automatic_run_once` | 立即执行自动化（高风险，先确认） | `references/system_automatic_run_once.json` MUST READ |
| [应用设计端] | `_automatic_doc` | 读取自动化文档 | none |

### 仪表盘-Dashboard(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_create_dashboard_module` | 创建仪表盘模块 | `references/system_create_dashboard_module.json` MUST READ |
| [应用设计端] | `_query_dashboard_list_designer` | 查询所有仪表盘 | none |
| [应用设计端] | `_query_dashboard_card_list` | 查询仪表盘卡片列表 | `references/system_query_dashboard_card_list.json` MUST READ |
| [应用设计端] | `_query_dashboard_card_detail` | 查询卡片详情 | `references/system_query_dashboard_card_detail.json` MUST READ |
| [应用设计端] | `_save_dashboard_number_card` | 创建/编辑数字卡片（先查表结构获取字段ID） | `references/system_save_dashboard_number_card.json` MUST READ |
| [应用设计端] | `_save_dashboard_prochart_card` | 创建/编辑图表卡片（先查表结构获取字段ID） | `references/system_save_dashboard_prochart_card.json` MUST READ |

### 脚本-Script(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_create_informat_script_directory` | 创建脚本目录 | `references/system_create_informat_script_directory.json` MUST READ |
| [应用设计端] | `_save_informat_script` | 保存脚本（编辑时必须传已有ID） | `references/system_save_informat_script.json` MUST READ |
| [应用设计端] | `_query_informat_script_list` | 查询脚本列表 | none |
| [应用设计端] | `_query_informat_script_content` | 查询脚本内容 | `references/system_query_informat_script_content.json` MUST READ |
| [应用设计端] | `_execute_informat_script_designer` | 在设计器中执行脚本 | `references/system_execute_informat_script_designer.json` MUST READ |

### 定时任务-Schedule(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_schedule_create_define` | 创建定时任务 | `references/system_schedule_create_define.json` MUST READ |
| [应用设计端] | `_schedule_update_define` | 更新定时任务 | `references/system_schedule_update_define.json` MUST READ |
| [应用设计端] | `_schedule_delete_define` | 删除定时任务 | `references/system_schedule_delete_define.json` MUST READ |
| [应用设计端] | `_schedule_query_define_designer` | 查询定时任务详情 | `references/system_schedule_query_define_designer.json` MUST READ |
| [应用设计端] | `_schedule_query_define_list` | 查询定时任务列表 | none |
| [应用设计端] | `_schedule_run_once` | 立即触发一次 | `references/system_schedule_run_once.json` MUST READ |
| [应用设计端] | `_schedule_doc` | 查询定时任务文档 | none |

### 国际化-I18n(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_i18n_query_define_designer` | 查询国际化配置 | none |
| [应用设计端] | `_i18n_save_define_designer` | 保存翻译定义 | `references/system_i18n_save_define_designer.json` MUST READ |
| [应用设计端] | `_i18n_save_locale_designer` | 保存语言列表 | `references/system_i18n_save_locale_designer.json` MUST READ |
| [应用设计端] | `_i18n_set_app_name` | 设置应用国际化名称 | `references/system_i18n_set_app_name.json` MUST READ |
| [应用设计端] | `_i18n_set_module_name` | 设置模块国际化名称 | `references/system_i18n_set_module_name.json` MUST READ |
| [应用设计端] | `_i18n_set_table_field_name` | 设置字段国际化名称 | `references/system_i18n_set_table_field_name.json` MUST READ |
| [应用设计端] | `_i18n_set_field_option_name` | 设置选项值国际化名称 | `references/system_i18n_set_field_option_name.json` MUST READ |

### 网站资源-Website(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_website_create_module` | 创建网站模块（先查询避免重复） | `references/system_website_create_module.json` MUST READ |
| [应用设计端] | `_website_create_directory` | 创建资源目录 | `references/system_website_create_directory.json` MUST READ |
| [应用设计端] | `_website_save_resource` | 创建/编辑资源（编辑先查ID） | `references/system_website_save_resource.json` MUST READ |
| [应用设计端] | `_website_delete_resource` | 删除资源 | `references/system_website_delete_resource.json` MUST READ |
| [应用设计端] | `_website_query_define_designer` | 查询网站模块详情 | `references/system_website_query_define_designer.json` MUST READ |
| [应用设计端] | `_website_query_list_designer` | 查询所有网站模块 | none |
| [应用设计端] | `_website_query_resource` | 查询资源详情 | `references/system_website_query_resource.json` MUST READ |
| [应用设计端] | `_website_preview` | 预览网站 | `references/system_website_preview.json` MUST READ |
| [应用设计端] | `_website_read_informat_doc` | 读取网站设计器文档 | none |

### AI助手(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_aiassistant_create` | 创建AI助手模块 | `references/system_aiassistant_create.json` MUST READ |
| [应用设计端] | `_aiassistant_update` | 更新AI助手模块 | `references/system_aiassistant_update.json` MUST READ |
| [应用设计端] | `_aiassistant_delete` | 删除AI助手模块 | `references/system_aiassistant_delete.json` MUST READ |
| [应用设计端] | `_aiassistant_doc` | 查询AI助手文档 | none |

### 监听器-AppListener(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_app_listener_create` | 创建新的监听器定义 | `references/system_app_listener_create.json` MUST READ |
| [应用设计端] | `_app_listener_update` | 更新监听器定义，updateFieldList声明要修改的字段 | `references/system_app_listener_update.json` MUST READ |
| [应用设计端] | `_app_listener_delete` | 删除监听器定义（如果是目录，会同时删除目录下的所有监听器） | `references/system_app_listener_delete.json` MUST READ |
| [应用设计端] | `_app_listener_list` | 查询当前应用下的监听器定义列表（树形结构，包含目录和子监听器） | `references/system_app_listener_list.json` MUST READ |

### 问卷调查-Survey(设计器)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [应用设计端] | `_survey_create_module` | 创建问卷模块 | `references/system_survey_create_module.json` MUST READ |
| [应用设计端] | `_survey_create_item` | 创建问卷题目 | `references/system_survey_create_item.json` MUST READ |
| [应用设计端] | `_survey_update_item` | 更新问卷题目 | `references/system_survey_update_item.json` MUST READ |
| [应用设计端] | `_survey_delete_item` | 删除问卷题目 | `references/system_survey_delete_item.json` MUST READ |
| [应用设计端] | `_survey_query_define_designer` | 查询问卷配置 | `references/system_survey_query_define_designer.json` MUST READ |

### 应用-App(用户端)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [用户端] | `_query_app_define` | 查询已发布应用配置（模块列表、角色、API等） | none |
| [用户端] | `_query_app_user` | 查询当前用户在此应用里的角色权限（管理员拥有所有权限不返回permissionList，非管理员返回moduleKey_权限名格式的权限列表） | none |
| [用户端] | `_query_app_user_list` | 查询账号信息（ID、邮箱、上级、部门） | `references/system_query_app_user_list.json` MUST READ |
| [用户端] | `_app_member_create` | 将已有团队成员添加到当前应用中 | `references/system_app_member_create.json` MUST READ |
| [用户端] | `_app_member_update` | 更新应用成员的角色信息 | `references/system_app_member_update.json` MUST READ |
| [用户端] | `_app_member_delete` | 从当前应用中移除成员（危险操作） | `references/system_app_member_delete.json` MUST READ |

### 数据表-Table(用户端)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [用户端] | `_query_all_table_list` | 查询已发布的所有数据表（不返回表字段结构） | none |
| [用户端] | `_query_table_define` | 查询已发布表的字段结构（用于记录操作） | `references/system_query_table_define.json` MUST READ |
| [用户端] | `_query_table_record_list` | 按条件查询数据表记录 | `references/system_query_table_record_list.json` MUST READ |
| [用户端] | `_query_table_record_list_count` | 统计符合条件的记录数量 | `references/system_query_table_record_list_count.json` MUST READ |
| [用户端] | `_table_record_batch_insert` | 批量插入记录（先查表结构获取字段ID） | `references/system_table_record_batch_insert.json` MUST READ |
| [用户端] | `_table_record_batch_update` | 批量更新记录 | `references/system_table_record_batch_update.json` MUST READ |
| [用户端] | `_table_record_batch_delete` | 批量删除记录（危险操作） | `references/system_table_record_batch_delete.json` MUST READ |

### 工作流-Bpmn(用户端)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [用户端] | `_bpmn_create_instance` | 创建启动工作流流程实例（先查流程定义） | `references/system_bpmn_create_instance.json` MUST READ |
| [用户端] | `_bpmn_query_instance_list` | 查询当前用户发起的流程实例列表 | `references/system_bpmn_query_instance_list.json` MUST READ |
| [用户端] | `_bpmn_query_instance_info` | 查询流程实例详情 | `references/system_bpmn_query_instance_info.json` MUST READ |
| [用户端] | `_bpmn_query_task_list` | 查询分配给当前用户的工作流任务列表 | `references/system_bpmn_query_task_list.json` MUST READ |
| [用户端] | `_bpmn_query_task_info` | 查询工作流任务详情 | `references/system_bpmn_query_task_info.json` MUST READ |
| [用户端] | `_bpmn_complete_task` | 完成（审批通过）工作流任务 | `references/system_bpmn_complete_task.json` MUST READ |
| [用户端] | `_bpmn_process_define_list` | 获取流程定义列表 | `references/system_bpmn_process_define_list.json` MUST READ |
| [用户端] | `_bpmn_get_process_define` | 获取流程定义详情 | `references/system_bpmn_get_process_define.json` MUST READ |

### 搜索引擎-Textindex(用户端)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [用户端] | `_query_all_textindex_list` | 查询搜索引擎模块列表 | none |
| [用户端] | `_textindex_search` | 搜索引擎关键字搜索 | `references/system_textindex_search.json` MUST READ |

### 知识库-Knowledgebase(用户端)

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [用户端] | `_knowledgebase_search` | 知识库关键字搜索 | `references/system_knowledgebase_search.json` MUST READ |


## 公共智能体方法列表

> 以下方法无需 `--appId`，直接调用即可。

| 端 | 方法名 | 说明 | 参数文档 |
|----|--------|------|----------|
| [公共] | `_app_get_web_url` | 获取应用Web根地址 | none |
| [公共] | `_app_doc` | 查询应用文档 | none |
| [公共] | `_javascript_eval` | 执行JavaScript代码 | `references/system_javascript_eval.json` MUST READ |
| [公共] | `_render_html` | 渲染HTML内容 | `references/system_render_html.json` MUST READ |
| [公共] | `_web_content` | 获取网络URL内容 | `references/system_web_content.json` MUST READ |
| [公共] | `_get_current_time` | 获取当前时间 | none |
| [公共] | `_get_current_user` | 获取当前用户 | none |
| [公共] | `_read_informat_expression_doc` | 织信表达式文档 | none |
| [公共] | `_read_informat_script_sdk` | 织信脚本SDK文档 | none |
| [公共] | `_read_informat_dashboard_document` | 织信仪表盘图表文档 | none |
| [公共] | `_list_informat_markdown` | 列出所有可用的Markdown文档列表 | none |
| [公共] | `_read_informat_markdown` | 读取指定Markdown文档内容（支持子目录如script/） | `references/system_read_informat_markdown.json` MUST READ |
| [公共] | `_read_office_file` | 读取Office文档内容 | `references/system_read_office_file.json` MUST READ |
| [公共] | `_send_notification` | 发送通知 | `references/system_send_notification.json` MUST READ |
| [公共] | `_send_system_email` | 发送邮件 | `references/system_send_system_email.json` MUST READ |

## 本地参考文档

无需调用接口，直接查阅 `{baseDir}/references/doc/` 目录：

**核心功能文档（`doc/markdown/` 目录）**：

| 文档文件名 | 说明 |
|-----------|------|
| `informat.aiassistant.md` | AI助手开发文档 |
| `informat.api.md` | 开放API文档 |
| `informat.app.md` | 应用文档 |
| `informat.app.themestyle.md` | 应用主题样式文档 |
| `informat.automatic.md` | 自动化流程文档 |
| `informat.company.md` | 团队介绍文档（团队成员、团队角色、组织架构） |
| `informat.dashboard.md` | 仪表盘开发文档 |
| `informat.expression.md` | 表达式语法文档 |
| `informat.schedule.md` | 定时任务文档 |
| `informat.script.md` | 脚本开发总览 |
| `informat.table.md` | 数据表设计文档 |
| `informat.task.md` | 任务中心文档 |
| `informat.website.md` | 网站设计器文档 |

**脚本API文档（`doc/script/` 目录）**：按模块分类（bpmn.md、table.md、form.md等），包含方法说明、参数定义、示例代码。

## 常见问题

**Q: 应用模块标识符已存在？** 该模块ID已被使用，需要换一个。

**Q: 如何获取应用的模块列表？** 使用`_query_app_define_designer`。

**Q: 应用的访问地址？** `{host}/app/{appId}`
