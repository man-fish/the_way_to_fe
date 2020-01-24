//10，10,10，10,10,10,10,10,10,10,10
for(var i = 0;i<10;i++){
setTimeout(function(){
        console.log(i)
    },1000)
}
// 每一轮都会改变全局i的值。
//0,1,2,3,4,5,6,7,8,9,10
for(let i = 0;i<10;i++){
    setTimeout(function(){
            console.log(i)
        },1000)
    }
// 每一轮是一个独立的块级作用域，每一次使用i的时候会到那一轮里面去找。

// 变量会向上级作用域寻找。
let b = 1;
(function(){
    console.log(b);
})()

for(let a=0;a<10;a++){
    let a = 1
    // 循环体和循环条件是两个不同的作用域
    console.log(a)
}

//变量要先声明后调用，没有变量提升。
let  c = 1;
console.log(c)

//暂时性死区
var temp = 123;
if(true){
    // temp = 'name'   （报错）        
    let temp;
}
if(true){
    if(typeof temp==123){   //     报错（整体死区）
        console.log('haha')
    }
    // let temp;       //报错
}

let x = x+1
//let x = 。。。是一个声明语句，x+!企图在声明语句还没有执行完毕之后就使用x，所以会报错。

/**
 * 
 * 常量：
 * 1.声明之后必须赋值。
 * 2.赋值之后不能进行改变指针的操作。
 * const声明之后就不能改变，但是数组和对象可以改变他们的地址。
 * 就是不能改变指针
 * 
 */