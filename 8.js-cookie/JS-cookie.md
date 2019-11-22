## JS-cookie

1.使用原生js代码来操作cookie。

```javascript
var time=new Date('june 10,2028 12:12:12');

var GMTtime=time.toGMTString();

document.cookie='key=value;expires='+time;
```

2.jscookie插件

```javascript
Cookies.set('name','value',{expires:7,path:''}); 
//有效期七天
Cookies.set('name',{foo:'bar'});
//自动转换为json数据
Cookies.get('name');
//获取
Cookies.get();
//全部获取
Cookies.remove('name');
//移除
```

