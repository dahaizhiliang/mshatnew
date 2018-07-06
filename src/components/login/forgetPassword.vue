<template>
    <div class="forget-password">
        <header class="title">北京E追溯商户通</header>
        <div class="fill-in-area">
            <input class="phone-num" v-model="phoneNmber" type="tel" maxlength="11" placeholder="输入手机号">
            <div class="box">
                <span class="text" :class="{'get-code':getCodeActive}" @click='getVerificationCode()'>{{text}}</span>
                <input type="text" v-model="code" maxlength="6" placeholder="输入验证码">                
            </div>
            <input class="password" v-model="newPassword" maxlength="20" type="password" placeholder="输入新密码">
        </div>
        <mt-button class="submit-btn" @click="confirm()" type="default" size="large">完成</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { UpdataPassword,GetVerificationCode } from '../../js/login/login'
String.prototype.trim  = function(){
    return this.replace(/(^\s*)|(\s*$)/g,'');
}
export default {
    name:'ForgetPassword',
    data(){
        return{
            phoneNmber:'',
            code:'',
            newPassword:'',
            text:'获取验证码',
            getCodeActive:false,
            bizId:'',
        }
    },
    methods:{
        confirm(){
            if(this.phoneNmber.trim().length <= 0){
                Toast({
                    message: '请输入手机号',
                    position: 'bottom',
                    duration: 2000
                });
                return;
            }
            if(this.code.trim().length <= 0){
                Toast({
                    message: '请输入验证码',
                    position: 'bottom',
                    duration: 2000
                });
                return;
            }
            if(this.newPassword.trim().length <= 0){
                Toast({
                    message: '请输入新密码',
                    position: 'bottom',
                    duration: 2000
                });
                return;
            }
            UpdataPassword(this.phoneNmber,this.newPassword,this.code,this.bizId)
                .then(res => {
                    this.$router.push({path:'/'})
                })
                .catch(res => {
                    console.log(res);
                })
        },
        getVerificationCode(){            
            if(this.phoneNmber.trim().length <= 0){
                Toast({
                    message: '请输入手机号',
                    position: 'bottom',
                    duration: 2000
                });
                return;
            }else{
                let time = 60;
                let timer = setInterval(()=>{
                    this.getCodeActive = true;
                    this.text = '重新获取('+ time-- +')';
                    if(time == 0){
                        clearTimeout(timer);
                        this.text = '获取验证码';
                        this.getCodeActive = false;
                    }
                },1000)
                GetVerificationCode(this.phoneNmber)
                    .then(res => {
                        this.bizId = res.data[0].bizId;
                    })
                    .catch(res => {
                        console.log(res)
                    })
                
            }
            
        },
    }
}
</script>

<style scoped lang="less">
    .forget-password{
        height: 100%;
        background: #39b4e8;
        .title{       
            padding-top: 50px;     
            font-size: .18rem;
            color: #fff;
            text-align: center;
        }
        .fill-in-area{
            margin: .7rem auto 0;
            width: 80%;
            >input{
                display: block;
                margin-bottom: .2rem;
                padding: 0 5px;
                font-size: .14rem;
                width: 100%;
                height: .4rem;
                border-radius: 3px;
                box-sizing: border-box;
            }
            .box{
                position: relative;
                margin-bottom: .2rem;                
                height: .4rem;
                background: #fff;
                >input{
                    display: block;
                    width: 70%;
                    padding: 0 5px;
                    font-size: .14rem;
                    height: .4rem;
                    border-radius: 3px;
                    box-sizing: border-box;
                }
                
                .text{
                    display: block;
                    position: absolute;
                    top: 3px;
                    right: 4px;
                    width: .8rem;
                    height: .34rem;
                    line-height: .34rem;
                    font-size: .13rem;
                    color: #fff;
                    text-align: center;
                    border-radius: 3px;
                    background: #199ed8;
                    &.get-code{
                        background: rgba(204, 204, 204, 1);
                        color: #fff;
                        pointer-events: none;
                    }
                }
            }
        }
        .submit-btn{
            margin: 1rem auto 0;
            width: 80%;
            color: #199ED8;
        }
    }
</style>
