import moment from "moment";

export const DATE_TIME_FORMATS_DD_MM_YYYY_HH_SS = {
    parse: {
      dateInput: 'DD/MM/YYYY HH:mm:ss',
    },
    display: {
      dateInput: 'DD/MM/YYYY HH:mm:ss',
      monthYearLabel: 'MMM YYYY HH:mm:ss',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY h:mm:ss',
    },

  };
export const  DATE_FORMAT = {
    DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
    DATE_FORMAT : 'YYYY-MM-DD',
    DATE_TIME_FORMAT_BPM: 'DD/MM/YYYY HH:mm:ss',
    DATE_FORMAT_BPM: 'DD/MM/YYYY',
    DATE_FORMAT_T24 : 'YYYYMMDD'
}

export function formatDateTime(value) {

    return moment(value, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss') + 'Z';

}

export function formatDateTime2(value){
    return moment(value, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
}


export function convertDateTimeToReadble(date = '2021-8-12', time = '14:00') {

    if (date == null) {
        return null;
    }

    let _date = moment(date).format(DATE_FORMAT.DATE_FORMAT);

    return formatDateTime(_date + ' ' + time);

}
