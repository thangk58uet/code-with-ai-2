import { NgModule } from '@angular/core';
import { FeatureRoutingModule } from './feature-routing';
import { HomeComponent } from '@features/home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        FeatureRoutingModule,
        RouterModule,
    ]
})
export class FeatureModule {
}
