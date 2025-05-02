import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../actionTypes';

export const addToWishlist = (product: any) => ({
  type: ADD_TO_WISHLIST,
  payload: product,
});

export const removeFromWishlist = (productId: number) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
});
