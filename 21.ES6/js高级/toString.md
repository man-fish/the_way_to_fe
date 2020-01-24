# toString

### 1.Object.prototype.toString()

```javascript
		Object.prototype.toString.call(变量);
		//Obj ----->[Object Object]
            var str ={
              "name":1
            };
        	console.log(str.toString())
			//等同于这种情况
		//Array---->[Object Array]
		//num------>[Object Number]
		//String--->[Object String]
		........
		//RegExp--->[Object RegExp]
		//null----->[Obejct Null]
		//undefined->[Object undefined]
```

> 优于typeof的元素判断。

### 2.包装对象的实例对象中的toSting()

> 将一切类型转换为字符串。

```javascript
        var str =1
        console.log(str.toString())；“1”；
```

