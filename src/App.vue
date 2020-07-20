<template>
  <a-locale-provider
    :locale="
      $store.getters.language == 'zh'
        ? zh_CN
        : $store.getters.language == 'en'
        ? en_GB
        : ko_KR
    "
  >
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import ko_KR from 'ant-design-vue/lib/locale-provider/ko_KR'
import en_GB from 'ant-design-vue/lib/locale-provider/en_GB'
// $store.getters.language
import { AppDeviceEnquire } from './utils/mixin.js'
export default {
  data() {
    return {
      zh_CN,
      ko_KR,
      en_GB
    }
  },
  mixins: [AppDeviceEnquire]
}
</script>
