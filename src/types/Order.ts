import { OrderItem } from './OrderItem';

export type Order = {
    orderId: string;
    time: string;
    status: string;
    orderItems: Array<OrderItem>;
};
