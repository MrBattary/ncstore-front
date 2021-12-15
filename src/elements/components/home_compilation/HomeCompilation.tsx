import React from 'react';

import Typography from '@mui/material/Typography';
import {Box, Paper} from '@mui/material';

import {ProductFromList, ProductsList} from '../../../types/ProductsList';
import ProductCard from '../product_card/ProductCard';

type homeCompilationProps = {
    compilationName: string;
    isDisplayButtons: boolean;
    products: ProductsList | null;
    onClick: (productId: string) => void;
    onBuy: (productId: string, productName: string, productCount: number) => void;
    onAddToCart: (productId: string, productName: string, productCount: number) => void;
};

const HomeCompilation: React.FC<homeCompilationProps> = ({
                                                             compilationName,
                                                             isDisplayButtons,
                                                             products,
                                                             onClick,
                                                             onBuy,
                                                             onAddToCart,
                                                         }) => {
    const renderCompilationOk = () => {
        if (products) {
            return (
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                }}
                >
                    {products.map((product: ProductFromList) => (
                        <ProductCard
                            key={product.productId}
                            productName={product.productName}
                            normalPrice={product.normalPrice}
                            discountPrice={product.discountPrice}
                            priceCurrency={product.priceCurrency}
                            isDisplayButtons={isDisplayButtons}
                            onClick={() => onClick(product.productId)}
                            onBuy={clicks => onBuy(product.productId, product.productName, clicks)}
                            onAddToCart={clicks => onAddToCart(product.productId, product.productName, clicks)}
                        />
                    ))}
                </Box>
            );
        } else {
            return <></>;
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
        <Paper elevation={5} sx={{
            padding: 3,
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant='h3' sx={{marginBottom:1}}>{compilationName}</Typography>
            {renderCompilation()}
        </Paper>
    );
};

export default HomeCompilation;
