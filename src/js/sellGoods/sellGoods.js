import {ajaxPost, ajaxGet} from '../config/ajax.js';
import {querySupplieList,querySalesList,saveSellGoodsMsg,deleteSellGoodsMsg} from '../address/url.js';

// 查询客户列表
export const QuerySupplieList  = function(params) {
    return ajaxPost(querySupplieList,params)
}
// 查询销售商品列表
export const QuerySellGoodslist  = function(params) {
    return ajaxPost(querySalesList,params)
}
//保存销售商品信息
export const SaveSellGoodsMsg = function(params){
    return ajaxPost(saveSellGoodsMsg,params)
}
//保存销售商品信息
export const DeleteSellGoodsMsg = function(params){
    return ajaxGet(deleteSellGoodsMsg +'?tz_id='+ params)
}