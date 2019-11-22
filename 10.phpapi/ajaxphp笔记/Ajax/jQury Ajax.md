# jQury Ajax

1.底层api的使用

> 使用jquery的好处之一就是他会自动根据后台的数据来解析json字符串->json格式的数据。

##### $.ajax:

```javascript
$.ajax({
url: './get.php',
type: 'get',
dataType: 'json',
data: { id: 1 },
async: false,
beforeSend: function (xhr) {
console.log('before send')
    //用来书写进度条的开始。
},
success: function (data) {
console.log(data)
    //这里来操作返回的数据。
},
error: function (err) {
console.log(err)
},
complete: function () {
console.log('request completed')
    //这个就可以用来写进度条。
}
})
```

> 常用选项参数介绍：
> url：请求地址
> type：请求方法，默认为 get
> dataType：服务端响应数据类型			
>
> --预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML。在1.4中，JSON就会生成一个JavaScript对象，而script则会执行这个脚本。随后服务器端返回的数据会根据这个值解析后，传递给回调函数,如果后台未规定格式就需要自己编写。
>
> contentType：请求体内容类型，默认 application/x-www-form-urlencoded
>
> data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递
>
> timeout：请求超时时间
> beforeSend：请求发起之前触发                                   //noprogress.start
> success：请求成功之后触发（响应状态码 200）
> error：请求失败触发
> complete：请求完成触发（不管成功与否）  		//nprogress.end

2.快捷方法

> $.get :  默认为get的方式请求数据

```javascript
$.get('ajax/test.html', function(data) {
  $('.result').html(data);
  alert('Load was performed.');
});

$.get({'url','data(json)',success(fn())});
```

> $.post:  默认为post的方式请求数据

```javascript
$.post('ajax/test.html', function(data) {
  $('.result').html(data);
    //data就是返回的数据，只有success时会执行这个函数。
});

$.post({'url','data(json)',success(fn())});
```

> $.getJSON 我们一般都使用的是json格式的返回数据，但是万一后台出了问题我们可以用这个来强制转换。是一种get方法。

3.全局事件

> 每一个jqury的ajax在封装的时候，在其每一个阶段（状态码）的时候都会触发一个相应的全局事件，这就是原理。一般用于进度条的加载。

$\$(document).ajaxStart()    | |   \$(document).ajaxStop() $

```javascript
$(docunment).ajaxStart(function(){
     $(".loading").fadeIn();
})
$(docunment).ajaxStop(fucntion(){
              //这里的ajaxstop是指不管是成功还是失败。=complete
	$(".loading").fadeOut();                     
})
$(docunment).ajaxError(fn);
//略
```

$Nprogress进度条插件$

> 引入包

```html
<script src='nprogress.js'></script>
<link rel='stylesheet' href='nprogress.css'/>
```

> 通过ajax全局事件调用

```javascript
$(docunment).ajaxStart(function(){
    NProgress.start();
})
$(docunment).ajaxStop(function(){
	NProgress.done();                    
})
```

ajax方法的弊端

对seo优化不利。