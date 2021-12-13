import React, { useEffect } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import {Box, Container, Grid, Typography} from '@mui/material';

import { AppState } from '../../../reducers/rootReducer';
import { ProductFromList } from '../../../types/ProductsList';
import ProductCard from '../../components/product_card/ProductCard';

import './style.css';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import { UserRole } from '../../../types/UserRole';
import AdvancedSearch from "../../components/advanced_search/AdvancedSearch";
import {getProducts} from "../../../actions/products/GetProducts";
import {defaultPagination} from "../../../types/Pagination";
import {SortOrder, SortRule} from "../../../types/SortEnum";

type productsProps = {
    history: History;
};

const Products: React.FC<productsProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { products, loading, errorMessage } = useSelector((state: AppState) => state.productsReducer);
    const { roles, token } = useSelector((state: AppState) => state.userReducer);
    const { categories } = useSelector((state:AppState) => state.categoryReducer)

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const buyProduct = (productId: string) => {
        // TODO: Lock from adding more
        dispatch(updateItemInCart({ productId: productId, productCount: 1 }, token ? token : ''));
        history.push('/cart');
    };

    const addProductToCart = (productId: string) => {
        // TODO: Lock from adding more
        dispatch(updateItemInCart({ productId: productId, productCount: 1 }, token ? token : ''));
    };

    const renderProductsList = () => (
        <div className='products__products-list'>
            {products.map((product: ProductFromList) => (
                <ProductCard
                    key={product.productId}
                    isDisplayButtons={roles.includes(UserRole.CUSTOMER)}
                    productName={product.productName}
                    normalPrice={product.normalPrice}
                    discountPrice={product.discountPrice}
                    priceCurrency={product.priceCurrency}
                    onClick={() => goToProduct(product.productId)}
                    onBuy={() => buyProduct(product.productId)}
                    onAddToCart={() => addProductToCart(product.productId)}
                />
            ))}
        </div>
    );

    const handleAdvancedSearchApply = (e:any) => {
        //const { categoriesNames } = e;
        dispatch(getProducts(
            defaultPagination,
            "",
            null,
            SortRule.PRICE,
            SortOrder.ASC
        ))
    }

    const renderProductsPage = () => (
        <Container className='products-content__products'>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <AdvancedSearch categories={categories} onFinish={handleAdvancedSearchApply} onFinishFailed={()=>{}} loading={loading}/>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{
                        paddingTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography className='products__label' variant='h5'>
                            Here is what we found
                        </Typography>
                        {renderProductsList()}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );

    const renderProductsNotFound = () => (
        <div className='products-content__products-not-found'>
            {/* TODO: Add some picture here */}
            <Typography className='products-not-found__label' variant='h4' display='inline-block'>
                Oops, we cant find anything...
            </Typography>
        </div>
    );

    const renderProductsContent = () => {
        if (products ? products.length : false) {
            return renderProductsPage();
        } else {
            return renderProductsNotFound();
        }
    };

    return loading ? null : (
        <>
            <main className='products-content'>{renderProductsContent()}</main>
        </>
    );
};

export default Products;
