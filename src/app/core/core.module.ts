import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './helpers/auth-guard';
import { ToastService } from './services/toast.service';
import { AutoAuthGuard } from './helpers/auto-auth.guard';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthGuard,
    AutoAuthGuard,
    ToastService
  ]
})
export class CoreModule { }
