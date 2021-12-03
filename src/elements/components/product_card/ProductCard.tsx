import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import './style.css';

type productCardProps = {
    isDisplayButtons: boolean;
    productName: string;
    normalPrice: number;
    discountPrice: number | null;
    priceCurrency: string;
    onClick: (event: React.MouseEvent) => void;
    onBuy: (event: React.MouseEvent) => void;
    onAddToCart: (event: React.MouseEvent) => void;
};

const ProductCard: React.FC<productCardProps> = ({
    isDisplayButtons,
    productName,
    normalPrice,
    discountPrice,
    priceCurrency,
    onClick,
    onBuy,
    onAddToCart,
}) => {
    const goToProduct = (e: React.MouseEvent) => {
        onClick(e);
    };

    const renderPrice = () => {
        if (discountPrice === null) {
            return (
                <Stack direction='row'>
                    <Typography variant='body2' color='text.secondary'>
                        {normalPrice.toString().concat(priceCurrency)}
                    </Typography>
                </Stack>
            );
        } else {
            return (
                <Stack spacing={1} direction='row'>
                    <Typography variant='body2' color='text.secondary'>
                        {discountPrice.toString().concat(priceCurrency)}
                    </Typography>
                    <Typography
                        sx={{ textDecoration: 'line-through', opacity: 0.5 }}
                        variant='body2'
                        color='text.secondary'
                    >
                        {normalPrice.toString().concat(priceCurrency)}
                    </Typography>
                </Stack>
            );
        }
    };

    const renderSalePercentage = () => {
        if (discountPrice !== null) {
            return (
                <Typography bgcolor='#8cc44b' variant='body2' color='text.primary' padding={0.4} position={'absolute'}>
                    {Math.round((1 - (discountPrice ? discountPrice : 0) / normalPrice) * -100)
                        .toString()
                        .concat('%')}
                </Typography>
            );
        }
    };

    const renderButtons = () => {
        if (isDisplayButtons) {
            return (
                <CardActions>
                    <Button size='small' onClick={onBuy}>
                        Buy now
                    </Button>
                    <Button size='small' onClick={onAddToCart}>
                        Add to cart
                    </Button>
                </CardActions>
            );
        }
    };

    return (
        <Card sx={{ minWidth: 200, width: 300, margin: 1 }}>
            <CardActionArea onClick={goToProduct}>
                {renderSalePercentage()}
                <CardMedia
                    component='img'
                    height='140'
                    // TODO: Handle images
                    image='default-product-image.jpg'
                    alt={`product ${productName}`}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {productName}
                    </Typography>
                    {renderPrice()}
                </CardContent>
            </CardActionArea>
            {renderButtons()}
        </Card>
    );
};

export default ProductCard;
