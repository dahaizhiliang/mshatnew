// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入全部组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if(to.path === '/') {
    localStorage.clear();
    next();
    return
  }
  if(localStorage.getItem('username')) {
    next()
  } else {
    next({path:'/'})
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
