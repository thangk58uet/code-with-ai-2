import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpclient.service';
import { P } from '@angular/cdk/keycodes';
import { HttpOptions } from './model/request.base.dto';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private readonly baseUrl = '/post';

    constructor(private http: HttpClientService) {}

    postDocument(
        file: File,
        title: string,
        description: string,
        sharing: 1 | 2 | 3,
        tags: string[],
    ): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('short_description', description);
        formData.append('sharing', sharing.toString());
        formData.append('tags', tags.join(','));
        const options: HttpOptions = {
            url: `${environment.urlSystem}${this.baseUrl}`,
            body: formData,
            isAuthentication: true,
            path: 'create'
        };

        return this.http.post(options);
    }

    getPostList(): Observable<HttpEvent<any>> {
        const options: HttpOptions = {
            url: `${environment.urlSystem}/user/post`,
            isAuthentication: true,
            path: 'view'
        };

        return this.http.get(options);
    }
<<<<<<< Updated upstream
    search(key: string, tag: string, date: string, pageNumber: number, pageSize: number): Observable<any> {
        let params = {}
        if (key) params = {...params, key}
        if (tag) params = {...params, tag}
        if (date) params = {...params, date}
        if (pageNumber) params = {...params, pageNumber}
        if (pageSize) params = {...params, pageSize}
        const options: HttpOptions = {
            url: `${environment.urlSystem}/user/post`,
            isAuthentication: true,
            path: 'search',
            params
        };
        console.log(options.params, pageNumber, pageSize)

        return this.http.get(options);
    }
=======

    editDocument(
        file: File,
        title: string,
        description: string,
        sharing: 1 | 2 | 3,
        tags: string[],
        postId: string
    ): Observable<HttpEvent<any>> {
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('title', title);
        formData.append('short_description', description);
        formData.append('sharing', sharing.toString());
        formData.append('tags', tags.join(','));
        formData.append('postId', postId);
        const options: HttpOptions = {
            url: `${environment.urlSystem}/post`,
            body: formData,
            isAuthentication: true,
            path: 'edit'
        };

        return this.http.post(options);
    }
    
>>>>>>> Stashed changes
}
