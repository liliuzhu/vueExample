webpackJsonp([1],{"4mPi":function(t,s){},"60Fa":function(t,s){},AKNT:function(t,s,e){"use strict";var a=e("NVrd"),i=e("e9KK"),n=e("fJdx"),o=e("43Vb"),r=e.n(o),l={data:function(){return{ratings:[],selectType:{value:2},onlyContent:{value:!1}}},props:{seller:{type:Object,default:function(){return{}}}},mounted:function(){this.getRatingsInfo()},methods:{getRatingsInfo:function(){var t=this;this.custom.hasServe?this.$ajax.get("/api/shop/ratings").then(function(s){s.data.status&&(t.ratings=s.data.body,t.$nextTick(function(){t.scroll=new r.a(t.$refs.ratings,{click:!0})}))}).catch(function(t){console.log("ratings 错误"+t)}):this.$ajax.get("./data.json").then(function(s){s.data.ratings&&(t.ratings=s.data.ratings,t.$nextTick(function(){t.scroll=new r.a(t.$refs.ratings,{click:!0})}))}).catch(function(t){console.log("ratings json 错误"+t)})},changeFilter:function(){var t=this;this.$nextTick(function(){t.scroll.refresh()})},needShow:function(t,s){return!(this.onlyContent.value&&!s)&&(2===this.selectType.value||t===this.selectType.value)}},components:{star:a.a,ratingselect:i.a,split:n.a}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{ref:"ratings",staticClass:"ratings"},[e("div",{staticClass:"ratings-content"},[e("div",{staticClass:"overview"},[e("div",{staticClass:"overview-left"},[e("h1",{staticClass:"score"},[t._v(t._s(t.seller.score))]),t._v(" "),e("div",{staticClass:"title"},[t._v("综合评分")]),t._v(" "),e("div",{staticClass:"rank"},[t._v("高于周边商家"+t._s(t.seller.rankRate))])]),t._v(" "),e("div",{staticClass:"overview-right"},[e("div",{staticClass:"score-wrapper"},[e("span",{staticClass:"title"},[t._v("服务态度")]),t._v(" "),e("div",{staticClass:"star-wrapper"},[e("star",{attrs:{size:36,score:t.seller.serviceScore}})],1),t._v(" "),e("span",{staticClass:"score"},[t._v(t._s(t.seller.serviceScore))])]),t._v(" "),e("div",{staticClass:"score-wrapper"},[e("span",{staticClass:"title"},[t._v("商品评分")]),t._v(" "),e("div",{staticClass:"star-wrapper"},[e("star",{attrs:{size:36,score:t.seller.foodScore}})],1),t._v(" "),e("span",{staticClass:"score"},[t._v(t._s(t.seller.foodScore))])]),t._v(" "),e("div",{staticClass:"delivery-wrapper"},[e("span",{staticClass:"title"},[t._v("送达时间")]),t._v(" "),e("span",{staticClass:"delivery"},[t._v(t._s(t.seller.deliveryTime)+"分钟")])])])]),t._v(" "),e("split"),t._v(" "),e("ratingselect",{attrs:{"select-type":t.selectType,"only-content":t.onlyContent,ratings:t.ratings},on:{changeFilter:t.changeFilter}}),t._v(" "),e("div",{staticClass:"rating-wrapper"},[e("ul",t._l(t.ratings,function(s){return e("li",{directives:[{name:"show",rawName:"v-show",value:t.needShow(s.rateType,s.text),expression:"needShow(rating.rateType,rating.text)"}],staticClass:"rating-item border-bottom"},[e("div",{staticClass:"avatar"},[e("img",{attrs:{src:s.avatar,alt:"头像"}})]),t._v(" "),e("div",{staticClass:"content"},[e("h1",{staticClass:"name"},[t._v(t._s(s.username))]),t._v(" "),e("div",{staticClass:"star-wrapper"},[e("star",{attrs:{size:24,score:s.score}}),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:s.deliveryTime,expression:"rating.deliveryTime"}],staticClass:"delivery"},[t._v(t._s(s.deliveryTime)+"分钟送达")])],1),t._v(" "),e("p",{staticClass:"text"},[t._v(t._s(s.text))]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:s.recommend&&s.recommend.length,expression:"rating.recommend && rating.recommend.length"}],staticClass:"recommend"},[e("span",{staticClass:"icon-thumb_up"}),t._v(" "),t._l(s.recommend,function(s){return e("span",{staticClass:"item"},[t._v(t._s(s))])})],2),t._v(" "),e("div",{staticClass:"time"},[t._v(t._s(t._f("getTimeStr")(s.rateTime,"YYYY-MM-DD hh:mm")))])])])}))])],1)])},staticRenderFns:[]},u=e("VU/8")(l,c,!1,function(t){e("RxYY")},"data-v-c55f723a",null);s.a=u.exports},BEZD:function(t,s){},FWqH:function(t,s){},GG48:function(t,s,e){"use strict";(function(t){var a=e("7+uW"),i=e("/ocq"),n=e("PXOj"),o=e("AKNT"),r=e("N0EE");a.a.use(i.a);var l=new i.a({base:t,routes:[{path:"/goods",name:"goods",component:n.a},{path:"/seller",name:"seller",component:r.a},{path:"/ratings",name:"ratings",component:o.a},{path:"*",redirect:"/goods"}]});s.a=l}).call(s,"/")},L3hN:function(t,s){},N0EE:function(t,s,e){"use strict";var a=e("NVrd"),i=e("fJdx"),n=e("43Vb"),o=e.n(n),r=e("a56X"),l={data:function(){return{favorite:Object(r.b)(this.seller.id,"favorite",!1)}},props:{seller:{type:Object,default:function(){return{}}}},updated:function(){this._initScroll(),this._initPics()},mounted:function(){this._initScroll(),this._initPics()},methods:{toggleFavorite:function(t){t._constructed&&(this.favorite=!this.favorite,Object(r.d)(this.seller.id,"favorite",this.favorite))},_initScroll:function(){var t=this;this.$nextTick(function(){t.scroll?t.scroll.refresh():t.scroll=new o.a(t.$refs.seller,{click:!0})})},_initPics:function(){var t=this;if(this.seller.pics){var s=126*this.seller.pics.length-6;this.$refs.picList.style.width=s+"px",this.$nextTick(function(){t.picScroll?t.picScroll.refresh():t.picScroll=new o.a(t.$refs.picWrapper,{scrollX:!0,eventPassthrough:"verticcal"})})}}},components:{star:a.a,split:i.a}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{ref:"seller",staticClass:"seller"},[e("div",{staticClass:"seller-content"},[e("div",{staticClass:"overview"},[e("div",{staticClass:"desc border-bottom"},[e("div",{staticClass:"title"},[t._v(t._s(t.seller.name))]),t._v(" "),e("div",{staticClass:"star-wrapper"},[e("star",{attrs:{size:36,score:t.seller.score}})],1),t._v(" "),e("span",{staticClass:"text"},[t._v("("+t._s(t.seller.ratingCount)+")")]),t._v(" "),e("span",{staticClass:"text"},[t._v("月售"+t._s(t.seller.sellCount)+"单")])]),t._v(" "),e("ul",{staticClass:"remark"},[e("li",{staticClass:"block"},[e("h2",[t._v("起送价")]),t._v(" "),e("div",{staticClass:"content"},[e("span",{staticClass:"stress"},[t._v(t._s(t.seller.minPrice))]),t._v("元\n                    ")])]),t._v(" "),e("li",{staticClass:"block"},[e("h2",[t._v("商家配送")]),t._v(" "),e("div",{staticClass:"content"},[e("span",{staticClass:"stress"},[t._v(t._s(t.seller.deliveryPrice))]),t._v("元\n                    ")])]),t._v(" "),e("li",{staticClass:"block"},[e("h2",[t._v("平均配送时间")]),t._v(" "),e("div",{staticClass:"content"},[e("span",{staticClass:"stress"},[t._v(t._s(t.seller.deliveryTime))]),t._v("分钟\n                    ")])])]),t._v(" "),e("div",{staticClass:"favorite",on:{click:t.toggleFavorite}},[e("span",{staticClass:"icon-favorite",class:{active:t.favorite}}),t._v(" "),e("span",{staticClass:"text"},[t._v(t._s(t.favorite?"已":"")+"收藏")])])]),t._v(" "),e("split"),t._v(" "),e("div",{staticClass:"bulletin"},[e("h1",{staticClass:"title"},[t._v("公告与活动")]),t._v(" "),e("div",{staticClass:"content-wrapper border-bottom"},[e("p",{staticClass:"content"},[t._v(t._s(t.seller.bulletin))])]),t._v(" "),t.seller.supports?e("ul",{staticClass:"supports"},t._l(t.seller.supports,function(s){return e("li",{staticClass:"support-item border-bottom"},[e("span",{staticClass:"icon",class:"type_"+s.type}),t._v(" "),e("span",{staticClass:"text"},[t._v(t._s(s.description))])])})):t._e()]),t._v(" "),e("split"),t._v(" "),e("div",{staticClass:"pics"},[e("h1",{staticClass:"title"},[t._v("商家实景")]),t._v(" "),e("div",{ref:"picWrapper",staticClass:"pic-wrapper"},[e("ul",{ref:"picList",staticClass:"pic-list"},t._l(t.seller.pics,function(t){return e("li",{staticClass:"pic-item"},[e("img",{attrs:{src:t,alt:"实景"}})])}))])]),t._v(" "),e("split"),t._v(" "),e("div",{staticClass:"info"},[e("h1",{staticClass:"title"},[t._v("商家信息")]),t._v(" "),e("ul",t._l(t.seller.infos,function(s){return e("li",{staticClass:"info-item border-top"},[t._v(t._s(s))])}))])],1)])},staticRenderFns:[]},u=e("VU/8")(l,c,!1,function(t){e("FWqH")},null,null);s.a=u.exports},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("fZjL"),i=e.n(a),n=e("7+uW"),o=e("GG48"),r=e("mtWM"),l=e.n(r),c=e("Dd8w"),u=e.n(c),d=e("NVrd"),v={data:function(){return{detailShow:!1}},props:{seller:{type:Object,required:!0,default:function(){return{}}}},components:{star:d.a}},f={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"header"},[e("div",{staticClass:"background",style:{backgroundImage:"url("+t.seller.avatar+")"}}),t._v(" "),e("div",{staticClass:"content-wrapper"},[e("div",{staticClass:"avatar"},[e("img",{attrs:{src:t.seller.avatar,alt:"logo"}})]),t._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"title"},[e("span",{staticClass:"brand"}),t._v(" "),e("span",{staticClass:"name"},[t._v(t._s(t.seller.name))])]),t._v(" "),e("div",{staticClass:"description"},[t._v("\n                "+t._s(t.seller.description)+"/"+t._s(t.seller.deliveryTime)+"分钟送达\n            ")]),t._v(" "),t.seller.supports?e("div",{staticClass:"support"},[e("span",{staticClass:"icon",class:"type_"+t.seller.supports[0].type}),t._v(" "),e("span",{staticClass:"text"},[t._v(t._s(t.seller.supports[0].description))])]):t._e()]),t._v(" "),t.seller.supports?e("div",{staticClass:"support-count",on:{click:function(s){t.detailShow=!0}}},[e("span",{staticClass:"count"},[t._v(t._s(t.seller.supports.length)+"个")]),t._v(" "),e("i",{staticClass:"icon-keyboard_arrow_right"})]):t._e()]),t._v(" "),e("div",{staticClass:"bulletin-wrapper"},[e("span",{staticClass:"bulletin-title"}),t._v(" "),e("span",{staticClass:"bulletin-text"},[t._v(t._s(t.seller.bulletin))]),t._v(" "),e("i",{staticClass:"icon-keyboard_arrow_right"})]),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.detailShow,expression:"detailShow"}],staticClass:"detail"},[e("div",{staticClass:"detail-wrapper clearfix"},[e("div",{staticClass:"detail-main"},[e("h1",{staticClass:"name"},[t._v(t._s(t.seller.name))]),t._v(" "),e("div",{staticClass:"star-wrapper"},[e("star",{attrs:{size:48,score:t.seller.score}})],1),t._v(" "),e("div",{staticClass:"title"},[e("div",{staticClass:"text"},[t._v("优惠信息")])]),t._v(" "),t.seller.supports?e("ul",{staticClass:"supports"},t._l(t.seller.supports,function(s){return e("li",{staticClass:"support-item"},[e("span",{staticClass:"icon",class:"type_"+s.type}),t._v(" "),e("span",{staticClass:"text"},[t._v(t._s(s.description))])])})):t._e(),t._v(" "),e("div",{staticClass:"title"},[e("div",{staticClass:"text"},[t._v("商家公告")])]),t._v(" "),e("div",{staticClass:"bulletin"},[e("p",{staticClass:"content"},[t._v(t._s(t.seller.bulletin))])])])]),t._v(" "),e("div",{staticClass:"detail-close",on:{click:function(s){t.detailShow=!1}}},[e("i",{staticClass:"icon-close"})])])])],1)},staticRenderFns:[]},p={name:"app",data:function(){return{seller:{id:function(){var t={},s=window.location.search.match(/[?&][^?&]+=[^?&]+/g);return s&&s.forEach(function(s){var e=s.substring(1).split("="),a=decodeURIComponent(e[0]),i=decodeURIComponent(e[1]);t[a]=i}),t}().id}}},components:{"el-header":e("VU/8")(v,f,!1,function(t){e("4mPi")},"data-v-fa915e24",null).exports},mounted:function(){this.getSellerInfo()},methods:{getSellerInfo:function(){var t=this;this.custom.hasServe?this.$ajax.get("/api/shop/seller?id="+this.seller.id).then(function(s){s.data.status&&(t.seller=u()({},s.data.body,t.seller))}).catch(function(t){console.log("seller错误"+t)}):this.$ajax.get("./data.json?id="+this.seller.id).then(function(s){s.data.seller&&(t.seller=u()({},s.data.seller,t.seller))}).catch(function(t){console.log("seller json 错误"+t)})}},watch:{$route:function(){console.log(this.$route.query)}}},h={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("el-header",{attrs:{seller:this.seller}}),this._v(" "),s("ul",{staticClass:"tap border-bottom"},[s("router-link",{staticClass:"tap-item",attrs:{tag:"li",to:"/goods"}},[s("span",[this._v("商品")])]),this._v(" "),s("router-link",{staticClass:"tap-item",attrs:{tag:"li",to:"/ratings"}},[s("span",[this._v("评论")])]),this._v(" "),s("router-link",{staticClass:"tap-item",attrs:{tag:"li",to:"/seller"}},[s("span",[this._v("商家")])])],1),this._v(" "),s("keep-alive",[s("router-view",{attrs:{seller:this.seller}})],1)],1)},staticRenderFns:[]},_=e("VU/8")(p,h,!1,function(t){e("uU/u")},"data-v-2f8f7722",null).exports,C={getTimeStr:function(t,s){if(!isNaN(t)){t=Number(t);var e=new Date(t),a={Y:e.getFullYear(),M:e.getMonth()+1,D:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds()},i=s||"YYYY-MM-DD hh:mm:ss";for(var n in a)if(new RegExp("("+n+"+)","").test(i)){var o="00"+a[n];i=i.replace(RegExp.$1,1===RegExp.$1.length?a[n]:o.substr(o.length-RegExp.$1.length))}return i}return"can't transform time"}};e("dNpK");i()(C).forEach(function(t){n.a.filter(t,C[t])}),n.a.config.productionTip=!1,n.a.prototype.custom={hasServe:!1},n.a.prototype.$ajax=l.a;new n.a({router:o.a,el:"#app",render:function(t){return t(_)}})},NVrd:function(t,s,e){"use strict";var a={data:function(){return{}},props:{size:{type:Number,default:24},score:{type:Number,default:5},num:{type:Number,default:5}},computed:{itemClasses:function(){var t=[],s=Math.ceil(this.num);this.score>=s&&(s=Math.ceil(this.score));for(var e=0;e<Math.floor(this.score);e++)t.push("on");for(this.score<Math.round(this.score)&&t.push("half");t.length<s;)t.push("off");return t}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"star"},t._l(t.itemClasses,function(s){return e("i",{staticClass:"icon",class:["size-"+t.size,s]})}))},staticRenderFns:[]},n=e("VU/8")(a,i,!1,function(t){e("OZ1z")},"data-v-09569f06",null);s.a=n.exports},OZ1z:function(t,s){},PXOj:function(t,s,e){"use strict";var a=e("7+uW"),i=e("43Vb"),n=e.n(i),o=new a.a,r={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]},l=e("VU/8")(o,r,!1,function(t){e("sB6H")},null,null).exports,c={data:function(){return{}},props:{food:{type:Object,default:function(){return{}}}},methods:{addCart:function(t){if(!t._constructed)return 0;this.food.count||0===this.food.count?this.food.count++:a.a.set(this.food,"count",1),l.$emit("cart_add",t.currentTarget)},decreaseCart:function(){if(!event._constructed)return 0;this.food.count&&this.food.count--}}},u={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"cartcontrol"},[e("transition",{attrs:{name:"move"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.food.count>0,expression:"food.count>0"}],staticClass:"cart-decrease",on:{click:function(s){s.stopPropagation(),s.preventDefault(),t.decreaseCart(s)}}},[e("i",{staticClass:"rotate icon-remove_circle_outline"})])]),t._v(" "),e("transition",{attrs:{name:"move"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.food.count>0,expression:"food.count>0"}],staticClass:"cart-count"},[e("span",{staticClass:"rotate"},[t._v(t._s(t.food.count))])])]),t._v(" "),e("div",{staticClass:"cart-add",on:{click:function(s){s.stopPropagation(),s.preventDefault(),t.addCart(s)}}},[e("i",{staticClass:"icon-add_circle"})])],1)},staticRenderFns:[]},d=e("VU/8")(c,u,!1,function(t){e("L3hN")},null,null).exports,v={data:function(){return{balls:[{show:!1},{show:!1},{show:!1},{show:!1},{show:!1},{show:!1},{show:!1},{show:!1},{show:!1},{show:!1}],dropBalls:[],fold:!0,animationClass:!0}},mounted:function(){l.$on("cart_add",this.drap)},beforeDestroy:function(){l.$off("cart_add",this.drap)},components:{cartcontrol:d},computed:{listShow:function(){var t=this;if(!this.totalCount)return this.fold=!1,!1;var s=this.fold;return s&&this.$nextTick(function(){t.scroll?t.scroll.refresh():t.scroll=new n.a(t.$refs.listContent,{click:!0})}),s},totalPrice:function(){var t=0;return this.selectFoods.forEach(function(s){t+=s.price*s.count}),t},totalCount:function(){var t=0;return this.selectFoods.forEach(function(s){t+=s.count}),t},payDesc:function(){if(0===this.totalPrice)return"¥"+this.minPrice+"元起送";if(this.totalPrice<this.minPrice){return"还差¥"+(this.minPrice-this.totalPrice)+"起送"}return"去结算"},payClass:function(){return this.totalPrice<this.minPrice?"not-enough":"enough"}},methods:{pay:function(){this.totalPrice>=this.minPrice&&alert("支付"+this.totalPrice+"元")},empty:function(){this.selectFoods.forEach(function(t){t.count=0})},toggleList:function(){this.totalCount>0&&(this.fold=!this.fold)},drap:function(t){var s=this;this.$nextTick(function(){for(var e=0;e<s.balls.length;e++){var a=s.balls[e];if(!a.show)return a.show=!0,a.el=t,s.dropBalls.push(a),0}})},beforeEnter:function(t){for(var s=this.balls.length;s--;){var e=this.balls[s];if(e.show){var a=e.el.getBoundingClientRect(),i=a.left-25+5,n=-(window.innerHeight-a.top-25-6-10);t.style.display="",t.style.webkitTransform="translate3d(0,"+n+"px,0)",t.style.transform="translate3d(0,"+n+"px,0)";var o=t.getElementsByClassName("inner-hook")[0];o.style.webkitTransform="translate3d("+i+"px,0,0)",o.style.transform="translate3d("+i+"px,0,0)"}}},enter:function(t,s){t.offsetHeight;this.$nextTick(function(){t.style.webkitTransform="translate3d(0,0,0)",t.style.transform="translate3d(0,0,0)";var e=t.getElementsByClassName("inner-hook")[0];e.style.webkitTransform="translate3d(0,0,0)",e.style.transform="translate3d(0,0,0)",t.addEventListener("transitionend",s)})},afterEnter:function(t){var s=this.dropBalls.shift();s.show&&(s.show=!1,t.style.display="none"),this.animationClass=!1},afterLeave:function(t){this.animationClass=!0}},props:{selectFoods:{type:Array,default:function(){return[{price:10,count:1}]}},deliveryPrice:{type:Number,default:0},minPrice:{type:Number,default:0}}},f={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"shopcart"},[e("div",{staticClass:"content",on:{click:t.toggleList}},[e("div",{staticClass:"content-left"},[e("transition",{attrs:{type:"animation",name:"shake"},on:{"after-leave":t.afterLeave}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.animationClass,expression:"animationClass"}],staticClass:"logo-wrapper"},[e("div",{staticClass:"logo",class:{highlight:t.totalCount>0}},[e("i",{staticClass:"icon-shopping_cart"})]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.totalCount>0,expression:"totalCount>0"}],staticClass:"num"},[t._v(t._s(t.totalCount))])])]),t._v(" "),e("div",{staticClass:"price",class:{highlight:t.totalPrice>0}},[t._v("¥ "+t._s(t.totalPrice))]),t._v(" "),e("div",{staticClass:"desc"},[t._v("另需配送费¥ "+t._s(t.deliveryPrice))])],1),t._v(" "),e("div",{staticClass:"content-right"},[e("div",{staticClass:"pay",class:t.payClass,on:{click:function(s){if(!("button"in s)&&t._k(s.keyCode,"preven",void 0,s.key))return null;s.stopPropagation(),t.pay(s)}}},[t._v("\n                "+t._s(t.payDesc)+"\n            ")])])]),t._v(" "),e("transition-group",{staticClass:"ball-container",attrs:{name:"drap",tag:"div"},on:{"before-enter":t.beforeEnter,enter:t.enter,"after-enter":t.afterEnter}},t._l(t.balls,function(t,s){return e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"ball.show"}],key:s,staticClass:"ball"},[e("div",{staticClass:"inner inner-hook"})])})),t._v(" "),e("transition",{attrs:{name:"fold"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.listShow,expression:"listShow"}],staticClass:"shopcart-list"},[e("div",{staticClass:"list-header"},[e("h1",{staticClass:"title"},[t._v("购物车")]),t._v(" "),e("span",{staticClass:"empty",on:{click:t.empty}},[t._v("清空")])]),t._v(" "),e("div",{ref:"listContent",staticClass:"list-content"},[e("ul",t._l(t.selectFoods,function(s){return e("li",{staticClass:"food"},[e("span",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),e("div",{staticClass:"price"},[e("span",[t._v("¥ "+t._s(s.price*s.count))])]),t._v(" "),e("div",{staticClass:"cartcontrol-wrapper"},[e("cartcontrol",{attrs:{food:s}})],1)])}))])])]),t._v(" "),e("transition",{attrs:{name:"mask"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.listShow,expression:"listShow"}],staticClass:"list-mask",on:{click:function(s){t.fold=!1}}})])],1)},staticRenderFns:[]},p=e("VU/8")(v,f,!1,function(t){e("iGkp")},null,null).exports,h=e("fJdx"),_=e("e9KK"),C={data:function(){return{showFlag:!1,selectType:{value:2},onlyContent:{value:!1},desc:{all:"全部",positive:"推荐",negative:"吐槽"}}},props:{food:{type:Object,default:function(){return{}}}},methods:{needShow:function(t,s){return!(this.onlyContent.value&&!s)&&(2===this.selectType.value||t===this.selectType.value)},hide:function(){this.showFlag=!1},show:function(){var t=this;this.showFlag=!0,this.$nextTick(function(){t.scroll?t.scroll.refresh():t.scroll=new n.a(t.$refs.food,{click:!0})})},addFirst:function(t){t._constructed&&(this.count||0===this.food.count?this.food.count++:a.a.set(this.food,"count",1),l.$emit("cart_add",t.target))},changeFilter:function(){var t=this;this.$nextTick(function(){t.scroll.refresh()})}},components:{cartcontrol:d,split:h.a,ratingselect:_.a}},m={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("transition",{attrs:{name:"move"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.showFlag,expression:"showFlag"}],ref:"food",staticClass:"food"},[e("div",{staticClass:"food-content"},[e("div",{staticClass:"image-header"},[e("img",{attrs:{src:t.food.image,alt:"logo"}}),t._v(" "),e("div",{staticClass:"back",on:{click:function(s){s.stopPropagation(),s.preventDefault(),t.hide(s)}}},[e("i",{staticClass:"icon-arrow_lift"})])]),t._v(" "),e("div",{staticClass:"content"},[e("h1",{staticClass:"title"},[t._v(t._s(t.food.name))]),t._v(" "),e("p",{staticClass:"desc"},[t._v(t._s(t.food.description))]),t._v(" "),e("div",{staticClass:"detail"},[e("span",{staticClass:"sell-count"},[t._v("月售"+t._s(t.food.sellCount))]),t._v(" "),e("span",{staticClass:"rating"},[t._v("好评率:"+t._s(t.food.rating))])]),t._v(" "),e("div",{staticClass:"price"},[e("span",{staticClass:"now"},[t._v("¥"+t._s(t.food.price))]),t.food.oldPrice?e("span",{staticClass:"old"},[t._v("¥"+t._s(t.food.oldPrice))]):t._e()]),t._v(" "),e("div",{staticClass:"cartcontrol-wrapper"},[e("cartcontrol",{attrs:{food:t.food}})],1),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.food.count,expression:"!food.count"}],staticClass:"buy",on:{click:function(s){s.stopPropagation(),s.preventDefault(),t.addFirst(s)}}},[t._v("加入购物车")])])],1),t._v(" "),e("split",{directives:[{name:"show",rawName:"v-show",value:t.food.info,expression:"food.info"}]}),t._v(" "),e("article",{directives:[{name:"show",rawName:"v-show",value:t.food.info,expression:"food.info"}],staticClass:"info"},[e("h2",{staticClass:"title"},[t._v("商品介绍")]),t._v(" "),e("p",{staticClass:"text"},[t._v(t._s(t.food.info))])]),t._v(" "),e("split",{directives:[{name:"show",rawName:"v-show",value:t.food.info,expression:"food.info"}]}),t._v(" "),e("div",{staticClass:"rating"},[e("h1",{staticClass:"title"},[t._v("商品评价")]),t._v(" "),e("ratingselect",{attrs:{"select-type":t.selectType,"only-content":t.onlyContent,desc:t.desc,ratings:t.food.ratings},on:{changeFilter:t.changeFilter}}),t._v(" "),e("div",{staticClass:"rating-wrapper"},[e("ul",{directives:[{name:"show",rawName:"v-show",value:t.food.ratings&&t.food.ratings.length,expression:"food.ratings && food.ratings.length"}]},t._l(t.food.ratings,function(s){return e("li",{directives:[{name:"show",rawName:"v-show",value:t.needShow(s.rateType,s.text),expression:"needShow(rating.rateType,rating.text)"}],staticClass:"rating-item border-bottom"},[e("div",{staticClass:"user"},[e("span",{staticClass:"name"},[t._v(t._s(s.username))]),t._v(" "),e("img",{staticClass:"avatar",attrs:{src:s.avatar,alt:""}})]),t._v(" "),e("div",{staticClass:"time"},[t._v(t._s(t._f("getTimeStr")(s.rateTime,"YYYY-MM-DD hh:mm")))]),t._v(" "),e("p",{staticClass:"text"},[e("i",{class:{"icon-thumb_up":0===s.rateType,"icon-thumb_down":1===s.rateType}}),t._v(t._s(s.text)+"\n                            ")])])})),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.food.ratings||!t.food.ratings.length,expression:"!food.ratings || !food.ratings.length"}],staticClass:"no-rating"},[t._v("暂无评价")])])],1)],1)])])},staticRenderFns:[]},g=e("VU/8")(C,m,!1,function(t){e("TZnj")},"data-v-77cbdad9",null).exports,w=e("a56X"),y={data:function(){return{goods:[],listHeight:[],scrollY:0,selectedFood:{}}},created:function(){this.CART_MAP=Object(w.a)(this.seller.id)},mounted:function(){this.getGoodsInfo()},components:{shopcart:p,cartcontrol:d,food:g},computed:{currentIndex:function(){for(var t=0;t<this.listHeight.length;t++){var s=this.listHeight[t],e=this.listHeight[t+1];if(!e||this.scrollY>=s&&this.scrollY<e)return t}return 0},selectFoods:function(){var t=[];return this.goods.forEach(function(s){s.foods.forEach(function(s){s.count&&t.push(s)})}),Object(w.c)(this.seller.id,t),t}},props:{seller:{type:Object,default:function(){return{}}}},methods:{selectFood:function(t,s){if(!s._constructed)return 0;this.selectedFood=t,this.$refs.food.show()},getGoodsInfo:function(){var t=this;this.custom.hasServe?this.$ajax.get("/api/shop/goods").then(function(s){s.data.status&&(t.goods=s.data.body,t.handleData())}).catch(function(t){console.log("goods 错误"+t)}):this.$ajax.get("./data.json").then(function(s){s.data.goods&&(t.goods=s.data.goods,t.handleData())}).catch(function(t){console.log("goods 读取json错误"+t)})},handleData:function(){var t=this;this.goods.forEach(function(s){s.foods.forEach(function(s){t.CART_MAP.forEach(function(t){s.id===t.id&&a.a.set(s,"count",t.count)})})}),this.$nextTick(function(){t._initScroll(),t._calculateHeight()})},selectMenu:function(t,s){if(!s._constructed)return 0;var e=this.$refs.foods_wrapper.getElementsByClassName("food-list-hook")[t];this.foodsScroll.scrollToElement(e,300)},_initScroll:function(){var t=this;this.menuScroll=new n.a(this.$refs.menu_wrapper,{click:!0}),this.foodsScroll=new n.a(this.$refs.foods_wrapper,{probeType:3,click:!0}),this.foodsScroll.on("scroll",function(s){t.scrollY=Math.abs(Math.round(s.y))})},_calculateHeight:function(){var t=this.$refs.foods_wrapper.getElementsByClassName("food-list-hook"),s=0;this.listHeight.push(s);for(var e=0;e<t.length;e++){s+=t[e].clientHeight,this.listHeight.push(s)}}}},b={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"goods"},[e("div",{ref:"menu_wrapper",staticClass:"menu-wrapper"},[e("ul",t._l(t.goods,function(s,a){return e("li",{staticClass:"menu-item",class:{current:t.currentIndex==a},on:{click:function(s){t.selectMenu(a,s)}}},[e("span",{staticClass:"text border-bottom"},[s.type>0?e("span",{staticClass:"icon",class:"type_"+s.type}):t._e(),t._v(t._s(s.name)+"\n                ")])])}))]),t._v(" "),e("div",{ref:"foods_wrapper",staticClass:"foods-wrapper"},[e("section",t._l(t.goods,function(s){return e("dl",{staticClass:"food-list food-list-hook"},[e("dt",{staticClass:"title"},[t._v(t._s(s.name))]),t._v(" "),t._l(s.foods,function(s){return e("dd",{staticClass:"food-item border-bottom",on:{click:function(e){t.selectFood(s,e)}}},[e("div",{staticClass:"icon"},[e("img",{attrs:{src:s.icon,alt:""}})]),t._v(" "),e("div",{staticClass:"content"},[e("h2",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),e("p",{staticClass:"desc"},[t._v(t._s(s.description))]),t._v(" "),e("div",{staticClass:"extra"},[e("span",{staticClass:"count"},[t._v("月售"+t._s(s.sellCount))]),e("span",[t._v("好评率"+t._s(s.rating))])]),t._v(" "),e("div",{staticClass:"price"},[e("span",{staticClass:"now"},[t._v("¥"+t._s(s.price))]),s.oldPrice?e("span",{staticClass:"old"},[t._v("¥"+t._s(s.oldPrice))]):t._e()]),t._v(" "),e("div",{staticClass:"cartcontrol-wrapper"},[e("cartcontrol",{attrs:{food:s}})],1)])])})],2)}))]),t._v(" "),e("shopcart",{ref:"shopcart",attrs:{selectFoods:t.selectFoods,deliveryPrice:t.seller.deliveryPrice,minPrice:t.seller.minPrice}}),t._v(" "),e("food",{ref:"food",attrs:{food:t.selectedFood}})],1)},staticRenderFns:[]},x=e("VU/8")(y,b,!1,function(t){e("60Fa")},null,null);s.a=x.exports},RxYY:function(t,s){},TZnj:function(t,s){},TwRU:function(t,s){},a56X:function(t,s,e){"use strict";s.d=function(t,s,e){var a=window.localStorage._seller_;a?(a=JSON.parse(a))[t]||(a[t]={}):(a={})[t]={},a[t][s]=e,localStorage._seller_=i()(a)},s.b=function(t,s,e){var a=window.localStorage._seller_;return a&&(a=JSON.parse(a)[t])?a[s]||e:e},s.c=function(t,s){var e=window.localStorage._CART_MAP_;(e=e?JSON.parse(e):{})[t]=s,localStorage._CART_MAP_=i()(e)},s.a=function(t){var s=window.localStorage._CART_MAP_;return s?(s=JSON.parse(s)[t])||[]:[]};var a=e("mvHQ"),i=e.n(a)},dNpK:function(t,s){},e9KK:function(t,s,e){"use strict";var a={data:function(){return{}},props:{type:Array,default:function(){return[]},selectType:{type:Object,default:function(){return{value:2}}},onlyContent:{type:Object,default:function(){return{value:!1}}},desc:{type:Object,default:function(){return{all:"全部",positive:"满意",negative:"不满意"}}},ratings:{type:Array,default:function(){return[]}}},computed:{positive:function(){return this.ratings.filter(function(t){return 0===t.rateType})},negative:function(){return this.ratings.filter(function(t){return 1===t.rateType})}},methods:{select:function(t,s){if(!s._constructed)return!1;this.selectType.value=t,this.$emit("changeFilter")},toggleContent:function(t){if(!t._constructed)return!1;this.onlyContent.value=!this.onlyContent.value,this.$emit("changeFilter")}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"ratingselect"},[e("div",{staticClass:"rating-type border-bottom"},[e("span",{staticClass:"block positive",class:{active:2===t.selectType.value},on:{click:function(s){t.select(2,s)}}},[t._v(t._s(t.desc.all)),e("span",{staticClass:"count"},[t._v(t._s(t.ratings.length))])]),t._v(" "),e("span",{staticClass:"block positive",class:{active:0===t.selectType.value},on:{click:function(s){t.select(0,s)}}},[t._v(t._s(t.desc.positive)),e("span",{staticClass:"count"},[t._v(t._s(t.positive.length))])]),t._v(" "),e("span",{staticClass:"block negative",class:{active:1===t.selectType.value},on:{click:function(s){t.select(1,s)}}},[t._v(t._s(t.desc.negative)),e("span",{staticClass:"count"},[t._v(t._s(t.negative.length))])])]),t._v(" "),e("div",{staticClass:"switch",class:{on:t.onlyContent.value},on:{click:t.toggleContent}},[e("span",{staticClass:"icon-check_circle"}),t._v(" "),e("span",{staticClass:"text"},[t._v("只看有内容的评价")])])])},staticRenderFns:[]},n=e("VU/8")(a,i,!1,function(t){e("BEZD")},null,null);s.a=n.exports},fJdx:function(t,s,e){"use strict";var a={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"split"})},staticRenderFns:[]},i=e("VU/8")({data:function(){return{}}},a,!1,function(t){e("TwRU")},null,null);s.a=i.exports},iGkp:function(t,s){},sB6H:function(t,s){},"uU/u":function(t,s){}},["NHnr"]);