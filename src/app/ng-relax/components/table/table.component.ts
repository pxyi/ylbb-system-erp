import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'ea-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() thead        : any[] = [];

  @Input() url          : string;

  @Input() paramsDefault: any = {};

  @Input() checkedItems : any[];

  @Input() checkKey     : string = 'id';

  @Input() expand       : boolean;

  @Input() checked      : boolean;

  @Input() allowSpace   : boolean = true;

  @Output() checkedItemsChange: EventEmitter<any[]> = new EventEmitter();


  private _EaTableTbodyTr: TemplateRef<void>;
  @Input()
  set EaTableTbodyTr(value: TemplateRef<void>) {
    this._EaTableTbodyTr = value;
  }
  get EaTableTbodyTr(): TemplateRef<void> {
    return this._EaTableTbodyTr;
  }

  dataSet   : any[] = [];

  _pageInfo : PageInfo = new PageInfo();

  _params   : object = {};


  /* ---------- 是否为全选及是否选择 ---------- */
  _allChecked   : boolean;
  _indeterminate: boolean;

  constructor(
    private http    : HttpClient,
    private message : NzMessageService
  ) { }

  ngOnInit() {
    this._request();
  }

  _request(isReset?: boolean): void {
    if (this._pageInfo.loading) { return; }
    this._pageInfo.loading = true;
    let params = Object.assign({ paramJson: JSON.stringify(Object.assign(JSON.parse(JSON.stringify(this.paramsDefault)), this._params)) }, { pageNum: isReset ? 1 : this._pageInfo.pageNum, pageSize: this._pageInfo.pageSize });
    this.http.post<any>(this.url, params).subscribe(res => {
      if (res.code == 1000) {
        this.dataSet = res.result.list;
        this._pageInfo.pageNum = res.result.pageNum;
        this._pageInfo.totalPage = res.result.totalPage;

        /* ------------------- 如果存在选择列表则初始数据 ------------------- */
        if (this.checkedItems) {
          this.dataSet.map((res: any) => res.checked = this.checkedItems.indexOf(res[this.checkKey]) > -1);
          this.isChecked();
        }

      } else {
        this.message.warning(res.info);
      }
      this._pageInfo.loading = false;
    }, err => {
      this._pageInfo.loading = false;
    });
  }
  request(params): void {
    this._params = params;
    this._request(true);
  }


  /* --------------------- 点击全选 --------------------- */
  _checkAll(value: boolean): void {
    this.dataSet.map( (res: any) => res.checked = value);
    this.isChecked();
  }

  /* --------------------- 点击选择 --------------------- */
  isChecked(): void {
    let allChecked = this.dataSet.every((value: any) => value.checked === true);
    let allUnChecked = !allChecked;
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._resetCheckedItems();
  }

  _resetCheckedItems(): void {
    this.dataSet.map((res: any) => {
      if (res.checked) {
        if (this.checkedItems.indexOf(res[this.checkKey]) === -1) {
          this.checkedItems.push(res[this.checkKey]);
        }
      } else {
        if (this.checkedItems.indexOf(res[this.checkKey]) > -1) {
          this.checkedItems.splice(this.checkedItems.indexOf(res[this.checkKey]), 1);
        }
      }
    })
    this.checkedItemsChange.emit(this.checkedItems);
  }

}

/** 
 * @interface   初始化分页信息
 * @description 2018-02-28
 */
class PageInfo {
  constructor(
    public loading    : boolean = false,
    public totalPage  : number = 0,
    public pageNum    : number = 1,
    public pageSize   : number = 10
  ) { }
}

export interface TheadNode {
  name  : string;
  width?: string | number;
  left? : number;
  right?: number;
}