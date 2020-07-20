<template>
  <div class="projects">
    <div>
      <a-tabs
        :defaultActiveKey="$route.name"
        class="projects_talbe"
        @change="callback"
      >
  
        <a-tab-pane :tab="$t('project.setting')" key="BaseSetting" />
        <a-tab-pane
          :tab="$t('project.echars')"
          key="CustomSettings"
        />
        <a-tab-pane
          :tab="$t('project.authorty')"
          key="powerSettings"
          v-if="false"
        /> 
        <a-divider slot="tabBarExtraContent" type="vertical" />
        <a-button
          @click="() => (visible = true)"
          type="danger"
          slot="tabBarExtraContent"
          >{{ $t('common.delProject') }}</a-button
        > 
      </a-tabs>
    </div>
    <router-view />
    <a-modal
      :title="$t('common.delProject')"
      :visible="visible"
      :confirmLoading="confirmLoading"
      maskClosable
      @cancel="() => (visible = false)"
    >
      <p>{{ $t('common.isDelProject') }}</p>
      <div slot="footer">
        <a-row :gutter="16">
          <a-col :span="12"
            ><a-input v-model="del" :placeholder="$t('common.delInput')"
          /></a-col>
          <a-col :span="12">
            <a-button
              block
              :disabled="del != 'DELETE'"
              @click="handleDelete"
              type="danger"
              >{{ $t('common.delProject') }}</a-button
            ></a-col
          >
        </a-row>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { delProject } from '@/api/project.js'
export default {
  data() {
    return {
      confirmLoading: false,
      visible: false,
      del: ''
    }
  },
  methods: {
    callback(key) {
      this.$router.push({
        name: key
      })
    }, 
    handleDelete() {
      delProject(this.$route.params.name).then(res => {
        if (res.state) {
          this.$message.success( this.$t('common.deletesuccess')
          )
          this.$router.push({
            name: 'apps',
            params: { id: this.$store.getters.userInfo.id }
          })
        } else {
          this.$message.error(res.body)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.projects {
  padding: 20px;
  .projects_talbe {
    margin-left: 10px;
  }
}
</style>
