import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import ForgetPassword from '@/components/login/forgetPassword'
import Home from '@/components/home/home'
import EntryGoods from '@/components/entryGoods/entryGoods'
import Merchants from '@/components/entryGoods/merchants'
import SelectGoods from '@/components/entryGoods/selectGoods'
import ConfirmPage from '@/components/entryGoods/confirmPage'
import SellGoods from '@/components/sellGoods/sellGoods'
import Customer from '@/components/sellGoods/customer'
import SellSelectGoods from '@/components/sellGoods/sellSelectGoods'
import SellConfirmPage from '@/components/sellGoods/sellConfirmPage'
import InfoDetail from '@/components/info/infodetail'
import InfoDetailSale from '@/components/info/infodetailsale'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path:'/entryGoods',
      name:'EntryGoods',
      component:EntryGoods,
    },
    {
      path:'/merchants',
      name:'Merchants',
      component:Merchants,
    },
    {
      path:'/selectGoods',
      name:'SelectGoods',
      component:SelectGoods,
    },
    {
      path:'/confirmPage',
      name:'ConfirmPage',
      component:ConfirmPage,
    },
    {
      path:'/sellGoods',
      name:'SellGoods',
      component:SellGoods,
    },
    {
      path:'/customer',
      name:'Customer',
      component:Customer,
    },
    {
      path:'/sellSelectGoods',
      name:'SellSelectGoods',
      component:SellSelectGoods
    },
    {
      path:'/sellConfirmPage',
      name:'SellConfirmPage',
      component:SellConfirmPage,
    },{
      path:'/infodetail',
      name:'InfoDetial',
      component:InfoDetail,
    },{
      path:'/infodetailsale',
      name:'InfoDetialSale',
      component:InfoDetailSale,
    }
  ]
})
