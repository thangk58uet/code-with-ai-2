import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface Document {
  id: number;
  title: string;
  file_name: string;
  file_name_original: string;
  path: string;
  short_description: string;
  sharing: number;     // có thể là enum: 1=Private, 2=Group, 3=Public
  group_id: number;
  username: string;
  created_at: string;  // hoặc Date
  updated_at: string;  // hoặc Date
  comments_avg_star: string; // có thể đổi thành number nếu backend trả số
  tags: Tags[];
}


export interface Tags {
  id: number;
  post_id: number;
  tag_name: string;
  created_at: string;  // ISO Date string
  updated_at: string;  // ISO Date string
}


@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent {
  @Input() document: Document;
  @Input() showMoreButton: boolean = false;

  constructor(private router: Router) {}

  onViewDetails() {
    this.router.navigate(['/view-detail', this.document.id])
  }

  onViewAll() {
    this.router.navigate(['/documents', this.document.id]);
  }
}
