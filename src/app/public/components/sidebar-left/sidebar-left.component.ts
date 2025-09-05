import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { LocalStorageManagerService } from '@core/services/local-store-manager.service';
import { MenuCoreService } from '@core/services/menu.core.service';
import CommonUtils from '@core/utils/utils';
import { LocalStorageEnum } from '@shared/models/enum/local-store.enum';
import { SubMenu } from '../../models/sub-menu';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss'],
})
export class SidebarLeftComponent implements OnInit {
  @Output() menuEventEmitter: EventEmitter<any> = new EventEmitter();
  constructor(private auth: AuthenticationService, private menuService: MenuCoreService, private route: Router) {}
  filterValue = '';
  subMenus: SubMenu[] = []
  filteredMenu: SubMenu[] = [];
  fixedMenu: SubMenu[] = [
    {
      menuName: 'Home',
      menuIcon: 'home',
      url: '/',
    }
  ];

  ngOnInit(): void {
    this.initMenu();
    this.filteredMenu = [...this.fixedMenu, ...this.subMenus];
  }

  private initMenu(): void {
    this.subMenus = this.menuService.getMenu();
    this.isCurrentUrlMatchMenu(this.subMenus);
  }

  filterMenu(filter: string): void {
    const menu2Search = [ ...this.fixedMenu, ...this.subMenus];
    this.filteredMenu = this.findBySubMenuName(
      filter,
      CommonUtils.JSonTryParse(JSON.stringify(menu2Search))
    );
  }

  private findBySubMenuName(value: string, subMenus: SubMenu[]): SubMenu[] {
    return subMenus.filter((x) => {
      if (!x.menuName) {
        return false;
      }
      if (!!x.menuName.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (x.child) {
        const filterChild = this.findBySubMenuName(value, x.child);
        if (filterChild.length > 0) {
          x.child = filterChild;
          x.open = true;
          return true;
        }
      }
      return false;
    });
  }

  isCurrentUrlMatchMenu(menu: SubMenu[]): boolean {
    const find = menu.find(x => this.route.url.includes(x.url) || (x.child && this.isCurrentUrlMatchMenu(x.child)));
    if (find) {
      find.open = true;
    }
    return !!find;
  }

  showMenu() {
    this.menuEventEmitter.emit();
  }
}
