import { UserRole } from '../types/UserRole';
import * as types from '../actions/users/userActionTypes';
import { SignUp } from '../actions/users/SignUp';
import { SignIn } from '../actions/users/SignIn';
import { SignOut } from '../actions/users/SignOut';
import { UserType } from '../types/UserType';
import { SignRestoreDefault } from '../actions/users/SignRestoreDefault';

interface UserStore {
    userType: UserType | null;
    token: string | null;
    roles: UserRole[];
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
}

export type UserReducerTypes = SignUp | SignIn | SignOut | SignRestoreDefault;

const initialState: UserStore = {
    userType: null,
    token: null,
    roles: [],
    loading: false,
    success: false,
    errorMessage: null,
};

export const userReducer = (state = initialState, action: UserReducerTypes): UserStore => {
    switch (action.type) {
        case types.SIGN_OUT_REQUEST:
        case types.SIGN_IN_REQUEST:
        case types.SIGN_UP_REQUEST: {
            return {
                ...state,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.SIGN_UP_RECEIVE: {
            return {
                ...state,
                loading: false,
                success: true,
            };
        }
        case types.SIGN_IN_ERROR:
        case types.SIGN_UP_ERROR: {
            return {
                ...state,
                loading: false,
                errorMessage: action.errorMessage ? action.errorMessage : null,
            };
        }
        case types.SIGN_IN_RECEIVE: {
            return {
                ...state,
                loading: false,
                success: true,
                userType: action.payload.type,
                token: action.payload.token,
                roles: action.payload.roles,
            };
        }
        case types.SIGN_OUT_RECEIVE: {
            return {
                ...state,
                userType: null,
                token: null,
                roles: [],
                loading: false,
                success: true,
            };
        }
        case types.SIGN_RESTORE_DEFAULT: {
            return {
                ...state,
                success: false,
                errorMessage: null,
            };
        }
        default:
            return state;
    }
};
