<template>
    <div class="footer-nav">
         <ul class="nav-list">
             <li class="icon icon-home" :class="{current:evenId=='home'}" @click='selectNav($event)' id='home'>首页</li>
             <li class="icon icon-info" :class="{current:evenId=='info'}" @click='selectNav($event)' id='info'>明细</li>
             <li class="icon icon-statistical" :class="{current:evenId=='statistical'}"  @click='selectNav($event)' id='statistical'>统计</li>
             <li class="icon icon-my" :class="{current:evenId=='my'}"  @click='selectNav($event)' id='my'>我的</li>
         </ul>
    </div>
</template>

<script>
export default {
    name:'Nav',
    data () {
        return {
           selected:'',
           evenId:'',
        }
    },
    mounted(){
        this.evenId='home';
    },
    methods:{
        selectNav(e){
            this.evenId = e.target.id;
            this.$emit('jump',this.evenId)
        }
    }
}
</script>

<style socped lang='less'>
    .footer-nav{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        border-top:1px solid rgba(204, 204, 204, 1);
    }
    .nav-list{
        overflow: hidden;
        font-size: .14rem;
        color: #999;
        >li{
            float: left;            
            padding: .05rem 0;
            width: 25%;
            text-align: center;
        }
        .current{
            color: #1588B9;
            &::before{
                color: #1588B9;
            }
        }
    }
   
    
</style>
