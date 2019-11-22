# CodeMirror

1.使用前准备：

```javascript
   <!--不管你要引入什么主题配色都需要引入的css文件-->
   <link rel="stylesheet" href="css/codemirror.css">
   <!--路径/codemirror/mode/-->
　 <!--下面的css文件就是不同主题配色的css文件-->
   <link rel="stylesheet" href="css/monokai.css">
   <link rel="stylesheet" href="css/3024-day.css">
   <link rel="stylesheet" href="css/3024-night.css">
       
　　<!--不管你需要引入什么样式和主题都是必须引入的-->
　　<script src="js/codemirror.js"></script>
　　<!--使用的是javascript样式的编辑器-->
    <!--路径/codemirror/mode/-->
    <script src="js/javascript.js"></script>
```

2.初始化

```javascript
    <textarea id="code" name="code">

    </textarea>        
	var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            mode: "javascript", //输入的语言模式
            lineNumbers: true,  //是否显示每一行的行数
            readOnly: false,    //只读
            styleActiveLine: true, //当前行高亮
            matchBrackets: true     //括号匹配
        });　
```

3.更换配色

```javascript
<select onchange="selectTheme()" id=select>
      <option selected>default</option>
       <option>3024-day</option>
       <option>3024-night</option>
</select>       
var input = document.getElementById("select");
function selectTheme() {
            var theme = input.options[input.selectedIndex].textContent; //获取下拉框的内容
            editor.setOption("theme", theme); //把内容设置为主题色，
        }
```

4.拓展api

> 由于textarea中的文本内容并不是正常格式，所以要用函数获取。

```javascript
API
editor.setOption("theme", theme);//设置主题配色

editor.setSize(width,height)//设置编辑框的尺寸

editor.getValue()//获取经过转义的编辑器文本内容

editor.toTextArea()或editor.getTextArea().value//该方法得到的结果是未经过转义的数据

editor.setValue(text)//设置编辑器文本内容

editor.getValue()//获取内容

editor.getRange({line,ch},{line,ch})//获取指定范围内的文本内容第一个对象是起始坐标，第二个是结束坐标

editor.replaceRange(replaceStr,{line,ch},{line,ch})//替换指定区域的内容

editor.getLine(line)//获取指定行的文本内容

editor.lineCount()//统计编辑器内容行数

editor.firstLine()//获取第一行行数，默认为0，从开始计数

editor.lastLine()//获取最后一行行数

editor.getLineHandle(line)//根据行号获取行句柄

editor.getSelection()//获取鼠标选中区域的代码

editor.replaceSelection(str)//替换选中区域的代码

editor.setSelection({line:num,ch:num1},{line:num2,ch:num3})//设置一个区域被选中

editor.somethingSelected()//判断是否被选择

editor.getEditor()//获取CodeMirror对像

editor.undo()//撤销

editor.redo()//回退
　　3.介绍简单的api

　　<1>editor.setValue(string)，为codemirror插件赋值，用来显示到页面中

　　<2>editor.getValue()，当你在页面中编辑的时候，可以用这个方法来获取到你编辑的内容

　　<3>onChange(instance,changeObj)，codeMirror文本被修改后触发

　　<4>getLine(line)：获取指定行的文本内容

　　<5>ineCount():统计编辑器内容行数
```

5.应用实例

```javascript
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>

    <!--不管你要引入什么主题配色都需要引入的css文件-->
    <link rel="stylesheet" href="css/codemirror.css">
    <!--下面的css文件就是不同主题配色的css文件-->
    <link rel="stylesheet" href="css/monokai.css">
    <link rel="stylesheet" href="css/3024-day.css">
    <link rel="stylesheet" href="css/3024-night.css">

    <!--不管你需要引入什么样式和主题都是必须引入的-->
    <script src="js/codemirror.js"></script>
    <!--使用的是javascript样式的编辑器-->
    <script src="js/javascript.js"></script>

    <style type="text/css">
        .CodeMirror {
            border: 1px solid black;
            font-size: 13px;
            border-radius: 5px;
            font: normal 500 18px/30px 微软雅黑;
        }
	</style>
</head>

<body>
    <!--插件起效果的位置，必须是testarea元素-->
    <textarea id="code" name="code">

    </textarea>


    <!--下拉框用来换选主题配色的，当然主题配色非常多，这里只是随便列举几个例子-->
    <p>Select a theme:
        <select onchange="selectTheme()" id=select>
            <option selected>default</option>
            <option>3024-day</option>
            <option>3024-night</option>
        </select>
    </p>
    <script>
        var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            mode: "javascript", //输入的语言模式
            lineNumbers: true,  //是否显示每一行的行数
            readOnly: false,    //只读
            styleActiveLine: true, //当前行高亮
            matchBrackets: true     //括号匹配
        });　　　　　
        //这个是假数据，假设是从后台拿到的，需要展示到页面中
        var obj = {
            "message": "",
            "code": 200,
            "response": {
                "totalCount": 1,
                "results": [{
                    "status": "deployed",
                    "login_port": 22,
                    "role_info": null,
                    "created": "2017-06-19 09:58:04",
                    "login_user": "root",
                    "hostname": "deploy-226",
                    "login_ip": "172.24.6.226",
                    "id": "1147edbde1494df696019fdb094be43d"
                }],
                "pageSize": 5,
                "page": 1
            },
            "success": true
        }

        setTimeout(function() {
                //假设两秒后才获取到数据
                editor.setValue(JSON.stringify(obj, null, 4))
                    //JSON.stringify()方法的第三个参数的目的就是保留格式的，如果没有的话，
            }, 2000)
            //普通的JSON.stringify(obj)仅仅就是把对象转字符串，并不辉保留空格和换行

        　　　　　 //下拉框选择的时候换主题配色
        var input = document.getElementById("select");

        function selectTheme() {
            var theme = input.options[input.selectedIndex].textContent; //获取下拉框的内容
            editor.setOption("theme", theme); //把内容设置为主题色，
        }

    </script>
</body>

</html>

```

