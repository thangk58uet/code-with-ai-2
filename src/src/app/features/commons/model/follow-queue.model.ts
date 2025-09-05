export class FollowQueue{
    rowNum: string;
    bpmId: string;
    lcRef: string;
    mbRef: string;
    issueBank: string;
    followReason: string;
    createdDate: string;
    executedBy: string;
    updatedDate: string;
    approvedBy: string;
    status: string;
    processId:number;
    taskId: string;
    taskTypeId: string;
    cmt: string;
    startDate: string;
    completeDate: string;
    isActive: number;
}
export class FollowQueueRes{
    items: Array<FollowQueue>;
    pageSize: number;
    pageNum: number;
    totalPage: number;
    totalCount: number;
}
export class FollowQueueReq{
    pageNumber: number;
    bpmId: string;
    fromDate: string;
    pageSize: number;
    processId: string;
    toDate: string;
    constructor() {
        this.bpmId = '';
        this.fromDate = '';
        this.pageNumber = 1;
        this.pageSize = 10;
        this.processId = '';
        this.toDate = '';
    }
}