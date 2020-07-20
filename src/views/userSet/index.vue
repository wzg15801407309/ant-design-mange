<template>
  <div class="user-settings-info-view">
    <div class="content">
      <a-card style="width: 1200px; margin-top:30px">
        <a-form>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol">
            <span slot="label" class="p-user">{{ $t('user.mySet') }}</span>
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :label="$t('user.emailset')"
          >
            {{ oldUserInfo.username }}
          </a-form-item>
            <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :label="$t('common.thirdparty')"
          >
            <OtherLogin :oldUserInfo="oldUserInfo" />
          </a-form-item> 
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :label="$t('user.borthday')"
            has-feedback
          >
            <a-date-picker
              v-if="oldUserInfo.birthday"
              style="width: 100%"
              @change="onTimeChange"
              :defaultValue="moment(oldUserInfo.birthday, 'YYYY-MM-DD')"
              format="YYYY-MM-DD"
            />
            <a-date-picker
              v-else
              style="width: 100%"
              @change="onTimeChange"
              format="YYYY-MM-DD"
            />
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :label="$t('user.sex')"
          >
            <a-radio-group v-model="oldUserInfo.sex">
              <a-radio :value="1">{{ $t('user.man') }}</a-radio>
              <a-radio :value="2">{{ $t('user.woman') }}</a-radio>
              <a-radio :value="3">{{ $t('user.other') }}</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :label="$t('user.nickname')"
          >
            <a-input
              :placeholder="$t('user.innickname')"
              name="nickname"
              v-model="oldUserInfo.nickname"
            />
          </a-form-item>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :label="$t('user.phone')"
          >
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="4">
                  <a-input
                    v-model="oldUserInfo.international"
                    :placeholder="$t('common.international')"
                  />
                </a-col>
                <a-col :span="20">
                  <a-input
                    :placeholder="$t('user.inphone')"
                    v-model="oldUserInfo.phone"
                  />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
            <a-button :loading="loading" @click="handleSubmit" type="primary">{{
              $t('common.save')
            }}</a-button>
            <a-button style="margin-left: 8px" @click="handleLogout">{{
              $t('user.Logout')
            }}</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {
  checkUsernameIsHave,
  changeUsername,
  getUserInfo
} from '@/api/login.js'
import moment from 'moment'
import { log } from 'util'
import { Switch, List } from 'ant-design-vue'
import OtherLogin from "./OtherLogin"
export default {
  components: {
    OtherLogin,
  },
  computed: {
    // 获取到用户信息
    ...mapState({
      userInfo: state => state.user.info
    })
  },
  data() {
    return {
      loading: false,
      moment,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      oldUserInfo: {}
    }
  },
  methods: {
    ...mapActions(['SetToken', 'SetUserInfo']),
    onTimeChange(date) {
      this.oldUserInfo.birthday = moment(date).format('L')
    },
    async handleSubmit(e) {
      const postData = JSON.parse(JSON.stringify(this.oldUserInfo))
      if (postData.phone != '') {
         postData.phone = postData.international + '-' + postData.phone
      }
      //检查手机号码是否正确
      var regex = /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/
      if (postData.phone != '' && !regex.test(postData.phone)) {
        this.$message.error(this.$t('user.errorphone'))
      } else {
        const { birthday, sex, id, phone, nickname } = postData
        this.loading = true
        let res = await changeUsername({ birthday, sex, phone, nickname }, id)
        this.loading = false
        if (res.state) {
          this.SetToken(res.body)
          getUserInfo().then(res => {
            if (res.state) {
              this.SetUserInfo(res.body)
              this.oldUserInfo = res.body
            }
          })
          this.$router.push({
            name: 'apps',
            params: { id: this.userInfo.id }
          })
        } else {
          this.$message.error(res.body)
        }
      }
    },
    //退出登录
    handleLogout() {
      // 您确定要退出登录吗？
      const _this = this
      this.$confirm({
        title: this.$t('common.youlayout'),
        onOk() {
          _this.SetToken(null)
          _this.SetUserInfo(null)
          _this.$router.push({ name: 'index' })
        }
      })
    }
  },
  created() {
    const data = JSON.parse(JSON.stringify(this.$store.getters.userInfo))
    if (data.birthday == 'null') {
      data.birthday = null
    }
    let Mlang = (navigator.language || navigator.browserLanguage).toLowerCase()
    if (!data.sex) {
      data.sex = 2
    }

    if (data.phone) {
      const list = data.phone.split('-')
      if (list.length == 1) {
        data.international = ''
        data.phone = list[0]
      } else {
        data.international = list[0]
        data.phone = list[1]
      }
    } else {
      let Mlang = (
        navigator.language || navigator.browserLanguage
      ).toLowerCase() 
      switch (Mlang) {
        case 'zh-cn':
          data.international = '+86'
          break
        case 'ko':
          data.international = '+82'
          break
        case 'en':
          data.international = '+44'
          break
        default:
          data.international = '+'
          break
      }
    }
    this.oldUserInfo = data
  }
}
</script>

<style lang="less" scoped>
.user-settings-info-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    /deep/.ant-form-item-label label {
      color: #9d9d9e;
    }
    .ant-input {
      color: #9d9d9e;
      border-radius: 4px;
      background: #f4f4f4;
      &:focus {
        background: #fff;
      }
    }
    .p-user {
      font-size: 16px !important;
      font-weight: 400 !important;
      line-height: 22px !important;
      color: #454442 !important;
    }
    /deep/.ant-calendar-picker-input {
      background: #f4f4f4;
      color: #9d9d9e;
      border-radius: 4px;
      &:focus {
        background: #fff;
      }
    }
  }
}
</style>
