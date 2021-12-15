import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';

import { AppState } from '../../../reducers/rootReducer';
import { ProductFromList } from '../../../types/ProductsList';
import ProductCard from '../../components/product_card/ProductCard';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import { UserRole } from '../../../types/UserRole';
import { CartProduct } from '../../../types/CartProduct';
import { getCart } from '../../../actions/cart/GetCart';
import { getProductsFromSearch } from '../../../actions/products/GetProducts';
import { restoreDefaultSearchReducer } from '../../../actions/search/RestoreDefaultSearchReducer';
import { initDefaultSearchReducer } from '../../../actions/search/InitDefaultSearchReducer';

import './style.css';
import ProductsSort from '../../components/products_sort/ProductsSort';

type productsProps = {
    history: History;
};

const Products: React.FC<productsProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { searchQuery, searchUrl, initialized } = useSelector((state: AppState) => state.searchReducer);
    const { cart, success: successCart } = useSelector((state: AppState) => state.cartReducer);
    const { products, errorMessage } = useSelector((state: AppState) => state.productsReducer);

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

    useEffect(
        () => () => {
            dispatch(restoreDefaultSearchReducer());
        },
        // DO NOT REMOVE, Destructor calls only once
        // eslint-disable-next-line
        []
    );

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
                    { productId: productId, productCount: cart[indexOfItemFromCart].productCount + productCount },
                    token ? token : ''
                )
            );
        } else {
            dispatch(updateItemInCart({ productId: productId, productCount: productCount }, token ? token : ''));
        }
        dispatch(getCart(token ? token : ''));
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
        <div className='products__sort-selectors' style={{ visibility: isHidden ? 'hidden' : 'visible' }}>
            <ProductsSort
                defaultSortRule={searchQuery.sortRule}
                defaultSortOrder={searchQuery.sortOrder}
                disabled={false}
            />
        </div>
    );

    const renderProductsPage = () => (
        <div className='products-content__products'>
            <div className='products__products-header'>
                {renderSortButtons(true)}
                <Typography className='products-header__label' variant='h5'>
                    Here is what we found
                </Typography>
                {renderSortButtons(false)}
            </div>
            {renderProductsList()}
        </div>
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

    return (
        <>
            <main className='products-content'>{renderProductsContent()}</main>
        </>
    );
};

export default Products;
