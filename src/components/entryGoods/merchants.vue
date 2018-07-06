<template>
    <div class="select-merchants">
        <mt-search v-model="seacthValue"  cancel-text="取消" placeholder=" 输入供应商名称、联系人名称、联系电话" @keyup.enter.native="search"> </mt-search>
        <ul class="merchants-list">
            <li v-for="item in merchantsList" :key="item.shop_concacts_id" @click="selectMerchants(item.biz_name,item.shop_concacts_id)"> 
                <h3 class="shop-name">{{item.biz_name}}</h3>
                <p class="info-msg">{{item.concact_name}}({{item.cellphone}})</p>
            </li>
        </ul>
        <p class="prompt-msg">- {{prompt}} -</p>
    </div>
</template>

<script>
import { Search } from 'mint-ui';
import { QuerySupplieList,Checkpurchaselist } from '../../js/entryGoods/entryGoods.js'

export default {
    name:'Merchants',
    data(){
        return{
            seacthValue:'',
            merchantsList:[
                {
                    shopName:'蘑菇基地',
                    name:'王老板',
                    phoneNumber:'13658955555'
                },
                {
                    shopName:'草莓基地',
                    name:'苏老板',
                    phoneNumber:'13656565555'
                },
            ],
            prompt:'',
            params:{
                merchants:'',
                merchantsId:'',
                getGoodsTime:'',
                goodsList:[],
                payWay:'',
                noteMsg:'',
            },
        }
    },
    mounted(){        
        this.params = this.$route.params;
        let data = {
            page:1,
            cols:15,
            userId:2,
            type:1,
            concact_name:"",
            biz_name:"",
        }
        QuerySupplieList(data)
            .then(res => {
                this.merchantsList = res.data.dataList;
                if(this.merchantsList.length == 0){
                    this.prompt = "暂无数据"
                }else if(this.merchantsList.length > 0){
                    this.prompt = '已加载全部';
                }
            })
            .catch(res => {
                console.log(res.result)
            })
    },
    methods:{
        selectMerchants(name,id){
            this.params.merchants = name;
            this.params.merchantsId =  id;
            this.$router.push({name:'EntryGoods',params:this.params})
        },
        search(){
            let data ={
                page:1,
                cols:15,
                userId:2,
                type:1,
                concact_name:this.seacthValue
            }
            QuerySupplieList(data)
                .then(res => {
                    this.merchantsList = res.data.dataList;
                    if(this.merchantsList.length == 0){
                        this.prompt = "暂无数据"
                    }else if(this.merchantsList.length > 0){
                        this.prompt = '已加载全部';
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        }   
    }
}
</script>

<style scoped lang='less'>
    @fontColor:#39b4e8;
    @borderStyle:1px solid rgba(228, 228, 228, 1);
    .select-merchants{
        font-size: .14rem;
        .merchants-list{
            padding: .05rem;
            >li{
                padding: .1rem;
                margin-bottom: .05rem;
                background: #fff;
                border: @borderStyle;
                border-radius: 3px;
                .shop-name{
                    margin-bottom: .05rem;
                    font-size: .16rem;
                    color: @fontColor;
                }
                .info-msg{
                    font-size: .14rem;
                }
            }
        }
        .search-box{
            font-size: .14rem;
        }
        .prompt-msg{
            color: #999;
            font-size: .12rem;
            text-align: center;
        }
    }
</style>
<style>
.mint-search{
    height: auto;
}
.mint-searchbar-core{
    padding-left: .1rem;
}
.mint-searchbar-core{
    font-size: .14rem;
}
</style>

