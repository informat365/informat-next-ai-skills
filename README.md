# 织信Agent Skills

[官网](https://www.informat.cn/)

技能（Skills）目录说明

## 目录介绍

本目录包含了基于织信低代码平台的各种技能（Skills），这些技能封装了平台的核心功能，可用于构建各种业务应用和自动化流程。每个技能对应一个独立的目录，包含了技能的详细定义和使用说明。

## 技能分类

技能按照功能和使用场景分为以下几类：

### 1. API管理
- `api_create_define` - 创建API定义
- `api_delete_define` - 删除API定义
- `api_doc` - API文档管理
- `api_query_define_designer` - 查询API定义详情
- `api_query_define_list` - 查询API定义列表
- `api_update_define` - 更新API定义

### 2. 应用管理
- `app_create_role` - 创建应用角色
- `app_get_web_url` - 获取应用Web URL
- `app_publish` - 发布应用

### 3. 工作流管理
- `bpmn_create_module` - 创建工作流模块
- `bpmn_create_or_update_flow` - 创建或更新工作流
- `bpmn_create_or_update_node` - 创建或更新工作流节点
- `bpmn_create_process_define` - 创建流程定义
- `bpmn_delete_flow` - 删除工作流
- `bpmn_delete_node` - 删除工作流节点
- `bpmn_query_process_define` - 查询流程定义详情
- `bpmn_query_process_define_list` - 查询流程定义列表
- `bpmn_update_start_setting` - 更新工作流启动设置

### 4. 仪表盘管理
- `create_dashboard_module` - 创建仪表盘模块
- `read_informat_dashboard_document` - 读取仪表盘文档
- `save_dashboard_prochart_card` - 保存仪表盘图表

### 5. 脚本管理
- `create_informat_script_directory` - 创建脚本目录
- `execute_informat_script` - 执行脚本
- `execute_informat_script_designer` - 执行脚本（设计器）
- `generation_informat_script` - 生成脚本
- `query_informat_script_content` - 查询脚本内容
- `query_informat_script_list` - 查询脚本列表
- `read_informat_script_sdk` - 读取脚本SDK文档
- `save_informat_script` - 保存脚本

### 6. 数据表管理
- `create_table_field_group` - 创建数据表字段分组
- `create_table_filter_condition` - 创建数据表过滤条件
- `create_table_module` - 创建数据表模块
- `designer_add_table_fields` - 添加数据表字段
- `edit_table_field` - 编辑数据表字段
- `edit_table_module` - 编辑数据表模块
- `query_table_define` - 查询数据表定义
- `query_table_define_designer` - 查询数据表定义（设计器）
- `query_table_field_designer` - 查询数据表字段详情
- `query_table_list_designer` - 查询数据表列表
- `query_table_record_list` - 查询数据表记录列表
- `query_table_record_list_count` - 查询数据表记录数量
- `table_doc` - 数据表文档
- `table_record_batch_delete` - 批量删除数据表记录
- `table_record_batch_insert` - 批量插入数据表记录
- `table_record_batch_update` - 批量更新数据表记录

### 7. 系统管理
- `create_module_group` - 创建模块分组
- `designer_get_app_info` - 获取应用信息
- `designer_get_module_info` - 获取模块信息
- `designer_get_module_list` - 获取模块列表
- `designer_knowledge_database` - 知识数据库
- `get_current_time` - 获取当前时间
- `get_current_user` - 获取当前用户
- `i18n_query_define_designer` - 查询国际化定义
- `i18n_save_define_designer` - 保存国际化定义
- `i18n_save_locale_designer` - 保存国际化语言设置
- `i18n_set_app_name` - 设置应用名称
- `i18n_set_field_option_name` - 设置字段选项名称
- `i18n_set_module_name` - 设置模块名称
- `i18n_set_table_field_name` - 设置数据表字段名称
- `javascript_eval` - 执行JavaScript代码
- `query_all_table_list` - 查询所有数据表列表
- `query_all_textindex_list` - 查询所有文本索引列表
- `query_app_define_designer` - 查询应用定义
- `query_app_user_list` - 查询应用用户列表
- `read_office_file` - 读取Office文件
- `render_html` - 渲染HTML
- `send_notification` - 发送通知
- `send_system_email` - 发送系统邮件
- `update_module_and_group_order` - 更新模块和分组顺序

### 8. 网站管理
- `web_content` - 网站内容管理
- `website_create_directory` - 创建网站目录
- `website_create_module` - 创建网站模块
- `website_delete_resource` - 删除网站资源
- `website_query_define_designer` - 查询网站定义
- `website_query_list_designer` - 查询网站列表
- `website_query_resource` - 查询网站资源
- `website_read_informat_doc` - 读取网站文档
- `website_save_resource` - 保存网站资源

### 9. 调度管理
- `schedule_create_define` - 创建调度定义
- `schedule_delete_define` - 删除调度定义
- `schedule_doc` - 调度文档
- `schedule_query_define_designer` - 查询调度定义
- `schedule_query_define_list` - 查询调度定义列表
- `schedule_run_once` - 执行一次调度
- `schedule_update_define` - 更新调度定义

## 技能使用方法

### 1. 技能结构

每个技能目录包含以下文件：
- `SKILL.md` - 技能定义文件，包含技能ID、描述、工具调用方式和参数说明
- `resources/` - 资源目录（可选），包含技能相关的文档和示例

### 2. 技能调用格式

技能调用遵循以下格式：

```json
{
  "skillId": "技能ID",
  "parameters": {
    "参数1": "值1",
    "参数2": "值2"
  }
}
```

### 3. 工具调用说明

技能内部通过调用织信平台的工具来实现具体功能。工具调用格式如下：

```json
{
  "toolcall": {
    "thought": "调用工具的思考过程",
    "name": "工具名称",
    "params": {
      "参数1": "值1",
      "参数2": "值2"
    }
  }
}
```

## 技能开发指南

### 1. 创建新技能

要创建新技能，请按照以下步骤操作：

1. 在 `skills` 目录下创建一个新的目录，目录名称应与技能ID一致
2. 在新目录中创建 `SKILL.md` 文件，按照以下模板填写：

```markdown
# 技能名称

## 技能ID
技能ID

## 描述
技能描述

## 工具调用

### 思考
调用工具的思考过程

### 工具名称
工具名称

### 参数
{
  "type": "object",
  "properties": {
    "参数1": {
      "type": "string",
      "description": "参数1描述"
    },
    "参数2": {
      "type": "number",
      "description": "参数2描述"
    }
  },
  "required": ["参数1", "参数2"]
}
```

3. （可选）创建 `resources` 目录，添加相关文档和示例

### 2. 技能参数规范

技能参数应遵循以下规范：
- 使用驼峰命名法
- 提供详细的参数描述
- 明确参数类型和必填项
- 对于复杂参数，提供结构示例

### 3. 技能文档规范

技能文档应包含以下内容：
- 技能的基本信息（ID、名称、描述）
- 工具调用方式和参数说明
- 使用示例（可选）
- 注意事项和限制（可选）

## 注意事项

1. **权限管理**：使用技能前，请确保您拥有相应的权限
2. **参数验证**：调用技能时，请确保提供了所有必填参数，并且参数值符合要求
3. **错误处理**：技能调用可能会返回错误，请妥善处理这些错误
4. **性能优化**：对于大数据量操作，请注意设置合理的分页参数，避免性能问题
5. **版本兼容性**：技能可能会随着平台版本的更新而变化，请关注版本兼容性

## 示例

### 示例1：创建数据表模块

```json
{
  "skillId": "create_table_module",
  "parameters": {
    "id": "project",
    "name": "项目表",
    "parentId": "c9w809zqybf4i",
    "fields": [
      {
        "id": "name",
        "name": "项目名称",
        "type": "SingleText",
        "icon": "text",
        "singleTextSetting": {
          "nullable": false,
          "placeholder": "请输入项目名称"
        }
      },
      {
        "id": "status",
        "name": "项目状态",
        "type": "ListSelect",
        "icon": "check",
        "listSelectSetting": {
          "nullable": false,
          "multiple": false,
          "optionList": [
            {
              "id": "planning",
              "name": "规划中",
              "color": "#5B8FF9"
            },
            {
              "id": "executing",
              "name": "执行中",
              "color": "#57CA8C"
            },
            {
              "id": "completed",
              "name": "已完成",
              "color": "#5D7092"
            }
          ]
        }
      }
    ]
  }
}
```

### 示例2：查询数据表记录列表

```json
{
  "skillId": "query_table_record_list",
  "parameters": {
    "tableId": "fixed_assets",
    "pageIndex": 1,
    "pageSize": 10,
    "filter": {
      "opt": "and",
      "conditionList": [
        {
          "fieldId": "status",
          "opt": "eq",
          "value": "inuse"
        }
      ]
    }
  }
}
```

## 版本历史

- **2026-02-05** - 初始化技能目录结构
- **2026-02-06** - 添加技能分类和使用指南
- **2026-02-07** - 完善技能文档和示例

## 联系方式

如有问题或建议，请联系织信平台管理员。
