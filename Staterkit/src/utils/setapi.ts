import { endpoints } from "./endpoints"
import { Category, Newcategory } from "../models/category"
import { apiClient } from "./api"



export const saveCategory = async (newcategory: Newcategory) => {
  try {
    const response = await apiClient.post(
      endpoints.saveCategoryURI,
      newcategory
    )
    const category: Category = response.data as Category
    return category
  } catch (err) {
    console.error("error inserting", err)
  }
}
