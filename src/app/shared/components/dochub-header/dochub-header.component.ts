import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'app-dochub-header',
  templateUrl: './dochub-header.component.html',
  styleUrls: ['./dochub-header.component.scss']
})
export class DochubHeaderComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }
  searchQuery: string = '';

  onSearch() {
    console.log('Searching for:', this.searchQuery);
    // Implement search functionality here
  }

  logout() {
    console.log('logout')
    this.authenticationService.logout();
    // Implement profile functionality here
  }

  navigateToCreateDocument() {
    console.log('Navigating to create document');
    // Implement create document functionality here
    this.router.navigate(['/create-document']);
  }
  
  navigateToHomePage() {
    this.router.navigate(['/'])
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }
}
