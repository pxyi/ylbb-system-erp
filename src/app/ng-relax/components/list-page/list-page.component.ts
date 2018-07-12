import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { QueryNode, QueryComponent } from '../query/query.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'ea-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  @ViewChild('EaQuery') EaQuery: QueryComponent;
  @ViewChild('EaTable') EaTable: TableComponent;

  @Input() queryNode: QueryNode[] = [];

  @Input() tableThead: any[] = [];

  @Input() url: string;

  @Input() paramsDefault: any = {};

  @Input() checkedItems: any[];

  @Input() checkKey: string = 'id';

  @Input() expand: boolean;

  @Input() checked: boolean;

  @Input() allowSpace: boolean = true;

  @Output() checkedItemsChange: EventEmitter<any[]> = new EventEmitter();

  @Input() EaTableTbodyTr: TemplateRef<void>;

  @Input() EaQueryBtns: TemplateRef<void>;
  
  private _EaBtns: TemplateRef<void>;
  @Input()
  set EaBtns(value: TemplateRef<void>) {
    this._EaBtns = value;
  }
  get EaBtns(): TemplateRef<void> {
    return this._EaBtns;
  }

  checkedChange(e) {
    this.checkedItemsChange.emit(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
