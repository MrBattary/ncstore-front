import { UserType } from './UserType';
import { UserRole } from './UserRole';

export type SignInDetails = {
    email: string;
    password: string;
};

export type SignInResponse = {
    userId: string;
    type: UserType;
    token: string;
    roles: Array<UserRole>;
};
