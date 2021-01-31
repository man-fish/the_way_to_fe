## padding-top 自适应布局

在使用这个技巧之前我们需要了解他的原理：当`margin/padding`取形式为`百分比`的值时，无论是`left/right`，还是`top/bottom`，都是以`父元素的width`为参照物的。

#### width 100%

当父元素使用的属性时`width:100%`时，子元素的`width`自动继承这个属性，而这时我们若想让`height=width`就需要使用上面的技巧了。

```css
.parent {
  width: 30%;
  border: 1px dotted red;
}

.child {
  padding-top: 100%;
  border: 1px solid black;
}
<div class="parent">
	<div class="child"></div>
</div>
```

#### flex

使用flex布局的使用也会遇到上面的问题，比如：

```css
.grand {
  display: flex;
  width: 1000px;
  height: 10px;
}

.father {
  flex: 1
}

.child {
  padding-top: 100%;
  border: 1px solid black;
}
<div class="grand">
  <div class="parent">
    <div class="child"></div>
  </div>
</div>
```

#### 后续处理

使用padding-top之后我们的内容就无法正确的放置了，这个时候需要通过绝对定位巧妙的解决一下：

```scss
@at-root #{&}__disk__container {
  position: relative;
  padding-top: 100%;
  border-radius: 100%;
  overflow: hidden;
  background: #000;

  input {
    display: none;
  }
}

@at-root #{&}__disk__cover {
  position: absolute;
  top: -10px;
  left: -10px;
  bottom: -10px;
  right: -10px;
	background: $disk-bg;
}
```

