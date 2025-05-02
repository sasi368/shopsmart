import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from '../actionTypes';
import {Product} from '../types';

const initialState: Product[] = [];

const cartReducer = (
  state = initialState,
  action: {type: string; payload: Product | number},
): Product[] => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload as Product;
      const existingProductIndex = state.findIndex(
        item => item.id === product.id,
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...state, {...product, quantity: 1}];
      }
    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== (action.payload as number));
    case INCREASE_QUANTITY:
      return state.map(item =>
        item.id === action.payload
          ? {...item, quantity: item.quantity + 1}
          : item,
      );
    case DECREASE_QUANTITY:
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      );
    default:
      return state;
  }
};

export default cartReducer;
