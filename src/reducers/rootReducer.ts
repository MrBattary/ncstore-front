import { combineReducers } from 'redux';

import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
