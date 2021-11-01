import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Assignment, Favorite, ShoppingCart } from '@mui/icons-material';

import { signOut } from '../../../actions/users/SignOut';
import SearchField from '../search_field/SearchField';

type navigationBarProps = {};

const NavigationBar: React.FC<navigationBarProps> = () => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const dispatch = useDispatch();
    const { token } = useSelector((state: AppState) => state.userReducer);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleUserMenuOpen = (event: { currentTarget: React.SetStateAction<null | HTMLElement> }) => {
        setAnchorEl(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const goToTheProfile = () => {
        // TODO: Go to the profile tab
        handleUserMenuClose();
    };

    const signOutLocally = () => {
        dispatch(signOut());
        handleUserMenuClose();
    };

    const goToHome = () => {
        // TODO: Go to the home tab
    };

    const handleOpenCart = () => {
        // TODO: Go to the cart tab
    };

    const handleOpenFavorite = () => {
        // TODO: Go to the favorite tab
    };

    const handleOpenOrders = () => {
        // TODO: Go to the orders tab
    };

    const renderAuthorisedUserMenu = (
        <Stack spacing={2} direction='row'>
            <IconButton size='large' aria-label='orders' color='inherit' onClick={handleOpenOrders}>
                <Assignment />
            </IconButton>
            <IconButton size='large' aria-label='favorite' color='inherit' onClick={handleOpenFavorite}>
                <Favorite />
            </IconButton>
            <IconButton size='large' aria-label='shopping cart' color='inherit' onClick={handleOpenCart}>
                <ShoppingCart />
            </IconButton>
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

    const renderUnauthorisedUserMenu = (
        <Stack spacing={1} direction='row'>
            <Button color='inherit'>Sign in</Button>
            <Button variant='outlined' color='inherit'>
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
                    <Stack spacing={2} direction='row' flexGrow={1}>
                        <Link variant='h5' color='inherit' component='div' underline='none' onClick={goToHome}>
                            NCStore
                        </Link>
                        <SearchField placeholder='Search...' />
                    </Stack>
                    {renderMenu()}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavigationBar;