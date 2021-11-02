import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';

import store from './store/store';

import MainLayout from './elements/layouts/MainLayout';
import Home from './elements/pages/home/Home';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <MainLayout>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                    </Switch>
                </BrowserRouter>
            </MainLayout>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);
