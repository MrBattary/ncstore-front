export type BalanceGetResponse ={
    balance : number;
}
export type AddBalancePayment = {
    paymentAmount: number;
    nonce: string;
}
export type NewBalanceValue = {
    newBalance: number;
}