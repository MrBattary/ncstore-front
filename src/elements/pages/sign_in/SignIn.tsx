import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, Typography, Paper } from '@mui/material';

import SignInDataForm from '../../components/sign_in_up/SignInDataForm';
import { AppState } from '../../../reducers/rootReducer';
import { useSnackbar } from 'notistack';
import { History } from 'history';

type signInProps = {
    history: History;
};

const SignIn: React.FC<signInProps> = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, errorMessage } = useSelector((state: AppState) => state.userReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    return (
        <Container>
            <Paper>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ bgcolor: 'secondary.main', marginTop: 2 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h4' sx={{ marginBottom: 4, marginTop: 1 }}>
                        Sign In
                    </Typography>
                    <Box
                        sx={{
                            background: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <SignInDataForm />
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignIn;
