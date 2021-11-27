import React from 'react';

import {Stack, Typography} from '@mui/material';
import './style.css';
import HomeCompilation from "../../components/home_compilation/HomeCompilation";
import {getProducts} from "../../../actions/products/GetProducts";
import {useDispatch} from "react-redux";
import {Pagination} from '../../../types/Pagination';

type homeProps = {};

const Home: React.FC<homeProps> = () => {
    const dispatch = useDispatch();

    const defaultPagination: Pagination = {
        page: 0,
        size: 6,
    };

    const renderBestDiscount = () => {
        dispatch(getProducts(defaultPagination, "", null));
        return (
            <>
                <HomeCompilation compilationName="Best discount"/>
            </>
        );
    };

    const renderNewest = () => (
        <Typography variant='h3'>New in the store</Typography>
    );

    const renderFree = () => (
        <Typography variant='h3'>Free</Typography>
    );

    const renderCompilation = () => (
        <Typography variant='h3'>For you</Typography>
    );

    return (
        <>
            <div className='home'>
                <Stack spacing={10}>
                    {renderBestDiscount()}
                    {renderNewest()}
                    {renderFree()}
                    {renderCompilation()}
                </Stack>
            </div>
        </>
    );
};

export default Home;
