export class SubMenu {
    menuId?: number;
    menuName?: string;
    url?: string;
    menuIcon?: string;
    iconUrl?: string;
    open?: boolean;
    parentId?: number;
    sortOrder?: number;
    child?: SubMenu[];
    menuDescription?: string;
}
