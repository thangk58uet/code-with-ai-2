
export class SearchReponse<T> {
    items: T[];
    pageNum: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
}