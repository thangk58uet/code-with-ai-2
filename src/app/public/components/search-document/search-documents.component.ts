import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  tagOptions = ['Java', 'Angular', 'DevOps', 'AI', 'Design'];
  groupOptions = ['All', 'Backend', 'Frontend', 'HR', 'AI Team'];
  documents: Document[] = [
    {
      id: 1,
      title: 'Queue In Java Spring Boot',
      author: 'user23',
      created_at: '2025-09-06',
      tags: ['Java', 'Backend'],
      rating: 4.5
    },
    {
      id: 2,
      title: 'Angular Material Guide',
      author: 'user12',
      created_at: '2025-08-21',
      tags: ['Angular', 'Frontend'],
      rating: 4.0
    },
    // ... thêm mock data
  ];
  filteredDocuments: Document[] = [];
  page = 1;
  pageSize = 5;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      search: [''],
      tags: [[]],
      dateFrom: [''],
      dateTo: [''],
      group: ['All']
    });
    this.filteredDocuments = this.documents;
  }

  onFilter() {
    const { search, tags, dateFrom, dateTo, group } = this.filterForm.value;
    this.filteredDocuments = this.documents.filter(doc => {
      const matchSearch = !search || doc.title.toLowerCase().includes(search.toLowerCase());
      const matchTags = !tags.length || tags.every((tag: string) => doc.tags.includes(tag));
      const matchGroup = group === 'All' || doc.tags.includes(group);
      const matchDateFrom = !dateFrom || new Date(doc.created_at) >= new Date(dateFrom);
      const matchDateTo = !dateTo || new Date(doc.created_at) <= new Date(dateTo);
      return matchSearch && matchTags && matchGroup && matchDateFrom && matchDateTo;
    });
    this.page = 1;
  }

  get pagedDocuments() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredDocuments.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.filteredDocuments.length / this.pageSize);
  }

  goToPage(p: number) {
    this.page = p;
  }
}