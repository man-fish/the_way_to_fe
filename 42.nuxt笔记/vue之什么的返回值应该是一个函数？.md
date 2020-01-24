## vue之什么的返回值应该是一个函数？

```js
export default{
	data(){
		return 
        	{
                a : []
            }
	}
}

const s = new Vuex.store({
	state(){
		return {
			a : []
		}
	}
})

export default{
    prop:{
        areas:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
```

比如你a页面用到了，b页面也用到了，你还不希望两个页面因为引用类型的问题造成困扰。