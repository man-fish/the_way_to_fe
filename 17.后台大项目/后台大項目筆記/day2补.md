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

```javascript
  <script>
    // 1. 不要重复使用无意义的选择操作，应该采用变量去本地化
    $(function ($) {
      // 在表格中的任意一个 checkbox 选中状态变化时
      var $tbodyCheckboxs = $('tbody input')
      var $btnDelete = $('#btn_delete')

      // 定义一个数组记录被选中的
      var allCheckeds = []
      $tbodyCheckboxs.on('change', function () {
        // this.dataset['id']
        // console.log($(this).attr('data-id'))
        // console.log($(this).data('id'))
        var id = $(this).data('id')

        // 根据有没有选中当前这个 checkbox 决定是添加还是移除
        if ($(this).prop('checked')) {
          allCheckeds.push(id)
        } else {
          allCheckeds.splice(allCheckeds.indexOf(id), 1)
        }

        // 根据剩下多少选中的 checkbox 决定是否显示删除
        allCheckeds.length ? $btnDelete.fadeIn() : $btnDelete.fadeOut()
          //数组没长度不是等于0.！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        $btnDelete.prop('search', '?id=' + allCheckeds)
        ！！！！！！！！！！！！！！！！！！//tostring转换数组。！！！！！！！！！！！！！！
          //dom中的search属性可以修改传递参数。！！！！！！！！！！！！！！！！！！！！！！！
      })
  </script>
```
全选的逻辑

```javascript
          $('#catch_all').on('click',function(){
              if($(this).prop('checked')){

                $tbodycheck.each(function(i,item){
                  $(item).prop('checked',true);
                  var id = $(item).data('id');
                  allcheckeds.push(id);
				//将全部的id加入数组
                })
              }else{

                allcheckeds.length=0;
                $tbodycheck.each(function(i,item){
                  $(item).prop('checked',false);
                })
				//将数组里的id全都拿出去。
              }
              
              $btnDelete.prop('search','?id='+allcheckeds);
              console.log($btnDelete.prop('search'));
          })
```

![toString](F:\bootstrap\后台大項目筆記\toString.png)

> 使用一个数组，里面存id，便于删除和全选。

```javascript
 <script>	
     ## version 1 =================================
     $tbodyCheckboxs.on('change', function () {
        //有任意一个 checkbox 选中就显示，反之隐藏
       var flag = false
       $tbodyCheckboxs.each(function (i, item) {
        //attr 和 prop 区别：
        //- attr 访问的是 元素属性
        //- prop 访问的是 元素对应的DOM对象的属性
        console.log($(item).prop('checked'))
         if ($(item).prop('checked')) {
           flag = true
         }
       })
	   //遍历只要有一个被选中，按钮就显示。
       flag ? $btnDelete.fadeIn() : $btnDelete.fadeOut()
     })
    })
 </script>
```
> 这种方法遍历的时候要进行多次选择，不好，效率不高。

```php+HTML
        <?php foreach ($categories as $item): ?>
           <tr>
              <td class="text-center"><input type="checkbox" data-id="<?php echo $item['id']; ?>"></td>
              <td><?php echo $item['name']; ?></td>
              <td><?php echo $item['slug']; ?></td>
              <td class="text-center">
                <a href="javascript:;" class="btn btn-info btn-xs">编辑</a>
                <a href="/admin/api/categories_delete.php?id=<?php echo $item['id']; ?>" class="btn btn-danger btn-xs">删除</a>
              </td>
           </tr>
        <?php endforeach ?>
```

> 进阶删除处理可以处理多条删除

```php
<?php 
		require '../../functions.php';

		if (empty($_GET['id'])) {
  				exit('缺少必要参数');
		}

		$id = $_GET['id'];
			//防止id
		$rows = xiu_creat_one('delete from categories where id in ('.$id.');');

		header('Location: /admin/categories.php');
 ?>
```

