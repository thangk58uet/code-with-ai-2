import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private loaderService: LoaderService) { }

    removeRequest(req: HttpRequest<any>, loading: boolean) {
        if (loading) {
            const i = this.requests.indexOf(req);
            if (i >= 0) {
                this.requests.splice(i, 1);
                this.loaderService.divCountLoading();
                if (this.requests.length <= 0) {
                    this.loaderService.isLoading.next(false);
                }
            }
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loading = true
        if ((req.headers.keys() || []).findIndex(x => x == 'loading') >= 0) {
            loading = false;
        }
        if (loading) {
            this.loaderService.start();
            this.requests.push(req);
        }

        return next.handle(req).pipe(
           
            finalize(() => this.removeRequest(req, loading))
        );
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     let loading = true
    //     if ((req.headers.keys() || []).findIndex(x => x == 'loading') >= 0) {
    //         loading = false;
    //     }

    //     if (loading) {
    //         this.loaderService.start();
    //         this.requests.push(req);
    //     }
    //     return Observable.create(observer => {
    //         const subscription = next.handle(req)
    //             .subscribe(
    //                 event => {
    //                     if (event instanceof HttpResponse) {
    //                         if (loading)
    //                             this.removeRequest(req, loading);
    //                         observer.next(event);
    //                     }
    //                 },
    //                 err => {
    //                     if (loading)
    //                         this.removeRequest(req, loading);
    //                     observer.error(err);
    //                 },
    //                 () => {
    //                     if (loading)
    //                         this.removeRequest(req, loading);
    //                     observer.complete();
    //                 });
    //         // remove request from queue when cancelled
    //         return () => {
    //             if (loading)
    //                 this.removeRequest(req, loading);
    //             subscription.unsubscribe();
    //         };
    //     });
    // }
}