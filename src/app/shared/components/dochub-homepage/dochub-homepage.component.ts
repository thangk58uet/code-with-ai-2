import { Component, OnInit } from '@angular/core';
import { Document } from '../document-card/document-card.component';
import { LocalStorageManagerService } from '@core/services/local-store-manager.service';
import { PostService } from '@core/services/post.service';

@Component({
  selector: 'app-dochub-homepage',
  templateUrl: './dochub-homepage.component.html',
  styleUrls: ['./dochub-homepage.component.scss']
})
export class DochubHomepageComponent implements OnInit {
  userName: string = '';
  latestDocuments: Document[] = [];
  featuredDocuments: Document[] = [];
  myDocuments: Document[] = [];

  constructor(
    private localStorage: LocalStorageManagerService,
    private postService: PostService
  ) {}

  ngOnInit() {
    console.log(this.localStorage.getData('UI')?.username)
    this.userName = this.localStorage.getData('UI')?.username;
    this.loadPostList();
  }

  loadPostList() {
    this.postService.getPostList().subscribe((res: any) => {
      this.latestDocuments = res?.data?.latest;
      this.featuredDocuments = res?.data?.feature;
      this.myDocuments = res?.data?.myLatest;
    });
  }

  onDocumentSelected(document: Document) {
    console.log('Document selected:', document);
    // Implement navigation to document details
  }
}
