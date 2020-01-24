## 后台大项目-Day2

1.登陆逻辑处理

```php
<?php 
  function validate(){
    if(empty($_POST['email'])){
      $GLOBALS['message']='请填写邮箱。';
      return;
    }

    if(empty($_POST['password'])){
      $GLOBALS['message']='请填写密码。';
      return;

      $email = $_POST['email'];

      $password = $_POST['password'];

      require '../config.php';

      $connection = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);

      if(!$connection){
        exit('<h1>连接数据库失败</h1>');
      }
		//exit的含义是退出当前程序，输出其中内容。
      $query = mysqli_query($email,"select * from users where email = '{$email}' limit 1;");

      if(!$query){
        $GLOBALS['message']='登陆失败请重试';
        return;
      }

      $user = mysqli_fetch_assoc($query);

      if(!$user){
        $GLOBALS['message'] = '用户名输入错误。';
        return;
      }

      if($user['password']! = md5($password)){
        $GLOBALS['message'] = '密码输入错误。';
        return;
      }

      $_SESSION['current_login_user'] = $user;
	
        //储存session用于调用信息和登陆状态判断。
        
      header('Loaction: /admin/');
        //登陆成功跳转到默认页。
    }

  }
  if($_SERVER['REQUEST_METHOD']==='POST'){
    validate();
  }
 ?>
```

2.输入获取头像逻辑

```javascript
  <script src="/assets/vendors/jquery/jquery.min.js">
      $(function($){
            var email_exp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
			
            $('#email').on('blur',function(){

                var email_value = $(this).val();

                if(!email_value || !email_exp.test(email_value))return;
				//使用正则判断是否邮箱输入完成要不要发送请求。
                $.get('/admin/api/avatar.php',{ email : email_value },function(res){
		
                  if(!res)return;

                  $('.avatar').fadeOut(function(){

                      $(this).on('load',function(){$(this).fadeIn()}).attr('src',res);
                      
                  })
                })
            })
      })
  </script>

```
```php
<?php 
	// 动态获取登陆头像
	// 
	if(empty($_GET['email'])){
		exit('缺少重要参数！');
	}
	$email = $_GET['email'];

	require '../../config.php';

	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);

	if(!$connection){
		exit('连接数据库失败！');
	}
	$query = mysqli_query($connection,"select avatar from users where email = '{$email}' limit 1");

	if(!$query){
		exit('查询失败');
	}

	$user[] = mysqli_fetch_assoc($query);
		//查询出来的是一条一条关联数组，也就是说是一个二维数组。
	echo $user[0]['avatar'];
		//返回的是头像的地址。
```

3.session获取函数封装

```php
<?php 
	require_once 'config.php'

	session_start();

	function xiu_get_current_user(){
			//php有1000多种内置函数，起名需谨慎。
		if(empty($_SESSION['current_login_user'])){
			header('Location: /admin/login.php');
			exit();
            如果没有session那就直接退出到登陆界面并且关闭程序。
		}
		return $_SESSION['current_login_user'];
	}
	//获取当前用户登录信息。
	//// 定义函数时一定要注意：函数名与内置函数冲突问题
	// JS 判断方式：typeof fn === 'function'
	// PHP 判断函数是否定义的方式： function_exists('get_current_user')

	/**
	 * 获取当前登录用户信息，如果没有获取到则自动跳转到登录页面
 	 * @return [type] [description]
 	 */
```
4.动态获取用户信息

```php+HTML
  <?php
   require_once dirname(__FILE__)."/../../functions.php"; 
   //因为载入之后文件的路径是当前也就是index或者同级的路径，所以这里最好写物理路径（从头到尾的路径）
   $current_user = xiu_get_current_user();
  ?>
  <div class="aside">
    <div class="profile">
      <img class="avatar" src="<?php echo $current_user['avatar']; ?>">
      <h3 class="name"><?php echo $current_user['nickname']; ?></h3>
    </div>
      
 -----------------------------------以下是index文件的内容----------------------------------------
  <?php 
    require_once '../functions.php';
    // 判断用户是否登录一定是最先去做
    xiu_get_current_user();
  ?>
```

5.数据库操作

```php
 	function xiu_fetch_all($sQl){
 			$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);

 			if(!$connection){
 				exit('数据库连接失败！');
 			}

 			$query = mysqli_query($connection, $sQl);

 			if(!$query){
 				return false;
 			}

 			while($row = mysqli_fetch_assoc($query)){
 				$result[] =$row;
 			}

 			mysqli_free_result($query);
 			mysqli_close($connection);

 			return $result;
 	}

 	//查询全部数据。
 	//返回一个索引二维数组。
 	
 	function xiu_fetch_one($sQl){
 			$res_one = xiu_fetch_all($sQl);
 			return isset($res_one[0])? $res_one[0]:null;
 	}

 	//查询的只有一条数据时。
 	//返回一个关联数组。
 	
 	function xiu_creat_one($sQl){
 			$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);
 			
 			if(!$connection){
 				exit('数据库连接失败！');
 			}

 			$query = mysqli_query($connection, $sQl);

 			if(!$query){
 				return false;
 			}

 			$affected_rows = mysqli_affected_rows($connection);

 			mysqli_close($connection);

 			return $affected_rows;
 	}
	//返回影响行数可以用来判断是否生效。
```

6.数据的获取和呈现(简单)

```php+HTML
<?php 
    require_once '../functions.php';
    // 判断用户是否登录一定是最先去做
    xiu_get_current_user();
    
    $posts_count = xiu_fetch_one('select count(1) as num from posts;')['num'];

    $categories_count = xiu_fetch_one('select count(1) as num from categories;')['num'];

    $comments_count = xiu_fetch_one('select count(1) as num from comments;')['num'];

    $posts_unfinished_count = xiu_fetch_one('select count(status) as num from posts where status = "drafted"')['num'];

    $comments_unfinished_count = xiu_fetch_one('select count(status) as num from comments where status = "held"')['num'];
 ?>

	       <ul class="list-group">
              <li class="list-group-item"><strong><?php echo $posts_count; ?></strong>篇文章（<strong><?php echo $posts_unfinished_count ?></strong>篇草稿）</li>
              <li class="list-group-item"><strong><?php echo $categories_count; ?></strong>个分类</li>
              <li class="list-group-item"><strong><?php echo $comments_count; ?></strong>条评论（<strong><?php echo $comments_unfinished_count ?></strong>条待审核）</li>
            </ul>
	就是一个count的用法。
```

2.删除数据和数据的展示

```php
<?php 
      require '../functions.php';

      xiu_get_current_user();

      function add_categories(){
          if(empty($_POST['name'])||empty($_POST['slug'])){
              $GLOBALS['message'] = '请完整填写表单';
              $GLOBALS['success'] = false;
              return;
          }
          $name = $_POST['name'];
          $slug = $_POST['slug'];

          $rows = xiu_creat_one("insert into categories values(null,'{$slug}','{$name}')");

          $GLOBALS['success'] = $rows > 0;
          $GLOBALS['message'] = $rows <= 0? '添加失败！':'添加成功！';
      }

      if($_SERVER['REQUEST_METHOD']==='POST'){
            add_categories();
      }

      $categories = xiu_fetch_all('select * from categories');

		获取全部评论数据。
 ?>
```

```php+html
        <?php foreach ($categories as $item): ?>
           <tr>
              <td class="text-center"><input type="checkbox"></td>
              <td><?php echo $item['name']; ?></td>
              <td><?php echo $item['slug']; ?></td>
              <td class="text-center">
                <a href="javascript:;" class="btn btn-info btn-xs">编辑</a>
                <a href="/admin/api/categories_delete.php?id=<?php echo $item['id']; ?>" 					class="btn btn-danger btn-xs">删除</a>
              </td>
           </tr>
        <?php endforeach ?>
	//包含一个基础的展示，但是把id存在了href里面，这里便于删除和编辑操作，别忘了href也可以发送请求。
      <?php if (isset($message)): ?>
        <?php if ($success): ?>
          <div class="alert alert-success">
            <strong>成功！</strong> <?php echo $message; ?>
          </div
        <?php else: ?>
           <div class="alert alert-danger">
             <strong>错误！</strong> <?php echo $message; ?>
           </div>     
        <?php endif ?>
      <?php endif ?>
	//错误信息的展示，是一种判断，方法不限。
```
```php
<?php 
		require '../../functions.php';

		if (empty($_GET['id'])) {
  				exit('缺少必要参数');
		}

		$id = (int)$_GET['id'];
			//防止用户传入一个判断使id没有意义，导致delete无范围全部删除。
		$rows = xiu_creat_one('delete from categories where id='.$id);

		header('Location: /admin/categories.php');
 ?>
```

