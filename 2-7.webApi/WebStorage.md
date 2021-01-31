# Web Storage API

-----

`Web Storage API` 提供了存储机制，通过该机制，浏览器可以安全地存储键值对，比使用 `cookie` 更加直观。`Web Storage` 包含如下两种机制：

+ `sessionStorage` 为每一个给定的源（`given origin`）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。
+ `localStorage` 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。

这两种机制是通过 `Window.sessionStorage` 和 `Window.localStorage` 属性使用（更确切的说，在支持的浏览器中 `Window` 对象实现了 `WindowLocalStorage` 和 `WindowSessionStorage` 对象并挂在其 `localStorage` 和 `sessionStorage` 属性下）—— 调用其中任一对象会创建 `Storage` 对象，通过 `Storage` 对象，可以设置、获取和移除数据项。对于每个源（`origin`）`sessionStorage` 和 `localStorage` 使用不同的 `Storage` 对象——独立运行和控制。

#### localStorage

下面的代码片段访问了当前域名下的本地 `Storage` 对象，并通过 `Storage.setItem()` 增加了一个数据项目。

```js
localStorage.setItem('myCat', 'Tom');
```

该语法用于读取 `localStorage` 项，如下:

```js
let cat = localStorage.getItem('myCat');
```

该语法用于移除 `localStorage` 项，如下:

```js
localStorage.removeItem('myCat');
```

该语法用于移除所有的 `localStorage` 项，如下:

```js
// 移除所有
localStorage.clear();
```

#### sessionStorage

`sessionStorage` 属性允许你访问一个，对应当前源的 [`local storage`] 相似，不同之处在于 `localStorage` 里面存储的数据没有过期时间设置，而存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。

+ 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
+ **在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，**这点和 session cookies 的运行方式不同。
+ 打开多个相同的URL的Tabs页面，会创建各自的`sessionStorage`。
+ 关闭对应浏览器窗口（Window）/ tab，会清除对应的`sessionStorage`。 

```js
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();
```

#### 通过 StorageEvent 响应存储的变化

无论何时，`Storage` 对象发生变化时（即创建/更新/删除数据项时，重复设置相同的键值不会触发该事件，`Storage.clear()` 方法至多触发一次该事件），`StorageEvent` 事件会触发。在同一个页面内发生的改变不会起作用——在相同域名下的其他页面（如一个新标签或 `iframe`）发生的改变才会起作用。在其他域名下的页面不能访问相同的 `Storage` 对象。

在事件结果页面中的 `JavaScript` 如下所示：

```js
window.addEventListener('storage', function(e) {
  document.querySelector('.my-key').value = e.key;
  document.querySelector('.my-old').value = e.oldValue;
  document.querySelector('.my-new').value = e.newValue;
  document.querySelector('.my-url').value = e.url;
  document.querySelector('.my-storage').value = e.storageArea;
});
```

这里，我们为 `window` 对象添加了一个事件监听器，在当前域名相关的 `Storage` 对象发生改变时该事件监听器会触发。正如你在上面看到的，此事件相关的事件对象有多个属性包含了有用的信息——改变的数据项的键，改变前的旧值，改变后的新值，改变的存储对象所在的文档的 `URL`，以及存储对象本身。