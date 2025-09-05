import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { TABLE_EVENT_TYPE } from '@shared/constants/table.constant';
import { TableEvent } from '@shared/models/table.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

type pagingEvent = 'first' | 'last';

@Component({
    template: ''
})
export abstract class TableUtilAbstractComponent implements OnDestroy {

    private readonly subscriptions = new Subscription();
    sortHandlerSubsciption = new BehaviorSubject<TableEvent<Sort>>(null);
    pageChangeHandlerSubsciption = new BehaviorSubject<TableEvent<PageEvent>>(null);
    selectHandlerSubsciption = new BehaviorSubject<TableEvent<SelectionModel<any>>>(null);
    filterHandlerSubsciption = new BehaviorSubject<string>(null);
    hyperlinkHandlerSubsciption = new BehaviorSubject<TableEvent<any>>(null);
    eventHandlerSubsciption = new BehaviorSubject<TableEvent<any>>(null);
    paginatorSubsciption = new BehaviorSubject<string>(null);
    clickRowSubsciption = new BehaviorSubject<string>(null);

    constructor() {
        this.subscriptions
            .add(this.sortHandlerSubsciption)
            .add(this.pageChangeHandlerSubsciption)
            .add(this.selectHandlerSubsciption)
            .add(this.filterHandlerSubsciption)
            .add(this.eventHandlerSubsciption)
            .add(this.hyperlinkHandlerSubsciption)
            .add(this.paginatorSubsciption)
            .add(this.clickRowSubsciption);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    /**
     * @param event 
     * Event handling and filtering and emit through Subjects
     */
    tableEventHandler(event: any) {
        if (!event) {
            return;
        }
        switch (event.type) {
            case TABLE_EVENT_TYPE.SORT:
                this.sortHandlerSubsciption.next(event);
                break;
            case TABLE_EVENT_TYPE.PAGE_CHANGE:
                this.pageChangeHandlerSubsciption.next(event);
                break;
            case TABLE_EVENT_TYPE.SELECT:
                this.selectHandlerSubsciption.next(event);
                break;
            case TABLE_EVENT_TYPE.FILTER:
                this.filterHandlerSubsciption.next(event);
                break;
            case TABLE_EVENT_TYPE.HYPERLINK:
                this.hyperlinkHandlerSubsciption.next(event);
                break;
            case TABLE_EVENT_TYPE.EVENT:
                this.eventHandlerSubsciption.next(event);
                break;
            case TABLE_EVENT_TYPE.CLICK_ROW:
                this.clickRowSubsciption.next(event);
                break;
        }
    }

    pagingController(event: string) {
        this.paginatorSubsciption.next(event);
    }
}
