import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { productsReducer } from './productsReducer';

export const rootReducer = combineReducers({
    userReducer,
    productsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
