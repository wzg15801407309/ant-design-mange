<!--  -->
<template>
  <div class="userceneter">
    <div class="ueser-banner">
      <img src="@/assets/bg.jpg" alt="" />
    </div>
    <div class="title">
      <!-- <div class="title-img">
        <img :src="userInfo.head? userInfo.head : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" alt="" />
      </div> -->
      <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
        <div class="mask">
          <a-icon type="plus" />
        </div>
        <!-- <img :src="userInfo.head ? userInfo.head : imageUrl" /> -->
        <img v-if="userInfo.head" :src="userInfo.head" />
        <img
          v-else
          style="color: #f56a00; backgroundColor: #fde3cf;height:100px;width:100px"
        />
      </div>
      <avatar-modal ref="modal" @changeImgUrl="changeImgUrl"></avatar-modal>
      <p class="user-name">{{ userInfo.nickname }}</p>
      <div class="user-tabs">
        <a-tabs :activeKey="$route.name" @change="callback">
          <a-tab-pane key="apps">
            <span slot="tab">
              <a-icon type="setting" />
              {{ $t('user.myproject') }}
            </span>
          </a-tab-pane>
          <a-tab-pane key="userset">
            <span slot="tab">
              <a-icon type="user" />
              {{ $t('user.mySetting') }}
            </span>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { changeUsername } from '@/api/login.js'

import { mapState, mapActions } from 'vuex'
export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      imageUrl: require('@/assets/user.jpg')
    }
  },
  computed: {
    // 获取到用户信息
    ...mapState({
      userInfo: state => state.user.info
    })
  },
  methods: {
    ...mapActions(['SetUserInfo']),
    // tabs  切换
    callback(key) { 
      this.$router.push({ name: key })
    },
    async changeImgUrl(image) {
      this.userInfo.head = image
      this.imageUrl = image
      //修改本地的值
      const { id, head } = this.userInfo
      let res = await changeUsername({ head }, id)
      if (res.state) {
        this.SetUserInfo(this.userInfo)
      }
    },
    headSet() {
      return this.userInfo.head
        ? process.env.VUE_APP_IMGUP_URL + this.userInfo.head
        : this.imageUrl
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 100px;
  width: 100%;
}

.ant-upload-preview {
  margin-top: -50px;
  position: relative;
  width: 100%;
  max-width: 100px;
  border-radius: 50%;
  box-shadow: 0 0 2px #ccc;
  background: #ccc;
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: opacity 0.4s;
    &:hover {
      opacity: 1;
    }
    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }
  img,
  .mask {
    width: 100%;
    max-width: 100px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}

.userceneter {
  width: 100%;
  .ueser-banner {
    height: 100px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  // margin-top: -120PX;
  .title {
    width: 100%;
    background: #fff;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .title-img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-top: -40px;
      cursor: pointer;
      img {
        background: tan;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    p {
      margin-bottom: 0;
    }
    .ant-btn-primary {
      height: 30px;
      background: rgba(255, 227, 0, 1);
      border-radius: 2px;
      border: 0;
      color: rgba(68, 68, 68, 1);
      font-size: 12px;
      text-align: center;
    }
    .user-tabs {
      /deep/.ant-tabs-bar {
        border: 0;
        margin: 0;
      }
      .ant-tabs {
        font-size: 12px;
        color: rgba(69, 68, 66, 0.5);
      }
    }
  }
}
</style>
