<template>
    <div class="content">
        <ul class="box">
            <li>
                <div class="wrapper link" @click="selectMerchants()">
                    <span class="item-name">供应商</span>
                    <span class="fill-text">{{merchants}}</span>
                </div>
            </li>
            <li>
                <div class="wrapper">
                    <span class="item-name">进货日期</span>
                    <span class="fill-text">{{selectTime}}</span>
                    <span class="right-text icon-1 icon-time"  @click="openPicker"></span>
                </div>
            </li>
            <li>
                <div class="select-area link">
                    <div class="goods-msg">
                        <span class="item-name">进货商品</span>
                        <span class="goods-num" v-if='hasGoodsData'>(共{{goodsLength}}种商品)</span>
                    </div>
                    <div v-if='hasGoodsData'>
                        <header class="goods-title">
                            <span>商品</span>
                            <span>单价</span>
                            <span>数量</span>
                        </header>
                        <ul>
                            <li class="list" v-for="item in goodsList" :key="item.goodsId">
                                <mt-cell-swipe
                                    :right="[
                                                {
                                                    content: '取消',
                                                    style: { background: '#ddd', color: '#fff' },
                                                    handler: () => {}
                                                },
                                                {
                                                    content: '删除',
                                                    style: { background: 'red', color: '#fff' },
                                                    handler: () => { deleteGoods(item.goodsId) }
                                                }
                                            ]">
                                    <div class="show-goods">
                                        <span class="goods-name">{{item.GOODS_NAME}} ({{item.SPECIFICATIONS}}/{{item.GOODS_UNIT}})</span>
                                        <div class="edit-price">
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
                                    </div>
                                </mt-cell-swipe>
                            </li>
                        </ul>
                        <div class="all-goods-total">总金额：{{allGoodsTotal}}元</div>
                     </div>
                    <div class="select-goods icon-1 icon-add" @click='selectGoods()'>选择商品</div>
                </div>
            </li>
        </ul>
        <ul class="box">
            <li>
                <div class="wrapper">
                    <span class="item-name">实付金额</span>
                    <input class="fill-input" type="number" v-model="realPayAmount" placeholder="0.00">
                    <span class="right-text">元</span>
                </div>
            </li>
            <li>
                <div class="wrapper">
                    <span class="item-name">欠款</span>
                    <input class="fill-input" type="number" v-model="arrears" placeholder="0.00">
                    <span class="right-text">元</span>
                </div>
            </li>
            <li>
                <div class="wrapper">
                    <span class="item-name">付款方式</span>
                    <mt-button class="pay-btn" size="small" type="default" :class="{'select-type':selectPayType}" @click='payType(0)'>现金</mt-button>
                    <mt-button class="pay-btn" size="small" type="default" :class="{'select-type':!selectPayType}" @click='payType(1)'>转账</mt-button>
                </div>
            </li>
            <li>
                <div class="wrapper note">
                    <span class="item-name">备注</span>
                    <textarea v-model="noteMsg" cols="30" rows="5" placeholder="非必填" maxlength="120"></textarea>
                </div>
            </li>
        </ul>
        <mt-button class="confirm-btn" type="primary" size="large" @click="save()">保存</mt-button>
        <mt-datetime-picker v-model="pickerVisible"
            type="date" ref="picker" :startDate='startDate' :endDate='endDate' @confirm="getTime()">
        </mt-datetime-picker>
        <mt-popup v-model="saveMsgPop" position="top" :modal='false' popup-transition="popup-fade" class="msg-pop">
            <span>{{saveMsg}}</span>
        </mt-popup>
    </div>
</template>

<script>
import formatTime from '../../assets/js/format.js'
import { Button,CellSwipe,MessageBox,Popup,Toast } from 'mint-ui';
import { SaveEntryGoodsMsg } from '../../js/entryGoods/entryGoods.js'
import '../../assets/js/common.js'
export default {
    name:'EntryGoods',
    data(){
        return{
            pickerVisible:new Date(),
            startDate:new Date('1994'),
            endDate:new Date('2099'),
            selectTime:'',
            selectPayType:true,
            merchants:'',
            merchantsId:'',
            goodsList:[],
            hasGoodsData:false,
            goodsLength:0,
            realPayAmount:0,
            arrears:'',
            payWay:0,
            noteMsg:'',
            saveMsgPop:false,
            saveMsg:'',
            orderId:'',
        }
    },
    mounted(){
        if(JSON.stringify(this.$route.params) !== "{}"){
            this.merchants = this.$route.params.merchants;
            this.selectTime = this.$route.params.getGoodsTime;
            this.goodsList = this.$route.params.goodsList;
            this.payWay = this.$route.params.payWay;
            this.noteMsg = this.$route.params.noteMsg;
            this.arrears = this.$route.params.arrears;
            this.merchantsId = this.$route.params.merchantsId;
            this.orderId = this.$route.params.orderId;
        }
        if(this.$route.params.goodsList && this.$route.params.goodsList.length>0){
            this.hasGoodsData = true;
            this.goodsLength = this.goodsList.length;
        }

    },
    computed:{
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
    watch:{
        allGoodsTotal(val){
            this.realPayAmount = val;
        },
        payWay(val){
            if(val == 0){
                this.selectPayType = true;
            }else{
                this.selectPayType = false;
            }
        }
    },
    methods:{
        openPicker() {
            this.$refs.picker.open();
        },
        getTime(){
            this.selectTime = formatTime('yyyy-MM-dd',this.pickerVisible);
        },
        payType(){
            this.selectPayType = !this.selectPayType;
            if(this.selectPayType == true){
                this.payWay = 0;
            }else{
                this.payWay = 1;
            }
        },
        selectMerchants(){
            this.$router.push({
                name:'Merchants',
                params:{
                    merchants:this.merchants,
                    merchantsId:this.merchantsId,
                    getGoodsTime:this.selectTime,
                    goodsList:this.goodsList,
                    payWay:this.payWay,
                    noteMsg:this.noteMsg,
                }
            });
        },
        selectGoods(){
           this.$router.push({
                name:'SelectGoods',
                params:{
                    merchants:this.merchants,
                    merchantsId:this.merchantsId,
                    getGoodsTime:this.selectTime,
                    goodsList:this.goodsList,
                    payWay:this.payWay,
                    noteMsg:this.noteMsg,
                }
            });
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
        deleteGoods(val){
            MessageBox({
                title: '提示',
                message: '确定删除此条商品信息?',
                showCancelButton: true
            }).then(()=>{
                this.goodsList.forEach(ele => {
                    if(ele.goodsId == val){
                        this.goodsList.pop(ele);
                    }
                    if(this.goodsList.length <= 0){
                        this.hasGoodsData = false;
                    }
                })
            }).catch((res)=>{
                console.log(res)
            })
        },
        save(){
            if(this.merchants.trim().length <= 0){
                Toast({
                    message: '请选择供应商',
                    position: 'middle',
                    duration: 2000
                });
                return;
            }
            if(this.selectTime.trim().length <= 0){
                Toast({
                    message: '请选择进货日期',
                    position: 'middle',
                    duration: 2000
                });
                return;
            }
            if(this.goodsLength.length <= 0){
                Toast({
                    message: '请选择进货商品',
                    position: 'middle',
                    duration: 2000
                });
                return;
            }

            let goodsArr = [];
            if(this.goodsList.length > 0){
                this.goodsList.forEach(ele => {
                    goodsArr.push({
                        goods_code:ele.GOODS_CODE,  //商品编码
                        goods_name:ele.GOODS_NAME,		//商品名称
                        shop_booth_id:ele.SHOP_BOOTH_ID,	//商品来源
                        gb_code:ele.GB_CODE,		//国标编码
                        gb_name:ele.GB_NAME,		//国标名称
                        number:ele.editUnitPrice,		//数量
                        price:ele.editNumber,		//价格
                        goods_unit:ele.GOODS_UNIT,		//单位
                        specifications:ele.SPECIFICATIONS,	//规格
                    })
                })
            }
            let data = {
                buyer_booth_id:JSON.parse(localStorage.getItem('buyerList'))[0].SHOP_BOOTH_ID,
                buyer_booth_name:JSON.parse(localStorage.getItem('buyerList'))[0].BOOTH_NAME,
                seller_booth_id:this.merchantsId, //卖方id
                amount_money:this.allGoodsTotal,	//应收金额
                actual_money:this.realPayAmount,	//实收金额
                discount_rate:'',	//折扣
                pay_way:this.payWay,		//付款方式  现金/转账
                remark:this.noteMsg,		// 备注
                creater_id:localStorage.getItem('userId'),		//创建人
                pay_state:Math.abs(this.arrears)>0 ?1:2,	//支付状态(是否欠款) 1欠款 2结清
                goods:JSON.stringify(goodsArr),
                in_date:this.selectTime,
                orderId:this.orderId,
            }
            SaveEntryGoodsMsg(data)
                .then(res => {
                    if(res.result){
                        let goodsIdArr = [];
                        this.goodsList.forEach(ele => {
                            goodsIdArr.push(ele);
                        })
                        let saveDate = {
                            merchants:this.merchants,
                            getGoodsTime:this.selectTime,
                            goodsList:goodsIdArr,
                            total:this.allGoodsTotal,
                            payAmount:this.realPayAmount,
                            arrears:this.arrears == '' ? 0 :this.arrears,
                            payWay:this.payWay,
                            noteMsg:this.noteMsg,
                            orderId:res.data.tz_id,
                        }
                        this.saveMsgPop = true;
                        this.saveMsg = "保存成功";
                        setTimeout(() => {
                            this.saveMsgPop= false;
                            this.$router.push({name:'ConfirmPage',params:saveDate})
                        }, 1000);
                    }else{
                        Toast({
                            message: res.message,
                            position: 'middle',
                            duration: 2000
                        });
                    }

                })
                .catch(res => {
                    console.log(res)
                })

        },
    }
}
</script>

<style scoped lang='less'>
    @fontColor:#39b4e8;
    @borderStyle:1px solid rgba(228, 228, 228, 1);
    .content{
        padding:.05rem .05rem .5rem;
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
                .select-type{
                    background: #39b4e8;
                    color: #fff;
                }
                .pay-btn{
                    margin-left: .1rem;
                }
                .item-name{
                    float: left;
                    display: block;
                    width: 20%;
                    text-align: right;
                }
                .fill-input,.fill-text{
                    float: left;
                    display: block;
                    padding-left: .1rem;
                    margin-top: .05rem;
                    margin-left: .05rem;
                    width: 60%;
                    height: .4rem;
                    line-height: .4rem;
                    background: #fff;
                    font-size: .14rem;
                    color: #000;
                    box-sizing: border-box;
                }
                .right-text{
                    float: right;
                    display: block;
                    padding-right: .2rem;
                }
                &.note{
                    padding: .1rem 0;
                    height: auto;
                    line-height: normal;
                    textarea{
                        float: left;
                        margin-left: .1rem;
                        font-size: .14rem;
                        box-sizing: border-box;
                    }
                }
            }
            .link::after{
                border: 2px solid #c8c8cd;
                border-bottom-width: 0;
                border-left-width: 0;
                content: " ";
                top: 50%;
                right: 20px;
                position: absolute;
                width: 5px;
                height: 5px;
                -webkit-transform: translateY(-50%) rotate(45deg);
                transform: translateY(-50%) rotate(45deg);
            }
            .select-area{
                position: relative;
                .item-name{
                    float: none;
                    width: 20%;
                    height: .5rem;
                    line-height: .5rem;
                    text-align: right;
                }
                .goods-msg{
                    .item-name{
                        display: inline-block;
                    }
                    .goods-num{
                        margin-left: .1rem;
                    }
                }
                .select-goods{
                    height: .4rem;
                    line-height: .3rem;
                    text-align: center;
                }
                &::after{
                    top: .25rem;
                }
                .goods-title{
                    display: flex;
                    flex-direction:row;
                    justify-content:space-around;
                    height: .4rem;
                    line-height: .4rem;
                    border-bottom: @borderStyle;
                }
                .all-goods-total{
                    padding: 0 .1rem;
                    height: .3rem;
                    line-height: .3rem;
                    text-align: right;
                }
                .list{
                    border-bottom: @borderStyle;
                }
                .show-goods{
                    width: 100%;
                    height: .4rem;
                    line-height: .4rem;
                    font-size: .14rem;
                    color: #000;
                }
                .goods-name{
                    float: left;
                    display: block;
                    width: 30%;
                    height: .4rem;
                    line-height: .4rem;
                    overflow: hidden;
                }
                .edit-price{
                    margin-left: 30%;
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


        }
        .msg-pop{
            width: 100%;
            height: .5rem;
            line-height: .5rem;
            span{
                display: block;
                font-size: .14rem;
                color: #fff;
                text-align: center;
                background: rgba(0,0,0,.7);
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
<style>
.mint-cell-title{
    display: none;
}
.mint-cell-value{
    display: block;
    width: 100%;
}
.mint-cell-wrapper{
    padding: 0 .05rem 0 .15rem;
}
</style>

