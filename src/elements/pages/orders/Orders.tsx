import { History } from 'history';
import React, { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Divider, Typography } from '@mui/material';
import moment from 'moment/moment';
import { Feed } from '@mui/icons-material';
import { Table } from 'antd';

import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/UserRole';
import { Pagination } from '../../../types/Pagination';
import { getMinimalisticOrders } from '../../../actions/orders/GetMinimalisticOrders';
import OrderModal from '../../components/order_modal/OrderModal';
import useTask, { DEFAULT_TASK_ABSENT } from '../../../utils/TaskHook';
import { getOrder } from '../../../actions/orders/GetOrder';

import './style.css';

type ordersProps = {
    history: History;
};

const enum ordersTasks {
    WAIT_FOR_ORDER = 'WAIT_FOR_ORDER',
}

const Orders: React.FC<ordersProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { minimalisticOrders, order, success, errorMessage } = useSelector((state: AppState) => state.ordersReducer);
    const { roles, token } = useSelector((state: AppState) => state.userReducer);
    const [isOrderModalVisible, setOrderModalVisible] = useState<boolean>(false);
    const [task, setNextTask] = useTask();

    const defaultPagination: Pagination = useMemo(
        () => ({
            page: 0,
            size: 20,
        }),
        []
    );

    const minimalisticOrdersTableColumns = [
        { title: 'Order ID', key: 'rowKey', dataIndex: 'orderId' },
        { title: 'Status', key: 'status', dataIndex: 'status' },
        {
            title: 'Time',
            key: 'timeStampUtc',
            dataIndex: 'timeStampUtc',
            render: (text: string) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
            title: 'More',
            dataIndex: '',
            key: 'x',
            render: (text: any, record: { orderId: string }) => (
                <Button
                    variant='outlined'
                    startIcon={<Feed />}
                    onClick={e => {
                        handleGetOrderDetails(record.orderId, e);
                    }}
                >
                    Details
                </Button>
            ),
        },
    ];

    useEffect(() => {
        if (task === ordersTasks.WAIT_FOR_ORDER && success) {
            setOrderModalVisible(true);
            setNextTask(DEFAULT_TASK_ABSENT, 0);
        }
    }, [setNextTask, success, task]);

    useEffect(() => {
        if (token) {
            dispatch(getMinimalisticOrders(defaultPagination, token));
        }
        // DO NOT REMOVE, Calls only once
        // eslint-disable-next-line
    }, []);

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

    const handleGetOrderDetails = (orderId: string, e: any) => {
        e.preventDefault();
        dispatch(getOrder(orderId, token ? token : ''));
        setNextTask(ordersTasks.WAIT_FOR_ORDER, 0);
    };

    const goToProduct = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    const renderNonemptyOrders = () => (
        <div className='orders__orders-content'>
            <Typography className='orders-content__header' variant='h4' style={{ marginLeft: 10, marginBottom: 20 }}>
                Your cart
            </Typography>
            <Divider />
            <Table
                className='orders-content__table'
                dataSource={minimalisticOrders}
                columns={minimalisticOrdersTableColumns}
            />
            <OrderModal
                isModalVisible={isOrderModalVisible}
                order={order}
                onClick={goToProduct}
                onHandleCancel={() => setOrderModalVisible(false)}
            />
        </div>
    );

    const renderEmptyOrders = () => (
        <div className='orders__orders-content-empty'>
            {/* TODO: Add some picture here */}
            <Typography className='orders-content-empty__label' variant='h4' display='inline-block'>
                It seems you are bought anything yet
            </Typography>
            <Button style={{ fontSize: 24 }} onClick={() => history.push('/')}>
                Let's buy something!
            </Button>
        </div>
    );

    const renderOrdersContent = () => {
        if (minimalisticOrders.length) {
            return renderNonemptyOrders();
        } else {
            return renderEmptyOrders();
        }
    };

    return <main className='content__orders'>{renderOrdersContent()}</main>;
};

export default Orders;
