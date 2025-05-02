// redux/reducers/index.ts
import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
