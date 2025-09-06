import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { LocalStorageManagerService } from '@core/services/local-store-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string;
  constructor(private authenticationService: AuthenticationService, private localStorage: LocalStorageManagerService) { }

  ngOnInit(): void {
    this.userName = this.localStorage.getData('UI').username;
  }

  logout() {
    this.authenticationService.logout();
  }
}
