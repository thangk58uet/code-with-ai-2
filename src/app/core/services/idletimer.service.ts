import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { MessageSeverity, ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class IdleTimerService {
  timeout = 3600;
  interval: any;
  timeoutTracker: any;

  constructor(private authenticationService: AuthenticationService, private toastr: ToastService) { }

  updateExpiredTime() {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker)
    }

    this.timeoutTracker = setTimeout(() => {
      const expiredTime = Date.now() + this.timeout * 1000;
      localStorage.setItem('TIMEUIA', JSON.stringify(expiredTime));
    }, 300);
  }

  startInterval() {
    this.updateExpiredTime();

    this.interval = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem('TIMEUIA'), 10);

      if (expiredTime < Date.now()) {
        this.clearData();
      }
    }, 1000)
  }

  clearTimer() {
    localStorage.removeItem("TIMEUIA");
    clearInterval(this.interval);
  }

  clearData() {
    this.authenticationService.logout();
    this.clearTimer();

    this.toastr.showToastr(
      `User has been inactive for a long time!`,
      'Thông báo!',
      MessageSeverity.error
    );
  }
}
