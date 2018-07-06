import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {homeData,loginUrl,loginUrl2,updataPassword,getVerificationCode} from '../address/url.js';

// 登录接口
export const  login  = function(params) {
  return ajaxPost(loginUrl,params)
}
export const  login2  = function(params) {
  return ajaxPost(loginUrl2,params)
}
export const  GetVerificationCode = function(params){
  return ajaxGet(getVerificationCode +'?userName='+ params)
}
export const UpdataPassword = function(phoneNum,password,yzm,bizId){
  return ajaxGet(updataPassword +'?phoneNum='+ phoneNum +'&password='+ password +'&yzm='+ yzm +'&bizId='+ bizId )
}
// 首页数据
export const HomeData = function(params){
  return ajaxGet(homeData +'?user_id='+ params)
}