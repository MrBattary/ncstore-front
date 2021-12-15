import React, { useEffect, useMemo, useState } from 'react';
import { History } from 'history';

import CardMedia from '@mui/material/CardMedia';
import {Box, Stack} from '@mui/material';

import HomeCompilation from '../../components/home_compilation/HomeCompilation';
import { getProducts } from '../../../actions/products/GetProducts';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../../../types/Pagination';
import { SortOrder, SortRule } from '../../../types/SortEnum';
import { ProductFromList, ProductsList } from '../../../types/ProductsList';
import { AppState } from '../../../reducers/rootReducer';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import { UserRole } from '../../../types/UserRole';

import './style.css';
import {getCategories} from "../../../actions/category/GetCategories";
import HomeCategoryPick from "../../components/home_compilation/HomeCategoryPick";

type homeProps = {
    history: History;
};

const enum homeTasks {
    WAIT_FOR_DISCOUNT_PRODUCTS_TO_LOAD = 'WAIT_FOR_DISCOUNT_PRODUCT_TO_LOAD',
    WAIT_FOR_NEW_PRODUCTS_TO_LOAD = 'WAIT_FOR_NEW_PRODUCT_TO_LOAD',
    WAIT_FOR_FREE_PRODUCTS_TO_LOAD = 'WAIT_FOR_FREE_PRODUCT_TO_LOAD',
    WAIT_FOR_YOU_PRODUCTS_TO_LOAD = 'WAIT_FOR_YOU_PRODUCT_TO_LOAD',
}

const Home: React.FC<homeProps> = ({ history }) => {
    const dispatch = useDispatch();
    const [task, setNextTask] = useTask();

    const { roles, token } = useSelector((state: AppState) => state.userReducer);
    const { products, success } = useSelector((state: AppState) => state.productsReducer);
    const { categories } = useSelector((state: AppState) => state.categoryReducer);

    const [discountProducts, setDiscountProducts] = useState<ProductsList>([]);
    const [newProducts, setNewProducts] = useState<ProductsList>([]);
    const [freeProducts, setFreeProducts] = useState<ProductsList>([]);
    const [forYouProducts, setForYouProducts] = useState<ProductsList>([]);

    const defaultPagination: Pagination = useMemo(
        () => ({
            page: 0,
            size: 6,
        }),
        []
    );

    useEffect(() => {
        if (task === homeTasks.WAIT_FOR_YOU_PRODUCTS_TO_LOAD && success) {
            if (products) {
                setForYouProducts(products.slice());
                setNextTask(DEFAULT_TASK_ABSENT, 0);
            }
        }
    }, [products, success, setNextTask, task, defaultPagination, dispatch]);

    useEffect(() => {
        if (task === homeTasks.WAIT_FOR_FREE_PRODUCTS_TO_LOAD && success) {
            if (products) {
                setFreeProducts(
                    products
                        .filter((product: ProductFromList) => product.normalPrice === 0 || product.discountPrice === 0)
                        .slice()
                );
                dispatch(getProducts(defaultPagination, '', null, SortRule.DEFAULT, SortOrder.RAND));
                setNextTask(homeTasks.WAIT_FOR_YOU_PRODUCTS_TO_LOAD, 0);
            }
        }
    }, [products, success, setNextTask, task, defaultPagination, dispatch]);

    useEffect(() => {
        if (task === homeTasks.WAIT_FOR_NEW_PRODUCTS_TO_LOAD && success) {
            if (products) {
                setNewProducts(products.slice());
                dispatch(getProducts(defaultPagination, '', null, SortRule.PRICE, SortOrder.ASC));
                setNextTask(homeTasks.WAIT_FOR_FREE_PRODUCTS_TO_LOAD, 0);
            }
        }
    }, [products, success, setNextTask, task, defaultPagination, dispatch]);

    useEffect(() => {
        if (task === homeTasks.WAIT_FOR_DISCOUNT_PRODUCTS_TO_LOAD && success) {
            if (products) {
                setDiscountProducts(products.slice());
                dispatch(getProducts(defaultPagination, '', null, SortRule.DATE, SortOrder.ASC));
                setNextTask(homeTasks.WAIT_FOR_NEW_PRODUCTS_TO_LOAD, 0);
            }
        }
    }, [products, success, setNextTask, task, defaultPagination, dispatch]);

    useEffect(() => {
        dispatch(getProducts(defaultPagination, '', null, SortRule.DISCOUNT, SortOrder.DESC));
        dispatch(getCategories());
        setNextTask(homeTasks.WAIT_FOR_DISCOUNT_PRODUCTS_TO_LOAD, 0);
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const handleBuy = (productId: string) => {
        handleAddToCart(productId);
        history.push('/cart');
    };

    const handleAddToCart = (productId: string) => {
        dispatch(
            updateItemInCart(
                {
                    productId: productId,
                    productCount: 1,
                },
                token ? token : ''
            )
        );
    };

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

    const handleCategoryClick = (categoryName: string) => {
        console.log(categoryName)
        //TODO
    }

    return (
        <Box
            sx={{
                marginTop: 15,
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
