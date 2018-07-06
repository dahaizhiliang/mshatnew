<template>
  <div class="backcontent">

    <div class="contentone">
      <mt-cell title="供应商">{{purchaseName}}</mt-cell>

      <mt-cell title="进货日期" value="说明文字">2018-04-08</mt-cell>
      <mt-cell title="进货商品"></mt-cell>

      <p class="tabletitle"><span >商品</span><span >单价</span><span>数量</span></p>
      <ul v-for="item in shoplistGetNet">
        <li class="shopli">
        <div>{{item.gb_name}}</div>
        <div>{{item.price}}</div>
        <div>{{item.number}}</div>

        </li>
      </ul>
    </div>

    <!--金额-->
    <div class="contenttwo">
      <mt-cell title="实付金额" value="5000元"></mt-cell>
      <mt-cell title="欠款">4100元</mt-cell>
      <mt-cell title="付款方式">现金</mt-cell>
      <mt-cell title="备注">无</mt-cell>

    </div>

    <!--<div>-->


    <!--<mt-tabbar v-model="selected" fixed>-->


    <div class="page-button-group bottomThree">
      <mt-button type="primary">&nbsp打&nbsp&nbsp&nbsp&nbsp&nbsp印&nbsp</mt-button>
      <mt-button type="primary">&nbsp转&nbsp&nbsp&nbsp&nbsp&nbsp发&nbsp</mt-button>
      <mt-button type="primary">再记一笔</mt-button>
    </div>

  </div>

</template>

<script>
  import { getPurchaseDetailRequire } from '../../js/entryGoods/entryGoods.js'

  export default {
    name: "Info",
    data() {
      return {
        selected: "1",
        shoplist: ['金针菇(袋)', '杏鲍菇(件)', '海鲜菇(箱)'],
        shoplistGetNet: [],
        tzId:'',

//        详情字段   商品    单价   数量
        purchaseName:'',


      };
    },
    methods: {

      //      获取收货单数据  {"tz_id":"7226833639478807816"}
      getPurchaseDetail(id){
        let data ={
          tz_id:id
        }

        getPurchaseDetailRequire(data)
          .then(res => {
            this.shoplistGetNet = res.data.tzDetailList;

            this.shoplistGetNet.forEach(ele => {
//              console.log(ele.shop_booth_id)
              this.purchaseName=ele.shop_booth_id;
            })

          })
          .catch(res => {
            console.log(res)
          })
      },
    },

    mounted() {

      this.tzId = this.$route.params.merchantsId;
//      console.log(this.tzId);
      this.getPurchaseDetail(this.tzId)

    }
  };
</script>

<style scoped lang='less'>

  .backcontent {
    background-color: #f0f0f0;
  }

  .shopli {
    display: flex;
    justify-content: space-between;
    font-size: 0.14rem;
    padding: 0.1rem;
    border-bottom: 0.01rem solid gray;
    background-color: white;
  }

  .contentone {
    padding: 0.2rem 0.08rem;
    /*background-color: white;*/

  }

  .contenttwo {
    padding: 0.1rem 0.08rem;
  }

  .bottomThree {
    text-align: center;
  }

  .tabletitle {
    display: flex;
    justify-content: space-between;
    font-size: 0.17rem;
    padding: 0.15rem;
    border-bottom: 0.01rem solid gray;
    background-color: white;
  }

  .tabletitletwo {
    padding: 0.1rem;
    padding-left: 0.5rem;
  }

</style>
