<!-- header -->
<template>
  <a-layout-header :style="{ padding: '0' }">
    <div class="header">
      <div class="header-index-wide">
        <div class="header-index-left">
          <logo class="top-nav-header" />
        </div>
        <user-menu
          class="header-index-right"
          v-if="$store.getters.token"
        ></user-menu>
        <div v-else class="header-index-right index-left-header">
          <router-link :to="{ name: 'login' }" style="margin-right:30PX">
            <a-button type="link">{{ $t('button.login') }}</a-button>
          </router-link>
          <router-link :to="{ name: 'register' }">
            <md-button
              class="md-dense md-raised md-primary "
              style="vertical-align: inherit;background-color: rgb(250, 174, 25);"
            >
              {{ $t('button.register') }}
            </md-button>
          </router-link>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>
<script>
import Logo from '@/components/Tool/Logo.vue'
import UserMenu from '@/components/Tool/UserMenu.vue'
import { mixinDevice } from '@/utils/mixin'
import { mapState } from 'vuex'
export default {
  components: {
    Logo,
    UserMenu
  },
  data() {
    return {
      current: 'main',
      collapsed: false
    }
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed
      this.$emit('showDrawer')
    }
  },
  computed: {
    ...mapState({
      device: state => state.app.device
    }),
    showDts() {
      return this.device == 'desktop'
    }
  },
  props: {}
}
</script>
<style lang="less">
.header {
  .header-index-wide {
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ant-btn {
      font-size: 14px;
      padding: 0 5px;
    }
    .index-left-header {
      text-align: right;
    }
    .ant-btn-link {
      color: #ffffff;
    }
    .header-menu {
      .ant-menu-horizontal {
        border-bottom: 0;
        line-height: 60px;
        .ant-menu-item-active {
          a {
            color: #ffffff;
          }
          border: 0;
        }
        .ant-menu-item-selected {
          background: #353535;
          a {
            border: 0;
            color: #ffffff;
          }
        }
        .ant-menu-submenu {
          top: 0;
          border-bottom: 0;
        }
      }
      .ant-menu-item {
        top: 0;
        border-bottom: 0;
        a {
          color: #ffffff;
          &::before {
            bottom: 0;
          }
        }
      }
      .ant-menu {
        background: transparent;
        color: #ffffff;
        font-size: 16px;
      }
    }
    .trigger {
      float: right;
      font-size: 30px;
      margin-top: 7.5px;
      line-height: 45px;
      cursor: pointer;
      transition: color 0.3s;
      color: #ffffff;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>
