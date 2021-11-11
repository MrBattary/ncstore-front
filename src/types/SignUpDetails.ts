import { UserRole } from './UserRole';

export type CompanySignUpDetails = {
    email: string;
    password: string;
    companyName: string;
    foundationDate: Date | null;
    roles: Array<UserRole>;
};

export type PersonSignUpDetails = {
    email: string;
    password: string;
    nickName: string;
    firstName: string | null;
    lastName: string | null;
    birthday: Date | null;
    roles: Array<UserRole>;
};
