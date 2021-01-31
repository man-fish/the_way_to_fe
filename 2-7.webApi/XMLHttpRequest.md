# XMLHttpRequest

`XMLHttpRequest`（XHR）对象用于与服务器交互。通过 `XMLHttpRequest` 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest` 在 [AJAX](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX) 编程中被大量使用。

![image-20200711093853387](assets/image-20200711093853387.png)

`XMLHttpRequest`的名称是让人迷惑的，其实它可以用于获取任何类型的数据，不仅仅是 `XML`。它甚至可以支持`HTTP`以外的其他协议` file:// 和 FTP`，尽管可能受到更多出于安全等原因的限制。

## 构造函数

[`XMLHttpRequest()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/XMLHttpRequest)

该构造函数用于初始化一个 `XMLHttpRequest` 实例对象。在调用下列任何其他方法之前，必须先调用该构造函数，或通过其他方式，得到一个实例对象。

## 实例属性

此接口继承了 [`XMLHttpRequestEventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget) 和 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 的属性。

- [`XMLHttpRequest.onreadystatechange`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange):当 `readyState` 属性发生变化时，调用的 [`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)。

- [`XMLHttpRequest.readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState) **只读**

  返回 一个无符号短整型（`unsigned short`）数字，代表请求的状态码。

- [`XMLHttpRequest.response`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/response) **只读**

  返回一个 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer)、[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)，或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，具体是哪种类型取决于 [`XMLHttpRequest.responseType`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType) 的值。其中包含整个响应实体（response entity body）。

- [`XMLHttpRequest.responseText`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseText) **只读**

  返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，该 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 包含对请求的响应，如果请求未成功或尚未发送，则返回 `null`。

- [`XMLHttpRequest.responseType`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType)

  一个用于定义响应类型的枚举值（enumerated value）。

- [`XMLHttpRequest.responseURL`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseURL) **只读**

  返回经过序列化（serialized）的响应 URL，如果该 URL 为空，则返回空字符串。

- [`XMLHttpRequest.responseXML`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseXML) **只读**

  返回一个 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)，其中包含该请求的响应，如果请求未成功、尚未发送或时不能被解析为 XML 或 HTML，则返回 `null`。

- [`XMLHttpRequest.status`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status) 只读

  返回一个无符号短整型（`unsigned short`）数字，代表请求的响应状态。

- [`XMLHttpRequest.statusText`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/statusText) 只读

  返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，其中包含 HTTP 服务器返回的响应状态。与 [`XMLHTTPRequest.status`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHTTPRequest/status) 不同的是，它包含完整的响应状态文本（例如，"`200 OK`"）。**注意：**根据 HTTP/2 规范（[8.1.2.4](https://http2.github.io/http2-spec/#rfc.section.8.1.2.4) [Response Pseudo-Header Fields](https://http2.github.io/http2-spec/#HttpResponse)，响应伪标头字段），HTTP/2 没有定义任何用于携带 HTTP/1.1 状态行中包含的版本（version）或者原因短语（reason phrase）的方法。

- [`XMLHttpRequest.timeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout)

  一个无符号长整型（`unsigned long`）数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。

- [`XMLHttpRequestEventTarget.ontimeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/ontimeout)

  当请求超时调用的 [`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)。

- [`XMLHttpRequest.upload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload) 只读

  [`XMLHttpRequestUpload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload)，代表上传进度。

- [`XMLHttpRequest.withCredentials`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

  一个[`布尔值`](https://developer.mozilla.org/zh-CN/docs/Web/API/Boolean)，用来指定跨域 `Access-Control` 请求是否应当带有授权信息，如 cookie 或授权 header 头。

## 方法

- [`XMLHttpRequest.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort)

  如果请求已被发出，则立刻中止请求。

- [`XMLHttpRequest.getAllResponseHeaders()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getAllResponseHeaders)

  以字符串的形式返回所有用 [CRLF](https://developer.mozilla.org/zh-CN/docs/Glossary/CRLF) 分隔的响应头，如果没有收到响应，则返回 `null`。

- [`XMLHttpRequest.getResponseHeader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getResponseHeader)

  返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回 `null`。

- [`XMLHttpRequest.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open)

  初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 [`openRequest()`](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIXMLHttpRequest)。

- [`XMLHttpRequest.overrideMimeType()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/overrideMimeType)

  覆写由服务器返回的 MIME 类型。

- [`XMLHttpRequest.send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)

  发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。

- [`XMLHttpRequest.setRequestHeader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader)

  设置 HTTP 请求头的值。必须在 `open()` 之后、`send()` 之前调用 `setRequestHeader()` 方法。

