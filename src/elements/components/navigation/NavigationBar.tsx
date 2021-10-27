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
import { signOut } from '../../../actions/user/SignOut';

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

    const renderAuthorisedUserMenu = (
        <>
            <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleUserMenuOpen}
                color='inherit'
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
        </>
    );

    const renderUnauthorisedUserMenu = (
        <Stack spacing={1} direction='row'>
            <Button color='inherit'>Sign in</Button>
            <Button variant='outlined' color='inherit'>
                Sign up
            </Button>
        </Stack>
    );

    const renderUserMenu = () => {
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
                    <Link
                        variant='h5'
                        color='inherit'
                        component='div'
                        underline='none'
                        style={{ flex: 1 }}
                        onClick={goToHome}
                    >
                        NCStore
                    </Link>
                    {renderUserMenu()}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavigationBar;
