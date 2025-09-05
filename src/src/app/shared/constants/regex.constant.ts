export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const CURRENCY_REGEX = /\B(?=(\d{3})+(?!\d))/g;
export const NUMBER_ONLY_REGEX = /\D/g;
export const ALLOW_ONLY_NUMBER_TEXT = /^[a-zA-Z0-9 ]+$/;
export const USER_ID_REGEX = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

export enum REGEX_CODE {
    PASSWORD_REGEX = 'password',
    USER_ID_REGEX = 'userId',
    EMAIL_REGEX = 'email',
    ALLOW_ONLY_NUMBER_TEXT = 'allowOnlyNumberAndText'
}

export const REGEX = {
    [REGEX_CODE.PASSWORD_REGEX]: PASSWORD_REGEX,
    [REGEX_CODE.EMAIL_REGEX]: EMAIL_REGEX,
    [REGEX_CODE.ALLOW_ONLY_NUMBER_TEXT]: ALLOW_ONLY_NUMBER_TEXT,
    [REGEX_CODE.USER_ID_REGEX]: USER_ID_REGEX,
}
