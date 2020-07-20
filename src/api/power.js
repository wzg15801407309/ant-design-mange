import Http from '@/utils/http' 
// 从全局配置中拿取
const userAPI = process.env.VUE_APP_USER_URL

// 获取用户管理的项目
export const getUserPriject = id =>
  Http.get(userAPI + `power/productions/${id}/0/0/99/desc`)

/**
 * 获取项目管理员列表
 *
 *
 * @param {*} id
 */
export const getPrijectManagers = ({ id, level, start, num, order }) =>
  Http.get(userAPI + `power/managers/${id}/${level}/${start}/${num}/${order}`)

/**
 * 获取指定用户信息列表
 * 多个id查询用户列表
 * @param {*} id
 */
export const getAuthoritys = ids => Http.get(userAPI + `authority/array/${ids}`)

/**
 * 新增 权限
 */
export const putPowerIitem = data => Http.put(userAPI + `power/item`, data)

/**
 *
 * 删除权限
 */
export const deletePowerIitem = data =>
  Http.delete(userAPI + `power/item`, data)
