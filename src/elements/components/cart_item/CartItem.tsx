import React, { useState } from 'react';
import { CartProduct } from '../../../types/CartProduct';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { InputNumber } from 'antd';

type cartItemProps = {
    loading: boolean;
    product: CartProduct;
    onClick: (event: React.MouseEvent) => void;
    onChange: (productId: string, numberOfProducts: number) => void;
    onRemove: (event: React.MouseEvent) => void;
};

const CartItem: React.FC<cartItemProps> = ({ loading, product, onClick, onChange, onRemove }) => {
    const [value, setValue] = useState<number>(product.productCount);

    const changeNumberOfProduct = (newNumber: number) => {
        setValue(newNumber);
        onChange(product.productId, newNumber);
    };

    const renderProductPrice = () => {
        if (!product.discountPrice) {
            return (
                <Stack direction='row'>
                    <Typography gutterBottom component='div'>
                        {product.normalPrice.toString().concat(product.priceCurrency)}
                    </Typography>
                </Stack>
            );
        } else {
            return (
                <Stack spacing={1} direction='row'>
                    <Typography gutterBottom component='div'>
                        {product.discountPrice.toString().concat(product.priceCurrency)}
                    </Typography>
                    <Typography sx={{ textDecoration: 'line-through', opacity: 0.5 }} gutterBottom component='div'>
                        {product.normalPrice.toString().concat(product.priceCurrency)}
                    </Typography>
                </Stack>
            );
        }
    };

    return (
        <Card className='cart-item' sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}>
            <Box
                className='cart-item__content'
                sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            >
                <CardActionArea onClick={onClick}>
                    <CardContent>
                        <Typography gutterBottom component='div'>
                            {product.productName}
                        </Typography>
                        {renderProductPrice()}
                    </CardContent>
                </CardActionArea>
                <InputNumber
                    min={1}
                    value={value}
                    style={{ margin: '28px', height: '35px' }}
                    onChange={changeNumberOfProduct}
                />
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
                </CardActions>
            </Box>
        </Card>
    );
};

export default CartItem;
