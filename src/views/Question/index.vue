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
			</div>
		</div>
		
	</div>
</template>

<style>
.question_top .van-nav-bar__text{color:#333;}
.question_top .van-nav-bar .van-icon{color:#333;}
.question_type{margin-right: 0.25rem;font-size: 12px;color:#fff;background: #07c160;display: inline-block;padding: 0.1rem 0.25rem;line-height: 18px;border-radius: 3px;float: left;margin-top: 0.25rem;}
.question_content{padding: 0 1rem;margin-top: 1rem;}
.question_title{font-size: 16px;line-height: 2rem;}
</style>