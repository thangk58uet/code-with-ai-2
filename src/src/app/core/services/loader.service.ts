import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  public countLoading = new BehaviorSubject(0);

  constructor() { }

  start() {
    this.addCountLoading();
    this.isLoading.next(true);
  }

  stop() {
    this.divCountLoading();
    this.isLoading.next(false);
  }

  addEvent(value: boolean) {
    this.isLoading.next(value);
  }

  divCountLoading() {
    this.countLoading.next(-1);
  }

  addCountLoading() {
    this.countLoading.next(1);
  }

}
