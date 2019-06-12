<template>
	<div class="edu">
		<div class="index_top_nav">
			<van-search placeholder="请输入搜索关键词" v-model="search" />
		</div>
		<!-- <div class="xian4 index_xian4_mt"></div> -->
		<div class="index_content">
			<div class="study_time">STUDY TIME<p>学习打卡记录</p></div>
			<div class="study_day">0</div>
			<div class="study_day_day">天</div>
			<div class="index_notice"><i class="iconfont">&#xe600;</i>今天还有任务(未完成)</div>
			<div class="xian4 index_xian4_mt"></div>
			<div class="start_study"><van-button type="primary">开始学习</van-button></div>
		</div>

		<van-tabbar v-model="active" active-color="#07c160" route @change="barChange">
		  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
		  <van-tabbar-item icon="smile-comment-o">校言</van-tabbar-item>
		  <van-tabbar-item icon="friends-o" to="/user/index">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				is_open:true,
			}
		},
		mounted(){
			

			var _this = this;
			var openid = this.$route.params.openid;
	    	this.$post(this.ROOT_URL + "Edu/wechat/getLogin",{username:openid.substr(0,15),password:openid}).then(function(res){
	    		var toast1  = _this.$toast.loading({
				  mask: _this.is_open,
				  duration:0,
				  message: '微信登陆中...'
				});
	    		if(res.code == 200){
	    			localStorage.setItem('edu_token',res.token);
	    			toast1.clear();
	    			_this.$router.push({name:'home'});
	    		}
	    	});
		}
		
	};
</script>