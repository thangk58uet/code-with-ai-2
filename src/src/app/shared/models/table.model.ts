import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { TABLE_COL_TYPE } from '@shared/constants/table.constant';

export class ColumnSetting {
  name: string;
  selector: string[];
  type: string;
  sortable: boolean;
  events: ColumnEvent[];
  className: string;
  footer: any;
  footerType: string;
  constructor(
    column: {
      name?: string;
      selector?: string[];
      type?: string;
      sortable?: boolean;
      events?: ColumnEvent[];
      className?: string;
      footer?: any;
      footerType?: string;
    } = {}
  ) {
    this.name = column.name ? column.name : '';
    this.selector = column.selector ? column.selector : null;
    this.type = column.type ? column.type : TABLE_COL_TYPE.TEXT;
    this.sortable = column.sortable === true ? true : false;
    this.events = column.events ? column.events : null;
    this.className = column.className ? column.className : null;
    this.footer = column.footer !== null ? column.footer : null;
    this.footerType = column.footerType ? column.footerType : TABLE_COL_TYPE.TEXT;
  }
}

export class ColumnEvent {
  color?: string;
  icon?: string;
  name?: string;
  tooltip?: string;
  eventName: string;
  conditions?: TableEventCondition[];
}

export class TableEvent<T> {
  type: string;
  data: T;
  event?: string;
}

/** @class
 * @required leftParam && operator
 * @required rightValue
 * @optional rightParam (if any)
 * */
export class TableEventCondition {
  /** @required */
  leftParam: string[];
  /** @required */
  operator: string;

  rightParam?: string[];
  rightValue: any;
}

export enum EVENT_OPERATOR {
  EQUAL = 'equal',
  HIGHER = 'higher',
  LOWER = 'lower',
  EQUAL_OR_HIGHER = 'equal_or_higher',
  EQUAL_OR_LOWER = 'equal_or_lower',
  NOT_EQUAL = 'not_equal',
}




export interface IMUIDTOptions {
  //view header table 
  showHeader?: boolean;
  /** User provided starting page for pagination */
  page?: number;
  /** User provided override for total number of rows */
  count?: number;
  /** Enable remote data source */
  serverSide?: boolean;
  /** User provided selected rows */
  rowsSelected?: [];
  /** Choice of filtering view. enum('checkbox', 'dropdown', 'multiselect', 'textField') */
  filterType?: string;
  /** User provided labels to localize text */
  textLabels?: ITextLabels;
  /** Enable/disable Coumn select */
  isSelect?: boolean;
  /** mutil select row */
  mutilSelectRows?: boolean;
  /** mutil select row */
  selectHeaderLabel?: string;
  /** @required */
  /** key row */
  key: string;
  /*** hiển thị modal add trong bảng */
  addInSide?: boolean;
  /*** hiển thị modal edit trong bảng */
  editInSide?: boolean;
  /*** event để thao tác edit inside */
  editInSideEventType?: string;
  /** Enable/disable pagination */
  pagination?: boolean;
  /** Numbers of rows that can be selected. Options are 'multiple', 'single', 'none'. */
  selectableRows?: 'multiple' | 'single' | 'none';
  /** Enable/disable select toggle when row is clicked. When False, only checkbox will trigger this action. */
  selectableRowsOnClick?: boolean;
  /** Enable/disable selection on certain rows with custom function. Returns true if not provided. function(dataIndex) => bool */
  isRowSelectable?: (dataIndex: number) => boolean;
  /** Enable/disable resizable columns */
  resizableColumns?: boolean;
  /** Enable/disable expandable rows */
  expandableRows?: boolean;
  /** Enable/disable expand trigger when row is clicked. When False, only expand icon will trigger this action. */
  expandableRowsOnClick?: boolean;
  /** Override default sorting with custom function. function(data: array, colIndex: number, order: string) => array */
  customSort?: (data: any[], page: PageEvent, sort: Sort) => void;
  /** Override default search with custom function. customSearch(searchQuery: string, currentRow: array, columns: array) => boolean */
  customSearch?: (searchQuery: string, currentRow: any[], columns: any[]) => boolean;
  /** Shadow depth applied to Paper component */
  elevation?: number;
  /** Enable/disable case sensitivity for search */
  caseSensitive?: boolean;
  /** Enable/disable responsive table views. Options: 'stacked', 'scroll' */
  responsive?: string;
  /** Number of rows allowed per page */
  rowsPerPage?: number;
  /** Options to provide in pagination for number of rows a user can select */
  rowsPerPageOptions?: number[];
  /** Enable/disable hover style over rows */
  rowHover?: boolean;
  /** Enable/disable fixed header columns */
  fixedHeader?: boolean;
  /** Enable/disable alphanumeric sorting of filter lists */
  sortFilterList?: boolean;
  /** Enable/disable sort on all columns */
  sort?: boolean;
  /** Show/hide filter icon from toolbar */
  filter?: boolean;
  /** Show/hide search icon from toolbar */
  search?: boolean;
  /** Initial search text */
  searchText?: string;
  /** Show/hide print	icon from toolbar */
  print?: boolean;
  /** Show/hide download icon from toolbar */
  download?: boolean;
  /** Options to change the output of the CSV file. Default options: {filename: 'tableDownload.csv', separator: ','} */
  downloadOptions?: { filename: string, separator: string };
  /** A callback function that triggers when the user downloads the CSV file. In the callback, you can control what is written to the CSV file. function(buildHead: (columns) => string, buildBody: (data) => string, columns, data) => string */
  onDownload?: (buildHead: (columns) => string, buildBody: (data) => string, columns, data) => string | boolean;
  /** Show/hide viewColumns icon from toolbar */
  viewColumns?: boolean;
  /** Callback function that triggers when row(s) are selected. function(currentRowsSelected: array, allRowsSelected: array) => void */
  onRowsSelect?: (currentRowsSelected: any[], allRowsSelected: any[]) => void;
  /** Callback function that triggers when row(s) are deleted. function(rowsDeleted: object(lookup: {dataindex: boolean}, data: arrayOfObjects: {index, dataIndex})) => void OR false (Returning false prevents row deletion.) */
  onRowsDelete?: (rowsDeleted: { lookup: { dataindex: boolean }, data: { index, dataIndex }[] }) => void | false;
  /** Callback function that triggers when a row is clicked. function(rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => void */
  onRowClick?: (rowData: any, rowIndex: number) => void,
  /** Callback function that triggers when a cell is clicked. function(colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => void */
  onCellClick?: (colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => void;
  /** Callback function that triggers when a page has changed. function(currentPage: number) => void */
  onChangePage?: (event: PageEvent) => any[];
  /** Callback function that triggers when a page has changed.  */
  onChangeRowsPerPage?: (numberOfRows: number) => void;
  /** Callback function that triggers when the search text value has changed. function(searchText: string) => void */
  onSearchChange?: (searchText: string) => void;
  /** Callback function that triggers when the searchbox opens. function() => void */
  onSearchOpen?: () => void;
  /** Callback function that triggers when filters have changed. function(changedColumn: string, filterList: array) => void */
  onFilterChange?: (changedColumn: string, filterList: any[]) => void;
  /** Callback function that triggers when a column has been sorted. function(changedColumn: string, direction: string) => void */
  onColumnSortChange?: (changedColumn: string, direction: string) => void;
  /** Callback function that triggers when a column view has been changed. function(changedColumn: string, action: string) => void */
  onColumnViewChange?: (changedColumn: string, action: string) => void;
  /** Callback function add inside table */
  onAddClick?: (rowData: any) => void,
  /** Callback function add inside table */
  onEditClick?: (rowData: any, rowIndex: number) => void
}

export interface IColumn {
  /** Name of column (This field is required) */
  name: string;
  /** Column Header Name override */
  label: string;
  /** type formar or custom */
  type: string;
  /**Column category */
  category?: any[];
  /** Column style */
  className?: string;
  /** Options for customizing column */
  options: IColumnOptions;
  /** actions in column */
  actions?: IColumnAction[];
  /** view add in column */
  onAdd?: boolean;
  /** view edit in column */
  onEdit?: boolean;

  minDate?: string;
  maxDate?: string;
}

export interface ITextLabels {
  body: {
    noMatch: string;
    toolTip: string;
  };
  pagination: {
    next: string;
    previous: string;
    rowsPerPage: string;
    displayRows: string;
  };
  toolbar: {
    search: string;
    downloadCsv: string;
    print: string;
    viewColumns: string;
    filterTable: string;
  };
  filter: {
    all: string;
    title: string;
    reset: string;
  };
  viewColumns: {
    title: string;
    titleAria: string;
  };
  selectedRows: {
    text: string;
    delete: string;
    deleteAria: string;
  };

}

export interface IColumnOptions {
  /** Display column in table */
  display: boolean;
  /** This denotes whether the column has data or not (for use with intentionally empty columns) */
  empty: boolean;
  /** Allow user to toggle column visibility through 'View Column' list */
  viewColumns: boolean;
  /** Filter value list */
  filterList?: boolean;
  /** With filter options, it's possible to use custom names for the filter fields */
  filterOptions?: any;
  /** Function that returns a string used as the chip label. */
  customFilterListRender?: (value) => string;
  /** Display column in filter list */
  filter: boolean;
  /** Choice of filtering view. Takes priority over global filterType option */
  filterType: 'checkbox' | 'dropdown' | 'multiselect' | 'textField' | 'custom';
  /** Enable/disable sorting on column */
  sort: boolean;
  /** Exclude/include column from search results */
  searchable: boolean;
  /** Set default sort order */
  sortDirection?: 'asc' | 'desc';
  /** Display column when printing */
  print: boolean;
  /** Display column in CSV download file */
  download: boolean;
  /** Display hint icon with string as tooltip on hover. */
  hint?: string;
  customHeadRender?: (columnMeta: any, handleToggleColumn: any) => string;
  customBodyRender?: (rowIndex: number, columnIndex: number, rowData: any, tableData: any[]) => any;
  setCellProps?: (cellValue: string, rowIndex: number, columnIndex: number) => object;
  onCustomEvent?: (rowData: any, rowIndex: number, tableData: any[]) => any;
}

export interface IColumnAction {
  icon?: string;
  name?: string;
  type?: string;
  tooltip?: string;
  className?: string;
  onEvent?: (rowData: any, rowIndex: number, tableData: any[], page: PageEvent, sort: Sort) => any;
  hidden?: IColumnActionCondition,
  disable?: IColumnActionCondition;
}

export interface IMUIDatatableProps {
  /** Title used to caption table */
  title: string;
  /** Columns used to describe table. Must be either an array of simple strings or objects describing a column */
  columns: (string | IColumn)[];
  /** Data used to describe table. Must be an array containing objects. (Arrays containing just strings or numbers also supported) */
  data: any[];
  /** Options used to describe table */
  options: IMUIDTOptions;
}

export interface IColumnActionCondition {
  logical: string,
  conditions: TableActionCondition[];
}

export interface IIconColumn {
  text?: string, 
  icon: string, 
  tooltip?: string, 
  className?: string,
}

export class TableActionCondition {
  /** @required */
  leftParam: string[];
  /** @required */
  operator: string;
  rightParam?: string[];
  rightValue: any;
}

export enum ACTION_OPERATOR {
  //== eq, != ne, < lt, > gt, <= ge, >= le
  EQUAL = 'eq',
  NOT_EQUAL = 'ne',
  LESS_THAN = 'lt',
  GREATER_THAN = 'gt',
  GREATER_OR_EQUAL = 'ge',
  LESS_OR_EQUAL = 'le',


}

export enum ACTION_CONDITIONAL {
  AND = 'and',
  OR = 'or',
}

