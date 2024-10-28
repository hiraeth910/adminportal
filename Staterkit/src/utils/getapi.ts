const SECRET_KEY = 'lamjodaka';
import { endpoints } from "./endpoints"
import { Category} from "../models/category"
import { apiClient } from "./api"
import CryptoJS from 'crypto-js';
import { ProviderDetails, ProviderDetailsResponse } from "../models/provider";

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
export const login = async (load: { userid: string, password: string }): Promise<string | undefined> => {
  try {
    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(load.password, SECRET_KEY).toString();
    
    // Send the user ID and encrypted password
    const response = await apiClient.post(endpoints.login, {
      userid: load.userid,
      password: encryptedPassword,
    });
    
    if (response.status === 200) {
     
      return response.data.encryptedtoken;
    }
  } catch (err) {
    throw err;
  }
};


export const fetchProviderDetails = async (
  authToken:string,
    last_seen_id?: number,
    top_id?: number,
    perpage: number = 5,
): Promise<ProviderDetailsResponse> => {
    try {
        // Create query parameters based on input
        const params = new URLSearchParams();
        if (last_seen_id !== undefined) {
            params.append('last_seen_id', last_seen_id.toString());
        }
        if (top_id !== undefined) {
            params.append('top_id', top_id.toString());
        }
        params.append('perpage', perpage.toString());
console.log(authToken,"tokennnnnnnnnnn")
  const response = await apiClient.get(endpoints.getprovider, {
    headers: {
        "Authorization": `Bearer ${authToken}`,
    },
    withCredentials: true, // Enables cookies and credentials to be sent
    params,
});

        console.log(response.data.data)
        return {
            data: response.data.data as ProviderDetails[],
            last_seen_id: response.data.last_seen_id,
            top_id: response.data.top_id
        };
    } catch (error) {
        console.error('Error fetching provider details:', error);
        throw error; // Rethrow the error for handling in calling code
    }
};

export const changeProviderStatus = async (id: number, status: boolean, authToken: string) => {
    try {
        // Prepare the data to be sent in the request body
        const data = { id: id, status: status };

        // Make the POST request
        const response = await apiClient.post(endpoints.updateprovider, data, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
            withCredentials: true, // Enables cookies and credentials to be sent
        });
        if(response.status===200)
{        return 'success'; // Return the response data if needed
}else{return 'failed'}    } catch (err) {
        console.error("Error changing provider status:", err); // Log the error for debugging
        throw err; // Rethrow the error for handling in the calling code
    }
}

