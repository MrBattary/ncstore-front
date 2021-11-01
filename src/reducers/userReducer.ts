import { UserRole } from '../types/UserRole';
import * as types from '../actions/users/userActionTypes';
import { SignUp } from '../actions/users/SignUp';
import { SignIn } from '../actions/users/SignIn';
import { SignOut } from '../actions/users/SignOut';

interface UserStore {
    token: string | null;
    roles: UserRole[];
    loading: boolean;
    errorMessage: string | null;
}

export type UserReducerTypes = SignUp | SignIn | SignOut;

const initialState: UserStore = {
    token: null,
    roles: [],
    loading: false,
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
                errorMessage: null,
            };
        }
        // TODO: Write into errorMessage any error!
        case types.SIGN_IN_ERROR:
        case types.SIGN_UP_RECEIVE:
        case types.SIGN_UP_ERROR: {
            return {
                ...state,
                loading: false,
            };
        }
        case types.SIGN_IN_RECEIVE: {
            return {
                ...state,
                loading: false,
                /*
                token: action.payload.token,
                roles: action.payload.roles,
                */
            };
        }
        case types.SIGN_OUT_RECEIVE: {
            return {
                ...state,
                loading: false,
                token: null,
                roles: [],
            };
        }
        default:
            return state;
    }
};
