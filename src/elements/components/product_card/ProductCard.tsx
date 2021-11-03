import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './style.css';

type productCardProps = {
    productName: string;
    productPrice: number;
    priceCurrency: string;
    onClick: (event: React.MouseEvent) => void;
    onBuy: (event: React.MouseEvent) => void;
    onAddToCart: (event: React.MouseEvent) => void;
};

const ProductCard: React.FC<productCardProps> = ({
    productName,
    productPrice,
    priceCurrency,
    onClick,
    onBuy,
    onAddToCart,
}) => {
    const goToProduct = (e: React.MouseEvent) => {
        onClick(e);
    };

    return (
        <Card sx={{ minWidth: 200, width: 300, margin: 1 }}>
            <CardActionArea onClick={goToProduct}>
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
                    <Typography variant='body2' color='text.secondary'>
                        {productPrice.toString().concat(priceCurrency)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' onClick={onBuy}>
                    Buy now
                </Button>
                <Button size='small' onClick={onAddToCart}>
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
