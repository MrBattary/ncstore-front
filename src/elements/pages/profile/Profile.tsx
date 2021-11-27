import React, { useEffect } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import {Container} from '@mui/material';
import { useSnackbar } from 'notistack';

import { AppState } from '../../../reducers/rootReducer';
import { restoreDefaultUserReducer } from '../../../actions/users/RestoreDefaultUserReducer';
import { getPersonProfile } from '../../../actions/users/GetPersonProfile';
import { getCompanyProfile } from '../../../actions/users/GetCompanyProfile';
import { UserType } from '../../../types/UserType';
import GeneralProfile from "../../components/profiles/GeneralProfile";

type profileProps = {
    history: History;
};

const Profile: React.FC<profileProps> = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { token, userType, profile, loading, errorMessage } = useSelector((state: AppState) => state.userReducer);

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
            switch (userType) {
                case UserType.PERSON: {
                    dispatch(getPersonProfile(token));
                    break;
                }
                case UserType.COMPANY: {
                    dispatch(getCompanyProfile(token));
                    break;
                }
            }
        }
    }, [token, userType, dispatch]);

    useEffect(() => {
        if (!token) {
            history.push('/signin');
        }
    }, [token, history]);



    return loading || !profile ? null : (
        <Container>
            <GeneralProfile history={history} profile={profile}/>
        </Container>
    );
};

export default Profile;
