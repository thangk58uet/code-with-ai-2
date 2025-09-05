import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TABLE_COL_TYPE } from '@shared/constants/table.constant';
import { IColumn, IMUIDTOptions } from '@shared/models/table.model';

@Pipe({
  name: 'columnValue'
})
export class ColumnValuePipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
  ) { }

  transform(value: any, options: IMUIDTOptions, row: any, column: IColumn, columnsLocal: IColumn[], data: any[]): unknown {
    const key = options?.key;
    switch (column.type) {
      case TABLE_COL_TYPE.DATE:
        if (value)
          value = this.datePipe.transform(value, 'dd-MM-yyyy');
        break;
      case TABLE_COL_TYPE.DATE_TIME:
        if (value)
          value = this.datePipe.transform(value, 'dd-MM-yyyy hh:mm:ss');
        break;
      case TABLE_COL_TYPE.MONEY:
        if (value) {
          value = this.currencyPipe.transform(value, '', '', '1.0-2');
        }
        break;
      case TABLE_COL_TYPE.NUMBER:
        if (value) {
          value = this.decimalPipe.transform(value, '1.0-2');
        }
        break;
    }

    //column value in category
    if (column && (column.type === TABLE_COL_TYPE.SELECT || column.type === TABLE_COL_TYPE.MUTIL_SELECT)) {
      let categorysFinal = [];
      const columnLocal = columnsLocal.filter(x => x.name == column.name);
      if (columnLocal && columnLocal.length > 0 && Array.isArray(columnLocal[0].category))
        categorysFinal = columnLocal[0].category;

      const arrValue = (value || "").split(",");
      const cat = (categorysFinal || []).filter((x) =>
        arrValue.includes(x.value + ""));
      return (cat || []).map((x) => x.text).join();
    }

    if (column && column.options && column.options.customBodyRender) {
      var index = (data || []).findIndex((x) => x[key] === row[key]);
      var columnIndex = (columnsLocal || []).findIndex((x) => x[column.name] === column[column.name]);
      var finalValue = column.options?.customBodyRender(index, columnIndex, row, data);
      return finalValue;
    }
    return value;
  }

}
