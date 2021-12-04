export type PaymentToken = {
    paymentToken: string;
}

export type AddBalancePayment = {
    addAmount: number;
    nonce: string;
}

export type NewBalanceValue = {
    newBalance: number;
}