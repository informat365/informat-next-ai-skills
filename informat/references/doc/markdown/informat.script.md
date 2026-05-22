:::
This document is the Script SDK documentation for the Informat low-code platform. Business logic based on the Informat platform can be implemented using the following SDK methods. Read this document and use the methods provided to solve the problems I raise. Please provide the implementation JS method code directly. Note that besides regular built-in JS methods, only the methods provided in this document can be used. Do not fabricate methods that are not in this document.
If the requirements cannot be fully implemented using the methods in this document, please provide the reason why they cannot be implemented.
Informat adopts a multi-tenant architecture. Users in the system are divided into three types: system Account, team member CompanyMember, and application member User. Each Account can join multiple teams to become a CompanyMember, and each CompanyMember can join multiple applications within a team to become a User. Each team member can belong to one or more departments (Dept), and departments also have parent-child relationships. Each department can have one or more CompanyMembers as department heads.
Scripts all run under a specific application.
:::

## ⚠️ Syntax Boundary Between Scripts and Expressions (Mandatory — Read Before Writing Scripts)

**Scripts (.js) ≠ Expressions (UEL).** They run in different environments with different syntax rules. **Never copy expression syntax directly into scripts.**

### 1. Using Platform Expression SDK Functions in Scripts: Add the `informat.` Prefix in Scripts

Writings in the expression docs like `String.concat(...)` / `Array.of(...)` / `Date.sysdate()` / `Misc.jsonStringify(...)` are **only legal inside `${}` expression contexts**. When calling the same functions in scripts (.js), you **must add the `informat.` prefix** — scripts run in the GraalVM JS engine where bare `String`, `Array`, `Date`, `Math` refer to JS-native objects, not platform tool objects, and calling platform methods on them throws `TypeError: xxx is not a function`.

| In Expressions (legal) | In Scripts (legal) | In Scripts (wrong, runtime error) |
|---|---|---|
| `${String.concat(a, b)}` | `informat.String.concat(a, b)` | ~~`String.concat(a, b)`~~ |
| `${String.length(s)}` | `informat.String.length(s)` | ~~`String.length(s)`~~ |
| `${Array.of(1, 2)}` | `informat.Array.of(1, 2)` | ~~`Array.of(1, 2)`~~ (JS-native `Array.of` behaves similarly but is not the platform function — mixing them causes ambiguity) |
| `${Array.length(list)}` | `informat.Array.length(list)` | ~~`Array.length(list)`~~ |
| `${Date.sysdate()}` | `informat.Date.sysdate()` | ~~`Date.sysdate()`~~ |
| `${Math.abs(-1)}` | `informat.Math.abs(-1)` | ~~`Math.abs(-1)`~~ (JS-native `Math.abs` works, but two-argument forms like `Math.round(n, digits)` don't exist in native JS — must go through informat) |
| `${Misc.jsonStringify(o)}` | `informat.Misc.jsonStringify(o)` | ~~`Misc.jsonStringify(o)`~~ |
| `${Misc.parseInt(s)}` | `informat.Misc.parseInt(s)` | ~~`Misc.parseInt(s)`~~ |
| `${Encode.md5(s)}` | `informat.Encode.md5(s)` | ~~`Encode.md5(s)`~~ |
| `${Record.getById(t, id)}` | `informat.table.queryById(t, id)` (scripts use `informat.table.*`) | ~~`Record.getById(...)`~~ |
| `${User.user(id)}` | `informat.company.queryMember(id)` etc. (scripts use `informat.company.*` / `informat.dept.*`) | ~~`User.user(id)`~~ |

> Rule of thumb: **Bare tool-object writes are for expressions; scripts always require the `informat.` prefix.** If unsure which environment you're in, check the file extension — `.js` files are scripts and need the prefix.

### 2. Native JS Syntax: Legal in Scripts, No Prefix Needed

Scripts are real JS, so **JS-native features are fully usable** and should NOT carry the `informat.` prefix. Common confusing points:

| Syntax | Nature | Legal in Scripts |
|---|---|---|
| `String(x)` | JS-native cast function | ✅ Legal (note: this is not the same as `String.concat` platform call) |
| `Number(x)` / `Boolean(x)` | JS-native casts | ✅ Legal |
| `'a' + b + 'c'` | JS-native string concat | ✅ Legal (in scripts `+` works for strings, unlike the expression DSL) |
| `` `a${b}c` `` | JS-native template string | ✅ Legal |
| `[1, 2, 3]` | JS-native array literal | ✅ Legal (allowed in scripts, unlike the expression DSL) |
| `{ key: 'value' }` | JS-native object literal | ✅ Legal |
| `arr.length` / `arr[0]` | JS-native array property/index | ✅ Legal |
| `arr.map(x => ...)` / `arr.filter(...)` | JS-native array methods | ✅ Legal |
| `if / else / for / while` | JS-native control flow | ✅ Legal (unlike the expression DSL) |
| `JSON.stringify(o)` / `JSON.parse(s)` | JS-native JSON | ✅ Legal (also `informat.Misc.jsonStringify` works; either is fine) |
| `parseInt(s)` / `parseFloat(s)` | JS-native globals | ✅ Legal (also `informat.Misc.parseInt` works) |
| `new Date()` | JS-native Date class | ✅ Legal (returns a JS Date object; for platform Date behavior use `informat.Date.sysdate()`) |

### 3. Self-Check Before Submitting a Script

1. Does the file contain bare `String.xxx(`, `Array.of(`, `Date.sysdate(`, `Misc.xxx(`, `Encode.xxx(`, `Record.xxx(`, `User.xxx(`, `Context.xxx(`, `T.t(`?
    - Yes → add the `informat.` prefix to all of them, or replace them with equivalent JS-native syntax.
2. Does the file contain `${...}` expression-wrapping syntax?
    - Yes → wrong. `${}` is only used in expression contexts; scripts have no `${}` evaluation boundary, and using them will be misinterpreted as template-string placeholders or syntax errors.
3. Are option values like `'inProgress'` written as bare unquoted identifiers?
    - Yes → wrong. Unquoted option values are an expression-DSL rule; **scripts must follow JS string rules and use quotes**.

### 4. Typical Mistake Comparison

```js
// ❌ Wrong: bare String.concat in script (expression syntax)
return { message: String.concat('Total ', count, ' items') };

// ✅ Fix 1: add informat. prefix
return { message: informat.String.concat('Total ', count, ' items') };

// ✅ Fix 2: use native JS concat (scripts are real JS, + is valid)
return { message: 'Total ' + count + ' items' };

// ✅ Fix 3: template string
return { message: `Total ${count} items` };
```

```js
// ❌ Wrong: writing ${...} expressions inside a script
const name = ${user.name};

// ✅ Right: just access the variable in scripts
const name = user.name;
```

```js
// ❌ Wrong: expression-style bare option identifier in script
if (record.status === inProgress) { ... }

// ✅ Right: scripts follow JS string rules
if (record.status === 'inProgress') { ... }
```

---

## Module API Documentation Index
This document is a script development overview, containing common base APIs and typical scenario examples. For more detailed independent APIs for each module, please refer to the corresponding documents under the `./script/` directory:

| Document Filename | Module Description | Applicable Scenarios |
|-----------|----------|----------|
| `aiagent.md` | AI Assistant Module API | Calling AI large language models, developing custom intelligent assistants, conversation completion features |
| `app.md` | Application Global API | Getting application info, environment variables, operating user info, terminating script execution |
| `bpmn.md` | Workflow Module API | Operating workflow instances, task processing, process jumping, variable management |
| `codec.md` | Encoding/Decoding Module API | MD5/SHA hash calculation, Base64 encoding/decoding, RSA encryption/decryption, signature verification |
| `company.md` | Team Management API | Querying team info, member management, role management, department management |
| `console.md` | Console API | Script log output, debug info printing |
| `csv.md` | CSV File Processing API | CSV file read/write, batch data import/export |
| `datasource.md` | Data Source Management API | Multi-data source connection, SQL queries, transaction control |
| `date.md` | Date Processing API | Date formatting, time calculation, timezone conversion |
| `dept.md` | Department Structure API | Querying department hierarchy, member management, head assignment |
| `designer.md` | Application Designer API | Operating application configuration, module management, metadata queries |
| `email.md` | Email Sending API | Sending plain emails, rich text emails, emails with attachments |
| `excel-easyPoi.md` | EasyPoi Excel Processing API | Complex Excel template export, batch data import |
| `excel.md` | Basic Excel Processing API | Simple Excel read/write, cell operations, style settings |
| `expression.md` | Expression Engine API | Executing expression calculations, formula parsing, dynamic logic execution |
| `file.md` | Sandbox File Operations API | Local sandbox file read/write, directory operations, compression/decompression |
| `ftp.md` | FTP/SFTP Operations API | FTP file upload/download, remote file operations |
| `http.md` | HTTP Request API | Sending GET/POST requests, calling third-party interfaces, file download |
| `jdbc.md` | Database Operations API | Native JDBC operations, direct table connection, SQL execution |
| `notification.md` | System Notification API | Sending system notifications, in-app messages, to-do reminders |
| `storage.md` | Shared Storage API | S3 storage file upload/download, remote file management |
| `table.md` | Data Table Operations API | Data table CRUD, related queries, attachment operations, summary field calculations |
| `task.md` | Task Center API | Task creation, status updates, task queries, process handling |
| `website.md` | Website Designer API | Operating website modules, page components, resource management |

> When developing, prioritize consulting the independent documentation for the corresponding module to get the latest and most complete API definitions and example code.

::: warning Note
Informat scripts run in the GraalVM JavaScript engine.  
SDK-provided `informat.*` methods are all **synchronous calls** and do not return Promises.

❌ Do not use `async / await` syntax  
❌ Do not use Promise-based asynchronous models

Please call SDK methods directly in a synchronous manner, for example:

```js
const list = informat.table.queryList(tableId, query);
```

## Execute System Commands

Use `informat.system.runProcess(args)` to execute system commands directly from scripts.

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cmds | String[] | Yes | Command and arguments array |
| timeout | long | No | Timeout in milliseconds, 0 means no timeout |

### Return Value

| Field | Type | Description |
|-------|------|-------------|
| exitValue | int | Process exit code, 0 typically means success |
| out | String | Standard output content |
| err | String | Error output content |

### Example

```js
// Execute the ls command
const result = informat.system.runProcess({
  cmds: ["ls", "-la", "/tmp"],
  timeout: 10000
});
console.log("exitValue:", result.exitValue);
console.log("stdout:", result.out);
console.log("stderr:", result.err);

// Execute a command with timeout
const result2 = informat.system.runProcess({
  cmds: ["python3", "script.py"],
  timeout: 30000
});
```
