import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    SidebarLeftComponent,
    SubMenuComponent,
    UserInfoComponent,
  ],
  imports: [
    SharedModule,
    PublicRoutingModule,
    ChartsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PublicModule { }
