此文档是织信低代码平台的API文档。

## 概述
织信API允许外部系统以HTTP协议的形式和应用交互，每一个API拥有一个唯一的访问路径，在HTTP请求到达时，执行配置的自动化程序或者脚本函数，将执行结果按照配置的格式返回给调用端。

API 的执行过程包括：
（可选）调用前处理脚本
主脚本函数执行
（可选）调用后处理脚本
（可选）异常处理脚本

## ApiDefine定义

一个 ApiDefine 对应一个 API 接口，其定义结构如下：

```
{
  // HTTP 路径（唯一）
  path: String,

  // 返回值类型: "json" | "text" | "file" | "redirect"
  view: String,

  // 调用类型: "script"
  invokeType: String,

  // HTTP方法
  method: String,

  // API调用前调用脚本
  beforeScriptId: String,      // @Ref(CallScript)
  beforeScriptFunc: String,

  // API调用脚本
  scriptId: String,            // @Ref(CallScript)
  scriptFunc: String,

  // API调用后调用脚本
  afterScriptId: String,       // @Ref(CallScript)
  afterScriptFunc: String,

  // API调用错误后调用脚本
  errorScriptId: String,       // @Ref(CallScript)
  errorScriptFunc: String,

  // 描述
  apiDesc: String,

  // 是否启用
  isEnable: boolean,

  // view=json 时是否输出值为 null 的 key（默认 false）
  jsonConfigWriteMapNullValue: boolean,

  // 限流配置
  enableRateLimiter: boolean,  // 启用限流
  rateLimiterQps: double,      // 每秒并发量，0表示不限制
  rateLimiterTimeout: int,     // 超时时长(毫秒)
  rateLimiterKeyVar: String    // 限流key表达式
}

```

【重要规则】
- ApiDefine 中引用的所有 scriptId / scriptFunc 必须在应用中真实存在，禁止在 API 定义中引用尚未创建的脚本或函数。
- 所有脚本函数必须通过 export function 明确导出


## 访问路径

需要特别说明的是，API 的预览访问与正式访问在使用方式和行为上存在差异，请在开发和调用时注意区分。

### 预览访问

仅在应用未发布前可用，用于开发、调试和测试阶段

```
https://$host/web0/api/preview/${appId}/${path}
```

- ${host} 织信服务地址 可以通过`_app_get_web_url`获取
- ${appId} 是应用ID，可以通过`_query_app_define_designer`获取
- ${path} 是配置的路径


### 正式访问

仅在应用发布后可用，面向真实业务场景

```
https://$host/web0/api/${appId}/${path}
```

- ${host} 织信服务地址 可以通过`_app_get_web_url`获取
- ${appId} 是应用ID，可以通过`_query_app_define_designer`获取
- ${path} 是配置的路径

### 注意事项
- 在应用发布前，外部系统无法通过正式访问路径调用 API
- 请勿将预览访问地址用于生产环境 (网站模块调用API一定要写正式访问的路径)


## 前处理

如果设置了 在调用前执行，则会在调用脚本或者自动化之前执行设置的前处理脚本。通过设置前处理可以很方便的实现类似鉴权和审计的功能。 如果前处理调用脚本抛出异常，则API调用会返回错误。如果前处理脚本有返回值，则API会直接返回此返回值。

前处理脚本接受一个参数,参数的类型APIContext


InformatHttpRequest的结构如下

```
{
	Object getAttribute(String name);//获取指定名称的属性
	Enumeration<String> getAttributeNames();//获取所有属性的名称
	String getCharacterEncoding();//获取当前 HTTP 请求的字符编码
	String getParameter(String name);//获取指定名称的请求参数的值
	Enumeration<String> getParameterNames();//获取当前 HTTP 请求中包含的所有参数名称的枚举
	String[] getParameterValues(String name);//获取指定名称的请求参数的所有值
	Map<String, String[]> getParameterMap();//获取所有请求参数的键值对
	String getProtocol();//获取客户端使用的协议（例如 HTTP/1.1）
	String getScheme();//获取客户端使用的协议（例如 http 或 https）
	String getServerName();//获取当前 Web 应用所在的服务器的主机名
	String getRemoteAddr();//获取发送请求的客户端的 IP 地址
	String getRemoteHost();//获取发送请求的客户端的主机名
	int getRemotePort();//获取发送请求的客户端使用的端口号
	void setAttribute(String name, Object o);//将指定名称的属性设置为指定的值
	void removeAttribute(String name);//从此请求中删除指定名称的属性
	boolean isSecure();//如果此请求使用安全协议（例如 HTTPS）进行传输，则返回 true；否则返回 false
	int getServerPort();//获取当前 Web 应用所在的服务器的端口号
	String getContentType();//获取 HTTP 请求的内容类型
	String getAuthType();//返回用于请求的身份验证方案的名称
	Cookie[] getCookies();//返回包含此请求中包含的所有 cookie 的数组
	String getHeader(String name);//获取指定名称的请求头的值
	Enumeration<String> getHeaders(String name);//获取指定名称的请求头的所有值
	Enumeration<String> getHeaderNames();//获取当前 HTTP 请求中包含的所有请求头的名称的枚举
	String getMethod();//获取请求的 HTTP 方法，例如 GET、POST 等
	String getPathInfo();//获取请求 URL 中与 Servlet 映射匹配的部分之后的路径
	String getContextPath();//返回与请求关联的 web 应用程序的上下文路径
	String getQueryString();//获取请求 URL 中的查询字符串部分
	String getRemoteUser();//获取发送请求的客户端的用户名
	java.security.Principal getUserPrincipal();
	String getRequestURI();//获取请求的 URI
	String getServletPath();//获取客户端请求的 Servlet 路径
	Collection<Part> getParts();//获取 HTTP POST 请求中的所有 Part 组件
}
```

InformatHttpResponse的结构如下

```
{
	String getCharacterEncoding();//返回响应的字符编码
	String getContentType();//返回响应的内容类型
	ServletOutputStream getOutputStream();//返回一个ServletOutputStream，用于向响应输出流中写入字节
	PrintWriter getWriter();//获取一个PrintWriter对象，用于向响应输出流中写入字符
	void setCharacterEncoding(String charset);//设置响应内容的字符编码
	void setContentLength(int len);//设置响应内容的长度
	void setContentLengthLong(long len);//设置响应内容的长度，与setContentLength方法相似。但是，它支持更长的响应内容长度
	void setContentType(String type);//设置响应内容的MIME类型
	boolean containsHeader(String name);//返回指定名称的标头是否已设置
	String encodeURL(String url);//对指定的URL进行编码，以便在发送响应时使用
	void sendError(int sc, String msg);//向客户端发送错误代码和消息，并清除响应缓冲区
	void sendError(int sc);//向客户端发送错误代码，并清除响应缓冲区
	void sendRedirect(String location);//重定向到指定的URL
	void setHeader(String name, String value);//设置响应头部的指定名称的值
	void addHeader(String name, String value);//添加指定名称和值的标头到响应
	void setDateHeader(String name, long date);//设置指定名称和值的日期标头，表示响应的发送日期
	void addDateHeader(String name, long date);//添加指定名称和值的日期标头，表示响应的发送日期
	void setIntHeader(String name, int value);//设置指定名称和值的整数标头到响应
	void addIntHeader(String name, int value);//添加指定名称和值的整数标头到响应
	void setStatus(int sc);//设置响应状态码
	int getStatus();//获取响应状态码
	String getHeader(String name);//返回指定名称的响应头的值
	Collection<String> getHeaders(String name);获取指定名称的响应头的所有值
	int getBufferSize();//返回响应输出缓冲区的大小
	void setBufferSize(int size);//设置响应缓冲区的大小
	void flushBuffer();//刷新响应输出流
	void reset();//清空响应缓冲区
	void resetBuffer();//清空响应缓冲区
	boolean isCommitted();//返回是否已经提交响应
}
```

Part的结构如下

```
{
	name:String,//上传时指定的名称
	contentType:String,//文件类型
	size:Integer,//文件大小
	submittedFileName:String,//文件的原始名称,
	save(path),//保存本地沙盒中,
	saveStorage(path),//保存到共享存储中
    saveAttachment(tableId,fieldId):TableAttachment//将文件保存为附件字段
}
```

### 示例

api调用前鉴权，检查token是否有效，如果无效则返回token过期错误

1.示例api(test)配置好调用前处理调用脚本和脚本函数 如：preHandle

2.调用前脚本函数如下

```js
export function preHandle(ctx) {
	console.log('preHandle',ctx);
	var token=ctx.query['token'];
	console.log('token',token);
	if(token==null){
		informat.app.abort('token cannot be null');
		return;
	}
	var account=informat.system.getAccountByToken(token);
	if(account==null){
		informat.app.abort('token expired');
		return;
	}
	ctx.request.setAttribute('account',account);//后续脚本可以通过ctx.request.getAttribute('account')获取访问用户信息
}
```

## APIContext 说明（非常重要）

所有 API 脚本函数都会接收到一个参数 ctx，其类型为 APIContext

APIContext的结构如下

```
{
	headers:Object,//请求头
	cookies:Object,//请求的cookie
	query:Object,//请求的查询参数（GET 参数）
	body:String,//POST请求的body
	url:String,//完整的请求路径
	appId:String,//api所属的appId
	path:String,//api的路径
	method:String,//http请求的方法,
	getParts():Part//上传的文件
	request:InformatHttpRequest,//HTTP请求对象
	response:InformatHttpResponse,//HTTP响应对象
}
```

【参数获取规则（必须遵守）】
- APIContext 中不存在 params 字段
- GET / URL 参数：必须通过 ctx.query 获取
- POST 请求体：通过 ctx.body 获取


## 脚本函数格式

当调用类型为调用脚本时，需要在脚本文件中使用export语法将调用函数导出，脚本函数需要接受一个ctx参数。

例如我们要实现一个通过API返回当前时间的功能，调用文件为 apitest.js，其中有一个获取当前时间的函数为 getTime

apitest.js

```js
export function getTime(ctx){
    return new Date()
}
```

## 返回值类型

### JSON

当返回值类型为JSON时，将会返回JSON格式的文本，HTTP response`` 的 content-type`` 将会被设置为application/json;charset=UTF-8。 调用的自动化程序或者脚本函数需要返回对象格式，系统会自动将对象序列化为JSON字符串

### 文本

当返回值类型为文本时，将会返回纯文本，HTTP response 的content-type 将会被设置为text/plain;charset=UTF-8。 调用的自动化程序或者脚本函数可以返回任意格式。如果是对象格式的返回值，系统会调用该对象的toString方法将对象转换为字符串。如果返回值为null，则会返回空的字符串。