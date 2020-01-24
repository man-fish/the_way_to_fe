## css3属性大补冲

1.选择器

> css3选择器补充：
> 	1.div+p				{div同级且相邻的p元素。兄弟选择器选后面所有。}
> 	2.[targrt]			{带有target属性的元素。}
> 	3.[target=_black]		{有target=_blank的属性的元素。！！不能加ele}
> 	4.[target~=black]		{target属性里面包含black的所有元素。}
> 	5.p~ul				{所有ul前面有p的ul，就是兄弟选择器且只选后面一个。}
> 	6.ele[attr^="value"]	{所有选择属性以....开头的元素。}
> 	7.ele[attr$="value"]	{所有选择属性以....结尾的元素。}
> 	8.ele[attr*="value"]	{所有属性包含value的元素}
> 伪类选择器：	
> 	0.:active	:hover	:focus	:visited   :link
> 	1.:first-line		{选择首行}
> 	2.:first-child		{选择首字母}
> 	3.:not(ele)		{所有不是...的元素。}
> 	4.::selection		{用户选取部分（就是选中大段文字）}
> 	5.:empty		{没有子节点的元素。}
> 	6.:disabled		{被禁用的}
> 	7.:enabled		{没被禁用的。}
> 	8.:checked		{被选用的。}
> 	9.:nth-child()		{
> 		      			:nth-child(2)第二个
> 		      			:nth-child(n+4)大于等于4
> 		      			:nth-child(-n+4)小于等于4
> 		      			:nth-child(2n)偶数
> 		      			:nth-child(2n+1)奇数
> 					如果一定要理解那么n就是整数的意思，n+4的话n最小为0所以意思就是大于等于四
> 					还有自定义的:nth-child(3n+1)
> 					}
> 	18.:last-child		{最后一个。}
>
> ​	19:optional		{可选择的表单属性。}
>
> ​	20.required		{必选的。}

2.属性

clip 裁剪属性：

> 针对于浮动元素使用，计算位置从上和左出发：

![1551772997488](F:\bootstrap\后台大項目筆記\clip.png)

颜色表示方式（rgba）：

> 传入三个颜色数字值，并且最后一个参数是透明度（opacity）

```css
.div{
    color:rgba(0,0,0,0.7);
}
```

list-style列表的修饰：

> list-style-position：inside/outside；
>
> list-style-image：	url('地址')；

网页遮罩层:

```css
div{
    height:100%;
    width:100%;
    postion:fixed;
    top:0px;
    left:0px;
    background:rgba(0,0,0,0.7);
    z-index:1000;
    overflow:auto;
}
```

![css2](F:\bootstrap\后台大項目筆記\css2.png)

盒子阴影

```
div{
    box-shadow:5px,5px,5px,100px,rgba(0,0,0,1); 
}
```

