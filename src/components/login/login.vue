<template>
    <div class="login">
        <header class="title">北京E追溯商户通</header>
        <div class="fill-in-area" v-if="!verificationCodeLogin">
            <div class="box">
                <input class="account" v-model="account" type="text" placeholder="输入手机号、微信号、用户名">
            </div>
            <div class="box">
                <input class="password" v-model="password" :type="inputType" placeholder="输入密码">
                <input type="hidden" v-model="savePassword">
                <span class="look" :class="{'look-hide':ishide}" @click="hidePassword()">看</span>
            </div>
        </div>
        <div class="fill-in-area" v-else>
            <div class="box">
                <input class="account" v-model="phoneNumber" maxlength="11" type="tel" placeholder="输入手机号">
            </div>
            <div class="box">
                <input class="password code" v-model="verificationCode" type="number" placeholder="输入验证码">
                <span class="text" :class="{'get-code':getCodeActive}" @click='getVerificationCode()'>{{text}}</span>
            </div>
        </div>
        <div class="operation">
            <span class="forget-password" @click="forgetPassword()">忘记密码？</span>
            <span class="verification-code" @click="selectLogin()">{{promotText}}</span>
        </div>
        <mt-button class="submit-btn" @click="confirm" type="default" size="large">登录</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { login,login2 } from '../../js/login/login'
export default {
    name:'Login',
    data(){
        return{
            account:'',
            password:'',
            userId:'',
            savePassword:'',
            ishide:true,
            inputType:'password',
            phoneNumber:'',
            verificationCode:'',
            text:'获取验证码',
            promotText:'验证码登录',
            verificationCodeLogin:false,
            getCodeActive:false,
        }
    },
    mounted(){
        this.savePassword = '';
    },
    methods:{
        confirm(){                            
            if(this.verificationCodeLogin){ //验证码登录
                if(this.phoneNumber == ''){
                    Toast({
                        message: '请输入手机号',
                        position: 'bottom',
                        duration: 2000
                    });
                    return;
                }
                if(this.verificationCode == ''){
                    Toast({
                        message: '请输入验证码',
                        position: 'bottom',
                        duration: 2000
                    });
                    return;
                } 
                let codeData = {
                    username : this.phoneNumber,
                    password : this.verificationCode,                    
                } 
                login(codeData)
                    .then(res => {
                        if(res.message){
                            localStorage.setItem('username',JSON.stringify(this.phoneNumber));
                            localStorage.setItem('userId',res.data.userId);
                            localStorage.setItem('menu',JSON.stringify(res.data.menu_list))
                            this.$router.push({name:'Home'});                         
                        }else{
                            clocalStorage.clear();
                        }
                        
                    })
                    .catch(res => {
                        console.log(res)
                    })
                
            }else{
                if(this.account == ''){
                    Toast({
                        message: '请输入账号',
                        position: 'bottom',
                        duration: 2000
                    });
                    return;
                }
                if(this.password == ''){
                    Toast({
                        message: '请输入密码',
                        position: 'bottom',
                        duration: 2000
                    });
                    return;
                } 
                let accountData = {
                    username : this.account,
                    password : this.password
                }
                login(accountData)
                    .then(res => {
                        if(res.message){
                            localStorage.setItem('username',JSON.stringify(this.account));
                            localStorage.setItem('userId',res.data.userId);
                            localStorage.setItem('buyerList',JSON.stringify(res.data.userInfo.booth_List));
                            localStorage.setItem('menu',JSON.stringify(res.data.menu_list));
                            this.$router.push({name:'Home'}); 
                        }else{
                            clocalStorage.clear();
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        forgetPassword(){
            this.$router.push({path:'forgetPassword'})
        },   
        selectLogin(){
            if(this.promotText == "验证码登录"){
                this.promotText = '账号密码登录';
                this.verificationCodeLogin = true;
            }else{
                this.promotText = '验证码登录';
                this.verificationCodeLogin = false;
            }
            
        },  
        hidePassword(){          
            this.ishide = !this.ishide;
            if(this.inputType == 'password'){
                this.inputType = 'text'
            }else{
                this.inputType = 'password'
            }
        },
        getVerificationCode(){
            let time = 10;
            let timer = setInterval(()=>{
                this.getCodeActive = true;
                this.text = '重新获取('+ time-- +')';
                if(time == 0){
                    clearTimeout(timer);
                    this.text = '获取验证码';
                    this.getCodeActive = false;
                }
            },1000)
        },
    },
    watch:{
       
    }
}
</script>

<style scoped lang='less'>
    .login{
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
            .box{
                position: relative;
                margin-bottom: .2rem;
                input{
                    display: block;
                    padding: 0 5px;
                    font-size: .14rem;
                    width: 100%;
                    height: .4rem;
                    border-radius: 3px;
                    box-sizing: border-box;
                }
                .password{
                    padding-right: .3rem;                    
                }
                .code{
                    padding-right: .8rem;
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
                .look{
                    display: block;
                    position: absolute;
                    top: 15px;
                    right: 4px;
                    width: .2rem;
                    height: .1rem;
                    font-size: 0;
                    background: url(../../assets/images/u76.png) no-repeat;
                    background-size: 100% 100%;
                }
                .look-hide{
                    display: block;
                    position: absolute;
                    top: 15px;
                    right: 4px;
                    width: .2rem;
                    height: .1rem;
                    font-size: 0;
                    background: url(../../assets/images/u77.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
            
            
        }
        .operation{
            margin: 0 auto 0;
            width: 80%;
            font-size: .14rem;
            color: #fff;
            overflow: hidden;            
            .forget-password{
                float: left;
            }
            .verification-code{
                float: right;
            }
        }
        .submit-btn{
            margin: 1rem auto 0;
            width: 80%;
            color: #199ED8;
        }
    }
</style>
