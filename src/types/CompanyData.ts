import { UserType } from './UserType';
import { UserRole } from './UserRole';

export type CompanyData = {
    email: string;
    balance: number;
    userType: UserType;
    companyName: string;
    description: string | null;
    foundationDate: Date;
    roles: Array<UserRole>;
};
