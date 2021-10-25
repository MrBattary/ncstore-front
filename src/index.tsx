import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import MainLayout from './elements/layouts/MainLayout';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <MainLayout>
            <BrowserRouter>
                <Switch />
            </BrowserRouter>
        </MainLayout>
    </Provider>,
    document.getElementById('root')
);
