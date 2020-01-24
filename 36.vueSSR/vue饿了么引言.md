# vue引言

#### 为什么使用vue

> 数据驱动，组件化开发大幅提高开发效率。

#### 为什么vue会火起来

> 因为低端浏览器逐渐被淘汰，而vue的核心代码defineProperty逐渐支持（ES5）,且前端项目越来越庞大复杂，所以vue就火了。

#### 什么是MVVM框架

![mvvm](F:\我的笔记\image\mvvm.png)

![mvvm](F:\我的笔记\image\MVVC.png)

> ViewModel会监听数据层的变化，通知页面进行局部刷新，而view层也会主动提交数据更新请求，实现双向绑定。mvvm可以减少整个页面的刷新，实现单页应用（SPA），满足移动端的需求。

#### 数据响应原理

![data](https://cn.vuejs.org/images/data.png)

vue会给他的实例使用es5的defineProperty定义一个gettrer和一个setter来实现数据响应。