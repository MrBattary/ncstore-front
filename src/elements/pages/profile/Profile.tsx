import React, {useEffect, useState} from 'react';
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
import PaymentModal from "../../components/payment/PaymentModal";
import {getPaymentToken} from "../../../actions/users/Payment";
import {Modal} from "antd";
import {addBalance} from "../../../actions/users/BalanceAdd";

type profileProps = {
    history: History;
};

const Profile: React.FC<profileProps> = ({history}) => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    const [isPaymentFormVisible, setIsPaymentFormVisible] = useState<boolean>(false);
    const [isWaitingForPaymentToProceed, setIsWaitingForPaymentToProceed] = useState<boolean>(false);
    const [paymentAmount, setPaymentAmount] = useState<number>(0);

    const {
        token,
        paymentToken,
        userType,
        profile,
        loading,
        errorMessage,
        balance,
        success
    } = useSelector((state: AppState) => state.userReducer);


    const renderErrorModal = () => {
        Modal.error({
            title: 'Payment error',
            content: 'We can not proceed a payment for you. Maybe you do not have enough money on your card or payment service is down. Try again later.',
        });
    }

    const renderSuccessModal = () => {
        Modal.success({
            content: 'Your payment was successful!',
        });
    }

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
            dispatch(restoreDefaultUserReducer());
        }
    }, [enqueueSnackbar, errorMessage, dispatch]);

    useEffect(() => {
        if(isWaitingForPaymentToProceed && !loading){
            setIsWaitingForPaymentToProceed(false)
            if(success){
                renderSuccessModal()
            }
            else{
                renderErrorModal()
            }
        }
    }, [isWaitingForPaymentToProceed, loading, success, dispatch]);

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

    useEffect(() => {
        dispatch(getPaymentToken(token ? token : ''));
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const handleBalanceAdd = (e: any) => {
        if (paymentToken) {
            setIsPaymentFormVisible(true);
            const {amount} = e;
            setPaymentAmount(amount);
        } else {
            renderErrorModal()
        }
    }

    const handleBalancePayment = (e: any, nonce: string) => {
        if (nonce && nonce.length !== 0) {
            dispatch(addBalance({paymentAmount, nonce}, token ? token : ''));
            setIsWaitingForPaymentToProceed(true);
            dispatch(getPaymentToken(token ? token : ''));
            setIsPaymentFormVisible(false);
        }
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
                <UserProfileBalance balance={balance ? balance.balance : 0} balanceCurrency={balance ? balance.currency : "$"} loading={loading}
                                    onFinish={handleBalanceAdd} onFinishFailed={() => {
                }}/>
                <ProfileChangePassword loading={loading} onFinish={handlePasswordChange} onFinishFailed={() => {
                }}/>
                <PaymentModal isVisible={isPaymentFormVisible} handleOk={handleBalancePayment}
                              handleCancel={() => setIsPaymentFormVisible(false)}
                              paymentToken={paymentToken ? paymentToken : ''}/>
            </Stack>
        </Container>
    );
};

export default Profile;
