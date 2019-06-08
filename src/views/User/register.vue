<template>
	<div class="edu">
		<div class="login_top">
			<div class="one_login_top">
				<van-icon name="arrow-left" />
				<div class="login_left_arrow">返回</div>
			</div>
			<div class="login_top_title">用户注册<p>QINGWU REGISTER</p></div>
			<!-- <van-nav-bar
			  title="用户登录"
			  left-text="返回"
			  left-arrow
			/> -->
		</div>
		<div class="login_content">
			<van-cell-group>
			  <van-field
			    v-model="username"
			    clearable
			    label="用户名"
			    placeholder="请输入用户名"
			    @click-right-icon="$toast('question')"
			  />

			  <van-field
			    v-model="password"
			    type="password"
			    label="密码"
			    placeholder="请输入密码"
			  />

			  <van-field
			    v-model="username"
			    clearable
			    label="昵称"
			    placeholder="请输入用户名"
			    @click-right-icon="$toast('question')"
			  />
			</van-cell-group>
		</div>
		<div class="login_btn"><van-button type="primary">注 册</van-button></div>
		<div class="login_other">
			温馨提示，微信登录记得绑定手机！
		</div>

	</div>
</template>

<style>
/*.login_top .van-nav-bar{background-color: #07c160;}*/
/*.login_top .van-nav-bar__title{color:#fff;}
.login_top .van-nav-bar__text{color:#fff;}
.login_top .van-nav-bar .van-icon{color:#fff;}
.login_top .van-nav-bar__text:active{background-color:#08b159;}
.login_content{padding-top: 3rem;padding: 3rem 1rem;}
.login_content:after{content:'';display: block;clear: both;}
.login_title{font-size: 1.45rem;color:#333;margin-bottom: 1rem;margin-left: 1rem;font-weight: bold;}
.login_input .van-cell:not(:last-child)::after{border-bottom:1px solid #efefef;}*/
.login_top{background: url(../../assets/login_pic.jpg);background-size:100%;background-position:center top;height: 230px;}
.login_top .van-icon{color:#fff;font-size: 16px;line-height: 3rem;margin-left: 1rem;float:left;margin-right: 0.5rem;font-weight: normal;}
.login_left_arrow{color:#fff;line-height: 3.2rem;font-size: 14px;}
.login_top_title{color:#fff;font-size: 22px;text-align: center;margin-top: 1.45rem;font-weight: bold;}
.login_top_title p{font-size: 12px;font-weight: normal;line-height: 20px;padding: 0;margin:5px;}
.login_content{background:#fff; display: block;width: 90%;margin: -4rem auto 0 auto;border-radius: 3px;border:1px solid #f1f1f1;}
.login_btn{padding-top: 1rem;}
.login_btn .van-button--normal{width: 90%;margin:0 auto;display: block;}
.login_notice{margin-top: 0.65rem;color:#333;width: 90%;margin:0.5rem auto;display: block;}
.login_notice span{float: right}
.login_notice i{margin-right: 0.25rem;}
.login_other{text-align: center;color:#999;margin-top: 1rem;}
</style>