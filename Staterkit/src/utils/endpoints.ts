export const uri = {
  baseurl: "http://13.201.168.52",
  // baseurl: "http://localhost:80",

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
  getuserbalance:'/api/admin/get/balance'
  
}