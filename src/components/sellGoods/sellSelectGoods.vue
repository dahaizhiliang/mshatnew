<template>
    <div class="select-goods">
        <mt-search v-model="seacthValue"  cancel-text="取消" placeholder="搜索商品" @keyup.enter.native="search"> </mt-search>
        <div class="content">
            <div class="goods">                
                <header class="goods-title">
                    <span>商品</span>
                    <span>单价</span>
                    <span>数量</span>
                </header>
                <ul class="goods-list">
                    <li v-for="item in goodsList" :key="item.goodsId">
                        <span class="select-item icon-1 icon-check" :class="{active:item.check}" @click="selectCurrentGoods(item)"></span>                        
                        <span class="goods-name">{{item.GOODS_NAME}} ({{item.SPECIFICATIONS}}/{{item.GOODS_UNIT}})</span>
                        <div class="show-price" v-if='!item.fillOk'>&yen; {{item.PRICE}}</div>
                        <div class="edit-price" v-if='item.fillOk'>
                            <div class="price">
                                <span class="subtract" @click="editPriceClick(item,-1)">-</span>
                                <input class="fill-input" type="number" v-model="item.editUnitPrice">
                                <span class="add" @click="editPriceClick(item,1)">+</span>
                            </div>
                            <div class="number">
                                <span class="subtract" @click="editNumberClick(item,-1)">-</span>
                                <input class="fill-input" type="number" v-model="item.editNumber">
                                <span class="add" @click="editNumberClick(item,1)">+</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>            
        </div> 
        <p class="prompt-msg">- {{prompt}} -</p>
        <div class="mask-layer" v-if="showMaskLayer" @click='closeMaskLayer($event)'>
            <div class="fill-box">
                <h4 class="goods-name">{{selectGoodsName}}</h4>
                <ul>
                    <li class="item">
                        <span class='item-name'>单价</span>
                        <input class='fill-input' type="number" v-model="price"> 
                        <span class="unit">元/箱</span>
                    </li>
                    <li class="item">
                        <span class='item-name'>数量</span>
                        <input class='fill-input' type="number" v-model="number">
                        <span class="unit">箱</span>
                    </li>
                    <li class="item">
                        <span class='item-name'>小计</span>
                        <input class='fill-input' type="number" :value="totalPrice" disabled>
                        <span class="unit">元</span>
                    </li>
                </ul>
                <mt-button type='primary' size="small" class="confirm-btn" @click='fillBoxConfirmBtn()'>确定</mt-button>
            </div>
        </div>  
        <div class="footer">
            <div class="all-goods-total">合计：{{allGoodsTotal}}元</div>
            <mt-button class="footer-btn" type='primary' size="small" @click="selectConfirm()">选好了</mt-button>
        </div>     
    </div>
</template>

<script>
import { Search,Button,Toast } from 'mint-ui';
import { QuerySellGoodslist } from '../../js/sellGoods/sellGoods.js'
export default {
    name:'SellSelectGoods',
    data(){
        return{
            seacthValue:'',
            isSelect:true,
            selectId:'',
            goodsList:[
                {
                    goodsId:1,
                    name:'金针菇',
                    unit:'袋',
                    editUnitPrice:25,
                    editNumber:1,
                    check:false,  
                    fillOk:false,                  
                },
                {
                    goodsId:2,
                    name:'金针菇2',
                    unit:'袋',
                    editUnitPrice:18,
                    editNumber:1,
                    check:false,
                    fillOk:false,
                }
            ],
            showMaskLayer:false,
            selectGoodsName:'',
            price:1,
            number:1,
            unit:'',
            params:{
                merchants:'',
                getGoodsTime:'',
                goodsList:[],
                payWay:'',
                msg:'',
            },
            prompt:'',
            
        }
    },
    mounted(){
        let data = {
            page:1,
            cols:15,
            userId:2,
        }
        QuerySellGoodslist(data)
            .then(res => {             
                res.data.salesList.forEach(ele => {
                    ele.check = false;
                    ele.fillOk = false;
                    ele.editUnitPrice = ele.PRICE;
                    ele.editNumber = 1; 
                })
                this.goodsList = res.data.salesList;
                this.params = this.$route.params;
                if(this.$route.params.goodsList.length>0){                  
                    let idArr = [];
                    this.params.goodsList.forEach(ele=>{
                        idArr.push(ele.ID);
                    })      
                    this.goodsList.forEach(ele => {
                        if(idArr.includes(ele.ID)){    
                            ele.check = true;
                            ele.fillOk = true;
                            this.params.goodsList.forEach(val => {
                                if(val.ID == ele.ID){
                                    ele.editUnitPrice = val.editUnitPrice;
                                    ele.editNumber = val.editNumber;  
                                }
                            })
                        }
                    })
                }
                if(this.goodsList.length == 0){
                    this.prompt = "暂无数据"
                }else if(this.goodsList.length > 0){
                    this.prompt = '已加载全部';
                }
            })
            .catch(res => {
                console.log(res)
            })
    },
    computed:{
        totalPrice:function(){
            return Number.parseFloat(this.price * this.number).toFixed(2)
        },
        allGoodsTotal:function(){
            let priceArr = [],sum = 0;
            this.goodsList.forEach(ele => {
                if(ele.check && ele.fillOk){
                    priceArr.push(Number.parseFloat(ele.editUnitPrice * ele.editNumber).toFixed(2))
                }
            })
            priceArr.forEach(ele => {                
                sum += Number(ele);
            })
            return sum.toFixed(2);
        }
    },
    methods:{
        selectCurrentGoods(item){
            if(item.check){
                item.check = false;
                item.fillOk = false; 
                this.selectId = item.ID; 
            }else{
                item.check = true;
                this.showMaskLayer = true;                
                this.selectId = item.ID;
                this.selectGoodsName = item.GOODS_NAME;
                this.price = item.PRICE;
                this.number = 1;
                this.unit = item.GOODS_UNIT;
            }
            
        },
        editPriceClick(item,way){
            if(way > 0){
                item.editUnitPrice++
            }else{
                if(item.editUnitPrice <= 1){
                    item.editUnitPrice = 1;
                }else{
                    item.editUnitPrice--
                }
            }
        },
        editNumberClick(item,way){
            if(way > 0){
                item.editNumber++
            }else{
                if(item.editNumber <= 1){
                    item.editNumber = 1;
                }else{
                    item.editNumber--
                }
            }
        },
        closeMaskLayer(e){            
            if(e.currentTarget == e.target){
                this.showMaskLayer = false;
                this.goodsList.forEach(ele => {
                    if(ele.ID == this.selectId){
                        ele.check = false;
                        ele.fillOk = false;
                    }  
                })
            }            
        },
        fillBoxConfirmBtn(){
            let priceReg = /^\d+(\.\d{1,2})?$/;
            let numerReg = /^[1-9]\d*$/;
            if(!priceReg.test(this.price)){
                Toast({
                    message: '单价格式不正确',
                    position: 'bottom',
                    duration: 2000
                });
                return;
            }
            if(!numerReg.test(this.number)){
                Toast({
                    message: '数量格式不正确',
                    position: 'bottom',
                    duration: 2000
                });
                return;
            }

            this.showMaskLayer = false;
            this.goodsList.forEach(ele => {
                if(ele.ID == this.selectId){
                    ele.fillOk = true;
                    ele.editUnitPrice = this.price;
                    ele.editNumber = this.number;
                }  
            })
        },
        selectConfirm(){
            let selectGoodsData = [];
            this.goodsList.forEach(ele => {
                if(ele.check){
                    selectGoodsData.push(ele);
                }
            })
            this.params.goodsList = selectGoodsData;
            this.$router.push({name:'SellGoods',params:this.params})
       },
       search(){
            let data = {
                goodsName:this.seacthValue,
                suppliersName:"",
                cols:15,
                page:1,
            }
            QuerySellGoodslist(data)
                .then(res => {             
                    res.data.salesList.forEach(ele => {
                        ele.check = false;
                        ele.fillOk = false;
                    })
                    this.goodsList = res.data.salesList;                
                    if(this.goodsList.length == 0){
                        this.prompt = "暂无数据"
                    }else if(this.goodsList.length > 0){
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
    .select-goods{
        position: relative;
        font-size: .14rem;
        .content{
            padding: .05rem;
        }
        .goods{
            background: #fff;
            .goods-title{
                display: flex;
                flex-direction:row;
                justify-content:space-around;
                height: .4rem;
                line-height: .4rem;
            }
            .goods-list{
                padding:0 .05rem;
                >li{
                    height: .5rem;
                    line-height: .5rem;
                    border-top: @borderStyle;
                    overflow: hidden;
                }
            }
            .select-item{
                float: left;
                display: block;
                position: relative;
                width: 8%;
                text-align: center;
                height: .4rem;
                &::before{
                    position: absolute;
                    left: 50%;
                    transform: translate(-.1rem);
                }
                &.active::before{
                    color: @fontColor;
                }                
            }
            .goods-name{
                float: left;
                display: block;
                width: 26%;
            }
            .show-price{
                float: left;
                padding-left: 12%;
                width: 54%;
            }
            .edit-price{
                float: left;
                width: 66%;
                >div{
                    float: left;
                    padding:0 5%;
                    width: 40%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                }
                .subtract,.add{
                    display: inline-block;
                    font-size: .18rem;
                    width: 20%;
                    text-align: center;
                }
                .fill-input{
                    display: inline-block;
                    width: 60%;
                    text-align: center;
                    background: #fff;
                }
            }
        }
        .prompt-msg{
            color: #999;
            font-size: .12rem;
            text-align: center;
        }
        .mask-layer{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,.3);
            z-index: 999;            
            .fill-box{
                margin: 30% auto 0;
                padding:.1rem .2rem;
                width: 50%;
                background: #fff;
                border-radius: 3px;
                box-sizing: border-box;
                .goods-name{
                    margin-bottom: .1rem;
                    height: .3rem;
                    line-height: .3rem;
                    text-align: center;
                }
                .item{
                    margin-bottom: .1rem;
                    height: .2rem;
                    line-height: .2rem;
                }
                .item-name,.fill-input,.unit{
                    float: left;
                    display: block;                    
                }
                .item-name{
                    width: 30%;
                }
                .fill-input{
                    width: 40%;
                    text-align: center;
                    border-bottom: @borderStyle;
                    background: #fff;
                }
                .unit{
                    width: 30%;
                    text-align: right;
                }
                .confirm-btn{
                   margin: .2rem auto 0;
                   padding: 0 28px;
                   display: block; 
                }
            }
        }
        .footer{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: .4rem;
            line-height: .4rem;
            .all-goods-total{
                float: left;
                padding-right: 10px;
                width: 70%;
                text-align: right;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                background: #fff;
                box-sizing: border-box;
            }
            .footer-btn{
                float: right;
                width: 30%;
                height: .4rem;
                line-height: .4rem;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
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
</style>