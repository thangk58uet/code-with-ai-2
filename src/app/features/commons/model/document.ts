import { FROM_SYSTEM, R_OBJECT__TYPE, SOURCE_ID } from './../constants/common.const';
export class UploadEcmFileRequest {
    bpmId: string; //
    objectName: string; //value = "test.docx",  example = "test.docx"
    robjectType: string; //value = "bpm_doc",  example = "bpm_doc"
    acontentType: string; //value = "docx",  example = "docx"
    fromSystem: string; // value = "bpm_lcxk",  example = "bpm_lcxk"
    userUpload: string; // value = "bpmtest1",  example = "bpmtest1"
    docCode: string; // value = "0001",  example = "0001"
    sourceId: string;
    uploadedStatusId: string;
    content: any;
    taskId: string;
    branchId: string;
    t24Code: string;
    
    constructor() {
        this.fromSystem = FROM_SYSTEM;
        this.robjectType = R_OBJECT__TYPE;
        this.sourceId = SOURCE_ID;
    }
}

export class DocumentResponse {
    docCode: string;
    docName: string;
    // fileNameTemp: string;
    uploadedFileInfo: string;
    lstUploadedFile: Array<BpmLcxkUploadedFileDTO>;
    content: Array<File> = [];
    element: any;
    upload:boolean;
    constructor() {
        this.lstUploadedFile = Array<BpmLcxkUploadedFileDTO>();
        // this.content = Array<File>();
    }
}
export class BpmLcxkUploadedFileDTO {
    fileId: string;
    fileName: string;
    uploadedUser: string;
    uploadedDate: string;
    loadedStatusId: number;
    sourceId: string;
    selected: boolean;
    enableDelete: boolean;
}
