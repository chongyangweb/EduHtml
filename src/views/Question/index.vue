<template>
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="题目练习"
			  left-text="返回"
			  right-text="答题解析"
			  left-arrow
			/>
		</div>

		<div class="question_content">
			<div class="question_title">
				<div class="question_type">单选择</div>
				驾驶这种机动车路上行驶有没有违法行为产生。
			</div>

			<div class="question_answer">
				<van-checkbox-group v-model="result">
				  <van-checkbox 
				    v-for="(item, index) in list"
				    :key="item"
				    :name="item"
				    checked-color="#07c160"
				  >
				    复选框 {{ item }}
				  </van-checkbox>
				</van-checkbox-group>
			</div>
		</div>

		<div class="question_foot">
			<div class="question_num"><i class="iconfont">&#xeba6;</i>12/45</div>
			<div class="question_next">确认，下一题</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				checked:false,
				list: ['a', 'b', 'c'],
				result:[],
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
.question_content .van-checkbox{margin-bottom: 1.3rem;}
</style>