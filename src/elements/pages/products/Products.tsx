import React, {useEffect, useState} from 'react';
import {History} from 'history';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {useSnackbar} from 'notistack';

import {Box, Container, Grid, Typography,Button} from '@mui/material';

import {AppState} from '../../../reducers/rootReducer';
import {ProductFromList} from '../../../types/ProductsList';
import ProductCard from '../../components/product_card/ProductCard';
import { UserRole } from '../../../types/UserRole';
import { CartProduct } from '../../../types/CartProduct';
import { getCart } from '../../../actions/cart/GetCart';
import { getProductsFromSearch } from '../../../actions/products/GetProducts';
import { initDefaultSearchReducer } from '../../../actions/search/InitDefaultSearchReducer';
import {updateItemInCart} from '../../../actions/cart/UpdateItemInCart';
import AdvancedSearch from "../../components/advanced_search/AdvancedSearch";
import ProductsSort from '../../components/products_sort/ProductsSort';
import { setNewPagination } from '../../../actions/search/SetNewPagination';

import './style.css';
import {setNewCategoriesNames} from "../../../actions/search/SetNewCategoryNames";

import './style.css';

type productsProps = {
    history: History;
};

const Products: React.FC<productsProps> = ({history}) => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const location = useLocation();

    const { searchQuery, searchUrl, initialized } = useSelector((state: AppState) => state.searchReducer);
    const { cart, success: successCart } = useSelector((state: AppState) => state.cartReducer);
    const { products, loading, errorMessage } = useSelector((state: AppState) => state.productsReducer);
    const { categories } = useSelector((state: AppState) => state.categoryReducer);
    const { roles, token } = useSelector((state: AppState) => state.userReducer);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!initialized) {
            dispatch(initDefaultSearchReducer(location.search));
        }
        // DO NOT REMOVE, Constructor calls only once
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // /products/[?...] - retrieves search query
        dispatch(getProductsFromSearch(location.search));
    }, [dispatch, location.search]);

    useEffect(() => {
        if (initialized) {
            history.push(searchUrl);
        }
    }, [history, initialized, searchUrl]);

    useEffect(() => {
        if (successMessage && successCart) {
            enqueueSnackbar(successMessage, {
                variant: 'success',
            });
            setSuccessMessage(null);
        }
    }, [enqueueSnackbar, successCart, successMessage]);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
    }, [enqueueSnackbar, errorMessage]);

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const buyProduct = (productId: string, productCount: number) => {
        addProductToCart(productId, productCount);
        history.push('/cart');
    };

    const addProductToCart = (productId: string, productCount: number) => {
        const indexOfItemFromCart = cart.map((cartItem: CartProduct) => cartItem.productId).indexOf(productId);
        if (indexOfItemFromCart >= 0) {
            dispatch(
                updateItemInCart(
                    {productId: productId, productCount: cart[indexOfItemFromCart].productCount + productCount},
                    token ? token : ''
                )
            );
        } else {
            dispatch(updateItemInCart({productId: productId, productCount: productCount}, token ? token : ''));
        }
        dispatch(getCart(token ? token : ''));
    };

    const onGoBack = () => {
        dispatch(setNewPagination({ page: searchQuery.pagination.page - 1, size: searchQuery.pagination.size }));
    };

    const onGoForward = () => {
        dispatch(setNewPagination({ page: searchQuery.pagination.page + 1, size: searchQuery.pagination.size }));
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
                    onBuy={(clicks: number) => buyProduct(product.productId, clicks)}
                    onAddToCart={(clicks: number) => {
                        addProductToCart(product.productId, clicks);
                        setSuccessMessage(
                            `Added ${clicks} ${clicks === 1 ? 'copy' : 'copies'} of ${product.productName} to your cart`
                        );
                    }}
                />
            ))}
        </div>
    );

    const renderSortButtons = (isHidden: boolean) => (
        <div className='products__sort-selectors' style={{visibility: isHidden ? 'hidden' : 'visible'}}>
            <ProductsSort
                defaultSortRule={searchQuery.sortRule}
                defaultSortOrder={searchQuery.sortOrder}
                disabled={loading || products.length <= 1}
            />
        </div>
    );

    const handleAdvancedSearchApply = (e: any) => {
        const {categoriesNames} = e;
        if (categoriesNames) {
            dispatch(setNewCategoriesNames(categoriesNames))
        }
    }

    const renderProductsPage = () => (
        <Container className='products-content__products'>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <AdvancedSearch categories={categories} onFinish={handleAdvancedSearchApply} onFinishFailed={() => {
                    }} loading={loading} selectedCategories={searchQuery.categoryNames}/>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{
                        paddingTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <div className='products__products-header'>
                            {renderSortButtons(true)}
                            <Typography className='products-header__label' variant='h5'>
                                Here is what we found
                            </Typography>
                            {renderSortButtons(false)}
                        </div>
                        {renderProductsContent()}
                        <div className='products-and-controls__control-buttons'>
                            <Button variant='outlined' onClick={onGoBack} disabled={!searchQuery.pagination.page || loading}>
                                {'<'}
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={onGoForward}
                                disabled={searchQuery.pagination.size > products.length || loading}
                            >
                                {'>'}
                            </Button>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );

    const renderProductsNotFound = () => (
        <Box sx={{
            paddingTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <img src='./not-found.jpg' alt='Not found' />
            <Typography className='products-not-found__label' variant='h4' display='inline-block'>
                Oops, we cant find anything...
            </Typography>
        </Box>
    );

    const renderProductsContent = () => {
        if (products ? products.length : false) {
            return renderProductsList();
        } else {
            return renderProductsNotFound();
        }
    };

    return (
        <>
            <main className='products-content'>{renderProductsPage()}</main>
        </>
    );
};

export default Products;
