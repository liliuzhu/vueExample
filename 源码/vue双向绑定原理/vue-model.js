function myVue(options) { //定义一个myVue构造函数：
    this._init(options)
}
myVue.prototype._init = function (options) { // 初始化函数
    this.$options = options; // options 为上面使用时传入的结构体，包括el,data,methods
    this.$el = document.querySelector(options.el); // el是 #app, this.$el是id为app的Element元素
    this.$data = options.data; //// this.$data = {number: 0}
    this.$methods = options.methods; //this.$methods = {increment: function(){}}

    this._obverse(this.$data);
};
myVue.prototype._obverse  = function (obj) { // 对data进行处理，重写data的set和get函数
    var value;
    for(var key in obj){ // 遍历obj对象
        if(obj.hasOwnProperty(key)){ // 是否私有属性
            value = obj[key];
            if(typeof value === 'object'){ // 如果值还是对象
                this._obverse(value)
            }
            Object.defineProperty(this.$data, key, { // 关键
                enumerable: true,
                configurable: true,
                get: function () {
                    console.log('获取'+value)
                    return value
                },
                set: function (newVal) {
                    console.log('更新'+value)
                    if(value !== newVal){
                        value = newVal;
                    }
                }
            })
        }
    }
}

function Watcher(name, el, vm, exp, attr) { // 指令类Watcher，用来绑定更新函数，实现对DOM元素的更新
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.exp = exp;
}