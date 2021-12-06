import {
    CHANGE_USER_PASSWORD_ERROR,
    CHANGE_USER_PASSWORD_RECEIVE,
    CHANGE_USER_PASSWORD_REQUEST,
} from "./userActionTypes";
import {Dispatch} from "redux";
import {ChangePasswordDetails} from "../../types/ChangePasswordDetails";
import userApi from "../../api/user";

export type ChangePasswordRequestAction = {
    type: typeof CHANGE_USER_PASSWORD_REQUEST;
};
export type ChangePasswordReceiveAction = {
    type: typeof CHANGE_USER_PASSWORD_RECEIVE;
};
export type ChangePasswordErrorAction = {
    type: typeof CHANGE_USER_PASSWORD_ERROR;
    errorMessage?: string;
};

export type ChangePassword = ChangePasswordRequestAction | ChangePasswordReceiveAction | ChangePasswordErrorAction;

export const changePassword = (passwordChangeDetails: ChangePasswordDetails, token: string) => async (dispatch: Dispatch<ChangePassword>) => {
    dispatch({type: CHANGE_USER_PASSWORD_REQUEST});
    try {
        await userApi.changePassword(passwordChangeDetails, token);
        dispatch({type: CHANGE_USER_PASSWORD_RECEIVE});
    } catch (e) {
        if (e instanceof Error) {
            dispatch({type: CHANGE_USER_PASSWORD_ERROR, errorMessage: e.message});
        } else {
            dispatch({type: CHANGE_USER_PASSWORD_ERROR});
        }
    }
};