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
import Product from './elements/pages/product/Product';
import Cart from './elements/pages/cart/Cart';
import Orders from './elements/pages/orders/Orders';
import NotFound from './elements/pages/notfound/NotFound';
import User from "./elements/pages/user/User";

import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <MainLayout>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/signin' component={SignIn} />
                        <Route exact path='/products' component={Products} />
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/merchandise' component={Merchandise} />
                        <Route exact path='/cart' component={Cart} />
                        <Route exact path='/orders' component={Orders} />
                        <Route exact path='/products/*' component={Product} />
                        <Route
                            exact
                            path='/users/:id([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})'
                            component={User}
                        />
                        <Route exact path='*' component={NotFound} />
                    </Switch>
                </MainLayout>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);
