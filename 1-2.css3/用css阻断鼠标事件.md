# pointer-events

**`pointer-events`** CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 [target](https://developer.mozilla.org/zh-CN/docs/Web/API/event.target)。

```css
/* Keyword values */
pointer-events: auto;
pointer-events: none;
pointer-events: visiblePainted; /* SVG only */
pointer-events: visibleFill;    /* SVG only */
pointer-events: visibleStroke;  /* SVG only */
pointer-events: visible;        /* SVG only */
pointer-events: painted;        /* SVG only */
pointer-events: fill;           /* SVG only */
pointer-events: stroke;         /* SVG only */
pointer-events: all;            /* SVG only */
```

使用`none`作为属性值的时候，元素永远不会成为鼠标事件的[target](https://developer.mozilla.org/en-US/docs/Web/API/event.target)。但是，当其后代元素的`pointer-events`属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。

因此为了避免后代根据默认值`auto`成为鼠标事件的对象，我们一般为元素的所有子元素指定一个`pointer-events`。

```css
&.disabled,
&:disabled {
  cursor: not-allowed;
  box-shadow: none;
  opacity: $btn-disabled-opacity;

  >* {
    pointer-events: none;
  }
}
```

