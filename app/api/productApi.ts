import api from './config';
import {ENDPOINTS} from './endpoints';

export const fetchPaginatedProducts = async (limit: number, skip: number) => {
  const response = await api.get(
    `${ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};
