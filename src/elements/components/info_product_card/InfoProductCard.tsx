import React from 'react';

import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

type infoProductCardProps = {
    productId: string;
    productName: string;
    onClick: (event: React.MouseEvent) => void;
    onDetails: (event: React.MouseEvent) => void;
    onRemove: (event: React.MouseEvent) => void;
};

const InfoProductCard: React.FC<infoProductCardProps> = ({ productId, productName, onClick, onDetails, onRemove }) => {
    return (
        <Card sx={{ display: 'flex', margin: 1 }}>
            <CardMedia
                component='img'
                height='140'
                // TODO: Handle images
                image='default-product-image.jpg'
                alt={`product ${productName}`}
                onClick={onClick}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardActionArea onClick={onClick}>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                            {productName}
                        </Typography>
                        <Typography gutterBottom variant='h6' component='div'>
                            {productId}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ flexDirection: 'row-reverse' }}>
                    <Button size='small' onClick={onDetails}>
                        Product details
                    </Button>
                    <Button size='small' onClick={onRemove}>
                        Remove product
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default InfoProductCard;
