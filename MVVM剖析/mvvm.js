//创建一个Mvvm函数
function Mvvm(options) {

	// vm.$options Vue上是将所有属性挂载到上面
	// 所以我们也同样实现,将所有属性挂载到了$option
	this.$options = options || {};

	let data = this._data = this.$options.data;

	//数据劫持
	observe(data);

	//把this代理options.data，方便直接使用this取值
	for(let key in data) {
		Object.defineProperty(this, key, {
			configurable: true,
			get: function() {
				return this._data[key]
			},
			set: function(newVal) {
				this._data[key] = newVal;
			}
		});
	}

	initComputed.call(this); //作用域指向mvvm对象

	new Compile(options.el, this);

	this.$options.mounted.call(this);

}

function initComputed() {
	let vm = this;
	let computed = this.$options.computed;

	for(let key in computed) {

		//将计算属性添加到mvvm的代理上
		Object.defineProperty(vm, key, {
			// 这里判断是computed里的key是对象还是函数
			// 如果是函数直接就会调get方法
			// 如果是对象的话，手动调一下get方法即可
			// 如： sum() {return this.a + this.b;},他们获取a和b的值就会调用get方法
			// 所以不需要new Watcher去监听变化了
			get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
			set: function() {

			}
		});
	}

}

function observe(data) {
	// 如果不是对象的话就直接return掉
	// 防止递归溢出
	if(!data || typeof data !== 'object') {
		return
	} else {
		return new Observe(data);
	}
}

// 创建一个Observe构造函数
// 写数据劫持的主要逻辑
function Observe(data) {
	// 所谓数据劫持就是给对象增加get,set
	// 先遍历一遍对象再说

	for(let key in data) {
		let val = data[key];
		let dep = new Dep();
		//给data的属性添加get/set方法
		Object.defineProperty(data, key, {
			configurable: true,
			get: function() {
				if(Dep.target) {
					dep.addSub(Dep.target); //添加订阅，将watcher添加到订阅事件中 [watcher]
				}
				return val;
			},
			set: function(newVal) { //设置值的时候
				if(val === newVal) { // 设置的值和以前值一样就不理它
					return
				} else {
					val = newVal; // 如果以后再获取值(get)的时候，将刚才设置的值再返回去
					observe(newVal); // 当设置为新值后，如果新值是对象，也需要把新值再去定义成属性
					dep.notify(); //触发发布， 让所有watcher的update方法执行即可
				}
			}
		});

		// 如果val是个对象，递归继续向下找，实现深度的数据劫持
		observe(val);

	}

}

// 创建Compile构造函数
//el--》dom的id，vm--》Mvvm对象
function Compile(el, vm) {

	vm.$el = document.querySelector(el); // 将el挂载到实例上方便调用

	// 可以选择移到内存中去然后放入文档碎片中，节省开销
	let fragment = document.createDocumentFragment();

	while(child = vm.$el.firstChild) {
		fragment.appendChild(child); //如果使用appendChid方法将原dom树中的节点添加到DocumentFragment中时，会删除原来的节点
	}

	// 对el里面的内容进行替换
	function replace(flag) {

		//对子节点遍历
		Array.from(flag.childNodes).forEach(function(node) {

			let txt = node.textContent; //返回节点及其后代的文本内容

			let reg = /\{\{(.*?)\}\}/g; //正则匹配{{}}

			//nodeType节点类型:1代表元素，2代表属性，3代表元素或属性中的文本内容
			if(node.nodeType == 1) {
				let nodeAttrs = node.attributes; // 获取dom上的所有属性,是个类数组

				Array.from(nodeAttrs).forEach(function(attr) {
					let name = attr.name; //属性名
					let exp = attr.value; //属性值

					let val = exp.split(".").reduce(function(data, key) {
						return data[key];
					}, vm)

					if(name == 'v-model') {
						node.value = val;
					}

					// 监听数据变化
					new Watcher(vm, exp, function(newVal) {
						node.value = newVal; // 当watcher触发时会自动将内容放进输入框中
					})

					//添加输入监听
					node.addEventListener('input', function(e) {
						let newVal = e.target.value;

						// 相当于给this.c赋了一个新值
						// 而值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现了更新
						//vm[exp] = newVal;

						let arr = exp.split(".");

						if(arr.length == 1) {
							vm[exp] = newVal;
						} else if(arr.length > 1) {
							let n = 0;
							arr.reduce(function(val, key) {
								n++;
								if(n == arr.length) {
									val[key] = newVal
								}
								return val[key]
							}, vm)
						}

					})

				})

			} else if(node.nodeType == 3 && reg.test(txt)) { //reg.test(txt) 有大括号的情况{{}}
				function replaceText() {
					node.textContent = txt.replace(reg, function(matched, placeholder) {

						//console.log(matched, placeholder) //{{album.theme}} album.theme

						new Watcher(vm, placeholder, replaceText); // 添加监听变化，进行匹配替换内容

						//reduce累计计算
						return placeholder.split('.').reduce(function(val, key) {
							return val[key];
						}, vm);

					});
				}

				replaceText();

			}

			// 如果还有子节点，继续递归replace
			if(node.childNodes && node.childNodes.length) {
				replace(node);
			}

		});

	}

	replace(fragment); // 替换内容

	vm.$el.appendChild(fragment); // 再将文档碎片放入el中

}

function Dep() {
	this.subs = [];
}
Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub)
	},
	notify: function() {
		this.subs.forEach(function(sub) {
			sub.update();
		})
	}
}

//监听函数
function Watcher(vm, exp, fn) {
	this.fn = fn;
	this.vm = vm;
	this.exp = exp;

	Dep.target = this;

	let arr = exp.split(".");
	arr.reduce(function(val, key) {
		return val[key]; //这里是关键，这里会调用属性的get方法，所以会订阅此监听
	}, vm);

	Dep.target = null;

}
Watcher.prototype.update = function() {

	let arr = this.exp.split(".");
	let vm = this.vm;

	//得到新设置的值
	let newVal = arr.reduce(function(val, key) {
		return val[key]; //这里是关键，这里会调用属性的get方法，所以会订阅此监听
	}, vm);

	this.fn(newVal);

}