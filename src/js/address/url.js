// base url
const baseUrl = 'http://192.168.1.14:8081/order_sht/';//大琪琪
const baseUrl2 = 'http://192.168.1.48:8081/order_sht/';//小琪琪
const baseUrl3 = 'http://192.168.1.49:8081/order_sht/';//斌斌
const baseUrl4 = 'http://192.168.1.61:8081/order_sht/';//小杜

// 登录地址接口
export const loginUrl = baseUrl + 'login/login';
export const loginUrl2 = baseUrl2 + 'login/login';
//登陆首页
export const homeData = baseUrl3 + 'tz/queryData';
//获取验证码
export const getVerificationCode = baseUrl + 'login/sendSmsCode';
//修改密码
export const updataPassword = baseUrl + 'login/updatePasswordByPhone';



export const querySupplieList = baseUrl + 'manage/getAllGys';// 查询供应商列表 type=1 供应商 type=2 客户
// 进货开单
export const checkpurchaselist = baseUrl + 'goods/queryPurchase ';// 查询进货商品列表
export const saveEntryGoodsMsg = baseUrl4 + 'tz/tzAdd';//保存进货商品信息

// 销售开单
export const querySalesList = baseUrl + '/goods/querySales ';// 查询进货商品列表
export const saveSellGoodsMsg = baseUrl4 + 'tz/xsTzAdd';//保存销售商品信息
export const deleteSellGoodsMsg = baseUrl4 + 'tz/deleteTzByTzId';//删除销售商品信息

//进货单TZ
export const TzListPurchase = baseUrl4 + 'tz/queryInTzDetail';
export const TzListPurchaseDetail = baseUrl4 + 'tz/queryInTzDetailByTzId';

//销售单TZ  /tz/queryXsTzDetail
export const TzSalesList = baseUrl4 + 'tz/queryXsTzDetail';
// export const TzSalesListDetail = baseUrl4 + 'tz/queryInTzDetailByTzId';




// //“管理”菜单
// // 商户模块
// export const getAllBiz = baseUrl + '/manage/getAllBiz';// 查询商户列表
// export const insertBiz = baseUrl + '/manage/insertBiz';// 新增商户
// //供应商
// export const getAllGys = baseUrl + '/manage/getAllGys';// 查询供应商列表
// export const insertGys = baseUrl + '/manage/insertGys';// 新增供应商
// //客户——同供应商
// // export const getAllGys = baseUrl + '/manage/getAllGys';// 查询客户列表
// // export const insertGys = baseUrl + '/manage/insertBiz';// 新增客户

// //“商品”菜单
// //进货商品
// export const queryAllSuppliers = baseUrl2 + '/goods/queryAllSuppliers';// 查询供应商列表（菜单选项）
// export const queryPurchase = baseUrl2 + '/goods/queryPurchase ';// 查询进货商品列表
// export const purchaseAdd  = baseUrl2 + '/goods/purchaseAdd  ';// 新增进货商品
// export const getDefaultProductType = baseUrl + '/comm/getDefaultProductType';// 查询商品品种三级列表
// //销售商品
// export const querySales = baseUrl2 + '/goods/querySales';// 查询销售商品列表
// export const salesAdd = baseUrl2 + '/goods/salesAdd';// 新增销售商品
// //单条商品
// export const lookGoods = baseUrl2 + '/goods/lookGoods';// 查看商品详情
// export const goodsUpdate = baseUrl2 + '/goods/goodsUpdate';// 编辑商品
// export const deleteGoods = baseUrl2 + '/goods/deleteGoods';// 删除商品
