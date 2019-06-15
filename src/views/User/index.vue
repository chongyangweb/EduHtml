<template>
	<div class="edu">
		<div class="person_bg">
			<div class="person_top">
				<div class="person_right_arrow"><i class="iconfont">&#xe667;</i></div>
				<div class="person_center">个人中心</div>
				<div class="person_left_arrow">
					<van-icon name="arrow-left" />
					<div class="login_left_arrow"  @click="$router.go(-1)">返回</div>
				</div>
			</div>
			<div class="person_avatar">
				<img :src="user_info.avatar" alt="" >
			</div>
			<div class="person_info">
				<div class="person_nickname">{{user_info.nickname}}<i class="iconfont">&#xe68e;</i></div>
				<div class="person_id">ID:{{user_info.id}}</div>
			</div>
		</div>
		<div class="person_cat">
			<van-row>
			  <van-col span="6">
			  		<div @click="$toast('暂未开通')">
			  		<i class="icon iconfont">&#xe747;</i>
                  	<p>钱包</p>
                  	</div>
              </van-col>
              <van-col span="6">
              		<div @click="$toast('暂未开通')">
			  		<i class="icon iconfont">&#xe676;</i>
                  	<p>班级</p>
                  	</div>
              </van-col>
              <van-col span="6">
              		<div @click="$toast('暂未开通')">
			  		<i class="icon iconfont">&#xe621;</i>
                  	<p>试卷</p>
                  	</div>
              </van-col>
              <van-col span="6">
              		<div @click="$toast('暂未开通')">
			  		<i class="icon iconfont">&#xe6cf;</i>
                  	<p>收藏</p>
                  	</div>
              </van-col>

			</van-row>
		</div>
		<div class="xian4"></div>

		<div class="person_other">
			<van-cell title="活跃度" is-link :value="user_extend.money+' 点'" />
			<van-cell title="等级" is-link :value="'lv'+user_extend.lev+ '·普通用户'" />
			<van-cell title="当前花名" is-link value="李太白" />
			<van-cell title="错题集锦" is-link  :value="error_question_num+' 道'" @click="make_error_question" />
			<van-cell title="老师推荐" is-link  />
			<van-cell title="学习范围设置" is-link url="/user/learning_scope" />
		</div>
		
		<div class="xian4"></div>
		<div class="person_gg">
			<van-cell title="推荐赛事" is-link value="湖南 ·物理交流" />
		</div>
		<div class="xian4"></div>
		<div class="person_other_one">
			<van-button plain type="danger" @click="$toast('微信无法退出账号')">退出账号</van-button>
		</div>

	</div>
</template>

<script>
	export default {
		data(){
			return{
				user_info:{},
				user_extend:{},
				avatar:'',
				error_question_num:0,
				
			}
		},
		methods:{
			make_error_question:function(){
				this.$dialog.confirm({
				  title: '温馨提示',
				  message: '你确定要重新将错题做一遍？'
				}).then(() => {
				  // on confirm
				  
				}).catch(() => {
				  // on cancel
				});
			},
		},
		mounted(){
			var _this = this;
			this.$get(this.ROOT_URL + "Edu/user/get_user_info").then(function(res){
				if(res.code == 200){
					_this.user_info = res.data;
					_this.user_extend = res.data.extend;
					_this.avatar = res.data.avatar;
					_this.error_question_num = _this.user_extend.error_question.split(',').length;
				}
			});

		},
	};
</script>

<style>
.person_bg{background: #07c160;height: 11rem;}
.person_top:after{content: '';display: block;clear: both;}
.person_left_arrow .van-icon-arrow-left{color:#fff;font-size: 16px;line-height: 3rem;margin-left: 1rem;float:left;margin-right: 0.4rem;font-weight: normal;}
.login_left_arrow{color:#fff;line-height: 3.15rem;font-size: 14px;}
.person_right_arrow{color:#fff;font-size: 16px;float: right;line-height: 3rem;margin-right: 1rem;}
.person_avatar{width: 70px;height: 70px;margin-top: 1rem;float: left;margin-right: 1.3rem;margin-left: 1.5rem;}
.person_avatar img{width: 70px;height: 70px;border-radius: 50%;border:3px solid #fff;}
.person_center{width: 4rem;display: block;position: absolute;margin:0 auto;color:#fff;font-size: 14px;left:43%;line-height: 3.3rem;}
.person_info{float: left;color:#fff;}
.person_info .person_nickname{font-size: 18px;font-weight: bold;margin-top: 1.8rem;line-height: 20px;margin-bottom: 0.4rem;}
.person_nickname i{font-weight: normal;color:#ffe934;margin-left: 0.2rem;}
.person_id{background: #ffe934;color:#772c00;border-radius: 8px;padding: 2px 3px;display: block;text-align: center;width: 4rem;}
.person_cat{text-align: center;font-size: 14px;}
.person_cat .van-col--6{padding-top: 1rem;border-right: 1px solid #efefef;}
.person_cat .van-col--6:nth-child(4){border-right: none;}
.person_cat .van-col--6:active{background: #eee;}
.person_cat i{font-size: 1.6rem;}
.person_other_one .van-button{width: 90%;margin:0 auto 2rem auto;display: block;margin-top: 1rem;}
</style>