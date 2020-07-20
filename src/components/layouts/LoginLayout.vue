<!-- 登录页面 -->
<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="up">
          <a href="/">
            <img src="@/assets/logo-footer.png" alt="logo" />
          </a>
        </div>
      </div>
      <div class="main">
        <router-view />
      </div>
      <div class="footer">
        <LangSelect />
        <div class="copyright"></div>
      </div>
    </div>
  </div>
</template>
<script>
import LangSelect from '../Tool/LangSelect'
import { mixinDevice } from '@/utils/mixin.js'
export default {
  name: 'UserLayout',
  mixins: [mixinDevice],
  components: {
    LangSelect
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  background: #f0f2f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 420px;
    padding: 0 20px;
    .top {
      min-height: 1px;
      padding: 100px 0 30px;
      .up a {
        // display: flex;
        // justify-content: center;
        img {
          // height: 40px;
          width: 100%;
        }
      }
    }
    .main {
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        height: 15px;
      }
      .copyright {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: rgba(102, 102, 102, 0.8);
      }
    }
  }
}
</style>
