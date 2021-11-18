import React from 'react';

import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

import './style.css';

type productInfoCardProps = {
    productId: string;
    productName: string;
    onClick: (event: React.MouseEvent) => void;
    onDetails: (event: React.MouseEvent) => void;
    onRemove: (event: React.MouseEvent) => void;
};

const ProductInfoCard: React.FC<productInfoCardProps> = ({ productId, productName, onClick, onDetails, onRemove }) => {
    return (
        <Card className='product-info-card' sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}>
            <CardActionArea sx={{ maxHeight: 140, maxWidth: 140 }} onClick={onClick}>
                <CardMedia
                    component='img'
                    height='140'
                    // TODO: Handle images
                    image='default-product-image.jpg'
                    alt={`product ${productName}`}
                    onClick={onClick}
                />
            </CardActionArea>
            <Box className='product-info-card__content' sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardActionArea onClick={onClick}>
                    <CardContent>
                        <Typography gutterBottom component='div'>
                            Product name: {productName}
                        </Typography>
                        <Typography gutterBottom component='div'>
                            ID: {productId}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ flexDirection: 'row-reverse' }}>
                    <Button
                        sx={{
                            zIndex: 1,
                            margin: 1,
                            color: 'red',
                            borderColor: 'red',
                            '&:hover': { borderColor: 'red' },
                        }}
                        size='small'
                        variant='outlined'
                        onClick={onRemove}
                    >
                        Remove product
                    </Button>
                    <Button sx={{ zIndex: 1, margin: 1 }} size='small' variant='outlined' onClick={onDetails}>
                        Product details
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default ProductInfoCard;
