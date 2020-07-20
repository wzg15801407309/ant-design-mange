<!-- user de 全部项目 -->
<template>
  <div class="userProject">
    <a-spin :spinning="spinning">
      <div class="content">
        <h3>
          {{ $t('user.allhava') + tatal + $t('user.project') }}
        </h3>
        <a-row :gutter="30">
          <a-col v-for="(item, i) in userproject" :key="i" :span="4">
            <ProjectCard :item="item" />
          </a-col>
          <a-col :span="4">
            <a-card
              v-if="!spinning"
              hoverable
              @click="clickevent"
              class="CreateProjectCard"
            >
              <!-- <div class="title">{{ $t('project.newproject') }}</div> -->
              <a-icon type="plus" />
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>
<script>
import ProjectCard from './module/ProjectCard'
import { getUserPriject } from '@/api/power.js'
import { getProjectArray } from '@/api/project.js'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    ProjectCard
  },
  data() {
    return {
      // 加载中状态
      spinning: true,
      // 项目数据
      userproject: [],
      // 项目条数
      tatal: 0
    }
  },
  computed: {
    // 获取到用户信息
    ...mapState({
      userInfo: state => state.user.info
    })
  },
  methods: {
    async getMostActive() {

      
      let res = await getUserPriject(this.userInfo.id)
      if (res.body.length == 0) {
        this.spinning = false
        return false
      }
      let projectIdBody = res.body
      let projectIdArray = projectIdBody.map(function(item) {
        return item.production
      })
      let ProjectArray = await getProjectArray(projectIdArray.join('-'))
      this.spinning = false
      this.userproject = ProjectArray.body
      this.tatal = this.userproject.length
    },
    clickevent() {
      this.$confirm({
        title: this.$t('user.InviteCode'),
        content: this.$t('user.msgNoCode'),
        onOk: () => {
          this.$router.push({ name: 'newapp' })
        },
        onCancel() {}
      })
    }
  },
  mounted() {
    this.getMostActive()
  },
  created() {}
}
</script>
<style lang="less" scoped>
.userProject {
  .content {
    margin: 0 auto;
    width: 1200px;
    margin-top: 10px;
    .nodata {
      font-size: 20px;
      font-weight: 400;
      color: rgba(69, 68, 66, 1);
      opacity: 0.67;
    }
    h3 {
      font-size: 12px;
      font-weight: 400;
      color: rgba(69, 68, 66, 1);
      opacity: 0.67;
    }
  }
  .CreateProjectCard {
    color: #fff;
    background: rgba(0, 0, 0, 0.2); 
    text-align: center;
    position: relative;
    .title{
      left: 0;
      top: 40px;
      font-size: 20px;
      position: absolute;
      margin: 0 auto;
      text-align: center;
      width: 100%;
    }
    .anticon {
     
      line-height: 200px;
      font-size: 50px;
    }
  }
}
</style>
