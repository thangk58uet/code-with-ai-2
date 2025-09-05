import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit, ViewChild, ChangeDetectorRef, ElementRef, Attribute, SimpleChanges, Directive, ChangeDetectionStrategy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { getFilter, getPrintableHTML, printHtml } from './utils';
import { TABLE_ACTION_TYPE, TABLE_COL_TYPE, TABLE_EVENT_TYPE } from '@shared/constants/table.constant';
import { CommonDialogData } from '@shared/models/dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogCommonComponent } from '@shared/components/dialogs/dialog-common/dialog-common.component';
import { ACTION_CONDITIONAL, ACTION_OPERATOR, IColumn, IColumnAction, IMUIDTOptions, TableEventCondition } from '@shared/models/table.model';
import { MatInput } from '@angular/material/input';
import { ConfirmDialogService } from '@shared/services/confirm-dialog.service';
import { DIRECTIVE_VALIDATION_TYPE } from '@shared/constants/form-item.constant';
import { CurrencyPipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'bpm-table',
  templateUrl: './bpm-table.component.html',
  styleUrls: ['./bpm-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BpmTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() title: string = '';
  @Input() measureUnit: string = '';
  @Input() columns: IColumn[]
  @Input() data: any[];
  @Input() dataDefaultSelected: any[];
  @Input() options: IMUIDTOptions
  @Input() totalItems: number;
  @Input() radioButton: boolean = false;
  @Input() toolBar: boolean = true;
  @Input() toolBarRight: boolean = true;
  @Input() disabled: boolean = false;
  @Input() dataDialogInput:CommonDialogData;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('searchInput') searchInput: any;

  columnType = TABLE_COL_TYPE;

  /** Local copy of columns in  format that can be read by the table */
  columnsLocal: IColumn[] = [];

  /** Local copy of options with defaults filled in */
  optionsLocal: IMUIDTOptions;

  /** Local copy of data */
  dataLocal: MatTableDataSource<any> = new MatTableDataSource();

  /** If the component has the search bar, this  is true */
  searching = false;

  /** Stores the filter options for each column
   * In the format: { <name>: { label: '<column label>', values: [<value for column>...] } }
   */
  filterOptions: any

  /** Selection model for selecting rows in the table */
  initialSelection = [];
  allowMultiSelect: boolean = true;
  selection: any
  displayedColumns: string[];

  dataDialog: CommonDialogData;
  page: PageEvent;
  sortData: Sort;

  //Add
  isEdit: boolean = false;
  isAdd: boolean = false;
  columnsAddLocal: IColumn[] = [];
  displayedColumnsAdd: string[];
  dataSourceAdd: any[]
  directiveNumber: string = DIRECTIVE_VALIDATION_TYPE.D_NUMBER
  directiveCurrentcy: string = DIRECTIVE_VALIDATION_TYPE.D_CURRENCY
  indexEdit: number;
  constructor(
    @Attribute('className') public className: string,
    @Attribute('paddingDefault') public paddingDefault: string,
    private dialogService: ConfirmDialogService,
    public dialog: MatDialog,
  ) { }


  ngOnInit() {
    if ((this.options && this.options?.mutilSelectRows == false) || this.radioButton) {
      this.allowMultiSelect = false;
    }
    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
    this.getColumns(this.columns);
    this.getOptions(this.options);
    this.getColumnDisplay(this.columnsLocal);
    this.getDataInput(this.data);
    this.dataLocal.filterPredicate = getFilter(this.optionsLocal);
    this.defaultSelected();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.data && !changes?.data.firstChange)
      this.dataLocal.data = this.data;
      this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

    if (changes?.dataDefaultSelected && !changes?.dataDefaultSelected.firstChange)
      this.defaultSelected();

    if (changes?.options && !changes?.options.firstChange)
      this.getOptions(this.options);

    if (changes?.columns && !changes?.columns.firstChange) {
      this.getColumns(this.columns);
      this.getColumnDisplay(this.columnsLocal);
    }
  }

  ngAfterViewInit() {
    if (this.optionsLocal?.serverSide && this.optionsLocal?.pagination) {
      this.paginator.firstPage();
    }
    else {
      if (this.optionsLocal?.pagination)
        this.dataLocal.paginator = this.paginator;
      this.dataLocal.sort = this.sort;
    }

  }

  ngOnDestroy() {
  }

  /** START event modal add data inside */

  onAddButtonData() {
    this.dataSourceAdd = [{}];
    this.columnsAddLocal = [...this.columns];
    this.displayedColumnsAdd = [];
    for (const i of this.columnsAddLocal) {
      if (i?.onAdd) {
        this.displayedColumnsAdd.push(i.name);
      }
    }

    this.isAdd = true;
  }

  onEditButtonData(data: any, index: number) {
    this.indexEdit = index;
    this.dataSourceAdd = [data];
    this.columnsAddLocal = [...this.columns];
    this.displayedColumnsAdd = [];
    for (const i of this.columnsAddLocal) {
      if (i?.onEdit) {
        this.displayedColumnsAdd.push(i.name);
      }
    }
    this.isEdit = true;
    this.isAdd = true;
  }

  onAddData() {
    this.optionsLocal.onAddClick(this.dataSourceAdd[0]);
    this.isAdd = false;
  }

  onEditData() {
    this.optionsLocal.onEditClick(this.dataSourceAdd[0], this.indexEdit);
    this.isAdd = false;
  }

  getStylebyColumn() {
    return (this.displayedColumnsAdd.length * 120) + "px";
  }

  /** END event modal add data inside */

  ngOnRowsSelect(row: any) {
    this.selection.toggle(row);
    this.optionsLocal.onRowsSelect(row, this.selection?.selected);
  }

  ngModelChangeColums(columns: string[]) {
    this.displayedColumns = columns;
    if (this.optionsLocal?.isSelect)
      (this.displayedColumns || []).unshift('select');
  }

  ngonSearchChange(value: string) {
    this.optionsLocal.onSearchChange(value);
  }
  //handler event actions
  ngOnEventColumnClick(row: any, index: number, action: IColumnAction) {
    switch (action.type) {
      case TABLE_ACTION_TYPE.EDIT:
        if (this.optionsLocal?.editInSide && this.optionsLocal?.editInSideEventType == TABLE_ACTION_TYPE.EDIT) {
          this.onEditButtonData({ ...row }, index);
        } else
          action.onEvent(row, index, this.dataLocal?.data, this.page, this.sortData);
        break;
      case TABLE_ACTION_TYPE.DELETE:
        this.getPageData();
        this.getSortData();

        this.dataDialog = {
          type: 'confirm',
          title: this.dataDialogInput.title == null ? 'Confirm Action':this.dataDialogInput.title,
          content: this.dataDialogInput.content == null ? 'Are you want to delete this record?':this.dataDialogInput.content
        }
        this.dialogService.open(this.dataDialog);
        this.dialogService.closed().subscribe(confirmed => {
          if (confirmed) {
            action.onEvent(row, index, this.dataLocal?.data, this.page, this.sortData);
          }
        });
        break;
      default:
        action.onEvent(row, index, this.dataLocal?.data, this.page, this.sortData);
        break;
    }
  }

  //handler event column hyperlink actions
  ngOnCustomEvent(row: any, rowIndex: number, column: IColumn) {
    column?.options.onCustomEvent(row, rowIndex, this.dataLocal?.data);
  }

  ngOnRowClick(row: any, rowIndex: number) {
    if (this.optionsLocal?.editInSide && this.optionsLocal?.editInSideEventType == TABLE_EVENT_TYPE.CLICK_ROW) {
      this.onEditButtonData({ ...row }, rowIndex);
    } else
      this.optionsLocal.onRowClick(row, rowIndex);
    if (this.allowMultiSelect == false) {
      this.selection.toggle(row);
      this.optionsLocal.onRowsSelect(row, this.selection?.selected);
    }
  }

  /**page changes. */
  pageChange(event: PageEvent) {
    if (!event) {
      return;
    }
    this.optionsLocal.onChangePage(event);
    if (this.optionsLocal?.serverSide && this.optionsLocal?.pagination)
      this.selection.clear();
  }
  /** Detect whether column sort then output sort values. */
  sortChange(sort: Sort) {
    this.getPageData();
    this.optionsLocal?.customSort(this.dataLocal?.data, this.page, sort);
  }

  getSortData() {
    if (this.sort?.active)
      this.sortData = { active: this.sort.active, direction: this.sort?.direction }
  }

  getPageData() {
    if (this.optionsLocal?.pagination)
      this.page = { pageIndex: this.paginator?.pageIndex, pageSize: this.paginator?.pageSize, length: this.paginator?.length };
  }

  getColumnValue(row: any, name: any): any {
    if (!row) {
      return '';
    }
    let value = [];
    if (!Array.isArray(name)) {
      value.push(row[name]);
    } else {
      (name || []).forEach((variable) => {
        value.push(row[variable]);
      });
    }

    return value.join(',');
  }

  /** check action disable hidden */
  checkActionConition(action: IColumnAction, row: any, type: number): boolean {
    if ((type == 1 && (!action?.disable || !action?.disable?.conditions))) {
      return false;
    }

    if ((type == 0 && (!action?.hidden || !action?.hidden?.conditions))) {
      return false;
    }
    let valid;
    let data = [];
    if (type == 1) {
      data = (action?.disable?.conditions || [])
    }
    else {
      data = (action?.hidden?.conditions || []);
    }
    if (data.length <= 0) return false;

    let i = 0;
    data.forEach((condition) => {
      i += 1;
      const leftValue = this.getColumnValue(row, condition?.leftParam);
      let rightValue = condition?.rightValue;

      if (condition?.rightParam) {
        rightValue = this.getColumnValue(row, condition?.rightParam);
      }
      //so sánh giá trị để lấy ra valid_temp
      let valid_tmp = true;
      switch (condition?.operator) {
        case ACTION_OPERATOR.EQUAL:
          valid_tmp = (leftValue === rightValue);
          break;
        case ACTION_OPERATOR.LESS_OR_EQUAL:
          valid_tmp = (leftValue >= rightValue);
          break;
        case ACTION_OPERATOR.GREATER_OR_EQUAL:
          valid_tmp = (leftValue <= rightValue);
          break;
        case ACTION_OPERATOR.LESS_THAN:
          valid_tmp = (leftValue > rightValue);
          break;
        case ACTION_OPERATOR.GREATER_THAN:
          valid_tmp = (leftValue < rightValue);
          break;
        case ACTION_OPERATOR.NOT_EQUAL:
          valid_tmp = (leftValue !== rightValue);
          break;
      }
      // kiểm tra xem thuộc loại condition nào
      if (i == 0 || (!action?.disable?.logical))
        valid = valid_tmp;
      else {
        switch (action?.disable?.logical) {
          case ACTION_CONDITIONAL.AND:
            valid = (valid && valid_tmp);
            break;
          case ACTION_CONDITIONAL.OR:
            valid = (valid || valid_tmp);
            break;
          default:
            valid = valid_tmp;
            break;
        };
      }
    });

    return valid;
  }

  onSearch() {
    this.searching = true;
    setTimeout(() => {
      this.searchInput?.nativeElement?.focus();
    }, 100);
  }
  /**
   * Triggers a print of the data in the table
  **/
  print() {
    printHtml(getPrintableHTML(this.columnsLocal, this.dataLocal?.data));
  }
  /**
     * Triggers when the user clicks the download csv button
  **/

  downloadCSV() {
    let columnsExport = [...this.displayedColumns];
    if (columnsExport.filter(x => x == 'select'))
      columnsExport = columnsExport.splice(1);
    if (columnsExport.filter(x => x == 'action'))
      columnsExport.pop();
    const header = this.buildCSVHead(columnsExport);
    const csv = header + this.buildCSVBody(this.dataLocal.data);

    const a = document.createElement('a');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = this.title + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.optionsLocal.serverSide ? this.totalItems : this.data.length);
    if (this.optionsLocal.serverSide && this.optionsLocal.pagination) {
      const dataPerPage = this.getDataPerPage();
      // return numSelected > 0 && numSelected === dataPerPage;
      //nếu trường hợp trang cuối cùng có số bản ghi < số bản ghi của trang
      return numSelected > 0 && numSelected <= dataPerPage;
    }
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    const isSelectAll = this.isAllSelected();
    isSelectAll ? this.selection?.clear() : this.data.forEach(row => this.selection?.select(row));
    this.optionsLocal?.onRowsSelect(this.selection?.selected, this.selection?.selected);
  }

  defaultSelected() {
    if (this.dataDefaultSelected && this.dataDefaultSelected?.length > 0) {
      const dataSelected = [...this.data || []].filter(x => this.dataDefaultSelected?.includes(x[this.optionsLocal.key]))
      if (dataSelected)
        dataSelected.forEach(row => this.selection?.select(row));
    }
  }

  getDataPerPage(): number {
    let currentPageLength = this.totalItems;
    return currentPageLength < this.paginator?.pageSize ? currentPageLength : this.paginator?.pageSize;
  }


  /** Builds the head string for the csv file */
  buildCSVHead(columns: string[]): string {
    let header = '';
    for (const [i, v] of columns.entries()) {
      header += `"${v}"`;
      if (i !== (this.columnsLocal || []).length - 1) header += this.optionsLocal?.downloadOptions?.separator;
    }
    return header + '\n';
  }

  /** Builds the csv body  */
  private buildCSVBody(data: any[]): string {
    let body = '';
    for (const row of data) {
      for (const [i, v] of this.columnsLocal?.entries()) {
        if ((this.displayedColumns || []).findIndex(x => x == v.name) >= 0) {
          if (typeof row[v.name] === 'string') {
            body += `"${row[v.name]}"`;
          } else if (typeof row[v.name] === 'number') {
            body += `${row[v.name]}`;
          } else if (typeof row[v.name] === 'boolean') {
            body += row[v.name] ? `"true"` : `"false"`;
          } else if (typeof row[v.name] === 'object' && Object.prototype.toString.call(row[v.name]) === '[object Date]') {
            body += (row[v.name] as Date).toISOString();
          }
          if (i !== this.columnsLocal?.length - 1) body += this.optionsLocal?.downloadOptions?.separator;
        }
      }
      body += '\n';
    }

    return body;
  }

  /** Returns the columns that are to be displayed as a string array */
  getColumnDisplay(columns: IColumn[]) {
    this.displayedColumns = [];
    for (const i of columns) {
      if (i.options.display) { this.displayedColumns?.push(i.name); }
    }
    if (this.optionsLocal?.isSelect)
      (this.displayedColumns || []).unshift('select');

  }

  getOptions(val: IMUIDTOptions) {
    // TODO deep merge?
    this.optionsLocal = {
      showHeader: val.showHeader || true,
      serverSide: val.serverSide || false,
      isSelect: val.isSelect || false,
      mutilSelectRows: val.isSelect || true,
      selectHeaderLabel:  val.selectHeaderLabel || 'select',
      pagination: val.pagination || true,
      addInSide: val.addInSide || false,
      editInSide: val.editInSide || false,
      editInSideEventType: val.editInSideEventType || '',
      key: val.key || 'id',
      selectableRows: val.selectableRows || 'multiple',
      selectableRowsOnClick: val.selectableRowsOnClick || false,
      isRowSelectable: (dataIndex: number) => true,
      expandableRows: val.expandableRows || false,
      expandableRowsOnClick: val.expandableRowsOnClick || false,
      resizableColumns: val.resizableColumns || false,
      customSort: val.customSort || (() => { }),
      customSearch: (searchQuery: string, currentRow: [], columns: []) => true,
      elevation: 4,
      caseSensitive: val.caseSensitive || false,
      responsive: 'stacked',
      rowsPerPage: val.rowsPerPage || 5,
      rowsPerPageOptions: val.rowsPerPageOptions || [5, 10, 15, 20, 50, 100],
      rowHover: true,
      fixedHeader: true,
      sortFilterList: true,
      sort: val.sort || true,
      filter: val.filter || true,
      search: val.search || true,
      searchText: '',
      print: val.print || false,
      download: val.print || true,
      downloadOptions: { filename: (this.title + '.csv'), separator: ',' },
      onDownload: (buildHead: (columns) => string, buildBody: (data) => string, columns, data) => true,
      viewColumns: val.viewColumns || true,
      onRowsSelect: val.onRowsSelect,
      onRowsDelete: () => { },
      onRowClick: val.onRowClick || (() => { }),
      onCellClick: () => { },
      onChangePage: val.onChangePage || ((event: PageEvent) => { return []; }),
      onChangeRowsPerPage: () => { },
      onSearchChange: val.onSearchChange || (() => { }),
      onSearchOpen: () => { },
      onColumnSortChange: () => { },
      onColumnViewChange: () => { },
      onAddClick: val.onAddClick || (() => { }),
      onEditClick: val.onEditClick || (() => { }),
      textLabels: {
        body: {
          noMatch: 'Sorry, no matching records found',
          toolTip: 'Sort',
        },
        pagination: {
          next: 'Next Page',
          previous: 'Previous Page',
          rowsPerPage: 'Rows per page:',
          displayRows: 'of',
        },
        toolbar: {
          search: 'Search',
          downloadCsv: 'Download CSV',
          print: 'Print',
          viewColumns: 'View Columns',
          filterTable: 'Filter Table',
        },
        filter: {
          all: 'All',
          title: 'Filters',
          reset: 'Reset',
        },
        viewColumns: {
          title: 'Show Columns',
          titleAria: 'Show/Hide Table Columns',
        },
        selectedRows: {
          text: 'row(s) selected',
          delete: 'Delete',
          deleteAria: 'Delete Selected Rows',
        }
      },
      ...val
    };
  }

  getColumns(columns: (string | IColumn)[]) {
    this.columnsLocal = [];
    if (columns) {
      for (const i of columns) {
        let temp: IColumn = {
          name: '',
          label: '',
          type: TABLE_COL_TYPE.TEXT,
          category: [],
          options: {
            display: true,
            empty: false,
            viewColumns: true,
            filter: true,
            filterType: 'dropdown',
            sort: true,
            searchable: true,
            print: true,
            download: true,
          },
          actions: []
        };
        if (typeof i === 'string') {
          temp.name = i;
          temp.label = i;
        } else if (typeof i === 'object') {
          temp = { ...temp, ...i, category: [...temp.category, ...(i.category || [])], options: { ...temp.options, ...i.options }, actions: [...temp.actions, ...(i.actions || [])] };
        }
        this.columnsLocal.push(temp);
      }
    }
  }

  getDataInput(data: any[]) {
    this.dataLocal.data = [];
    if (data && data.length > 0) {
      for (const i of data) {
        if (Object.prototype.toString.call(i) === '[object Object]') {
          this.dataLocal?.data?.push(i);
        } else {
          const row = {};
          let k = 0;
          for (const j in this.displayedColumns) {
            let columnName = this.displayedColumns[j];
            row[columnName] = i[k++];
          }
          this.dataLocal?.data?.push(row);
        }
      }
    }
    if (!this.dataLocal?.data) {
      this.dataLocal?.data;
    }
  }

  getStysle(row: any, column: IColumn, index: number){
    var columnIndex = this.columnsLocal.findIndex((x) => x[column.name] === column[column.name]);
    var finalValue = column.options.customBodyRender(index, columnIndex, row, this.dataLocal.data);
    return finalValue
  }

  getTooltip(row: any, column: IColumn, index: number){
    var columnIndex = this.columnsLocal.findIndex((x) => x[column.name] === column[column.name]);
    var finalValue = column.options.customBodyRender(index, columnIndex, row, this.dataLocal.data);
    return finalValue?.tooltip
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}


