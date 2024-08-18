"use strict";(self["webpackChunkshopping"]=self["webpackChunkshopping"]||[]).push([[969],{9326:function(t,a,s){s.d(a,{A:function(){return r}});var e=function(){var t=this,a=t._self._c;return a("div",[a("button",{staticClass:"count-btn1",on:{click:function(a){return t.handleSub()}}},[t._v("-")]),a("input",{staticClass:"int",attrs:{type:"text"},domProps:{value:t.value},on:{change:t.handleChange}}),a("button",{staticClass:"count-btn2",on:{click:function(a){return t.handleAdd()}}},[t._v("+")])])},n=[],o={name:"CountPage",props:{value:{type:Number,default:1}},methods:{handleSub(){this.value<=1||this.$emit("input",this.value-1)},handleAdd(){this.$emit("input",this.value+1)},handleChange(t){const a=+t.target.value;isNaN(a)||a<1?t.target.value=this.value:this.$emit("input",a)}}},i=o,l=s(1656),c=(0,l.A)(i,e,n,!1,null,"240d94e2",null),r=c.exports},969:function(t,a,s){s.r(a),s.d(a,{default:function(){return v}});s(4114);var e=function(){var t=this,a=t._self._c;return a("div",{staticClass:"goods"},[a("van-nav-bar",{attrs:{"v-model":t.goodsId,title:"商品详情页","left-arrow":""},on:{"click-left":function(a){return t.$router.push("/searchList")}}}),a("van-swipe",{attrs:{autoplay:2e3},on:{change:function(a){return t.onChange()}}},t._l(t.images,(function(s,e){return a("van-swipe-item",{key:e},[a("img",{staticClass:"imgUrl",attrs:{src:s.external_url}}),a("span",{staticClass:"page"},[t._v(t._s(t.page)+" / "+t._s(t.images.length))])])})),1),a("div",{staticClass:"price"},[a("span",{staticClass:"min"},[t._v("￥"+t._s(t.detail.goods_price_min))]),a("span",{staticClass:"max"},[t._v("￥"+t._s(t.detail.line_price_max))]),a("span",{staticClass:"sales"},[t._v("已售"+t._s(t.detail.goods_sales)+"件")])]),a("p",{staticClass:"name"},[t._v(t._s(t.detail.goods_name))]),a("p",{staticClass:"icon"},[a("van-icon",{attrs:{name:"passed"}}),t._v(" 七天无理由退货 "),a("van-icon",{attrs:{name:"passed"}}),t._v(" 48小时发货 "),a("van-icon",{attrs:{name:"arrow"}})],1),a("p",{staticClass:"p"},[a("span",[t._v("商品评价("+t._s(t.total)+"条)")]),a("span",{staticClass:"p_sp"},[t._v(" 查看更多 "),a("van-icon",{attrs:{name:"arrow"}})],1)]),a("div",{staticClass:"ul"},t._l(t.commentList,(function(s){return a("ul",{key:s.comment_id},[a("li",[a("img",{staticClass:"defaultImg",attrs:{src:s.user.avatar_url||t.defaultImg}}),a("span",{staticClass:"li_sp"},[t._v(t._s(s.user.nick_name))]),a("van-rate",{attrs:{size:"16px",gutter:"2px",value:s.score/2,count:6,color:"#ffd21e","void-color":"#fed"}}),a("p",[t._v(t._s(s.content))]),a("p",{staticClass:"p2"},[t._v(t._s(s.create_time))])],1)])})),0),a("div",{staticClass:"content",domProps:{innerHTML:t._s(t.detail.content)}}),a("van-tabbar",{attrs:{"active-color":"black","inactive-color":"black",route:"",fixed:""}},[a("van-tabbar-item",{attrs:{icon:"wap-home-o",to:"/first"}},[t._v("首页")]),a("van-tabbar-item",{staticClass:"shopping-cart",attrs:{icon:"shopping-cart-o",to:"/shopping"}},[t._v("购物车")]),t.cartTotal>0?a("p",{staticClass:"cart"},[t._v(t._s(t.cartTotal))]):t._e(),a("button",{staticClass:"btn1",on:{click:function(a){return t.addFn()}}},[t._v("加入购物车")]),a("button",{staticClass:"btn2",on:{click:function(a){return t.buyFn()}}},[t._v("立即购买")])],1),a("van-action-sheet",{attrs:{title:"cart"===t.mode?"加入购物车":"立即购买"},model:{value:t.showPannel,callback:function(a){t.showPannel=a},expression:"showPannel"}},[a("div",{staticClass:"sheet"},[a("img",{staticClass:"sheetImg",attrs:{src:t.detail.goods_image}}),a("p",{staticClass:"sheet-p1"},[a("span",[t._v("￥")]),t._v(t._s(t.detail.goods_price_min))]),a("p",{staticClass:"sheet-p2"},[t._v("库存"+t._s(t.detail.stock_total))]),a("div",{staticClass:"count"},[a("span",[t._v("数量")]),a("CountBox",{staticClass:"count-box",model:{value:t.addCount,callback:function(a){t.addCount=a},expression:"addCount"}})],1),a("div",{staticClass:"stock"},[t.detail.stock_total>0?a("div",{on:{click:function(a){return t.addCart()}}},["cart"===t.mode?a("button",{staticClass:"btn-sheet1"},[t._v("加入购物车")]):a("button",{staticClass:"btn-sheet2",on:{click:function(a){return t.goBuyNow()}}},[t._v("立即购买")])]):a("div",{staticClass:"none"},[t._v("该商品已售完")])])])])],1)},n=[],o=(s(9704),s(1981)),i=s(7867),l="data:image/webp;base64,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",c=s(9326),r=s(9652),d=(s(2427),s(5240)),u={created(){},data(){return{}},methods:{loginConfirm(){return!this.$store.getters.token&&(d.A.confirm({title:"温馨提示",message:"此时需要先登录才能继续操作哟！",confirmButtonText:"去登录",cancelButtonText:"再逛逛"}).then((()=>{this.$router.replace({path:"/login",query:{backUrl:this.$route.fullPath}})})).catch((()=>{})),!0)}}},g={name:"GoodsPage",mixins:[u],data(){return{detail:{},images:[],page:1,total:0,commentList:[],defaultImg:l,showPannel:!1,mode:"cart",addCount:1,cartTotal:0}},computed:{goodsId(){return this.$route.params.id}},created(){this.getDetail(),this.getComments()},methods:{onChange(){this.page+=1,this.page>this.images.length&&(this.page=1)},async getDetail(){const{data:{detail:t}}=await(0,i.B7)(this.goodsId);this.detail=t,this.images=t.goods_images},async getComments(){const{data:{list:t,total:a}}=await(0,i.Yv)(this.goodsId,5);this.commentList=t,this.total=a},addFn(){this.mode="cart",this.showPannel=!0},buyFn(){this.mode="buyNow",this.showPannel=!0},async addCart(){if(this.loginConfirm())return;const{data:t}=await(0,r.U4)(this.goodsId,this.addCount,this.detail.skuList[0].goods_sku_id);this.cartTotal=t.cartTotal,(0,o.A)("加入购物车"),this.showPannel=!1,console.log(this.cartTotal)},goBuyNow(){this.loginConfirm()||this.$router.push({path:"/pay",query:{mode:"buyNow",goodsId:this.goodsId,goodsSkuId:this.detail.skuList[0].goods_sku_id,goodsNum:this.addCount}})}},components:{CountBox:c.A}},p=g,h=s(1656),m=(0,h.A)(p,e,n,!1,null,"63eb88ba",null),v=m.exports},7867:function(t,a,s){s.d(a,{B7:function(){return o},Cd:function(){return n},Yv:function(){return i}});var e=s(5720);const n=t=>{const{categoryId:a,goodsName:s,page:n}=t;return e.A.get("/goods/list",{params:{categoryId:a,goodsName:s,page:n}})},o=t=>e.A.get("/goods/detail",{params:{goodsId:t}}),i=(t,a)=>e.A.get("/comment/listRows",{params:{goodsId:t,limit:a}})}}]);
//# sourceMappingURL=969.0afc7b72.js.map