import React from 'react';
import { History } from 'history';

import { Button, Typography } from '@mui/material';

import './style.css';

type notFoundProps = {
    history: History;
};

const NotFound: React.FC<notFoundProps> = ({ history }) => (
    <main className='not-found-content'>
        <img src='/not-found.jpg' alt='Not found' />
        <Typography className='empty-cart__label' variant='h4' display='inline-block'>
            It seems you are lost, but we can bring you home
        </Typography>
        <Button style={{ fontSize: 24 }} onClick={() => history.push('/')}>
            Return to home
        </Button>
    </main>
);

export default NotFound;
