<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods:{
    
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
      if(this.$isWeiXin()){
        // this.$toast('微信游览器！');
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
