# Go项目结构

![goSql](F:\我的笔记\49.go语言基础\assets\goSql.png)

在进行Go语言开发的时候，我们的代码总是会保存在`$GOPATH/src`目录下。在工程经过`go build`、`go install`或`go get`等指令后，会将下载的第三方包源代码文件放在`$GOPATH/src`目录下， 产生的二进制可执行文件放在 `$GOPATH/bin`目录下，生成的中间缓存文件会被保存在 `$GOPATH/pkg` 下。

如果我们使用版本管理工具（Version Control System，VCS。如Git）来管理我们的项目代码时，我们只需要添加`$GOPATH/src`目录的源代码即可。`bin` 和 `pkg` 目录的内容无需版本控制。

> [不过值得注意的是：]()
>
> 如果使用`go build`需要使用`-o`参数指定生成的编译后的文件的路径，`go install`可以直接是默认将编译后的文件生成在bin中。

### 适合个人开发者

我们知道源代码都是存放在`GOPATH`的`src`目录下，那我们可以按照下图来组织我们的代码。

![1550805203054](F:\我的笔记\49.go语言基础\assets\1550805203054.png)

### 目前流行的项目结构

Go语言中也是通过包来组织代码文件，我们可以引用别人的包也可以发布自己的包，但是为了防止不同包的项目名冲突，我们通常使用`顶级域名`来作为包名的前缀，这样就不担心项目名冲突的问题了。

因为不是每个个人开发者都拥有自己的顶级域名，所以目前流行的方式是使用个人的github用户名来区分不同的包。

![1550805044488](F:\我的笔记\49.go语言基础\assets\1550805044488.png)

举个例子：张三和李四都有一个名叫`studygo`的项目，那么这两个包的路径就会是：

```go
import "github.com/zhangsan/studygo"
```

和

```go
import "github.com/lisi/studygo"
```

以后我们从github上下载别人包的时候，如：

```bash
go get github.com/jmoiron/sqlx
```

那么，这个包会下载到我们本地`GOPATH`目录下的`src/github.com/jmoiron/sqlx`。

### 适合企业开发者

![1550806101915](F:\我的笔记\49.go语言基础\assets\1550806101915.png)