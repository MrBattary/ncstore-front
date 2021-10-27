import { UserRole } from '../types/UserRole';
import * as types from '../actions/user/userActionTypes';
import { SignUp } from '../actions/user/SignUp';

interface UserStore {
    token: string | null;
    roles: UserRole[];
    loading: boolean;
    message: string | null;
}

export type UserReducerTypes = SignUp;

const initialState: UserStore = {
    token: null,
    roles: [],
    loading: false,
    message: null,
};

export const userReducer = (state = initialState, action: UserReducerTypes): UserStore => {
    switch (action.type) {
        case types.SIGN_UP_REQUEST: {
            return {
                ...state,
                loading: true,
                message: null,
            };
        }
        case types.SIGN_UP_RECEIVE:
        case types.SIGN_UP_ERROR: {
            return {
                ...state,
                loading: false,
            };
        }
        default:
            return state;
    }
};
