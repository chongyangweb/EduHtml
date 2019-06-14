<template>
	<div class="edu">
		<div class="index_content">
			<div class="study_time">STUDY SUCCESS<p>今日答题完成！</p></div>
			<div class="study_day">0.01</div>
			<div class="study_day_day">活跃度</div>
			<div class="index_notice"><div><i class="iconfont">&#xe693;</i>今天练题过了(完成)</div></div>
			<div class="xian4 index_xian4_mt"></div>
			<div class="start_study"><van-button type="primary" @click="$router.push({path:'/'})">返回首页</van-button></div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{

			}
		},
		mounted(){
			var _this = this;
			// 判断做到第几题
			var sort_now = localStorage.getItem('sort_now');
			var error_num = localStorage.getItem('error_num');
			this.$post(this.ROOT_URL + "Edu/question/getQuestion",{sort_now:sort_now,error_num:error_num}).then(function(res){
				if(res.code == 202){
					localStorage.setItem('sort_now',0);
					localStorage.setItem('error_num',0);
				}
			});
		}
	}
</script>