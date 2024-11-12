import axios from "axios";
import { uri } from "./endpoints";



export const apiClient = axios.create({
  baseURL: uri.baseurl, // Replace with your actual base URL
})
