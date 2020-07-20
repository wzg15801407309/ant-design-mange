<template>
  <div class="reservationCard">
    <div class="cardUP">
      <div class="cardUPcontent">
        <div class="upShow" v-if="item.isOnline">
          <p>{{ $t('home.onlineToday') }}</p>
          <div class="circle"></div>
        </div>
        <div class="upShowS" v-else>
          <p class="p1">{{ date }}</p>
          <p class="p2" v-if="item.showtext == 0">
            {{ $t('home.gameOnline') }}
          </p>
          <p class="p2" v-if="item.showtext == 1">
            {{ $t('home.gameOnline') }}
          </p>
          <p class="p2" v-if="item.showtext == 2">
            {{ $t('home.gameOnline') }}
          </p>
          <p class="p2" v-if="item.showtext == 3">
            {{ $t('home.gameOnload') }}
          </p>
          <p class="p2" v-if="item.showtext == 4">
            {{ $t('home.activityOnline') }}
          </p>
          <div class="circle"></div>
        </div>
      </div>
    </div>
    <div class="cardContent">
      <a-card
        hoverable
        style="width: 182px;height:331px;"
        :bodyStyle="{ padding: 0 }"
      >
        <div class="cardContentUP" @click="goLink">
          <img alt="img" :src="item.src" />
        </div>
        <div class="cardContentDown">
          <div class="tag">
            <div class="tag-icon">
              <div
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;  z-index: 9;  display: flex;  justify-content: center;  align-items: center;"
              >
                <p class="tag-w">
                  {{ $t(`home.${mapList[item.tag].text}`) }}
                </p>
              </div>
              <img
                :src="mapList[item.tag].img"
                alt="tag"
                style="width:100%;height:24px;position: absolute; top: 0; left: 0;"
              />
              <p class="tag-w">
                {{ $t(`home.${mapList[item.tag].text}`) }}
              </p>
            </div>
          </div>
          <div class="words">
            <div class="cardtitle" slot="title">{{ item.title }}</div>
            <div class="description" slot="description">
              {{ item.description }}
            </div>
          </div>
          <div class="cardFooter" @click="goLink">
            <a-button type="link">
              {{
                item.type == 0
                  ? $t('home.goLink')
                  : item.type == 1
                  ? $t('home.goOrder')
                  : item.type == 2
                  ? $t('home.goForum')
                  : item.type == 3
                  ? $t('home.goWebsite')
                  : null
              }}
            </a-button>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>
<script> 

import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/ko'
export default {
  props: ['item'],
  data() {
    return { 
      date: '2019',
      mapList: {
        0: {
          img: require('@/assets/BBSTag (2).png'),
          text: 'online'
        },
        1: {
          img: require('@/assets/orderTag (2).png'),
          text: 'reservation'
        },
        2: {
          img: require('@/assets/BBSTag.png'),
          text: 'forum'
        },
        3: {
          img: require('@/assets/otherTag (2).png'),
          text: 'website'
        },
        4: {
          img: require('@/assets/activity.png'),
          text: 'activity'
        }
      }
    }
  },
  components: {},
  methods: {
    goLink() {
      // window.location.href = this.item.link
      window.open(this.item.link)
    },
    dateFormat() {
      this.date = moment(this.item.date).format('L') //2019-04-11
    }
  },
  created() {
    if (this.$store.getters.language == 'zh') {
      moment.locale('zh-cn')
    } else {
      moment.locale('ko')
    }
  },
  mounted() {
    this.dateFormat()
  }
}
</script>
<style lang="less" scoped>
.reservationCard {
  user-select: none;
  position: relative;
  height: 415px;
  .cardUP {
    height: 55px;
    border-bottom: 2px solid rgba(255, 200, 0, 1);
    margin-bottom: 22px;
    .cardUPcontent {
      height: 100%;
      width: 100%;
      .upShow {
        position: relative;
        width: 182px;
        height: 38px;
        background: rgba(255, 200, 0, 1);
        border-radius: 10px;
        text-align: center;
        line-height: 38px;
        p {
          font-size: 16px;
          color: #272a2c;
          font-weight: 400px;
        }
        &::before {
          content: '';
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-width: 8px;
          border-style: solid;
          border-color: rgba(255, 200, 0, 1) transparent transparent transparent;
        }
        .circle {
          width: 12px;
          height: 12px;
          background: rgba(255, 200, 0, 1);
          border-radius: 50%;
          border: 3px solid rgba(240, 242, 245, 1);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -22px;
        }
      }
      .upShowS {
        position: relative;
        width: 182px;
        height: 38px;
        text-align: center;
        .p2 {
          font-size: 14px;
          font-weight: 400;
          color: #52575b;
        }
        .p1 {
          font-size: 16px;
          font-weight: 400;
          color: #272a2c;
        }
        .circle {
          width: 12px;
          height: 12px;
          background: rgba(255, 200, 0, 1);
          border-radius: 50%;
          border: 3px solid rgba(240, 242, 245, 1);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -22px;
        }
      }
    }
  }

  .cardContent {
    overflow: hidden;
    .cardContentUP {
      width: 100%;
      height: 240px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px 4px 0 0;
      }
    }
    .cardContentDown {
      cursor: auto;
      position: absolute;
      top: 240px;
      left: 0;
      height: 135px;
      border-radius: 0 0 4px 4px;
      background: #fff;
      transition: all 0.3s ease-in;
      .tag {
        margin: -15px 15px 0 15px;
        .tag-icon {
          position: relative;
          width: fit-content;
          padding: 0 10px;
          p {
            font-size: 14px;
            color: #fff;
            font-size: 400;
          }
        }
      }
      .words {
        margin: 5px 15px 0 15px;
        .cardtitle {
          font-size: 16px;
          font-weight: 400;
          color: #272a2c;
          width: 152px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .description {
          width: 152px;
          font-size: 12px;
          font-weight: 400;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
          -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数。*/
          -webkit-box-orient: vertical;
        }
      }
      .cardFooter {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 40px;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 0.09);
      }
      .ant-btn {
        font-size: 16px;
        width: 100%;
        height: 100%;
      }
    }
  }
  .ant-card {
    border-radius: 4px;
  }
  .ant-card-bordered {
    border: 0;
  }
  .cardContent:hover {
    .cardContentDown {
      top: 195px;
    }
    .ant-card {
      box-shadow: 0px 10px 12px 1px rgba(0, 0, 0, 0.11);
    }
  }
}
</style>
