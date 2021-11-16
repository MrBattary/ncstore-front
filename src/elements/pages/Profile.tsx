import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducers/rootReducer';
import { Container, Paper } from '@mui/material';
import { signRestoreDefault } from '../../actions/users/SignRestoreDefault';
import { useSnackbar } from 'notistack';
import { PersonData } from '../../types/PersonData';
import { CompanyData } from '../../types/CompanyData';

type profileProps = {
    anotherUserId: string | null;
    history: History;
};

const Profile: React.FC<profileProps> = ({ anotherUserId, history }) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { token, success, loading, errorMessage } = useSelector((state: AppState) => state.userReducer);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [profile, setProfile] = useState<PersonData | CompanyData | null>(null);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
            dispatch(signRestoreDefault());
        }
    }, [enqueueSnackbar, errorMessage, dispatch]);

    useEffect(() => {
        if (anotherUserId) {
            // TODO: GET ANOTHER PROFILE
        }
    }, [anotherUserId, dispatch]);

    useEffect(() => {
        if (token) {
            // TODO: GET OWN PROFILE
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (!token && !anotherUserId) {
            history.push('/signin');
        }
    }, [token, anotherUserId, history]);

    return loading ? null : (
        <Container>
            <Paper></Paper>
        </Container>
    );
};

export default Profile;
