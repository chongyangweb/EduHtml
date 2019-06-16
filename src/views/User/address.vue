<template>
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="送货地址"
			  left-text="返回"
			  right-text="首页"
			  @click-left="$router.go(-1)"
			  @click-right="$router.push({path:'/'})"
			  left-arrow
			/>
		</div>
		<div class="address">
			<van-address-list
			  v-model="chosenAddressId"
			  :list="list"
			  :area-list="areaList"
			  @add="onAdd"
			  @edit="onEdit"
			  @select="onSelect"
			/>
		</div>
	</div>
</template>

<script>

export default {
	data(){
		return{
			chosenAddressId: '2',
			list:[],
		}
	},
	methods:{
		onAdd:function(){
			this.$router.push({path:'/shop/add_address'});
		},
		onEdit:function(){
			this.$toast('不支持修改！');
		},
		onSelect:function(i,e){
			var _this = this;
			this.$post(this.ROOT_URL + "Shop/defaultGoodsAddress",{id:i.id}).then(function(res){
				if(res.code==200){
					_this.$toast('修改成功！');
					_this.getList();
				}
			});
		},
		getList:function(){
			var _this = this;
			this.$get(this.ROOT_URL + "Shop/getGoodsAddress").then(function(res){
				_this.list = [];
				for(var i=0;i<res.data.length;i++){
					_this.list.push({id:res.data[i].id,name:res.data[i].name,tel:res.data[i].phone,address:res.data[i].province+res.data[i].city+res.data[i].region+res.data[i].address});
					if(res.data[i].is_default == 1){
						_this.chosenAddressId = res.data[i].id;
					}
				}
			});
		},
	},
	mounted(){
		this.getList();
	},
};
</script>