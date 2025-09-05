import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { appInitializerProviders } from '@core/initializers';
import { httpInterceptorProviders } from './core/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { APP_BASE_HREF, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    PublicModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders,
    appInitializerProviders,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    // { provide: APP_BASE_HREF, useValue: '/view'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
