export type PaymentToken = {
    paymentToken: string;
}

export type AddBalancePayment = {
    paymentAmount: number;
    nonce: string;
}

export type NewBalanceValue = {
    newBalance: number;
}