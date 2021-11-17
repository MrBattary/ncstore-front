/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/UserRole';

type merchandiseProps = {
    history: History;
};

const Merchandise: React.FC<merchandiseProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { products, loading, errorMessage } = useSelector((state: AppState) => state.productsReducer);
    const { token, roles } = useSelector((state: AppState) => state.userReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    useEffect(() => {
        if (!token) {
            history.push('/signin');
        }
    }, [token, history]);

    useEffect(() => {
        if (!roles.includes(UserRole.SUPPLIER)) {
            history.push('/');
        }
    }, [roles, history]);

    return <></>;
};

export default Merchandise;
