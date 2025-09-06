import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TagService } from '@core/services/tag.service';
import { PostService } from '@core/services/post.service';

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
        private tagService: TagService,
        private postService: PostService
    ) {}

    getTags(): Observable<any> {
        return this.tagService.getAllTags();
    }

    postDocument(file: File, title: string, description: string, sharing: 1 | 2 | 3, tags: string[]): Observable<any> {
        return this.postService.postDocument(file, title, description, sharing, tags);
    }

<<<<<<< Updated upstream
    search(key: string, tag: string, date: string, page: number, pageSize: number): Observable<any> {
        console.log(key, tag, date, page, pageSize)
        return this.postService.search(key, tag, date, page, pageSize);
=======
    editDocument(file: File, title: string, description: string, sharing: 1 | 2 | 3, tags: string[], postId: string): Observable<any> {
        return this.postService.editDocument(file, title, description, sharing, tags, postId);
>>>>>>> Stashed changes
    }
}