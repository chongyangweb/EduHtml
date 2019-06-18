<template>
	
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="商品详情"
			  left-text="返回"
			  right-text="首页"
			  @click-left="$router.push({path:'/shop/index/28'})"
			  @click-right="$router.push({path:'/shop/index/28'})"
			  left-arrow
			/>
		</div>


		<div class="goods_info">
			<van-swipe :autoplay="3000" indicator-color="white">
			  <van-swipe-item v-for="v in images"><img :src="v" height="200px;" width="100%"></van-swipe-item>
			</van-swipe>

			<div class="goods_info_title">{{goodsInfo.title}}</div>
			<div class="goods_info_price">￥ {{goodsInfo.price}}</div>
			<div class="goods_info_title">购买数量<van-stepper v-model="value" /><br></div>
			<div class="xian4"></div>
			<div class="goods_content">
				<div class="goods_content_title">详情介绍</div>
				<div class="detail" v-html="goodsInfo.content"></div>
			</div>
		</div>
		
		<div class="goods_info_foot">
			<van-goods-action>
			  <van-goods-action-big-btn
			    primary
			    text="立即购买"
			    @click="onClickBigBtn"
			  />
			</van-goods-action>
		</div>

		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				goodsInfo:[],
				showBase:false,
				images:[],
				value:'',
			}
		},
		methods:{
			getGoodsList:function(){
				if(this.$isEmpty(this.$route.params.id)){
					this.$toast("异常处理！");
					return;
				}
				var _this = this;
				var dealer = this.$route.params.dealer;
				this.$post(this.ROOT_URL + "Shop/getGoodsInfo",{id:this.$route.params.id}).then(function(res){
					// console.log(res);
					_this.goodsInfo = res.goods_info;
					_this.images = (_this.goodsInfo.images).split(',');
				});
			},
			onClickBigBtn:function(){
				var goods_info = {goods_info:this.goodsInfo,buy_num:this.value,price:this.goodsInfo.price}
				 this.$router.push({name:'shop_order',params:{goods_info:goods_info}});
			},

		},
		mounted(){
			this.getGoodsList();
		},
	};
</script>

<style>
.goods_list{margin-top: 0.5rem;}
.goods_info_title{line-height: 2rem;font-size: 14px;text-align: center;}
.goods_info_price{color:red;font-size:14px;text-align: center;margin-bottom: 1rem;}
.goods_content{margin-top:1rem;}
.goods_content_title{text-align: center;font-size:14px;}
.detail{padding: 1rem;}
</style>