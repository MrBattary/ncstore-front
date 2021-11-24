import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { History } from 'history';
import { useSnackbar } from 'notistack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import { AppState } from '../../../reducers/rootReducer';
import { signIn } from '../../../actions/users/SignIn';
import SignInForm from '../../components/signin_form/SignInForm';
import { restoreDefaultUserReducer } from '../../../actions/users/RestoreDefaultUserReducer';

type signInProps = {
    history: History;
};

const SignIn: React.FC<signInProps> = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { token, loading, errorMessage } = useSelector((state: AppState) => state.userReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
            dispatch(restoreDefaultUserReducer());
        }
    }, [enqueueSnackbar, errorMessage, dispatch]);

    useEffect(() => {
        if (token) {
            dispatch(restoreDefaultUserReducer());
            history.push('/');
        }
    }, [token, history, dispatch]);

    const pushToSignUp = () => {
        if (!loading) {
            history.push('/signup');
        }
    };

    const handleSubmit = (e: any) => {
        if (e.outOfDate !== false) {
            const { email, password } = e;
            dispatch(signIn({ email, password }));
        }
    };

    return (
        <Container>
            <Paper>
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 45,
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
                    <SignInForm
                        onFinish={handleSubmit}
                        onFinishFailed={() => {}}
                        onClickToSignUp={pushToSignUp}
                        loading={loading}
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default SignIn;
