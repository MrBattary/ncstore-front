import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { productsReducer } from './productsReducer';
import { cartReducer } from './cartReducer';
import { ordersReducer } from './ordersReducer';
import { searchReducer } from './searchReducer';

export const rootReducer = combineReducers({
    userReducer,
    productsReducer,
    cartReducer,
    ordersReducer,
    searchReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
