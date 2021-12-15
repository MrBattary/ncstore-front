import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AppState } from '../../../reducers/rootReducer';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Assignment, ShoppingCart, Storefront } from '@mui/icons-material';
import { Slide, Typography, useScrollTrigger } from '@mui/material';

import SearchField from '../search_field/SearchField';
import { signOut } from '../../../actions/users/SignOut';
import { restoreDefaultUserReducer } from '../../../actions/users/RestoreDefaultUserReducer';
import { restoreDefaultProductsReducer } from '../../../actions/products/RestoreDefaultProductsReducer';
import { UserRole } from '../../../types/UserRole';
import { CartProduct } from '../../../types/CartProduct';
import { getCart } from '../../../actions/cart/GetCart';
import { restoreDefaultSearchReducer } from '../../../actions/search/RestoreDefaultSearchReducer';
import { setNewSearchText } from '../../../actions/search/SetNewSearchText';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';
import {getCategories} from "../../../actions/category/GetCategories";

type navigationBarProps = {
    window?: () => Window;
};

enum navigationBarTasks {
    DO_SEARCH = 'DO_SEARCH',
    GET_CATEGORIES = 'GET_CATEGORIES',
    WAIT_GET_CATEGORIES = 'WAIT_GET_CATEGORIES'
}

const NavigationBar: React.FC<navigationBarProps> = ({ window }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { searchUrl } = useSelector((state: AppState) => state.searchReducer);
    const { cart } = useSelector((state: AppState) => state.cartReducer);
    const { token, roles, balance } = useSelector((state: AppState) => state.userReducer);
    const { loading } = useSelector((state: AppState) => state.categoryReducer);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [cartSize, setCartSize] = useState<number>(0);
    const [task, setTask] = useTask();

    const scrollTrigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    useEffect(() => {
        if (cart.length > 0) {
            setCartSize(cart.reduce((total: number, cartItem: CartProduct) => total + cartItem.productCount, 0));
        } else {
            setCartSize(0);
        }
    }, [cart]);

    useEffect(() => {
        if (token) {
            dispatch(getCart(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (task === navigationBarTasks.DO_SEARCH) {
            history.push('/products'.concat(searchUrl));
            setTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [history, searchUrl, setTask, task]);

    useEffect(() => {
        if (task === navigationBarTasks.GET_CATEGORIES) {
            dispatch(getCategories())
            setTask(navigationBarTasks.WAIT_GET_CATEGORIES, 0);
        }
    }, [setTask, task, dispatch]);

    useEffect(() => {
        if (task === navigationBarTasks.WAIT_GET_CATEGORIES && !loading) {
            setTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [setTask, task, loading]);

    useEffect(() => {
        setTask(navigationBarTasks.GET_CATEGORIES,0);
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const handleUserMenuOpen = (event: { currentTarget: React.SetStateAction<null | HTMLElement> }) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const goToTheProfile = () => {
        history.push('/profile');
        handleUserMenuClose();
    };

    const goToHome = () => {
        history.push('/');
    };

    const handleSignOut = () => {
        dispatch(signOut(token ? token : ''));
        dispatch(restoreDefaultUserReducer());
        handleUserMenuClose();
    };

    const handleOpenCart = () => {
        history.push('/cart');
    };

    const handleOpenOrders = () => {
        history.push('/orders');
    };

    const handleSearch = (searchText: string) => {
        dispatch(restoreDefaultSearchReducer());
        dispatch(setNewSearchText(searchText));
        setTask(navigationBarTasks.DO_SEARCH, 0);
    };

    const handleOpenMerchandise = () => {
        dispatch(restoreDefaultProductsReducer());
        history.push('/merchandise');
    };

    const renderCustomerIcons = () => {
        if (roles.includes(UserRole.CUSTOMER)) {
            return (
                <>
                    <IconButton size='large' aria-label='orders' color='inherit' onClick={handleOpenOrders}>
                        <Assignment />
                    </IconButton>
                    <IconButton size='large' aria-label='shopping cart' color='inherit' onClick={handleOpenCart}>
                        <Badge badgeContent={cartSize} max={99} invisible={cartSize <= 0} color='success'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </>
            );
        }
    };

    const renderSupplierIcons = () => {
        if (roles.includes(UserRole.SUPPLIER)) {
            return (
                <>
                    <IconButton size='large' aria-label='orders' color='inherit' onClick={handleOpenMerchandise}>
                        <Storefront />
                    </IconButton>
                </>
            );
        }
    };

    const renderBalance = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography align='center'>
                    Balance : {balance ? balance.balance : 0} {balance ? balance.currency : '$'}
                </Typography>
            </Box>
        );
    };

    const renderAuthorisedUserMenu = (
        <Stack spacing={2} direction='row'>
            {renderBalance()}
            {renderCustomerIcons()}
            {renderSupplierIcons()}
            <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                onClick={handleUserMenuOpen}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
            >
                <MenuItem onClick={goToTheProfile}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
        </Stack>
    );

    const handleSignUp = () => {
        history.push('/signup');
    };
    const handleSignIn = () => {
        history.push('/signin');
    };

    const renderUnauthorisedUserMenu = (
        <Stack spacing={1} direction='row'>
            <Button color='inherit' onClick={handleSignIn}>
                Sign in
            </Button>
            <Button variant='outlined' color='inherit' onClick={handleSignUp}>
                Sign up
            </Button>
        </Stack>
    );

    const renderMenu = () => {
        if (token) {
            return renderAuthorisedUserMenu;
        } else {
            return renderUnauthorisedUserMenu;
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Slide appear={false} direction='down' in={!scrollTrigger}>
                <AppBar>
                    <Toolbar>
                        <Stack spacing={2} direction='row' alignItems='center' flexGrow={1}>
                            <Link
                                variant='h5'
                                color='inherit'
                                component='div'
                                underline='none'
                                onClick={goToHome}
                                sx={{ cursor: 'pointer' }}
                            >
                                NCStore
                            </Link>
                            <SearchField onSearch={handleSearch} placeholder='Search...' />
                        </Stack>
                        {renderMenu()}
                    </Toolbar>
                </AppBar>
            </Slide>
        </Box>
    );
};

export default NavigationBar;
