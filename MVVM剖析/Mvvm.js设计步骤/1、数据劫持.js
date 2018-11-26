//创建一个Mvvm函数
function Mvvm(options){
	
	// vm.$options Vue上是将所有属性挂载到上面
    // 所以我们也同样实现,将所有属性挂载到了$option
	this.$options = options || {};
	
	// this._data 这里也和Vue一样
	let data = this._data = this.$options.data;
	
	//数据劫持
	observe(data);
}


function observe(data){
	// 如果不是对象的话就直接return掉
    // 防止递归溢出
	if(!data || typeof data !=='object'){
		return
	}else{
		return new Observe(data);
	}
}

// 创建一个Observe构造函数
// 写数据劫持的主要逻辑
function Observe(data){
	// 所谓数据劫持就是给对象增加get,set
    // 先遍历一遍对象再说
    
    for(let key in data){
    	let val = data[key];
    	
    	//给data的属性添加get/set方法
    	Object.defineProperty(data,key,{
    		configurable:true,
    		get:function(){
    			return val;
    		},
    		set:function(newVal){//设置值的时候
    			if(val===newVal){// 设置的值和以前值一样就不理它
    				return
    			}else{
    				val = newVal;   // 如果以后再获取值(get)的时候，将刚才设置的值再返回去
    				observe(newVal);// 当设置为新值后，如果新值是对象，也需要把新值再去定义成属性
    			}
    		}
    	});
    	
    	// 如果val是个对象，递归继续向下找，实现深度的数据劫持
    	observe(val);
    	
    }
    
}

