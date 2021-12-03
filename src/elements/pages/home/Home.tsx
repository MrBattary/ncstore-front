import React from 'react';

import {Box, Stack, Typography} from '@mui/material';
import './style.css';
import HomeCompilation from "../../components/home_compilation/HomeCompilation";
import {getProducts} from "../../../actions/products/GetProducts";
import {useDispatch} from "react-redux";
import {Pagination} from '../../../types/Pagination';
import {SortOrder, SortRule} from "../../../types/SortEnum";


type homeProps = {};

/*const enum homeTasks {
    WAIT_FOR_PRODUCTS_TO_LOAD = 'WAIT_FOR_PRODUCT_TO_LOAD',
}*/

const Home: React.FC<homeProps> = () => {
    const dispatch = useDispatch();
    //const [task, setNextTask] = useTask();

    const defaultPagination: Pagination = {
        page: 0,
        size: 6,
    };

    const renderBestDiscount = () => {
        dispatch(getProducts(defaultPagination, "", null, SortRule.DISCOUNT, SortOrder.DESC));
        return (
            <>
                <HomeCompilation compilationName="Best discount"/>
            </>
        );
    };

    const renderNewest = () => {
        dispatch(getProducts(defaultPagination, "", null, SortRule.DATE, SortOrder.ASC));
        return (
            <>
                <HomeCompilation compilationName="New in the store"/>
            </>
        );
    };

    const renderFree = () => {
        dispatch(getProducts(defaultPagination, "", null, SortRule.DISCOUNT, SortOrder.DESC));
        return (
            <>
                <HomeCompilation compilationName="Free"/>
            </>
        );
    };

    const renderCompilation = () => {
        dispatch(getProducts(defaultPagination, "", null, SortRule.DISCOUNT, SortOrder.DESC));
        return (
            <>
                <HomeCompilation compilationName="For you"/>
            </>
        );
    };

    return (
        <Box sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant='h1'>NCStore</Typography>
            <Stack spacing={10} sx={{marginTop: 10}}>
                {renderBestDiscount()}
                {renderNewest()}
                {renderFree()}
                {renderCompilation()}
            </Stack>
        </Box>
    );
};

export default Home;
