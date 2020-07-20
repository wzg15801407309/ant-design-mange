<template>
<a-spin :spinning="spinning" :delay="500">
  <a-table :columns="columns" :dataSource="data"  :scroll="{ x: '101%'}" :bordered='true' v-show='!spinning'>
  </a-table>
  <a-card :bordered="false" :body-style="{padding: '0'}"  v-show='!spinning && !noData'>
    <div class="salesCard">
      <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
        <a-tab-pane loading="true" tab="预约总数" key="1">
          <a-row>
            <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
              <bar :data="barData" title="显示" />
            </a-col>
            <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <div>
                  <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                    <v-tooltip :showTitle="false" dataKey="item*percent" />
                    <v-axis />
                    <v-legend dataKey="item"/>
                    <v-pie position="percent" color="item" :vStyle="pieStyle" />
                    <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                  </v-chart>
                </div>
              <!-- <rank-list title="预约每天个数显示" :list="rankList"/> -->
              </a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-card>
      <!-- <div class="antd-pro-pages-dashboard-analysis-twoColLayout" >
        <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="销售额类别占比" :style="{ height: '100%' }">
              <div>
                <div>
                  <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                    <v-tooltip :showTitle="false" dataKey="item*percent" />
                    <v-axis />
                    <v-legend dataKey="item"/>
                    <v-pie position="percent" color="item" :vStyle="pieStyle" />
                    <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                  </v-chart>
                </div>

              </div>
            </a-card>
          </a-col>
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" title="预约流图" :style="{ height: '100%' }">
              <a-row :gutter="68">
                <a-col :xs="24" :sm="24" :style="{ marginBottom: ' 24px'}">
                  <number-info :total='123' :sub-total="789">
                    <span slot="subtitle">
                      <span>总预约数</span>
                      <a-tooltip title="说明" slot="action">
                        <a-icon type="info-circle-o" :style="{ marginLeft: '8px' }" />
                      </a-tooltip>
                    </span>
                  </number-info>
                  <div>
                    <mini-smooth-area :style="{ height: '150px' }" :dataSource="searchUserData" :scale="searchUserScale" />
                  </div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </div> -->
</a-spin>
</template>
<script>
import moment from 'moment'
import{ Bar, RankList, NumberInfo, MiniSmoothArea }from '@/components/charts'
import { getReservationSource,getProjectAllRecord, getSourceAlList } from '@/api/project.js'


const DataSet=require('@antv/data-set')
const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '某日的预约总数 ' + (i + 1),
    total: 1234.56 - i * 100
  })
}
const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]
const searchUserData = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment().add(i, 'days').format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}
const searchUserScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '用户数',
    min: 0,
    max: 10
  }]

export default {
  data(){
    return {
      columns:[],
      data:[],
      spinning:true,
      noData:false,
      barData:[],

      rankList:[],

      pieData:[],
      pieScale,
      sourceData:[],
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      total:null,
      searchUserData,
      searchUserScale,

    }
  },
  components:{ Bar, RankList, NumberInfo },
  methods:{
    getWordCnt(arr){
      return arr.reduce((prev,next)=>{
        prev[next] = (prev[next] + 1) || 1;
        return prev;
      },{})      
    },
    async getProjectAllRecordInfo(){
      //获取当前的项目id
      let id=this.$route.params.name
      let res=await getProjectAllRecord({production:id});
      console.log('数据列表',res);
      let souce=await getReservationSource(id);
      // console.log('来源',souce)
      if(res.body.length ==0 || souce.body.length==0){
        this.spinning=false;
        this.noData=true;
        return;
      }
      let valueT=[];
      let totaldata={key:this.data.length,time:'total'}
      this.columns.push({ title: 'Time', width: 200,dataIndex: 'time', key: 'time', fixed: 'left' })
      //列表tltle处理
      this.barData=souce.body.map((item,index)=>{
        // console.log(item);
        this.columns.push({ title: item['_id'].replace(item['_id'][0],item['_id'][0].toUpperCase()),  dataIndex: item['_id'], key: index});
        valueT.push(item['_id']);
        totaldata[item['_id']]=item.total;
        return{
          y:item.total,
          x:item._id
        }
     })
      this.data=res.body.map((item,index)=>{
        let tempObj={};
        tempObj.key=index;
        tempObj.time=moment(item.data).format('YYYY-MM-DD HH:mm:ss');
        valueT.map(citem=>{
          tempObj[citem]= (citem == item.source) ? 1:'--'
        })
        return tempObj;
      });
      this.data.push(totaldata);
      
      
      this.total=souce.total;
      this.sourceData=this.barData.map(values=>{
        return { item: values.x, count: values.y }
      })
      const dv = new DataSet.View().source(this.sourceData)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.pieData = dv.rows
      this.loading=false;
      this.spinning=false;
    },
  },
  created(){
    this.getProjectAllRecordInfo();
  }
}
</script>
<style lang="less" scoped>
 /deep/.ant-table table{
    background:#fff;
}
</style>