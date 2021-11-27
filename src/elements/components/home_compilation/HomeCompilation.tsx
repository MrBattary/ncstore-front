import React from 'react';

import Typography from '@mui/material/Typography';

import {ProductFromList} from "../../../types/ProductsList";
import {Stack} from "@mui/material";
import ProductCard from "../product_card/ProductCard";
import {useSelector} from "react-redux";
import {AppState} from "../../../reducers/rootReducer";

type homeCompilationProps = {
    compilationName: string;
};

const HomeCompilation: React.FC<homeCompilationProps> = ({compilationName}) => {

    const {products} = useSelector((state: AppState) => state.productsReducer);

    const renderCompilation = () => {
        if (products ? products.length : false) {
            return renderCompilationOk();
        } else {
            return renderCompilationEmpty();
        }
    };

    const renderCompilationOk = () => (
        <Stack direction="row" spacing={2}>
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
        </Stack>
    );

    const renderCompilationEmpty = () => (
        <Typography className='products-not-found__label' variant='h4' display='inline-block'>
            Oops, we cant find anything...
        </Typography>
    );


    return (
        <>
            <Typography variant="h3">
                {compilationName}
            </Typography>
            {renderCompilation()}
        </>
    );
};

export default HomeCompilation;
