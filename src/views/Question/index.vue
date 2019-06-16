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
			<div class="question_material" style="margin-bottom: 2rem;" v-show="question.material_id>0" v-html="'<div style=\'background:#f56c6c;color:#fff;display:inline-block;padding:0.2rem 0.5rem;border-radius:3px;\'>材料</div><br />'+material_content">

			</div>
			<div class="question_title">
				<div class="question_type" v-if="chose_type==1">单选择</div>
				<div class="question_type" v-if="chose_type>1">多选择</div>
				{{question.title}}
			</div>

			<div class="question_answer" >
				<van-checkbox-group v-model="result" @change="checkbox_group_change" v-if="chose_type>1">
				  <van-checkbox 
				    v-for="(item, index) in answer"
				    :key="item.id"
				    :name="item.id"
				    checked-color="#07c160"
				    :disabled="is_disabled"
				  >
				    {{$choseWord(index)}}、 {{ item.title }}
				  </van-checkbox>
				</van-checkbox-group>

				<van-radio-group v-model="radio" v-if="chose_type==1" @change="checkbox_group_change">
				  <van-radio :disabled="is_disabled" v-for="(v,k) in answer" :name="v.id" checked-color="#07c160">{{$choseWord(k)}}、{{v.title}}</van-radio>
				</van-radio-group>
			</div>
		</div>

		<div class="question_foot">
			<div class="question_num"><i class="iconfont">&#xeba6;</i>{{sort_now}}/{{question_num}}</div>
			<div class="question_next" @click="confirm_question" v-show="is_confirm_question">确认</div>
			<div class="question_next" @click="next_question" v-show="!is_confirm_question">下一题</div>
		</div>

		<!-- 答案解析 -->
		<van-actionsheet v-model="analysis_show" title="答题解析">
		  <p style="padding:1rem;" v-html="question.analysis"></p>
		</van-actionsheet>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				title:'题目练习',
				checked:false,
				analysis_show:false,
				list: [],
				question:{},
				answer:[],
				chose_type:0,// 单选还是多选
				result:[],
				error_num:0,
				sort_now:0,
				question_num:0,
				radio:null,
				is_error:0,
				is_confirm_question:true,
				is_disabled:false,
				material:{},
				material_content:'',

			}
		},
		methods:{
			onClickRight:function(){
				this.analysis_show=true;
			},
			checkbox_group_change:function(e){
				// console.log(Array.isArray(e));
				// console.log(Array.isArray(this.result));
				if(!Array.isArray(e)){
					this.result.push(e);
				}

			},
			confirm_question:function(){
				var _this = this;
				var real_answer = [];
				for(var i=0;i<this.answer.length;i++){
					if(this.answer[i].is_answer == 1){
						real_answer.push(this.answer[i].id);
					}
				}

				var is_true_question=0;
				for(var i=0;i<real_answer.length;i++){
					for(var a=0;a<this.result.length;a++){
						console.log(real_answer[i],this.result[a])
						if(real_answer[i] == this.result[a]){
							is_true_question = is_true_question+1;
						}
					}
				}
				
				// console.log(is_true_question,real_answer.length);
				if(is_true_question != real_answer.length){
					this.is_error = 1;
				}

				if(this.is_error == 1){
					
					this.$toast('错了！');
				}else{
					this.$toast('对了！');
				}

				this.is_confirm_question = false;
				this.is_disabled = true;
				
				
			},
			next_question:function(){
				var sort_now = localStorage.getItem('sort_now');
				var error_num = localStorage.getItem('error_num');
				localStorage.setItem('sort_now',parseInt(sort_now)+1);
				localStorage.setItem('error_num',parseInt(error_num)+parseInt(this.is_error));

				// 加入错题本
				if(this.is_error==1){
					this.$post(this.ROOT_URL + "Edu/question/add_error_question",{question_id:this.question.id}).then(function(res){});
				}

				if(this.question_num == localStorage.getItem('sort_now')){
					this.$router.push({path:'/question/question_success'});
				}else{
					this.$router.go(0);
				}
				
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

			this.sort_now = sort_now;

			var _this = this;

			this.$post(this.ROOT_URL + "Edu/question/getQuestion",{sort_now:sort_now,error_num:error_num}).then(function(res){
				console.log(res);
				if(res.code == 500){
					_this.$toast({position:'bottom',message:res.message});
					_this.$router.push({path:'/'});
				}else if(res.code == 200){
					_this.question = res.data;
					_this.answer = res.data.get_answer;
					_this.question_num = res.data.question_num;
					_this.material = res.data.get_material;
					if(res.data.material_id>0){
						_this.material_content = res.data.get_material.content;
					}

					// 获取答案数量
					for(var i=0;i<_this.answer.length;i++){
						if(_this.answer[i].is_answer == 1){
							_this.chose_type = _this.chose_type+1;
						}
					}
				}else if(res.code == 201){
					_this.$toast('恭喜您，刷完所有题目，获得新的成就！');
					_this.$router.push({path:'/'});
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
.question_answer{margin-top: 2rem;margin-bottom: 5rem;}
.question_foot{position: fixed;bottom: 0;width: 100%;height: 3.25rem;border-top: 1px solid #efefef;background: #fff;}
.question_num{float: left;line-height: 3.25rem;font-size: 16px;color:#333;}
.question_num i{margin-right: 0.25rem;margin-left: 1rem;}
.question_next{float: right;line-height: 3.25rem;background: #07c160;color:#fff;padding: 0 3rem;font-size: 14px;}
.question_content .van-checkbox{margin-bottom: 1.3rem;}
.question_content .van-radio{margin-bottom: 1.3rem;}
</style>