import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientService } from './httpclient.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private readonly baseUrl = '/api/post';

    constructor(private http: HttpClientService) {}

    uploadFile(file: File, title: string, description: string, sharing: 1|2|3): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('short_description', description);
        formData.append('sharing', sharing.toString());
        const options = {
            url: `${this.baseUrl}/create`,
            body: formData,
            isAuthentication: true,
        }

        return this.http.get(options);
    }
}