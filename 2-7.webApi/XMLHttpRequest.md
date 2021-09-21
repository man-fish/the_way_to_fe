# XMLHttpRequest

`XMLHttpRequest`（XHR）对象用于与服务器交互。通过 `XMLHttpRequest` 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest` 在 [AJAX](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX) 编程中被大量使用。

![image-20200711093853387](assets/image-20200711093853387.png)

`XMLHttpRequest`的名称是让人迷惑的，其实它可以用于获取任何类型的数据，不仅仅是 `XML`。它甚至可以支持`HTTP`以外的其他协议` file:// 和 FTP`，尽管可能受到更多出于安全等原因的限制。

## `Ajax`和`XMLHttpRequest`

我们通常将`Ajax`等同于`XMLHttpRequest`，但细究起来它们两个是属于不同维度的2个概念。

> AJAX stands for Asynchronous JavaScript and XML. AJAX is a new technique for creating better, faster, and more interactive web applications with the help of XML, HTML, CSS, and Java Script.
>
> AJAX is based on the following open standards:
>
> + Browser-based presentation using HTML and Cascading Style Sheets (CSS).
> + Data is stored in XML format and fetched from the server.
> + Behind-the-scenes data fetches using XMLHttpRequest objects in the browser.
> + JavaScript to make everything happen.

翻译一下：

`AJAX`代表异步`JavaScript`和`XML`。`AJAX`是一种新技术方案，可以在`XML`、`HTML`、`CSS`和`Java Script`的帮助下创建更好、更快、更具交互性的`web`应用程序。

`AJAX`基于以下开放标准:

+ 使用`HTML`和层叠样式表(`CSS`)的基于浏览器的表示。
+ 数据以`XML`格式存储并从服务器获取。
+ 在浏览器中使用`XMLHttpRequest`对象获取后台数据。

从上面的解释中可以知道：`ajax`是一种技术方案，但并不是一种**新技术**。它依赖的是现有的`CSS`/`HTML`/`Javascript`，而其中最核心的依赖是浏览器提供的`XMLHttpRequest`对象，是这个对象使得浏览器可以发出`HTTP`请求与接收`HTTP`响应。

所以我用一句话来总结两者的关系：我们使用`XMLHttpRequest`对象来发送一个`Ajax`请求。

## `XMLHttpRequest`的发展历程

`XMLHttpRequest`一开始只是微软浏览器提供的一个接口，后来各大浏览器纷纷效仿也提供了这个接口，再后来W3C对它进行了标准化，提出了[`XMLHttpRequest`标准](https://link.segmentfault.com/?url=https%3A%2F%2Fwww.w3.org%2FTR%2FXMLHttpRequest%2F)。`XMLHttpRequest`标准又分为`Level 1`和`Level 2`。
`XMLHttpRequest Level 1`主要存在以下缺点：

+ 受同源策略的限制，不能发送跨域请求；
+ 不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据；
+ 在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；

那么`Level 2`对`Level 1` 进行了改进，`XMLHttpRequest Level 2`中新增了以下功能：

+ 可以发送跨域请求，在服务端允许的情况下；
+ 支持发送和接收二进制数据；
+ 新增formData对象，支持发送表单数据；
+ 发送和获取数据时，可以获取进度信息；
+ 可以设置请求的超时时间；

## 构造函数

[`XMLHttpRequest()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/XMLHttpRequest)

该构造函数用于初始化一个 `XMLHttpRequest` 实例对象。在调用下列任何其他方法之前，必须先调用该构造函数，或通过其他方式，得到一个实例对象。

### 实例属性

此接口继承了 [`XMLHttpRequestEventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget) 和 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 的属性。

- [`XMLHttpRequest.onreadystatechange`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange):当 `readyState` 属性发生变化时，调用的 [`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)。

- [`XMLHttpRequest.readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState) **只读**

  返回 一个无符号短整型（`unsigned short`）数字，代表请求的状态码:：

  | 值   | 状态               | 描述                                                |
  | ---- | ------------------ | --------------------------------------------------- |
  | `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
  | `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
  | `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
  | `3`  | `LOADING`          | 下载中； `responseText` 属性已经包含部分数据。      |
  | `4`  | `DONE`             | 下载操作已完成。                                    |

- [`XMLHttpRequest.status`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status) 只读

  返回一个无符号短整型（`unsigned short`）数字，代表请求的响应状态。

- [`XMLHttpRequest.statusText`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/statusText) 只读

  返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，其中包含 HTTP 服务器返回的响应状态。与 [`XMLHTTPRequest.status`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHTTPRequest/status) 不同的是，它包含完整的响应状态文本（例如，"`200 OK`"）。

  > **注意：**根据 HTTP/2 规范（[8.1.2.4](https://http2.github.io/http2-spec/#rfc.section.8.1.2.4) [Response Pseudo-Header Fields](https://http2.github.io/http2-spec/#HttpResponse)，响应伪标头字段），HTTP/2 没有定义任何用于携带 HTTP/1.1 状态行中包含的版本（version）或者原因短语（reason phrase）的方法。

- [`XMLHttpRequest.response`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/response) **只读**

  返回一个 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer)、[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)，或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，具体是哪种类型取决于 [`XMLHttpRequest.responseType`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType) 的值。其中包含整个响应实体（response entity body）。

- [`XMLHttpRequest.responseText`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseText) **只读**

  返回一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，该 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 包含对请求的响应，如果请求未成功或尚未发送，则返回 `null`。

- [`XMLHttpRequest.responseType`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType)

  一个用于定义响应类型的枚举值(enumerated value)。

- [`XMLHttpRequest.responseXML`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseXML) **只读**

  返回一个 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)，其中包含该请求的响应，如果请求未成功、尚未发送或时不能被解析为 XML 或 HTML，则返回 `null`。

- [`XMLHttpRequest.responseURL`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseURL) **只读**

  返回经过序列化（serialized）的响应 URL，如果该 URL 为空，则返回空字符串。

- [`XMLHttpRequest.withCredentials`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

  一个[`布尔值`](https://developer.mozilla.org/zh-CN/docs/Web/API/Boolean)，用来指定跨域 `Access-Control` 请求是否应当带有授权信息，如 cookie 或授权 header 头。

- [`XMLHttpRequest.timeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout)

  一个无符号长整型（`unsigned long`）数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。

- [`XMLHttpRequestEventTarget.ontimeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/ontimeout)

  当请求超时调用的 [`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)。

- [`XMLHttpRequest.upload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload) 只读

  代表上传进度。

### 方法

- [`XMLHttpRequest.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open)

  初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 [`openRequest()`](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIXMLHttpRequest)。

  ```ts
  xhrReq.open(method, url, async, user, password);
  ```

  | param        | description                                                  |
  | ------------ | ------------------------------------------------------------ |
  | method       | 要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」等。对于非`HTTP(S) URL`被忽略。 |
  | **url**      | 一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)表示要向其发送请求的URL，可以是 `/xx` 或者是 `协议+域名+路径`的全写。 |
  | **async**    | 一个可选的布尔参数，表示是否异步执行操作，默认为`true`。如果值为`false`，`send()`方法直到收到答复前不会返回。如果`true`，已完成事务的通知可供事件监听器使用。如果`multipart`属性为`true`则这个必须为`true`，否则将引发异常。 |
  | **user**     | 可选的用户名用于认证用途；默认为`null`。                     |
  | **password** | 可选的密码用于认证用途，默认为null。                         |

- [`XMLHttpRequest.setRequestHeader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader)

  设置 HTTP 请求头的值。必须在 `open()` 之后、`send()` 之前调用 `setRequestHeader()` 方法。
  
  | param  | description  |
  | ------ | ------------ |
  | Header | 请求头的键。 |
  | value  | 请求头的值。 |
  
- [`XMLHttpRequest.send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)

  发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。发送的数据类型需要先在 `header` 做设置：

  | type                                  | Data                    |
  | ------------------------------------- | ----------------------- |
  | **application/x-www-form-urlencoded** | `"foo=bar&lorem=ipsum"` |
  | **application/json**                  | `{ foo: 'bar'}`         |
  | **application/form-data**             | `new FormData();`       |

- [`XMLHttpRequest.overrideMimeType()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/overrideMimeType)

  覆写由服务器返回的 MIME 类型。

  | param    | description                                                  |
  | -------- | ------------------------------------------------------------ |
  | mimeType | 一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 指定具体的MIME类型去代替有服务器指定的MIME类型. 如果服务器没有指定类型，那么 `XMLHttpRequest` 将会默认为 `"text/xml"`. |

- [`XMLHttpRequest.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort)

  如果请求已被发出，则立刻中止请求。

- [`XMLHttpRequest.getAllResponseHeaders()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getAllResponseHeaders)

  以字符串的形式返回所有用 [CRLF](https://developer.mozilla.org/zh-CN/docs/Glossary/CRLF) 分隔的响应头，如果没有收到响应，则返回 `null`。

- [`XMLHttpRequest.getResponseHeader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getResponseHeader)

  返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回 `null`。

## `XMLHttpRequest`

先来看一段使用`XMLHttpRequest`发送`Ajax`请求的简单示例代码：

```ts
function sendAjax() {
  //构造表单数据
  var formData = new FormData();
  formData.append('username', 'johndoe');
  formData.append('id', 123456);
  //创建xhr对象 
  var xhr = new XMLHttpRequest();
  //设置xhr请求的超时时间
  xhr.timeout = 3000;
  //设置响应返回的数据格式
  xhr.responseType = "text";
  //创建一个 post 请求，采用异步
  xhr.open('POST', '/server', true);
  //注册相关事件回调处理函数
  xhr.onload = function(e) { 
    if(this.status == 200||this.status == 304){
        alert(this.responseText);
    }
  };
  xhr.ontimeout = function(e) { ... };
  xhr.onerror = function(e) { ... };
  xhr.upload.onprogress = function(e) { ... };
  
  //发送数据
  xhr.send(formData);
}
```

### 设置 `request header`

在发送`Ajax`请求（实质是一个[HTTP](https://link.segmentfault.com/?url=http%3A%2F%2Fwww.tutorialspoint.com%2Fhttp%2Fhttp_header_fields.htm)请求）时，我们可能需要设置一些请求头部信息，比如`content-type`、`connection`、`cookie`、`accept-xxx`等。`xhr`提供了`setRequestHeader`来允许我们修改请求 header。

```ts
void setRequestHeader(DOMString header, DOMString value);
```

+ 方法的第一个参数 header 大小写不敏感，即可以写成`content-type`，也可以写成`Content-Type`，甚至写成`content-Type`;
+ `setRequestHeader`必须在`open()`方法之后，`send()`方法之前调用，否则会抛错；
+ `setRequestHeader`可以调用多次，最终的值不会采用覆盖`override`的方式，而是采用追加`append`的方式。下面是一个示例代码：

### 获取 `response header`

`xhr`提供了2个用来获取响应头部的方法：`getAllResponseHeaders`和`getResponseHeader`。前者是获取 response 中的所有header 字段，后者只是获取某个指定 header 字段的值。另外，`getResponseHeader(header)`的`header`参数不区分大小写。

```ts
DOMString getAllResponseHeaders();
DOMString getResponseHeader(DOMString header);
```

*这2个方法看起来简单，但却处处是坑儿。*你是否遇到过下面的坑儿?——反正我是遇到了。。。

1. 使用`getAllResponseHeaders()`看到的所有`response header`与实际在控制台 `Network` 中看到的 `response header` 不一样
2. 使用`getResponseHeader()`获取某个 `header` 的值时，浏览器抛错`Refused to get unsafe header "XXX"`

经过一番寻找最终在 [Stack Overflow找到了答案](https://link.segmentfault.com/?url=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F7462968%2Frestrictions-of-xmlhttprequests-getresponseheader)。

+ 原因1：[W3C的 xhr 标准中做了限制](https://link.segmentfault.com/?url=https%3A%2F%2Fwww.w3.org%2FTR%2FXMLHttpRequest%2F)，规定客户端无法获取 response 中的 `Set-Cookie`、`Set-Cookie2`这2个字段，无论是同域还是跨域请求；
+ 原因2：[W3C 的 cors 标准对于跨域请求也做了限制](https://link.segmentfault.com/?url=https%3A%2F%2Fwww.w3.org%2FTR%2Fcors%2F%23access-control-allow-credentials-response-header)，规定对于跨域请求，客户端允许获取的response header字段只限于“`simple response header`”和“`Access-Control-Expose-Headers`” （两个名词的解释见下方）。

> "`simple response header`"包括的 header 字段有：`Cache-Control`,`Content-Language`,`Content-Type`,`Expires`,`Last-Modified`,`Pragma`;
> "`Access-Control-Expose-Headers`"：首先得注意是"`Access-Control-Expose-Headers`"进行**跨域请求**时响应头部中的一个字段，对于同域请求，响应头部是没有这个字段的。这个字段中列举的 header 字段就是服务器允许暴露给客户端访问的字段。

所以`getAllResponseHeaders()`只能拿到***限制以外\***（即被视为`safe`）的header字段，而不是全部字段；而调用`getResponseHeader(header)`方法时，`header`参数必须是***限制以外\***的header字段，否则调用就会报`Refused to get unsafe header`的错误。

### 指定`xhr.response`的数据类型

有些时候我们希望`xhr.response`返回的就是我们想要的数据类型。比如：响应返回的数据是纯JSON字符串，但我们期望最终通过`xhr.response`拿到的直接就是一个 js 对象，我们该怎么实现呢？
有2种方法可以实现，一个是`level 1`就提供的`overrideMimeType()`方法，另一个是`level 2`才提供的`xhr.responseType`属性。

#### `xhr.overrideMimeType()`

`overrideMimeType`是`xhr level 1`就有的方法，所以浏览器兼容性良好。这个方法的作用就是用来重写`response`的`content-type`，这样做有什么意义呢？比如：server 端给客户端返回了一份`document`或者是 `xml`文档，我们希望最终通过`xhr.response`拿到的就是一个`DOM`对象，那么就可以用`xhr.overrideMimeType('text/xml; charset = utf-8')`来实现。

再举一个使用场景，我们都知道`xhr level 1`不支持直接传输blob二进制数据，那如果真要传输 blob 该怎么办呢？当时就是利用`overrideMimeType`方法来解决这个问题的。

下面是一个获取图片文件的代码示例：

```javascript
var xhr = new XMLHttpRequest();
//向 server 端获取一张图片
xhr.open('GET', '/path/to/image.png', true);

// 这行是关键！
//将响应数据按照纯文本格式来解析，字符集替换为用户自己定义的字符集
xhr.overrideMimeType('text/plain; charset=x-user-defined');

xhr.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    //通过 responseText 来获取图片文件对应的二进制字符串
    var binStr = this.responseText;
    //然后自己再想方法将逐个字节还原为二进制数据
    for (var i = 0, len = binStr.length; i < len; ++i) {
      var c = binStr.charCodeAt(i);
      //String.fromCharCode(c & 0xff);
      var byte = c & 0xff; 
    }
  }
};

xhr.send();
```

代码示例中`xhr`请求的是一张图片，通过将 `response` 的 `content-type` 改为'text/plain; charset=x-user-defined'，使得 `xhr` 以纯文本格式来解析接收到的blob 数据，最终用户通过`this.responseText`拿到的就是图片文件对应的二进制字符串，最后再将其转换为 blob 数据。

```javascript
xhr.send();
```

代码示例中`xhr`请求的是一张图片，通过将 `response` 的 `content-type` 改为'text/plain; charset=x-user-defined'，使得 `xhr` 以纯文本格式来解析接收到的blob 数据，最终用户通过`this.responseText`拿到的就是图片文件对应的二进制字符串，最后再将其转换为 blob 数据。

#### `xhr.responseType`

`responseType`是`xhr level 2`新增的属性，用来指定`xhr.response`的数据类型，目前还存在些兼容性问题，可以参考本文的【`XMLHttpRequest`的兼容性】这一小节。那么`responseType`可以设置为哪些格式呢，我简单做了一个表，如下：

| 值              | `xhr.response` 数据类型 | 说明                             |
| --------------- | ----------------------- | -------------------------------- |
| `""`            | `String`字符串          | 默认值(在不设置`responseType`时) |
| `"text"`        | `String`字符串          |                                  |
| `"document"`    | `Document`对象          | 希望返回 `XML` 格式数据时使用    |
| `"json"`        | `javascript` 对象       | 存在兼容性问题，IE10/IE11不支持  |
| `"blob"`        | `Blob`对象              |                                  |
| `"arrayBuffer"` | `ArrayBuffer`对象       |                                  |

下面是同样是获取一张图片的代码示例，相比`xhr.overrideMimeType`,用`xhr.response`来实现简单得多。

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
//可以将`xhr.responseType`设置为`"blob"`也可以设置为`" arrayBuffer"`
//xhr.responseType = 'arrayBuffer';
xhr.responseType = 'blob';

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = this.response;
    ...
  }
};

xhr.send();
```
