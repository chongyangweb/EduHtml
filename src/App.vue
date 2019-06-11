<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods:{
     //判断是否微信登陆 是不是微信浏览器
    isWeiXin:function() {
      let ua = window.navigator.userAgent.toLowerCase();
      console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
      } else {
      return false;
      }
    },
  },
  mounted(){

    // 判断如果是这个页面就不去微信登陆
    var yz = this.$route.path.match(/user\/wechat\/login/i)=='user/wechat/login';
    // console.log(yz)
    if(!yz){
      var token = localStorage.getItem('edu_token');
      var isLogin = false;
      if(!this.$isEmpty(token)){
        isLogin = true;
      }
      if(this.isWeiXin()){
        this.$toast('微信游览器！');
        if(!isLogin){
          location.href='http://s.qingwuit.com/api/Edu/wechat/getWechat/';
        }
      }else{
        if(!isLogin){
          // this.$router.push({path:'/user/login'});
        }
        // this.$toast('手机游览器！');
      }
    }
    
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #666;
  font-size: 12px;
  /*margin-top: 60px;*/
}
</style>
