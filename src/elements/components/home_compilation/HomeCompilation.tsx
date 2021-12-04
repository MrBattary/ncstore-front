import React from 'react';

import Typography from '@mui/material/Typography';

import {ProductFromList, ProductsList} from "../../../types/ProductsList";
import {Paper, Stack} from "@mui/material";
import ProductCard from "../product_card/ProductCard";

type homeCompilationProps = {
    compilationName: string;
    products: ProductsList | null;
};

const HomeCompilation: React.FC<homeCompilationProps> = ({compilationName, products}) => {

    const renderCompilationOk = () => {
        if (products) {
            return (<Stack direction="row" spacing={2}>
                {products.map((product: ProductFromList) => (
                    <ProductCard
                        key={product.productId}
                        productName={product.productName}
                        normalPrice={product.normalPrice}
                        discountPrice={product.discountPrice}
                        priceCurrency={product.priceCurrency}
                        onClick={() => {
                        }}
                        onBuy={() => {
                        }}
                        onAddToCart={() => {
                        }}
                        /*                        onClick={() => goToProduct(product.productId)}
                                                onBuy={() => buyProduct(product.productId)}
                                                onAddToCart={() => addProductToCart(product.productId)}*/
                    />
                ))}
            </Stack>);
        } else {
            return (<></>);
        }
    };

    const renderCompilationEmpty = () => (
        <Typography className='products-not-found__label' variant='h4' display='inline-block'>
            Oops, we cant find anything...
        </Typography>
    );

    const renderCompilation = () => {
        if (products ? products.length : false) {
            return renderCompilationOk();
        } else {
            return renderCompilationEmpty();
        }
    };


    return (
        <Paper elevation={5} sx={{padding: 3}}>
            <Typography variant="h3">
                {compilationName}
            </Typography>
            {renderCompilation()}
        </Paper>
    );
};

export default HomeCompilation;
