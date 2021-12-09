import React from 'react';
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
import { Typography } from '@mui/material';

import { Pagination } from '../../../types/Pagination';
import SearchField from '../search_field/SearchField';
import { signOut } from '../../../actions/users/SignOut';
import { getProducts } from '../../../actions/products/GetProducts';
import { restoreDefaultUserReducer } from '../../../actions/users/RestoreDefaultUserReducer';
import { restoreDefaultProductsReducer } from '../../../actions/products/RestoreDefaultProductsReducer';
import { UserRole } from '../../../types/UserRole';
import { SortOrder, SortRule } from '../../../types/SortEnum';

type navigationBarProps = {};

const NavigationBar: React.FC<navigationBarProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { token, roles, balance } = useSelector((state: AppState) => state.userReducer);

    const defaultPagination: Pagination = {
        page: 0,
        size: 20,
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

    const signOutLocally = () => {
        dispatch(signOut());
        dispatch(restoreDefaultUserReducer());
        handleUserMenuClose();
    };

    const goToHome = () => {
        history.push('/');
    };

    const handleOpenCart = () => {
        history.push('/cart');
    };

    const handleOpenOrders = () => {
        history.push('/orders');
    };

    const handleSearch = (searchText: string) => {
        dispatch(getProducts(defaultPagination, searchText, null, SortRule.DEFAULT, SortOrder.ASC));
        history.push('/products');
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
                        <Badge>
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
                <MenuItem onClick={signOutLocally}>Sign out</MenuItem>
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
            <AppBar position='static'>
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
        </Box>
    );
};

export default NavigationBar;
