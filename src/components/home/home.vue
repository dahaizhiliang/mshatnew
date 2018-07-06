<template>
    <div class="container">
        <Page v-if="'home' == value" ></Page> 
        <Info v-if="'info' == value"></Info>
        <Statistical v-if="'statistical' == value"></Statistical> 
        <My v-if="'my' == value "></My>  
        <TabNav  @jump='jump'></TabNav>
    </div>
</template>

<script>
import '../../assets/css/common.css';
import TabNav from '../tabNav/tabNav';
import Page from '../page/page';
import Info from '../info/info';
import Statistical from '../statistical/statistical';
import My from '../my/my';

export default {
    name:'Home',
    data () {
        return {
          value:'home',
        }
    },  
    methods:{
        jump(msg){
            this.value = msg;
        },
    },
    components:{
        TabNav,
        Page,
        Info,
        Statistical,
        My,
    },
}
</script>

<style socped lang='less'>
    
</style>
