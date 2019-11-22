## 后台大项目

1.项目开发流程

> 正常情况下，我们大概会有如下几个阶段：

1. **需求分析**：分析我们这个应用程序到底要去做哪些功能，应对哪些业务。

   > 老板一句话

2. **原型设计**：根据需求分析的结果规划应用程序的原型，可以理解为“打草稿”（花不了太多的时间，收效是很大的）。

   > 就是功能拓展文稿

3. **UI 设计**：将“草稿”转换为设计稿，并提供相应的产物（设计稿、静态页面）。scratch页面设计位图软件

   > 静态页面就已经切好了

4. **技术选型**：根据业务场景分别选择对应的技术栈（数据库技术栈、后端技术栈、前端技术栈），一般考虑的因素：人、业务。

   > 技术的选取要综合公司员工能力。

5. **数据库设计**：根据需求和原型分析我们有哪些类型的数据需要存，从而得到我们数据库的基本结构。

6. **项目架构设计**：俗称搭架构，其中具体的操作主要就是制定项目规范约束、创建基本的项目结构、编写基础的公共模块代码和组织代码。

   > 项目结构，目录，代码约束

7. **业务迭代开发**：开发者的日常，基于项目架构（条条框框）下完成各项业务功能。

   > 逻辑和功能的拓展开发

8. **集中测试**：将所有功能模块整合到一起过后，集中测试业务功能是否有 BUG，是否满足需求。

9. **部署上线**：从开发环境向生产环境转换，就是把应用部署到服务器上。

   ```
   补充一个项目的概念：
   	btb商户对商户批发
   	btc商户对客户京东
   	ctc客户对客户淘宝
   	oto线上对线下 滴滴
   	ptp？
   ```

2.项目基础结构

```
└── baixiu ······································ 项目文件夹（网站根目录）
    ├── admin ··································· 后台文件夹
    │   └── index.php ··························· 后台脚本文件
    ├── static ·································· 静态文件夹
    │   ├── assets ······························ 资源文件夹
    │   └── uploads ····························· 上传文件夹
    └── index.php ······························· 前台脚本文件
    
    //使用doc命令显示目录树的操作。
		D:\www\baixiu\admin>tree
		卷 DATA 的文件夹 PATH 列表
		卷序列号为 C644-2CA3
		D:.
		└─inc
		//tree显示文件夹树
		D:\www\baixiu\admin>tree/f
		卷 DATA 的文件夹 PATH 列表
		卷序列号为 C644-2CA3
		D:.
		│  categories.php
		│  comments.php
		│  index.php
		│  login.php
		│  nav-menus.php
		│  password-reset.php
		│  post-add.php
		│  posts.php
		│  profile.php
		│  settings.php
		│  slides.php
		│  users.php
		│
		└─inc
		//显示目录树
```

3.文件批量操作

```
	传到指定文件夹。
	D:\www\baixiu\admin>ren *.html *.php
	文件批量重命名。
```

4.项目的约束

> 采用根目录形式。
>
> 但是只有http，src，link等等可以使用绝对路径，php中的require等等要使用相对路径。

5.数据库结构设计

> 把数据库信息储存在文件config.php里便于维护。

```php
<?php

/**
 * 我们项目中用到的配置信息
 */

/**
 * 数据库主机
 */
define('DB_HOST', 'localhost');
/**
 * 数据库用户名
 */
define('DB_USER', 'root');
/**
 * 数据库密码
 */
define('DB_PASS', 'root');
/**
 * 数据库名字
 */
define('DB_NAME', 'baixiu_data');
```

6.抽离导航栏之后处理问题

```php+HTML
  <?php $current_page = pathinfo($_SERVER['PHP_SELF'],PATHINFO_FILENAME) ?>
	//使用phpinfo处理当前的文件名。	
  <div class="aside">
    <div class="profile">
      <img class="avatar" src="../uploads/avatar.jpg">
      <h3 class="name">布头儿</h3>
    </div>
    <ul class="nav">
      <li <?php echo $current_page === 'index' ? ' class="active"' : '' ?>>
        <a href="/admin/index.php"><i class="fa fa-dashboard"></i>仪表盘</a>
      </li>
      <?php $menu_posts = array('posts','post-add','categories'); ?>
      <li <?php echo in_array($current_page,$menu_posts) ? ' class="active"' : '' ?>>
        <a href="#menu-posts" class="collapsed"  data-toggle="collapse">
          <i class="fa fa-thumb-tack"></i>文章<i class="fa fa-angle-right"></i>
        </a>
        <ul id="menu-posts" class="collap se<?php echo in_array($current_page, $menu_posts) ? ' in' : '' ?>">
          <li<?php echo $current_page === 'posts' ? ' class="active"' : '' ?>><a href="/admin/posts.php">所有文章</a></li>
          <li<?php echo $current_page === 'post-add' ? ' class="active"' : '' ?>><a href="/admin/post-add.php">写文章</a></li>
          <li<?php echo $current_page === 'categories' ? ' class="active"' : '' ?>><a href="/admin/categories.php">分类目录</a></li>
        </ul>
      </li>
      <li <?php echo $current_page === 'comments' ? ' class="active"' : '' ?>>
        <a href="/admin/comments.php"><i class="fa fa-comments"></i>评论</a>
      </li>
      <li <?php echo $current_page === 'users' ? ' class="active"' : '' ?>>
        <a href="/admin/users.php"><i class="fa fa-users"></i>用户</a>
      </li>
      <?php $menu_settings = array('nav-menus', 'slides', 'settings'); ?>
      <li<?php echo in_array($current_page, $menu_settings) ? ' class="active"' : '' ?>>
      <a href="#menu-settings" class="collapsed" data-toggle="collapse">
        <i class="fa fa-cogs"></i>设置<i class="fa fa-angle-right"></i>
      </a>
      <ul id="menu-settings" class="collapse<?php echo in_array($current_page, $menu_settings) ? ' in' : '' ?>">
        <li<?php echo $current_page === 'nav-menus' ? ' class="active"' : '' ?>><a href="/admin/nav-menus.php">导航菜单</a></li>
        <li<?php echo $current_page === 'slides' ? ' class="active"' : '' ?>><a href="/admin/slides.php">图片轮播</a></li>
        <li<?php echo $current_page === 'settings' ? ' class="active"' : '' ?>><a href="/admin/settings.php">网站设置</a></li>
      </ul>
    </li>
    </ul>
  </div>
```

7.登陆页面逻辑

