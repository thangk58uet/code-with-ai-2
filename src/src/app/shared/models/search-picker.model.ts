/**
 * @class use to initialize SEARCH_PICKER_COMPONENT
 * @requires key
 * @default
 * searchData as [] - 'main disable data'
 * key as '' - 'main key of disable data'
 * filterable as true - 'filter or not'
 * onlyOne as false - 'select on or many'
 * lable - 'show display field string'
 * disableOption - 'disable searchData options'
 */
export class SearchPickerInitOption<T> {
  /** @optional Whether search picker can filter or not */
  filterable?: boolean = true;

  /** @optional Whether search picker can select one or many */
  onlyOne?: boolean = false;

  /**
   * @default searchData as [] - 'main search data'
   * @note can set default value on Init
   */
  searchData?: T[] = [];

  /**
   * @required must be initialize in order to get return key value
   * @default key as '' - 'main key of search data'
   */
  key: string;

   /**
    * @required must be initialize in order to display value
    * @default key as '' - 'no value will be shown'
    */
  displayKey: string;

  /** @optional used for Display field */
  label?: string;

  /**
   * @class use to disable data in searchData (optional)
   * @default
   * searchData as [] - 'main disable data'
   * key as '' - 'main key of disable data'
   */
  disableOption?: SearchPickerDisableOption<T>;

  constructor(initOption: SearchPickerInitOption<T>) {
    Object.assign(this, initOption);
    if (initOption.disableOption) {
      this.disableOption = new SearchPickerDisableOption<T>(initOption.disableOption);
    } else {
      this.disableOption = new SearchPickerDisableOption<T>({ key: '' });
    }
  }

  setSearchData?(searchData: T[]) {
    this.searchData = searchData;
  }

  setDisabledData?(disabledData: T[]) {
    if (this.disableOption) {
      this.disableOption.disabledData = disabledData;
    }
  }
}

/**
 * @class use to disable data in searchData (optional)
 * @use SEARCH_PICKER_COMPONENT
 * @default
 * searchData as [] - 'main disable data'
 * key as '' - 'main key of disable data'
 */
export class SearchPickerDisableOption<T> {
  /**
   * @default disabledData as [] - 'main disable data'
   * @note can set default value on Init
   */
  disabledData?: T[] = [];

  /**
   * @required must be initialize in order to get return key value
   * @default key as '' - 'main key of disable data'
   */
  key: string;

  constructor(disableOption: SearchPickerDisableOption<T>) {
    Object.assign(this, disableOption);
  }

  setDisabledData?(disabledData: T[]) {
    this.disabledData = disabledData;
  }
}

/**
 * @class search request model for filtering
 * @use SEARCH_PICKER_COMPONENT
 * @default
 * filterValue - 'returning data from model'
 * plusSize - 'whether the request is asking for more page or start from first page'
 */
export class SearchPickerDataRequest {
  filterValue: string;
  plusSize: boolean;
}
