<!-- banner -->
<template>
  <!-- <a-carousel arrows :dots="false" :centerMode="true" :slidesToShow="2" :className='center'> -->
  <a-carousel
    arrows
    :dots="false"
    :centerMode="true"
    :slidesToShow="1"
    :infinite="false"
    variableWidth
    :beforeChange="onChange"
    ref="car"
  >
    <div
      slot="prevArrow"
      class="custom-slick-arrow"
      style="left: 20px;zIndex: 9999"
    >
      <a-icon type="left-circle" @click="prev" />
    </div>
    <div
      slot="nextArrow"
      class="custom-slick-arrow"
      style="right: 20px;zIndex: 9999"
    >
      <a-icon type="right-circle" @click="next" />
    </div>

    <div style="width: 10vw;" @click="goto(0)" :class="['divimg', device]">
      <img
        src="@/assets/banner/logo.png"
        alt=""
        srcset=""
        style="transform: scale(0.65)"
      />
    </div>
    <div style="width: 10vw;" @click="goto(1)" class="divimg">
      <img
        src="@/assets/banner/logo1.png"
        alt=""
        srcset=""
        style="transform: scale(0.65)"
      />
    </div>
  </a-carousel>
</template>
<script>
import { mixinDevice } from '@/utils/mixin.js'
export default {
  data() {
    return {
      active: 0,
      total: 1,
      timer: {}
    }
  },
  mixins: [mixinDevice],
  methods: {
    onChange(a, e) {
      this.active = e
      this.$emit('handleChange', e)
    },
    goto(num) {
      this.active = num 
      this.$refs.car.goTo(num)
    },
    prev() {
      if (this.active <= 0) {
        this.goto(this.total)
      }
    },
    next() {
      if (this.active >= this.total) {
        this.goto(0)
      }
    },
    auntoPlayBanner() {
      this.timer = setInterval(() => {
        this.active++
        if (this.active > this.total) {
          this.active = 0
        }
        //图片切换
        this.$refs.car.goTo(this.active)
      }, 7000)
    }
  },
  mounted() {
    this.auntoPlayBanner()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) //关闭
    }
  }
}
</script>
<style lang="less" scoped>
.ant-carousel /deep/.custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel /deep/ .custom-slick-arrow:before {
  display: none;
}
.ant-carousel /deep/ .custom-slick-arrow:hover {
  opacity: 0.5;
}
.ant-carousel /deep/ .slick-list .slick-slide {
  &.slick-active {
    .divimg {
      img {
        transform: scale(1.02) !important;
      }
    }
  }
}
</style>
