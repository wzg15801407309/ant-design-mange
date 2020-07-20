<!-- UserMenu.vue   用于头像  消息显示  和个人中心的入口-->
<template>
  <div class="user-wrapper">
    <a-dropdown>
      <div>
        <a-avatar v-if="userInfo.head" class="avatar" :src="userInfo.head" />
        <a-avatar v-else style="color: #f56a00; backgroundColor: #fde3cf">{{
          userInfo.username
        }}</a-avatar>
        <span style="	margin-left: 5px;color: #fff;">{{
          userInfo.nickname
        }}</span>
      </div>
      <a-menu slot="overlay">
        <a-menu-item>
          <a-button type="link" icon="setting" @click="clickUserCenter">
            {{ $t('common.Mysettings') }}</a-button
          >
        </a-menu-item>
        <a-menu-item>
          <a-button type="link" style="color:#888" icon="export" @click="handleLogout">{{
            $t('user.Logout')
          }}</a-button>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.info
    })
  },
  //方法集合
  methods: {
    ...mapActions(['SetToken']),
    clickUserCenter() {
      this.$router.push({ name: 'apps' })
    },
    //退出登录
    handleLogout() {
      // 您确定要退出登录吗？
      const _this = this
      this.$confirm({
        title: this.$t('common.youlayout'),
        onOk() {
          _this.SetToken(null)
          _this.$router.push({ name: 'index' })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content-box {
  cursor: pointer;
}
</style>
