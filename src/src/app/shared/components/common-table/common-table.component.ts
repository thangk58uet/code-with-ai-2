import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnEvent, ColumnSetting, EVENT_OPERATOR, TableEvent } from '@shared/models/table.model';
import { TABLE_COL_TYPE, TABLE_EVENT_TYPE } from '@shared/constants/table.constant';
import { SelectionModel } from '@angular/cdk/collections';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'bpm-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  /**
   * @requires data Data to setup table
   */
  @Input() data: any[] = [];

  /**
   * @requires columnsSetting Table data column setting to determine which data to show onscreen
   */
  @Input() columnsSetting: ColumnSetting[] = [];

  /**
   * @requires totalElement Show number of remaining data
   * @note not required in allInOne mode
   */
  @Input() totalElement: number;

  // ======= CHECKBOX SELECTION OPTIONS =======
  /**
   * @param selectable Enable table selection mode
   * @requires selection Selection model for data control and manipulation
   */
  @Input() selectable = false;

  /**
   * @param selectKey Select key for data comparation
   */
  @Input() selectKey: string;

  /**
   * @param selection Selection model for data control and manipulation
   */
  @Input() selection = new SelectionModel<any>(true, []);

  // ======= ALL DATA IN ONE OPTIONS =======
  /**
   * @param allInOne Enable all in one data mode
   * @requires dataSource Required for data control and manipulation
   */
  @Input() allInOne = false;

  /**
   * @param dataSource Required for data control and manipulation
   * @note allInOne mode only
   */
  @Input() dataSource: MatTableDataSource<any>;

  /**
   * @param filterable Filter data per input
   * @note allInOne mode only
   */
  @Input() filterable = false;

  filterForm: FormGroup;

  /**
   * @param displayedColumns display column manually
   */
  @Input() displayedColumns: string[] = [];

  /**
   * @param hasFooter show footer row
   */
  @Input() hasFooter = false;

  /**
   * @param showPaging show paging row
   * @note allInOne mode only
   */
  @Input() showPaging = true;

  pageEvent: PageEvent;
  filterSubscription: Subscription;

  tableColType = TABLE_COL_TYPE;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() pageChangeEvent: EventEmitter<TableEvent<any>> = new EventEmitter();

  @Input() paginatorSubsciption: BehaviorSubject<string>;

  get filterFormControl(): AbstractControl {
    return this.filterForm.get('filterValue');
  }

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      filterValue: null,
    });
  }

  ngOnInit() {
    this.setupTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && this.dataSource) {
      setTimeout(() => {
        this.emitClearSelection();
      }, 0);
    }
  }

  ngAfterViewInit() {
    if (this.paginatorSubsciption && this.showPaging) {
      this.paginatorSubsciption.subscribe((x) => {
        switch (x) {
          case 'first':
            this.paginator.firstPage();
            break;
        }
      });
    }
    if (this.allInOne) {
      if (this.showPaging) {
        this.dataSource.paginator = this.paginator;
      }
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: Element, filter: string) => {
        const isExist = this.displayedColumns.some((col) => {
          if (data[col]) {
            return data[col].toString().trim().includes(filter);
          }
        });
        return isExist;
      };
    }
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    if (this.paginatorSubsciption) {
      this.paginatorSubsciption.unsubscribe();
    }
  }

  /** Setup table main function. */
  setupTable() {
    this.filterSubscription = this.filterFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((filterValue) => {
        this.emitClearSelection();
        this.applyFilter(filterValue);
      });
    if (this.displayedColumns.length === 0) {
      this.columnsSetting.forEach((x) => {
        this.displayedColumns.push(this.getSelectorName(x.selector));
      });
      if (this.selectable) {
        this.displayedColumns.unshift('selector');
      }
    }
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  /** Output whenever filter values is applied. */
  applyFilter(value: string) {
    this.dataSource.filter = value.trim();

    this.pageChangeEvent.emit({
      type: TABLE_EVENT_TYPE.FILTER,
      data: value.trim().toLowerCase(),
    });
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Detect page values change then ouput page changes. */
  pageChange(event: PageEvent) {
    if (!event) {
      return;
    }
    this.pageChangeEvent.emit({
      type: TABLE_EVENT_TYPE.PAGE_CHANGE,
      data: event,
    });
    this.emitClearSelection();
  }

  /** Detect whether column sort then output sort values. */
  sortChange(event: Sort) {
    this.pageChangeEvent.emit({ type: TABLE_EVENT_TYPE.SORT, data: event });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (!this.showPaging && this.allInOne) {
      return numSelected > 0 && numSelected === this.dataSource.data.length;
    }
    if (!this.paginator) {
      return false;
    }
    const dataPerPage = this.getDataPerPage();
    return numSelected > 0 && numSelected === dataPerPage;
  }

  getDataPerPage(): number {
    let currentPageLength = 0;
    if (this.allInOne) {
      if (!this.filterFormControl.value) {
        const currentPageData = this.dataSource._pageData(this.dataSource.data);
        currentPageLength = currentPageData.length;
      } else {
        const currentPageData = this.dataSource._pageData(this.dataSource.filteredData);
        currentPageLength = currentPageData.length;
      }
    } else {
      currentPageLength = this.totalElement;
    }
    return currentPageLength < this.paginator.pageSize ? currentPageLength : this.paginator.pageSize;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      if (this.allInOne) {
        if (!this.filterFormControl.value) {
          const currentPageData = this.dataSource._pageData(this.dataSource.data);
          currentPageData.forEach((row) => {
            this.selection.select(this.selectKey ? row[this.selectKey] : row);
          });
        } else {
          const currentPageData = this.dataSource._pageData(this.dataSource.filteredData);
          currentPageData.forEach((row) => {
            this.selection.select(this.selectKey ? row[this.selectKey] : row);
          });
        }
      } else {
        this.data.forEach((row) => {
          this.selection.select(this.selectKey ? row[this.selectKey] : row);
        });
      }
    }
    this.pageChangeEvent.emit({
      type: TABLE_EVENT_TYPE.SELECT,
      data: this.selection,
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(this.selectKey ? row[this.selectKey] : row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  rowCheck(event, row: any) {
    if (!event) {
      return;
    }
    this.selection.toggle(this.selectKey ? row[this.selectKey] : row);
    this.pageChangeEvent.emit({
      type: TABLE_EVENT_TYPE.SELECT,
      data: this.selection,
    });
  }

  /** Output event of hyper link. */
  hyperLinkClicked(row: any, column: ColumnSetting) {
    let event: ColumnEvent = null;
    if (column.events && column.events[0]) {
      event = column.events[0];
    }
    this.pageChangeEvent.emit({
      type: TABLE_EVENT_TYPE.HYPERLINK,
      data: row,
      event: event?.eventName,
    });
  }

  /** Output event of column events. */
  eventColClicked(row: any, event: ColumnEvent) {
    this.pageChangeEvent.emit({
      type: TABLE_EVENT_TYPE.EVENT,
      data: row,
      event: event.eventName,
    });
  }

  /** Get value from data row. */
  colDisplayValue(row: any, selector: string[]): any {
    if (!row) {
      return '';
    }
    let data = row;
    selector.forEach((variable) => {
      data = data[variable];
    });

    return data;
  }

  /** Get the last item in column selector. */
  getSelectorName(selector: string[]): string {
    if (!selector || selector.length === 0) {
      return '';
    }
    return selector[selector.length - 1];
  }

  /** Validate whether this event is available or not. */
  checkEventCondition(event: ColumnEvent, row: any): boolean {
    if (!event.conditions) {
      return true;
    }
    let valid = true;
    event.conditions.forEach((condition) => {
      const leftValue = this.colDisplayValue(row, condition.leftParam);
      let rightValue = condition.rightValue;

      if (condition.rightParam) {
        rightValue = this.colDisplayValue(row, condition.rightParam);
      }
      switch (condition.operator) {
        case EVENT_OPERATOR.EQUAL:
          valid = valid && leftValue === rightValue;
          break;
        case EVENT_OPERATOR.EQUAL_OR_HIGHER:
          valid = valid && leftValue >= rightValue;
          break;
        case EVENT_OPERATOR.EQUAL_OR_LOWER:
          valid = valid && leftValue <= rightValue;
          break;
        case EVENT_OPERATOR.HIGHER:
          valid = valid && leftValue > rightValue;
          break;
        case EVENT_OPERATOR.LOWER:
          valid = valid && leftValue < rightValue;
          break;
        case EVENT_OPERATOR.NOT_EQUAL:
          valid = valid && leftValue !== rightValue;
          break;
      }
    });
    return valid;
  }

  isActive(value): string {
    if (!value) {
      return 'close';
    }
    return 'done';
  }

  private emitClearSelection() {
    this.selection.clear();
    this.pageChangeEvent.emit({
      type: TABLE_EVENT_TYPE.SELECT,
      data: this.selection,
    });
  }

  // onClickRow(row) {
  //   this.pageChangeEvent.emit({
  //     type: TABLE_EVENT_TYPE.CLICK_ROW,
  //     data: row,
  //   });
  // }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
