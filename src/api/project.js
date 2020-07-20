import Http from '@/utils/http'
// 从全局配置中拿取
const projectAPI = process.env.VUE_APP_PROJECT_URL
//
export const getProjectList = id =>
  Http.get(projectAPI + `production/list/${id}/0/50/desc`)

// 获取项目信息
export const getProjectInfo = id =>
  Http.get(projectAPI + `production/info/${id}`)

// 获取项目列表
export const getProjectArray = id =>
  Http.get(projectAPI + `production/array/${id}`)

// 修改项目信息
export const changProjectInfo = (payload, id) =>
  Http.post(projectAPI + `production/info`, { id, payload })

// 新建项目
export const crrateProject = data =>
  Http.put(projectAPI + `production/info/`, data)
// 删除项目
export const delProject = id => Http.delete(projectAPI + `production/info/`, {id})
// 查看code是否存在
export const checkCode = (type, code) =>
  Http.get(projectAPI + `production/code/${type}/${code}`)



//获取项目的整体预约记录
//这个接口的地址后面要改（推上正式服务器后会有问题）
export const getProjectAllRecord=obj=>
Http.post('http://1.234.59.194:9004/api/service/bookingList',{
  query:obj
})
//预约来源总和
export const getSourceAlList=projectId=>Http.get(`http://1.234.59.194:9004/api/service/bookingSources/${projectId}`)

