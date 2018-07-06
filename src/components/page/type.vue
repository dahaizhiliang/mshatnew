<template>
    <div>
        <ul class="type-list">
            <li class="" v-for="item in typeList" :key="item.id" @click="jump(item.url)">{{item.text}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'Type',
    data(){
        return{
            typeList:[],
        }
    },
    mounted(){
        this.typeList = JSON.parse(localStorage.getItem('menu'));        
    },
    methods:{
        jump(url){      
            this.$router.push({path:url})
        }
    }
}
</script>

<style scoped lang='less'>
    .type-list{
        padding: .2rem .1rem;
        font-size: .14rem;
        overflow: hidden;
        >li{
            float: left;
            margin-bottom: .1rem;
            width: 49%;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            background: #fff;
            border: 1px solid rgba(228, 228, 228, 1);
            border-radius: 3px;
            box-sizing: border-box;
            &:nth-of-type(even){
                margin-left: 2%;
            }
        }
    }
</style>
