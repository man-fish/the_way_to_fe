## day3

1.登陆退出

```php
  if($_SERVER['REQUEST_METHOD']==='GET' && isset($_GET['action']) && $_GET['action']==='logeout'){
    unset($_SESSION['current_login_user']);
  }

========================================++========================================
    
 <li><a href="/admin/login.php?action=logeout">退出</a></li>
```

> a标签也可以传递参数发送get请求
>
> 同一个页面有很多很多请求处理时，要通过参数和请求方式添加合理的判断。

2.编辑数据

> 步骤一：根据编辑按钮上的元素id获取元素数据并且保存在当次请求。

```php
  function edit_categories(){
      if(empty($_GET['id'])){
        $GLOBALS['message'] = '出错啦';
        return;
      }
      $id = $_GET['id'];
      return xiu_fetch_one("select * from categories where id = '{$id}' limit 1");
  }
      if($_SERVER['REQUEST_METHOD']==='GET' && isset($_GET['id'])){
            $editcate = edit_categories();
      }
```
> 步骤二：根据判断显示编辑区域

```php
  <?php if (isset($editcate)): ?>
    
  <div class="row">
        <div class="col-md-4">
          <form action="<?php $_SERVER['PHP_SELF']; ?>?id=<?php echo $editcate['id']; ?>" method="post" name="form2">
            <h2>修改内容</h2>
            <div class="form-group" >
              <label for="editname">分类名称</label>
              <input id="editname" class="form-control" name="editname" type="text" placeholder="<?php echo $editcate['name'] ?>">
            </div>
            <div class="form-group">
              <label for="editslug">slug</label>
              <input id="editslug" class="form-control" name="editslug" type="text" placeholder="<?php echo $editcate['slug'] ?>">
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-primary" value="修改">
            </div>
          </form>
  </div>

  <?php endif ?>
```

> 这一步主要的问题就是如果编辑区域是一个表单那通过表单域提交数据的话，id不知道应该写在哪里，只有拿到元素的id才能通过数据库进行编辑操作。
>
> 解决方案：使用混合提交的方式，用post的方式提交要修改的数据，但是同时在action中使用get的方式传递id参数。这样的提交方式还是post，但是判断id时使用$_GET['id']来获取和检验id。

> 这样写的接收逻辑判断

```php
      if (empty($_GET['id'])) {
          if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            add_categories();
          }

      } else {
          if ($_SERVER['REQUEST_METHOD'] === 'POST') {
           xiu_edit_categories();
         }
      }
```

> 步骤三：简单的数据库的操作。

```php
        function xiu_edit_categories(){
            if(empty($_POST['editname'])||empty($_POST['editslug'])){
              $GLOBALS['message']='请输入要修改内容';
              return;
            }
            if(empty($_GET['id'])){
              $GLOBALS['message']='缺少重要参数';
              return;
            }

            $editname = $_POST['editname'];
            $editslug = $_POST['editslug'];
            $id = $_GET['id'];

            $row = xiu_creat_one("update categories set slug='{$editslug}',name='{$editname}' where id ={$id}");

            $GLOBALS['success'] = $row > 0;
            $GLOBALS['message'] = $row <= 0 ? '更新失败！' : '更新成功！';
            //逻辑判断$row < 0 的意思就是返回一个真假值方便后面的判断。
      }
```

这样会留下一个问题，点击编辑之后直接点击创建操作，创建的表单中的PHP_SELF会发生传递错误，会传递一个id参数，我也不知道为啥。

![img](file:///F:/bootstrap/%E5%90%8E%E5%8F%B0%E5%A4%A7%E9%A0%85%E7%9B%AE%E7%AD%86%E8%A8%98/%E8%AF%A1%E5%BC%82%E7%9A%84%E9%97%AE%E9%A2%98.png?lastModify=1551275404)

我把php_self改成了当前的地址，治标不治本。。。。