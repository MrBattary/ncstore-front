import React from 'react';

import { Button, Modal, Table } from 'antd';
import { Link, Typography } from '@mui/material';
import moment from 'moment';

import { Order } from '../../../types/Order';
import TextWithCopyTooltip from '../../pages/text_with_copy-tooltip/TextWithCopyTooltip';

import './style.css';

type orderModalProps = {
    isModalVisible: boolean;
    order: Order | null;
    onClick: (productId: string) => void;
    onHandleCancel: (event: React.MouseEvent) => void;
};

const OrderModal: React.FC<orderModalProps> = ({ isModalVisible, order, onClick, onHandleCancel }) => {
    const columns = [
        {
            title: 'Product',
            dataIndex: 'productName',
            render: (text: any, record: { productId: string }) => (
                <Link underline={'hover'} onClick={() => onClick(record.productId)}>
                    {text}
                </Link>
            ),
        },
        {
            title: 'Paid',
            dataIndex: ['paid', 'currency'],
            render: (text: any, row: any) => (
                <p className='order-content__paid'>
                    {row['paid']}
                    {row['currency']}
                </p>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'License key',
            dataIndex: 'licenseKey',
            render: (text: any) => <TextWithCopyTooltip text={text} />,
        },
    ];

    return !order ? null : (
        <Modal
            className='order-modal'
            title={`Order ${order.orderId}`}
            visible={isModalVisible}
            onOk={onHandleCancel}
            onCancel={onHandleCancel}
            footer={[
                <Button key='close' onClick={onHandleCancel}>
                    Close
                </Button>,
            ]}
            width={'50%'}
        >
            <div className='order-modal__order-content'>
                <Typography variant='body2' color='text.secondary'>
                    Order: {order.orderId}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Time: {moment(order.time).format('YYYY-MM-DD HH:mm:ss')}
                </Typography>
                <Typography variant='body2' color='text.secondary' style={{ marginBottom: 20 }}>
                    Status: {order.status}
                </Typography>
                <Table
                    columns={columns}
                    rowKey='licenseKey'
                    dataSource={order.orderItems}
                    pagination={{ defaultPageSize: 5 }}
                />
            </div>
        </Modal>
    );
};

export default OrderModal;
