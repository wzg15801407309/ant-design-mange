<!-- user de 全部项目 -->
<template>
  <div class="community">
    <div class="content">
      <CommunityTable />
    </div>
  </div>
</template>

<script> 
import { getUserPriject } from '@/api/power.js'
import { getProjectArray } from '@/api/project.js'
import CommunityTable from './module/table.vue'
export default {
  components: { CommunityTable },
  data() {
    return { allapps: [] }
  },
  computed: {},
  watch: {},
  methods: {
    async getMostActive() {
      // 获取前5个
      let res = await getUserPriject(this.$route.params.id)
      let projectIdBody = res.body
      let projectIdArray = projectIdBody.map(function(item) {
        return item.production
      })
      let ProjectArray = await getProjectArray(projectIdArray.join('-'))
      this.allapps = ProjectArray.body 
    }
  },
  created() {
    this.getMostActive()
  }
}
</script>
<style lang="less" scoped>
.community {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  .content {
    width: 80%;
    p {
      font-size: 16px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
