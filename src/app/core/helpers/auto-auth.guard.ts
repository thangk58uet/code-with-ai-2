import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { LoaderService } from '@core/services/loader.service';
import { Login } from '@core/services/model/login.dto';
import { HttpInterface } from '@core/services/model/response.base.dto';
import { ToastService } from '@core/services/toast.service';
import { PATH, URL_SYSTEM } from '@core/utils/constant';
import CommonUtils from '@core/utils/utils';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoAuthGuard implements CanActivate {
  subscription: Subscription;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private auth: AuthenticationService,
    private loaderService: LoaderService,
    private toastService: ToastService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.loaderService.isLoading.next(true);
    return this.checkToken(state);
  }

  checkToken(state: RouterStateSnapshot): Observable<boolean> {
    var objSearch = CommonUtils.queryStringToObject(window.location.search || "");
    var authparam = encodeURIComponent(objSearch.bpmid || "");
    if (!authparam) {
      this.redirect403(state);
      return of(false);
    }
    else {
      const path = `${URL_SYSTEM}/${PATH.AUTO_GENERATE_TOKEN}?bpmid=${authparam}`;
      return this.httpClient.get(path).pipe(
        tap((response: HttpInterface<Login>) => {
          this.auth.storeSession(response.data);
        }),
        map((response: HttpInterface<Login>) => {
          this.auth.startRefreshTokenTimer();
          if (response.status === 200 && response.data.accessToken)
            return true;
          else {
            this.redirect403(state);
            return false;
          }
        }),
        catchError((err) => {
          this.redirect403(state);
          return of(false);
        })
      );
    }
  }

  redirect403(state: RouterStateSnapshot) {
    this.toastService.showToastWarning('Bạn không có quyền truy cập!');
    this.router.navigate(['/403'], { queryParams: { url: state.url } });
  }
}
