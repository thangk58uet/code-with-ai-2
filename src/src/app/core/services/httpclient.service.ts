import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { URL_SYSTEM } from "@core/utils/constant";
import { HttpClient } from "@angular/common/http";
import { HttpOptions } from "./model/request.base.dto";
import { LocalStorageEnum } from "@shared/models/enum/local-store.enum";
import { LocalStorageManagerService } from "./local-store-manager.service";
import * as uuid from 'uuid';
export enum Verbs {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}
@Injectable({ providedIn: 'root' })
export class HttpClientService {
    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageManagerService,
    ) {
    }
    get<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.GET, options);
    }

    delete<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.DELETE, options);
    }

    post<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.POST, options);
    }

    put<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.PUT, options);
    }
    httpCall(verb: Verbs, options: HttpOptions): Observable<any> {
        // Setup default values
        const clientMessageId = uuid.v4();
        const userInfo = this.localStorage.getData(LocalStorageEnum.User_Infor);
        // Setup default values
        options.body = options.body ?? null;
        options.headers = options.headers ?? {};
        options.isAuthentication = options.isAuthentication ?? true;
        if (options.isAuthentication) {
            options.headers = { ...options.headers, ClientMessageId: clientMessageId, Authorization: `Bearer ${this.localStorage.getData(LocalStorageEnum.Token)}` };
            if (userInfo) {
                options.headers = { ...options.headers, ClientUserId: userInfo.user_id};
            }
        }
        return this.http.request(verb, `${options.url ?? URL_SYSTEM}/${options.path}`, {
            body: options.body,
            headers: options.headers,
            params: options.params ?? null,
            responseType: options.responseType || 'json',
            observe: options.observe || 'body'
        });
    }
}