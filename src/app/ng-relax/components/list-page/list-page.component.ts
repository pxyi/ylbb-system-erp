import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { QueryNode } from '../query/query.component';

@Component({
  selector: 'ea-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

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

  private _EaTableTbodyTr: TemplateRef<void>;
  @Input()
  set EaTableTbodyTr(value: TemplateRef<void>) {
    this._EaTableTbodyTr = value;
  }
  get EaTableTbodyTr(): TemplateRef<void> {
    return this._EaTableTbodyTr;
  }
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
