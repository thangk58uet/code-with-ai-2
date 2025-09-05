import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'bpm-loading',
  templateUrl: './bpm-loading.component.html',
  styleUrls: ['./bpm-loading.component.scss'],
})
export class BpmLoadingComponent implements OnInit, AfterViewInit, OnDestroy {
  countLoading: number = 0;
  loading: boolean;
  lstSubscription: Subscription = new Subscription();

  constructor(
    private loaderService: LoaderService) {
  }

  viewScroll(view: boolean) {
    // const el = document.querySelector("html");
    // if (!view) {
    //   if (!el.className.includes('cdk-global-scrollblock')) {
    //     el.className += 'cdk-global-scrollblock';
    //   }
    // }
    // else {
    //   if (el.classList.contains("cdk-global-scrollblock")) {
    //     el.classList.remove("cdk-global-scrollblock");
    //   }
    // }
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.loading = false;
    this.lstSubscription.add(this.loaderService.isLoading.pipe(delay(0)).subscribe((v) => {
      this.loading = v;
      if(v == false) {
        if (this.countLoading > 0) {
          --this.countLoading;
          //this.viewScroll(false);
        }
      } else {
        ++this.countLoading;
        //this.viewScroll(true);
      }
    }));

    // this.lstSubscription.add(this.loaderService.countLoading.pipe(delay(0)).subscribe((value) => {
    //   this.countLoading += value;
    // }));
  }

  ngOnDestroy(): void {
    this.lstSubscription.unsubscribe();
  }

}