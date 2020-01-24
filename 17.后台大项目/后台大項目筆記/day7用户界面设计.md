### Day7用户界面设计

简单的数据获取和呈现

```php+HTML
              <?php if (isset($users)): ?>
                
              <?php foreach ($users as  $user): ?>

              <tr class="<?php echo $user['status']=='enabled'? 'warning':'' ?>">
                <td class="text-center"><img class="avatar" src="<?php echo isset($user['avatar'])&&!empty($user['avatar'])? 
    			判断用户是否有头像
    $user['avatar']:'/static/assets/img/default.png'; ?>" ></td>
                <td><?php echo $user['email'] ?></td>
                <td><?php echo $user['slug'] ?></td>
                <td><?php echo $user['nickname'] ?></td>
                <td><?php echo $user['status'] ?></td>
                <td class="text-center">
                  <a href="?id=<?php echo $user['id']; ?>" class="btn btn-warning btn-xs">禁用</a>				禁用将参数传到本地
                  <a href="/admin/api/user_delete.php?id=<?php echo $user['id']; ?>" class="btn btn-danger btn-xs">删除</a>删除将参数传给接口。
                </td>
              </tr>

              <?php endforeach ?>
                      
              <?php endif ?>
```

禁用的逻辑

> 准备了两张表，一张存放禁用的，一张存放没禁用的，完美解决这个问题。

```php
      function enable(){
          if(empty($_GET['id'])){
            exit('缺少重要参数;');
          }
          $id = $_GET['id'];
          $data = xiu_fetch_one("select * from users where id = {$id} limit 1");
          $rowmain = xiu_creat_one("insert into enable_users values({$data['id']},'{$data['slug']}','{$data['email']}','{$data['password']}','{$data['nickname']}',null,null,'enabled')");
          $rows = xiu_creat_one("delete from users where id = {$id}");

          $GLOBALS['success'] = $rowmain > 0 ;
          $GLOBALS['message'] = $rowmain > 0 ?'禁用成功':'禁用失败';
      }

      if($_SERVER['REQUEST_METHOD']=='POST'){
          validate();
      }
      if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['id'])){
          enable();
      }

      $users = xiu_fetch_all('SELECT * FROM users UNION ALL SELECT * FROM enable_users');
		//配合查询，查询两张表的数据（联合查询增加列数，可能会减少行数）这个只是增加行数。
```

删除的逻辑

> 两张都删，不会报错

```php
<?php 
	require_once '../../functions.php';

	// if(empty($_GET['id'])){
	// 	exit('缺少重要参数。');
	// }
	$id = $_GET['id'];

	xiu_creat_one('delete from users where id in ('.$id.');');

	xiu_creat_one('delete from enable_users where id in ('.$id.');');	

	header('Location: /admin/users.php');
 ?>
```

用户创建没有什么好说的，就是一个表单提交和验证。