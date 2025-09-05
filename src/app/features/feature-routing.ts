import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'feature-1',
                // loadChildren: () => import('./system-settings/system-settings.module').then(m => m.SystemSettingsModule)
            },
            {
                path: 'feature-2',
                // loadChildren: () => import('./system-settings/system-settings.module').then(m => m.SystemSettingsModule)
            },
            {
                path: 'feature-3',
                // loadChildren: () => import('./system-settings/system-settings.module').then(m => m.SystemSettingsModule)
            },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class FeatureRoutingModule {
}
