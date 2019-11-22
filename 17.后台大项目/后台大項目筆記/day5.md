Day5

0.php知识点补充：

```sql
	$sql = sprintf('select 
	comments.*,
	posts.title as post_title
	from comments
	inner join posts on comments.post_id = posts.id
	limit %d,%d;',$offset,$length);
```

好像是因为拼接太麻烦了才这么写，%d表示后面的传入参数参数，把后面的参数传进去，然后转换成字符串这是sprintf(str,参数)，printf就是输出。

1.SEO概念：

这里我对于他其实不是特别了解，简单的来说就是使网页在搜索引擎中显示的位置更靠前，更容易被检索，是一种前端技术。

2.Ajax的弊端和优点

弊端:ajax的数据使不能被搜索引擎抓取的所以（但是谷歌和必应可以*我的人生目标*），前台页面一般使用传统方法。

> 小贴士：
>
> 阿里巴巴使国内技术力最高的网站服务。
>
> 淘宝上首推是要花钱的，20一次点击。
>
> 微信是抄的。

优点:刷新页面不跳转，加载快，我下面的项目就能看出来，ajax的请求获取的页面里面的tbody就是空的，而内嵌php代码的效果就要有预先写好，和脚本生成的界面。对于以前的网络速度来说差距特别大。

> 所以ajax一般配合模板引擎来做。



3.[JsRender 前端渲染模板基础学习]



> - 原始赋值： {{:属性名}}，显示原始数据
> - 转码赋值： {{>属性名}}，显示HTML编码后的数据，让数据原样输出
> - 控制语句可嵌套使用：
>   - 判断： {{if 表达式}} … {{else}} … {{/if}}
>   - 循环： {{for 数组}} … {{/for}}
> - 其它进阶
>   - 模板嵌套，使用：{{for tmpl="#另一个模板" /}}
>   - 转换器 $.views.converters()定义，使用：{{func:属性名}}
>   - 帮助方法 $.views.helpers()定义，使用：{{if ~func(arg1, arg2, ...)}}
>   - 自定义标签 $.views.tags()

```javascript
  <script id="comment_tmpl" type="type/html">
    {{for comments}}
          <tr {{if status =='held'}} class="warning" {{else status == 'rejected'}} class="danger"
          {{/if}} data-id={{:id}}>
            <td class="text-center"><input type="checkbox"></td>
            <td>{{:author}}</td>
            <td>{{:content}}</td>
            <td>{{:post_title}}</td>
            <td>{{:created}}</td>
            <td>{{:status}}</td>
            <td class="text-center">
              {{if status =='held'}}
              <a href="post-add.php" class="btn btn-info btn-xs">批准</a>
              <a href="post-add.php" class="btn btn-warning btn-xs">拒绝</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
              {{else}}
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>              
              {{/if}}
            </td>
          </tr>
      {{/for}}
  </script>
```

**容器**

```
<script id="comment_tmpl" type="type/html">

</script>
```

**注释标签 {{!--    --}}**

```
{{!--  echo aTK  --}}
```

**输出标签 {{:--    --}}**

```
{{:author}}//输出的是关联数组的键
```

**for循环 {{for date}}**

```
 
```

**if判断 {{if condition}}**

```
            {{if info.age >= 18}}
              大于18岁
            {{else info.age >= 16&&info.age < 18}}
              大于16岁小于18岁
            {{else}}
              未成年
            {{/if}}
```

**函数调用**

```javascript
$('#comment_tmpl').render({comments:res});
//res是ajax返回的json数组。
```



4.Ajax的一些注意点

1.$.get和\$.post会自动识别你返回的数据，json或者是字符串。

2.服务端要是声明了json格式就会报错。

3.总之ajax的服务端尽量使用json返回。

```javascript
<?php 
	require_once '../../functions.php';

	$length = 20;

	$page = empty($_GET['page'])? 1 :$_GET['page'];

	$offset = ($page - 1) * $length;

	$sql = sprintf('select 
	comments.*,
	posts.title as post_title
	from comments
	inner join posts on comments.post_id = posts.id
	limit %d,%d;',$offset,$length);

	$comments = xiu_fetch_all($sql);

	$comments_json = json_encode($comments);

	header('Content-Type:application/json');
	//这里json
	echo $comments_json;
 ?>
```

这里很正常的说。

```php
<?php 
	require_once '../../functions.php';

	$length = 20;

	$sql_count = 'select 
		count(1) as count 
		from comments 
		inner join posts on comments.post_id = posts.id ';

	$pages = (int)ceil(xiu_fetch_one($sql_count)['count']/$length);

	// $count = array('comment_count'=> $pages);

	// $json_count = json_encode($count);

	echo $pages;
 ?>
 -----------------------------------------------------------------------------------------------
       $.ajax({
          url: 'api/comments_count.php',
          type: 'get',
          async: false,
          success: function (res) {
          pages = res;
          }
      })
```

这里的就是返回一个单纯的字符串，但是这样的时候返回一个布尔值就会出现问题。

```php
<?php 
	require_once '../../functions.php';

	if(empty($_GET['id'])){
		exit('缺少重要参数。');
	}
	$id = $_GET['id'];

	$rows = xiu_creat_one('delete from comments where id in ('.$id.');');

	header('Content-Type: application/json');

	echo json_encode($rows > 0);
	//这样的输出一个布尔值的时候不使用json格式就会返回一个字符串
 ?>
```

**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!这里超重要，下完postman来试一下!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!**

最后的分页出了点问题很难受

那么我接下来的几天

把剩下的课弄完

解决前面的问题

以及总结。