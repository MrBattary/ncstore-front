
import {Dispatch} from "redux";
import {
    GET_PAYMENT_TOKEN_ERROR,
    GET_PAYMENT_TOKEN_RECEIVE,
    GET_PAYMENT_TOKEN_REQUEST
} from "./userActionTypes";
import paymentApi from "../../api/payment";
import {PaymentToken} from "../../types/Payment";

export type GetPaymentTokenRequestAction = {
    type: typeof GET_PAYMENT_TOKEN_REQUEST;
};
export type GetPaymentTokenReceiveAction = {
    type: typeof GET_PAYMENT_TOKEN_RECEIVE;
    payload: PaymentToken;
};
export type GetPaymentTokenErrorAction = {
    type: typeof GET_PAYMENT_TOKEN_ERROR;
    errorMessage?: string;
};

export type GetPaymentToken = GetPaymentTokenRequestAction | GetPaymentTokenReceiveAction | GetPaymentTokenErrorAction;

export const getPaymentToken = (token: string) => async (dispatch: Dispatch<GetPaymentToken>) => {
    dispatch({type: GET_PAYMENT_TOKEN_REQUEST});
    try {
        const data = await paymentApi.getToken(token);
        dispatch({type: GET_PAYMENT_TOKEN_RECEIVE,  payload: data});
    } catch (e) {
        if (e instanceof Error) {
            dispatch({type: GET_PAYMENT_TOKEN_ERROR, errorMessage: e.message});
        } else {
            dispatch({type: GET_PAYMENT_TOKEN_ERROR});
        }
    }
};