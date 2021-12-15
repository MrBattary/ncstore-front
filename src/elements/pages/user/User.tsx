import React, {useEffect} from 'react';
import {History} from 'history';
import {useDispatch, useSelector} from 'react-redux';

import {Container, Stack} from '@mui/material';
import {useSnackbar} from 'notistack';

import {AppState} from '../../../reducers/rootReducer';
import {restoreDefaultUserReducer} from '../../../actions/users/RestoreDefaultUserReducer';
import GeneralProfile from "../../components/profiles/GeneralProfile";
import {getOtherUserProfile} from "../../../actions/users/GetOtherUserProfile";
import {UserRole} from "../../../types/UserRole";

type profileProps = {
    history: History;
};

const Profile: React.FC<profileProps> = ({history}) => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    const {
        otherUserProfile,
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
        dispatch(getOtherUserProfile(window.location.pathname.substr(7)))
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const renderSupplierProducts = () => {
        if (otherUserProfile) {
            if (otherUserProfile.roles.includes(UserRole.SUPPLIER)) {
                return (<></>);//TODO
            } else {
                return (<></>);
            }
        }
    }


    return loading || !otherUserProfile ? null : (
        <Container>
            <Stack spacing={8} sx={{marginTop: 8, marginBottom: 8}}>
                <GeneralProfile history={history} profile={otherUserProfile}/>
                {renderSupplierProducts}
            </Stack>
        </Container>
    );
};

export default Profile;
