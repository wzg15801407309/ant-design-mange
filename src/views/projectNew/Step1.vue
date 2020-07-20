<template>
  <div>
    <a-form :form="form" style="max-width: 700px; margin: 40px auto 0;">
      <a-form-item
        :label="$t('project.projecttype')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group
          v-decorator="[
            'type',
            {
              initialValue: 0,
              rules: [
                { required: true, message: $t('project.mustprojecttype') }
              ]
            }
          ]"
          @change="onchange"
        >
          <a-radio :value="0">{{ $t('project.order') }}</a-radio>
          <a-radio :value="1">{{ $t('project.forum') }}</a-radio>
          <!-- <a-radio :value="2">{{ $t('project.other') }}</a-radio> -->
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :label="$t('project.invitecode')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-if="isOtherType"
      >
        <a-input
          v-decorator="[
            'invitecode',
            {
              initialValue: dafaultinvitecode,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: $t('project.inInvitecode')
                },
                { validator: handledafaultCode }
              ]
            }
          ]"
          name="invitecode"
          :placeholder="$t('project.invitecode')"
        />
      </a-form-item>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-checkbox v-model="agree">
          {{ $t('common.dafaultinvitecode') }}
        </a-checkbox>
      </a-form-item>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" @click="nextStep" :disabled="!agree">{{
          $t('project.next')
        }}</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data() {
    return {
      labelCol: { lg: { span: 6 }, sm: { span: 6 } },
      wrapperCol: { lg: { span: 18 }, sm: { span: 18 } },
      formTailLayout: {
        labelCol: { lg: { span: 6 }, sm: { span: 6 } },
        wrapperCol: { lg: { span: 24 }, sm: { span: 24 }, offset: 6 }
      },
      form: this.$form.createForm(this),
      agree: true,
      isOtherType: true,
      // 默认的邀请码  （最后是要对比服务器返回的妖气）
      dafaultinvitecode: 'tm03-un320hu$2=='
    }
  },
  methods: {
    onchange(e) {
      if (e.target.value == 2) {
        this.isOtherType = false
      }
    },
    handledafaultCode(rule, value, callback) {
      if (value != this.dafaultinvitecode) {
        callback($t('project.invitecodeError'))
      }
      callback()
    },
    nextStep() {
      const {
        form: { validateFields }
      } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep', values)
        }
      })
    }
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
</style>
