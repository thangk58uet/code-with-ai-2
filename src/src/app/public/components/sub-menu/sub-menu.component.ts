import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SubMenu } from '../../models/sub-menu';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  @Input() subMenu!: SubMenu;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  subMenuClicked(): void {
    if (this.subMenu.url) {
      this.route.navigate([this.subMenu.url]);
    }
    this.subMenu.open = !this.subMenu.open;
  }

  subMenuAuxClicked(event) {
    if (this.subMenu.url && event.which === 2) {
      window.open(this.subMenu.url);
    }
  }
  //Xu ly khi click vao subMenu
  clickSubMenu(event) {
    //Disable reload page khi click subMenu
    event.preventDefault();
 }

  get isFocus(): boolean {
    if (!this.subMenu.url) {
      return false;
    }
    return this.route.url === ('/' + this.subMenu.url);
  }



}
