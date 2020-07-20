<!--  -->
<template>
  <!-- table -->
  <a-card>
    <a-table :columns="columns"
             :dataSource="data"
             :pagination="false"
             :loading="memberLoading">
      <template v-for="(col, i) in ['name', 'workId', 'department']"
                :slot="col"
                slot-scope="text, record">
        <a-input :key="col"
                 v-if="record.editable"
                 style="margin: -5px 0"
                 :value="text"
                 :placeholder="columns[i].title"
                 @change="e => handleChange(e.target.value, record.key, col)" />
        <template v-else>{{ text }}</template>
      </template>
      <template slot="operation"
                slot-scope="text, record">
        <template v-if="record.editable">
          <span v-if="record.isNew">
            <a @click="saveRow(record)">添加</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？"
                          @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="saveRow(record)">保存</a>
            <a-divider type="vertical" />
            <a @click="cancel(record.key)">取消</a>
          </span>
        </template>
        <span v-else>
          <a @click="toggle(record.key)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否要删除此行？"
                        @confirm="remove(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
    <!-- <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px"
              type="dashed"
              icon="plus"
              @click="newMember">新增成员</a-button> -->
  </a-card>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      memberLoading: false,
      columns: [
        {
          title: '论坛名',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '论坛id',
          dataIndex: 'workId',
          key: 'workId',
          width: '20%',
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: '加入时间',
          dataIndex: 'department',
          key: 'department',
          width: '40%',
          scopedSlots: { customRender: 'department' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [
        // {
        //   key: '1',
        //   name: '小明',
        //   workId: '001',
        //   editable: false,
        //   department: '行政部'
        // },
        // {
        //   key: '2',
        //   name: '李莉',
        //   workId: '002',
        //   editable: false,
        //   department: 'IT部'
        // },
        // {
        //   key: '3',
        //   name: '王小帅',
        //   workId: '003',
        //   editable: false,
        //   department: '财务部'
        // }
      ],
      errors: []
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    newMember() {
      const length = this.data.length
      this.data.push({
        key:
          length === 0
            ? '1'
            : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    remove(key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    saveRow(record) {
      this.memberLoading = true
      const { key, name, workId, department } = record
      if (!name || !workId || !department) {
        this.memberLoading = false
        console.log('请填写完整成员信息。')
        // this.$message.error("请填写完整成员信息。");
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise(resolve => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.data.filter(item => item.key === key)[0]
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {}
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>