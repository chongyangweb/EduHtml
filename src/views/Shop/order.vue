<template>
	
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="商品详情"
			  left-text="返回"
			  right-text="首页"
			  @click-left="$router.go(-1)"
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
			<div class="goods_info_title">购买数量:{{value}}<br></div>
			<div class="xian4"></div>
			<div class="goods_content">
				<div class="goods_content_title">发货地址</div>
				<br>
				<div class="van-cell__value van-cell__value--alone van-address-item__value" style="text-align:center;"><div class="van-radio"><div class="van-radio__icon van-radio__icon--round"></div><span class="van-radio__label"><div class="van-address-item__name">{{list.name}}，{{list.phone}}</div><div class="van-address-item__address">{{list.province+list.city+list.region+list.address}}</div></span></div></div>
			</div>
		</div>
		
		<div class="goods_info_foot">
			<van-submit-bar
			  :price="price"
			  button-text="提交订单"
			  @submit="onSubmit"
			/>
		</div>

		
	</div>
</template>

<script>
	function onBridgeReady(ress){
	   WeixinJSBridge.invoke(
	      'getBrandWCPayRequest', {
	         "appId":ress.appId,     //公众号名称，由商户传入     
	         "timeStamp":ress.timeStamp,         //时间戳，自1970年以来的秒数     
	         "nonceStr":ress.nonceStr, //随机串     
	         "package":ress.package,     
	         "signType":ress.signType,         //微信签名方式：     
	         "paySign":ress.paySign //微信签名 
	      },
	      function(res){
	      if(res.err_msg == "get_brand_wcpay_request:ok" ){
	      // 使用以上方式判断前端返回,微信团队郑重提示：
	            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
	      } 
	   }); 
	}
	
	export default {
		data(){
			return{
				goodsInfo:[],
				showBase:false,
				images:[],
				value:'',
				chosenAddressId:'0',
				list:{},
				price:0,
				order_list:[],
				goods_list:[],
			}
		},
		methods:{
			getGoodsList:function(){
				var _this = this;
				var dealer = this.$route.params.dealer;
				this.$post(this.ROOT_URL + "Shop/getGoodsInfo",{id:this.$route.params.id}).then(function(res){
					console.log(res);
					_this.goodsInfo = res.goods_info;
					_this.images = (_this.goodsInfo.images).split(',');
				});
			},
			onSubmit:function(){
				var _this = this;
				this.goods_list['buy_num'] = this.value;
				this.goods_list['price'] = this.price/100;
				this.goods_list['goods_id'] = this.goodsInfo['id'];
				this.goods_list['goods_info'] = this.goodsInfo;
				this.$post(this.ROOT_URL + "Shop/addOrder",{goods_list:[this.goods_list],address:this.list.address,province:this.list.province,city:this.list.city,region:this.list.region,receive_name:this.list.name,receive_tel:this.list.phone,buy_num:this.value,price:this.price/100}).then(function(res){
					if(res.code == 200){
						_this.$toast.success('订单成功！');
						_this.order_list = res.data;
						_this.pay();
					}else{
						_this.$toast.error('订单提交异常！');
					}

				});
			},
			pay:function(){
				var _this = this;
				this.$post(this.ROOT_URL + "Shop/pay",{is_mobile:3,pay_type:1,balance:0,total_price:this.price/100,order:this.order_list}).then(function(res){
						console.log(res);
						onBridgeReady(res);
				});
			},

		},
		mounted(){
			this.goodsInfo = this.$route.params.goods_info.goods_info;
			this.images = (this.goodsInfo.images).split(',');;
			this.value = this.$route.params.goods_info.buy_num;
			this.price = this.$route.params.goods_info.buy_num*this.$route.params.goods_info.price*100;

			var _this = this;
			this.$get(this.ROOT_URL + "Shop/getGoodsAddress").then(function(res){
				if(res.data.length<=0){
					_this.$toast('请先前往个人中心设置送货地址！');
					_this.$router.push({path:'/shop/address'});
				}else{
					for(var i=0;res.data.length;i++){
						if(res.data[i].is_default==1){
							_this.list = res.data[i];
						}
					}
				}
			});
			if (typeof WeixinJSBridge == "undefined"){
			   if( document.addEventListener ){
			       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			   }else if (document.attachEvent){
			       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			   }
			}else{
			   onBridgeReady();
			}
			// this.getGoodsList();
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