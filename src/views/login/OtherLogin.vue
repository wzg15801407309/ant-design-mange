<template>
  <div>
    <a-divider style="color:#666;margin:30px 0 20px;font-size:12px">
      {{ $t('login.cooperationLogin') }}</a-divider
    >
    <div class="user-login-other">
      <div class="fcebook" @click="feacebookLogin(handlePlantFormLogin)">
        <img src="@/assets/facebook.png" alt="" />
      </div>
      <div class="google" id="GOOGLE_BTN">
        <img src="@/assets/google.png" alt="" />
      </div>
      <div id="naverIdLogin" class="naverIdLogin1"></div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { login, getUserInfo, platformLogin } from '@/api/login'
import { initOtherLogin, loginFromFacebook } from './OtherLogin'
export default {
  data() {
    return {
      timeout: null,
      initOtherLogin,
      loginFromFacebook
    }
  },
  methods: {
    ...mapActions(['SetToken', 'SetUserInfo']),
    loginSuccess() {
      // 正常登陆
      this.$router.push({ name: 'index' })
      this.$notification.success({
        message: this.$t('login.welcome'),
        description: `${this.$utils.timeFix(this.$t('welcome'))} ${this.$t(
          'login.welcomeBack'
        )}`
      })
    },
    async handlePlantFormLogin(type, { id, email, name, head }) {
      this.$emit('changeloading')
      if (type == 'facebook') {
        email = ''
        head = ''
      }
      // username和password
      platformLogin({
        plantform: type,
        id,
        email,
        head,
        username: name,
        password: email
      }).then(res => {
        if (res.state) {
          this.SetToken(res.body)
          getUserInfo().then(res => {
            if (res.state) {
              this.SetUserInfo(res.body)
              // 登陆成功
              this.loginSuccess()
            }
          })
        } else {
          //除了naver 没有注册，携带参数跳转
          if (type != 'nvaer') {
            window.location.href = `/register?type=${type}&id=${id}&email=${email}&name=${name}&head=${head}`
          }
        }
      })
    },
    //其他的登录方式
    async feacebookLogin() {
      FB.login(response => {
        if (response.authResponse) {
          FB.api('/me', async response => {
            const { id, name, email } = response
            this.handlePlantFormLogin('facebook', {
              id,
              name,
              email
            })
          })
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      })
    },

    // 定时器初始化
    settime() {
      // 验证 路由参数
      this.initOtherLogin(this.handlePlantFormLogin, this.$emit)
      clearTimeout(this.timeout)
      const _this = this
      _this.timeout = setTimeout(() => {
        _this.settime()
      }, 1000)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  created(){
     if (this.$route.hash.indexOf('access_token') != -1) {
      this.$emit('changeloading')
    } 
  },
  mounted() {
   
    //实例化 第三方登陆 Facebook google。。。。
    this.settime()
  }
}
</script>
<style lang="less">
.user-login-other {
  display: flex;
  justify-content: space-between;
  div {
    width: 31%;
    img {
      width: 100%;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
