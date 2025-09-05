import { Injectable } from '@angular/core';
import { ComponentType, ProgressAnimationType, ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {

  constructor(private toastr: ToastrService) { }
  duration = 4000;
  position = 'toast-top-right';
  preventDuplicates = false;

  getConfig(option?: IndividualConfig): any {
    return {
      timeOut: option && option.timeOut ? option.timeOut : this.duration,
      positionClass: option && option.positionClass ? option.positionClass : this.position
    };
  }

  getTitle(title?: string) {
    if (!title) return "Thông báo";
    else
      return title;
  }

  showToastr(massage: string, title: string, severity: MESSAGE_SERVERITY, option?: IndividualConfig) {
    const config = {
      timeOut: option && option.timeOut ? option.timeOut : this.duration,
      positionClass: option && option.positionClass ? option.positionClass : this.position
    };
    switch (severity) {
      case MessageSeverity.success:
        this.toastr.success(massage, title, config);
        break;
      case MessageSeverity.warning:
        this.toastr.warning(massage, title, config);
        break;
      case MessageSeverity.error:
        this.toastr.error(massage, title, config);
        break;
      default:
        this.toastr.info(massage, title, config);
        break;
    }
  }

  showToastSuccess(massage: string, title?: string, option?: IndividualConfig) {
    const config = this.getConfig(option);
    this.toastr.success(massage, this.getTitle(title), config);
  }

  showToastError(massage: string, title?: string, option?: IndividualConfig) {
    const config = this.getConfig(option);
    this.toastr.error(massage, this.getTitle(title), config);
  }

  showToastInfo(massage: string, title?: string, option?: IndividualConfig) {
    const config = this.getConfig(option);
    this.toastr.info(massage, this.getTitle(title), config);
  }

  showToastWarning(massage: string, title?: string, option?: IndividualConfig) {
    const config = this.getConfig(option);
    this.toastr.warning(massage, this.getTitle(title), config);
  }

}

export enum MessageSeverity {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info'
}

type MESSAGE_SERVERITY = 'success' | 'warning' | 'error' | 'info'

export class IndividualConfig {
  /**
   * disable both timeOut and extendedTimeOut
   * default: false
   */
  disableTimeOut: boolean | 'timeOut' | 'extendedTimeOut';
  /**
   * toast time to live in milliseconds
   * default: 5000
   */
  timeOut: number;
  /**
   * toast show close button
   * default: false
   */
  closeButton: boolean;
  /**
   * time to close after a user hovers over toast
   * default: 1000
   */
  extendedTimeOut: number;
  /**
   * show toast progress bar
   * default: false
   */
  progressBar: boolean;
  /**
   * changes toast progress bar animation
   * default: decreasing
   */
  progressAnimation: ProgressAnimationType;
  /**
   * render html in toast message (possibly unsafe)
   * default: false
   */
  enableHtml: boolean;
  /**
   * css class on toast component
   * default: ngx-toastr
   */
  toastClass: string;
  /**
   * css class on toast container
   * default: toast-top-right
   */
  positionClass: string;
  /**
   * css class on toast title
   * default: toast-title
   */
  titleClass: string;
  /**
   * css class on toast message
   * default: toast-message
   */
  messageClass: string;
  /**
   * animation easing on toast
   * default: ease-in
   */
  easing: string;
  /**
   * animation ease time on toast
   * default: 300
   */
  easeTime: string | number;
  /**
   * clicking on toast dismisses it
   * default: true
   */
  tapToDismiss: boolean;
  /**
   * Angular toast component to be shown
   * default: Toast
   */
  toastComponent?: ComponentType<any>;
  /**
   * Helps show toast from a websocket or from event outside Angular
   * default: false
   */
  onActivateTick: boolean;
  /**
   * New toast placement
   * default: true
   */
  newestOnTop: boolean;
}
