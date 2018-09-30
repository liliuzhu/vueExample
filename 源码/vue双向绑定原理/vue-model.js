function myVue(options) { //定义一个myVue构造函数：
    this._init(options)
}
myVue.prototype._init = function (options) { // 初始化函数
    this.$options = options; // options 为上面使用时传入的结构体，包括el,data,methods
    this.$el = document.querySelector(options.el); // el是 #app, this.$el是id为app的Element元素
    this.$data = options.data(); //// this.$data = {number: 0}
    this.$methods = options.methods; //this.$methods = {increment: function(){}}

    this._binding = {}; // _binding保存着model与view的映射关系，
    this._obverse(this.$data);
    this._complie(this.$el)
};
myVue.prototype._obverse  = function (obj) { // 对data进行处理，重写data的set和get函数
    var value;
    for(var key in obj){ // 遍历obj对象
        if(obj.hasOwnProperty(key)){ // 是否私有属性
            this._binding[key] = {
                _directives: []
            }
            value = obj[key];
            if(typeof value === 'object'){ // 如果值还是对象
                this._obverse(value)
            }
            var binding = this._binding[key];
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
                        binding._directives.forEach(function (item) { // number改变时，触发_binding[number]._directives中的绑定的Watcher更新
                            item.update();
                        })
                    }
                }
            })
        }
    }
}
myVue.prototype._complie = function (root) { // root为id为app的Element元素，也就是我们的根元素
    var _this = this;
    var nodes = root.children;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if(node.children.length){
            this._complie(node);
        }
        if (node.hasAttribute('v-click')){
            node.onclick=(function () {
                var attrVal = nodes[i].getAttribute('v-click');
                return _this.$methods[attrVal].bind(_this.$data) // bind是使data的作用域与method函数的作用域保持一致
            })()
        }
        if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')){ // 如果有v-model属性，并且元素是INPUT或者TEXTAREA，我们监听它的input事件
            node.addEventListener('input', (function (key) {
                var attrVal = node.getAttribute('v-model');
                // _this._binding[number]._directives = [一个Watcher实例]
                // 其中Watcher.prototype.update = function (){
                // node[value] = _this.$data[number]; 这就将node的值保持一致
                // }
                _this._binding[attrVal]._directives.push(new Watcher(
                    'input',
                    node,
                    _this,
                    attrVal,
                    'value'
                ))
                return function () {
                    _this.$data[attrVal] = nodes[key].value; // 使number的值与node的value保持一致，已经实现了双向绑定
                }
            })(i))
        }
        if (node.hasAttribute('v-bind')) { // 如果有v-bind属性，我们只要使node的值及时更新为data中的number的值即可
            var attrVal = node.getAttribute('v-bind');
            _this._binding[attrVal]._directives.push(new Watcher(
                'text',
                node,
                _this,
                attrVal,
                'innerHTML'
            ))

        }
    }
}
function Watcher(name, el, vm, exp, attr) { // 指令类Watcher，用来绑定更新函数，实现对DOM元素的更新
    this.name = name; //指令名称，例如文本节点，该值设为"text"
    this.el = el; //指令对应的DOM元素
    this.vm = vm; //指令所属myVue实例
    this.exp = exp; //指令对应的值，本例如"number"
    this.attr = attr; //绑定的属性值，本例为"innerHTML"
    this.update();
}
Watcher.prototype.update = function () {
    this.el[this.attr] = this.vm.$data[this.exp]; // 比如H3.innerHTML=this.data.number;当number改变时，会触发这个update函数，保证对应的DOM内容进行了更新.
}