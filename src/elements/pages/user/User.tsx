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
import HomeCompilation from "../../components/home_compilation/HomeCompilation";
import {getProducts} from "../../../actions/products/GetProducts";
import {restoreDefaultSearchReducer} from "../../../actions/search/RestoreDefaultSearchReducer";
import {setNewSupplierId} from "../../../actions/search/SetNewSupplierId";
import useTask, {DEFAULT_TASK_ABSENT} from "../../../utils/TaskHook";

type profileProps = {
    history: History;
};

const enum userTasks {
    WAIT_FOR_PROFILE = 'WAIT_FOR_PROFILE_TO_LOAD',
    DO_GET_PRODUCTS = 'DO_REQUEST_FOR_PRODUCTS',
    WAIT_FOR_GET_PRODUCTS = 'WAIT_FOR_PRODUCTS_TO_LOAD',
}

const User: React.FC<profileProps> = ({history}) => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const {searchQuery} = useSelector((state: AppState) => state.searchReducer);
    const {products, success: productSuccess} = useSelector((state: AppState) => state.productsReducer);
    const [task, setNextTask] = useTask();

    const {
        otherUserProfile,
        success: userSuccess,
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
        if (task === userTasks.WAIT_FOR_GET_PRODUCTS && productSuccess) {
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [productSuccess, setNextTask, task, dispatch]);

    useEffect(() => {
        if (task === userTasks.DO_GET_PRODUCTS) {
            dispatch(getProducts(searchQuery))
            setNextTask(userTasks.WAIT_FOR_GET_PRODUCTS, 0);
        }
    }, [setNextTask, task, dispatch, searchQuery]);

    useEffect(() => {
        if (task === userTasks.WAIT_FOR_PROFILE && userSuccess) {
            dispatch(restoreDefaultSearchReducer())
            dispatch(setNewSupplierId(window.location.pathname.substr(7)))
            setNextTask(userTasks.DO_GET_PRODUCTS, 0);
        }
    }, [userSuccess, setNextTask, task, dispatch]);

    useEffect(() => {
        dispatch(getOtherUserProfile(window.location.pathname.substr(7)))
        setNextTask(userTasks.WAIT_FOR_PROFILE, 0);
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const handleBuy = (productId: string, productName: string, productCount: number) => {
    };

    const handleAddToCart = (productId: string, productName: string, productCount: number) => {
    };

    const renderSupplierProducts = () => {
        if (otherUserProfile) {
            if (otherUserProfile.roles.includes(UserRole.SUPPLIER)) {
                return (
                    <>
                        <HomeCompilation
                            compilationName='Products of that supplier'
                            products={products}
                            isDisplayButtons={false}
                            onClick={goToProduct}
                            onBuy={handleBuy}
                            onAddToCart={handleAddToCart}
                        />
                    </>
                )
            }
        }
    }


    return !userSuccess || !productSuccess || !otherUserProfile || !products ? null : (
        <Container>
            <Stack spacing={8} sx={{marginTop: 8, marginBottom: 8}}>
                <GeneralProfile history={history} profile={otherUserProfile}/>
                {renderSupplierProducts()}
            </Stack>
        </Container>
    );
};

export default User;
