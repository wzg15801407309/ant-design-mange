import { deviceEnquire, DEVICE_TYPE } from './device.js'
import { mapState } from 'vuex'
import * as types from '@/store/mutationType'
const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted() {
    const { $store } = this;
    deviceEnquire(deviceType => { 
      
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit(types.COM_DEVICE, 'desktop')
          break
        case DEVICE_TYPE.TABLET:
          $store.commit(types.COM_DEVICE, 'tablet')
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit(types.COM_DEVICE, 'mobile')
          break
      }
    })
  }
}
export { AppDeviceEnquire, mixinDevice }
