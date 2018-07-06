<template>
  <div>
    <!--tab头-->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">进货</mt-tab-item>
      <mt-tab-item id="2">销售</mt-tab-item>
    </mt-navbar>


    <mt-tab-container v-model="selected" class="content">

      <!--进货-->

      <mt-tab-container-item class="contentinfo" id="1">

        <!--搜索框-->
        <div class="search">
          <div class="searchone">
            <search
              placeholder="供应商名称"
              @result-click="resultClick"
              @on-change="getResult"
              :results="results"
              v-model="searchvalue"
              position="absolute"
              auto-scroll-to-top
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit"
              ref="search"></search>
          </div>
        </div>


        <!--筛选条件-->
        <div class="conditiontitle">
            <!--value="总应付款:${{totalPayable}}"-->
            <!--value="总应付款:"-->
          <cell
            title="筛选"
            is-link
            :border-intent="false"
            :arrow-direction="showContent001 ? 'up' : 'down'"
            @click.native="showContent001 = !showContent001">总应付款:{{totalPayable}}元</cell>

          <template v-if="showContent001">

            <datetime
              v-model="value1"
              @on-change="change"
              title="起始日期"
              @on-cancel="log('cancel')"
              @on-confirm="onConfirm"
              @on-hide="log('hide', $event)"></datetime>

            <datetime
              v-model="value2"
              @on-change="change"
              title="结束日期"
              @on-cancel="log('cancel')"
              @on-confirm="onConfirm"
              @on-hide="log('hide', $event)"></datetime>


            <!--是否结算-->
            <div class="ifsale">
              <checker
                v-model="Bill"
                default-item-class="demo5-item"
                selected-item-class="demo5-item-selected"
              ><span>是否结算:</span>
                <checker-item v-for="i in ['全部', '未结清','已结清']" :key="i" :value="i">{{i}}</checker-item>
              </checker>

            </div>

            <!--确认 清空-->

            <flexbox gutter="10" class="conditionconfirm">
              <flexbox-item @click.native="cleanAll()">
                <div class="flex-demo">清空</div>
              </flexbox-item>
              <!--<flexbox-item @click.native="confirmCondition()">-->
              <flexbox-item @click.native="getPurchaseConfirm()">
                <div class="flex-demo">确认</div>
              </flexbox-item>
            </flexbox>
          </template>
        </div>


        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="list">

          <div class="item" v-for="item in purchaseList" @click=jumpChase(item.tz_id)>

            <p class="p1">{{item.in_date}}</p>
            <p class="p2">
              <span>{{item.seller_booth_name}}</span> <span class="money">应付款:{{item.debt_money}}元</span>
            </p>
          </div>
        </ul>
      </mt-tab-container-item>



      <!--销售-->
      <mt-tab-container-item class="contentinfo" id="2">

        <!--搜索框-->
        <div class="search" >
          <div class="searchone">
            <search
              placeholder="供应商名称"
              @result-click="resultClick"
              @on-change="getResult"
              :results="results"
              v-model="searchvalue2"
              position="absolute"
              auto-scroll-to-top
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit"
              ref="search"></search>
          </div>
        </div>


        <!--筛选条件-->
        <div class="conditiontitle">
          <cell
            title="筛选"
            is-link
            :border-intent="false"
            :arrow-direction="showContent001 ? 'up' : 'down'"
            @click.native="showContent001 = !showContent001">总应收款:{{totalReceivables}}元</cell>

          <template v-if="showContent001">

            <datetime
              v-model="value1"
              @on-change="change"
              title="起始日期"
              @on-cancel="log('cancel')"
              @on-confirm="onConfirm"
              @on-hide="log('hide', $event)"></datetime>

            <datetime
              v-model="value2"
              @on-change="change"
              title="结束日期"
              @on-cancel="log('cancel')"
              @on-confirm="onConfirm"
              @on-hide="log('hide', $event)"></datetime>


            <!--是否结算-->
            <div class="ifsale">
              <checker
                v-model="Bill"
                default-item-class="demo5-item"
                selected-item-class="demo5-item-selected"
              ><span>是否结算:</span>
                <checker-item v-for="i in ['全部', '未结清','已结清']" :key="i" :value="i">{{i}}</checker-item>
              </checker>

            </div>

            <!--确认 清空-->

            <flexbox gutter="10" class="conditionconfirm">
              <flexbox-item @click.native="cleanAll()">
                <div class="flex-demo">清空</div>
              </flexbox-item>
              <!--<flexbox-item @click.native="confirmCondition()">-->
              <flexbox-item @click.native="getPurchaseConfirm()">
                <div class="flex-demo">确认</div>
              </flexbox-item>
            </flexbox>
          </template>
        </div>


        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="list">

          <div class="item" v-for="item in salesList" @click=jumpSales()>

            <p class="p1">{{item.in_date}}</p>
            <p class="p2">
              <span>{{item.buyer_booth_name}}</span> <span class="money">应收款:{{item.debt_money}}元</span>
            </p>
          </div>
        </ul>
      </mt-tab-container-item>





    </mt-tab-container>


  </div>
</template>

<script>


  import {
    Loading, Alert, XSwitch, XButton, Checker, CheckerItem, Divider, Cell, Flexbox,
    FlexboxItem, Search, Datetime
  } from 'vux'
  import Commonmsg from "./Commonmsg";
  import { QuerySupplieList, getPurchaseListRequire,getSalesList } from '../../js/entryGoods/entryGoods.js'

  export default {

    components: {
      Loading, Alert, XSwitch, XButton, Checker, CheckerItem, Divider, Cell, Flexbox,
      FlexboxItem, Search, Datetime
    },
    name: "Info",
    data() {
      return {
        value1: '2015-11-12',
        value2: '2018-01-12',

        selected: "1",
        liflage: false,
        searchvalue: '',
        searchvalue2: '',

        searchFlag:true,

//       供应商相关字段
        purchaseList: [],
        buyerBoothName:'',
        inDate:'',
        actualMoney:'',
        totalPayable:'',


//      销售列表
        salesList: [],
        totalReceivables:'',

        params:{
          merchants:'',
          merchantsId:'',
          getGoodsTime:'',
          goodsList:[],
          payWay:'',
          noteMsg:'',
        },

        payState:'',

        list2: [],
        j: 0,
        flagone: false,
        show: true,
        showContent001: false,
        Bill: '',
      };
    },
    methods: {

//      初始数据请求的方法
      getPurchase(){
        let data ={
          start_time:"",
          end_time:"",
          pay_state:"",
          buyer_booth_id:"2",
          seller_booth_name:"cs"
        }

        getPurchaseListRequire(data)
          .then(res => {
            this.purchaseList = res.data.tzList;

            this.totalPayable=res.data.tzBean.total_debt_money;

            this.purchaseList.forEach(ele => {
              console.log(ele.record_date)
            })

          })
          .catch(res => {
            console.log(res)
          })
      },

//    点击搜索出来的数据
      getPurchasesearch(va){
        let data ={
          start_time:"",
          end_time:"",
          pay_state:"",
          buyer_booth_id:"2",
          seller_booth_name:va
        }

        getPurchaseListRequire(data)
          .then(res => {
            this.purchaseList = res.data.tzList;

            this.totalPayable=res.data.tzBean.total_debt_money;

            this.purchaseList.forEach(ele => {
//              total_debt_money   总应付款
//              console.log(ele.record_date)


            })

          })
          .catch(res => {
            console.log(res)
          })
      },

//      点击确认出来的数据
      getPurchaseConfirm(){
        switch (this.Bill){
          case this.Bill="全部":
            this.payState = ""
            break;
          case this.Bill="未结清":
            this.payState = 1
            break;
          case this.Bill="已结清":
            this.payState = 2
            break;
        }

        let data ={
          start_time:this.value1,
          end_time:this.value2,
          pay_state:this.payState,
          buyer_booth_id:"2",
          seller_booth_name:"cs"
        }

        getPurchaseListRequire(data)
          .then(res => {
            this.purchaseList = res.data.tzList;

            this.totalPayable=res.data.tzBean.total_debt_money;
//            this.purchaseList.forEach(ele => {
//              console.log(ele.record_date)
//
//
//            }
// )

          })
          .catch(res => {
            console.log(res)
          })
      },


//      跳转到详情
      jumpChase(tzid) {
        this.params.merchantsId =  tzid;
        this.$router.push({name:'InfoDetial',params:this.params})
      },

//销售搜索list   {"start_time":"2018-07-05 00:00:00","end_time":"2018-07-06 00:00:00","pay_state":"2","seller_booth_id":"2","buyer_booth_name":"测试"}

      getSalesData(){
        let data ={
          start_time:"",
          end_time:"",
          pay_state:"",
          seller_booth_id:"2",
          buyer_booth_name:"cs"
        }

        getSalesList(data)
          .then(res => {
            this.salesList = res.data.tzList;

            this.totalReceivables=res.data.tzBean.total_debt_money;

            this.salesList.forEach(ele => {
              console.log(ele.record_date)
            })

          })
          .catch(res => {
            console.log(res)
          })
      },



      openCondition() {
        this.flagone = true;
      },

      jumpSales() {
        this.$router.push({path: "infodetailsale"})
      },

      loadMore() {
        for (var i = 0; i < 20; i++, this.j++) {
          this.list.push('蘑菇基地' + this.j)
        }

      },

      loadMoreSales() {
        for (var i = 0; i < 10; i++) {
          this.list2.push('新发地赵' + i)
        }


      },

      openPicker() {
        this.$refs.picker.open();
      },
      getTime() {
        this.selectTime = formatTime('yyyy-MM-dd', this.pickerVisible);
      },

      confirmCondition() {
//          alert(this.value1+'---------'+this.Bill+'----'+this.value2)
        alert(this.searchvalue)
      },

      cleanAll() {
        alert(this.value1 + '---------' + this.Bill + '----' + this.value2)

        this.value1 = '';
        this.Bill = '';
        this.value2 = '';
      },

//      搜索相关的方法
      setFocus() {
        this.$refs.search.setFocus()
      },
      resultClick(item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult(val) {
        console.log('on-change', val)
        this.results = val ? getResult(this.value) : []
      },
      onSubmit() {


        this.getSalesData(this.searchvalue2);

        this.getPurchasesearch(this.searchvalue);


        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus() {
        console.log('on focus')
      },
      onCancel() {
        console.log('on cancel')
      },
      change(value) {
        console.log('change', value)
      },
      onConfirm(val) {
        console.log('on-confirm arg', val)
        console.log('current value', this.value1)
      }
    },

    mounted() {
//      进来请求到的参数
      this.getPurchase();

      this.getSalesData();

    }
  };
</script>

<style scoped lang='less'>
  .money {
    margin-left: 1.1rem;
  }

  .filterp {
    height: 0.5rem;
  }

  .search {
    font-size: 0.01rem;
    height: 0.5rem;
    margin-top: 0.05rem;

  }

  .contentinfo {
    background-color: #f2f2f2;
  }

  .item {
    height: 0.7rem;
    margin: 0.08rem;
    background-color: white;
    .p1 {
      font-size: 0.08rem;
      padding: 0.08rem;
      margin-left: 0.11rem;
    }

    .p2{
      display: flex;
      justify-content: space-between;
      padding-right: 0.2rem;
    }
    p {
      font-size: 0.08rem;
      margin-top: 0.11rem;
      margin-left: 0.15rem;
    }
  }

  .item2 {
    height: 1rem;
    margin: 0.08rem;
    background-color: white;
    .p1 {
      font-size: 0.08rem;
      padding: 0.08rem;
      margin-left: 0.11rem;
    }
    p {
      font-size: 0.08rem;
      margin-top: 0.11rem;
      margin-left: 0.15rem;
    }
  }

  .lisize {
    font-size: 8px;
    border-bottom: 1px solid black;
    margin-top: 1px;
  }

  .conditiontitle {
    margin: 0.09rem;
    display: flex;
    flex-direction: column;
    font-size: 0.15rem;
    background-color: #fff;
    padding-left: .03rem;
    padding-right: .03rem;
    .conditionconfirm {
      margin-top: 0.2rem;
      line-height: .3rem;
    }
    .ifsale {
      line-height: .5rem;
      span {
        margin-right: 0.1rem;
        margin-left: 0.15rem;
      }
    }
  }

  .condition {
    display: flex;
    flex-direction: column;
    font-size: 0.15rem;

    .saledate {
      display: flex;
      justify-content: space-between;
    }
    .query {
      display: flex;
      justify-content: space-between;
    }
  }

  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #199ED8;
    border-radius: 4px;
    background-clip: padding-box;
  }

  .sub-item {
    color: #888;
  }

  .demo5-item {
    width: 0.6rem;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }

  .demo5-item-selected {
    border-color: #ff4a00;
  }

  .wrapper {
    position: relative;
    height: .5rem;
    line-height: .5rem;
    overflow: hidden;
    .select-type {
      color: #fff;
    }
    .pay-btn {
      margin-left: .1rem;
    }

  }

  .right-text {
    float: right;
    display: block;
    padding-right: .2rem;
  }

  .content {
    margin-top: 0.018rem;
  }
</style>
