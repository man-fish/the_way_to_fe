# PrettyPrint代码段插件

1.引入：

```html
<link rel="stylesheet" href="prettyPrint/css/prettify.css"/>
<script src="prettyPrint/js/prettify.js"></script>
```

2.使用

```html
<body onload="prettyPrint()">
    <pre class="prettyprint linenums">
    </pre>
</body>
```

3.再送一段代码

```javascript
        var getData = {
            "name" : "json",
            "num" : 6,
            "language" : "i love you",
            "jack" : {
                "name":"peter",
                "age": 12
            }
        }
        $("pre").html(JSON.stringify(getData, null, 4))
```

```javascript
JSON.parse(jsonstr); //可以将json字符串转换成json对象。
JSON.stringify(getData, null, 4)//根据json格式生成缩进。四空格
```

