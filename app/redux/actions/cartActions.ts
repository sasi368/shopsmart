import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../actionTypes';

export const addToCart = (product: any) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId: number) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const increaseQuantity = (id: number) => ({
  type: INCREASE_QUANTITY,
  payload: id,
});

export const decreaseQuantity = (id: number) => ({
  type: DECREASE_QUANTITY,
  payload: id,
});
