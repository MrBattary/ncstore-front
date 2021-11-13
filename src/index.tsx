import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';

import store from './store/store';

import MainLayout from './elements/layouts/MainLayout';
import Home from './elements/pages/home/Home';
import Products from './elements/pages/products/Products';
import SignUp from './elements/pages/sign_up/SignUp';
import SignIn from './elements/pages/signin/SignIn';

import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <Switch>
                    <MainLayout>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/products' component={Products} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/signin' component={SignIn} />
                    </MainLayout>
                </Switch>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);
