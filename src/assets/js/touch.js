var startX = 0, startY = 0;
function touchStart(event){
    try{
        var touch = event.touches[0], //获取第一个触点
                x = Number(touch.pageX), //页面触点X坐标
                y = Number(touch.pageY); //页面触点Y坐标
        //记录触点初始位置
        startX = x;
        startY = y;
    }catch(e){
        console.log(e.message)
    }
}

function touchMove(event){
    try{
        var touch = event.touches[0], //获取第一个触点
                x = Number(touch.pageX), //页面触点X坐标
                y = Number(touch.pageY); //页面触点Y坐标
        //判断滑动方向
        if (y - startY > 100) {
            console.log('下滑了！');   
        }
        if(y - startY < -100){
            console.log('上滑了！');
        }
    }catch(e){
        console.log(e.message)
    }
}

function touchEnd(event){
    console.log(event)
    try{
        var touch = event.touches[0], //获取第一个触点
                x = Number(touch.pageX), //页面触点X坐标
                y = Number(touch.pageY); //页面触点Y坐标
                
        //判断滑动方向
        if (y - startY > 200) {
            console.log('下滑了！');
        }
        if(y - startY < -200){
            console.log('上滑了！');
        }
    }catch(e){
        console.log(e)
    }
    
}

//绑定事件
function bindEvent(){
    document.addEventListener('touchstart',touchStart,false);
    document.addEventListener('touchmove',touchMove,false);
    document.addEventListener('touchend',touchEnd,false);
}
export default bindEvent;