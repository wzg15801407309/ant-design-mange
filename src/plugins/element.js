/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 * 当需要更多组件依赖时，在该文件加入即可
 */
import Vue from 'vue' 
import { Message,Alert } from 'element-ui'; 
Vue.use(Alert)
Vue.prototype.$message = Message
