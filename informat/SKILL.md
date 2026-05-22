---
name: informat
description: "Informat AI Intelligent Development Platform system method invocation skill. Core rules: 1. Before any create or modify operation, you must first query existing structures, obtain real IDs before operating. Never fabricate IDs or field names. 2. Before calling methods with parameters, you must first read the parameter documentation under {baseDir}/references/ (filename format: system_<method_name_without_prefix_>.json), strictly follow the documentation. 3. Data table id fields must not use system reserved fields such as id, seq, etc. 4. You must strictly follow the parameter types, required fields, enum values, and nested structures defined in the parameter documentation. No fabrication allowed."
when_to_use: "When the user wants to operate Informat platform features such as data tables, applications, APIs, automations, scripts, etc. This includes creating tables, querying data, configuring automation workflows, developing scripts, and all other Informat platform related operations."
---

# Informat Platform System Methods

Total 178 methods. The parameter definition file for each method is under `{baseDir}/references/`.
> 📚 **Reference Documentation Directory**: `{baseDir}/references/doc/` contains complete platform development documentation:
> - `references/doc/markdown/` directory: Official platform core feature documentation (AI Assistant, API, Automation, Dashboard, Expression, Scheduled Tasks, Scripts, Data Tables, Tasks, Websites, etc.)
> - `references/doc/script/` directory: Script API reference documentation, categorized by module (bpmn.md, table.md, form.md, etc.). Consult these first when developing scripts


## Invocation Rules

Based on method name prefix, the system automatically selects the corresponding agent interface:

| Prefix | Interface Type | Required Parameters |
|--------|---------------|-------------------|
| `_wb_` | Workbench Agent | No extra parameters |
| `_company_` | Team Agent | No extra parameters |
| Common methods | Common Agent | No extra parameters |
| Other | Application Agent | `--appId` |

### Invocation Method

```bash
# Step 1: Read parameter documentation (required for methods with parameters)
cat {baseDir}/references/system_query_table_define.json

# Step 2: Write parameter file
echo '{"tableId":"myTable"}' > params.json

# Step 3: Execute
# Application method (requires --appId)
node {baseDir}/scripts/call_informat.js _query_table_define --appId <appId> --file params.json

# Common method (no --appId needed)
node {baseDir}/scripts/call_informat.js _get_current_time

# Team method (no --appId needed)
node {baseDir}/scripts/call_informat.js _company_app_list

# Workbench method (no --appId needed)
node {baseDir}/scripts/call_informat.js _wb_get_login_info
```

### Getting Application ID

```bash
# 1. Query all application list
node {baseDir}/scripts/call_informat.js _company_app_list

# 2. Find the target application ID from the returned results, use for subsequent calls
node {baseDir}/scripts/call_informat.js _query_app_define_designer --appId <appId>
```

## Configuration

Two methods supported, system environment variables take priority over `.env` file:

```bash
# Method 1: System Environment Variables (Priority)
export INFORMAT_HOST=<informat host>
export INFORMAT_AGENT_TOKEN=<your-agent-token>

# Method 2: Edit {baseDir}/scripts/.env
INFORMAT_HOST=<informat host>
INFORMAT_AGENT_TOKEN=<your-agent-token>
```

> INFORMAT_AGENT_TOKEN can be obtained at: <informat host>/workbench/account/aiAgentApiKey

## Query Before Operation -- The Most Important Rule

Before performing any create or modify operation, you must first query the system's existing structure and obtain real IDs. Never fabricate any ID or field name.

Querying the list alone is not enough - you must further query the complete field structure of each related table. Because creating relational fields requires the target table's field IDs, knowing only the table ID is insufficient.

### Before Creating an Application

```
1. _company_app_list          -> Get all existing applications including unique app identifiers
```

### Before Creating a Data Table

```
1. _query_table_list_designer          -> Get all existing tables and their IDs
2. For each table that might be referenced, call
   _query_table_define_designer        -> Get the complete field list (field IDs, field types, option values, etc.)
   This step cannot be skipped because relational fields require the target table's field IDs
3. cat {baseDir}/references/system_create_table_module.json  -> Read parameter documentation
4. Use the queried real table IDs and field IDs to construct parameters and create the new table
```

Why you must query each table's field structure:
- RelationRecord fields require tableId (target table ID) and nameFieldId (field ID in target table used for display)
- RelationRecordField fields require fieldId (foreign key field ID in current table), targetTableId, targetFieldId
- LookupList fields require sub-table ID and the foreign key field ID in the sub-table
- LookupRollup fields require sub-table ID and the aggregation field ID in the sub-table
- These IDs can only be obtained through _query_table_define_designer queries

### Before Creating Dashboard Cards

```
1. _query_table_list_designer          -> Get all table IDs
2. For the target data source table, call
   _query_table_define_designer        -> Get all field IDs and field types for the table
   Without querying field structure, you cannot correctly configure aggregation fields, group fields, and filter conditions
3. _read_informat_dashboard_document   -> Get dashboard documentation
4. cat {baseDir}/references/system_save_dashboard_prochart_card.json
   or system_save_dashboard_number_card.json  -> Read parameter documentation
5. Use the queried real field IDs to construct card parameters
```

### Before Creating Automation

```
1. _query_app_define_designer          -> Get module list and existing automation groups
2. _query_table_list_designer          -> Get all table IDs
3. For each table involved in the automation, call
   _query_table_define_designer        -> Get field IDs (field mapping and filter conditions in automation steps require real field IDs)
4. _automatic_doc                      -> Get automation documentation
5. cat {baseDir}/references/system_automatic_save_define.json  -> Read parameter documentation
6. Use the queried real IDs to construct automation steps
```

### Before Creating Workflow

```
1. _query_app_define_designer -> Get module list
2. _query_table_list_designer + _query_table_define_designer -> Get tables and fields
3. _read_informat_expression_doc -> Get expression documentation (workflows heavily use expressions)
4. Read the corresponding parameter documentation
5. Create in order: module -> process definition -> start configuration -> nodes -> sequence flows
```

### Before Creating Scripts

```
1. _query_informat_script_list -> Get existing scripts and directories
2. _read_informat_script_sdk -> Get script SDK documentation
3. Consult the script documentation under {baseDir}/references/doc/script/ for the corresponding module (e.g., bpmn.md, table.md), to understand API usage conventions
4. Create directory first if needed _create_informat_script_directory
5. Read cat {baseDir}/references/system_save_informat_script.json
6. Create or edit script (when editing, must pass the existing script ID, do not create duplicates)
```

### Before Editing Fields

```
1. _query_table_list_designer -> Find the target table
2. _query_table_define_designer -> Get the complete field list of the table
3. _read_informat_expression_doc -> If expression configuration is needed
4. Read cat {baseDir}/references/system_edit_table_field.json
5. Use real tableId and fieldId to operate
```

### Before Operating Data Records

```
1. _query_all_table_list -> Get published table IDs
2. _query_table_define -> Get published field structure
3. Read the corresponding parameter documentation
4. Use real field IDs to construct record data
```

## Workbench Agent Method List

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [User] | `_wb_set_curr_appid` | Set current session context application ID | `references/system_wb_set_curr_appid.json` MUST READ |
| [User] | `_wb_process_define_list` | Get workflow list available to current user | `references/system_wb_process_define_list.json` MUST READ |
| [User] | `_wb_get_process_define` | Get specified workflow process definition configuration | `references/system_wb_get_process_define.json` MUST READ |
| [User] | `_wb_get_table_info` | Get specified data table structure information | `references/system_wb_get_table_info.json` MUST READ |
| [User] | `_wb_get_login_info` | Get my login info including user info and system configuration | none |
| [User] | `_wb_create_instance` | Create and start workflow process instance | `references/system_wb_create_instance.json` MUST READ |
| [User] | `_wb_query_instance_list` | Query all process instances initiated by current user (cross-app) | `references/system_wb_query_instance_list.json` MUST READ |
| [User] | `_wb_query_instance_info` | Query workbench process instance details | `references/system_wb_query_instance_info.json` MUST READ |
| [User] | `_wb_query_task_list` | Query workbench workflow task list (cross-app) | `references/system_wb_query_task_list.json` MUST READ |
| [User] | `_wb_query_task_info` | Query workbench workflow task details | `references/system_wb_query_task_info.json` MUST READ |
| [User] | `_wb_complete_task` | Complete (approve) workbench workflow task | `references/system_wb_complete_task.json` MUST READ |
| [User] | `_wb_ask_ai` | Ask AI assistant | `references/system_wb_ask_ai.json` MUST READ |


## Team Agent Method List

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Team] | `_company_app_list` | Query application list | `references/system_company_app_list.json` MUST READ |
| [Team] | `_company_app_create` | Create application | `references/system_company_app_create.json` MUST READ |
| [Team] | `_company_app_update` | Update team application info (name, group, etc.) | `references/system_company_app_update.json` MUST READ |
| [Team] | `_company_app_group_list` | Get application group list | `references/system_company_app_group_list.json` MUST READ |
| [Team] | `_company_app_group_create` | Create application group | `references/system_company_app_group_create.json` MUST READ |
| [Team] | `_company_app_group_update` | Update application group | `references/system_company_app_group_update.json` MUST READ |
| [Team] | `_company_app_group_delete` | Delete application group (dangerous operation) | `references/system_company_app_group_delete.json` MUST READ |
| [Team] | `_company_department_list` | Get team department list | `references/system_company_department_list.json` MUST READ |
| [Team] | `_company_department_create` | Create a new department in the company | `references/system_company_department_create.json` MUST READ |
| [Team] | `_company_department_update` | Update an existing department in the company | `references/system_company_department_update.json` MUST READ |
| [Team] | `_company_department_delete` | Delete an existing department in the company (dangerous operation) | `references/system_company_department_delete.json` MUST READ |
| [Team] | `_company_role_list` | Query role list | `references/system_company_role_list.json` MUST READ |
| [Team] | `_company_role_create` | Create a new role in the company | `references/system_company_role_create.json` MUST READ |
| [Team] | `_company_role_update` | Update an existing role in the company | `references/system_company_role_update.json` MUST READ |
| [Team] | `_company_role_delete` | Delete an existing role in the company (dangerous operation) | `references/system_company_role_delete.json` MUST READ |
| [Team] | `_company_role_permission_list` | Query available role permissions | none |
| [Team] | `_company_member_list` | Query team member list | `references/system_company_member_list.json` MUST READ |
| [Team] | `_company_member_list_count` | Get the total count of company members | `references/system_company_member_list_count.json` MUST READ |
| [Team] | `_company_member_create` | Add existing account as team member | `references/system_company_member_create.json` MUST READ |
| [Team] | `_company_member_create_new` | Create new account and add as team member | `references/system_company_member_create_new.json` MUST READ |
| [Team] | `_company_member_update` | Update team member | `references/system_company_member_update.json` MUST READ |
| [Team] | `_company_member_delete` | Delete team member (dangerous operation) | `references/system_company_member_delete.json` MUST READ |
| [Team] | `_company_member_info` | Query team member details | `references/system_company_member_info.json` MUST READ |
| [Team] | `_company_get_ai_model_list` | Get team AI model list | none |


## Application Agent Method List

> [Designer] = Draft environment. [User] = Published environment.

### API (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_api_create_define` | Create API definition | `references/system_api_create_define.json` MUST READ |
| [Designer] | `_api_delete_define` | Delete API definition (dangerous operation) | `references/system_api_delete_define.json` MUST READ |
| [Designer] | `_api_doc` | Query Informat API documentation | none |
| [Designer] | `_api_query_define_designer` | Query single API detailed definition | `references/system_api_query_define_designer.json` MUST READ |
| [Designer] | `_api_query_define_list` | Query API definition list under application | none |
| [Designer] | `_api_update_define` | Update API definition, updateFieldList declares fields to modify | `references/system_api_update_define.json` MUST READ |

### App (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_app_check_setting` | Validate draft configuration legality before publishing | none |
| [Designer] | `_app_create_role` | Create application role | `references/system_app_create_role.json` MUST READ |
| [Designer] | `_app_delete_draft_define` | Delete draft version Define (irreversible) | `references/system_app_delete_draft_define.json` MUST READ |
| [Designer] | `_app_get_define_list` | Get application definition object list | `references/system_app_get_define_list.json` MUST READ |
| [Designer] | `_app_get_define_object` | Get single definition object details | `references/system_app_get_define_object.json` MUST READ |
| [Designer] | `_app_get_define_type` | Get supported definition object types | none |
| [Designer] | `_app_get_draft_define_count` | Draft change count statistics | none |
| [Designer] | `_app_get_draft_define_list` | Draft object list | none |
| [Designer] | `_app_publish` | Publish application to production (AI should not call this, remind user to operate) | `references/system_app_publish.json` MUST READ |
| [Designer] | `_app_save_define_object` | Save definition object structure | `references/system_app_save_define_object.json` MUST READ |
| [Designer] | `_app_set_themestyle` | Set application theme style (query _app_themestyle_doc first) | `references/system_app_set_themestyle.json` MUST READ |
| [Designer] | `_app_themestyle_doc` | Query application theme style documentation | none |
| [Designer] | `_query_app_define_designer` | Query designer application configuration (module list, roles, APIs, automation groups, etc.) | none |
| [Designer] | `_create_module_group` | Create module group | `references/system_create_module_group.json` MUST READ |
| [Designer] | `_update_module_and_group_order` | Update module sorting | `references/system_update_module_and_group_order.json` MUST READ |

### Data Table - Table (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_create_table_module` | Create data table (must query existing tables and field structures first) | `references/system_create_table_module.json` MUST READ |
| [Designer] | `_create_table_field_group` | Create data table field group | `references/system_create_table_field_group.json` MUST READ |
| [Designer] | `_table_save_filter_condition` | Set data table view filter condition | `references/system_table_save_filter_condition.json` MUST READ |
| [Designer] | `_table_save_datasource_dbview` | Save database view table SQL configuration | `references/system_table_save_datasource_dbview.json` MUST READ |
| [Designer] | `_table_create_tool_bar_button` | Create data table toolbar button (supports calling script or automation) | `references/system_table_create_tool_bar_button.json` MUST READ |
| [Designer] | `_table_list_tool_bar_button` | Query data table toolbar button list | `references/system_table_list_tool_bar_button.json` MUST READ |
| [Designer] | `_table_update_tool_bar_button` | Update data table toolbar button | `references/system_table_update_tool_bar_button.json` MUST READ |
| [Designer] | `_table_delete_tool_bar_button` | Delete data table toolbar button | `references/system_table_delete_tool_bar_button.json` MUST READ |
| [Designer] | `_table_create_form_tool_bar_btn` | Create data table form toolbar button (supports calling script or automation) | `references/system_table_create_form_tool_bar_btn.json` MUST READ |
| [Designer] | `_table_list_form_tool_bar_btn` | Query data table form toolbar button list | `references/system_table_list_form_tool_bar_btn.json` MUST READ |
| [Designer] | `_table_update_form_tool_bar_btn` | Update data table form toolbar button | `references/system_table_update_form_tool_bar_btn.json` MUST READ |
| [Designer] | `_table_del_form_tool_bar_btn` | Delete data table form toolbar button | `references/system_table_del_form_tool_bar_btn.json` MUST READ |
| [Designer] | `_subtable_create_tool_bar_btn` | Create subtable toolbar button (Relation/LookupList fields only, supports add row, delete, call script or automation) | `references/system_subtable_create_tool_bar_btn.json` MUST READ |
| [Designer] | `_subtable_list_tool_bar_btn` | Query subtable toolbar button list | `references/system_subtable_list_tool_bar_btn.json` MUST READ |
| [Designer] | `_subtable_update_tool_bar_btn` | Update subtable toolbar button | `references/system_subtable_update_tool_bar_btn.json` MUST READ |
| [Designer] | `_subtable_delete_tool_bar_btn` | Delete subtable toolbar button | `references/system_subtable_delete_tool_bar_btn.json` MUST READ |
| [Designer] | `_query_table_list_designer` | Query all tables in designer (including unpublished, does not return field structure) | none |
| [Designer] | `_query_table_define_designer` | Query designer data table field structure | `references/system_query_table_define_designer.json` MUST READ |
| [Designer] | `_query_table_field_designer` | Query single field detailed configuration | `references/system_query_table_field_designer.json` MUST READ |
| [Designer] | `_edit_table_field` | Edit field (must query table structure to get real IDs first) | `references/system_edit_table_field.json` MUST READ |
| [Designer] | `_edit_table_module` | Modify data table module information | `references/system_edit_table_module.json` MUST READ |

### Workflow - Bpmn (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_bpmn_create_module` | Create workflow module | `references/system_bpmn_create_module.json` MUST READ |
| [Designer] | `_bpmn_create_process_define` | Create process definition | `references/system_bpmn_create_process_define.json` MUST READ |
| [Designer] | `_bpmn_update_start_setting` | Update process start configuration | `references/system_bpmn_update_start_setting.json` MUST READ |
| [Designer] | `_bpmn_create_or_update_node` | Create/update process node | `references/system_bpmn_create_or_update_node.json` MUST READ |
| [Designer] | `_bpmn_create_or_update_flow` | Create/update sequence flow | `references/system_bpmn_create_or_update_flow.json` MUST READ |
| [Designer] | `_bpmn_delete_node` | Delete process node | `references/system_bpmn_delete_node.json` MUST READ |
| [Designer] | `_bpmn_delete_flow` | Delete sequence flow | `references/system_bpmn_delete_flow.json` MUST READ |
| [Designer] | `_bpmn_query_process_define` | Query process definition details | `references/system_bpmn_query_process_define.json` MUST READ |
| [Designer] | `_bpmn_query_process_define_list` | Query process definition list under module | `references/system_bpmn_query_process_define_list.json` MUST READ |

### Automation - Automatic (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_automatic_create_group` | Create automation group (query _query_app_define_designer first to avoid duplication) | `references/system_automatic_create_group.json` MUST READ |
| [Designer] | `_automatic_delete_group` | Delete automation group | `references/system_automatic_delete_group.json` MUST READ |
| [Designer] | `_automatic_update_group` | Edit automation group | `references/system_automatic_update_group.json` MUST READ |
| [Designer] | `_automatic_save_define` | Save automation configuration (must query table structure to get field IDs before creation) | `references/system_automatic_save_define.json` MUST READ |
| [Designer] | `_automatic_query_define` | Query automation configuration | `references/system_automatic_query_define.json` MUST READ |
| [Designer] | `_automatic_run_once` | Execute automation immediately (high risk, confirm first) | `references/system_automatic_run_once.json` MUST READ |
| [Designer] | `_automatic_doc` | Read automation documentation | none |

### Dashboard (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_create_dashboard_module` | Create dashboard module | `references/system_create_dashboard_module.json` MUST READ |
| [Designer] | `_query_dashboard_list_designer` | Query all dashboards | none |
| [Designer] | `_query_dashboard_card_list` | Query dashboard card list | `references/system_query_dashboard_card_list.json` MUST READ |
| [Designer] | `_query_dashboard_card_detail` | Query card details | `references/system_query_dashboard_card_detail.json` MUST READ |
| [Designer] | `_save_dashboard_number_card` | Create/edit number card (query table structure to get field IDs first) | `references/system_save_dashboard_number_card.json` MUST READ |
| [Designer] | `_save_dashboard_prochart_card` | Create/edit chart card (query table structure to get field IDs first) | `references/system_save_dashboard_prochart_card.json` MUST READ |

### Script (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_create_informat_script_directory` | Create script directory | `references/system_create_informat_script_directory.json` MUST READ |
| [Designer] | `_save_informat_script` | Save script (must pass existing ID when editing) | `references/system_save_informat_script.json` MUST READ |
| [Designer] | `_query_informat_script_list` | Query script list | none |
| [Designer] | `_query_informat_script_content` | Query script content | `references/system_query_informat_script_content.json` MUST READ |
| [Designer] | `_execute_informat_script_designer` | Execute script in designer | `references/system_execute_informat_script_designer.json` MUST READ |

### Scheduled Task - Schedule (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_schedule_create_define` | Create scheduled task | `references/system_schedule_create_define.json` MUST READ |
| [Designer] | `_schedule_update_define` | Update scheduled task | `references/system_schedule_update_define.json` MUST READ |
| [Designer] | `_schedule_delete_define` | Delete scheduled task | `references/system_schedule_delete_define.json` MUST READ |
| [Designer] | `_schedule_query_define_designer` | Query scheduled task details | `references/system_schedule_query_define_designer.json` MUST READ |
| [Designer] | `_schedule_query_define_list` | Query scheduled task list | none |
| [Designer] | `_schedule_run_once` | Trigger once immediately | `references/system_schedule_run_once.json` MUST READ |
| [Designer] | `_schedule_doc` | Query scheduled task documentation | none |

### Internationalization - I18n (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_i18n_query_define_designer` | Query internationalization configuration | none |
| [Designer] | `_i18n_save_define_designer` | Save translation definition | `references/system_i18n_save_define_designer.json` MUST READ |
| [Designer] | `_i18n_save_locale_designer` | Save language list | `references/system_i18n_save_locale_designer.json` MUST READ |
| [Designer] | `_i18n_set_app_name` | Set application internationalized name | `references/system_i18n_set_app_name.json` MUST READ |
| [Designer] | `_i18n_set_module_name` | Set module internationalized name | `references/system_i18n_set_module_name.json` MUST READ |
| [Designer] | `_i18n_set_table_field_name` | Set field internationalized name | `references/system_i18n_set_table_field_name.json` MUST READ |
| [Designer] | `_i18n_set_field_option_name` | Set option value internationalized name | `references/system_i18n_set_field_option_name.json` MUST READ |

### Website Resource - Website (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_website_create_module` | Create website module (query first to avoid duplication) | `references/system_website_create_module.json` MUST READ |
| [Designer] | `_website_create_directory` | Create resource directory | `references/system_website_create_directory.json` MUST READ |
| [Designer] | `_website_save_resource` | Create/edit resource (query ID first when editing) | `references/system_website_save_resource.json` MUST READ |
| [Designer] | `_website_delete_resource` | Delete resource | `references/system_website_delete_resource.json` MUST READ |
| [Designer] | `_website_query_define_designer` | Query website module details | `references/system_website_query_define_designer.json` MUST READ |
| [Designer] | `_website_query_list_designer` | Query all website modules | none |
| [Designer] | `_website_query_resource` | Query resource details | `references/system_website_query_resource.json` MUST READ |
| [Designer] | `_website_preview` | Preview website | `references/system_website_preview.json` MUST READ |
| [Designer] | `_website_read_informat_doc` | Read website designer documentation | none |

### AI Assistant (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_aiassistant_create` | Create AI assistant module | `references/system_aiassistant_create.json` MUST READ |
| [Designer] | `_aiassistant_update` | Update AI assistant module | `references/system_aiassistant_update.json` MUST READ |
| [Designer] | `_aiassistant_delete` | Delete AI assistant module | `references/system_aiassistant_delete.json` MUST READ |
| [Designer] | `_aiassistant_doc` | Query AI assistant documentation | none |

### App Listener (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_app_listener_create` | Create a new listener definition | `references/system_app_listener_create.json` MUST READ |
| [Designer] | `_app_listener_update` | Update listener definition, updateFieldList declares fields to modify | `references/system_app_listener_update.json` MUST READ |
| [Designer] | `_app_listener_delete` | Delete listener definition (if it's a directory, all listeners under it will also be deleted) | `references/system_app_listener_delete.json` MUST READ |
| [Designer] | `_app_listener_list` | Query listener definition list under current application (tree structure, includes directories and sub-listeners) | `references/system_app_listener_list.json` MUST READ |

### Survey (Designer)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Designer] | `_survey_create_module` | Create survey module | `references/system_survey_create_module.json` MUST READ |
| [Designer] | `_survey_create_item` | Create survey question | `references/system_survey_create_item.json` MUST READ |
| [Designer] | `_survey_update_item` | Update survey question | `references/system_survey_update_item.json` MUST READ |
| [Designer] | `_survey_delete_item` | Delete survey question | `references/system_survey_delete_item.json` MUST READ |
| [Designer] | `_survey_query_define_designer` | Query survey configuration | `references/system_survey_query_define_designer.json` MUST READ |

### App (User)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [User] | `_query_app_define` | Query published application configuration (module list, roles, APIs, etc.) | none |
| [User] | `_query_app_user` | Query current user's roles and permissions in this application (admin has all permissions without permissionList; non-admin returns moduleKey_PermissionName format) | none |
| [User] | `_query_app_user_list` | Query account information (ID, email, supervisor, department) | `references/system_query_app_user_list.json` MUST READ |
| [User] | `_app_member_create` | Add existing team members to the current application | `references/system_app_member_create.json` MUST READ |
| [User] | `_app_member_update` | Update application member role information | `references/system_app_member_update.json` MUST READ |
| [User] | `_app_member_delete` | Remove a member from the current application (dangerous operation) | `references/system_app_member_delete.json` MUST READ |

### Data Table - Table (User)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [User] | `_query_all_table_list` | Query all published data tables (does not return field structure) | none |
| [User] | `_query_table_define` | Query published table field structure (for record operations) | `references/system_query_table_define.json` MUST READ |
| [User] | `_query_table_record_list` | Query data table records by condition | `references/system_query_table_record_list.json` MUST READ |
| [User] | `_query_table_record_list_count` | Count records matching conditions | `references/system_query_table_record_list_count.json` MUST READ |
| [User] | `_table_record_batch_insert` | Batch insert records (query table structure to get field IDs first) | `references/system_table_record_batch_insert.json` MUST READ |
| [User] | `_table_record_batch_update` | Batch update records | `references/system_table_record_batch_update.json` MUST READ |
| [User] | `_table_record_batch_delete` | Batch delete records (dangerous operation) | `references/system_table_record_batch_delete.json` MUST READ |

### Workflow - Bpmn (User)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [User] | `_bpmn_create_instance` | Create and start workflow process instance (query process definition first) | `references/system_bpmn_create_instance.json` MUST READ |
| [User] | `_bpmn_query_instance_list` | Query process instances initiated by current user | `references/system_bpmn_query_instance_list.json` MUST READ |
| [User] | `_bpmn_query_instance_info` | Query process instance details | `references/system_bpmn_query_instance_info.json` MUST READ |
| [User] | `_bpmn_query_task_list` | Query workflow tasks assigned to current user | `references/system_bpmn_query_task_list.json` MUST READ |
| [User] | `_bpmn_query_task_info` | Query workflow task details | `references/system_bpmn_query_task_info.json` MUST READ |
| [User] | `_bpmn_complete_task` | Complete (approve) workflow task | `references/system_bpmn_complete_task.json` MUST READ |
| [User] | `_bpmn_process_define_list` | Get process definition list | `references/system_bpmn_process_define_list.json` MUST READ |
| [User] | `_bpmn_get_process_define` | Get process definition details | `references/system_bpmn_get_process_define.json` MUST READ |

### Search Engine - Textindex (User)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [User] | `_query_all_textindex_list` | Query search engine module list | none |
| [User] | `_textindex_search` | Search engine keyword search | `references/system_textindex_search.json` MUST READ |

### Knowledge Base - Knowledgebase (User)

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [User] | `_knowledgebase_search` | Knowledge base keyword search | `references/system_knowledgebase_search.json` MUST READ |


## Common Agent Method List

> The following methods do not require `--appId`, call them directly.

| Side | Method Name | Description | Parameter Document |
|----|--------|------|----------|
| [Common] | `_app_get_web_url` | Get application Web root URL | none |
| [Common] | `_app_doc` | Query application documentation | none |
| [Common] | `_javascript_eval` | Execute JavaScript code | `references/system_javascript_eval.json` MUST READ |
| [Common] | `_render_html` | Render HTML content | `references/system_render_html.json` MUST READ |
| [Common] | `_web_content` | Get web URL content | `references/system_web_content.json` MUST READ |
| [Common] | `_get_current_time` | Get current time | none |
| [Common] | `_get_current_user` | Get current user | none |
| [Common] | `_read_informat_expression_doc` | Informat expression documentation | none |
| [Common] | `_read_informat_script_sdk` | Informat script SDK documentation | none |
| [Common] | `_read_informat_dashboard_document` | Informat dashboard chart documentation | none |
| [Common] | `_list_informat_markdown` | List all available Markdown documents | none |
| [Common] | `_read_informat_markdown` | Read specified Markdown document content (supports subdirectories like script/) | `references/system_read_informat_markdown.json` MUST READ |
| [Common] | `_read_office_file` | Read Office document content | `references/system_read_office_file.json` MUST READ |
| [Common] | `_send_notification` | Send notification | `references/system_send_notification.json` MUST READ |
| [Common] | `_send_system_email` | Send email | `references/system_send_system_email.json` MUST READ |

## Local Reference Documentation

Consult directly without API calls, under `{baseDir}/references/doc/` directory:

**Core Feature Documentation (`doc/markdown/` directory)**:

| Document Filename | Description |
|-----------|------|
| `informat.aiassistant.md` | AI Assistant Development Documentation |
| `informat.api.md` | Open API Documentation |
| `informat.app.md` | Application Documentation |
| `informat.app.themestyle.md` | Application Theme Style Documentation |
| `informat.automatic.md` | Automation Process Documentation |
| `informat.company.md` | Team Documentation (members, roles, organization structure) |
| `informat.dashboard.md` | Dashboard Development Documentation |
| `informat.expression.md` | Expression Syntax Documentation |
| `informat.schedule.md` | Scheduled Task Documentation |
| `informat.script.md` | Script Development Overview |
| `informat.table.md` | Data Table Design Documentation |
| `informat.task.md` | Task Center Documentation |
| `informat.website.md` | Website Designer Documentation |

**Script API Documentation (`doc/script/` directory)**: Categorized by module (bpmn.md, table.md, form.md, etc.), with method descriptions, parameter definitions, and sample code.

## FAQ

**Q: Application module identifier already exists?** The module ID is already in use, you need to use a different one.

**Q: How to get the module list of an application?** Use `_query_app_define_designer`.

**Q: Application access URL?** `{host}/app/{appId}`
