### Day5补

```javascript
    $(function($){
        var pages = 1 ;
        var current_page = 1 ;

          create_dvp();
			//先初始化一回页面
          $('tbody').on('click','.btn-danger',function(){
            var $tr = $(this).parent().parent();
            var id = $tr.data('id');
            var status = $tr.data('status');
            $.get('api/comment_delete.php',{id:id},function(res){
              if(!res)return;

              create_dvp();
			//删除动作后重新获取分页组件和数据
              console.log(res);
            })
          })
		
         $('tbody').on('click','.btn-info',function(){
            var $tr =$(this).parent().parent();
            var id = $tr.data('id');
            $.get('api/comment_approve.php',{id:id},function(res){
                getPage(current_page);
            })
          }) 

        $('tbody').on('click','.btn-warning',function(){
            var $tr =$(this).parent().parent();
            var id = $tr.data('id');
            $.get('api/comment_deal.php',{id:id},function(res){
                getPage(current_page);
            })
          }) 

      function create_dvp(){
            $.ajax({
                url: 'api/comments_count.php',
                type: 'get',
                async: false,
                success: function (res) {
                    pages = res;
                }
              })
            console.log(current_page);
			//同步请求的方式获取总页数
            if(pages<current_page){
              current_page = pages;
            }
			//如果总页数减小了那就获取当前页减一
            getPage(current_page);
			//重新加载数据
            $('.pagination').twbsPagination('destroy');
            $('.pagination').twbsPagination({
                totalPages:pages,
                visiablePages:5,
                initiateStartPageClick:false,
                //关闭自动跳转
                startPage:current_page,
                //设置起始页
                onPageClick: function(e,page){
                    getPage(page);
                }
              })
            }
			//摧毁并且重新创建分页组建
      function getPage(page){
            $.get('api/comments_get.php',{page:page},function(res){

                var html = $('#comment_tmpl').render({comments:res});

                $("tbody").html(html);

                current_page = page;
              })
            }
      }) 
```

> 很重要的页面逻辑
>
> 第一轮的页数是由初始值设置的，之后的每轮页数都是从分页组件的点击里获取的。

```tmp
  <script src="/static/assets/vendors/jsrender/jsrender.js"></script>
  <script id="comment_tmpl" type="type/html">
    {{for comments}}
          <tr {{if status =='held'}} class="warning" {{else status == 'rejected'}} class="danger"
          {{/if}} data-id={{:id}} data-status={{:status}}>
            {{!--<td class="text-center"><input type="checkbox"></td> --}}
            <td style="width:80px;" class="text-center">{{:author}}</td>
            <td>{{:content}}</td>
            <td>{{:post_title}}</td>
            <td>{{:created}}</td>
            <td>{{:status}}</td>
            <td class="text-center">
              {{if status =='held'}}
              <a href="javascript:;" class="btn btn-info btn-xs">批准</a>
              <a href="javascript:;" class="btn btn-warning btn-xs">拒绝</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
              {{else}}
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>              
              {{/if}}
            </td>
          </tr>
      {{/for}}
  </script>
  <script src="/static/assets/vendors/twbs-pagination/jquery.twbsPagination.js"></script>
```

```php
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

	echo $comments_json;
 ?>
```

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
 ?>
```

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
 ?>
```

```php
<?php 
	require_once '../../functions.php';

	if(empty($_GET['id'])){
		exit('缺少重要参数。');
	}
	
	$id = $_GET['id'];

	$rows = xiu_creat_one("UPDATE comments SET status = 'approved' where id = '{$id}';");

	header('Content-Type: application/json');

	echo json_encode($rows > 0);
 ?>
```

