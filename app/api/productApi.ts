import api from './config';
import {ENDPOINTS} from './endpoints';

export const fetchPaginatedProducts = async (limit: number, offset: number) => {
  const response = await api.get(
    `${ENDPOINTS.PRODUCTS}?limit=${limit}&offset=${offset}`,
  );
  return response.data;
};
