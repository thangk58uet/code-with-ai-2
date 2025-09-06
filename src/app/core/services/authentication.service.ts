import { of } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Login } from './model/login.dto';
import { Injectable } from '@angular/core';
import { MenuCoreService } from './menu.core.service';
import { JwtHelper } from '../helpers/jwt-helper';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, take, tap } from 'rxjs/operators';
import { HttpOptions } from './model/request.base.dto';
import { HttpClientService } from './httpclient.service';
import { HttpInterface } from './model/response.base.dto';
import { PATH, STATUS, URL_SYSTEM } from '@core/utils/constant';
import { LocalStorageEnum } from '@shared/models/enum/local-store.enum';
import { LocalStorageManagerService } from './local-store-manager.service';


@Injectable()
export class AuthenticationService {
  private readonly STORAGE: string[] = ['JWT', 'RJWT', 'TE', 'UI'];
  private timeoutExporation: any;
  constructor(
    private router: Router,
    private menu: MenuCoreService,
    private jwtHelper: JwtHelper,
    private httpClient: HttpClientService,
    private localStorage: LocalStorageManagerService
  ) {}

  /**
   * xử lý button login
   * @param authentication
   * @returns
   */
  login(username: string, password: string) {
    const opstions: HttpOptions = {
      path: PATH.GENERATE_TOKEN,
      url: URL_SYSTEM,
      body: {
        username: username,
        password: password
      },
      isAuthentication: false,
    };
    // call api /generate-token
    return this.httpClient.post(opstions).pipe(
      tap((response: HttpInterface<Login>) => {
        this.storeSession(response.data);
      }),
      map((response: HttpInterface<Login>) => {
        //this.startRefreshTokenTimer();
        return response;
      })
    );

  }

  register(username: string, password: string, groupId) {
    const opstions: HttpOptions = {
      path: PATH.REGISTER_USER,
      url: URL_SYSTEM,
      body: {
        username: username,
        password: password,
        groupId: groupId
      },
      isAuthentication: false,
    };
    // call api /generate-token
    return this.httpClient.post(opstions).pipe(
      map((response: HttpInterface<any>) => {
        return response;
      })
    );
  }

  getGroupIndex() {
    const opstions: HttpOptions = {
      path: PATH.GET_GROUP_USER,
      url: URL_SYSTEM,
      isAuthentication: false,
    };
    return this.httpClient.get(opstions).pipe(
      map((response: HttpInterface<any>) => {
        return response;
      })
    );

  }

  /**
   * xử lý button logout
   */
  logout() {
    // const opstions: HttpOptions = {
    //   path: PATH.REVOKE_TOKEN,
    //   url: URL_SYSTEM,
    //   params: { token: this.localStorage.getData(LocalStorageEnum.RefreshToken) },
    // };
    // // call api /revoke-token
    // this.httpClient.delete(opstions).pipe(take(1)).subscribe(res => {this.clearData()});
    this.clearData()
  }

  /**
   * xóa timer đc set bởi setTimeout()
   * xóa data trong local storage
   * reset menu
   * điều hướng user về lại trang login
   */
  clearData() {
    this.stopRefreshTokenTimer();
    this.clearClientStorage();
    this.menu.reset();
    this.router.navigate(['/login']);
  }

  /**
   * check token có còn hiệu lực cho current user hay không
   * @returns
   */
  tokenValid(): boolean {
    return this.isStoreDataValid();
  }

  /**
   * khởi chạy khi start ứng dụng
   *
   */
  startToken() {
    if (this.tokenValid()) {
      const dateExpiration = this.localStorage.getData(LocalStorageEnum.Date_Expiration);
      if (!moment().isSame(moment(dateExpiration), 'day')) {
        this.clearData();
      }
      if (!this.timeoutExporation && this.localStorage.exists(LocalStorageEnum.RefreshToken)) {
        this.startRefreshTokenTimer();
      }
    }
  }

  //---------------------================================---------------------//
  //---------------------================================---------------------//
  //---------------------================================---------------------/

  /**
   * set user information: UI xuống local storage
   * @param user
   */
  private setUserToLocalStorage(user: any) {
    this.localStorage.savePermanentData(user, LocalStorageEnum.User_Infor);
  }

  /**
   * set Refresh token: RJWT xuống local storage
   * @param token
   */
  private setRefreshToken(token: string) {
    if (!this.localStorage.exists(LocalStorageEnum.RefreshToken)) {
      this.localStorage.savePermanentData(token, LocalStorageEnum.RefreshToken);
    }
  }

  /**
   * set Time Expiration: TE xuống local storage
   * @param time
   */
  private setTimeExpiration(time: number) {
      this.localStorage.savePermanentData(time/1000, LocalStorageEnum.Time_Expiration);
      this.localStorage.savePermanentData(new Date(), LocalStorageEnum.Date_Expiration);
  }

  /**
   * set token: JWT xuống local storage
   * @param token
   */
  private setToken(token: string) {
    this.localStorage.savePermanentData(token, LocalStorageEnum.Token);
  }

  /**
   * clear session + local storage
   */
  private clearClientStorage() {
    this.localStorage.clearAllStorage();
  }

  /**
   * clear timeout
   */
  private stopRefreshTokenTimer() {
    clearTimeout(this.timeoutExporation);
  }

  /**
   * lưu thông tin: JWT, RJWT, TE, UI, ML xuống local storage
   * @param data
   * @param isRefresh
   */
  public storeSession(data: Login, isRefresh = true) {
    const decodedAccessToken = this.jwtHelper.decodeToken(data.token);
    this.setToken(data.token);
    this.setRefreshToken(data.token);
    this.setTimeExpiration(data.expires_in);
    if (isRefresh) {
      this.setUserToLocalStorage(decodedAccessToken);
      // sort left menu by sortOrder
      //data.menus.sort(function(a,b) {return (a.sortOrder > b.sortOrder) ? 1 : ((b.sortOrder > a.sortOrder) ? -1 : 0);} );
      //this.setMenuListToLocalStorage(data.menus, LocalStorageEnum.Menu_List);
    }
  }

private setMenuListToLocalStorage(menuList: any[], key = LocalStorageEnum.Menu_List) {
  this.localStorage.savePermanentData(menuList, key);
}

  /**
   * Xử lý refresh token theo thời gian
   */
  private refreshToken = () => {
    const opstions: HttpOptions = {
      path: PATH.GENERATE_TOKEN,
      url: URL_SYSTEM,
      params: {
        grantType: 'REFRESH_TOKEN',
        token: this.localStorage.getData(LocalStorageEnum.RefreshToken),
      },
      isAuthentication: false,
    };
    return this.httpClient.get(opstions).pipe(
      tap((response: any) => this.storeSession(response.data, false)),
      map((response: any) => {
        this.startRefreshTokenTimer();
        return response;
      }),
      catchError(_ => of({ status: 500 }))
    );
  };

  public startRefreshTokenTimer() {
    const expires = moment(this.localStorage.getData(LocalStorageEnum.Date_Expiration)).add(this.localStorage.getData(LocalStorageEnum.Time_Expiration), 'seconds');
    const timeData = expires.diff(moment(new Date()), 'seconds');
    if (timeData && timeData > 0) {
      this.timeoutExporation = setTimeout(
        () =>
          this.refreshToken().subscribe((res) => {
            if (res && res.status === STATUS.ERROR) {
              this.clearData();
            }
          }),
        timeData * 1000
      );
    }
  }

  /**
   * check liệu "JWT", "RJWT", "TE", "UI" đã tồn tại trong local storage hay chưa
   * @returns
   */
  private isStoreDataValid(): boolean {
    for (const x of this.STORAGE) {
      if (!this.localStorage.exists(x)) {
        return false;
      }
    }
    return true;
  }
}
