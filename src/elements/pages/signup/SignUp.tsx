import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, ButtonGroup, Container, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { AppState } from '../../../reducers/rootReducer';
import { UserType } from '../../../types/UserType';
import SignUpCompanyForm from '../../components/signup_forms/SignUpCompanyForm';
import SignUpPersonForm from '../../components/signup_forms/SignUpPersonForm';
import { signUpCompany, signUpPerson } from '../../../actions/users/SignUp';
import { restoreDefaultUserReducer } from '../../../actions/users/RestoreDefaultUserReducer';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';
import { useTranslation } from 'react-i18next';

type signUpProps = {
    history: History;
};

enum signUpTasks {
    WAIT_FOR_SIGN_UP = 'WAIT_FOR_SIGN_UP',
}

const SignUp: React.FC<signUpProps> = ({ history }) => {
    const { t } = useTranslation('signUp');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const { token, success, loading, errorMessage } = useSelector((state: AppState) => state.userReducer);

    const [tab, setTab] = useState(UserType.PERSON);
    const [task, setTask] = useTask();

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

    useEffect(() => {
        if (task === signUpTasks.WAIT_FOR_SIGN_UP && success) {
            dispatch(restoreDefaultUserReducer());
            setTask(DEFAULT_TASK_ABSENT, 0);
            history.push('/signin');
            enqueueSnackbar(t('success'), {
                variant: 'success',
            });
        }
    }, [success, dispatch, history, enqueueSnackbar, task, setTask, t]);

    const pushToSignIn = () => {
        if (!loading) {
            history.push('/signin');
        }
    };

    const handleSubmitPerson = (e: any) => {
        if (e.outOfDate !== false) {
            const { email, password, nickName, firstName, lastName, birthday, roles } = e;
            dispatch(
                signUpPerson({
                    email,
                    password,
                    nickName,
                    firstName,
                    lastName,
                    birthday: birthday ? birthday.format('YYYY-MM-DD') : null,
                    roles,
                })
            );
            setTask(signUpTasks.WAIT_FOR_SIGN_UP, 0);
        }
    };

    const handleSubmitCompany = (e: any) => {
        if (e.outOfDate !== false) {
            const { email, password, companyName, foundationDate, roles } = e;
            dispatch(
                signUpCompany({
                    email,
                    password,
                    companyName,
                    foundationDate: foundationDate ? foundationDate.format('YYYY-MM-DD') : null,
                    roles,
                })
            );
            setTask(signUpTasks.WAIT_FOR_SIGN_UP, 0);
        }
    };

    const renderForm = () => {
        switch (tab) {
            default:
            case UserType.PERSON:
                return (
                    <SignUpPersonForm
                        onFinish={handleSubmitPerson}
                        onFinishFailed={() => {}}
                        onClickToSignIn={pushToSignIn}
                        loading={loading}
                    />
                );
            case UserType.COMPANY:
                return (
                    <SignUpCompanyForm
                        onFinish={handleSubmitCompany}
                        onFinishFailed={() => {}}
                        onClickToSignIn={pushToSignIn}
                        loading={loading}
                    />
                );
        }
    };

    return (
        <Container style={{ minHeight: '100%', paddingTop: '5vh' }}>
            <Paper>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ bgcolor: 'secondary.main', marginTop: 2 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h4' sx={{ marginBottom: 4, marginTop: 1 }}>
                        {t('pageName')}
                    </Typography>
                    <Box
                        sx={{
                            background: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ButtonGroup variant='text' disabled={loading} sx={{ marginBottom: 3, marginTop: -3 }}>
                            <Button onClick={() => setTab(UserType.PERSON)}>{t('tabs.person.tabName')}</Button>
                            <Button onClick={() => setTab(UserType.COMPANY)}>{t('tabs.company.tabName')}</Button>
                        </ButtonGroup>
                        {renderForm()}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;
