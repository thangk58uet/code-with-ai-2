import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TagService } from '@core/services/tag.service';

export interface UploadResponse {
    id: string;
    filename: string;
    url: string;
    size: number;
    uploadedAt: Date;
}

export interface UploadProgress {
    progress: number;
    status: 'uploading' | 'completed' | 'error';
}

@Injectable({
    providedIn: 'root'
})
export class UploadDocumentService {

    constructor(
        private http: HttpClient,
        private tagService: TagService
    ) {}

    getTags(): Observable<any> {
        return this.tagService.getAllTags();
    }
}