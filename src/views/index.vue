<template>
	<div class="edu">
		<div class="index_top_nav">
			<van-search placeholder="请输入搜索关键词" v-model="search" />
		</div>
		<!-- <div class="xian4 index_xian4_mt"></div> -->
		<div class="index_content">
			<div class="study_time">STUDY TIME<p>学习打卡记录</p></div>
			<div class="study_day">{{count}}</div>
			<div class="study_day_day">天</div>
			<div class="index_notice"><div v-show="today"><i class="iconfont">&#xe693;</i>今天练题过了(完成)</div><div v-show="!today"><i class="iconfont">&#xe600;</i>今天没有练题(未完成)</div></div>
			<div class="xian4 index_xian4_mt"></div>
			<div class="start_study"><van-button type="primary" @click="$router.push({path:'/question/index'})">开始学习</van-button></div>
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
				search:'',
				active:0,
				count:0,
				today:false,
			}
		},
		methods:{
			barChange:function(e){
				if(e==1){
					this.$toast('暂时没有开放！');
				}
			},
		},
		mounted(){
			var token = localStorage.getItem('edu_token');
      		var isLogin = false;
      		if(!this.$isEmpty(token)){
		        isLogin = true;
		    }
			if(isLogin){
				var _this = this;
				this.$get(this.ROOT_URL + "Edu/index/getSign").then(function(res){
					_this.count = res.data.count;
					_this.today = res.data.today;
					// console.log(res);
				});
			}
		},
	};
</script>

<style>
/*#07c160;*/
.index_top_nav{height: 3.35rem;position: fixed;z-index: 2;top:0;left:0;display: block;width: 100%;line-height: 3.25rem;color:#333;font-size: 16px;background: #f1f1f1;border-bottom: 1px solid #efefef;}
.index_xian4_mt{margin-top: 2.25rem;}
.index_content{margin-top: 3.25rem;background: #fff;}
.index_content:after{content:'';display:block;clear: both;}
.study_time{font-size: 1.75rem;color:#111;font-weight: bold;text-align: center;padding-top: 2.25rem;}
.study_time p{font-size:12px;color:#666;font-weight: normal;}
.study_day{font-size: 4rem;text-align: center;color:#333;line-height: 6rem;}
.study_day_day{text-align: center;color:#333;}
.index_notice{text-align: center;line-height: 4rem;color:#333;}
.index_notice i{margin-right: 0.25rem; }
.start_study button{padding: 0 3.5rem;margin:0 auto;display: block;margin-top: 3rem;}
</style>