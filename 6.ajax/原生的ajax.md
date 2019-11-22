### 原生的ajax

1.对象的创建：

> 对于IE的兼容：

```javascript
var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')；
```

3.事件回调:

1.onreadystatechange

> =4是不论成功与否

```javascript
    oReq.onreadystatechange=function(){
      if(oReq.readyState==4){
        if(oReq.status==200){
		//this.readystate就是指状态，不论成功与否哦
         //不是200的响应码就是报错
        }
      }
    };
```

2.onload 和 onerror

> 一个是响应报文下载完毕，另一个是下载失败。

```javascript
xhr.onerror = function(event) {
    console.log("onerror()");
}
xhr.onload = function(event) {
    console.log("onload()");
}
```
2.使用get的方式上传

```javascript
var xhr = new XMLHttpRequest()
// GET 请求传递参数通常使用的是问号传参
// 这里可以在请求地址后面加上参数，从而传递数据到服务端
xhr.open('GET', './delete.php?id=1')
// 一般在 GET 请求时无需设置响应体，可以传 null 或者干脆不传
xhr.send(null)
xhr.onreadystatechange = function () {
if (this.readyState === 4) {
console.log(this.responseText)
}
}
```

3.使用post的方式上传

```javascript
var xhr = new XMLHttpRequest()
// open 方法的第一个参数的作用就是设置请求的 method
xhr.open('POST', './add.php')
// 设置请求头中的 Content‐Type 为 application/x‐www‐form‐urlencoded
// 标识此次请求的请求体格式为 urlencoded 以便于服务端接收数据
xhr.setRequestHeader('Content‐Type', 'application/x‐www‐form‐urlencoded')
// 需要提交到服务端的数据可以通过 send 方法的参数传递
// 格式：key1=value1&key2=value2
xhr.send('key1=value1&key2=value2')
xhr.onreadystatechange = function () {
if (this.readyState === 4) {
console.log(this.responseText)
}
}
```

4.同步和异步

> 同步：一个人在同一时刻能做一件事情，在执行一些耗时的操作（不需要看管）不去做别的事，只是等待。
> 异步：在执行一些耗时的操作（不需要看管）去做别的事，而不是等待。

```javascript
console.log('before ajax')
var xhr = new XMLHttpRequest()
// 同步方式
xhr.open('GET', './time.php', false)
//true：异步方式
//false：同步方式
// 同步方式 执行需要 先注册事件再调用 send，否则 readystatechange 无法触发
xhr.onreadystatechange = function () {
if (this.readyState === 4) {
// 这里的代码最后执行
console.log('request done')
}
}
xhr.send(null)
console.log('after ajax')

```

