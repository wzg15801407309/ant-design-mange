<template>
  <div class="projectAuth">
    <ModalForm />
    <a-table
      :columns="columns"
      rowKey="_id"
      :dataSource="listData"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <span slot="operation" slot-scope="text, record">
        <a @click="deleteauth(record.user)">{{ $t('project.delete') }}</a>
      </span>
    </a-table>
  </div>
</template>
<script>
// const columns =
import {
  getPrijectManagers,
  getAuthoritys,
  deletePowerIitem
} from '@/api/power'
import { getUserInfoByid } from '@/api/login'
import ModalForm from './module/ModalForm'
export default {
  components: {
    ModalForm
  },
  data() {
    return {
      columns: [
        {
          title: this.$t('project.user'),
          dataIndex: 'username',
          width: '20%'
        },
        {
          title: this.$t('project.auth'),
          dataIndex: 'level',
          width: '20%'
        },
        {
          title: this.$t('project.createTime'),
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: this.$t('project.operation'),
          scopedSlots: { customRender: 'operation' }
        }
      ],
      listData: [],
      pagination: {
        // 页码
        current: 1,
        // 每页多少条
        pageSize: 10
      },
      loading: false,
      formData: {
        id: this.$route.params.name,
        level: 0,
        start: 0,
        num: 10,
        // desc/asc选一个填 desc:倒序(createTime由新到旧) asc:正序(createTime由旧到新)
        order: 'asc'
      }
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    getListData() {
      this.loading = true
      getPrijectManagers(this.formData).then(res => {
        if (res.state) {
          let ids = []
          res.body.map(el => {
            switch (el.level) {
              case 0:
                el.level = this.$t('project.creater')
                break
              case 1:
                el.level = this.$t('project.management')
                break
              case 2:
                el.level = this.$t('project.operators')
                break
              case 3:
                el.level = this.$t('project.maintainers')
                break
              default:
                el.level = this.$t('project.nodata')
                break
            }
            ids.push(el.user)
            el.createTime = this.$utils.timeFilter(el.createTime)
            return el
          })
          getAuthoritys(ids.join('-')).then(res1 => {
            this.loading = false
            if (res1.state) {
              res1.body.forEach((element, i) => {
                res.body[i].username = element.nickname
              })
              this.listData = res.body
            }
          })
        }
      })
    },
    handleTableChange(pagination, filters, sorter) {
      if (sorter['field'] == 'createTime') {
        if (sorter['order'] == 'ascend') {
          this.formData.order = 'asc'
        } else if (sorter['order'] == 'descend') {
          this.formData.order = 'desc'
        }
      }
      this.getListData()
    },
    deleteauth(id) {
      this.$confirm({
        title: this.$t('project.delete'),
        content: this.$t('project.isdelete'),
        onOk: () => {
          deletePowerIitem({ pid: this.formData.id, uid: id }).then(res => {
            if (res.state) {
              this.$message.success(this.$t('common.deletesuccess'))
            } else {
              this.$message.error(res.body)
            }
          })
        },
        onCancel() {}
      })
    }
  }
}
</script>
