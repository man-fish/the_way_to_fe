## 用css实现元素的显示和隐藏

##### 父级控制子级

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        ul{
            display:none;
        }

        div:hover .son{
            display: block;
        }
    </style>
</head>
<body>
    <div>
        <p>点击显示</p>
        <ul class="son">
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </div>
</body>
</html>
```

##### 同级控制同级

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        ul{
            display:none;
        }

        p:hover ~.son{
            display: block;
        }
    </style>
</head>
<body>
    <div>
        <p>点击显示</p>
        <ul class="son">
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </div>
</body>
</html>
```

> 不推荐使用同级控制同级，谁用谁知道。