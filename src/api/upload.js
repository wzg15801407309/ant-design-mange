import Http from '@/utils/http'
// 从全局配置中拿取
const userAPI = process.env.VUE_APP_USER_URL

/**
 * 上传文件
 */
export const putFile = data => Http.put(userAPI + 'upload/file', data)
