import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageManagerService } from './local-store-manager.service';
import { SubMenu } from 'app/public/models/sub-menu';
import { LocalStorageEnum } from '@shared/models/enum/local-store.enum';
import { Title } from '@angular/platform-browser';

export interface Menu {
  route: string;
  name: string;
  icon: string;
  children?: MenuChildrenItem[];
}

export interface MenuChildrenItem {
  route: string;
  name: string;
  children?: MenuChildrenItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuCoreService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private localStorage: LocalStorageManagerService,
    private router: Router
  ) {}
  private menu$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  navigateToHome() {
    this.router.navigate(['/']);
  }
  reset() {
    this.menu$.next([]);
  }

  /**
   * get Menu from local then convert it into SubMenu
   * @returns
   */
  getMenu(): SubMenu[] {
    let menus: SubMenu[] = this.localStorage.getData(
      LocalStorageEnum.Menu_List
    );
    return this.mapMenuBe2Fe(menus);
  }

  /**
   * get Menu from local then convert it into SubMenu
   * @returns
   */
  getRawMenu(): SubMenu[] {
    let menus: SubMenu[] = this.localStorage.getData(
      LocalStorageEnum.Menu_List
    );
    return menus;
  }

  /**
   * sort Menu by sort order
   * @returns
   */
  sortMenu(menus: SubMenu[]): SubMenu[] {
    if (menus.length === 0) {
      return [];
    }
    menus = menus.sort((a, b) => {
      if (!a.sortOrder && !b.sortOrder) {
        return -1;
      }
      if (a.sortOrder && !b.sortOrder) {
        return 0 - a.sortOrder;
      }
      if (!a.sortOrder && b.sortOrder) {
        return b.sortOrder;
      }
      return a.sortOrder - b.sortOrder;
    });
    return menus;
  }

  /**
   * convert list menu from serve to SubMenu
   * @param menuServer
   * @returns
   */
  mapMenuBe2Fe(menuServer: SubMenu[]): SubMenu[] {
    let subMenus: SubMenu[] = [];
    if (menuServer) {
      menuServer.map((menu: any) => {
        if (!menu.parentId) {
          let menuClient: SubMenu = new SubMenu();
          menuClient.menuName = menu.menuName;
          menuClient.url = menu.url;
          menuClient.menuIcon = menu.menuIcon;
          menuClient.parentId = menu.parentId;
          menuClient.menuId = menu.menuId;
          menuClient.child = this.getChildMenuModern(menuServer, menu.menuId);
          menuClient.menuDescription = menu.menuDescription;
          menuClient.sortOrder = menu.sortOrder;
          subMenus.push(menuClient);
        }
      });
    }
    return this.sortMenu(subMenus);
  }

  /**
   * get child menu in menu (recursive)
   * @param menu SubMenu[]
   * @param menuId menuId
   * @returns
   */
  getChildMenuModern(menu: SubMenu[], menuId: number): SubMenu[] {
    let result: SubMenu[] = [];
    menu
      .filter((item: SubMenu) => item.parentId !== 0)
      .forEach((item) => {
        if (item.parentId == menuId) {
          const children = this.getChildMenuModern(menu, item.menuId);
          if (children && children.length) {
            item.child = children;
          }
          result.push(item);
        }
      });
    return this.sortMenu(result);
  }

  /**
   * get menu title in data or local storage
   * @param routeData
   * @returns
   */
  getMenuTitleByRoute(routeData): string {
    if (routeData instanceof NavigationEnd) {
      const subMenus = this.getRawMenu();
      let title = '';
      let child = this.activatedRoute.firstChild;
      let hasTitle = false;
      while (child) {
        if (child.firstChild) {
          child = child.firstChild;
        } else if (child.snapshot.data && child.snapshot.data['title']) {
          hasTitle = true;
          this.titleService.setTitle(child.snapshot.data['title']);
          title = child.snapshot.data['title'];
          return title;
        } else {
          break;
        }
      }
      const currentMenu = subMenus.find(
        (menu) => menu.url && routeData.url.includes(menu.url)
      );
      if (currentMenu) {
        this.titleService.setTitle(currentMenu.menuName);
        title = currentMenu.menuName;
      } else {
        this.titleService.setTitle('BPM Home');
        title = 'BPM';
      }
      return title;
    }
  }
}
