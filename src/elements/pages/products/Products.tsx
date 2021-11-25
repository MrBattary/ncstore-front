import React, { useEffect } from 'react';
import { History } from 'history';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { AppState } from '../../../reducers/rootReducer';
import { ProductFromList } from '../../../types/ProductsList';
import ProductCard from '../../components/product_card/ProductCard';

import './style.css';

type productsProps = {
    history: History;
};

const Products: React.FC<productsProps> = ({ history }) => {
    // const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { products, loading, errorMessage } = useSelector((state: AppState) => state.productsReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const buyProduct = (productId: string) => {
        // TODO: dispatch
        console.log(`Buy product ${productId} right now`);
    };

    const addProductToCart = (productId: string) => {
        // TODO: dispatch
        console.log(`Add product ${productId} to the console`);
    };

    const renderProductsList = () => (
        <div className='products__products-list'>
            {products.map((product: ProductFromList) => (
                <ProductCard
                    key={product.productId}
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

    const renderProductsPage = () => (
        <div className='products-content__products'>
            <Typography className='products__label' variant='h5'>
                Here is what we found
            </Typography>
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
