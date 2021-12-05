import React, { useState } from 'react';
import { Order } from '../../../types/Order';
import { Button, Modal, Table } from 'antd';
import { Link, Tooltip, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';

import './style.css';

type orderModalProps = {
    isModalVisible: boolean;
    order: Order | null;
    onClick: (productId: string) => void;
    onClose: (event: React.MouseEvent) => void;
};

const OrderModal: React.FC<orderModalProps> = ({ isModalVisible, order, onClick, onClose }) => {
    const [isVisibleCopiedTooltip, setVisibleCopiedTooltip] = useState<boolean>(false);

    const copyKeyToClipboard = () => {
        setVisibleCopiedTooltip(true);
        setTimeout(() => setVisibleCopiedTooltip(false), 1000);
    };

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
            title: 'Key',
            dataIndex: 'licenseKey',
            render: (text: any) => (
                <CopyToClipboard text={text} onCopy={copyKeyToClipboard}>
                    <Tooltip
                        title={'Copied!'}
                        open={isVisibleCopiedTooltip}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        placement='right'
                    >
                        <p className='order-content__license-key'>{text}</p>
                    </Tooltip>
                </CopyToClipboard>
            ),
        },
    ];

    return !order ? null : (
        <Modal
            className='order-modal'
            title={`Order ${order.orderId}`}
            visible={isModalVisible}
            onOk={onClose}
            onCancel={onClose}
            footer={[
                <Button key='close' onClick={onClose}>
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
