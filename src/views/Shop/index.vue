<template>
	
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="青梧书院"
			  left-text="返回"
			  right-text="首页"
			  @click-left="$router.push({path:'/shop/index/28'})"
			  @click-right="$router.push({path:'/shop/index/28'})"
			  left-arrow
			/>
		</div>


		<div class="goods_list">
			<div v-for="v in goodsList" >
				<van-card  @click="go_goods_info(v.id)"
				  :price="v.get_sku != null?v.get_sku.price:v.price"
				  :desc="v.sub_title"  
				  :title="v.title"
				  :thumb="v.images.split(',')[0]"
				/>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				goodsList:[],
			}
		},
		methods:{
			getGoodsList:function(){
				var _this = this;
				var dealer = this.$route.params.dealer;
				this.$post(this.ROOT_URL + "Shop/getGoodsList",{dealer:dealer,goods_cat:0}).then(function(res){
					_this.goodsList = res.data;
				});
			},
			go_goods_info:function(id){
				this.$router.push({path:'/shop/goods_info/'+id})
			}

		},
		mounted(){
			this.getGoodsList();
		},
	};
</script>

<style>
.goods_list{margin-top: 0.5rem;}
</style>