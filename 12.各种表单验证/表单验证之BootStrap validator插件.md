### 表单验证之BootStrap validator插件

##### 0-1：使用基础：

```html
　　 <script src="~/Scripts/jquery-1.10.2.js"></script>

    <script src="~/Content/bootstrap/js/bootstrap.min.js"></script>
    <link href="~/Content/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

    <script src="~/Content/bootstrapValidator/js/bootstrapValidator.min.js"></script>
    <link href="~/Content/bootstrapValidator/css/bootstrapValidator.min.css" rel="stylesheet" />
```

> !language里面要有中文的汉化包。

```html
　　　　　<form>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" name="username" />
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="text" class="form-control" name="email" />
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
```

> 表单部分的代码，这个插件的验证是根据表单元素的name。

```javascript
    $(function () {
        $('form').bootstrapValidator({
　　　　　　　　message: 'This value is not valid',
            　feedbackIcons: {
                　　　　　　　　valid: 'glyphicon glyphicon-ok',
                　　　　　　　　invalid: 'glyphicon glyphicon-remove',
                　　　　　　　　validating: 'glyphicon glyphicon-refresh'
            　　　　　　　　   },
            fields: {
                username: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: '邮箱地址不能为空'
                        }
                    }
                }
            }
        });
    });
```

##### 0-2用法进阶

> 由上面的代码可以看出在validators属性对应一个Json对象，里面可以包含多个验证的类型：
>
> notEmpty：非空验证；
>
> stringLength：字符串长度验证；
>
> regexp：正则表达式验证；
>
> emailAddress：邮箱地址验证（都不用我们去写邮箱的正则了~~）
>
> 除此之外，在文档里面我们看到它总共有46个验证类型，我们抽几个常见的出来看看：
>
> [base64](http://bv.doc.javake.cn/bootstrap-validator/validators/base64/)：64位编码验证；
>
> [between](http://bv.doc.javake.cn/bootstrap-validator/validators/between/)：验证输入值必须在某一个范围值以内，比如大于10小于100；
>
> [creditCard](http://bv.doc.javake.cn/bootstrap-validator/validators/creditCard/)：身份证验证；
>
> [date](http://bv.doc.javake.cn/bootstrap-validator/validators/date/)：日期验证；
>
> [ip](http://bv.doc.javake.cn/bootstrap-validator/validators/ip/)：IP地址验证；
>
> [numeric](http://bv.doc.javake.cn/bootstrap-validator/validators/numeric/)：数值验证；
>
> [phone](http://bv.doc.javake.cn/bootstrap-validator/validators/phone/)：电话号码验证；//不支持CN的手机号码验证。
>
> [uri](http://bv.doc.javake.cn/bootstrap-validator/validators/uri/)：url验证；
>
> identical：确认密码；
>
> different：不相同字段

```javascript
//案例1函数部分
$(function(){
            $('form').bootstrapValidator({
                message:'this value is not valid',
                feedbackIcons:{
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields:{
                    iname:{
                        message:'昵称校验失败！',
                        validators:{
                            notEmpty:{
                                message:'昵称不能为空'
                            },
                            stringLength:{
                                min:6,
                                max:18,
                                message:'尺寸不对哦'
                            },
                            regexp:{
                                regexp:/^[a-zA-Z0-9]+$/,
                                message:'用户名只能包含英文和数字'
                            }
                        }
                    },
                    username:{
                        message:'用户名校验失败',
                        validators:{
                            notEmpty:{
                                message:'用户名不能为空'
                            },
                            regexp:{
                                regexp:/^[a-zA-Z0-9]+$/,
                                message:'用户名只能包含英文和数字'
                            },
                            stringLength:{
                                min:6,
                                max:18,
                                message:'尺寸不对哦'
                            }
                        }
                    },
                    password:{
                        message:'密码校验错误',
                        validators:{
                            notEmpty:{
                                message:'密码不能为空'
                            },
                            regexp:{
                                regexp:/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/,
                                message:'密码必须是由数字字母和符号混合而成'
                            },
                            stringLength:{
                                min:8,
                                message:'密码长度应大于8位'
                            }
                        }
                    },
                    psd:{
                        validators:{
                            notEmpty:{
                                message:'确认密码不能为空'
                            },
                            identical:{
                                field:'password',
                                message:'确认密码必须和密码一致'
                            }
                        }
                    },
                    email:{
                        validator:{
                            notEmpty:{
                                message:'邮箱不能为空'
                            },
                            emailAddress:{
                                message:'邮箱格式不正确'
                            }
                        }
                    },
                    telephone:{
                        validators:{
                            phone:{
                                message:'电话号的格式不正确'
                            },
                            notEmpty:{
                                message:'电话号不能为空'
                            }
                        }
                    }
                }
            })
        })
```

```html
//页面部分
<body style="height:1000px">
    <div class="container">
        <div class="panel panel-success">
            <div class="panel-heading">
                <p class="panel-title">
                    表单校验插件
                </p>
            </div>
            <div class="panel-body">
                <form action="">
                    <div class="form-group">
                        <label for="iname">昵称</label>
                        <input type="text" name="iname" id="iname" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="username">username</label>
                        <input type="text" name="username" id="username" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">password</label>
                        <input type="password" name="password" id="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="psd">password</label>
                        <input type="password" name="psd" id="psd" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="telephone">手机号</label>
                        <input type="text" name="telephone" id="telephone" pattern="\d{13}" class="form-control">
                    </div>
                    <button class="btn btn-info btn-block" type="submit">validate</button>
                </form>
            </div>
        </div>
    </div>
</body>
```

> bootstrapvalidate默认是对表单提交的方式校验，如果规则不满足的话按钮就会被禁用，但是前提是按钮必须有type=submit属性，所以在ajax提交的时候就会由错误，所以我们就需要额外的api来解决这些问题。

##### 0-3拓展api

https://blog.csdn.net/nazhidao/article/details/51542508

1.最重要的就是bootstrapValidator对象。

> 一般使用校验是直接调用$(form).bootstrapValidator(options)来初始化validator。初始化后有两种方式获取validator对象或实例，可以用来调用其对象的方法，比如调用resetForm来重置表单。有两种方式获取：

```javascript
// Get plugin instance
var bootstrapValidator = $(form).data('bootstrapValidator');
// and then call method
bootstrapValidator.methodName(parameters);

//例子：重置表单。
$('#resetBtn').click(function() {
    $('#defaultForm').data('bootstrapValidator').resetForm(true);
});
```

2.AJax提交方式：

https://www.cnblogs.com/woodk/p/5546847.html

当解决了这些问题的时候，我们就要面对如何解决按钮禁用的问题，请看下面的代码。

```javascript
$("#yourform").submit(function(ev){ev.preventDefault();});
$("#submit").on("click", function(){

   var bootstrapValidator = $("#yourform").data('bootstrapValidator');
   bootstrapValidator.validate();
   if(bootstrapValidator.isValid())
     $("#yourform").submit();
   else return;

});
```

3.resetForm

```javascript
$("#isAllValid").on("click", function(){
	alert($("#defaultForm").data('bootstrapValidator').isValid());
	if(!$("#defaultForm").data('bootstrapValidator').isValid()) {
		$("#defaultForm").data('bootstrapValidator').resetForm();
	}
```

> 重置表单中设置过校验的内容，将隐藏所有错误提示和图标。

4.validate

> 手动对表单进行校验，validate方法可用在需要点击按钮或者链接而非提交对表单进行校验的时候。

由第一条可知，调用方式同样有两种：

```javascript
手动校验方法一：
$(form).bootstrapValidator(options);
//要先校验一遍。
$(form).data('bootstrapValidator').validate();
方法二：
$('#defaultForm').bootstrapValidator('validate');
```

5.isvalid

> 检测是否校验成功

```javascript
$("#defaultForm").data('bootstrapValidator').isValid()；
```

6.下面的remote是用来校验名称是否重复，开学问乾哥。

​    submithandler是表单验证之后触发事件。

```javascript
$('form').bootstrapValidator({
      // 默认的提示消息
      message: 'This value is not valid',
      // 表单框里右侧的icon
      feedbackIcons: {
        　　　　　　　　valid: 'glyphicon glyphicon-ok',
        　　　　　　　　invalid: 'glyphicon glyphicon-remove',
        　　　　　　　　validating: 'glyphicon glyphicon-refresh'
      },
      submitHandler: function (validator, form, submitButton) {
        // 表单提交成功时会调用此方法
        // validator: 表单验证实例对象
        // form  jq对象  指定表单对象
        // submitButton  jq对象  指定提交按钮的对象
      },
      fields: {
        username: {
          message: '用户名验证失败',
          validators: {
            notEmpty: {
              message: '用户名不能为空'
            },
            stringLength: {  //长度限制
              min: 6,
              max: 18,
              message: '用户名长度必须在6到18位之间'
            },
            regexp: { //正则表达式
              regexp: /^[a-zA-Z0-9_]+$/,
              message: '用户名只能包含大写、小写、数字和下划线'
            },
            different: {  //比较
              field: 'username', //需要进行比较的input name值
              message: '密码不能与用户名相同'
            },
            identical: {  //比较是否相同
              field: 'password',  //需要进行比较的input name值
              message: '两次密码不一致'
            },
            remote: { // ajax校验，获得一个json数据（{'valid': true or false}）
              url: 'user.php',       //验证地址
              message: '用户已存在',   //提示信息
              type: 'POST',          //请求方式
              data: function(validator){  //自定义提交数据，默认为当前input name值
                return {
                  act: 'is_registered',
                  username: $("input[name='username']").val()
                };
              }
            }
          }
        },
        email: {
          validators: {
            notEmpty: {
              message: '邮箱地址不能为空'
            },
            emailAddress: {
              message: '邮箱地址格式有误'
            }
          }
        }
      }
    });
```

