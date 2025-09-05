export class DhlModel {
    bpmId: string = '';
    type: string = ''; //BOOK || TRA_LO || TRA_DON
    dhlCode: string = ''; //Gửi lô sẽ cách nhau bằng dấu phẩy
    senderName: string = '';
    email: string = '';
    sendDate: string = ''; //dd/MM/yyyy hh:mm:ss
    mbRef: string = '';
    customerCode: string = '';
    branchCode: string = '';
    mainUnitId: string = '';
}