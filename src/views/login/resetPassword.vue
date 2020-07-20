<!-- 注册页面 -->
<template>
  <div class="mian user-layout-register">
    <div class="title">
      <span class="title-l">{{ $t('login.changePwd') }} </span>
    </div>
    <a-form ref="formRegister" :form="form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('login.email')"
          v-decorator="decorator.username"
        />
      </a-form-item>
      <a-form-item>
        <a-row :gutter="8">
          <a-col :span="14">
            <a-input
              size="large"
              type="text"
              :placeholder="$t('login.verificationcode')"
              :disabled="!codetoken"
              v-decorator="decorator.code"
            />
          </a-col>
          <a-col :span="10">
            <a-button
              style="width:100%"
              :loading="getCodeLoading"
              type="primary"
              @click="getEmailCode"
              >{{ codeText }}</a-button
            >
          </a-col>
        </a-row>
      </a-form-item>
      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="trigger => trigger.parentElement"
        v-model="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              {{ $t('login.strength') }}：
              <span>{{ passwordLevelName }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor="passwordLevelColor"
            />
            <div style="margin-top: 10px;">
              <span>{{ $t('login.pwdTip') }}</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            :placeholder="$t('login.inPwd')"
            v-decorator="decorator.password"
          ></a-input>
        </a-form-item>
      </a-popover>
      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          :placeholder="$t('login.toPwd')"
          v-decorator="decorator.confirmpassword"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          >{{ $t('login.resetPwd') }}
        </a-button>
        <router-link :to="{ name: 'login' }">
          <a-button size="large" type="primary" class="register-button">
            {{ $t('login.goLoginpage') }}
          </a-button>
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const levelClass = ['error', 'error', 'warning', 'success']
const levelColor = ['#ff0000', '#ff0000', '#ff7e05', '#52c41a']
import {
  checkUsernameIsHave,
  postchangePsd,
  postEmailCode,
  checkEmailCode
} from '@/api/login.js'
export default {
  name: 'Register',
  data() {
    //这里存放数据
    return {
      form: this.$form.createForm(this),
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      // 邮箱码
      codetoken: null,
      // 获取邮箱验证 按钮
      getCodeLoading: false,
      // 按钮文字
      codeText: this.$t('login.getcode'),
      registerBtn: false,
      decorator: {
        username: [
          'username',
          {
            rules: [
              { required: true, message: this.$t('login.inEmail') },
              { validator: this.handleEmail }
            ],
            validateTrigger: ['change', 'blur']
          }
        ],
        code: [
          'code',
          {
            rules: [{ required: true, message: this.$t('login.inCode') }],
            validateTrigger: ['blur']
          }
        ],
        password: [
          'password',
          {
            rules: [
              { required: true, message: this.$t('login.inPwd') },
              { validator: this.handlePasswordLevel }
            ],
            validateTrigger: ['change', 'blur']
          }
        ],
        confirmpassword: [
          'confirmpassword',
          {
            rules: [
              { required: true, message: this.$t('login.inPwd') },
              { validator: this.handlePasswordCheck }
            ],
            validateTrigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  created() {},
  //计算属性 类似于data概念
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName() {
      const { easy, general, hard } = this.$t('password')
      const levelNames = [easy, easy, general, hard]
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel]
    }
  },
  // 方法集合
  methods: {
    getEmailCode() {
      const email = this.form.getFieldValue('username')

      if (this.$utils.isEmail(email)) {
        //判断是否有这个邮箱
        this.getCodeLoading = true
        this.codeText = this.$t('login.spendimg')
        checkUsernameIsHave(email).then(res => {
          if (res.state) {
            if (res.body == 0) {
              this.$confirm({
                title: this.$t('common.warmPrompt'),
                content: this.$t('login.noemail'),
                okText: this.$t('login.goregister'),
                cancelText: this.$t('common.black'),
                onOk: () => {
                  this.$router.push({ name: 'register' })
                }
              })
              this.getCodeLoading = false
              this.codeText = this.$t('login.toSpend')
              return false
            } else {
              this.getCodeLoading = true
              this.codeText = this.$t('login.spendimg')
              postEmailCode({ email: email }).then(res => {
                if (res.state) {
                  this.codeText = 60
                  this.VerificationCode()
                  this.codetoken = res.body
                  this.$message.success(this.$t('common.sendsuccess'),
                  )
                } else {
                  this.$message.error(res.body)
                  this.codeText = this.$t('login.toSpend')
                  this.getCodeLoading = false
                }
              })
            }
          } else {
            this.getCodeLoading = false
            this.codeText = this.$t('login.toSpend')
          }
        })
      } else {
        this.$message.error(this.$t('login.inputEmail'))
      }
    },
    VerificationCode() {
      const _this = this
      // 验证码定时器
      setTimeout(() => {
        if (_this.codeText > 1) {
          _this.codeText--
          _this.VerificationCode()
        } else {
          _this.codeText = this.$t('login.toSpend')
          this.getCodeLoading = false
        }
      }, 1000)
    },
    handlePasswordLevel(rule, value, callback) {
      if (!value) {
        this.state.passwordLevelChecked = false
        callback()
        return false
      }
      if (value.length < 6) {
        this.state.passwordLevelChecked = false
        callback(new Error(this.$t('login.inPwd')))
        return false
      }
      this.state.passwordLevelChecked = true
      // value ? null : callback()
      let level = 0
      // 判断这个字符串中有没有数字
      ;/[0-9]/.test(value) ? level++ : null
      // 判断字符串中有没有字母
      ;/[a-zA-Z]/.test(value) ? level++ : null
      // 判断字符串中有没有特殊符号
      ;/[^0-9a-zA-Z_]/.test(value) ? level++ : null
      this.state.passwordLevel = level
      level >= 3
        ? (this.state.percent = 100)
        : (this.state.percent = level * 30)
      level < 2 ? callback(new Error(this.$t('login.pwdstrengthNo'))) : null
      callback()
    },
    handlePasswordCheck(rule, value, callback) {
      value ? null : callback()
      const password = this.form.getFieldValue('password')
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(this.$t('login.twoPassworderror')))
      }
      callback()
    },
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields({ force: true }, async (err, values) => {
        if (!err) {
          const data = {
            code: values.code,
            password: values.password,
            secret: this.codetoken
          }
          this.registerBtn = true
          postchangePsd(data).then(resp => {
            this.registerBtn = false
            if (resp.state) {
              this.$message.success(this.$t('login.retetSuccess'))
              this.$router.push({ name: 'login' })
            }else{
              this.$message.error(res.body)
            }
          })
        }
      })
    },
    handleEmail(rule, value, callback) {
      value ? null : callback()
      const regex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (!regex.test(value)) {
        callback(this.$t('login.inputEmail'))
      }
      callback()
    }
  }
}
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .title {
    font-size: 16px;
    font-weight: bold;
    margin: 40px 0;
    color: rgba(0, 0, 0, 0.5);
    .title-l {
      font-size: 20px;
    }
  }
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 100%;
    font-weight: 400;
    margin-bottom: 20px;
  }
}
</style>
