<template>
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="送货地址"
			  left-text="返回"
			  right-text="首页"
			  @click-left="$router.go(-1)"
			  @click-right="$router.push({path:'/shop/index/28'})"
			  left-arrow
			/>
		</div>
		<div class="address">
			<van-address-edit
			  :area-list="areaList"
			  show-postal
			  show-search-result
			  @save="onSave"
			/>
		</div>
	</div>
</template>

<script>
import AreaList from './area';
export default {
	data(){
		return{
			chosenAddressId: '1',
			list:[],
			areaList:AreaList,
		}
	},
	methods:{
		onSave:function(e){
			console.log(e);
			var _this = this;
			this.$post(this.ROOT_URL + "Shop/addGoodsAddress",{name:e.name,phone:e.tel,zip_code:e.postalCode,province:e.province,city:e.city,region:e.county,address:e.addressDetail}).then(function(res){
				if(res.code == 200){
					// _this.$toast({position:'bottom',message:'添加成功！'});
					_this.$router.go(-1);
				}
			});
		},
	},
	mounted(){
		var _this = this;
		this.$get(this.ROOT_URL + "Shop/getGoodsAddress").then(function(res){
			for(var i=0;i<res.data.length;i++){
				_this.list.push({id:res.data[i].id,name:res.data[i].name,tel:res.data[i].phone,address:res.data[i].province+res.data[i].city+res.data[i].region+res.data[i].address});
			}
		});
	},
};
</script>