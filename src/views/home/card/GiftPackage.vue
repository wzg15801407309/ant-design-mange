<template>
  <div :class="['gift', device]">
    <a-row :gutter="24">
      <a-col class="gutter-row gutter-row1" :sm="24" :md="18">
        <div class="gutter-box gutter-special">
          <p>{{ $t('home.couponNumber') }}</p>
          <div class="gutter-box-r" @click="forAnotherBatch" v-if="showDts">
            <p>{{ $t('home.switch') }}</p>
            <a-icon type="sync" class="syncicon" />
          </div>
        </div>
        <div class="gutter-content" v-if="showDts">
          <ul class="leftRow">
            <li v-for="(item, i) in currrShowListS" :key="i">
              <GiftCardR :item="item" />
            </li>
          </ul>
        </div>
        <div class="gutter-content" v-else>
          <ul class="leftRowM">
            <li v-for="(item, i) in listS" :key="i">
              <GiftCardR :item="item" />
            </li>
          </ul>
        </div>
      </a-col>
      <a-col class="gutter-row" :sm="24" :md="6">
        <div class="gutter-box">
          <p>{{ $t('home.ordergame') }}</p>
        </div>
        <div class="gutter-content">
          <div class="rightRowC">
            <ul class="rightRow">
              <li v-for="(item, i) in listY" :key="i">
                <GiftCardL :item="item" />
              </li>
            </ul>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mixinDevice } from '@/utils/mixin.js'
import GiftCardL from './GiftCard/GiftCardL'
import GiftCardR from './GiftCard/GiftCardR'
import { mapState } from 'vuex'
// import {getJsonDate} from '@/api/cuatomer';
export default {
  mixins: [mixinDevice],
  data() {
    return {
      listY: [
        {
          name: '엑소스 히어로즈',
          nickname: 'hero',
          imgUrl: require('@/assets/giftimg/img-y/hero.png'),
          link: 'https://exosheroes.line.games/'
        },
        {
          name: '소드 아트 온라인 앨리시제이션 라이징 스틸',
          nickname: 'sword',
          imgUrl: require('@/assets/giftimg/img-y/sword.png'),
          link: 'https://ab-kr-201909.sao-game.jp/'
        },
        {
          name: '염왕이 뿔났다',
          nickname: 'yanwang',
          imgUrl: require('@/assets/giftimg/img-y/yanwang.png'),
          link: 'https://yama.xdg.com/'
        },
        {
          name: '리니지2M',
          nickname: 'tiangtang2m',
          imgUrl: require('@/assets/giftimg/img-y/y-1.png'),
          link: 'https://lineage2m.plaync.com/'
        },
        {
          name: '고수 with NAVER WEBTOON',
          nickname: 'gosu',
          imgUrl: require('@/assets/giftimg/img-y/y-3.png'),
          link: 'https://gosu.gamenanum.com/'
        },
        {
          name: 'V4',
          nickname: 'V4',
          imgUrl: require('@/assets/giftimg/img-y/y-4.png'),
          link: 'http://v4.nexon.com/'
        }
      ],
      listS: [
        {
          name: '기적의검',
          nickname: 'qijizhijian',
          imgUrl: require('@/assets/giftimg/img-s/s-1.png'),
          giftcode: 'KCFCEBSNUH'
        },
        {
          name: '신강호',
          nickname: 'xinjianghu',
          imgUrl: require('@/assets/giftimg/img-s/s-2.png'),
          giftcode: 'KMO8I1D388B7'
        },
        {
          name: '강림',
          nickname: 'jianglin',
          imgUrl: require('@/assets/giftimg/img-s/jianglin.png'),
          giftcode: 'A428vKFr9s'
        },
        {
          name: '신명',
          nickname: 'shenming',
          imgUrl: require('@/assets/giftimg/img-s/shenming.png'),
          giftcode: 'T668Bkx6az'
        },
        {
          name: '아르카',
          nickname: 'arika',
          imgUrl: require('@/assets/giftimg/img-s/s-4.png'),
          giftcode: 'd1oHphghH'
        },
        {
          name: '하라M (선착순 500명)',
          nickname: 'haram',
          imgUrl: require('@/assets/giftimg/img-s/s-5.png'),
          giftcode: 'QF2QB'
        },
        {
          name: '운명의사랑:궁',
          nickname: 'mingyunzhiai',
          imgUrl: require('@/assets/giftimg/img-s/s-9.png'),
          giftcode: 'p3e0yqtgfl'
        },
        {
          name: '봉인의서',
          nickname: 'fengyin',
          imgUrl: require('@/assets/giftimg/img-s/fengyin.png'),
          giftcode: '7GsoUwswUWjMav'
        },
        {
          name: '요괴미식가',
          nickname: 'yaoguaimeishijia',
          imgUrl: require('@/assets/giftimg/img-s/s-12.png'),
          giftcode: 'ihsjyqylex'
        },
        {
          name: '무협왕',
          nickname: 'wuxiawang',
          imgUrl: require('@/assets/giftimg/img-s/s-11.png'),
          giftcode: '880RIN299FJN'
        },
        {
          name: '십만대적검',
          nickname: '',
          imgUrl: require('@/assets/giftimg/img-s/s-13.png'),
          giftcode: 'aayghvswtb'
        },
        {
          name: '삼국어웨이큰:군웅할거',
          nickname: '',
          imgUrl: require('@/assets/giftimg/img-s/s-14.png'),
          giftcode: 'g2nc6kkb0'
        },
        {
          name: '신무림전설',
          nickname: '',
          imgUrl: require('@/assets/giftimg/img-s/s-15.png'),
          giftcode: 'AJASDAAABDKE'
        }
      ],
      giftnum: 0,
      currrShowListS: [],
      ishaveMore: true,
      totalS: 0
    }
  },
  components: { GiftCardL, GiftCardR },
  // 监听属性 类似于data概念
  computed: {
    ...mapState({
      device: state => state.app.device
    }),
    showDts() {
      return this.device == 'desktop'
    }
  },
  methods: {
    callback(key) {},
    //数据初始化（礼包码）
    dataSet() {
      this.totalS = this.listS.length
      if (this.totalS < this.giftnum) {
        this.currrShowListS = this.listS
        this.ishaveMore = false
      } else {
        this.currrShowListS = []
        this.giftnum = 8
        this.listS.map((v, i) => {
          if (i < this.giftnum) {
            this.currrShowListS.push(v)
          }
        })
      }
    },
    //切换上线游戏
    forAnotherBatch() {
      if (!this.ishaveMore) {
        this.$notification.success({
          message: '힌트',
          description: '더 없어요.'
        })
        return
      }

      this.currrShowListS = []

      this.listS.map((v, i) => {
        if (i >= this.giftnum && i < this.giftnum + 8) {
          this.currrShowListS.push(v)
        }
      })
      this.giftnum = this.giftnum + 8
      if (this.giftnum > this.totalS) {
        this.giftnum = 0
      }
    }
  },
  mounted() {
    this.dataSet()
  }
}
</script>
<style lang="less" scoped>
.gift {
  overflow: hidden;
  margin: 50px 0;
  border-radius: 4px 4px 0 0;
  .gutter-example /deep/ .ant-row > div {
    background: transparent;
    border: 0;
  }
  .gutter-box {
    border-left: 4px solid #ff8212;
    p {
      margin-left: 16px;
      font-size: 20px;
      font-weight: 600;
    }
    &.gutter-special {
      display: flex;
      justify-content: space-between;
      .gutter-box-r {
        display: flex;
        align-items: center;
        cursor: pointer;
        p {
          font-size: 14px;
          font-weight: 600;
        }
        .syncicon {
          font-size: 12px;
          color: #ff8212;
          margin-left: 5px;
        }
      }
    }
  }
  .gutter-content {
    margin-top: 30px;
    height: 565px;
    overflow: hidden;
    .leftRowM {
      display: flex;
      overflow: hidden;
      overflow-x: scroll;
      overflow-y: hidden;
      li {
        margin-right: 10px;
      }
    }
    .leftRow {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: hidden;
      justify-content: space-between;
      li {
        margin-bottom: 40px;
        background: #ff8212;
      }
    }
    .rightRowC {
      height: 100%;
      overflow: hidden;
      .rightRow {
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
      }

      ::-webkit-scrollbar {
        width: 5px;
        width: 5px;
        display: block;
      }

      ::-webkit-scrollbar-track,
      ::-webkit-scrollbar-thumb {
        border-radius: 999px;
        border: 1px solid transparent;
      }

      ::-webkit-scrollbar-track {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
      }

      ::-webkit-scrollbar-thumb {
        min-height: 20px;
        background-clip: content-box;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
      }

      ::-webkit-scrollbar-corner {
        background: transparent;
      }
    }
  }
}
.mobile {
  .gift {
    margin: 0 0 30px 0;
    .gutter-box {
      margin-top: 20px;
    }
    .gutter-row {
      margin: 0 10px;
    }
    .gutter-row1 {
      margin-right: 0;
    }
    .gutter-content {
      margin-top: 20px;
      height: auto;

      .rightRowC {
        width: 100%;
        .rightRow {
          li {
            width: 50%;
            float: left;
          }
        }
      }
    }
  }
}
</style>
