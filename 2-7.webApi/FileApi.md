# 文件 API

通过使用在 HTML5 中加入到 DOM 的 File API，使在web内容中让用户选择本地文件然后读取这些文件的内容成为可能。用户可以通过HTML中的 [<input type="file">](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file) 元素或者是通过拖拽来选择本地文件。

## FileList

文件选择器的files属性包含了用户选择的所有文件排列成一个`FileList`数组：

```html
<input type="file" id="input">
```

如果你想让用户选择多个文件，只需在 `input` 元素上使用 `multiple` 属性：

```html
<input type="file" id="input" multiple onchange="handleFiles(this.files)">
```

使用传统的 DOM 选择器访问一个被选择的文件：

```js
const selectedFile = document.getElementById('input').files[0];
```

通过 change 事件访问被选择的文件，当用户选择一个文件时，`handleFiles()` 方法会用一个 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) 对象作为参数被调用，[`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) 对象包含表示用户选择的文件的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象。

DOM 提供 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) 对象列出了用户选择的所有文件，每一个文件被指定为一个 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象。你可以通过检查文件列表 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) 的 `length` 属性来确定用户选择了多少个文件：

```js
const numFiles = files.length;
```

可以像数组一样简单地访问文件列表来检索各个 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象：

```js
for (let i = 0, numFiles = files.length; i < numFiles; i++) {
  const file = files[i];
  // ...
}
```

## File 对象

`File` 对象提供有关文件的信息，并允许网页中的 JavaScript 读写文件。

最常见的使用场合是表单的文件上传控件，用户在一个 `<input type="file">` 元素上选择文件后，浏览器会生成一个数组，里面是每一个用户选中的文件，它们都是 `File` 实例对象。

`File` 对象是一种特殊 `Blob` 对象，并且可以用在任意的 `Blob` 对象的 `context` 中。比如说， `FileReader`, `URL.createObjectURL()`, `createImageBitmap()`, 及 `XMLHttpRequest.send()` 都能处理 `Blob` 和 `File`。

#### 构造

浏览器原生提供一个 `File()` 构造函数，用来生成 `File` 实例对象。

```js
const myFile = new File(bits, name[, options]);
```

参数：

- `bits`：

一个数组，表示文件的内容。成员可以是 `ArrayBuffer`，`ArrayBufferView`，`Blob`，或者 `DOMString`对象的 `Array`，或者任何这些对象的组合。

通过这个参数，也可以实现 `ArrayBuffer`，`ArrayBufferView`，`Blob` 转换为 `File` 对象。

- `name`：

字符串，表示文件名或文件路径。

- `options`：

配置对象，设置实例的属性。该参数可选。可选值有如下两种：

`type`:  `DOMString`，表示将要放到文件中的内容的 MIME 类型。默认值为 `""` 。 `lastModified`:  数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 `Date.now()`。

#### 实例

 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象提供了三个属性，包含了文件的有用信息。

- `name`

  文件名称，只读字符串。只包含文件名，不包含任何路径信息。

- `size`

  以字节数为单位的文件大小，只读的64位整数。

- `type`

  文件的 MIME 类型，只读字符串，当类型不能确定时为 `""`。

## FileReader

通过 File API，我们可以访问 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)，它包含了表示用户所选文件的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象

`FileReader ` 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。

其中File对象可以是来自用户在一个[`<input />`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)元素上选择文件后返回的[`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)对象,也可以来自拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)对象,还可以是来自在一个[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)上执行`mozGetAsFile()`方法后返回结果。

> **重要提示：** FileReader仅用于以安全的方式从用户（远程）系统读取文件内容，它不能用于从文件系统中按路径名读取文件。

## 构造函数

[`FileReader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/FileReader)

返回一个新构造的`FileReader`。

```js
function printFile(file) {
  var reader = new FileReader();
  reader.onload = function(evt) {
    console.log(evt.target.result);
  };
  reader.readAsText(file);
}
```

## 属性

[`FileReader.error`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/error) 只读：一个[`DOMException`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)，表示在读取文件时发生的错误 。

[`FileReader.readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 只读：表示`FileReader`状态的数字。取值如下：常量名值描述`EMPTY`=`0`还没有加载任何数据.`LOADING`=`1`数据正在被加载.`DONE`=`2`已完成全部的读取请求.

[`FileReader.result`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result) 只读：文件的内容。该属性仅在读取操作后才有效，数据的格式取决于使用哪个方法来启动读取操作。

## 事件处理

#### FileReader.onabort

处理abort事件。该事件在读取操作被中断时触发。

```js
reader.onabort = function() { ... };
```

#### FileReader.onerror

处理error事件。该事件在读取操作发生错误时触发。

```js
function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onerror = function(event) {
    alert("Failed to read file!\n\n" + reader.error);
    reader.abort(); 
    // (...does this do anything useful in an onerror handler?)
  };

  reader.readAsText(file);
}
```

#### FileReader.onload

处理load事件。该事件在读取操作完成时触发。

```js
// Callback from a <input type="file" onchange="onChange(event)">
function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    // The file's text will be printed here
    console.log(e.target.result)
    // this as well
    console.log(this.result)
  };

  reader.readAsText(file);
}
```

#### FileReader.onloadstart

处理loadstart事件。该事件在读取操作开始时触发。

#### FileReader.onloadend

处理loadend事件。该事件在读取操作结束时（要么成功，要么失败）触发。

#### FileReader.onprogress

处理progress事件。该事件在读取Blob时触发。

-----

> **注意：**因为 `FileReader` 继承自[`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)，所以所有这些事件也可以通过[`addEventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)方法使用。

## 方法

`FileReader`接口有4个方法，其中3个用来读取文件，另一个用来中断读取。无论读取成功或失败，方法并不会返回读取结果，这一结果存储在`result`属性中。

#### FileReader.abort

中止读取操作。在返回时，`readyState`属性为`DONE`。

```js
instanceOfFileReader.abort();
```

> **注意：**对一个没有正在进行读取操作（[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 不是`LOADING`）的 FileReader 进行 abort 操作，会抛出 `DOM_FILE_ABORT_ERR 错误。`

#### FileReader.readAsArrayBuffer

开始读取指定的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容, 一旦完成, result 属性中保存的将是被读取文件的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer) 数据对象.

```js
instanceOfFileReader.readAsArrayBuffer(blob/file);
```

#### FileReader.readAsBinaryString

开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含所读取文件的原始二进制数据。

```js
instanceOfFileReader.readAsBinaryString(blob/file);
```

#### FileReader.readAsDataURL

开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个`data:` URL格式的Base64字符串以表示所读取文件的内容。

```js
instanceOfFileReader.readAsDataURL(blob/file)
```

#### FileReader.readAsText

开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。

```js
instanceOfFileReader.readAsText(blob/file)
```

## 图片预览

`FileReader`的另一个文件读取方法`readAsDataURL`，可以将图片文件转换为`base64`编码。这个方法非常有用，可以实现本地图片预览，直接上个MDN的[demo](https://link.jianshu.com/?t=https://mdn.mozillademos.org/files/3698/image_upload_preview.html)，源码：

```js
<!doctype html>
<html>
<head>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<title>Image preview example</title>
<script type="text/javascript">
oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

oFReader.onload = function (oFREvent) {
  document.getElementById("uploadPreview").src = oFREvent.target.result;
};

function loadImageFile() {
  if (document.getElementById("uploadImage").files.length === 0) { return; }
  var oFile = document.getElementById("uploadImage").files[0];
  if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }
  oFReader.readAsDataURL(oFile);
}
</script>
</head>

<body onload="loadImageFile();">
  <form name="uploadForm">
    <table>
      <tbody>
        <tr>
          <td><img id="uploadPreview" style="width: 100px; height: 100px;" src="" alt="Image preview" /></td>
          <td><input id="uploadImage" type="file" name="myPhoto" onchange="loadImageFile();" /></td>
        </tr>
      </tbody>
    </table>

    <p><input type="submit" value="Send" /></p>
  </form>
</body>
</html>
```

## 通过 click() 方法使用隐藏的 file input 元素

你可以隐藏公认难看的 file [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素并显示你自己的界面来打开文件选择器，然后显示哪个或哪些文件被用户选中了。你可以通过给 input 元素添加 `display:none` 的样式，再调用 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素的 [`click()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click) 方法来实现。

考虑这段HTML：

```html
<input type="file" id="fileElem" multiple accept="image/*" style="display:none" onchange="handleFiles(this.files)">
<button id="fileSelect">Select some files</button>
```

处理 `click` 事件的代码类似于这样：

```js
const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
}, false);
```

你可以给这个用来打开文件选择器的新按钮添加任何你想要的样式。

## 使用 label 元素来触发一个隐藏的 file input 元素

允许在不使用 JavaScript（click() 方法）来打开文件选择器，可以使用 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) 元素。注意在这种情况下，input 元素不能使用 `display: none`（或 `visibility: hidden`）隐藏，否则 label 将无法通过键盘访问。使用 [visually-hidden technique](https://a11yproject.com/posts/how-to-hide-content/) 作为替代。

考虑这段HTML：

```html
<input type="file" id="fileElem" multiple accept="image/*" class="visually-hidden">
<label for="fileElem">Select some files</label>
```

和这段CSS：

```css
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

/* Separate rule for compatibility, :focus-within is required on modern Firefox and Chrome */
input.visually-hidden:focus + label {
  outline: thin dotted;
}
input.visually-hidden:focus-within + label {
  outline: thin dotted;
}
```

这里不需要添加任何 JavaScript 代码来调用`fileElem.click()`，另外，这时你也可以给 label 元素添加你想要的样式。您需要在其 label 上提供隐藏 input 字段的焦点状态的视觉提示，比如上面用的轮廓，或者背景颜色或边框阴影。（截至编写时为止，Firefox 不显示 `<input type="file">` 元素的视觉提示。）