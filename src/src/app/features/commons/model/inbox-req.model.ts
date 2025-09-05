export class InboxRequest {
    ClientMessageId: string;
    ClientUserId: string;
    bpmId: string;
    fromDate: string;
    orderBy: string;
    orderType: string;
    pageNumber: number;
    pageSize: number;
    processId: string;
    t24Code: string;
    toDate: string;
    acceptedBy: string;
    constructor() {
        this.bpmId = '';
        this.fromDate = '';
        this.orderBy = '';
        this.orderType = '';
        this.pageNumber = 1;
        this.pageSize = 5;
        this.processId = '';
        this.t24Code = '';
        this.toDate = '';
        this.orderType = '';
        this.acceptedBy = '';
    }
}
