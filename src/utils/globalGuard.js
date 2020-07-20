import router from '@/router'
import store from '@/store'
let setpath = ['index', 'login', 'register', 'resetPassword','agreement1','agreement2','agreement3','agreement4']
// 全局守卫拦截
router.beforeEach((to, from, next) => {
  // 'index', 'login', 'register' 免验证 

  if (setpath.indexOf(to.name) == -1) {
    if (!store.getters.token || !store.getters.userInfo['id']) {
      next({ path: '/' })
    }
  }
  next()
})
