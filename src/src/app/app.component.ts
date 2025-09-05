import { PreloaderService } from "@core/services/preloader.service";
import { AuthenticationService } from "@core/services/authentication.service";
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-root",
  template: "<router-outlet><bpm-loading></bpm-loading></router-outlet>",
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private preloaderService: PreloaderService,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.auth.startToken();
  }
  ngAfterViewInit(): void {
    this.preloaderService.hide();
  }
}
