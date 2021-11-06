import React from 'react';

import { Typography } from '@mui/material';
import './style.css';

type homeProps = {};

const Home: React.FC<homeProps> = () => {
    return (
        <>
            <div className='home'>
                <Typography className='home__label' variant='h3'>
                    Mocked Home
                </Typography>
            </div>
        </>
    );
};

export default Home;
