export class AsyncFileKafka {
    channel: string; //mặc định là BPM_LC
    channelId: string;
    metaDataList: AsyncFileMetaData[];
    requestId: string;
    userUpload: string;
    toSystem: string;
}

export class AsyncFileMetaData {
    code: string;
    fileId: string;
    fileName: string;
}