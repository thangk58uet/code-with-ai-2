export class TreeModel<T> {
    checked: boolean;
    open: boolean;
    data: T;
    icon?: string;
    selector: string[];
    child?: TreeModel<T>[];
    constructor(treeModel: {checked?: boolean, open?: boolean, data?: T, icon?: string, selector?: string[], child?: TreeModel<T>[]} = {}) {
        this.checked = treeModel.checked ? treeModel.checked : false;
        this.open = treeModel.open ? treeModel.open : false;
        this.data = treeModel.data ? treeModel.data : null;
        this.icon = treeModel.icon ? treeModel.icon : null;
        this.selector = treeModel.selector ? treeModel.selector : null;
        this.child = treeModel.child ? treeModel.child : null;
    }
}

export class TreeOptionModel {
    name: string;
    key: string;
    icon?: string;
}

export class TreeItemResponse {
    index: number;
    checked: boolean;
}

export class TreeOptionResponse<T> {
    key: string;
    treeItem: TreeModel<T>;
}