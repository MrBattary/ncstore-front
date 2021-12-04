import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import { useSnackbar } from 'notistack';

import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/UserRole';
import { getCart } from '../../../actions/cart/GetCart';
import { Button, Divider, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { checkoutFromCart } from '../../../actions/orders/CheckoutFromCart';
import { CartProduct } from '../../../types/CartProduct';
import CartItem from '../../components/cart_item/CartItem';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import { deleteItemFromCart } from '../../../actions/cart/DeleteItemFromCart';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';

import './style.css';
import { UserType } from '../../../types/UserType';
import { getPersonProfile } from '../../../actions/users/GetPersonProfile';
import { getCompanyProfile } from '../../../actions/users/GetCompanyProfile';

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
    const { roles, token, userType, profile } = useSelector((state: AppState) => state.userReducer);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { order } = useSelector((state: AppState) => state.ordersReducer);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [save, setSave] = useState<number>(0);
    const [afterBalance, setAfterBalance] = useState<number>(0);
    const [task, setNextTask] = useTask();

    useEffect(() => {
        if (task === cartTasks.WAIT_FOR_CHANGE_CART && success) {
            dispatch(getCart(token ? token : ''));
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [dispatch, setNextTask, success, task, token]);

    useEffect(() => {
        const total = cart.reduce(
            (total, cartItem) =>
                total +
                (cartItem.discountPrice ? cartItem.discountPrice : cartItem.normalPrice) * cartItem.productCount,
            0
        );
        setTotalPrice(total);
        setSave(
            cart.reduce(
                (total, cartItem) =>
                    total + (cartItem.discountPrice ? cartItem.discountPrice : 0) * cartItem.productCount,
                0
            )
        );
        setAfterBalance((profile ? profile.balance : 0) - total);
    }, [cart, profile]);

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
        if (token) {
            dispatch(getCart(token));
            if (!profile && userType === UserType.PERSON) {
                dispatch(getPersonProfile(token));
            }
            if (!profile && userType === UserType.COMPANY) {
                dispatch(getCompanyProfile(token));
            }
        }

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

    const renderNonemptyCartRightSide = () => (
        <div className='nonempty-cart__right-side'>
            <Typography className='right-side__balance' style={{ marginBottom: 10 }} variant='h5'>
                Balance: {profile ? profile.balance : 0}
            </Typography>
            <Typography className='right-side__total' style={{ marginBottom: 10 }} variant='h5'>
                Total: {totalPrice}
            </Typography>
            <Typography className='right-side__save' style={{ marginBottom: 10 }} variant='h5'>
                Save: <span style={{ color: '#8cc44b' }}>{save}</span>
            </Typography>
            <Typography className='right-side__after' style={{ marginBottom: 10 }} variant='h5'>
                After: {afterBalance < 0 ? <span style={{ color: 'red' }}>{afterBalance}</span> : afterBalance}
            </Typography>
            <div className='right-side__checkout'>
                <Button
                    className='checkout__checkout-button'
                    size='large'
                    variant='contained'
                    onClick={handleCheckout}
                    startIcon={<ShoppingCart />}
                    sx={{ backgroundColor: '#39bd5c', marginTop: 5, '&:hover': { backgroundColor: '#50d96c' } }}
                >
                    Checkout
                </Button>
            </div>
        </div>
    );

    const renderNonemptyCart = () => (
        <div className='cart-content__nonempty-cart'>
            {renderNonemptyCartRightSide()}
            <div className='nonempty-cart__left-side'>
                <Typography className='left-side__header' variant='h4' style={{ marginLeft: 10, marginBottom: 20 }}>
                    Your cart
                </Typography>
                <Divider />
                <div className='left-side__items'>{renderCartItems()}</div>
            </div>
        </div>
    );

    const renderEmptyCart = () => (
        <div className='cart-content__empty-cart'>
            {/* TODO: Add some picture here */}
            <Typography className='empty-cart__label' variant='h4' display='inline-block'>
                It seems you are not add anything yet
            </Typography>
            <Button style={{ fontSize: 24 }} onClick={() => history.push('/')}>
                Let's buy something!
            </Button>
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
