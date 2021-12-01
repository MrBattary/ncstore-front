import React from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import './style.css';

type footerProps = {};

const Footer: React.FC<footerProps> = () => {
    return (
        <div className='footer'>
            <div className='footer__content'>
                <Typography variant='h6' style={{ color: 'white', fontSize: 16 }}>
                    2021 - NC Store. All Rights Reserved.
                </Typography>
                <Typography variant='h6' style={{ color: 'white', fontSize: 14 }}>
                    Designed & Developed by Michael Linker and Artem Bakin.
                </Typography>
                <Typography variant='h6' style={{ color: 'white', fontSize: 14 }}>
                    You can contact us by email:
                    <Link href='mailto:netcrstore@gmail.com' underline='hover' style={{ color: 'white' }}>
                        netcrstore@gmail.com
                    </Link>
                </Typography>
            </div>
        </div>
    );
};

export default Footer;
