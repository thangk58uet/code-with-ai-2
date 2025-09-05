import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TABLE_COL_TYPE } from '@shared/constants/table.constant';
import { IColumn } from '@shared/models/table.model';

@Pipe({
  name: 'tranformData'
})
export class TranformDataPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
  ) { }


  transform(value: any, type: string): unknown {
    switch (type) {
      case TABLE_COL_TYPE.DATE:
        if (value)
          value = this.datePipe.transform(value, 'dd-mm-yyyy');
        break;
      case TABLE_COL_TYPE.DATE_TIME:
        if (value)
          value = this.datePipe.transform(value, 'dd-MM-yyyy hh:mm:ss');
        break;
      case TABLE_COL_TYPE.MONEY:
        if (value)
          value = this.currencyPipe.transform(value, '', '', '1.0-2');
        break;
      case TABLE_COL_TYPE.NUMBER:
        if (value) {
          value = value.split(',').join('');
          value = this.decimalPipe.transform(value, '1.0-2');
        }
        break;
    }
    return value;
  }

}
