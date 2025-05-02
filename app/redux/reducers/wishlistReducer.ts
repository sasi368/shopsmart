import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../actionTypes';
import {Product} from '../types';

interface WishlistAction {
  type: string;
  payload: Product | number;
}

const initialState: Product[] = [];

const wishlistReducer = (
  state = initialState,
  action: WishlistAction,
): Product[] => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return [...state, action.payload as Product];
    case REMOVE_FROM_WISHLIST:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default wishlistReducer;
