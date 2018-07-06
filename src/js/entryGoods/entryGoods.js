import {ajaxPost} from '../config/ajax.js';
import {querySupplieList,checkpurchaselist,saveEntryGoodsMsg,TzListPurchase,TzListPurchaseDetail,TzSalesList} from '../address/url.js';

// 查询供应商列表
export const QuerySupplieList  = function(params) {
    return ajaxPost(querySupplieList,params)
}
// 查询进货商品列表
export const Checkpurchaselist  = function(params) {
    return ajaxPost(checkpurchaselist,params)
}
//保存商品信息
export const SaveEntryGoodsMsg = function(params){
    return ajaxPost(saveEntryGoodsMsg,params)
}

//获取进货单
export const getPurchaseListRequire  = function(params) {
  return ajaxPost(TzListPurchase,params)
}

//获取进货单详情
export const getPurchaseDetailRequire  = function(params) {
  return ajaxPost(TzListPurchaseDetail,params)
}

//获取销售单列表
export const getSalesList  = function(params) {
  return ajaxPost(TzSalesList,params)
}
