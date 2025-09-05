export interface HttpInterface<T> {
    soaErrorCode: string;
    error: string;
    uuid: string;
    timestamp: string;
    data: T;
    duration: number;
    path: string;
    clientMessageId: string;
    soaErrorDesc: string;
    status: number;
}

export interface HttpErrorInterface {
    code?: string | number;
    data?: null;
    message?: string;
    serviceId?: null;
    timestamp?: string;
    status?: number;
    statusText?: string;
}
