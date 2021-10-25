import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
