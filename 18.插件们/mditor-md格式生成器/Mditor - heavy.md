# Mditor - heavy

##### 第一步:

引入 Mditor 样式文件

```
<link rel="stylesheet" href="your-path/dist/css/mditor.min.css" />
```

引用 Mditor 脚本文件

```
<script src="your-path/dist/js/mditor.min.js"></script>
```

当然，也可以使用 CDN 资源

```
...
<link rel="stylesheet" href="https://unpkg.com/mditor@1.0.5/dist/css/mditor.min.css" />
...
<script src="https://unpkg.com/mditor@1.0.5/dist/js/mditor.min.js"></script>
```

##### 第二步:

添加 textarea 元素

```
<textarea name="editor" id="editor"></textarea>
```

创建 Mditor 实例

```
var mditor =  Mditor.fromTextarea(document.getElementById('editor'));
 
//获取或设置编辑器的值
mditor.on('ready',function(){
  console.log(mditor.value);
  mditor.value = '** hello **';	
});
```

所有 API 都应在 ready 事件中进行调用

##### 模式控制 API:

```javascript
//是否打开分屏			
mditor.split = true;	//打开
mditor.split = false;	//关闭
 
//是否打开预览			
mditor.preivew = true;	//打开
mditor.preivew = false;	//关闭
 
//是否全屏			
mditor.fullscreen = true;		//打开	
mditor.fullscreen = false;	//关闭	
```

##### 工具条配置 API

```javascript
//mditor.toolbar.items 是一个数组，包括所有按钮的信息
//可以直接操作 items 以控制工具条
 
//只保留第一个按钮
mditor.toolbar.items = mditor.toolbar.items.slice(0,1);
//添加一个按钮
mditor.toolbar.addItem({...});
//移除一个按钮
mditor.toolbar.removeItem(name);
//替换一个按钮
mditor.toolbar.replaceItem(name, {...});
//获取一个按钮
mditor.toolbar.getItem(name);
 
//更改按钮行为
//示例，更改「图片」按钮配置，其它按钮是同样的方法
let btn = mditor.toolbar.getItem('image');
//替换按钮动作
btn.handler = function(){
  //自定义处理逻辑
  //this 指向当前 mditor 实例
}; 
 
//还可以替换其它信息
btn.icon = '...';   //设置按钮图标
btn.title = '...';  //投置按钮标题
btn.control = true; //作为控制按钮显示在右侧
btn.key = 'ctrl+d'; //设置按钮快捷建
```