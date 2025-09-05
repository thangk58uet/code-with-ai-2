import { HttpErrorInterface, HttpInterface } from './../services/model/response.base.dto';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { MessageSeverity, ToastService } from '@core/services/toast.service';
import { ConfirmDialogService } from '@shared/services/confirm-dialog.service';
import { CommonDialogData } from '@shared/models/dialog.model';
import { LoaderService } from '@core/services/loader.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  dataDialog: CommonDialogData
  constructor(
    private authService: AuthenticationService,
    private toastService: ToastService,
    private confirmDialogService: ConfirmDialogService,
    private loaderService: LoaderService,
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.handleErrorReq(error))
    );
  }

  private handleErrorReq(error: HttpErrorResponse): Observable<never> {
    let msg = '';
    var httpError: HttpInterface<any>;
    switch (error.status) {
      case 401:
        this.authService.clearData();
        this.loaderService.stop();
        if (error && error.error) {
          httpError = error.error;
          msg = `${error.error.soaErrorDesc || error.error.error}`;
          this.dataDialog = {
            type: 'error',
            title: 'Thông báo',
            content: msg
          }
          this.confirmDialogService.open(this.dataDialog);
        }
        break;
      case 403:
        this.loaderService.stop();
        this.toastService.showToastWarning('Bạn không có quyền thực hiện chức năng này!');
        break;
      case 404:
        this.loaderService.stop();
        this.dataDialog = {
          type: 'error',
          title: 'Thông báo',
          content: 'Không tìm thấy đường dẫn Api. Vui lòng thông báo lỗi cho bộ phận IT.'
        }
        this.confirmDialogService.open(this.dataDialog);
        break;
      case 500:
        if (error && error.error) {
          httpError = error.error;
          msg = `${error.error.soaErrorDesc || error.error.error}`;
          this.dataDialog = {
            type: 'error',
            title: 'Thông báo',
            content: 'Có lỗi trong quá trình xử xý: ' + msg
            // content: 'Có lỗi trong quá trình xử xý: ' + msg + "<br> " + httpError.clientMessageId
          }
          this.confirmDialogService.open(this.dataDialog);
        }
        break;
      default:
        this.loaderService.stop();
        if (error && error.error) {
          let err = error.error
          if(typeof(error.error) == 'string'){
            err = JSON.parse(error.error.toString())
          }
          msg = `${err.error || err.soaErrorDesc}`;
          this.dataDialog = {
            type: 'error',
            title: 'Thông báo',
            content: msg
            // content: msg + "<br> " + err.clientMessageId
          }
          this.confirmDialogService.open(this.dataDialog);
        } else {
          this.dataDialog = {
            type: 'error',
            title: 'Thông báo',
            content: 'Không thể kết nối tới Server. Vui lòng thông báo lỗi cho bộ phận IT.'
          }
          this.confirmDialogService.open(this.dataDialog);
        }
        break;
    }
    return throwError(error);
  }
}
