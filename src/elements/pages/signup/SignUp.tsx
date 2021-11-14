import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, ButtonGroup, Container, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AppState } from '../../../reducers/rootReducer';
import { History } from 'history';
import { UserType } from '../../../types/UserType';
import SignUpCompanyForm from '../../components/signup_forms/SignUpCompanyForm';

type signUpProps = {
    history: History;
};

const SignUp: React.FC<signUpProps> = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { loading, errorMessage } = useSelector((state: AppState) => state.userReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    const [tab, setTab] = useState(UserType.PERSON);

    const pushToSignIn = () => {
        history.push('/signin');
    };

    const renderForm = () => {
        switch (tab) {
            default:
            case UserType.PERSON:
                return null;
            case UserType.COMPANY:
                return (
                    <>
                        <SignUpCompanyForm
                            onFinish={() => {}}
                            onFinishFailed={() => {}}
                            onClickToSignIn={pushToSignIn}
                            loading={loading}
                        />
                    </>
                );
        }
    };

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
                    <Typography variant='h4' sx={{ marginBottom: 4, marginTop: 1 }}>
                        Sign up
                    </Typography>
                    <Box
                        sx={{
                            background: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ButtonGroup variant='contained'>
                            <Button onClick={() => setTab(UserType.PERSON)}>Person</Button>
                            <Button onClick={() => setTab(UserType.COMPANY)}>Company</Button>
                        </ButtonGroup>
                        {renderForm()}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;
