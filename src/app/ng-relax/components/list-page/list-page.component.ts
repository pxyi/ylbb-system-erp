import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { QueryNode, QueryComponent } from '../query/query.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'ea-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  @ViewChild('EaQuery') eaQuery: QueryComponent;
  @ViewChild('EaTable') eaTable: TableComponent;

  @Input() type: 'default' | 'simpify' = 'default';

  @Input('queryTitle') title: string;

  @Input() queryNode: QueryNode[] = [];

  @Input() tableThead: any[] = [];

  @Input() url: string;

  @Input() paramsDefault: any = {};

  @Input() checkedItems: any[];

  @Input() checkedKey: string = 'id';

  @Input() checked: boolean;

  @Input() isRadio: boolean = false;

  @Input() allowSpace: boolean = true;

  @Input() EaTableTbodyTr: TemplateRef<void>;

  @Input() EaTableTbodyExpand: TemplateRef<void>;

  @Input() EaQueryBtns: TemplateRef<void>;
  
  private _EaBtns: TemplateRef<void>;
  @Input()
  set EaBtns(value: TemplateRef<void>) {
    this._EaBtns = value;
  }
  get EaBtns(): TemplateRef<void> {
    return this._EaBtns;
  }

  @Output('requestReady') requestComplate: EventEmitter<any> = new EventEmitter();
  requestReady(e) {
    this.requestComplate.emit(e);
  }

  @Output() checkedItemsChange: EventEmitter<any[]> = new EventEmitter();
  checkedChange(e) {
    this.checkedItemsChange.emit(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
