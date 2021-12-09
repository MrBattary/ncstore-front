import { History } from 'history';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducers/rootReducer';
import { getProductForSale } from '../../../actions/products/GetProduct';
import { restoreDefaultProductsReducer } from '../../../actions/products/RestoreDefaultProductsReducer';
import { Box, ButtonGroup, Container, Paper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import './style.css';
import { UserRole } from '../../../types/UserRole';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import useDelay from '../../../utils/DelayHook';
import { CartProduct } from '../../../types/CartProduct';
import { getCart } from '../../../actions/cart/GetCart';

type productProps = {
    history: History;
};

const Product: React.FC<productProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { cart } = useSelector((state: AppState) => state.cartReducer);
    const { productForSale, loading, errorMessage } = useSelector((state: AppState) => state.productsReducer);
    const { roles, token } = useSelector((state: AppState) => state.userReducer);

    const [setAddToCartDelayedValue] = useDelay<number>(0, value => handleAddToCart(value), 300);
    const [addToCartClicks, setAddToCartClicks] = useState<number>(0);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    useEffect(() => {
        // /products/[fcfc45e7-47a2-45d5-86b7-cfcdf24a8016] - retrieves uuid
        dispatch(restoreDefaultProductsReducer());
        dispatch(getProductForSale(window.location.pathname.substr(10)));
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const goToSupplierPage = (supplierId: string | null | undefined) => {
        console.log(`Go to supplier with id: ${supplierId}`);
    };

    const goToCategory = (categoryName: string) => {
        console.log(`Go to category with name: ${categoryName}`);
    };

    const handleBuy = () => {
        handleAddToCart(1);
        history.push('/cart');
    };

    const handleAddToCart = (productCount: number) => {
        const indexOfItemFromCart = cart
            .map((cartItem: CartProduct) => cartItem.productId)
            .indexOf(productForSale ? productForSale.productId : '');
        if (indexOfItemFromCart >= 0) {
            dispatch(
                updateItemInCart(
                    {
                        productId: productForSale ? productForSale.productId : '',
                        productCount: cart[indexOfItemFromCart].productCount + productCount,
                    },
                    token ? token : ''
                )
            );
        } else {
            dispatch(
                updateItemInCart(
                    { productId: productForSale ? productForSale.productId : '', productCount: productCount },
                    token ? token : ''
                )
            );
        }
        dispatch(getCart(token ? token : ''));
    };

    const handleAddToCartClick = () => {
        const newAddToCartClicks = addToCartClicks + 1;
        console.log(newAddToCartClicks);
        setAddToCartClicks(newAddToCartClicks);
        setAddToCartDelayedValue(newAddToCartClicks);
    };

    const renderProductPrice = () => {
        if (productForSale) {
            if (!productForSale.discountPrice) {
                return (
                    <Stack direction='row'>
                        <Typography variant='h4' color='text.secondary'>
                            {productForSale.normalPrice.toString().concat(productForSale.priceCurrency)}
                        </Typography>
                    </Stack>
                );
            } else {
                return (
                    <Stack spacing={1} direction='row'>
                        <Typography variant='h4' color='text.secondary'>
                            {productForSale.discountPrice.toString().concat(productForSale.priceCurrency)}
                        </Typography>
                        <Typography
                            sx={{ textDecoration: 'line-through', opacity: 0.5 }}
                            variant='h4'
                            color='text.secondary'
                        >
                            {productForSale.normalPrice.toString().concat(productForSale.priceCurrency)}
                        </Typography>
                        <Typography bgcolor='#8cc44b' variant='h4' color='text.primary' paddingX={0.4}>
                            {Math.round((1 - productForSale.discountPrice / productForSale.normalPrice) * -100)
                                .toString()
                                .concat('%')}
                        </Typography>
                    </Stack>
                );
            }
        }
    };

    const renderCategoriesButtons = () =>
        productForSale?.categoriesNames.map((categoryName: string) => (
            <Button key={categoryName} onClick={() => goToCategory(categoryName)}>
                {categoryName}
            </Button>
        ));

    const renderButtons = () => {
        if (roles.includes(UserRole.CUSTOMER)) {
            return (
                <div className='fields__buttons'>
                    <Button variant='contained' style={{ margin: 3 }} onClick={handleBuy}>
                        Buy now
                    </Button>
                    <Button variant='outlined' style={{ margin: 3 }} onClick={handleAddToCartClick}>
                        Add to cart
                    </Button>
                </div>
            );
        }
    };

    const renderProductData = () => {
        return (
            <Container>
                <Paper>
                    <Box
                        sx={{
                            marginTop: 8,
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div className='content__product-header'>
                            <img
                                className='product-header__image'
                                src='/default-product-image.jpg'
                                alt={`product ${productForSale?.productName}`}
                            />
                            <div className='product-header__fields'>
                                <div className='fields__name-company'>
                                    <Typography variant='h4' component='p' style={{ marginTop: 1 }}>
                                        {productForSale?.productName}
                                    </Typography>
                                    <Link
                                        variant='h5'
                                        underline='hover'
                                        component='p'
                                        style={{ marginBottom: 2 }}
                                        onClick={() => goToSupplierPage(productForSale?.supplierId)}
                                    >
                                        {productForSale?.supplierName}
                                    </Link>
                                </div>
                                {renderProductPrice()}
                                {renderButtons()}
                            </div>
                        </div>
                        <div className='content__product-details'>
                            <div className='product-details__description'>
                                <Typography variant='h6' style={{ marginBottom: 1 }}>
                                    Product description:
                                </Typography>
                                <Typography variant={'body2'} style={{ marginBottom: 1 }}>
                                    {productForSale?.productDescription}
                                </Typography>
                            </div>
                            <ButtonGroup variant='text'>{renderCategoriesButtons()}</ButtonGroup>
                        </div>
                    </Box>
                </Paper>
            </Container>
        );
    };

    const renderProductNotFound = () => {
        return (
            <div className='content__product-not-found'>
                <Typography className='product-not-found__label' variant='h4' display='inline-block'>
                    Oops, we can't find this product...
                </Typography>
            </div>
        );
    };

    const renderProductContent = () => {
        if (productForSale) {
            return renderProductData();
        } else {
            return renderProductNotFound();
        }
    };

    if (loading) {
        return null;
    }
    return (
        <div className='product'>
            <div className='product__content'>{renderProductContent()}</div>
        </div>
    );
};

export default Product;
