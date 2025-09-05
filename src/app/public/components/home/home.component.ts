import { AfterContentInit, Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuCoreService } from '@core/services/menu.core.service';
import { Subscription } from 'rxjs';
import { IdleTimerService } from '../../../core/services/idletimer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterContentInit, OnDestroy {
  events: string[] = [];
  opened = false;
  routeTitle: string;
  titleSubsciption: Subscription = new Subscription();

  constructor(
    private router: Router,
    private menuCoreService: MenuCoreService,
    private idleTimerService: IdleTimerService
  ) {
    this.titleSubsciption.add(
      this.router.events.subscribe((data) => {
        this.routeTitle = this.menuCoreService.getMenuTitleByRoute(data);
      })
    );

    const expiredTime = parseInt(localStorage.getItem("TIMEUIA"), 10);
    if (expiredTime > 0 && expiredTime < Date.now()) {
      this.idleTimerService.clearData();
      return;
    }

    this.idleTimerService.startInterval();
  }

  ngOnDestroy(): void {
    this.titleSubsciption.unsubscribe();
  }

  ngAfterContentInit() {
    this.opened = true;
  }

  openMenu() {
    this.opened = !this.opened;
  }

  marginLeftSideNav(width) {
    if (!this.opened) {
      return { 'margin-left.px': 0 };
    }
    return { 'margin-left.px': width };
  }

  @HostListener('window:keydown')
  @HostListener('window:scroll')
  @HostListener('window:mousemove') checkUserActivity() {
    this.idleTimerService.updateExpiredTime();
  }
}
