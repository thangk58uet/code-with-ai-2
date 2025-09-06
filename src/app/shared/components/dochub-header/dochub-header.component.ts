import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dochub-header',
  templateUrl: './dochub-header.component.html',
  styleUrls: ['./dochub-header.component.scss']
})
export class DochubHeaderComponent {
  constructor(private router: Router) {
  }
  searchQuery: string = '';

  onSearch() {
    console.log('Searching for:', this.searchQuery);
    // Implement search functionality here
  }

  onProfileClick() {
    console.log('Profile clicked');
    // Implement profile functionality here
  }

  navigateToCreateDocument() {
    console.log('Navigating to create document');
    // Implement create document functionality here
    this.router.navigate(['/create-document']);
  }
  
}
