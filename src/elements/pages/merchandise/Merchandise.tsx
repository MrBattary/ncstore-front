/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import { useSnackbar } from 'notistack';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/UserRole';
import { ProductFromList } from '../../../types/ProductsList';
import ProductInfoCard from '../../components/info_product_card/ProductInfoCard';
import { getProducts } from '../../../actions/products/GetProducts';
import { Pagination } from '../../../types/Pagination';
import NewProductForm from '../../components/new_product_form/NewProductForm';
import { Product } from '../../../types/Product';
import { restoreDefaultProductsReducer } from '../../../actions/products/RestoreDefaultProductsReducer';
import { newProduct } from '../../../actions/products/CreateProduct';

import './style.css';
import { converters } from '../../../utils/Converters';
import { NormalPrice } from '../../../types/NormalPrice';

type merchandiseProps = {
    history: History;
};

const Merchandise: React.FC<merchandiseProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { product, products, success, loading, errorMessage } = useSelector(
        (state: AppState) => state.productsReducer
    );
    const { token, roles, userId } = useSelector((state: AppState) => state.userReducer);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const defaultPagination: Pagination = useMemo(
        () => ({
            page: 0,
            size: 20,
        }),
        []
    );

    // TODO: Replace this with normal request from the backend
    const categoriesList: string[] = useMemo(() => ['category1', 'category2', 'category3'], []);

    useEffect(() => {
        if (product && !loading) {
            enqueueSnackbar(`Product ${product.productName} was created!`, {
                variant: 'success',
            });
            setIsModalVisible(false);
            dispatch(restoreDefaultProductsReducer());
            dispatch(getProducts(defaultPagination, '', userId));
        }
    }, [enqueueSnackbar, success, product, loading, dispatch, defaultPagination, userId]);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
    }, [enqueueSnackbar, errorMessage]);

    useEffect(() => {
        if (!token) {
            history.push('/signin');
        }
    }, [history, token]);

    useEffect(() => {
        if (!roles.includes(UserRole.SUPPLIER)) {
            history.push('/');
        }
        dispatch(getProducts(defaultPagination, '', userId));
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const addNewProduct = () => {
        setIsModalVisible(true);
    };

    const handleAddNewProduct = (e: Product) => {
        const { productName, productDescription, normalPrices, discountPrices, parentProductId, categoriesNames } = e;
        dispatch(restoreDefaultProductsReducer());
        let convertedNormalPrices: NormalPrice[] = [];
        if (normalPrices && normalPrices.length > 0) {
            convertedNormalPrices = converters.convertCountryNamesToLanguageTagFromNormalPrices(normalPrices);
        }
        dispatch(
            newProduct(
                {
                    productName: productName,
                    productDescription: productDescription ? productDescription : null,
                    normalPrices: convertedNormalPrices,
                    discountPrices: discountPrices ? discountPrices : [],
                    parentProductId: parentProductId ? parentProductId : null,
                    categoriesNames: categoriesNames ? categoriesNames : [],
                },
                token ? token : ''
            )
        );
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
                {products.length ? renderProductsInfoCardList() : renderProductsNotFound()}
            </div>
            <NewProductForm
                categoriesList={categoriesList}
                visible={isModalVisible}
                confirmLoading={loading}
                success={success && !!product}
                onFinish={handleAddNewProduct}
                onFinishFailed={() => {}}
                onCancel={() => setIsModalVisible(false)}
            />
        </main>
    );
};

export default Merchandise;
