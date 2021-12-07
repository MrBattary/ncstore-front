import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { productsReducer } from './productsReducer';
import { cartReducer } from './cartReducer';
import { ordersReducer } from './ordersReducer';

export const rootReducer = combineReducers({
    userReducer,
    productsReducer,
    cartReducer,
    ordersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
