<template>
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="试卷"
			  left-text="返回"
			  right-text="确认"
			  @click-left="$router.go(-1)"
			  @click-right="onClickRight"
			  left-arrow
			/>
		</div>

		<div class="main_content">
			<div class="user_paper_list">
				<div class="xian4"></div>
				<ul>
					<li>
						<div class="paper_btn"><van-button type="primary" size="small ">开始考试</van-button></div>
						<div class="paper_rand"><i class="icon iconfont">&#xe621;</i></div>
						<div class="paper_title">我是今天的考卷！</div>
						<div class="xian4"></div>
					</li>

					<li>
						<div class="paper_btn"><van-button type="primary" size="small ">开始考试</van-button></div>
						<div class="paper_rand"><i class="icon iconfont">&#xe621;</i></div>
						<div class="paper_title">我是今天的考卷！</div>
						<div class="xian4"></div>
					</li>

					<li>
						<div class="paper_btn"><van-button type="primary" size="small ">开始考试</van-button></div>
						<div class="paper_rand"><i class="icon iconfont">&#xe621;</i></div>
						<div class="paper_title">我是今天的考卷！</div>
						<div class="xian4"></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
		
			}
		},
		methods:{
			
			
		},
		mounted(){
			var _this = this;
			// this.$get(this.ROOT_URL + "Edu/user/get_grade_subject").then(function(res){
	
			// });
		},
	};
</script>

<style>
.user_paper_list ul li{line-height: 3rem;}
.paper_rand i{float: left;color:#f44;font-size: 2rem;line-height: 3rem;margin-right:1rem;margin-left: 1rem;}
.paper_title{font-size: 14px;color:#333;position: relative;display: block;}
.paper_btn{float: right;margin-right: 1rem;}
</style>