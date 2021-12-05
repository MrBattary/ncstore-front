import React, {useEffect, useMemo, useState} from 'react';
import {History} from 'history';
import {useDispatch, useSelector} from 'react-redux';

import {useSnackbar} from 'notistack';
import {Modal} from 'antd';
import {CloseCircleOutlined} from '@ant-design/icons';
import {Box, Button, Divider, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';

import {AppState} from '../../../reducers/rootReducer';
import {UserRole} from '../../../types/UserRole';
import {ProductFromList} from '../../../types/ProductsList';
import ProductInfoCard from '../../components/info_product_card/ProductInfoCard';
import {getProducts} from '../../../actions/products/GetProducts';
import {Pagination} from '../../../types/Pagination';
import ProductForm from '../../components/product_form/ProductForm';
import { ProductWithoutId } from '../../../types/ProductWithoutId';
import { restoreDefaultProductsReducer } from '../../../actions/products/RestoreDefaultProductsReducer';
import { newProduct } from '../../../actions/products/CreateProduct';
import { converters } from '../../../utils/Converters';
import { NormalPrice } from '../../../types/NormalPrice';
import { deleteProduct } from '../../../actions/products/DeleteProduct';
import { getDetailedProduct } from '../../../actions/products/GetDetailedProduct';
import { DiscountPrice } from '../../../types/DiscountPrice';
import { ProductWithSupplier } from '../../../types/ProductWithSupplier';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';
import { updateProduct } from '../../../actions/products/UpdateProduct';
import {SortOrder, SortRule} from '../../../types/SortEnum';

import './style.css';

type merchandiseProps = {
    history: History;
};

const enum merchandiseTasks {
    WAIT_FOR_PRODUCT_FOR_UPDATE = 'WAIT_FOR_PRODUCT_FOR_UPDATE',
    WAIT_FOR_UPDATED_PRODUCT = 'WAIT_FOR_UPDATED_PRODUCT',
    WAIT_FOR_ADDED_PRODUCT = 'WAIT_FOR_ADDED_PRODUCT',
    WAIT_FOR_DELETED_PRODUCT = 'WAIT_FOR_DELETED_PRODUCT',
}

const Merchandise: React.FC<merchandiseProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { product, detailedProduct, products, success, loading, errorMessage } = useSelector(
        (state: AppState) => state.productsReducer
    );
    const { token, roles, userId } = useSelector((state: AppState) => state.userReducer);

    const [detailedProductForUpdateForm, setDetailedProductForUpdateForm] = useState<ProductWithSupplier | null>();
    const [isUpdateProductFormVisible, setIsUpdateProductFormVisible] = useState<boolean>(false);
    const [isCreateProductFormVisible, setIsCreateProductFormVisible] = useState<boolean>(false);
    const [task, setNextTask] = useTask();

    const defaultPagination: Pagination = useMemo(
        () => ({
            page: 0,
            size: 20,
        }),
        []
    );

    const defaultSortRule : SortRule = SortRule.DATE;
    const defaultSortOrder : SortOrder = SortOrder.ASC;

    // TODO: Replace this with normal request from the backend
    const categoriesList: string[] = useMemo(() => ['category1', 'category2', 'category3'], []);

    useEffect(() => {
        if (task === merchandiseTasks.WAIT_FOR_ADDED_PRODUCT && product && success) {
            enqueueSnackbar(`Product ${product.productName} was successfully added!`, {
                variant: 'success',
            });
            setIsCreateProductFormVisible(false);
            dispatch(restoreDefaultProductsReducer());
            dispatch(getProducts(defaultPagination, '', userId, defaultSortRule, defaultSortOrder));
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [enqueueSnackbar, success, product, loading, dispatch, defaultPagination, defaultSortRule, defaultSortOrder, userId, task, setNextTask]);

    useEffect(() => {
        if (task === merchandiseTasks.WAIT_FOR_DELETED_PRODUCT && product && success) {
            enqueueSnackbar(`Product ${product.productName} was successfully deleted!`, {
                variant: 'success',
            });
            dispatch(restoreDefaultProductsReducer());
            dispatch(getProducts(defaultPagination, '', userId, defaultSortRule, defaultSortOrder));
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [enqueueSnackbar, success, product, loading, dispatch, defaultPagination, userId, defaultSortRule, defaultSortOrder, task, setNextTask]);

    useEffect(() => {
        if (task === merchandiseTasks.WAIT_FOR_PRODUCT_FOR_UPDATE && success) {
            let localDetailedProduct = detailedProduct;
            if (localDetailedProduct) {
                localDetailedProduct.normalPrices = converters.convertLanguageTagsToCountryNamesFromPricesArray(
                    localDetailedProduct.normalPrices
                );
                localDetailedProduct.discountPrices = converters.convertLanguageTagsToCountryNamesFromPricesArray(
                    localDetailedProduct.discountPrices
                ) as DiscountPrice[];
                setDetailedProductForUpdateForm(localDetailedProduct);
                setIsUpdateProductFormVisible(true);
                setNextTask(DEFAULT_TASK_ABSENT, 0);
            }
        }
    }, [detailedProduct, setNextTask, success, task]);

    useEffect(() => {
        if (task === merchandiseTasks.WAIT_FOR_UPDATED_PRODUCT && product && success) {
            enqueueSnackbar(`Product ${product.productName} was successfully updated!`, {
                variant: 'success',
            });
            setIsUpdateProductFormVisible(false);
            setDetailedProductForUpdateForm(null);
            dispatch(restoreDefaultProductsReducer());
            dispatch(getProducts(defaultPagination, '', userId, defaultSortRule, defaultSortOrder));
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [task, loading, dispatch, defaultPagination, userId, defaultSortRule, defaultSortOrder, product, enqueueSnackbar, setNextTask]);

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
        dispatch(getProducts(defaultPagination, '', userId, defaultSortRule, defaultSortOrder));
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const addNewProduct = () => {
        setIsCreateProductFormVisible(true);
    };

    const handleAddNewProduct = (e: ProductWithoutId) => {
        const { productName, productDescription, normalPrices, discountPrices, parentProductId, categoriesNames } = e;
        let convertedNormalPrices: NormalPrice[] = [];
        if (normalPrices && normalPrices.length > 0) {
            convertedNormalPrices = converters.convertCountryNamesToLanguageTagsFromPricesArray(normalPrices);
        }
        dispatch(restoreDefaultProductsReducer());
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
        setNextTask(merchandiseTasks.WAIT_FOR_ADDED_PRODUCT, 0);
    };

    const removeProduct = (productId: string) => {
        dispatch(deleteProduct(productId, token ? token : ''));
        setNextTask(merchandiseTasks.WAIT_FOR_DELETED_PRODUCT, 0);
    };

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const getProductDetails = (productId: string) => {
        dispatch(getDetailedProduct(productId, token ? token : ''));
        setNextTask(merchandiseTasks.WAIT_FOR_PRODUCT_FOR_UPDATE, 0);
    };

    const handleUpdateProduct = (e: ProductWithoutId) => {
        const { productName, productDescription, normalPrices, discountPrices, parentProductId, categoriesNames } = e;
        let convertedNormalPrices: NormalPrice[] = [];
        let convertedDiscountPrices: DiscountPrice[] = [];
        if (normalPrices && normalPrices.length > 0) {
            convertedNormalPrices = converters.convertCountryNamesToLanguageTagsFromPricesArray(normalPrices);
        }
        if (discountPrices && discountPrices.length > 0) {
            // @ts-ignore
            convertedDiscountPrices = converters.convertCountryNamesToLanguageTagsFromPricesArray(discountPrices);
        }
        dispatch(
            updateProduct(
                {
                    productId: detailedProductForUpdateForm
                        ? detailedProductForUpdateForm.productId
                            ? detailedProductForUpdateForm.productId
                            : ''
                        : '',
                    productName: productName,
                    productDescription: productDescription,
                    normalPrices: convertedNormalPrices,
                    discountPrices: convertedDiscountPrices,
                    parentProductId: parentProductId ? parentProductId : null,
                    categoriesNames: categoriesNames ? categoriesNames : [],
                },
                token ? token : ''
            )
        );
        setNextTask(merchandiseTasks.WAIT_FOR_UPDATED_PRODUCT, 0);
    };

    const handleCancelUpdateProduct = () => {
        setIsUpdateProductFormVisible(false);
        setDetailedProductForUpdateForm(null);
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
                    onUpdate={() => getProductDetails(product.productId)}
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
                defaultValuesProduct={detailedProductForUpdateForm}
                categoriesList={categoriesList}
                visible={isUpdateProductFormVisible}
                confirmLoading={loading}
                success={success && !!product}
                onFinish={handleUpdateProduct}
                onFinishFailed={() => {}}
                onCancel={handleCancelUpdateProduct}
            />
            <ProductForm
                isDiscountForm={false}
                defaultValuesProduct={null}
                categoriesList={categoriesList}
                visible={isCreateProductFormVisible}
                confirmLoading={loading}
                success={success && !!product}
                onFinish={handleAddNewProduct}
                onFinishFailed={() => {}}
                onCancel={() => setIsCreateProductFormVisible(false)}
            />
        </main>
    );
};

export default Merchandise;
