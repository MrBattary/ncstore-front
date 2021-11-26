/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import { useSnackbar } from 'notistack';
import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/UserRole';
import { ProductFromList } from '../../../types/ProductsList';
import ProductInfoCard from '../../components/info_product_card/ProductInfoCard';
import { getProducts } from '../../../actions/products/GetProducts';
import { Pagination } from '../../../types/Pagination';
import ProductForm from '../../components/product_form/ProductForm';
import { Product } from '../../../types/Product';
import { restoreDefaultProductsReducer } from '../../../actions/products/RestoreDefaultProductsReducer';
import { newProduct } from '../../../actions/products/CreateProduct';
import { converters } from '../../../utils/Converters';
import { NormalPrice } from '../../../types/NormalPrice';
import { deleteProduct } from '../../../actions/products/DeleteProduct';

import './style.css';

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

    const [successWord, setSuccessWord] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
            enqueueSnackbar(`Product ${product.productName} was successfully ${successWord}!`, {
                variant: 'success',
            });
            setIsModalVisible(false);
            dispatch(restoreDefaultProductsReducer());
            dispatch(getProducts(defaultPagination, '', userId));
        }
    }, [enqueueSnackbar, success, product, loading, dispatch, defaultPagination, userId, successWord]);

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
            convertedNormalPrices = converters.convertCountryNamesToLanguageTagsFromNormalPrices(normalPrices);
        }
        setSuccessWord(`added`);
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

    const removeProduct = (productId: string) => {
        setSuccessWord(`removed`);
        dispatch(deleteProduct(productId, token ? token : ''));
    };

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const getProductDetails = (productId: string) => {
        console.log('Get product details');
    };

    const showRemoveConfirm = (productId: string) => {
        Modal.confirm({
            title: 'ATTENTION',
            icon: <CloseCircleOutlined />,
            content: "Are you sure you want to remove this product? You can't undo this operation.",
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                removeProduct(productId);
            },
            onCancel() {},
        });
    };

    const renderProductsInfoCardList = () => (
        <div className='merchandise__products-list'>
            {products.map((product: ProductFromList) => (
                <ProductInfoCard
                    key={product.productId}
                    productId={product.productId}
                    productName={product.productName}
                    onClick={() => goToProduct(product.productId)}
                    onDetails={() => getProductDetails(product.productId)}
                    onRemove={() => showRemoveConfirm(product.productId)}
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
            <ProductForm
                isDiscountForm={true}
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
