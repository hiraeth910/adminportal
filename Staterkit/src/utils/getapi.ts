import { endpoints } from "./endpoints"
import { Category} from "../models/category"
import { apiClient } from "./api"


export const getCategories = async (_orgId: number): Promise<Category[]> => {
  try {
    const response = await apiClient.get(
      `${endpoints.getCategoryById}${_orgId}`
    )
    const categories: Category[] = response.data as Category[]
    return categories // Return the list of Category objects
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error // Re-throw the error for proper handling
  }
}
