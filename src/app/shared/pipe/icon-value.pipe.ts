import { Pipe, PipeTransform } from '@angular/core';
import { IColumn } from '@shared/models/table.model';

@Pipe({
  name: 'iconValue'
})
export class IconValuePipe implements PipeTransform {

  transform(value: any, index: number, row: any, column: IColumn, columnsLocal: IColumn[], data: any[]): unknown {
    if (column && column.options && column?.options?.customBodyRender) {
      var columnIndex = (columnsLocal || []).findIndex((x) => x[column.name] === column[column.name]);
      var finalValue = column.options?.customBodyRender(index, columnIndex, row, data);
      return finalValue?.icon;
    }
    return null;
  }

}
