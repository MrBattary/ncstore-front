import React, {useEffect} from 'react';
import {History} from 'history';
import {useDispatch, useSelector} from 'react-redux';

import {Container, Stack} from '@mui/material';
import {useSnackbar} from 'notistack';

import {AppState} from '../../../reducers/rootReducer';
import {restoreDefaultUserReducer} from '../../../actions/users/RestoreDefaultUserReducer';
import {getPersonProfile} from '../../../actions/users/GetPersonProfile';
import {getCompanyProfile} from '../../../actions/users/GetCompanyProfile';
import {UserType} from '../../../types/UserType';
import GeneralProfile from "../../components/profiles/GeneralProfile";
import UserProfileBalance from "../../components/profiles/UserProfileBalance";
import ProfileChangePassword from "../../components/profiles/ProfileChangePassword";
import {changePassword} from "../../../actions/users/PasswordChange";

type profileProps = {
    history: History;
};

const Profile: React.FC<profileProps> = ({history}) => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const {
        token,
        userType,
        profile,
        loading,
        errorMessage,
    } = useSelector((state: AppState) => state.userReducer);

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

    const handleBalanceAdd = (e: any) => {

    }

    const handlePasswordChange = (e: any) => {
        if (e.outOfDate !== false) {
            const {oldPassword, newPassword} = e;
            dispatch(changePassword({
                    oldPassword,
                    newPassword
                }, token ? token : '')
            );
        }
    }


    return loading || !profile ? null : (
        <Container>
            <Stack>
                <GeneralProfile history={history} profile={profile}/>
                <UserProfileBalance balance={profile.balance} balanceCurrency="$" loading={loading}
                                    onFinish={handleBalanceAdd} onFinishFailed={() => {
                }}/>
                <ProfileChangePassword loading={loading} onFinish={handlePasswordChange} onFinishFailed={() => {
                }}/>
            </Stack>
        </Container>
    );
};

export default Profile;
