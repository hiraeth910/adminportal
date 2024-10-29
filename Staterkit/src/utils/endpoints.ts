export const uri = {
  baseurl: "http://13.233.142.100",
  // baseurl: "http://192.168.31.198",

}

export const endpoints = {
  getCategoryById: "/api/configuration/GetProductCategoryById?id=",
  saveCategoryURI :
      "/api/configuration/saveProductCategory",
  login:'/api/auth/admin/login',
  getprovider:'/api/admin/get/verifyrequests',
  updateprovider:'/api/admin/update/providerstatus',
  getproduct:'/api/admin/get/product/requests',
  updateproduct:'/api/admin/create/product',
  getwithdrawl:'/api/admin/get/withdrawls',
  updatewithdrawl:'/api/admin/withdrawlupdate',
  getuserbalance:''
  
}