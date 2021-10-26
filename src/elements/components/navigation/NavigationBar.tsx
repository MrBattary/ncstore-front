import React from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';

type navigationBarProps = {};

const NavigationBar: React.FC<navigationBarProps> = () => {
    const styles = {
        box: {
            flexGrow: 1,
        },
    };

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const dispatch = useDispatch();

    const goToHome = () => {};

    return (
        <Box sx={styles.box}>
            <AppBar position='static'>
                <Toolbar>
                    <Link variant='h5' color='inherit' component='div' underline='none' onClick={goToHome}>
                        NCStore
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavigationBar;
