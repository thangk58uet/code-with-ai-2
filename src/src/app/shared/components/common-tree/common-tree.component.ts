import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeModel, TreeOptionModel, TreeOptionResponse } from '@shared/models/tree.model';
@Component({
  selector: 'bpm-common-tree',
  templateUrl: './common-tree.component.html',
  styleUrls: ['./common-tree.component.scss']
})
export class CommonTreeComponent implements OnInit {
  /**
   * @requires treeItems
   * Required for data initiation
   */
  @Input() treeItems: TreeModel<any>[];

  /**
   * @param optionList
   * Display tree item menu if had any
   */
  @Input() optionList: TreeOptionModel[];

  /**
   * @param selectable
   * Enable selectable checkbox 
   */
  @Input() selectable: boolean = false;

  @Output() treeItemChecked: EventEmitter<TreeModel<any>[]> = new EventEmitter(null);
  @Output() treeItemEvent: EventEmitter<TreeOptionResponse<any>> = new EventEmitter(null);

  constructor() { }

  ngOnInit() {}

  treeEventChange(event: any) {
    this.treeItems[event.index].checked = event.checked;
    this.treeItemChecked.emit(this.treeItems);
  }

  optionEventChange(event: TreeOptionResponse<any>) {
    this.treeItemEvent.emit(event);
  }
}
