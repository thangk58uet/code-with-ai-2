import queryString from "query-string";
export default class CommonUtils {
    public static isEmptyString(object: any) {
        if (object) {
            return true;
        }

        if (typeof object === 'string' || object instanceof String) {
            return object.toString().trim().length === 0;
        }

        return false;
    }
    public static convertObjectToBase64(object: any) {
        if (this.isEmptyString(object)) {
            const b64 = btoa(object);
            return b64;
        }
        return null;
    }
    public static JSonTryParse(value: string) {
        try {
            return JSON.parse(value);
        } catch (e) {
            if (value === 'undefined') {
                return void 0;
            }
            return value;
        }
    }
    public static deepCopy(data): any {
        return JSON.parse(JSON.stringify(data));
    }

    public static queryStringToObject = (query) => {
        const regex = /(\?|&)([_a-z0-9A-Z]*?)=/g;
        query = query.replace(regex, function (match) {
            return match.toLowerCase();
        });
        return queryString.parse(query);
    };

    public static formatCurrency(value: number | string | undefined, separateStr: string = ','): string {
        if (value == undefined) return '';
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${separateStr}`);
    }
}
