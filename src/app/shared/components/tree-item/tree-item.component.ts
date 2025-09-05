import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeItemResponse, TreeModel, TreeOptionModel, TreeOptionResponse } from '@shared/models/tree.model';
@Component({
  selector: 'bpm-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnInit {
  @Input() treeItem: TreeModel<any>;
  @Input() optionList: TreeOptionModel[];
  @Input() index: number;
  @Input() level;
  @Input() selectable: boolean = false;
  
  @Output() treeItemChecked: EventEmitter<TreeItemResponse> = new EventEmitter(null);
  @Output() treeItemEvent: EventEmitter<TreeOptionResponse<any>> = new EventEmitter(null);

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.level) {
      this.level = 0;
    }
    this.level++;
  }

  get treeDisplayValue(): any {
    if (!this.treeItem) {
      return '';
    }
    let data = this.treeItem.data;
    this.treeItem.selector.forEach((variable) => {
      data = data[variable];
    });
    return data;
  }

  public allChildSelected(): boolean {
    return this.allChildChecked(this.treeItem);
  }

  allChildChecked(treeItem: TreeModel<any>): boolean {
    if (!treeItem.child || treeItem.child.length === 0) {
      return true;
    }
    const allChecked = treeItem.child.every(childItem => {
      return childItem.checked && this.allChildChecked(childItem);
    });
    return allChecked;
  }

  public masterToggle(event): void {
    this.treeItemChecked.emit({ index: this.index, checked: event.checked });
    if (!event || !this.treeItem.child || this.treeItem.child.length === 0) {
      return;
    }
    this.checkAllChildItem(this.treeItem.child, event.checked);
  }

  private checkAllChildItem(treeItem: TreeModel<any>[], checked: boolean): void {
    treeItem.forEach(item => {
      item.checked = checked;
      if (!item.child || item.child.length === 0) {
        return;
      }
      this.checkAllChildItem(item.child, checked);
    });
  }

  childEventChange(event: any) {
    this.treeItem.child[event.index].checked = event.checked;
    const atLeastOne = this.treeItem.child.some(item => {
      if (item.checked) {
        return true;
      }
    });
    if (atLeastOne) {
      this.treeItem.checked = true;
    } else {
      this.treeItem.checked = false;
    }
    this.changeDetectorRef.detectChanges();
    this.treeItemChecked.emit({ index: this.index, checked: this.treeItem.checked });
  }

  treeOptionclicked(option: TreeOptionModel) {
    this.treeItemEvent.emit({ key: option.key, treeItem: this.treeItem});
  }

  optionEventChange(event: TreeOptionResponse<any>) {
    this.treeItemEvent.emit(event);
  }
}
