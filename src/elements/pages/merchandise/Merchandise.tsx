/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import { useSnackbar } from 'notistack';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/UserRole';
import { ProductFromList } from '../../../types/ProductsList';
import ProductInfoCard from '../../components/info_product_card/ProductInfoCard';

import './style.css';

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

    const addNewProduct = () => {
        console.log('Add new product');
    };

    const getProductDetails = () => {
        console.log('Get product details');
    };

    const removeProduct = () => {
        console.log('Remove product');
    };

    const renderProductsInfoCardList = () => (
        <div className='merchandise__products-list'>
            {products.map((product: ProductFromList) => (
                <ProductInfoCard
                    key={product.productId}
                    productId={product.productId}
                    productName={product.productName}
                    onClick={getProductDetails}
                    onDetails={getProductDetails}
                    onRemove={removeProduct}
                />
            ))}
        </div>
    );

    const renderProductsNotFound = () => (
        <div className='merchandise__merchandise-not-found'>
            {/* TODO: Add some picture here */}
            <Typography className='merchandise-not-found__label' variant='h4' display='inline-block'>
                It seems you are not selling anything yet...
            </Typography>
        </div>
    );

    return (
        <main className='merchandise-content'>
            <Box margin={2} display={'flex'} justifyContent={'space-between'}>
                <Typography className='merchandise-content__header' variant='h4'>
                    Your products
                </Typography>
                <Button
                    className='merchandise-content__add-button'
                    size='large'
                    variant='contained'
                    onClick={addNewProduct}
                    startIcon={<Add />}
                    sx={{ backgroundColor: '#39bd5c', '&:hover': { backgroundColor: '#50d96c' } }}
                >
                    Add new product
                </Button>
            </Box>

            <div className='merchandise-content__merchandise'>
                <Divider />
                {products ? renderProductsInfoCardList() : renderProductsNotFound()}
            </div>
        </main>
    );
};

export default Merchandise;
