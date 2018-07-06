<template>
  <div class="backcontent">

    <div class="contentone">
      <mt-cell title="客户">赵老板</mt-cell>

      <mt-cell title="销售日期" value="说明文字">2018-04-08</mt-cell>
      <mt-cell title="销售商品" ></mt-cell>

      <p class="tabletitle"><span class="tabletitletwo">商品</span><span class="tabletitletwo">单价</span><span class="tabletitletwo">数量</span></p>
      <ul v-for="item in shoplist">
        <li class="shopli">{{item}}</li>
      </ul>
    </div>

    <!--金额-->
    <div class="contenttwo">
      <mt-cell title="折扣价" value="5000元">0</mt-cell>
      <mt-cell title="应收金额" >10000元</mt-cell>
      <mt-cell title="实收金额" >8000元</mt-cell>
      <mt-cell title="欠款" >-2000</mt-cell>
      <mt-cell title="付款方式" >现金</mt-cell>
      <mt-cell title="备注" >无</mt-cell>

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
  export default {
    name: "Info",
    data() {
      return {
        selected: "1",
        shoplist:['金针菇(袋)','杏鲍菇(件)','海鲜菇(箱)']

      };
    },
    methods: {},

    mounted() {

    }
  };
</script>

<style scoped lang='less'>

   .backcontent{
     background-color: #f0f0f0;
   }
      .shopli{
            font-size: 0.14rem;
            border-bottom: 0.01rem solid gray;
            padding: 0.1rem;
            background-color: white;
      }

      .contentone{
            padding: 0.2rem 0.08rem;
            /*background-color: white;*/

      }
      .contenttwo{
        padding: 0.1rem 0.08rem;
      }

      .bottomThree{
        text-align: center;
      }
      .tabletitle{
           font-size: 0.17rem;
           /*padding: 0.1rem;*/
          padding-left: 0.6rem;
        border-bottom: 0.01rem solid gray;
        background-color: white;
      }
      .tabletitletwo{
        padding: 0.1rem;
        padding-left: 0.5rem;
      }

</style>
