<template>
  <a-card class="projectCard" v-if="item" hoverable >
      <div class="tag">
        <div class="tagC" v-if="item.type == 0" >
          <img src="@/assets/tagicon/orderTag.png" alt="tag" />
          <div class="re">{{ $t('project.order') }}</div>
        </div>
        <div class="tagC" v-if="item.type == 1">
          <img src="@/assets/tagicon/BBSTag.png" alt="tag"  />
          <div class="re">{{$t('project.forum')}}</div>
          
        </div>
        <div v-if="item.type == 2" class="tagC">
          <img src="@/assets/tagicon/otherTag.png" alt="tag" />
          <div class="re">{{ $t('project.other') }}</div>
        </div>
      </div>
    <img
      alt="example"
      :src="logo"
      slot="cover"
      v-if="item.logo"
      @click="LinkTO"
    />
    <!-- <img alt="example" :src="logo" slot="cover" v-else /> -->
    <div
      @click="LinkTO"
      slot="cover"
      style="background: #eee;height:100%;display:flex;flex-direction: column;
      align-items: center;justify-content: center;"
      v-else
    >
 
      <img src="@/assets/logoicon.png" alt=""  />
      <p style="font-size:16px;">{{ $t('user.noPicture') }}</p> 
    </div>
    <div class="center">
      <span>{{ item.title }}</span>
      <p>{{ item.description ? item.description : $t('user.notDescribed') }}</p>
      <!-- <div class="tag">
        <img src="@/assets/orderTag.png" alt="tag" v-if="item.type == 0" />
        <img src="@/assets/BBSTag.png" alt="tag" v-if="item.type == 1" />
        <img src="@/assets/otherTag.png" alt="tag" v-if="item.type == 2" />
      </div> -->
    </div>
    <template slot="actions" style="margin:5px 0">
      <a-button type="link" icon="setting" block @click="clickSetPage" />
      <a-button type="link" icon="link" block :style="!item.status?'color:#999999;cursor: default;':null" @click="linkClick" />
    </template>
  </a-card>
</template>
<script>
export default {
  props: ['item'],
  computed: {
    logo() {
      return this.$utils.logoShow(this.item.logo)
    }
  },
  methods: {
    clickSetPage() {
      this.$router.push({
        name: 'BaseSetting',
        params: { name: this.item.id },
        query: { type: this.item.type }
      })
    },
    linkClick() {
      if (this.item.status) {
        window.open(this.$utils.getUrl(this.item.type, this.item.code))
      }
    },
    LinkTO() {
      const url = this.$utils.getBackstageUrl(this.item.type, this.item.id)
      window.open(url)
    }
  }
}
</script>
<style lang="less" scoped>
.projectCard {
  margin-bottom: 16px;
  .center {
    // text-align: left;
    width: 100%;
    position: relative;
    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: rgba(82, 84, 86, 1);
      font-size: 14px;
    }
    p {
      margin: 0;
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .tag {
      position: absolute;
      width: 45px;
      top: -15px;
      right: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.ant-card-cover img {
    padding: 8px 8px 0 8px;
}
.CreateProjectCard {
  font-size: 50px;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  line-height: 150px;
}
.tag{
  position: absolute;
  top:0;
  right: 0;
  .tagC{
    width: 100%;    
    text-align: center;
    .re{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 24%;
    right: -15%;
    color: white;
    font-size: 12px;
    transform: translateY(-50%);
    transform:rotate(54deg);
    -ms-transform:rotate(54deg); /* Internet Explorer 9*/
    -moz-transform:rotate(54deg); /* Firefox */
    -webkit-transform:rotate(54deg); /* Safari 和 Chrome */
    -o-transform:rotate(54deg); /* Opera */
    transform-origin:center center;
    // filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
  }
  }
}
 

</style>
