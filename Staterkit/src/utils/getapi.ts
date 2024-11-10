const SECRET_KEY = 'lamjodaka';
import { endpoints } from "./endpoints"
import { Category} from "../models/category"
import { apiClient } from "./api"
import CryptoJS from 'crypto-js';
import { ProviderDetails, ProviderDetailsResponse } from "../models/provider";
import { NewProduct } from "../models/product";
import { WithdrawalRecord, WithdrawalResponse } from "../models/withdrawl";
import header from "../components/common/header/header";
import axios from 'axios';
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

export const changeProviderStatus = async (id: number, status: boolean,provId:number, authToken: string) => {
    try {
        // Prepare the data to be sent in the request body
        const data = { id: id, status: status ,p_id:provId};

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

interface FetchProductsParams {
    authToken: string;
    count_perpage?: number; // Optional parameter for items per page
    last_seen_id?: number;   // Optional parameter for pagination
    top_id?: number;         // Optional parameter for pagination
}

export const fetchProducts = async ({
    authToken,
    count_perpage,
    last_seen_id,
    top_id,
}: FetchProductsParams): Promise<NewProduct[]> => {
    try {
        // Construct query string with only non-undefined parameters, excluding authToken
        const params: Record<string, string> = {};
         params.count_perpage ="20";
        if (last_seen_id) params.last_seen_id = last_seen_id.toString();
        if (top_id) params.top_id = top_id.toString();
        
        const queryString = new URLSearchParams(params).toString();
        
        // Fetch data without including the auth token in query params
        const response = await apiClient.get(`${endpoints.getproduct}?${queryString}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`, // Add auth header only
            },
            withCredentials: true, // Enables cookies and credentials to be sent
        });

        // Check if the response is successful
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        console.log(data)
        return response.data;
    } catch (error) {
        // Handle different types of errors appropriately
        if (error instanceof Error) {
            throw new Error(`Failed to fetch products: ${error.message}`);
        } else {
            console.error(`Unknown error: ${error}`);
            throw new Error('An unknown error occurred while fetching products.');
        }
    }
};
export const updateProduct = async (authToken: string, load: any) => {
  try {
    const response = await apiClient.post(
      endpoints.updateproduct,
      load, // `load` should be the second argument, which is the data being sent
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add auth header here
        },
        withCredentials: true, // Enables cookies and credentials to be sent
      }
    );

    if (response.status >= 200 && response.status < 400) {
      return "success";
    } else {
      return "fail";
    }
  } catch (e) {
    throw e;
  }
};

export const fetchPendingWithdrawals = async (
    authToken: string,
    last_seen_id?: number,
    top_id?: number,
    perpage: number = 10
): Promise<WithdrawalResponse> => {
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

        // Make the GET request
        const response = await apiClient.get(endpoints.getwithdrawl, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
            params
        });

        // Handle empty or error response scenarios
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
            return { message: "No pending withdrawals found." };
        }

        // Calculate last_seen_id and top_id from response data
        const lastSeenId = response.data[response.data.length - 1].withdrawl_id;
        const topId = response.data[0].withdrawl_id;

        return {
            data: response.data as WithdrawalRecord[],
            last_seen_id: lastSeenId,
            top_id: topId,
        };
    } catch (error) {
        console.error('Error fetching pending withdrawals:', error);
        return { message: "Error fetching pending withdrawals." };
    }
};

export const getBalance = async (provid: number, authToken: string) => {
  const response = await apiClient.get(`${endpoints.getuserbalance}?id=${provid}`
    ,{
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
  );
  return response.data.balance;
};
export const updateBalance = async (authToken: string, load: any) => {
  try {
    const response = await apiClient.post(
      endpoints.updatewithdrawl,
      load,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle response based on status code
    if (response.status === 200) {
      console.log(response.data.message); // Success message
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data.message || "An error occurred";

      switch (status) {
        case 400:
          console.error("Bad request:", errorMessage);
          return { success: false, message: "Bad request: " + errorMessage };
        case 401:
          console.error("Unauthorized:", errorMessage);
          return { success: false, message: "Unauthorized: " + errorMessage };
        case 403:
          if (errorMessage === "Forbidden: Token has expired") {
            console.warn("Token expired. Redirecting to login...");
            window.location.replace(`${import.meta.env.BASE_URL}firebase/login`);
          } else {
            console.error("Access denied:", errorMessage);
            return { success: false, message: "Access denied: " + errorMessage };
          }
          break;
        case 500:
          console.error("Server error:", errorMessage);
          return { success: false, message: "Server error: " + errorMessage };
        default:
          console.error("Unhandled error:", errorMessage);
          return { success: false, message: "Error: " + errorMessage };
      }
    } else {
      console.error("Network or unexpected error:")
      return { success: false, message: "Network or unexpected error: " };
    }
  }
};