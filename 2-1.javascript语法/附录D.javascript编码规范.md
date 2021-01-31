## 0 目录文件命名规范

### 0.1 目录

##### [强制] `目录` 字母全部小写，不要带空格，用破折号（-）连接单词。

### 0.2 文件

##### [强制] `文件`导出内容为类时文件名采用`Pascal命名法` 首字母大写，当内容为函数或者没有暴露内容的时候采用`Camel命名法`。

### 0.3 目录划分

在`${root}`下，目录结构 必须 按照`职能`进行划分， 不允许将`资源类型`或`业务逻辑`划分的目录直接置于`${root}`下。

```js
${root}/
    client/
      src/
      	router/
      	assert/
      	util/
      	...
    doc/
    server/
    ...
```

`src`目录用于存放开发时源文件，`业务项目`的`src`目录内，绝大多数情况应当根据`业务逻辑`划分目录结构。划分出的子目录我们称为`业务目录`。

## 1 程序命名规范

##### [强制] `变量` 使用 `Camel命名法`。

示例：

```js
var loadingModules = {};
```

##### [强制] `常量` 使用 `全部字母大写，单词间下划线分隔` 的命名方式。

示例：

```js
const HTML_ENTITY = {};
```

##### [强制] `函数` 使用 `Camel命名法`。

示例：

```js
function stringFormat(source) {}
```

##### [强制] 函数的 `参数` 使用 `Camel命名法`。

示例：

```js
function hear(theBells) {}
```

##### [强制] `类` 使用 `Pascal命名法`。

示例：

```js
function TextNode(options) {}
```

##### [强制] 类的 `方法` / `属性` 使用 `Camel命名法`。

示例：

```js
function TextNode(value, engine) {
    this.value = value;
    this.engine = engine;
}
TextNode.prototype.clone = function () {
    return this;
};
```

##### [强制] `枚举变量` 使用 `Pascal命名法`，`枚举的属性` 使用 `全部字母大写，单词间下划线分隔` 的命名方式。

示例：

```js
var TargetState = {
    READING: 1,
    READED: 2,
    APPLIED: 3,
    READY: 4
};
```

##### [强制] `类名` 使用 `名词`。

示例：

```js
function Engine(options) {}
```

##### [建议] `函数名` 使用 `动宾短语`。

示例：

```js
function getStyle(element) {}
```

##### [建议] `boolean` 类型的变量使用 `is` 或 `has` 开头。

示例：

```js
var isReady = false;var hasMoreCommands = false;
```

##### [建议] `Promise对象` 用 `动宾短语的进行时` 表达。

示例：

```js
var loadingData = ajax.get('url');loadingData.then(callback);
```

## 2 代码风格

### 2.1 文件

##### [建议] JavaScript 文件使用无 `BOM` 的 `UTF-8` 编码。

解释：

UTF-8 编码具有更广泛的适应性。BOM 在使用程序或工具处理文件时可能造成不必要的干扰。

##### [建议] 在文件结尾处，保留一个空行。

### 2.2 结构

#### 2.2.1 缩进

##### [强制] 使用 `4` 个空格做为一个缩进层级，不允许使用 `2` 个空格 或 `tab` 字符。

##### [强制] `switch` 下的 `case` 和 `default` 必须增加一个缩进层级。

```js
// good
switch (variable) {
    case '1':
        // do...
        break;
    case '2':
        // do...
        break;
    default:
        // do...
}
```

#### 2.2.2 空格

##### [强制] 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格。

示例：

```js
var a = !arr.length;a++;a = b + c;
```

##### [强制] 用作代码块起始的左花括号 `{` 前必须有一个空格。

示例：

```js
// good
if (condition) {
}
while (condition) {
}
function funcName() {
}
```

##### [强制] `if / else / for / while / function / switch / do / try / catch / finally` 关键字后，必须有一个空格。

示例：

```js
// good
if (condition) {
}
while (condition) {
}
(function () {
})();
```

##### [强制] 在对象创建时，属性中的 `:` 之后必须有空格，`:` 之前不允许有空格。

```js
// good
var obj = {
    a: 1,
    b: 2,
    c: 3
};
```

##### [强制] 函数声明、具名函数表达式、函数调用中，函数名和 `(` 之间不允许有空格。

```js
// good
function funcName() {
}
var funcName = function funcName() {
};
funcName();
// bad
function funcName () {
}
var funcName = function funcName () {
};
funcName ();
```

##### [强制] 在函数调用、函数声明、括号表达式、属性访问、条件控制语句中，`()` 和 `[]` 内紧贴括号部分不允许有空格。

##### [强制] 单行声明的数组与对象，如果包含元素，`{}` 和 `[]` 内紧贴括号部分不允许包含空格。

#### 2.2.3 换行

##### [强制] 运算符处换行时，运算符必须在新行的行首。

```js
// good
if (user.isAuthenticated()
    && user.isInRole('admin')
    && user.hasAuthority('add-admin')
    || user.hasAuthority('delete-admin')
) {
    // Code
}
// bad
if (user.isAuthenticated() &&
    user.isInRole('admin') &&
    user.hasAuthority('add-admin') ||
    user.hasAuthority('delete-admin')) {
    // Code
}
```

##### [建议] 不同行为或逻辑的语句集，使用空行隔开，更易阅读。

示例：

```js
// 仅为按逻辑换行的示例，不代表setStyle的最优实现
function setStyle(element, property, value) {
    if (element == null) {
        return;
    }
    element.style[property] = value;
}
```

##### [建议] 对于 `if...else...`、`try...catch...finally` 等语句，推荐使用在 `}` 号后添加一个换行 的风格，使代码层次结构更清晰，阅读性更好。

```js
if (condition) {
    // some statements;
}
else {
    // some statements;
}
try {
    // some statements;
}
catch (ex) {
    // some statements;
}
```

#### 2.2.4 语句

##### [强制] 不得省略语句结束的分号。

##### [强制] 在 `if / else / for / do / while` 语句中，即使只有一行，也不得省略块 `{...}`。

示例：

```js
// good
if (condition) {
    callFunc();
}
// bad
if (condition) callFunc();
if (condition)
    callFunc();
```

##### [强制] 函数定义结束不允许添加分号。

```js
// good
function funcName() {
}
// bad
function funcName() {
};
// 如果是函数表达式，分号是不允许省略的。
var funcName = function () {
};
```

## 3 语言特性

### 3.1 变量

##### [强制] 每个 `var` 只能声明一个变量。

解释：

一个 `var` 声明多个变量，容易导致较长的行长度，并且在修改时容易造成逗号和分号的混淆。

```js
// good
var hangModules = [];
var missModules = [];
var visited = {};
```

##### [强制] 变量必须 `即用即声明`，不得在函数或其它形式的代码块起始位置统一声明所有变量。

解释：

变量声明与使用的距离越远，出现的跨度越大，代码的阅读与维护成本越高。虽然JavaScript的变量是函数作用域，还是应该根据编程中的意图，缩小变量出现的距离空间。

### 3.2遍历

##### [建议] 对有序集合进行遍历时，缓存 `length`。

解释：

虽然现代浏览器都对数组长度进行了缓存，但对于一些宿主对象和老旧浏览器的数组对象，在每次 `length` 访问时会动态计算元素个数，此时缓存 `length` 能有效提高程序性能。

示例：

```js
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    // ......
}
```

##### [建议] 对有序集合进行顺序无关的遍历时，使用逆序遍历。

解释：

逆序遍历可以节省变量，代码比较优化。

```js
var len = elements.length;
while (len--) {
    var element = elements[len];
    // ......
}
```

### 3.3类型转换

##### [强制] 使用 `parseInt` 时，必须指定进制。

示例：

```js
// good
parseInt(str, 10);
// bad
parseInt(str);
```

##### [建议] 转换成 `number` 时，通常使用 `+`。

```js
// good
+str;
// bad
Number(str);
```

##### [建议] 转换成 `boolean` 时，使用 `!!`。

示例：

```js
var num = 3.14;
!!num;
```

### 3.4字符串

##### [强制] 字符串开头和结束使用单引号 `'`。

解释：

1. 输入单引号不需要按住 `shift`，方便输入。
2. 实际使用中，字符串经常用来拼接 HTML。为方便 HTML 中包含双引号而不需要转义写法。

### 3.5 对象

##### [建议] `for in` 遍历对象时, 使用 `hasOwnProperty` 过滤掉原型中的属性。

示例：

```js
var newInfo = {};
for (var key in info) {
    if (info.hasOwnProperty(key)) {
        newInfo[key] = info[key];
    }
}
```

### 3.6 数组

##### 强制] 遍历数组不使用 `for in`。

解释：

数组对象可能存在数字以外的属性, 这种情况下 `for in` 不会得到正确结果。

##### [建议] 不因为性能的原因自己实现数组排序功能，尽量使用数组的 `sort` 方法。

解释：

自己实现的常规排序算法，在性能上并不优于数组默认的 `sort` 方法。以下两种场景可以自己实现排序：

1. 需要稳定的排序算法，达到严格一致的排序结果。
2. 数据特点鲜明，适合使用桶排。

##### [建议] 清空数组使用 `.length = 0`。

## DOM

##### [建议] 遍历元素集合时，尽量缓存集合长度。如需多次操作同一集合，则应将集合转为数组。

##### [建议] 获取元素实际样式信息时，应使用 `getComputedStyle` 或 `currentStyle`。

解释：

通过 style 只能获得内联定义或通过 JavaScript 直接设置的样式。通过 CSS class 设置的元素样式无法直接通过 style 获取。

##### [建议] 尽可能通过为元素添加预定义的 className 来改变元素样式，避免直接操作 style 设置。

##### [建议] 操作 `DOM` 时，尽量减少页面 `reflow`。

解释：

页面 `reflow` 是非常耗时的行为，非常容易导致性能瓶颈。下面一些场景会触发浏览器的reflow：

- `DOM`元素的添加、修改（内容）、删除。
- 应用新的样式或者修改任何影响元素布局的属性。
- `Resize`浏览器窗口、滚动页面。
- 读取元素的某些属性`（offsetLeft、offsetTop、offsetHeight、offsetWidth、scrollTop/Left/Width/Height、clientTop/Left/Width/Height) `。

## ESNext

### 4.1 分号

##### 强制] 类声明结束不允许添加分号。

解释：

与函数声明保持一致。

##### [强制] 类成员定义中，方法定义后不允许添加分号，成员属性定义后必须添加分号。

##### [强制] `export` 语句后，不允许出现表示空语句的分号。

### 4.2 箭头函数

##### [强制] 箭头函数的参数只有一个，并且不包含解构时，参数部分的括号必须省略。

##### [建议] 箭头函数的函数体只有一个单行表达式语句，且作为返回值时，省略 `{}` 和 `return`。

如果单个表达式过长，可以使用 `()` 进行包裹。

##### [强制] 一个函数被设计为需要 `call` 和 `apply` 的时候，不能是箭头函数。

解释：

箭头函数没有自己的this，会强制绑定当前环境下的 `this`。

### 4.3 解构

##### [强制] 不要使用3层及以上的解构。

解释：

过多层次的解构会让代码变得难以阅读。

示例：

```js
// bad
let {documentElement: {firstElementChild: {nextSibling}}} = window;
```

##### [强制] 仅定义一个变量时不允许使用解构。

解释：

在这种场景下，使用解构将降低代码可读性。

示例：

```js
// good
let len = myString.length;
// bad
let {length: len} = myString;
```

### 4.4 模板字符串

##### [强制] 字符串内变量替换时，不要使用 `2` 次及以上的函数调用。

解释：

在变量替换符内有太多的函数调用等复杂语法会导致可读性下降。

```js
// good
let fullName = getFullName(getFirstName(), getLastName());
let s = `Hello ${fullName}`;
// bad
let s = `Hello ${getFullName(getFirstName(), getLastName())}`;
```

### 4.5 函数

##### [建议] 使用变量默认语法代替基于条件判断的默认值声明。

解释：

添加默认值有助于引擎的优化，在未来 `strong mode` 下也会有更好的效果。

示例：

```js
// good
function foo(text = 'hello') {
}
// bad
function foo(text) {
    text = text || 'hello';
}
```

##### [强制] 不要使用 `arguments` 对象，应使用 `...args` 代替。

解释：

在未来 `strong mode` 下 `arguments` 将被禁用。

示例：

```js
// good
function foo(...args) {
    console.log(args.join(''));
}
// bad
function foo() {
    
```

### 4.6 对象

##### [建议] 使用 `Object.keys` 或 `Object.entries` 进行对象遍历。

解释：

不建议使用 `for .. in` 进行对象的遍历，以避免遗漏 `hasOwnProperty` 产生的错误。

示例：

```js
// good
for (let key of Object.keys(foo)) {
    let value = foo[key];
}
// good
for (let [key, value] of Object.entries(foo)) {
    // ...
}
```

##### [建议] 定义对象的方法不应使用箭头函数。

解释：

箭头函数将 `this` 绑定到当前环境，在 `obj.method()` 调用时容易导致不期待的 `this`。除非明确需要绑定 `this`，否则不应使用箭头函数。

### 4.7 模块

##### [强制] `export` 与内容定义放在一起。

解释：

何处声明要导出的东西，就在何处使用 `export` 关键字，不在声明后再统一导出。

示例：

```js
// good
export function foo() {
}
export const bar = 3;
// bad
function foo() {
}
const bar = 3;
export {foo};
export {bar};
```

### 4.8 数组

##### [建议] 对数组进行连接操作时，使用数组展开语法。

解释：

用数组展开代替 `concat` 方法，数组展开对 `Iterable` 有更好的兼容性。

示例：

```js
// good
let foo = [...foo, newValue];
let bar = [...bar, ...newValues];
// bad
let foo = foo.concat(newValue);
let bar = bar.concat(newValues);
```

##### [建议] 不要使用数组展开进行数组的复制操作。

解释：

使用数组展开语法进行复制，代码可读性较差。推荐使用 `Array.from` 方法进行复制操作。

示例：

```js
// good
let otherArr = Array.from(arr);
// bad
let otherArr = [...arr];
```

##### [建议] 尽可能使用 `for .. of` 进行遍历。

解释：

使用 `for .. of` 可以更好地接受任何的 `Iterable` 对象，如 `Map#values` 生成的迭代器，使得方法的通用性更强。

以下情况除外：

1. 遍历确实成为了性能瓶颈，需要使用原生 `for` 循环提升性能。
2. 需要遍历过程中的索引。