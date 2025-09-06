import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/helpers/auth-guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UploadDocumentComponent } from '@shared/components/upload-document/upload-document.component';
import { ViewDetailComponent } from '@shared/components/view-detail/view-detail.component';
import { SearchDocumentsComponent } from './components/search-document/search-documents.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children:
    [
      {
        path: '', loadChildren: () => import('../features/feature.module').then(m => m.FeatureModule)
      },
      {
        path: 'create-document', component: UploadDocumentComponent
      },
      {
        path: 'view-detail/:postId',
        component: ViewDetailComponent
      },
      {
        path: 'search',
        component: SearchDocumentsComponent
      }
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '404', component: ErrorComponent },
  { path: 'accessDenied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: false, enableTracing: false, onSameUrlNavigation: 'reload' }),
  ]
})
export class PublicRoutingModule { }
