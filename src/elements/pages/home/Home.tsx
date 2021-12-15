import React, { useEffect, useState } from 'react';
import { History } from 'history';

import CardMedia from '@mui/material/CardMedia';
import {Box, Stack} from '@mui/material';

import HomeCompilation from '../../components/home_compilation/HomeCompilation';
import { getProducts } from '../../../actions/products/GetProducts';
import { useDispatch, useSelector } from 'react-redux';
import { SortOrder, SortRule } from '../../../types/SortEnum';
import { ProductFromList, ProductsList } from '../../../types/ProductsList';
import { AppState } from '../../../reducers/rootReducer';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import { UserRole } from '../../../types/UserRole';
import { CartProduct } from '../../../types/CartProduct';
import { getCart } from '../../../actions/cart/GetCart';
import { useSnackbar } from 'notistack';
import { setNewSortOrder } from '../../../actions/search/SetNewSortOrder';
import { restoreDefaultSearchReducer } from '../../../actions/search/RestoreDefaultSearchReducer';
import { setNewSortRule } from '../../../actions/search/SetNewSortRule';
import { setNewPagination } from '../../../actions/search/SetNewPagination';
import HomeCategoryPick from "../../components/home_compilation/HomeCategoryPick";
import {setNewCategoriesNames} from "../../../actions/search/SetNewCategoryNames";

import './style.css';

type homeProps = {
    history: History;
};

const enum homeTasks {
    DO_REQUEST_FOR_DISCOUNT_PRODUCTS = 'DO_REQUEST_FOR_DISCOUNT_PRODUCTS',
    WAIT_FOR_DISCOUNT_PRODUCTS_TO_LOAD = 'WAIT_FOR_DISCOUNT_PRODUCT_TO_LOAD',
    DO_REQUEST_FOR_NEW_PRODUCTS = 'DO_REQUEST_FOR_NEW_PRODUCTS',
    WAIT_FOR_NEW_PRODUCTS_TO_LOAD = 'WAIT_FOR_NEW_PRODUCT_TO_LOAD',
    DO_REQUEST_FOR_FREE_PRODUCT = 'DO_REQUEST_FOR_FREE_PRODUCT',
    WAIT_FOR_FREE_PRODUCTS_TO_LOAD = 'WAIT_FOR_FREE_PRODUCT_TO_LOAD',
    DO_REQUEST_FOR_YOU_PRODUCTS = 'DO_REQUEST_FOR_YOU_PRODUCTS',
    WAIT_FOR_YOU_PRODUCTS_TO_LOAD = 'WAIT_FOR_YOU_PRODUCT_TO_LOAD',
    GO_TO_CATEGORY = 'GO_TO_CATEGORY',
}

const Home: React.FC<homeProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [task, setNextTask] = useTask();

    const { searchQuery, searchUrl } = useSelector((state: AppState) => state.searchReducer);
    const { cart, success: successCart } = useSelector((state: AppState) => state.cartReducer);
    const { roles, token } = useSelector((state: AppState) => state.userReducer);
    const { products, success, errorMessage } = useSelector((state: AppState) => state.productsReducer);
    const { categories } = useSelector((state: AppState) => state.categoryReducer);


    const [discountProducts, setDiscountProducts] = useState<ProductsList>([]);
    const [newProducts, setNewProducts] = useState<ProductsList>([]);
    const [freeProducts, setFreeProducts] = useState<ProductsList>([]);
    const [forYouProducts, setForYouProducts] = useState<ProductsList>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
    }, [enqueueSnackbar, errorMessage]);

    useEffect(() => {
        if (successMessage && successCart) {
            enqueueSnackbar(successMessage, {
                variant: 'success',
            });
            setSuccessMessage(null);
        }
    }, [enqueueSnackbar, successCart, successMessage]);

    useEffect(() => {
        if (task === homeTasks.GO_TO_CATEGORY) {
            history.push('/products'.concat(searchUrl));
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    });

    useEffect(() => {
        if (task === homeTasks.WAIT_FOR_YOU_PRODUCTS_TO_LOAD && success) {
            if (products) {
                setForYouProducts(products.slice());
                dispatch(restoreDefaultSearchReducer());
                setNextTask(DEFAULT_TASK_ABSENT, 0);
            }
        }
    }, [products, success, setNextTask, task, dispatch]);

    useEffect(() => {
        if (task === homeTasks.DO_REQUEST_FOR_YOU_PRODUCTS) {
            dispatch(getProducts(searchQuery));
            setNextTask(homeTasks.WAIT_FOR_YOU_PRODUCTS_TO_LOAD, 0);
        }
    }, [dispatch, searchQuery, setNextTask, task]);

    useEffect(() => {
        if (task === homeTasks.WAIT_FOR_FREE_PRODUCTS_TO_LOAD && success) {
            if (products) {
                setFreeProducts(
                    products
                        .filter((product: ProductFromList) => product.normalPrice === 0 || product.discountPrice === 0)
                        .slice()
                );
                dispatch(setNewSortRule(SortRule.DEFAULT));
                dispatch(setNewSortOrder(SortOrder.RAND));
                setNextTask(homeTasks.DO_REQUEST_FOR_YOU_PRODUCTS, 0);
            }
        }
    }, [products, success, setNextTask, task, dispatch, searchQuery]);

    useEffect(() => {
        if (task === homeTasks.DO_REQUEST_FOR_FREE_PRODUCT) {
            dispatch(getProducts(searchQuery));
            setNextTask(homeTasks.WAIT_FOR_FREE_PRODUCTS_TO_LOAD, 0);
        }
    }, [dispatch, searchQuery, setNextTask, task]);

    useEffect(() => {
        if (task === homeTasks.WAIT_FOR_NEW_PRODUCTS_TO_LOAD && success) {
            if (products) {
                setNewProducts(products.slice());
                dispatch(setNewSortRule(SortRule.PRICE));
                dispatch(setNewSortOrder(SortOrder.ASC));
                setNextTask(homeTasks.DO_REQUEST_FOR_FREE_PRODUCT, 0);
            }
        }
    }, [products, success, setNextTask, task, dispatch, searchQuery]);

    useEffect(() => {
        if (task === homeTasks.DO_REQUEST_FOR_NEW_PRODUCTS) {
            dispatch(getProducts(searchQuery));
            setNextTask(homeTasks.WAIT_FOR_NEW_PRODUCTS_TO_LOAD, 0);
        }
    }, [dispatch, searchQuery, setNextTask, task]);

    useEffect(() => {
        if (task === homeTasks.WAIT_FOR_DISCOUNT_PRODUCTS_TO_LOAD && success) {
            if (products) {
                setDiscountProducts(products.slice());
                dispatch(setNewSortRule(SortRule.DATE));
                dispatch(setNewSortOrder(SortOrder.DESC));
                setNextTask(homeTasks.DO_REQUEST_FOR_NEW_PRODUCTS, 0);
            }
        }
    }, [products, success, setNextTask, task, dispatch, searchQuery]);

    useEffect(() => {
        if (task === homeTasks.DO_REQUEST_FOR_DISCOUNT_PRODUCTS) {
            dispatch(getProducts(searchQuery));
            setNextTask(homeTasks.WAIT_FOR_DISCOUNT_PRODUCTS_TO_LOAD, 0);
        }
    }, [dispatch, searchQuery, setNextTask, task]);

    useEffect(() => {
        dispatch(restoreDefaultSearchReducer());
        dispatch(setNewPagination({ page: 0, size: 6 }));
        dispatch(setNewSortRule(SortRule.DISCOUNT));
        dispatch(setNewSortOrder(SortOrder.DESC));
        setNextTask(homeTasks.DO_REQUEST_FOR_DISCOUNT_PRODUCTS, 0);
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const handleBuy = (productId: string, productName: string, productCount: number) => {
        handleAddToCart(productId, productName, productCount);
        history.push('/cart');
    };

    const handleAddToCart = (productId: string, productName: string, productCount: number) => {
        const indexOfItemFromCart = cart.map((cartItem: CartProduct) => cartItem.productId).indexOf(productId);
        if (indexOfItemFromCart >= 0) {
            dispatch(
                updateItemInCart(
                    { productId: productId, productCount: cart[indexOfItemFromCart].productCount + productCount },
                    token ? token : ''
                )
            );
        } else {
            dispatch(updateItemInCart({ productId: productId, productCount: productCount }, token ? token : ''));
        }
        dispatch(getCart(token ? token : ''));
        setSuccessMessage(
            `Added ${productCount} ${productCount === 1 ? 'copy' : 'copies'} of ${productName} to your cart`
        );
    };

    const handleCategoryClick = (categoryName: string) => {
        dispatch(restoreDefaultSearchReducer())
        dispatch(setNewCategoriesNames(Array.from([categoryName])));
        setNextTask(homeTasks.GO_TO_CATEGORY, 0);
    }

    const renderBestDiscount = () => {
        return (
            <>
                <HomeCompilation
                    compilationName='Best discount'
                    products={discountProducts}
                    isDisplayButtons={roles.includes(UserRole.CUSTOMER)}
                    onAddToCart={handleAddToCart}
                    onBuy={handleBuy}
                    onClick={goToProduct}
                />
            </>
        );
    };

    const renderNewest = () => {
        return (
            <>
                <HomeCompilation
                    compilationName='New in the store'
                    products={newProducts}
                    isDisplayButtons={roles.includes(UserRole.CUSTOMER)}
                    onAddToCart={handleAddToCart}
                    onBuy={handleBuy}
                    onClick={goToProduct}
                />
            </>
        );
    };

    const renderFree = () => {
        return (
            <>
                <HomeCompilation
                    compilationName='Free'
                    products={freeProducts}
                    isDisplayButtons={roles.includes(UserRole.CUSTOMER)}
                    onAddToCart={handleAddToCart}
                    onBuy={handleBuy}
                    onClick={goToProduct}
                />
            </>
        );
    };

    const renderCompilation = () => {
        return (
            <>
                <HomeCompilation
                    compilationName='For you'
                    products={forYouProducts}
                    isDisplayButtons={roles.includes(UserRole.CUSTOMER)}
                    onAddToCart={handleAddToCart}
                    onBuy={handleBuy}
                    onClick={goToProduct}
                />
            </>
        );
    };

    return (
        <Box
            sx={{
                paddingTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <CardMedia component='img' height='300' image='Home-Banner.jpg' alt={`NCStore`} />
            <Stack spacing={10} sx={{ marginTop: 15, maxWidth:'90%' }}>
                <HomeCategoryPick categories={categories} onClick={handleCategoryClick}/>
                {!discountProducts.length ? null : renderBestDiscount()}
                {!newProducts.length ? null : renderNewest()}
                {!freeProducts.length ? null : renderFree()}
                {!forYouProducts.length ? null : renderCompilation()}
            </Stack>
        </Box>
    );
};

export default Home;
