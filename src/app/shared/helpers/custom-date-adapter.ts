import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    let result = date.toDateString();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    //see that displayformat get all the values indicate in MY_FORMATS.display
    switch (displayFormat) {
      case 'MM/YYYY':
        // Return the format as per your requirement
        result = `${month}/${year}`;
        break;
      case 'YYYY':
        // Return the format as per your requirement
        result = `${year}`;
        break;
      default:
        let days: string = date.getDate().toString();
        days = day < 10 ? '0' + day : days;
        let months: string = (date.getMonth() + 1).toString();
        months = +month < 10 ? '0' + month : months;
        // Return the format as per your requirement
        result = `${days}/${months}/${year}`;
        break;
    }
    return result;
  }
  parse(value: string): any {
    let parts = value.split('/');
    if (parts.length == 3) return new Date(+parts[2], +parts[1] - 1, +parts[0]);
    if (parts.length == 2) return new Date(+parts[1] - 1, +parts[0]);
    if (parts.length == 1) return new Date(+parts[0]);
  }
}
