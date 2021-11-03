import React, { useEffect } from 'react';
import { History } from 'history';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { AppState } from '../../../reducers/rootReducer';
import { ProductFromList } from '../../../types/ProductsList';
import ProductButton from '../../components/product_button/ProductButton';

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
        // TODO: dispatch getProductById and history push to that product
        console.log(`Go to the product with id ${productId}`);
    };

    const renderProductsNotFoundMessage = () => (
        <div className='products-content__not-found'>
            {/* TODO: Add some picture here */}
            <Typography className='not-found__label' variant='h5'>
                Oops, we cant find anything...
            </Typography>
        </div>
    );

    const renderProductsList = () => {
        debugger;
        if (products ? products.length : false) {
            return products.map((product: ProductFromList) => (
                <ProductButton
                    key={product.productId}
                    productName={product.productName}
                    productPrice={product.productPrice}
                    priceCurrency={product.productCurrency}
                    onClick={() => goToProduct(product.productId)}
                />
            ));
        } else {
            return renderProductsNotFoundMessage();
        }
    };

    return loading ? null : (
        <>
            <main className='products-content'>{renderProductsList()}</main>
        </>
    );
};

export default Products;
