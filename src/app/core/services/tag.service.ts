import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClientService } from './httpclient.service';
import { HttpOptions } from './model/request.base.dto';
import { url } from 'inspector';

export interface Tag {
    id: number;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Injectable({
    providedIn: 'root'
})
export class TagService {
    private readonly baseUrl = '/tag';

    constructor(private http: HttpClientService) {}

    getAllTags(): Observable<Tag[]> {
        const options: HttpOptions = {
            url: `${environment.urlSystem}${this.baseUrl}`,
            path: 'index'
        }
        return this.http.get<Tag[]>(options);
    }
}