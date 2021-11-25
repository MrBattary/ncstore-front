import { History } from 'history';
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../reducers/rootReducer';
import { getProduct } from '../../../actions/products/GetProduct';
import { restoreDefaultProductsReducer } from '../../../actions/products/RestoreDefaultProductsReducer';
import { Box, ButtonGroup, Container, Paper, Typography } from '@mui/material';

import './style.css';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

type productProps = {
    history: History;
};

const Product: React.FC<productProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { detailedProduct, loading, errorMessage } = useSelector((state: AppState) => state.productsReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    useEffect(() => {
        // /products/[fcfc45e7-47a2-45d5-86b7-cfcdf24a8016] - retrieves uuid
        dispatch(restoreDefaultProductsReducer());
        dispatch(getProduct(window.location.pathname.substr(10)));
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
        console.log(`Buy product`);
    };

    const handleAddToCart = () => {
        console.log(`Product add to cart`);
    };

    const renderProductPrice = () => {
        if (!detailedProduct?.discountPrices.length) {
            return (
                <Stack direction='row'>
                    <Typography variant='h4' color='text.secondary'>
                        {detailedProduct?.normalPrices[0].price.toString()}
                    </Typography>
                </Stack>
            );
        } else {
            return (
                <Stack spacing={1} direction='row'>
                    <Typography variant='h4' color='text.secondary'>
                        {detailedProduct?.discountPrices[0].price.toString()}
                    </Typography>
                    <Typography
                        sx={{ textDecoration: 'line-through', opacity: 0.5 }}
                        variant='h4'
                        color='text.secondary'
                    >
                        {detailedProduct?.normalPrices[0].price.toString()}
                    </Typography>
                </Stack>
            );
        }
    };

    const renderCategoriesButtons = () =>
        detailedProduct?.categoriesNames.map((categoryName: string) => (
            <Button onClick={() => goToCategory(categoryName)}>{categoryName}</Button>
        ));

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
                                alt={`product ${detailedProduct?.productName}`}
                            />
                            <div className='product-header__fields'>
                                <div className='fields__name-company'>
                                    <Typography variant='h3' style={{ marginTop: 1 }}>
                                        {detailedProduct?.productName}
                                    </Typography>
                                    <Link
                                        variant='h4'
                                        underline='none'
                                        style={{ marginBottom: 2 }}
                                        onClick={() => goToSupplierPage(detailedProduct?.supplierId)}
                                    >
                                        {detailedProduct?.supplierName}
                                    </Link>
                                </div>
                                {renderProductPrice()}
                                <div className='fields__buttons'>
                                    <Button variant='contained' style={{ margin: 3 }} onClick={handleBuy}>
                                        Buy now
                                    </Button>
                                    <Button variant='outlined' style={{ margin: 3 }} onClick={handleAddToCart}>
                                        Add to cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='content__product-details'>
                            <div className='product-details__description'>
                                <Typography variant='h6' style={{ marginBottom: 1 }}>
                                    Product description:
                                </Typography>
                                <Typography variant={'body2'} style={{ marginBottom: 1 }}>
                                    {detailedProduct?.productDescription}
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
        if (detailedProduct) {
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
