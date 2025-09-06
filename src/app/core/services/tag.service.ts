import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

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
    private readonly apiUrl = '/tag';

    constructor(private http: HttpClient) {}

    getAllTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${environment.urlSystem}${this.apiUrl}/index`);
    }

    getTagById(id: number): Observable<Tag> {
        return this.http.get<Tag>(`${this.apiUrl}/${id}`);
    }

    createTag(tag: Partial<Tag>): Observable<Tag> {
        return this.http.post<Tag>(this.apiUrl, tag);
    }

    updateTag(id: number, tag: Partial<Tag>): Observable<Tag> {
        return this.http.put<Tag>(`${this.apiUrl}/${id}`, tag);
    }

    deleteTag(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}