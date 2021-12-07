import React, { useCallback, useEffect, useState } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Divider, Typography } from '@mui/material';
import { AccountBalanceWallet, CreditCard, ShoppingCart } from '@mui/icons-material';
import { Modal } from 'antd';
import { useSnackbar } from 'notistack';

import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/UserRole';
import { getCart } from '../../../actions/cart/GetCart';
import { checkoutFromCart } from '../../../actions/orders/CheckoutFromCart';
import { CartProduct } from '../../../types/CartProduct';
import CartItem from '../../components/cart_item/CartItem';
import { updateItemInCart } from '../../../actions/cart/UpdateItemInCart';
import { deleteItemFromCart } from '../../../actions/cart/DeleteItemFromCart';
import OrderModal from '../../components/order_modal/OrderModal';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';

import './style.css';
import {getBalance} from "../../../actions/users/GetBalance";

type cartProps = {
    history: History;
};

const enum cartTasks {
    WAIT_FOR_CHANGE_CART = 'WAIT_FOR_CHANGE_CART',
    WAIT_FOR_CHECKOUT = 'WAIT_FOR_CHECKOUT',
}

// TODO: Add sync of cart

const Cart: React.FC<cartProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { cart, loading, success, errorMessage } = useSelector((state: AppState) => state.cartReducer);
    const { roles, balance, token} = useSelector((state: AppState) => state.userReducer);
    const { order, success: successOrder } = useSelector((state: AppState) => state.ordersReducer);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [save, setSave] = useState<number>(0);
    const [afterBalance, setAfterBalance] = useState<number>(0);
    const [isCheckoutModalVisible, setCheckoutModalVisible] = useState<boolean>(false);
    const [isOrderModalVisible, setOrderModalVisible] = useState<boolean>(false);
    const [task, setNextTask] = useTask();

    useEffect(() => {
        if (task === cartTasks.WAIT_FOR_CHANGE_CART && success) {
            dispatch(getCart(token ? token : ''));
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [dispatch, setNextTask, success, task, token]);

    useEffect(() => {
        const total =
            Math.round(
                (cart.reduce(
                    (total, cartItem) =>
                        total +
                        (cartItem.discountPrice ? cartItem.discountPrice : cartItem.normalPrice) *
                            cartItem.productCount,
                    0
                ) +
                    Number.EPSILON) *
                    100
            ) / 100;
        setTotalPrice(total);
        setSave(
            Math.round(
                (cart.reduce(
                    (total, cartItem) =>
                        total +
                        (cartItem.discountPrice !== null ? cartItem.normalPrice - cartItem.discountPrice : 0) *
                            cartItem.productCount,
                    0
                ) +
                    Number.EPSILON) *
                    100
            ) / 100
        );
        const afterBalance = Math.round((((balance ? balance.balance : 0) - total) + Number.EPSILON) * 100) / 100;
        setAfterBalance(afterBalance);
    }, [cart, balance]);

    useEffect(() => {
        if (task === cartTasks.WAIT_FOR_CHECKOUT && successOrder) {
            setCheckoutModalVisible(false);
            setOrderModalVisible(true);
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [setNextTask, successOrder, task]);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
    }, [enqueueSnackbar, errorMessage]);

    useEffect(() => {
        if (!roles.includes(UserRole.CUSTOMER) || !token) {
            history.push('/signin');
        }
    }, [history, roles, token]);

    useEffect(() => {
        if (token) {
            dispatch(getCart(token));
            if(!balance) {
                dispatch(getBalance(token));
            }
        }

        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

    const handleChangeProductNumber = useCallback(
        (productId: string, numberOfProducts: number) => {
            dispatch(updateItemInCart({ productId: productId, productCount: numberOfProducts }, token ? token : ''));
            setNextTask(cartTasks.WAIT_FOR_CHANGE_CART, 0);
        },
        [dispatch, setNextTask, token]
    );

    const handleRemoveItemFromCart = (productId: string) => {
        dispatch(deleteItemFromCart(productId, token ? token : ''));
        setNextTask(cartTasks.WAIT_FOR_CHANGE_CART, 0);
    };

    const handleCheckoutFromBalance = () => {
        dispatch(checkoutFromCart(token ? token : ''));
        setNextTask(cartTasks.WAIT_FOR_CHECKOUT, 0);
    };

    const handleCheckoutFromCard = () => {
        console.log('Checkout from card');
    };

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const onClickCheckout = () => {
        if (totalPrice === 0) {
            handleCheckoutFromBalance();
        } else {
            setCheckoutModalVisible(true);
        }
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
                Balance: {balance ? balance.balance : 0}
                {cart[0].priceCurrency}
            </Typography>
            <Typography className='right-side__total' style={{ marginBottom: 10 }} variant='h5'>
                Total: {totalPrice}
                {cart[0].priceCurrency}
            </Typography>
            <Typography className='right-side__save' style={{ marginBottom: 10 }} variant='h5'>
                Save:{' '}
                <span style={{ color: '#8cc44b' }}>
                    {save}
                    {cart[0].priceCurrency}
                </span>
            </Typography>
            <Typography className='right-side__after' style={{ marginBottom: 10 }} variant='h5'>
                After:{' '}
                {afterBalance < 0 ? (
                    <span style={{ color: 'red' }}>
                        {afterBalance}
                        {cart[0].priceCurrency}
                    </span>
                ) : (
                    <span>
                        {afterBalance}
                        {cart[0].priceCurrency}
                    </span>
                )}
            </Typography>
            <div className='right-side__checkout'>
                <Button
                    className='checkout__checkout-button'
                    size='large'
                    variant='contained'
                    onClick={onClickCheckout}
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
            <Modal
                visible={isCheckoutModalVisible}
                title='Payment method'
                onCancel={() => setCheckoutModalVisible(false)}
                footer={[
                    <Button
                        key='balance'
                        variant='outlined'
                        color='inherit'
                        onClick={handleCheckoutFromBalance}
                        disabled={afterBalance < 0}
                        startIcon={<AccountBalanceWallet />}
                    >
                        Balance
                    </Button>,
                    <Button
                        key='card'
                        variant='outlined'
                        color='inherit'
                        onClick={handleCheckoutFromCard}
                        startIcon={<CreditCard />}
                        style={{ marginLeft: 10, marginRight: 10 }}
                    >
                        Card
                    </Button>,
                    <Button
                        key='cancel'
                        variant='outlined'
                        color='inherit'
                        onClick={() => setCheckoutModalVisible(false)}
                    >
                        Cancel
                    </Button>,
                ]}
            >
                <Typography>You can choose to pay from the balance or pay by card.</Typography>
                <Typography>If the balance is negative, payment from the balance is not possible.</Typography>
            </Modal>
            <OrderModal
                isModalVisible={isOrderModalVisible}
                order={order}
                onClick={goToProduct}
                onClose={() => setOrderModalVisible(false)}
            />
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
