import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TagService } from '@core/services/tag.service';
import { UploadDocumentService } from '@shared/services/upload-document.service';

interface Document {
  id: number;
  title: string;
  author: string;
  created_at: string;
  tags: string[];
  rating: number;
}

@Component({
  selector: 'app-search-documents',
  templateUrl: './search-documents.component.html',
  styleUrls: ['./search-documents.component.scss']
})
export class SearchDocumentsComponent {
  filterForm: FormGroup;
  tagOptions = [];
  groupOptions = ['All', 'Backend', 'Frontend', 'HR', 'AI Team'];
  maxDate = new Date(); // Ngày hiện tại
  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  page = 1;
  pageSize = 10;

  constructor(
    private fb: FormBuilder,
    private uploadDocumentService: UploadDocumentService,
    private datePipe: DatePipe
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      tags: [''],
      dateFrom: [new Date()],
    });
    this.filteredDocuments = this.documents;
  }

  ngOnInit() {
    this.uploadDocumentService.getTags().subscribe((res: any) => {
      if (res?.code === '00') {
        this.tagOptions = res?.data
      }
    });
    this.onFilter();
  }

  onFilter(page?: number) {
    let p = page ?? 1;
    const { search, tags, dateFrom } = this.filterForm.value;
    const date = new Date(dateFrom);
    const formatDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.uploadDocumentService.search(search, tags, formatDate, p, this.pageSize).subscribe(res => {
      if (res.code === '00') {
        this.filteredDocuments = res.data;
      }
    })
    this.page = 1;
  }

  totalPages() {
    return Math.ceil(this.filteredDocuments.length / this.pageSize);
  }

  goToPage(p: number) {
    this.page = p;
    this.onFilter(this.page);
  }
}