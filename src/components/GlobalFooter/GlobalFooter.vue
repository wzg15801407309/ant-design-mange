<template>
  <div :class="['footer', device]">
    <div class="links">
      <div class="footer-left">
        <router-link :to="{ name: 'index' }">
          <img src="@/assets/logo (2).png" alt="logo" />
        </router-link>
        <a
          href="https://www.youtube.com/channel/UCUKxXSiHjePOfQtkELqPOZA"
          target="_blank"
          style="margin-left: 25px;"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-you-tube1"></use>
          </svg>
        </a>
        <a href="mailto:joygrit@joygrit.com">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youxiang"></use>
          </svg>
        </a>
      </div> 
      <a class="styleA" href="/agreement1" target="_blank"> {{ $t('common.agreement1') }}</a>
      <a class="styleA" href="/agreement2" target="_blank"> {{ $t('common.agreement2') }}</a>
      <a class="styleA" style="font-weight: bold;" href="/agreement3" target="_blank"> {{ $t('common.agreement3') }}</a>
      <a class="styleA" href="/agreement4" target="_blank"> {{ $t('common.agreement4') }}</a>
      <div class="footer-center">
        <p>{{ $t('common.copyright') }}</p>
      </div>
      <div class="footer-right">
        <LangSelect />
      </div>
    </div>
  </div>
</template>
<script>
import LangSelect from '../Tool/LangSelect'
import { mixinDevice } from '@/utils/mixin'
import icon from '@/assets/icon/iconfont.js'
export default {
  name: 'GlobalFooter',
  components: {
    LangSelect
  },
  mixins: [mixinDevice]
}
</script>
<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
.footer {
  width: 100%;
  height: 60px;
  background: #191919;
  box-shadow: 0px 0px 1px 0px rgba(1, 3, 27, 0.11);
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  .styleA{
    color: #eeeeee;
    text-decoration: none; 
    background-color: transparent;
    outline: none;
    cursor: pointer;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
  }
  .styleA:hover{
    color: #cccccc;
  }
  .links {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .footer-left {
      display: flex;
      align-items: center;
      a {
        color: #fff;
        margin-left: 10px;
        display: flex;
      }
      img {
        height: 38px;
      }
      .icon {
        width: 25px;
        height: 25px;
        fill: currentColor;

        margin: 0 5px;
      }
    }
    .footer-right {
      display: flex;
      p {
        font-size: 15px;
        font-weight: 400;
        color: #6a6662;
      }
    }
  }
}
.mobile {
  .footer {
    position: relative;
    height: auto;
    .links {
      padding: 20px 0;
      flex-direction: column;
      width: 100%;
      .footer-center {
        padding: 20px 10px;
      }
    }
  }
}
</style>
