export interface Category {
  categoryId: number
  subCategoryOrgId: number
  subCategoryId: number
  name: string
  description: string
  logoImage: string // Assuming imageContent is a base64 encoded string
  active: number
  flag: string
  id:number
  categoryName: string
  categoryDescription: string
  categoryImageContent: Uint8Array // Replace with a custom type if needed
  categoryActive: number
  subCategoryName: string
  subCategoryDescription: string
  thirdCategoryName: string
  thirdCategorydescription: string
  thirdCategoryId: number
  thirdCategoryOrgId: number
}
export interface Newcategory {
  id:number
  orgId: number
  flag: string
  name: string
  description: string
  imageContent: []
  active: number
}
