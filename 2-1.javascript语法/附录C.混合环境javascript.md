## A.1 Web

JavaScript 语言的官方名称是 ECMAScript（指的是管理它的 ECMA 标准），这一点不太为人所知。那么 JavaScript 又是指什么呢？ JavaScript 是该语言的通用称谓，更确切地说，它是该规范在浏览器上的实现。

### Annex B

Annex B（ECMAScript）官方 ECMAScript 规范包括 Annex B，其中介绍了由于浏览器兼容性问题导致的与官方规范的差异，下面是主要的兼容性差异:

- 在非严格模式中允许八进制数值常量存在，如 0123（即十进制的 83）。
- window.escape(..) 和 window.unescape(..) 让你能够转义（escape）和回转（unescape）带有 % 分隔符的十六进制字符串。例如，window.escape( "? foo=97%&bar=3%" ) 的结果为 "%3Ffoo%3D97%25%26bar%3D3%25"。
- String.prototype.substr 和 String.prototype.substring 十分相似，除了前者的第二个参数是结束位置索引（非自包含），后者的第二个参数是长度（需要包含的字符数）。

### Web ECMAScript

Web ECMAScript [规范](https://javascript.spec.whatwg.org)中介绍了官方 ECMAScript 规范和目前基于浏览器的 JavaScript 实现之间的差异。换句话说，其中的内容对浏览器来说是“必需的”（考虑到兼容性），但是并未包含在官方规范的“Annex B”部分。

- <!-- 和 --> 是合法的单行注释分隔符。

- String.prototype 中返回 HTML 格 式 字 符 串 的 附 加 方 法：anchor(..)、big(..)、blink(..)、bold(..)、fixed(..)、fontcolor(..)、fontsize(..)、italics(..)、link(..)、small(..)、strike(..) 和 sub(..)。
- Function.prototype 附加方法：Function.prototype.arguments 和 Function.caller（别名为 arguments.caller）。
- RegExp 扩展：RegExp.$1 .. RegExp.$9（匹配组）和 RegExp.lastMatch/RegExp["$&"]（最近匹配）。

## A.2　宿主对象

JavaScript 中有关变量的规则定义得十分清楚，但也不乏一些例外情况，比如自动定义的变量，以及由宿主环境（浏览器等）创建并提供给 JavaScript 引擎的变量——所谓的“宿主对象”（包括内建对象和函数）。

```js
var a = document.createElement( "div" );
typeof a; // "object"--正如所料
Object.prototype.toString.call( a ); // "[object HTMLDivElement]"
a.tagName; // "DIV"
```

上例中，a 不仅仅是一个 object，还是一个特殊的宿主对象，因为它是一个 DOM 元素。其内部的 [[Class]] 值（为 "HTMLDivElement"）来自预定义的属性（通常也是不可更改的）。

在我们经常打交道的宿主对象中，console 及其各种方法（log(..)、error(..) 等）是比较值得一提的。console 对象由宿主环境提供，以便从代码中输出各种值。

console 在浏览器中是输出到开发工具控制台，而在 Node.js 和其他服务器端 JavaScript 环境中，则是指向 JavaScript 环境系统进程的标准输出（stdout）和标准错误输出（stderr）。

## A.3　全局 DOM 变量

声明一个全局变量（使用 var 或者不使用）的结果并不仅仅是创建一个全局变量，而且还会在 global 对象（在浏览器中为 window）中创建一个同名属性。

还有一个不太为人所知的事实是：由于浏览器演进的历史遗留问题，在创建带有 id 属性的 DOM 元素时也会创建同名的全局变量。例如：

```html
<div id="foo"></div>
<script>
  if (typeof foo == "undefined") {
   foo = 42; // 永远也不会运行
  }
  console.log( foo ); // HTML元素
</script>
```

## A.4　\<script>  内联代码

绝大部分网站 /Web 应用程序的代码都存放在多个文件中，通常可以在网页中使用<scriopt src=..></script> 来加载这些文件，或者使用 <script> .. </script> 来包含内联代码（inline-code）。

#### 没有变量提升

多个script标签它们共享 global 对象（在浏览器中则是 window），也就是说这些文件中的代码在共享的命名空间中运行，并相互交互，如果某个 script 中定义了函数 foo()，后面的 script 代码就可以访问并调用 foo()，就像foo() 在其内部被声明过一样。

但是全局变量作用域的提升机制在这些边界中不适用，无论是 <script> .. </script> 还是<script src=..></script>，下面的代码都无法运行（因为 foo() 还未被声明）。

```html
<script>foo();</script>
<script>
 function foo() { .. }
</script>
```

#### 动态引入

我们还可以可以使用代码来动态创建 script，将其加入到页面的 DOM 中，效果是一样的：

```js
var greeting = "Hello World";
var el = document.createElement( "script" );
el.text = "function foo(){ alert( greeting );\
 } setTimeout( foo, 1000 );";
document.body.appendChild( el );
```

> 如果将 el.src 的值设置为一个文件 URL，就可以通过 <scrscript=..></script>动态加载外部文件。

#### 意料之外的结尾

内联代码和外部文件中的代码之间有一个区别，即在内联代码中不可以出现 </script> 字符串，一旦出现即被视为代码块结束。因此对于下面这样的代码需要非常小心：

```html
<script>
 var code = "<script>alert( ‘Hello World’ )</script>";
</script>
```

常用的变通方法是：

```js
"</sc" + "ript>";
```

另外需要注意的一点是，我们是根据代码文件的字符集属性（UTF-8、ISO-8859-8 等）来解析外部文件中的代码（或者默认字符集），而内联代码则使用其所在页面文件的字符集（或者默认字符集）。

## A.5　保留字

Let this long package flfloat,

Goto private class if short.

While protected with debugger case,

Continue volatile interface.

Instanceof super synchronized throw,

Extends fifinal export throws.

Try import double enum?

-False, boolean, abstract function, 

Implements typeof transient break!

Void static, default do,

Switch int native new.

Else, delete null public var

In return for const, true, char 

...Finally catch byte.

> 在 ES5 之前，保留字也不能用来作为对象常量中的属性名称或者键值，但是现在已经没有这个限制。

## A.6　实现中的限制

JavaScript 规范对于函数中参数的个数，以及字符串常量的长度等并没有限制；但是由于JavaScript 引擎实现各异，规范在某些地方有一些限制。

比如下面的代码，在一些 JavaScript 引擎中你会得到正确答案 499950000，而另外一些引擎（如 Safari 6.x）中则会产生错误“RangeError: Maximum call stack size exceeded"。

```js
function addAll() {
 var sum = 0;
 for (var i=0; i < arguments.length; i++) {
 sum += arguments[i];
 }
 return sum;
}
var nums = [];
for (var i=1; i < 100000; i++) {
 nums.push(i);
}

addAll.apply( null, nums ); // 应该是: 499950000
```

下面列出一些已知的限制：

- 字符串常量中允许的最大字符数（并非只是针对字符串值）；
- 可以作为参数传递到函数中的数据大小（也称为栈大小，以字节为单位）；
- 函数声明中的参数个数；
- 未经优化的调用栈（例如递归）的最大层数，即函数调用链的最大长度；
- JavaScript 程序以阻塞方式在浏览器中运行的最长时间（秒）；变量名的最大长度。