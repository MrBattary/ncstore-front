import {Dispatch} from "redux";
import {
    GET_BALANCE_ERROR,
    GET_BALANCE_RECEIVE,
    GET_BALANCE_REQUEST
} from "./userActionTypes";
import userApi from "../../api/user";
import {BalanceGetResponse} from "../../types/Balance";

export type GetBalanceRequestAction = {
    type: typeof GET_BALANCE_REQUEST;
};
export type GetBalanceReceiveAction = {
    type: typeof GET_BALANCE_RECEIVE;
    payload: BalanceGetResponse;
};
export type GetBalanceErrorAction = {
    type: typeof GET_BALANCE_ERROR;
    errorMessage?: string;
};

export type GetBalance = GetBalanceRequestAction | GetBalanceReceiveAction | GetBalanceErrorAction;

export const getBalance = (token: string) => async (dispatch: Dispatch<GetBalance>) => {
    dispatch({type: GET_BALANCE_REQUEST});
    try {
        const data = await userApi.getBalance(token);
        dispatch({type: GET_BALANCE_RECEIVE, payload: data});
    } catch (e) {
        if (e instanceof Error) {
            dispatch({type: GET_BALANCE_ERROR, errorMessage: e.message});
        } else {
            dispatch({type: GET_BALANCE_ERROR});
        }
    }
};