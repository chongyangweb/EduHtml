<template>
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  :title="title"
			  left-text="返回"
			  right-text="答题解析"
			  @click-left="$router.go(-1)"
			  @click-right="onClickRight"
			  left-arrow
			/>
		</div>

		<div class="question_content">
			<div class="question_title">
				<div class="question_type" v-if="chose_type==1">单选择</div>
				<div class="question_type" v-if="chose_type>1">多选择</div>
				{{question.title}}
			</div>

			<div class="question_answer">
				<van-checkbox-group v-model="result">
				  <van-checkbox 
				    v-for="(item, index) in answer"
				    :key="item.id"
				    :name="item.id"
				    checked-color="#07c160"
				  >
				    {{index+1}}、 {{ item.title }}
				  </van-checkbox>
				</van-checkbox-group>
			</div>
		</div>

		<div class="question_foot">
			<div class="question_num"><i class="iconfont">&#xeba6;</i>{{sort_now}}/{{question_num}}</div>
			<div class="question_next">确认</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				title:'题目练习',
				checked:false,
				list: [],
				question:{},
				answer:[],
				chose_type:0,// 单选还是多选
				result:[],
				error_num:0,
				sort_now:0,
				question_num:0,

			}
		},
		methods:{
			onClickRight:function(){
				this.$toast('没有开放');
			}
		},
		mounted(){

			// 判断做到第几题
			var sort_now = localStorage.getItem('sort_now');
			var error_num = localStorage.getItem('error_num');
			if(this.$isEmpty(sort_now)){
				localStorage.setItem('sort_now','0');
				localStorage.setItem('error_num','0');
				sort_now = 0;
			}

			var _this = this;

			this.$post(this.ROOT_URL + "Edu/question/getQuestion",{sort_now:sort_now}).then(function(res){
				console.log(res);
				if(res.code == 500){
					_this.$toast({position:'bottom',message:res.message});
				}else if(res.code == 200){
					_this.question = res.data;
					_this.answer = res.data.get_answer;
					_this.question_num = res.data.question_num;

					// 获取答案数量
					for(var i=0;i<_this.answer.length;i++){
						if(_this.answer[i].is_answer == 1){
							_this.chose_type = _this.chose_type+1;
						}
					}
				}
			});
			
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
.question_next{float: right;line-height: 3.25rem;background: #07c160;color:#fff;padding: 0 3rem;font-size: 14px;}
.question_content .van-checkbox{margin-bottom: 1.3rem;}
</style>