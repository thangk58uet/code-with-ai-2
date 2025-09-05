export interface HttpOptions {
    url?: string;
    path?: string;
    body?: any;
    headers?: any;
    params?: any;
    cacheMins?: number;
    isAuthentication?: boolean;
    isLoading?: boolean;
    responseType?: "json" | "arraybuffer" | "blob" | "text";
    observe?: "body" | "events" | "response";
}