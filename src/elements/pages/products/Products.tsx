import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import { AppState } from '../../../reducers/rootReducer';
import { ProductFromList } from '../../../types/ProductsList';
import ProductCard from '../../components/product_card/ProductCard';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import { UserRole } from '../../../types/UserRole';
import { CartProduct } from '../../../types/CartProduct';
import { getCart } from '../../../actions/cart/GetCart';
import { getProductsFromSearch } from '../../../actions/products/GetProducts';

import './style.css';
import { SortOrder, SortRule } from '../../../types/SortEnum';
import { Sort } from '@mui/icons-material';
import { restoreDefaultSearchReducer } from '../../../actions/search/RestoreDefaultSearchReducer';
import { setNewSortRule } from '../../../actions/search/SetNewSortRule';
import { setNewSortOrder } from '../../../actions/search/SetNewSortOrder';

type productsProps = {
    history: History;
};

const Products: React.FC<productsProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { searchUrl } = useSelector((state: AppState) => state.searchReducer);
    const { cart, success: successCart } = useSelector((state: AppState) => state.cartReducer);
    const { products, loading, errorMessage } = useSelector((state: AppState) => state.productsReducer);

    const { roles, token } = useSelector((state: AppState) => state.userReducer);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [sortRule, setSortRule] = useState<SortRule>(SortRule.DEFAULT);
    const [sortOrder, setSortOrder] = useState<SortOrder.ASC | SortOrder.DESC>(SortOrder.ASC);
    const [sortOrderButtonStyle, setSortOrderButtonStyle] = useState({ transform: 'scale(1)', color: 'primary' });

    useEffect(() => {
        // /products/[?...] - retrieves search query
        dispatch(getProductsFromSearch(location.search));
    }, [dispatch, location.search]);

    useEffect(() => {
        history.push(searchUrl);
    }, [history, searchUrl]);

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

    const handleChangeSortRule = (e: SelectChangeEvent) => {
        setSortRule(SortRule[e.target.value as SortRule]);
        dispatch(setNewSortRule(SortRule[e.target.value as SortRule]));
    };

    const handleChangeSortOrder = () => {
        if (sortOrder === SortOrder.ASC) {
            setSortOrder(SortOrder.DESC);
            dispatch(setNewSortOrder(SortOrder.DESC));
            setSortOrderButtonStyle({ transform: 'scale(1, -1)', color: 'secondary' });
        } else {
            setSortOrder(SortOrder.ASC);
            dispatch(setNewSortOrder(SortOrder.ASC));
            setSortOrderButtonStyle({ transform: 'scale(1)', color: 'primary' });
        }
    };

    const renderSortButtons = () => (
        <div className='products__sort-selectors'>
            <FormControl fullWidth>
                <InputLabel id='sort-selectors__label'>Sort</InputLabel>
                <Select
                    labelId='sort-selectors__select-label'
                    id='sort-selectors__select-label'
                    value={sortRule}
                    label='Age'
                    onChange={handleChangeSortRule}
                >
                    <MenuItem value={SortRule.DEFAULT}>None</MenuItem>
                    <MenuItem value={SortRule.RATING}>Rating</MenuItem>
                    <MenuItem value={SortRule.POPULAR}>Popularity</MenuItem>
                    <MenuItem value={SortRule.DATE}>Date</MenuItem>
                    <MenuItem value={SortRule.PRICE}>Price</MenuItem>
                    <MenuItem value={SortRule.DISCOUNT}>Discount</MenuItem>
                </Select>
            </FormControl>
            <IconButton onClick={handleChangeSortOrder} color={sortOrderButtonStyle.color as 'primary' | 'secondary'}>
                <Sort style={{ transform: sortOrderButtonStyle.transform }} />
            </IconButton>
        </div>
    );

    const renderProductsPage = () => (
        <div className='products-content__products'>
            <Typography className='products__label' variant='h5'>
                Here is what we found
            </Typography>
            {renderSortButtons()}
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

    return loading ? null : (
        <>
            <main className='products-content'>{renderProductsContent()}</main>
        </>
    );
};

export default Products;
