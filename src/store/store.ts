import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';

/*
Debug redux store

import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
*/

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
