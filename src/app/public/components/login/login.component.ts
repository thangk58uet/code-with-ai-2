import CommonUtils from "@core/utils/utils";
import { Component, OnInit } from "@angular/core";
import { MenuCoreService } from "@core/services/menu.core.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "@core/services/authentication.service";
import { MessageSeverity, ToastService } from "@core/services/toast.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private menu: MenuCoreService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  /**
   * xử lý khi user click login
   * @returns
   */
  login() {
    if (this.loginForm.invalid) {
      this.toastService.showToastr(
        'Vui lòng nhập đầy đủ username và password',
        'Thông báo!',
        MessageSeverity.warning
      );
      return;
    }
    const { username, password } = this.loginForm.value;
    const authentication = CommonUtils.convertObjectToBase64(
      `${username}:${password}`
    );
    this.authenticationService
      .login(username, password).subscribe(
        () => {
          if (this.authenticationService.tokenValid()) {
            this.menu.navigateToHome();
            this.toastService.showToastr(
              'Đăng nhập thành công',
              'Thông báo!',
              MessageSeverity.success
            );
          } else {
            this.toastService.showToastr(
              'Bạn không có quyền truy cập',
              'Thông báo!',
              MessageSeverity.error
            );
          }
        },
        (error) => {
          this.toastService.showToastr(
            '' + error.error.message,
            'Thông báo!',
            MessageSeverity.error
          );
        }
      );
  }
}
