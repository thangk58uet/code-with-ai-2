import { environment } from '@env/environment';

export const URL_SYSTEM = environment.urlSystem;
export const STATUS = { SUCCESS: 0, ERROR: 500 };


export const PATH = {
    GENERATE_TOKEN: 'public/login',
    GET_GROUP_USER: 'public/group/index',
    REGISTER_USER: 'public/register',
    VIEW_DETAIL_POST: 'post/detail',
    AUTO_GENERATE_TOKEN: 'generate-token-url',
    ADD_COMMENT: 'comment/create',
    GET_COMMENT: 'post/comments',
};

export enum RESPONSE_MESSAGE {
    SUCCESS = 'Success!',
}

export enum REQUEST_STATUS_FCRM {
    NEW = 'NEW',
    EDITED = 'EDITED',
    CANCELLED = 'CANCELLED',
}
