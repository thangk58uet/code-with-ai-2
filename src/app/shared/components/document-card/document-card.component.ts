import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface Document {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  rating?: number;
}

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent {
  @Input() document: Document;
  @Input() showRating: boolean = false;
  @Input() showMoreButton: boolean = false;
  @Output() viewDetails = new EventEmitter<Document>();

  constructor(private router: Router) {
  }

  onViewDetails() {
    this.viewDetails.emit(this.document);
  }

  onViewAll() {
    this.router.navigate(['/documents', this.document.id]);
  }
}
