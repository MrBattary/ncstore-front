import React, {useEffect} from 'react';
import {History} from 'history';
import {useDispatch, useSelector} from 'react-redux';

import {Box, Button, Container, Paper, Stack} from '@mui/material';
import {useSnackbar} from 'notistack';

import {AppState} from '../../../reducers/rootReducer';
import {restoreDefaultUserReducer} from '../../../actions/users/RestoreDefaultUserReducer';
import GeneralProfile from "../../components/profiles/GeneralProfile";
import {getOtherUserProfile} from "../../../actions/users/GetOtherUserProfile";
import {UserRole} from "../../../types/UserRole";
import {getProducts} from "../../../actions/products/GetProducts";
import {restoreDefaultSearchReducer} from "../../../actions/search/RestoreDefaultSearchReducer";
import {setNewSupplierId} from "../../../actions/search/SetNewSupplierId";
import useTask, {DEFAULT_TASK_ABSENT} from "../../../utils/TaskHook";
import {setNewPagination} from "../../../actions/search/SetNewPagination";
import Typography from "@mui/material/Typography";
import {ProductFromList} from "../../../types/ProductsList";
import ProductCard from "../../components/product_card/ProductCard";

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
    const {products, success: productSuccess, loading} = useSelector((state: AppState) => state.productsReducer);
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
            dispatch(setNewSupplierId(window.location.pathname.substr(6)))
            setNextTask(userTasks.DO_GET_PRODUCTS, 0);
        }
    }, [userSuccess, setNextTask, task, dispatch]);

    useEffect(() => {
        dispatch(getOtherUserProfile(window.location.pathname.substr(6)))
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

    const onGoBack = () => {
        dispatch(setNewPagination({ page: searchQuery.pagination.page - 1, size: searchQuery.pagination.size }));
        setNextTask(userTasks.DO_GET_PRODUCTS, 0);
    };

    const onGoForward = () => {
        dispatch(setNewPagination({ page: searchQuery.pagination.page + 1, size: searchQuery.pagination.size }));
        setNextTask(userTasks.DO_GET_PRODUCTS, 0);
    };

    const renderSupplierProducts = () => {
        if (otherUserProfile) {
            if (otherUserProfile.roles.includes(UserRole.SUPPLIER)) {
                return (
                    <Paper elevation={5} sx={{
                        padding: 3,
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography variant='h3' sx={{marginBottom:1}}>Products of that supplier</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'stretch',
                            justifyContent: 'center',
                        }}
                        >
                            {products.map((product: ProductFromList) => (
                                <ProductCard
                                    key={product.productId}
                                    productName={product.productName}
                                    normalPrice={product.normalPrice}
                                    discountPrice={product.discountPrice}
                                    priceCurrency={product.priceCurrency}
                                    isDisplayButtons={false}
                                    onClick={() => goToProduct(product.productId)}
                                    onBuy={clicks => handleBuy(product.productId, product.productName, clicks)}
                                    onAddToCart={clicks => handleAddToCart(product.productId, product.productName, clicks)}
                                />
                            ))}
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '130px',
                        }}
                        >
                            <Button
                                variant='outlined'
                                onClick={onGoBack}
                                disabled={!searchQuery.pagination.page || loading}
                            >
                                {'<'}
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={onGoForward}
                                disabled={searchQuery.pagination.size > products.length || loading}
                            >
                                {'>'}
                            </Button>
                        </Box>
                    </Paper>
                )
            }
        }
    }


    return !userSuccess || !otherUserProfile || !products ? null : (
        <Container>
            <Stack spacing={8} sx={{marginTop: 8, marginBottom: 8}}>
                <GeneralProfile history={history} profile={otherUserProfile}/>
                {renderSupplierProducts()}
            </Stack>
        </Container>
    );
};

export default User;
