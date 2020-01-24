## Day4

1.数据库数据处理

```sql
select
	posts.id,
	posts.title,
	users.nickname as user_name,
	categories.name as category_name,
	posts.created,
	posts.status
	//选择要查询的数据
from posts
inner join categories on posts.category_id = categories.id  关联表的数据呈现是根据关联的表的字段
inner join users on posts.user_id = users.id
```

![关联查询](F:\bootstrap\后台大項目筆記\关联查询.png)

2.查询所得数据处理

```php
      function xiu_change_status($status){
        $dict = array('drafted' => '草稿','published'=>'已发布','trashed'=>'回收站' );
        return isset($dict[$status])? $dict[$status] : '未知';
      }
		//不使用switch来判断转换。
      function xiu_change_date($created){
          $timeamp = strtotime($created);
          return date('Y年m月d日<b\r>H:i:s', $timeamp);
      }
		//5.10之后调用时间要规定时区
      	date_default_timezone_set("PRC");
      	ini_set('date.timezone','Asia/Shanghai');
```

> 请注意 m/d/y 或 d-m-y 格式的日期，如果分隔符是斜线（/），则使用美洲的 m/d/y 格式。如果分隔符是横杠（-）或者点（.），则使用欧洲的 d-m-y 格式。为了避免潜在的错误，您应该尽可能使用 YYYY-MM-DD 格式或者使用 date_create_from_format() 函数。
>
> 时间使用:分隔。

3.筛选功能

```php
      $categories = xiu_fetch_all("select * from categories");

      $where = '1 = 1';
      $search = '';

      if(isset($_GET['category']) && $_GET['category']!== 'all'){
          $where .= ' and posts.category_id ='. $_GET['category'];
      }
      if(isset($_GET['status']) && $_GET['status']!=='all'){
        $where .= " and posts.status = '{$_GET['status']}'";
      }
		//什么时候封装成函数什么时候不封装成函数。因为这部分判断不是独立存在的所以不能封装起来，会出现执行混乱问题。
//----------------------------------------------------------------------------------------------
      $posts = xiu_fetch_all("select 
        posts.id,
        posts.title,
        users.nickname as user_name,
        categories.name as category_name,
        posts.created,
        posts.status 
        from posts 
        inner join categories on posts.category_id = categories.id 
        inner join users on posts.user_id = users.id
        where {$where}
        order by posts.created
        limit 0,10
        "
      );
```

```php+HTML
        <form class="form-inline" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="get">
            <!-- 分类管理 -->
          <select name="category" class="form-control input-sm">
                  <option value="all">所有分类</option>
                  <?php foreach ($categories as $items ): ?>
                        <option value="<?php echo $items['id'] ?>" 
                          <?php echo isset($_GET['category']) && $_GET['category'] === $items['id']? 'selected':'' ?>>
                          <?php echo $items['name']; ?>
                        </option>
                  <?php endforeach ?>
          </select>

          <select name="status" class="form-control input-sm">
            <option value="all">所有状态</option>
            <option value="drafted" <?php echo isset($_GET['status']) && $_GET['status']==='drafted'? 'selected':'';?>>草稿</option>
            <option value="published" <?php echo isset($_GET['status']) && $_GET['status']==='published'? 'selected':'';?>>已发布</option>
            <option value="trashed" <?php echo isset($_GET['status']) && $_GET['status']==='trashed'? 'selected':'';?>>垃圾桶</option>
          </select>
          <button class="btn btn-default btn-sm" type="submit">筛选</button>
        </form>
```

4.数据分页处理

```php+HTML
    <ul class="pagination pagination-sm pull-right">
      <li><a href="#">上一页</a></li>
      <?php for ($i = $begin; $i <= $end; $i++): ?>
      <li<?php echo $i === $page ? ' class="active"' : '' ?>><a href="?page=<?php echo $i . $search; ?>"><?php echo $i; ?></a></li>
      <?php endfor ?>
      <li><a href="#">下一页</a></li>
    </ul>
```
> 先从html上的逻辑开始分析，我们想一次展现7个页码，每次中间的页码是active的，那么第一页和最后一页的逻辑就很重要。那么我们就要计算出$begin和\$end的大小，并且分析第一页和最后一页的逻辑。
>
> 这个重点就是每一页获取的限制一定要和查取总页数时的限制相同。

5.解决冲突问题

```php
// 分类筛选
if (isset($_GET['category']) && $_GET['category'] !== 'all') {
  $where .= ' and posts.category_id = ' . $_GET['category'];
  $search .= '&category=' . $_GET['category'];
}

if (isset($_GET['status']) && $_GET['status'] !== 'all') {
  $where .= " and posts.status = '{$_GET['status']}'";
  $search .= '&status=' . $_GET['status'];
}
```

```php+HTML
<li<?php echo $i === $page ? ' class="active"' : '' ?>><a href="?page=<?php echo $i . $search; ?>"><?php echo $i; ?></a></li>

```

> 就是记录下筛选的参数并且在分页切换的时候传进去。

还有富文字编辑器和删除的冲突问题没有解决还有上下一`页`

6.补充删除的冲突问题

删除的冲突问题的逻辑远大于分页，删除的处理逻辑和分页是两个文件，所以我们要带着参数访问接口，再带着参数从接口出来。

```php
<?php 
	require '../../functions.php';

	if(empty($_GET['id'])){
		exit('出错了');
	}
	$page = $_GET['page'];
	$id = (int)$_GET['id'];
	//带着数据访问接口的话page和id是必须的。所以不加判断（其实是我懒）
	if (isset($_GET['category'])) {
		$search = $_GET['category'];
	}else{
		$search = '';
	}
	//分类就需要加判断
	xiu_creat_one('delete from posts where id in ('.$id.');');

	header("Location:/admin/posts.php?page={$page}&category={$search}");
 ?>
```

```html
 $dall.prop('search','?id='+idarr+'&page='+<?php echo $page; ?>+'<?php echo $search ?>' );

 <a href="/admin/api/posts_delete.php?id=<?php echo $value['id']; ?>&page=<?php echo $page; ?><?php echo $search ?>" class="btn btn-danger btn-xs">删除</a>
```

