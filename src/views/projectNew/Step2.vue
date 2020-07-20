<template>
  <div style="padding-top:20px;">
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          <a-tooltip slot="suffix" :title="$t('project.Itemtypeprompt')">
            <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
          {{ $t('project.projectType') }}
        </span>
        {{ types == '预约' ? $t('project.order') : '' }}
        {{ types == '论坛' ? $t('project.forum') : '' }}
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          <a-tooltip slot="suffix" :title="$t('project.Itemnameprompt')">
            <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
          {{ $t('project.projectName') }}
        </span>
        <a-input
          v-decorator="[
            'title',
            { rules: [{ required: true, message: $t('project.projectreq') }] }
          ]"
          name="title"
          :placeholder="$t('project.pproject')"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          <a-tooltip slot="suffix" :title="$t('project.Itemcodeprompt')">
            <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
          {{ $t('project.code') }}
        </span>
        <a-input
          class="smallinput"
          :addonBefore="urllink"
          v-decorator="[
            'code',
            {
              rules: [
                { required: true, message: $t('project.codereq') },
                { validator: this.handleIshave }
              ]
            }
          ]"
          name="code"
          :placeholder="$t('project.Pcode')"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          <a-tooltip slot="suffix" :title="$t('project.Itemlogoprompt')">
            <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
          {{ $t('project.projectLog') }}
        </span>
        <AvatarModal :imageUrl="imageUrl" @changeImgUrl="changeImgUrl" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          <a-tooltip
            slot="suffix"
            :title="$t('project.Itemintroductionprompt')"
          >
            <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
          {{ $t('project.projectPresentation') }}
        </span>
        <a-textarea
          rows="4"
          :placeholder="$t('project.projectPresentationreq')"
          v-decorator="[
            'description',
            {
              rules: [
                {
                  required: true,
                  message: $t('project.projectPresentationreq')
                }
              ]
            }
          ]"
        />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          <a-tooltip slot="suffix" :title="$t('project.Itempublicprompt')">
            <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
          {{ $t('project.projectpublic') }}
        </span>
        <a-radio-group
          v-decorator="[
            'state',
            {
              initialValue: 0,
              rules: [
                {
                  required: true
                }
              ]
            }
          ]"
        >
          <a-radio :value="0">{{ $t('project.private') }}</a-radio>
          <a-radio :value="1">{{ $t('project.public') }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
        <a-button @click="prevStep" type="link">{{
          $t('project.LastStep')
        }}</a-button>
        <a-button
          style="margin-left: 8px"
          :loading="loading"
          type="primary"
          @click="nextStep"
          >{{ $t('project.submint') }}</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import AvatarModal from '@/views/projectSetting/AvatarModal'
import { crrateProject, checkCode } from '@/api/project.js'
import { mapState } from 'vuex'
export default {
  name: 'Step2',
  props: ['type'],
  components: { AvatarModal },
  data() {
    return {
      urllink: 'https://',
      labelCol: { lg: { span: 6 }, sm: { span: 6 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 10 } },
      form: this.$form.createForm(this),
      types: '',
      imageUrl: '',
      loading: false,
      iscode: true
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      userInfo: state => state.user.info
    })
  },
  methods: {
    handleIshave(rule, value, callback) {
      if (!value) {
        callback()
        return false
      }
      checkCode(this.type, value).then(res => {
        if (res.body['id']) {
          callback(new Error(this.$t('common.iscode')))
        } else {
          callback()
        }
      })
    },
    nextStep() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.logo = this.imageUrl
          values.type = this.type
          this.loading = true
          crrateProject(values).then(res => {
            this.loading = false
            if (res.state) {
              this.$router.push({
                name: 'apps',
                params: { id: this.userInfo.id }
              })
            } else {
              this.$message.error(res.body)
            }
          })
        }
      })
    },
    changeImgUrl(imageUrl) {
      this.imageUrl = imageUrl
    },
    prevStep() {
      this.$emit('prevStep')
    },
    typeShow() {
      this.types = this.$utils.typeWord(this.type)

      if (this.type == 2) {
        this.iscode = false
      }
    }
  },
  created() {
    this.typeShow()
    this.urllink = this.$utils.getLinkUrl(this.type)
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
/deep/.ant-input-group-addon {
  color: rgba(0, 0, 0, 0.65) !important;
  background: transparent;
  border: 0;
  padding: 1px;
}
.smallinput {
  /deep/.ant-input-group {
    .ant-input {
      height: 28px;
    }
  }
}
</style>
