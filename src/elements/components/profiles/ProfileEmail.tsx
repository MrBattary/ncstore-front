import React from 'react';

import {Box, Container, Paper, Stack, Typography} from '@mui/material';

import './style.css';

type profileEmailProps = {
    email: string;
};

const ProfileEmail: React.FC<profileEmailProps> = ({email}) => {
    return (
        <Container>
            <Paper elevation={10}>
                <Box sx={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Stack spacing={2}>
                        <Typography align="center" variant="h4">Your Email</Typography>
                        <Typography align="center" variant="h5">{email}</Typography>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfileEmail;