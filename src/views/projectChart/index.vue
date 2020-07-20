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
      <a-button @click="downLoad" :size="'large'" :type="'primary'"  class="downloadbtn">DownLoad Reservation Table</a-button>
</a-spin>
</template>
<script>
import moment from 'moment'
import{ Bar, RankList, NumberInfo, MiniSmoothArea }from '@/components/charts'
import { getProjectAllRecord, getSourceAlList } from '@/api/project.js'

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    console.log({
      arr,mime
    })
    var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

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
  components:{ Bar },
  methods:{
    getWordCnt(arr){
      return arr.reduce((prev,next)=>{
        prev[next] = (prev[next] + 1) || 1;
        return prev;
      },{})      
    },
    formatDateTime(inputTime) { 
      var date = new Date(inputTime);
      var y = date.getFullYear(); 
      var m = date.getMonth() + 1; 
      m = m < 10 ? ('0' + m) : m; 
      var d = date.getDate(); 
      d = d < 10 ? ('0' + d) : d; 
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute; 
      second = second < 10 ? ('0' + second) : second; 
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
    },
    async downLoad(){
      
      let id=this.$route.params.name
      let res=await getProjectAllRecord({production:id});
      let jsonData = res.body.map(item=>({
        date : this.formatDateTime(item.date),
        phone : item.phone,
        type : item.type == 0 ? 'android' : 'ios',
        device : item.device == 0 ? 'Mobile' : 'PC',
        source : item.source
      }))
      
      let str = `date,phone,type,source\n`;
      for(let i = 0 ; i < jsonData.length ; i++ ){
          for(let item in jsonData[i]){
              str+=`${jsonData[i][item] + '\t'},`;     
          }
          str+='\n';
      }
      
      var blob = dataURLtoBlob('data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str));

      navigator.msSaveBlob(blob,  "reservation_DATA.csv");

      var a = document.createElement('a');
      a.download = "reservation_DATA.csv";
      a.href = URL.createObjectURL(blob);
      document.body.appendChild.append(a);    // 修复firefox中无法触发click
      a.click();
      URL.revokeObjectURL(a.href);
      document.body.removeChild(a);


      // let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      // //通过创建a标签实现
      // let link = document.createElement("a");
      // link.href = uri;
      // //对下载的文件命名
      // link.download =  "reservation_DATA.csv";
      // document.body.appendChild(link);
      // console.log(link)
      // link.click();
      // document.body.removeChild(link);
    },
    async getProjectAllRecordInfo(){
      //获取当前的项目id
      let id=this.$route.params.name
      let res=await getProjectAllRecord({production:id});
      console.log('数据列表',res);
      let souce=await getSourceAlList(id);
      console.log('来源',souce)
      if(res.body.length ==0 || souce.body.length==0){
        this.spinning=false;
        this.noData=true;
        return;
      }
      let valueT=[];
      let totaldata={key:this.data.length+11,time:'total'}
      this.columns.push({ title: 'Time', width: 200,dataIndex: 'time', key: 'time', fixed: 'left' })
      //列表tltle处理
      this.barData=souce.body.map((item,index)=>{
        console.log(item);
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
        tempObj.time=moment(item.date).format('YYYY-MM-DD');
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
   .downloadbtn{
      margin-top:20px;
    }
</style>


