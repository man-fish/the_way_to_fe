# Javascript 面对对象编程

### 1.创建

#### 1).字面量

```javascript
    var obj ={
      name:"wangbo",
      age : 6,
      height : 70,
      success:function(){
        console.log(this);
      }
    }
```

#### 2).Object对象

```javascript
      var person = new Object();
          person.name = "wangbo";
          person.age = 6；
          person.say=function(){
            	console.log(this)
          }
```

#### 3).工厂式创建

```javascript
      function objCreate(name,age){
        var obj = new Object();
        obj.name = name;
        obj.age =age;
        obj.console = function(){
          console.log(this);
        }
        return obj;
      }
```

#### 4).主角—自定义构造

```javascript
    function Atom(name,age){
        this.name = name;
        this.age = age;
    }
```

### 2.继承

#### 1).原型：

##### 1.节省空间：

```JavaScript
    function Lion(name,age){
        this.name = name;
        this.age = age;
        this.consoles = console;
    }
    Lion.prototype.eat=function(){
      console.log("eat sheep");
    }
```

##### 2.写法二：

```javascript
function Lion(name,age){
    this.name = name;
    this.age = age;
    this.consoles = console;
}
Lion.prototype.eat=function(){
  	console.log("eat sheep");
}
```
#### 2).继承

##### 1.方法继承

```javascript
    function Lion(name,age){
        this.name = name;
        this.age = age;
    }
    Lion.prototype.eat=function(){
        console.log("eat sheep");
    }
    function Wolf(animal){
        this.name = animal;
    }
    Wolf.prototype = new Lion("狮子",4);
    var xiaolang = new Wolf("狼狼");
```

> 节省空间

##### 2.属性继承

```javascript
    function Lion(name,age){
        this.name = name;
        this.age = age;
    }
    Lion.prototype.eat=function(){
        console.log("eat sheep");
    }
    function Wolf(name,age,animal){
    	Person.call(this,name,age);
        this.name = animal;
    }
    Wolf.prototype = new Lion();
    var xiaolang = new Wolf("狼狼");
```

> 属性我们是不希望大家都一样的，所以直接使用call引用Lion函数，但是把this改成Wolf。

##### 3.继承之后添加方法

```javascript
	  Wolf.prototype = new Lion();
	  Wolf.prototype.say = function(){
          console.log("战狼！");
	  }
```

##### 4.属性和原型属性重名问题

```javascript
	function Person(name,age){
        this.name = name;
        this.age = age;
	}
	Person.prototype.name = "wanglei";
```

当两个属性重名的时候，我们会先取实例对象里找再去原型对象里去找。

### 3.Prototype

1.原型方法：（可以传递参数）

```javascript
function Abor(name){
    this.name = name;
}
Abor.prototype.add = function(id){
    console.log(id+this.name);
}
var o = new Abor("wangbo");
o.add(6);
```
2.什么 prototype？

> prototype是构造函数的一个属性，他是一个指针，指向着一个构造函数象的原型对象，在创建构造函数的同时我们就会创建原型对象。

3.什么是constructor

> 在创建一个构造函数的同时会创建他的原型对象，同时原型对象里会有一个constructor属性，同样是一个指针，指向着他的构造函数。

4.那么究竟是谁创建了prototype指向的原型对象----构造函数

> 在构造函数创建了原型对象之后，原型对象只会默认获得constructor，但是原型对象中的其他属性从何而来呢？---从Object中继承而来。

4.什么是\__proto__?

> 每一个函数都是对象，当我们用一个构造函数创建一个实例对象的时候，实例对象里会有一个\__proto__属性,里面也包含一个指针，指向的是实例对象的构造函数的原型对象。

![原型链](C:\Users\DELL\Pictures\md图片不能删\原型链.png)

### 4.继承

```javascript
      function Animal(Otype){
          this.Otype = Otype;
      }
      Animal.prototype.bite = function(){
          console.log("咬死你");
      }
      function Lion(type,sex,age,color){
          this.type = type;
          this.sex = sex;
          this.age = age;
          this.color = color;
      }
      Lion.prototype = new Animal("猫科动物");
      Lion.prototype.eat=function(){
          console.log("我咬你一口你是真的去世了")
      }
      function FLion(name,type,sex,age,color){
          this.name = name;
          Lion.call(this,type,sex,age,color);
      }
      FLion.prototype = new Lion();
     //这里我们创建母狮子原型的时候，狮子中包含了母狮子的属性，但是如果在这一步我们直接传参进去，则这些属性（name，age，sex。。。。）永不可更改，所以说call是解决问题的最好办法，每一狮子的继承属性都应该是不一样的。
      FLion.prototype.console = function(){
        console.log(this.name+this.type+this.Otype+this.type+this.sex+this.color);
      }
      var xinba = new FLion("辛巴","狮子","女的",10,"黄色");
      xinba.console();
      xinba.bite();
      xinba.eat();
```

为什么xinba可以用继承多代而来的方法？

> 只要是能在原型链上找到的方法都可以被子代使用。

为甚么可以使用.call继承父类的属性？

> 因为都是构造函数，所以父类.call(this,参数)就相当于是通过父类的函数为字类添加属性

