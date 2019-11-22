# Node.js 中的 Webpack API

## 什么是webpack-server-complier？

这是webpack在服务端的编译器实例

#### 安装

如果想使用Node.js API，需要首先安装webpack。

```shell
npm install webpack --save-dev
```

在Node.js代码中引入webpack 模块。

```jsx
const webpack = require("webpack");
```

## webpack实例

导入的`webpack`方法可以传递[Configuration Object](https://link.jianshu.com/?t=https://webpack.js.org/configuration/)并在提供回调函数的情况下运行webapck compiler。

```tsx
const webpack = require("webpack");

webpack({
  // Configuration Object
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
  }
  // Done processing
});
```

**Compiler**实例提供以下方法
$$
.run(callback)

.watch(watchOptions, handler)
$$

## 打包监听

#### Watching

调用`watch`方法，触发webpack runner。并会监控文件的改变(类似CLI: `webpack --watch`).
在webpack监控到改变之后，会重新运行。
该函数会返回一个`Watching`对象。

```tsx
//函数声明
//watch(watchOptions,callback)

const webpack = require("webpack");

const compiler = webpack({
  // Configuration Object
});

const watching = compiler.watch({
  /* watchOptions */
}, (err, stats) => {
  // Print watch/build result here...
  console.log(stats);
});
```

#### Close Watching

`watch`方法返回的`Watching`对象提供了`.close(callback)`方法。
调用该方法会终止对文件的监控

```jsx
watching.close(() => {
  console.log("Watching Ended.");
});
```

> 已关闭的或被设位invalidated的watcher不容许再次被运行

## Stats Object

`stats`对象是webpack回调函数的第二个参数。
主要用来显示代码编译过程中的相关信息，主要包括

- Errors and Warnings(if any)
- Timings
- Module and Chunk Information
- etc.
  [webpack CLI](https://link.jianshu.com/?t=https://webpack.js.org/api/cli)使用这些信息，
  将格式化后的日志打印到console中。
  该对象对外提供下面这些方法。

#### stats.hasErrors

用来检测编译期是否有error产生，返回`true`或`false`.

#### stats.hasWarnings

用来检测编译期是否有warning产生，返回`true`或`false`.

#### stats.toJson

将编译信息作为JSON object返回。`options`可以是string或object。
使用object可以进行细粒度的配置。

```cpp
complier.watch({},(err,stats)=>{
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err=>{
        console.log(err)
    })
    stats.hasWarnings.forEach(warn=>{
        console.warn(err)
    })
})
```

## 编译错误处理

为了比较好的处理error，一般需要统计三种类型的error。

> - 严重的webpack错误(错误的webpack配置 .etc)
> - 编译错误(缺modules，语法错误 .etc)
> - 编译警告

示例:

```tsx
const webpack = require("webpack");

webpack({
  // Configuration Object
}, (err, stats) => {
  //处理webpack本身的error
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();
  //处理代码编译中产生的error
  if (stats.hasErrors()) {
    console.error(info.errors);
  }
  //处理代码编译中产生的warning
  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }

  // Log result...
});
```

## 指定输出位置

webpack将输出文件写到指定的磁盘文件中，如果希望改变输出文件的位置，
比如输出到内存，webDAV等，可以通过对Compiler的`outputFileSystem`配置进行设置。

```jsx
const MemoryFS = require("memory-fs");
const webpack = require("webpack");

const fs = new MemoryFS();
const compiler = webpack({ /* options*/ });

compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
  // Read the output later:
  const content = fs.readFileSync("...");
});
```

> 输出的文件系统需要兼容Node fs模块接口

## 实际项目例子

```js
const Router = require("koa-router")
const axios = require("axios")
const MemoryFs = require("memory-fs")
//和原生的fs文件系统不同的是，这个将文件储存到内存之中。
const webpack = require("webpack")
const VueServerRenderer = requrie("vue-server-renderer")
const serverConfig = require("./../../webpack.config.server")
const serverComplier = webpack(serverConfig) 
const mfs = new MemoryFs()
serverComplier.outputFileSystem = mfs
//改变服务端webpack的打包存储方式。
```

