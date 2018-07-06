<template>
    <div>
        <div class="top-content">
            <div class="head">
                <span class="prev" @click="prevMounth()">&lt;</span>
                <span class="time">{{month[index]}}</span>
                <span class="next" @click="nextMounth()">&gt;</span>
            </div>
            <div class="container">
                <div class="top-box" @click='topTap()'></div>
                <div  v-if="currDebt" class="angle" v-bind:style="{ transform: 'rotate(' + angle +'deg)' }"></div>                
                <div class="middle-box" @click="middleCanvasTap()">
                    <canvas id="myCanvas" width="200" height="200"></canvas>
                </div>
                <div class="bottom-box"></div>
                <div class="darw-text">
                    <span class="title">{{title}}</span>
                    <div class="total-number">
                        <div v-if="sales">
                            <span v-if="salesShowAmount">&yen;{{salesTotal[index]}}</span>
                            <span  v-if='!salesShowAmount'>*****</span>
                            <span class="icon" :class="{'show-img':salesShow,'hide-img':!salesShow}" @click='salesIsLook()'></span>
                        </div>
                        <div v-if='debt'>
                            <span  v-if='debtShowAmount'>&yen;{{debtTotal[index]}}</span>
                            <span  v-if='!debtShowAmount'>*****</span>
                            <span class="icon" :class="{'show-img':debtShow,'hide-img':!debtShow}" @click='debtIsLook()'></span>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="statistical">
                <div class="item">今日销售额：&yen;{{todySellMoney}}</div>
                <div class="item">库存总量：0</div>
            </div>        
        </div>
        <Type></Type>
    </div>
    
</template>

<script>
import Type from './type';
import {HomeData} from '../../js/login/login.js'
export default {
    name:'Page',    
    data () {
        return {   
            month:[],
            salesTotal:[],
            debtTotal:[],
            index:0,
            title:'销售总额',
            sales:true,
            debt:false,
            salesShowAmount:true,
            debtShowAmount:true,
            salesShow:true,
            debtShow:true,
            currDebt:false,
            angle:45,
            todySellMoney:'',
            percentageLL:0,
        }
    },
    created(){
        //加载数据
        HomeData(localStorage.getItem('userId'))
            .then(res => {
                localStorage.setItem('buyId',res.data.dayMap.shop_booth_id);
                this.todySellMoney = res.data.dayMap.day_m;
                res.data.monthList.forEach(ele => {
                    this.month.push(ele.month);
                    this.salesTotal.push(ele.sale_m);
                    this.debtTotal.push(ele.arrear_m); 
                })
                this.index = res.data.monthList.length-1;   
                this.percentage = Number.parseFloat(Math.abs(this.debtTotal[this.index]) / this.salesTotal[this.index] ).toFixed(2); 
                this.draw(this.percentage);               
            })
            .catch(res => {
                console.log(res)
            })
    },
    mounted(){  
                
        
    },  
    methods:{
        formatDate(date){
            return data.slice(0,3) + '年' + data.slice(5,6);
        },
        //绘制图形
        draw(){         
            let myCanvas = document.getElementById("myCanvas");
            let ctx = myCanvas.getContext("2d");
            ctx.fillStyle='white';
            ctx.clearRect(0, 0, 100, 100);
            ctx.fill()

            ctx.lineWidth=26;
            ctx.strokeStyle='#f60';
            ctx.lineCap='butt';
            ctx.beginPath();
            ctx.arc(100, 100, 87, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * this.percentage);
            ctx.stroke();

            this.angle = 360 * this.percentage / 2 + 45;
        },
        // 获取上月日期
        prevMounth(){
            if(this.index <= 0 ){
                this.index = 0;                
            }else{
                this.index-- ;                
            }
        },
        // 获取下月日期
        nextMounth(){
            if(this.index >= this.month.length -1 ){
                this.index = this.month.length -1 ;                  
            }else{
                this.index++;                
            }
        },
        salesIsLook(){
            this.salesShowAmount= !this.salesShowAmount;
            this.salesShow = !this.salesShow;
        },
        debtIsLook(){
            this.debtShowAmount= !this.debtShowAmount;
            this.debtShow = !this.debtShow;
        },
        topTap(){
            this.sales= true;
            this.debt= false;
            this.currDebt= false;
            this.title = '销售总额';
        },
        middleCanvasTap(){
            this.sales= false;
            this.debt= true;
            this.currDebt= true;
            this.title = '欠款总额';
        },
    },
    components:{
        Type,
    }
}
</script>

<style socped lang='less'>
    .top-content{
        padding-top: .25rem;
        background: #199ed8;
        .head{
            display: flex;
            flex-direction: row;
            justify-content:center;
            font-size: .2rem;
            color: #fff;
            .time{
                margin: 0 .15rem;
            }
        }
        .container{
            position: relative;
            margin: .15rem auto .2rem;
            width: 2rem;
            height: 2rem;
            .angle{
                position: absolute;
                top: 42px;
                left: 42px;
                width: 116px;
                height: 116px;  
                overflow: hidden;
                z-index: 3;
                &:before{
                    content: '';
                    position: absolute;
                    top:-8px;
                    left: -8px;
                    display: block;
                    width: 0;
                    height: 0;
                    border: 8px solid;
                    border-color: transparent transparent #fff transparent;
                    transform: rotate(-45deg); 
                }
            }
            .top-box{
                position: absolute;
                top: .25rem;
                left: .25rem;
                width: 1.5rem;
                height: 1.5rem;  
                border-radius: 50%; 
                background: #fff;
                overflow: hidden;
                z-index: 4;
            }
            .middle-box{
                position: absolute;
                top: 0;
                left: 0;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                z-index: 2;               
            }
            .bottom-box{
                position: absolute;
                top: 0;
                left: 0;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                border:1px solid #fff;
                box-sizing: border-box;
            }
            .darw-text{
                position: absolute;
                top:80px;
                left: 25px;
                width: 150px;     
                font-size: .14rem;           
                text-align: center;
                z-index: 4;
                .icon{
                    display: inline-block;
                    width: 20px;
                    height: 10px;
                    font-size: 0;
                    vertical-align: middle;
                }
                .show-img{                    
                    background: url(../../assets/images/u76.png) no-repeat;
                    background-size: 100% 100%;                    
                }
                .hide-img{                    
                    background: url(../../assets/images/u77.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .statistical{
            padding: .04rem 0;
            box-sizing: border-box;
            background: #1588b9;
            overflow: hidden;
            .item{
                float: left;
                width: 50%;
                height: .5rem;
                line-height: .5rem;
                box-sizing: border-box;
                font-size: .14rem;
                color:#fff;
                text-align: center;
                &:last-child{
                    border-left: 1px solid #fff;
                }
            }
        }
    }
    
</style>
