import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API base URL
const API_URL = "https://dummyjson.com";

// fetch products function
// const fetchProducts = async () => {
//   const { data } = await axios.get(`${API_URL}/products`);
//   return data.products; //returns {products:[...], total, skip, limit}
// };

// custom hook
// export const useProducts = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//   });
// };

// fetch products function with pagination
// https://dummyjson.com/products?limit=12&skip=0 (id: 1-12)
// https://dummyjson.com/products?limit=12&skip=12 (id: 13-24)
const fetchProducts = async ({ limit = 12, skip = 0 }) => {
  const { data } = await axios.get(
    `${API_URL}/products?limit=${limit}&skip=${skip}`
  );
  return data; //returns {products:[...], total, skip, limit}
};

// custom hook with pagination
export const useProducts = ({ page = 1, limit = 12 } = {}) => {
  const skip = (page - 1) * limit;
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts({ limit, skip }),
  });
};

// fetch A product
const fetchSingleProduct = async (id) => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};

// custom hook
export const useSingleProduct = (id) => {
  return useQuery({
    queryKey: ["product", id], //cache identifier key, ID
    queryFn: () => fetchSingleProduct(id),
    enabled: !!id, //only fetch if ID exists
  });
};

// search products
const fetchSearchResults = async (searchTerm) => {
  const { data } = await axios.get(
    `${API_URL}/products/search?q=${searchTerm}`
  );
  return data.products;
};

// custom hook
export const useSearchResults = (searchTerm) => {
  return useQuery({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    enabled: !!searchTerm,
  });
};
