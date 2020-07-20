<template>
  <div class="userSetOtherLogin">
    <div class="user-login-other1">
      <!-- oldUserInfo.facebookId -->
      <div
        v-if="oldUserInfo.facebookId"
        class="fcebook log"
        @click="cancelbind('facebookId')"
      >
        <img src="@/assets/icon/facebook1.png" alt="" />
      </div>
      <div v-else class="fcebook log" @click="feacebookLogin">
        <img src="@/assets/icon/facebook.png" alt="" />
      </div>
      <!-- oldUserInfo.googleId -->
      <div
        v-if="oldUserInfo.googleId"
        @click="cancelbind('googleId')"
        class="google log"
      >
        <img src="@/assets/icon/google1.png" alt="" />
      </div>
      <div v-else class="google log" id="GOOGLE_BTN">
        <img src="@/assets/icon/google.png" alt="" />
      </div>
      <!-- oldUserInfo.naverId -->
      <div
        v-if="oldUserInfo.naverId"
        @click="cancelbind('naverId')"
        class="naverIdLogin naverH log"
      ></div>
      <div v-else id="naverIdLogin" class="naverIdLogin naverN log"></div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { login, getUserInfo, platformLogin, changeUsername } from '@/api/login'
import { initOtherLogin, loginFromFacebook } from '@/utils/OtherLogin'
export default {
  props: {
    oldUserInfo: Object
  },
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
    async handlePlantFormLogin(type, { id }) {
      const typeId = {
        id,
        type: type + 'Id'
      }
      if (typeId.id) { 
        changeUsername({ [typeId.type]: typeId.id }, this.oldUserInfo.id).then(
          res => { 
            this.SetToken(res.body)
            getUserInfo().then(res => {
              if (res.state) {
                this.SetUserInfo(res.body)
                window.location.reload()
              }
            })
          }
        )
      }
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
    cancelbind(type) {
      const This = this
      this.$confirm({ 
        title:  this.$t('common.cancelbind'),
        onOk() {
          changeUsername({ [type]: "" }, This.oldUserInfo.id).then(res => { 
            This.SetToken(res.body)
            getUserInfo().then(res => {
              if (res.state) {
                This.SetUserInfo(res.body)
                window.location.reload()
              }
            })
          })
        }
      })
    },
    // 定时器初始化
    settime() {
      // 验证 路由参数
      this.initOtherLogin(this.handlePlantFormLogin)
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
  mounted() {
    //实例化 第三方登陆 Facebook google。。。。
    this.settime()
  }
}
</script>
<style lang="less">
.userSetOtherLogin {
  width: 280px;
}
.user-login-other1 {
  display: flex;
  justify-content: flex-start;
  div {
    img {
      width: 100%;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .log {
    margin-left: 10px;
    line-height: 34px;
    width: 34px;
    height: 34px;
  }
}
</style>
