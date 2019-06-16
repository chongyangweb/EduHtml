<template>
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="答题结果"
			  left-text="返回"
			  right-text="首页"
			  @click-left="$router.push({path:'/'})"
			  @click-right="$router.push({path:'/'})"
			  left-arrow
			/>
		</div>

		<div class="index_content">
			<div class="study_time">STUDY SUCCESS<p>今日答题完成！</p></div>
			<div class="study_day">0.01</div>
			<div class="study_day_day">活跃度</div>
			<div class="index_notice"><div><i class="iconfont">&#xe693;</i>今天练题过了(完成) 一共做错了（{{error_num}} 道）</div></div>
			<div class="xian4 index_xian4_mt"></div>
			<div class="start_study"><van-button type="primary" @click="$router.push({path:'/'})">返回首页</van-button></div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				error_num:0,
			}
		},
		mounted(){
			var _this = this;
			// 判断做到第几题
			var error_sort_now = localStorage.getItem('error_sort_now');
			var error_error_num = localStorage.getItem('error_error_num');
			var error_list = localStorage.getItem('error_list');
			this.error_num = error_error_num;
			this.$post(this.ROOT_URL + "Edu/question/getQuestionError",{error_sort_now:error_sort_now,error_error_num:error_error_num,error_list:error_list}).then(function(res){
				if(res.code == 202){
					localStorage.setItem('sort_now',0);
					localStorage.setItem('error_num',0);
					localStorage.setItem('error_list','');
				}
			});
		}
	}
</script>