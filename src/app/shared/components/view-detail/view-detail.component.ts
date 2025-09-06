import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DocumentService } from '@core/services/document.service';

@Component({
    selector: 'app-view-detail',
    templateUrl: './view-detail.component.html',
    styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
    uploadForm: FormGroup;
    fileName: string = '';
    fileError: string = '';
    fileIcon: string = 'cloud_upload';
    fileMaxSize = 10 * 1024 * 1024; // 10MB
    allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    summaryMaxLength = 500;
    tags: string[] = [];

    tagOptions: string[] = ['Important', 'Review', 'Personal', 'Work', 'Urgent', 'Archive'];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    postId: string;
    documentDetail: any;

    constructor(private fb: FormBuilder, private documentService: DocumentService, private route: ActivatedRoute) {
        this.uploadForm = this.fb.group({
            file: [null, Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required],
            summary: ['', [Validators.maxLength(this.summaryMaxLength)]],
            tags: [[]],
            sharing: ['private', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.postId = params.get('postId') || '';
        });
        if (this.postId) {
            this.getViewDetail();
        }
    }

    onFileChange(event: any) {
    const file = event.target.files[0];
    this.validateFile(file);
    }

    onDrop(event: any) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.validateFile(file);
    }

    validateFile(file: File) {
    if (!file) return;
    if (!this.allowedTypes.includes(file.type)) {
        this.fileError = 'Chỉ chấp nhận file DOC, PDF, JPG, PNG.';
        this.uploadForm.get('file')?.setValue(null);
        return;
    }
    if (file.size > this.fileMaxSize) {
        this.fileError = 'Dung lượng tối đa 10MB.';
        this.uploadForm.get('file')?.setValue(null);
        return;
    }
    this.fileError = '';
    this.fileName = file.name;
    this.uploadForm.get('file')?.setValue(file);
    }

    onDragOver(event: any) {
    event.preventDefault();
    }

    addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
        this.tags.push(value);
        this.uploadForm.get('tags')?.setValue(this.tags);
    }
    event.input.value = '';
    }

    removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
    this.uploadForm.get('tags')?.setValue(this.tags);
    }

    generateSummaryAI() {
    // TODO: Tích hợp AI
    this.uploadForm.get('summary')?.setValue('AI generated summary...');
    }

    generateTagsAI() {
    // TODO: Tích hợp AI
    this.tags = ['AI', 'Document', 'Generated'];
    this.uploadForm.get('tags')?.setValue(this.tags);
    }

    onSubmit() {
    if (this.uploadForm.invalid) return;
    // TODO: Xử lý upload
    alert('Tài liệu đã được upload!');
    }

    private getViewDetail() {
        this.documentService.viewDetailPost(this.postId).subscribe(res => {
            if (res.code == '00') {
                this.documentDetail = res.data;
            }
        })
    }

}
