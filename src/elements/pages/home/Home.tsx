import React, {useEffect, useMemo, useState} from 'react';

import {Box, Stack} from '@mui/material';
import './style.css';
import HomeCompilation from "../../components/home_compilation/HomeCompilation";
import {getProducts} from "../../../actions/products/GetProducts";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from '../../../types/Pagination';
import {SortOrder, SortRule} from "../../../types/SortEnum";
import useTask, {DEFAULT_TASK_ABSENT} from "../../../utils/TaskHook";
import {ProductFromList, ProductsList} from "../../../types/ProductsList";
import {AppState} from "../../../reducers/rootReducer";
import CardMedia from "@mui/material/CardMedia";


type homeProps = {};

const enum homeTasks {
    WAIT_FOR_DISCOUNT_PRODUCTS_TO_LOAD = 'WAIT_FOR_DISCOUNT_PRODUCT_TO_LOAD',
    WAIT_FOR_NEW_PRODUCTS_TO_LOAD = 'WAIT_FOR_NEW_PRODUCT_TO_LOAD',
    WAIT_FOR_FREE_PRODUCTS_TO_LOAD = 'WAIT_FOR_FREE_PRODUCT_TO_LOAD',
    WAIT_FOR_YOU_PRODUCTS_TO_LOAD = 'WAIT_FOR_YOU_PRODUCT_TO_LOAD',
}

const Home: React.FC<homeProps> = () => {
    const dispatch = useDispatch();
    const [task, setNextTask] = useTask();

    const {products, success} = useSelector(
        (state: AppState) => state.productsReducer
    );

    const [discountProducts, setDiscountProducts] = useState<ProductsList | null>(null);
    const [newProducts, setNewProducts] = useState<ProductsList | null>(null);
    const [freeProducts, setFreeProducts] = useState<ProductsList | null>(null);
    const [forYouProducts, setForYouProducts] = useState<ProductsList | null>(null);

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
                setFreeProducts(products.filter((product: ProductFromList) => (product.normalPrice===0 || product.discountPrice===0)).slice());
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
        setNextTask(homeTasks.WAIT_FOR_DISCOUNT_PRODUCTS_TO_LOAD, 0);
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const renderBestDiscount = () => {
        return (
            <>
                <HomeCompilation compilationName="Best discount" products={discountProducts}/>
            </>
        );
    };

    const renderNewest = () => {
        return (
            <>
                <HomeCompilation compilationName="New in the store" products={newProducts}/>
            </>
        );
    };

    const renderFree = () => {
        return (
            <>
                <HomeCompilation compilationName="Free" products={freeProducts}/>
            </>
        );
    };

    const renderCompilation = () => {
        return (
            <>
                <HomeCompilation compilationName="For you" products={forYouProducts}/>
            </>
        );
    };

    return (
        <Box sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <CardMedia
                component='img'
                height='300'
                image='Home-Banner.jpg'
                alt={`NCStore`}
            />
            <Stack spacing={10} sx={{marginTop: 15}}>
                {!discountProducts ? null : renderBestDiscount()}
                {!newProducts ? null : renderNewest()}
                {!freeProducts ? null : renderFree()}
                {!forYouProducts ? null : renderCompilation()}
            </Stack>
        </Box>
    );
};

export default Home;
