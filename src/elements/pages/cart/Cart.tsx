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
import { getBalance } from '../../../actions/users/GetBalance';
import PaymentModal from '../../components/payment/PaymentModal';
import { getPaymentToken } from '../../../actions/users/Payment';

import './style.css';

type cartProps = {
    history: History;
};

const enum cartTasks {
    WAIT_FOR_CHANGE_CART = 'WAIT_FOR_CHANGE_CART',
    WAIT_FOR_CHECKOUT = 'WAIT_FOR_CHECKOUT',
}

const Cart: React.FC<cartProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { cart, loading, success, errorMessage } = useSelector((state: AppState) => state.cartReducer);
    const { roles, balance, token, paymentToken } = useSelector((state: AppState) => state.userReducer);
    const { order, success: successOrder } = useSelector((state: AppState) => state.ordersReducer);

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [save, setSave] = useState<number>(0);
    const [afterBalance, setAfterBalance] = useState<number>(0);
    const [isCheckoutModalVisible, setCheckoutModalVisible] = useState<boolean>(false);
    const [isOrderModalVisible, setOrderModalVisible] = useState<boolean>(false);
    const [isPaymentModalVisible, setPaymentModalVisible] = useState<boolean>(false);
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
                        (cartItem.discountPrice !== null ? cartItem.discountPrice : cartItem.normalPrice) *
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
        const afterBalance = Math.round(((balance ? balance.balance : 0) - total + Number.EPSILON) * 100) / 100;
        setAfterBalance(afterBalance);
    }, [cart, balance]);

    useEffect(() => {
        if (task === cartTasks.WAIT_FOR_CHECKOUT && successOrder) {
            setCheckoutModalVisible(false);
            setOrderModalVisible(true);
            dispatch(getCart(token ? token : ''));
            dispatch(getBalance(token ? token : ''));
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [setNextTask, successOrder, task, token, dispatch]);

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
            if (!paymentToken) {
                dispatch(getPaymentToken(token));
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
        dispatch(checkoutFromCart({ useBalance: true, nonce: null }, token ? token : ''));
        setNextTask(cartTasks.WAIT_FOR_CHECKOUT, 0);
    };

    const handleCheckoutFromCard = (e: any, nonce: string) => {
        if (nonce && nonce.length !== 0) {
            dispatch(getPaymentToken(token ? token : ''));
            dispatch(checkoutFromCart({ useBalance: false, nonce: nonce }, token ? token : ''));
            setPaymentModalVisible(false);
            setNextTask(cartTasks.WAIT_FOR_CHECKOUT, 0);
        }
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

    const onClickCard = () => {
        setCheckoutModalVisible(false);
        setPaymentModalVisible(true);
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

    const numberWithCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const renderNonemptyCartRightSide = () => (
        <div className='nonempty-cart__right-side'>
            <div className='right-side__monetary-values'>
                <div className='monetary-values__namings'>
                    <Typography className='namings__balance' style={{ marginBottom: 10 }} variant='h5'>
                        Balance
                    </Typography>
                    <Typography className='namings__total' style={{ marginBottom: 10 }} variant='h5'>
                        Total
                    </Typography>
                    <Typography className='namings__save' style={{ marginBottom: 10 }} variant='h5'>
                        Save
                    </Typography>
                    <Typography className='namings__after' style={{ marginBottom: 10 }} variant='h5'>
                        After
                    </Typography>
                </div>
                <Divider orientation='vertical' flexItem />
                <div className='monetary-values__numbers'>
                    <Typography className='numbers__balance' style={{ marginBottom: 10 }} variant='h5'>
                        {numberWithCommas(balance ? balance.balance : 0)}
                        {cart[0].priceCurrency}
                    </Typography>
                    <Typography className='numbers__total' style={{ marginBottom: 10 }} variant='h5'>
                        {numberWithCommas(totalPrice)}
                        {cart[0].priceCurrency}
                    </Typography>
                    <Typography className='numbers__save' style={{ marginBottom: 10 }} variant='h5'>
                        <span style={{ color: '#8cc44b' }}>
                            {numberWithCommas(save)}
                            {cart[0].priceCurrency}
                        </span>
                    </Typography>
                    <Typography className='numbers__after' style={{ marginBottom: 10 }} variant='h5'>
                        {afterBalance < 0 ? (
                            <span style={{ color: 'red' }}>
                                {numberWithCommas(afterBalance)}
                                {cart[0].priceCurrency}
                            </span>
                        ) : (
                            <span>
                                {numberWithCommas(afterBalance)}
                                {cart[0].priceCurrency}
                            </span>
                        )}
                    </Typography>
                </div>
            </div>
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
        </div>
    );

    const renderEmptyCart = () => (
        <div className='cart-content__empty-cart'>
            <img src='./no-content.jpg' alt='No content' />
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

    return !cart ? null : (
        <main className='cart-content'>
            {renderCartContent()}
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
                        onClick={onClickCard}
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
            <PaymentModal
                isVisible={isPaymentModalVisible}
                handleOk={handleCheckoutFromCard}
                handleCancel={() => setPaymentModalVisible(false)}
                paymentToken={paymentToken ? paymentToken : ''}
            />
            <OrderModal
                isModalVisible={isOrderModalVisible}
                order={order}
                onClick={goToProduct}
                onHandleCancel={() => setOrderModalVisible(false)}
            />
        </main>
    );
};

export default Cart;
