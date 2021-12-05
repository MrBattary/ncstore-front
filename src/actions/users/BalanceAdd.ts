import {Dispatch} from "redux";
import {ADD_BALANCE_ERROR, ADD_BALANCE_RECEIVE, ADD_BALANCE_REQUEST} from "./userActionTypes";
import userApi from "../../api/user";
import {AddBalancePayment, NewBalanceValue} from "../../types/Balance";

export type AddBalanceRequestAction = {
    type: typeof ADD_BALANCE_REQUEST;
};
export type AddBalanceReceiveAction = {
    type: typeof ADD_BALANCE_RECEIVE;
    payload: NewBalanceValue;
};
export type AddBalanceErrorAction = {
    type: typeof ADD_BALANCE_ERROR;
    errorMessage?: string;
};

export type AddBalance = AddBalanceRequestAction | AddBalanceReceiveAction | AddBalanceErrorAction;

export const addBalance = (addBalancePayment: AddBalancePayment, token: string) => async (dispatch: Dispatch<AddBalance>) => {
    dispatch({type: ADD_BALANCE_REQUEST});
    try {
        const data = await userApi.addBalance(addBalancePayment, token);
        dispatch({type: ADD_BALANCE_RECEIVE,  payload: data});
    } catch (e) {
        if (e instanceof Error) {
            dispatch({type: ADD_BALANCE_ERROR, errorMessage: e.message});
        } else {
            dispatch({type: ADD_BALANCE_ERROR});
        }
    }
};