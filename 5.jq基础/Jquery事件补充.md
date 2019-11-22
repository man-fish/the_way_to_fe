### Jquery事件补充

1.onload事件：当图片加载完毕时

2.onchange事件：当域发生变化时

3.toggle事件处理：为一个元素添加多个点击事件。

```javascript
$("p").toggle(
  function(){
  $("body").css("background-color","green");},
  function(){
  $("body").css("background-color","red");},
  function(){
  $("body").css("background-color","yellow");}
);
```



1.批量删除

> HTML5的data-&属性：

【 html5规范了元素自定义属性的规范，都以data-为前缀。】

```javascript
    // this.dataset['id']
    // console.log($(this).attr('data-id'))
    // console.log($(this).data('id'))
```

> dom和html之间的关系：

![dom](F:\bootstrap\后台大項目筆記\dom.png)

使用attr属性修改的是html文档中可见的属性，而使用prop修改的是DOM里定义的属性。所以说checked用attr来获取里面值就是checked，prop就是true和false。

> 全选+删除 的新老方法。
>
> 选择器的效率很低，jq选择器的效率更低。8要用。