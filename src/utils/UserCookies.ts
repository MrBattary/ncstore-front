import Cookies from 'universal-cookie';
import { SignInResponse } from '../types/SignInDetails';
import CookieEnum from '../types/CookieEnum';

class UserCookies<T extends SignInResponse> {
    private readonly cookies: Cookies = new Cookies();
    private readonly cookiesMaxAgeAsSeconds: number;
    private usedCookies: Array<CookieEnum> = [];

    constructor(cookiesMaxAgeAsSeconds: number) {
        this.cookiesMaxAgeAsSeconds = cookiesMaxAgeAsSeconds;
    }

    setNewCookiesFromResponse(response: T) {
        this.addNewCookie(CookieEnum.USER_ID, response.userId);
        this.addNewCookie(CookieEnum.USER_TYPE, response.type);
        this.addNewCookie(CookieEnum.TOKEN, response.token);
        this.addNewCookie(CookieEnum.ROLES, response.roles);
    }

    addNewCookie(cookieType: CookieEnum, coolieValue: any) {
        this.cookies.set(cookieType, coolieValue, {
            path: '/',
            maxAge: this.cookiesMaxAgeAsSeconds,
        });
        if (!this.usedCookies.includes(cookieType)) {
            this.usedCookies.push(cookieType);
        }
    }

    getCookieOrDefaultValue(cookieType: CookieEnum, defaultValue: any): any {
        const cookie = this.cookies.get(cookieType);
        if (cookie) {
            return cookie;
        } else {
            return defaultValue;
        }
    }

    clearCookie(cookie: CookieEnum) {
        this.cookies.remove(cookie);
        this.usedCookies = this.usedCookies.filter((checkingCookie: CookieEnum) => cookie !== checkingCookie);
    }

    clearAllCookies() {
        const usedCookiesBearingArray = [...this.usedCookies];
        usedCookiesBearingArray.forEach((usedCookie: CookieEnum) => this.clearCookie(usedCookie));
    }
}

export default UserCookies;
