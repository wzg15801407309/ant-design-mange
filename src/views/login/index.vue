<!-- 登录界面 -->
<template>
  <div class="login">
    <a-spin :spinning="loading">
      <!-- <div class="otherlogin" v-if="otherinfo">
      <p>{{ $t('login.loginto') }}</p>
      <div class="logo"><img :src="otherinfo.logo" alt="logo" /></div>
      <a-button
        type="link"
        icon="close"
        class="btn"
        @click="otherinfo = null"
      />
    </div> -->
      <div class="title">
        <span>{{ $t('login.login') }} </span>
        {{ otherinfo ? otherinfo.title : 'GANE NANUM' }}
      </div>
      <!-- 表单 -->
      <a-form ref="formLogin" :form="form" @submit="handleSubmit">
        <!-- username -->
        <a-form-item>
          <a-input
            size="large"
            type="text"
            :placeholder="$t('login.placeholderUsername')"
            v-decorator="decorator.username"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <!-- password -->
        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            :placeholder="$t('login.placeholderPassword')"
            v-decorator="decorator.password"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-decorator="['rememberMe']">{{
            $t('login.autoLogin')
          }}</a-checkbox>
          <router-link :to="{ name: 'resetPassword' }" class="forge-password"
            >{{ $t('login.forgetpwd') }}?</router-link
          >
        </a-form-item>
        <el-alert
          v-show="errText"
          :title="errText"
          type="error"
          show-icon
          @close="
            () => {
              errText = null
            }
          "
        />
        <a-form-item>
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loginLoding"
            >{{ $t('login.login') }}</a-button
          >
        </a-form-item>

        <!-- loading -->
        <OtherLogin @changeloading="changeloading" />
        <a-divider style="color:#666;margin:50px 0 20px;font-size:12px">
          {{ $t('login.notAccount') }}</a-divider
        >
        <a-form-item>
          <router-link :to="{ name: 'register' }">
            <a-button size="large" class="register-button">{{
              $t('login.createAccount')
            }}</a-button>
          </router-link>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { checkCode } from '@/api/project'
import { login, getUserInfo, platformLogin } from '@/api/login'
import OtherLogin from './OtherLogin.vue'
export default {
  components: {
    OtherLogin
  },
  data() {
    return {
      form: this.$form.createForm(this),
      loginLoding: false,
      loading: false,
      errText: null,
      // 定时器
      timeout: null,
      decorator: {
        username: [
          'username',
          {
            rules: [
              {
                required: true,
                message: this.$t('login.placeholderUsername')
              },
              { validator: this.handleUsernameOrEmail }
            ],
            validateTrigger: 'blur'
          }
        ],
        password: [
          'password',
          {
            rules: [
              {
                required: true,
                message: this.$t('login.placeholderPassword')
              }
            ],
            validateTrigger: 'blur'
          }
        ]
      },
      otherinfo: null,
      plantformdata: {}
    }
  },

  // 方法集合
  methods: {
    ...mapActions(['SetToken', 'SetUserInfo']),
    // 表单的提交
    handleSubmit(e) {
      e.preventDefault()
      this.errText = null
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // serve请求
          this.loginLoding = true
          login(values).then(res => {
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
              this.errText = res.body
              // this.$message.error(res.body)
              this.loginLoding = false
            }
          })
        }
      })
    },
    loginSuccess() {
      // 判断是否是其他登陆
      if (this.otherinfo) {
        window.location.href = this.$utils.getUrl(
          this.otherinfo.type,
          this.otherinfo.code
        )
      } else {
        // 正常登陆
        this.$router.push({ name: 'index' })
        this.$notification.success({
          message: this.$t('login.welcome'),
          description: `${this.$utils.timeFix(this.$t('welcome'))} ${this.$t(
            'login.welcomeBack'
          )}`
        })
      }
    },
    // 自定义指令中的方法的实现
    handleUsernameOrEmail(rule, value, callback) {
      value ? null : callback()
      const regex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      regex.test(value) ? callback() : callback(this.$t('login.inputEmail'))
    },
    changeloading() {
      this.loading = true
    },
    //论坛预约的登录方式
    loginOtherWeb() {
      // 检测跳转涞源 如果路由上传入了 to 和 code
      const { to, code } = this.$route.query
      if ((to == 'community' || to == 'reservation') && code) {
        const data = { type: to == 'community' ? 1 : 0, code }
        // 获取 项目信息
        checkCode(data.type, data.code).then(res => {
          if (res.state) {
            this.otherinfo = res.body
            this.otherinfo.type = data.type
          }
        })
      }
    }
  },
  mounted() {
    this.loginOtherWeb()
  }
}
</script>
<style lang="less" scoped>
.login {
  .title {
    font-size: 16px;
    font-weight: bold;
    margin: 40px 0;
    color: rgba(0, 0, 0, 0.5);
    span {
      font-size: 20px;
    }
  }
  .ant-alert {
    margin-bottom: 20px;
  }
  .anticon {
    color: rgba(0, 0, 0, 0.25);
  }
  .login-button {
    margin-top: 10px;
    width: 100%;
  }
  .forge-password {
    float: right;
    font-size: 14px;
  }
  .register-button {
    padding: 0 15px;
    font-size: 14px;
    height: 40px;
    width: 100%;
    font-weight: 500;
  }
}
</style>
