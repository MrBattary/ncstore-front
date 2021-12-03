import React, { useEffect } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import { useSnackbar } from 'notistack';

import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/UserRole';
import { getCart } from '../../../actions/cart/GetCart';
import { Box, Button, Divider, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { checkoutFromCart } from '../../../actions/orders/CheckoutFromCart';
import { CartProduct } from '../../../types/CartProduct';
import CartItem from '../../components/cart_item/CartItem';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import { deleteItemFromCart } from '../../../actions/cart/DeleteItemFromCart';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';

type cartProps = {
    history: History;
};

const enum cartTasks {
    WAIT_FOR_CHANGE_CART = 'WAIT_FOR_CHANGE_CART',
}

// TODO: Add sync of cart
const Cart: React.FC<cartProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { cart, loading, success, errorMessage } = useSelector((state: AppState) => state.cartReducer);
    const { roles, token } = useSelector((state: AppState) => state.userReducer);

    const [task, setNextTask] = useTask();

    useEffect(() => {
        if (task === cartTasks.WAIT_FOR_CHANGE_CART && success) {
            dispatch(getCart(token ? token : ''));
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [dispatch, setNextTask, success, task, token]);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
    }, [enqueueSnackbar, errorMessage]);

    useEffect(() => {
        if (!roles.includes(UserRole.CUSTOMER) || !token) {
            history.push('/');
        }
        dispatch(getCart(token ? token : ''));
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const handleChangeProductNumber = (productId: string, numberOfProducts: number) => {
        dispatch(updateItemInCart({ productId: productId, productCount: numberOfProducts }, token ? token : ''));
        setNextTask(cartTasks.WAIT_FOR_CHANGE_CART, 0);
    };

    const handleRemoveItemFromCart = (productId: string) => {
        dispatch(deleteItemFromCart(productId, token ? token : ''));
        setNextTask(cartTasks.WAIT_FOR_CHANGE_CART, 0);
    };

    const handleCheckout = () => {
        dispatch(checkoutFromCart(token ? token : ''));
    };

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const renderCartItems = () =>
        cart.map((cartItem: CartProduct) => (
            <CartItem
                key={cartItem.productId}
                loading={loading}
                product={cartItem}
                onClick={() => goToProduct(cartItem.productId)}
                onChange={handleChangeProductNumber}
                onRemove={() => handleRemoveItemFromCart(cartItem.productId)}
            />
        ));

    const renderNonemptyCart = () => (
        <div className='cart-content__nonempty-cart'>
            <Box margin={2} display={'flex'} justifyContent={'space-between'}>
                <Typography className='nonempty-cart__header' variant='h4'>
                    Your cart
                </Typography>
                <Button
                    className='nonempty-cart__checkout-button'
                    size='large'
                    variant='contained'
                    onClick={handleCheckout}
                    startIcon={<ShoppingCart />}
                    sx={{ backgroundColor: '#39bd5c', '&:hover': { backgroundColor: '#50d96c' } }}
                >
                    Checkout
                </Button>
            </Box>
            <div className='nonempty-cart__items'>
                <Divider />
                {renderCartItems()}
            </div>
        </div>
    );

    const renderEmptyCart = () => (
        <div className='cart-content__empty-cart'>
            {/* TODO: Add some picture here */}
            <Typography className='empty-cart__label' variant='h4' display='inline-block'>
                It seems you are not add anything yet
            </Typography>
            <Button onClick={() => history.push('/')}>Let's buy something!</Button>
        </div>
    );

    const renderCartContent = () => {
        if (cart.length) {
            return renderNonemptyCart();
        } else {
            return renderEmptyCart();
        }
    };

    return !cart ? null : <main className='cart-content'>{renderCartContent()}</main>;
};

export default Cart;
