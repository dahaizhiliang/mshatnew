<template>
    <div class="container">
        <div class="slide-select" :class="{top:slideTop}">
            <span class="icon-1 icon-delete" @click="deleteGoodsMsg">删除</span>
            <span class="icon-1 icon-edit" @click="backEdit">编辑</span>
        </div>
        <ul class="box">
            <li>
                <div class="wrapper">
                    <span class="item-name">供应商</span>
                    <span class="item-msg">{{params.merchants}}</span>
                </div>
            </li>
            <li>
                <div class="wrapper">
                    <span class="item-name">进货日期</span>
                    <span class="item-msg">{{params.getGoodsTime}}</span>
                </div>
            </li>
            <li>
                <div class="goods-msg">
                    <div class="goods"> 
                        <span class="name">进货商品</span>
                        <span class="number">（共{{params.goodsList.length}}种商品）</span>
                    </div>
                    <div class="list-box">
                        <header class="goods-title">
                            <span>商品</span>
                            <span>单价</span>
                            <span>数量</span>
                        </header>
                        <ul class="goods-list">
                            <li class="item-list" v-for="item in params.goodsList" :key="item.goodsId">
                                <span>{{item.GOODS_NAME}}({{item.SPECIFICATIONS}}/{{item.GOODS_UNIT}})</span>
                                <span>{{item.editUnitPrice}}</span>
                                <span>{{item.editNumber}}</span>
                            </li>
                        </ul>
                        <div class="total">总金额：{{params.total}}元</div>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="box">
            <li>
                <div class="wrapper">
                    <span class="item-name">实付金额</span>
                    <span  class="item-msg">{{params.payAmount}}</span>
                    <span  class="item-msg">元</span>
                </div>
            </li>
            <li>
                <div class="wrapper">
                    <span class="item-name">欠款</span>
                    <span class="item-msg">{{params.arrears}}</span>
                    <span class="item-msg">元</span>
                </div>
            </li>
            <li>
                <div class="wrapper">
                    <span class="item-name">付款方式</span>
                    <span class="item-msg">{{params.payWay == 0 ? '现金' : '转账'}}</span>
                </div>
            </li>
            <li>
                <div class="wrapper note">
                    <span class="item-name">备注</span>
                    <textarea v-model="params.noteMsg" class="note-msg" cols="30" rows="5" disabled></textarea>  
                </div>
            </li>
        </ul>
        <mt-button class="confirm-btn" type="primary" size="large" @click="again()">在记一笔</mt-button>
    </div>
</template>

<script>
import { Button,MessageBox,Toast } from 'mint-ui';
import { DeleteSellGoodsMsg } from '../../js/sellGoods/sellGoods.js' 
export default {
    name:'ConfirmPage',
    data(){
        return{
            slideTop:false,
            params:{
                merchants:'',
                getGoodsTime:'',
                goodsList:[],
                total:'',
                payAmount:0,
                arrears:0,
                payWay:0,
                noteMsg:'',  
                orderId:'',
            }
        }
    },
    mounted(){
        this.params = this.$route.params;
        document.addEventListener('touchstart',this.touchStart,false);
        document.addEventListener('touchmove',this.touchMove,false);
    },
    methods:{
        again(){
            this.$router.push({path:'entryGoods'})
        },
        touchStart(event){
            try{
                let touch = event.touches[0], //获取第一个触点
                        x = Number(touch.pageX), //页面触点X坐标
                        y = Number(touch.pageY); //页面触点Y坐标
                //记录触点初始位置
                this.startX = x;
                this.startY = y;
            }catch(e){
                console.log(e.message)
            }
        },
        touchMove(event){
            try{
                let touch = event.touches[0], //获取第一个触点
                        x = Number(touch.pageX), //页面触点X坐标
                        y = Number(touch.pageY); //页面触点Y坐标
                //判断滑动方向
                if (y - this.startY > 150) {
                    // console.log('下滑了！'); 
                    this.slideTop  = true; 
                }
                if(y - this.startY < -100){
                    // console.log('上滑了！');
                    this.slideTop = false;
                }
            }catch(e){
                console.log(e.message)
            }
        },
        deleteGoodsMsg(){
            MessageBox({
                title: '提示',
                message: '是否删除该条进货详情?',
                showCancelButton: true
            }).then(res => {
                DeleteSellGoodsMsg(this.params.orderId)
                    .then(res => {                        
                        if(res.result){
                            Toast({
                                message: res.message,
                                position: 'middle',
                                duration: 1000
                            });
                            setTimeout(()=>{
                                this.$router.push({path:'home'});
                            },1000)
                            
                        }else{
                            Toast({
                                message: res.message,
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    })
                    .catch(res => {
                        
                    })
            }).catch(res => {
                console.log(res)
            });
        },
        backEdit(){
            this.$router.push({name:'EntryGoods',params:this.params})
        },
    }
}
</script>

<style scoped lang='less'>
    @fontColor:#39b4e8;
    @borderStyle:1px solid rgba(228, 228, 228, 1);
    .container{
        padding:.05rem .05rem .5rem;
        .slide-select{
            margin-top: -.6rem;
            margin-bottom: .1rem;
            font-size: .14rem;
            height: .5rem;
            line-height: .5rem;
            border: @borderStyle;
            background: #fff;
            overflow: hidden;            
            &.top{
                margin-top: 0;
                transition-property:margin-top; 
                transition-duration:.1s; 
                transition-timing-function:linear;
            }
            span{
                float: left;
                display: block;
                width: 50%;
                text-align: center;               
            }
        }
        .box{
            margin-bottom: .05rem;
            font-size: .14rem;
            background: #fff;
            border: 1px solid rgba(228, 228, 228, 1);
            border-radius: 3px;
            >li{
                padding: 0 .05rem;
                &:last-child{
                    .wrapper{
                        border-bottom: none;
                    }
                    
                } 
            }
            .wrapper{
                position: relative;
                height: .5rem;
                line-height: .5rem;
                overflow: hidden;
                border-bottom: 1px solid rgba(228, 228, 228, 1);  
                &.note{
                    height: auto;
                    line-height: normal;
                    padding: .1rem 0;
                }
            }
            .note-msg{
                float: left;
                padding: .03rem;
                margin-left: .1rem;
                box-sizing: border-box;
                background: #fff;
            }
            .item-name{
                float: left;
                display: block;
                width: 20%;
                text-align: right;
            }
            .item-msg{
                float: left;
                display: block;
                margin-left: .1rem;
            }
        }
        .goods-msg{
            .goods{
                height: .5rem;
                line-height: .5rem;
                overflow: hidden;
                .name{
                    float: left;
                    display: block;
                    width: 20%;
                    text-align: right;
                }
                .number{
                    float: left;
                    display: block;
                }
            }
            .goods-title{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                padding-bottom: .1rem;
                border-bottom:@borderStyle;
            }
            .list-box{
                .total{
                    padding-right: .2rem;
                    height: .3rem;
                    line-height: .3rem;
                    text-align: right;
                }
            }
            .goods-list{
                .item-list{
                    height: .5rem;
                    line-height: .5rem;
                    border-bottom: @borderStyle;
                    overflow: hidden;
                    span{
                        float: left;
                        display: block;
                        width: 33.33%;
                        text-align: center;
                    }
                }
            }
        }
        .confirm-btn{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
</style>
