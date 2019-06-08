<template>
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="题目练习"
			  left-text="返回"
			  right-text="下一题"
			  left-arrow
			/>
		</div>

		<div class="question_content">
			<div class="question_title">
				<div class="question_type">选择</div>
				驾驶这种机动车路上行驶有没有违法行为产生。
			</div>

			<div class="question_answer">
				<van-checkbox v-model="checked" checked-color="#07c160">复选框</van-checkbox>
				<van-checkbox v-model="checked" checked-color="#07c160">复选框</van-checkbox>
				<van-checkbox v-model="checked" checked-color="#07c160">复选框</van-checkbox>
				<van-checkbox v-model="checked" checked-color="#07c160">复选框</van-checkbox>
			</div>
		</div>

		<div class="question_foot">
			<div class="question_num"><i class="iconfont">&#xeba6;</i>12/45</div>
			<div class="question_next">答题解析</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				checked:false,
			}
		},
	};
</script>

<style>
.question_top .van-nav-bar__text{color:#333;}
.question_top .van-nav-bar .van-icon{color:#333;}
.question_type{margin-right: 0.25rem;font-size: 12px;color:#fff;background: #07c160;display: inline-block;padding: 0.1rem 0.25rem;line-height: 18px;border-radius: 3px;float: left;margin-top: 0.25rem;}
.question_content{padding: 0 1rem;margin-top: 1rem;}
.question_title{font-size: 16px;line-height: 2rem;}
.question_answer{margin-top: 2rem;}
.question_foot{position: fixed;bottom: 0;width: 100%;height: 3.25rem;border-top: 1px solid #efefef;}
.question_num{float: left;line-height: 3.25rem;font-size: 16px;color:#333;}
.question_num i{margin-right: 0.25rem;margin-left: 1rem;}
.question_next{float: right;line-height: 3.25rem;background: #07c160;color:#fff;padding: 0 3rem;}
</style>