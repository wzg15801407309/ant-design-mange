<template>
  <div class="ModalForm">
    <a-button class="addButton" type="primary" @click="showModal">{{
      $t('project.add')
    }}</a-button>
    <a-modal
      :title="$t('project.add')"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <h3 class="title">{{ $t('project.user') }}:</h3>
      <a-input :placeholder="$t('user.inEmail')" v-model="formData.username" />
      <h3 class="title">{{ $t('project.auth') }}:</h3>
      <a-select
        style="width:100%"
        :placeholder="$t('project.changeauth')"
        @change="handleSelectChange"
      >
        <a-select-option value="1">
          {{ $t('project.management') }}
        </a-select-option>
        <a-select-option value="2">
          {{ $t('project.operators') }}
        </a-select-option>
        <a-select-option value="3">
          {{ $t('project.maintainers') }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>
<script>
import { checkUsernameIsHave } from '@/api/login'

import { putPowerIitem } from '@/api/power'

export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      isEmailOk: null,
      formData: {
        username: '',
        level: null,
        id: null
      }
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    async handleOk() {
      this.confirmLoading = true
      const res = await checkUsernameIsHave(this.formData.username)
      if (res.body) {
        this.formData.id = res.body.id
      } else {
        this.$message.error(this.$t('project.nouser'))
        this.confirmLoading = false
        return false
      }
      if (!this.formData.level) {
        this.$message.error(this.$t('project.ischangeauth'))
        this.confirmLoading = false
        return false
      }
      const data = {
        pid: this.$route.params.name,
        uid: this.formData.id,
        level: this.formData.level
      }
      this.confirmLoading = true
      putPowerIitem(data).then(res => {
        this.confirmLoading = false
        if (res.state) {
          this.handleCancel()
          this.$message.success(this.$t('project.success'))
        } else {
          this.$message.error(res.body)
        }
      })
    },
    onSearch(e) {
      checkUsernameIsHave(e).then(res => {
        if (res.body) {
          this.isEmailOk = res.body
        }
      })
    },
    ///
    handleCancel() {
      this.visible = false
      this.formData = {
        username: '',
        level: null,
        id: null
      }
    },
    handleSelectChange(value) {
      this.formData.level = value
    }
  }
}
</script>

<style lang="less">
.ModalForm {
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .addButton {
    margin-bottom: 20px;
  }
}
</style>
