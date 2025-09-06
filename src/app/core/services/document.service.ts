import { Router } from "@angular/router";
import { HttpClientService } from "./httpclient.service";
import { HttpOptions } from "./model/request.base.dto";
import { PATH, URL_SYSTEM } from "@core/utils/constant";
import { map } from "rxjs/operators";
import { HttpInterface } from "./model/response.base.dto";
import { Injectable } from "@angular/core";

@Injectable()
export class DocumentService {
    constructor(
        private router: Router,
        private httpClient: HttpClientService,
    ) { }

    viewDetailPost(postId: string) {
        const opstions: HttpOptions = {
            path: PATH.VIEW_DETAIL_POST,
            url: URL_SYSTEM,
            params: {
                postId: postId
            }
        };
        return this.httpClient.get(opstions).pipe(
            map((response: HttpInterface<any>) => {
                return response;
            })
        );

    }

    addComment(postId: string, comment: string, star: number) {
        const opstions: HttpOptions = {
            path: PATH.ADD_COMMENT,
            url: URL_SYSTEM,
            body: {
                comment: comment,
                star: star,
                postId: postId
            }
        };
        return this.httpClient.post(opstions).pipe(
            map((response: HttpInterface<any>) => {
                return response;
            })
        );

    }

    getComment(postId: string) {
        const opstions: HttpOptions = {
            path: PATH.GET_COMMENT,
            url: URL_SYSTEM,
            params: {
                postId: postId
            }
        };
        return this.httpClient.get(opstions).pipe(
            map((response: HttpInterface<any>) => {
                return response;
            })
        );

    }
}