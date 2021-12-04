import * as types from '../actions/users/userActionTypes';
import { UserRole } from '../types/UserRole';
import { SignUp } from '../actions/users/SignUp';
import { SignIn } from '../actions/users/SignIn';
import { SignOut } from '../actions/users/SignOut';
import { UserType } from '../types/UserType';
import { RestoreDefaultUserReducer } from '../actions/users/RestoreDefaultUserReducer';
import { GetPersonProfile } from '../actions/users/GetPersonProfile';
import { GetCompanyProfile } from '../actions/users/GetCompanyProfile';
import { PersonProfile } from '../types/PersonProfile';
import { CompanyProfile } from '../types/CompanyProfile';
import {ChangePassword} from "../actions/users/PasswordChange";
import {GetPaymentToken} from "../actions/users/Payment";

interface UserStore {
    userId: string | null;
    userType: UserType | null;
    token: string | null;
    roles: UserRole[];
    profile: PersonProfile | CompanyProfile | null;
    loading: boolean;
    success: boolean;
    errorMessage: string | null;
    paymentToken: string | null;
}

export type UserReducerTypes =
    | SignUp
    | SignIn
    | SignOut
    | GetPersonProfile
    | GetCompanyProfile
    | RestoreDefaultUserReducer
    | ChangePassword
    | GetPaymentToken;

const initialState: UserStore = {
    userId: null,
    userType: null,
    token: null,
    roles: [],
    profile: null,
    loading: false,
    success: false,
    errorMessage: null,
    paymentToken: null,
};

export const userReducer = (state = initialState, action: UserReducerTypes): UserStore => {
    switch (action.type) {
        case types.SIGN_UP_REQUEST:
        case types.SIGN_IN_REQUEST:
        case types.SIGN_OUT_REQUEST: {
            return {
                ...state,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.GET_PERSON_PROFILE_REQUEST:
        case types.GET_COMPANY_PROFILE_REQUEST: {
            return {
                ...state,
                profile: null,
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
        case types.SIGN_IN_RECEIVE: {
            return {
                ...state,
                loading: false,
                success: true,
                userId: action.payload.userId,
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
        case types.GET_PERSON_PROFILE_RECEIVE:
        case types.GET_COMPANY_PROFILE_RECEIVE: {
            return {
                ...state,
                loading: false,
                success: true,
                profile: action.payload,
            };
        }
        case types.SIGN_IN_ERROR:
        case types.SIGN_UP_ERROR:
        case types.GET_PERSON_PROFILE_ERROR:
        case types.GET_COMPANY_PROFILE_ERROR:
        case types.GET_PAYMENT_TOKEN_ERROR:
        case types.CHANGE_USER_PASSWORD_ERROR: {
            return {
                ...state,
                loading: false,
                success: false,
                errorMessage: action.errorMessage ? action.errorMessage : null,
            };
        }
        case types.RESTORE_DEFAULT_USER_REDUCER: {
            return {
                ...state,
                success: false,
                errorMessage: null,
            };
        }
        case types.GET_PAYMENT_TOKEN_REQUEST:
        case types.CHANGE_USER_PASSWORD_REQUEST:{
            return {
                ...state,
                loading: true,
                success: false,
                errorMessage: null,
            };
        }
        case types.CHANGE_USER_PASSWORD_RECEIVE:{
            return {
                ...state,
                userType: null,
                token: null,
                roles: [],
                loading: false,
                success: true,
            };
        }
        case types.GET_PAYMENT_TOKEN_RECEIVE:{
            return {
                ...state,
                paymentToken: action.payload.paymentToken,
                loading: false,
                success: true,
            };
        }
        default:
            return state;
    }
};
