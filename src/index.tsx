import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';

import store from './store/store';

import MainLayout from './elements/layouts/MainLayout';
import Home from './elements/pages/home/Home';
import SignUp from './elements/pages/signup/SignUp';
import SignIn from './elements/pages/signin/SignIn';
import Products from './elements/pages/products/Products';
import Profile from './elements/pages/profile/Profile';
import Merchandise from './elements/pages/merchandise/Merchandise';

import 'antd/dist/antd.css';
import './index.css';
import Product from './elements/pages/product/Product';

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <Switch>
                    <MainLayout>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/signin' component={SignIn} />
                        <Route exact path='/products' component={Products} />
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/merchandise' component={Merchandise} />
                        <Route
                            exact
                            path='/products/:id([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})'
                            component={Product}
                        />
                    </MainLayout>
                </Switch>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);
