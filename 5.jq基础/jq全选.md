### Day4补充

全选逻辑

```javascript
       $(function($){
            $dall = $('#posts_all_delete');
            $checkbox = $('tbody input');
            $call = $('#catch_all');
            var idarr = [];
            //针对于全选按钮的逻辑 全选按钮改变其他按钮的值不能触发chang事件
            $call.on('click',function(){
              if($(this).prop('checked')){
                $dall.fadeIn();
                $checkbox.each(function(i,item){
                  $(item).prop('checked',true);
                  var id = $(item).data('id');
                  idarr.push(id);

                })
              }else{
                 $dall.fadeOut();
                idarr.length=0;
                $checkbox.each(function(i,item){
                  $(item).prop('checked',false);
                })

              }

              $dall.prop('search','?id='+idarr);
              console.log($dall.prop('search'));
            })
		//针对于每一个按钮的逻辑
            $checkbox.on('change',function(){
                var data = $(this).data('id');
                if($(this).prop('checked')){
                  idarr.push(data);
                }else{
                  idarr.splice(idarr.indexOf(data),1)
                }

              idarr.length? $dall.fadeIn() : $dall.fadeOut();
              $dall.prop('search','?id='+idarr+'&page='+<?php echo $page; ?>+'<?php echo $search ?>' );
              console.log($dall.prop('search'));
            })
       })
```

