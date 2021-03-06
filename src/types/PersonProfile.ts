import { UserType } from './UserType';
import { UserRole } from './UserRole';

export type PersonProfile = {
    email: string;
    balance: number;
    userType: UserType;
    nickName: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    roles: Array<UserRole>;
};
