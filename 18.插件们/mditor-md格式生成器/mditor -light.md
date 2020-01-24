# mditor -light

Mditor是一款轻量级的markdown编辑器。取名自markdown + editor，用于实现页面markdown输入框的便利操作。

## 查看演示

<http://bh-lay.github.io/mditor/>

## 常用格式及快捷键

- **加粗文字** `Ctrl + B`
- *斜体文字* `Ctrl + I`
- [链接文字](http://bh-lay.com/) `Ctrl + L`
- 图片[![暴漫](https://github.com/bh-lay/mditor/raw/master/src/images/baoman.jpg)](https://github.com/bh-lay/mditor/blob/master/src/images/baoman.jpg) `Ctrl + G`
- `code` `Ctrl + Shift + K`
- 代码块 `Ctrl + K`：

```javascript
/**
 * 检测是否为数字
 * 兼容字符类数字 '23'
 */
function isNum(ipt){
	return (ipt !== '') && (ipt == +ipt) ? true : false;
}
```

------

## 如何使用

### 第一步、页面内放置待使用的文本域textarea

```
<textarea id="md_editor">……</textarea>
```

### 第二步、引入jQuery和Mditor，并初始化，

注：因为后续Mditor会逐渐脱离对jQuery的依赖，参数请使用原生dom对象，而非jQuery对象。

```javascript
<script type="text/javascript" src="src/jquery.js"></script>
<script type="text/javascript" src="src/mditor.js"></script>
<script type="text/javascript">
  //获取textarea dom对象
  var ele_textarea = document.getElementById('md_editor');
  //实例化Mditor
  var editor = new mditor(ele_textarea);
</script>
```

## 高级操作

为了保证编辑、发布的显示效果一致，需要按照对应站点文章样式的css来展示编辑时的效果，默认显示效果class为`article`，可参照下面定义方式更改类名。

### 一、实例化Mditor时，可以传入自定义参数

```javascript
var editor = new mditor(document.getElementById('md_editor'),{
  //自定义显示效果class
  previewClass : 'article'
});
```

### 二、可以通过javascript对实例化后的Mditor进行操作，如：

```javascript
//获取转换后的html
editor.getHtml();

//获取markdown格式内容
editor.getContent();

//插入内容
editor.insert('**挤啊挤**')

//进入预览界面
editor.preview();

//返回编辑界面
editor.edit();
```

### 三。我自己使用修改的效果

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>文档编写</title>
<link rel="stylesheet" href="vendors/bootstrap-4.2.1/dist/css/bootstrap.css">
<link href="vendors/font-awesome/css/font-awesome.css" rel="stylesheet">
<link rel="stylesheet" href="vendors/mditor-master/src/mine.css">
<script src="vendors/jquery-2.0.0/jquery.js"></script>
<script src="vendors/bootstrap-4.2.1/dist/js/bootstrap.js"></script>
<script type="text/javascript" src="vendors/mditor-master/src/mditor.js"></script>
<script type="text/javascript">
      window.onload=function(){
            //获取textarea dom对象
            var ele_textarea = document.getElementById('md_editor');
            //实例化Mditor
            var editor = new mditor(ele_textarea);

            $("button").eq(10).on("click",function(){
                  inner = editor.getContent();
                  show = editor.getHtml();
                  if(inner == "" || show == ""){
                        return;
                  }
                  $.post("deal.php",{
                        html : show,
                        md :  inner
                  },function(res){
                        if(res){
                              alert("保存成功");
                        }
                  })

            })

            $("button").eq(9).on("click",function(){
                  $("textarea").val('');
            })

            $("button").eq(8).on("click",function(){
                  location.href="";
            })

            $("button").eq(3).on("click",function(){
                  $("#md_editor").val(function(a,b){return b+"\r"+"`code`"});
                  $(".mditor_input").children("textarea").val(function(a,b){return b+"\r"+"`code`"});
            })

            $("button").eq(2).on("click",function(){
                  $("#md_editor").val(function(a,b){return b+"\r"+"[链接文字](http://)"});
                  $(".mditor_input").children("textarea").val(function(a,b){return b+"\r"+"[链接文字](http://)"});
            })

            $("button").eq(1).on("click",function(){
                  $("#md_editor").val(function(a,b){return b+"\r"+"*斜体*"});
                  $(".mditor_input").children("textarea").val(function(a,b){return b+"\r"+"*斜体*"});
            })

            $("button").eq(0).on("click",function(){
                  $("#md_editor").val(function(a,b){return b+"\r"+"**加粗**"});
                  $(".mditor_input").children("textarea").val(function(a,b){return b+"\r"+"**加粗**"});
            })

            $("button").eq(5).on("click",function(){
                  $("#md_editor").val(function(a,b){return b+"\r"+"\r"+"1.列表内容"});
                  $(".mditor_input").children("textarea").val(function(a,b){return b+"\r"+"1.列表内容"});
            })
            $("button").eq(6).on("click",function(){
                  $("#md_editor").val(function(a,b){return b+"\r"+"+ 列表内容"});
                  $(".mditor_input").children("textarea").val(function(a,b){return b+"\r"+"+ 列表内容"});
            })
            $("button").eq(7).on("click",function(){
                  $("#md_editor").val(function(a,b){return b+"\r"+"表头|表头|表头"+"\r"+"---|:--:|---:"+"\r"+"内容|内容|内容"+"\r"+"内容|内容|内容"});
                  $(".mditor_input").children("textarea").val(function(a,b){return b+"\r"+"表头|表头|表头"+"\r"+"---|:--:|---:"+"\r"+"内容|内容|内容"+"\r"+"内容|内容|内容"});
            })
            $("button").eq(4).on("click",function(){
                  $("#md_editor").val(function(a,b){return b+"\r"+"```javascript"+"\r"+"//some code……```"});
                  $(".mditor_input").children("textarea").val(function(a,b){return b+"\r"+"```javascript"+"\r"+"//some code……```"});
            })

    }
</script>
</head>
<body>
      <ul>
          <li><button class="btn btn-info"><i class="fa fa-bold"></i></button></li>
          <li><button class="btn btn-info"><i class="fa fa-italic"></i></button></li>
          <li><button class="btn btn-info"><i class="fa fa-chain"></i></button></li>
          <li><button class="btn btn-info"><i class="fa fa-paperclip"></i></button></li>
          <li><button class="btn btn-info"><i class="fa fa-code"></i></button></li>
          <li><button class="btn btn-info"><i class="fa fa-list-ol"></i></button></li>
          <li><button class="btn btn-info"><i class="fa fa-list-ul"></i></button></li>
          <li><button class="btn btn-info"><i class="fa fa-table"></i></button></li>
          <li><button class="btn btn-warning"><i class="fa  fa-refresh"></i></button></li>
          <li><button class="btn btn-danger"><i class="fa fa-trash-o"></i></button></li>
          <li><button class="btn btn-success"><i class="fa fa-download"></i></button></li>
    </ul>
<textarea id="md_editor" rows="XX" cols="XX">
</textarea>
</body>

</html>
```

```css
      ul{   
            padding: 0px;
            position: fixed;
            top: 50px;
            right: 0px;
            /*margin: 0 auto;*/
            z-index: 1000000000000000000;
            width:fit-content;
            list-style: none;
            background: white;
      }
      .mditor-mini-help{
            z-index: 1000000000000000001;
      }
      li{
            background: white;
      }
      li>button{
            /*float: left;*/
            margin: 2px 20px;
            height: 40px;
            width: 40px;
      }
      textarea{
            height: 600px;
            resize: none;
      }
```

