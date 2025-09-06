import CommonUtils from "@core/utils/utils";
import { Component, OnInit } from "@angular/core";
import { MenuCoreService } from "@core/services/menu.core.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "@core/services/authentication.service";
import { MessageSeverity, ToastService } from "@core/services/toast.service";
import { group } from "console";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  constructor(
    private menu: MenuCoreService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
  ) { }
  action = 'login';
  groupOptions: any[];
  selectedGroup: number;

  ngOnInit(): void {
    this.getGroupIndex();
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.registerForm = this.formBuilder.group({
      usernameRegister: ["", Validators.required, Validators.maxLength(25)],
      passwordRegister: ["", Validators.required, Validators.maxLength(40), Validators.minLength(6)],
      groupId: [1, Validators.required],
    });
  }

  private getGroupIndex() {
    this.authenticationService.getGroupIndex().subscribe(res => {
      if (res.code == '00' && res.data) {
        this.groupOptions = res.data;
      }
    })
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
      .login(username, password).subscribe(res => {
          if (res.code == '00') {
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
          } else {
            this.toastService.showToastr(
              '' + res.message,
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

  registerAccount() {
    this.action = this.action == 'register' ? 'login' : 'register';
  }

  register() {
    debugger;
    // if (this.registerForm.invalid) {
    //   this.toastService.showToastr(
    //     'Vui lòng nhập đầy đủ username và password',
    //     'Thông báo!',
    //     MessageSeverity.warning
    //   );
    //   return;
    // }
    let { usernameRegister, passwordRegister, groupId } = this.registerForm.getRawValue();
    this.authenticationService.register(usernameRegister, passwordRegister, groupId).subscribe(res => {
      if (res.code == '00') {
        this.toastService.showToastr(
          'Đăng ký thành công',
          'Thông báo!',
          MessageSeverity.success
        );
        this.registerAccount();
      } else {
        this.toastService.showToastr(
          res.message,
          'Thông báo!',
          MessageSeverity.error
        );
      }
    })
  }
  
}
