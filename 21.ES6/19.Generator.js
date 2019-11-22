function Console(txt){
    console.log(txt)
}

function* myGenerator(){
        
        Console("第一次开始执行")
        yield 'hello'

        Console("暂停之后继续执行")
        yield 'generator'

        return '放回的结果'

        Console("return之后就不会执行了")
        yield 'endend'

        // yield function(){
        //     console.log()
        // }
}

let MG = myGenerator()

console.log(MG.next())
console.log(MG.next())
console.log(MG.next())

