import Vue from 'vue'
import Router from 'vue-router'
import { constRouterMap } from './routes'
const routerPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)
export default new Router({
  mode: 'history',
  // vue-cli3 中新得属性
  base: process.env.BASE_URL,
  routes: constRouterMap
})
