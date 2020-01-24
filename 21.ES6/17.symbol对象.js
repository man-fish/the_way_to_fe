var age = Symbol()
var age1 = Symbol('age')
//可以为Symbol传进去一个属性来区分其实是没有什么意义的。
/**
 * 当你想使用别人提供的对象的时候，你可能想为这个对象添加一个新的方法，但是你有害怕属性名发生冲突，于是使用SYmbol生成一个独一无二的属性。
 */

var obj ={
    name:"wangbo",
    age:7
}

obj[age] = 6
console.log(obj[Symbol()])  //undefined
console.log(obj.age)       //7  
console.log(obj[age])       //6 
                            /**
                             * 这里说明了，symbol是一个生成不重复属性的函数，传入的参数或者是代表他的变量名都没有实际作用。
                             */

//不能被 for in和 for of 遍历。
for(let item in obj){
    console.log(item)
}


let{name}=obj

console.log(name)

console.log(obj.age)
/**
 * 迭代（不断地重复一件事情）
 * 遍历器=》对象迭代器（不断地探索获取遍历 ）
 * 
 * 
 */