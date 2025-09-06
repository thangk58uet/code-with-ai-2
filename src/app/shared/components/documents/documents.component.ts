import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document-card/document-card.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  @Input() title: string = '';
  @Input() documents: Document[] = [];
  @Input() showRating: boolean = false;
  @Input() showMoreButton: boolean = false;
  @Output() documentSelected = new EventEmitter<Document>();

  onDocumentSelected(document: Document) {
    this.documentSelected.emit(document);
  }

  onViewMore() {
    console.log('View more clicked');
    // Implement view more functionality here
  }
}
