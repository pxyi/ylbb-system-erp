import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'ea-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  host: {
    '[class.ea-query]': 'true'
  }
})
export class QueryComponent implements OnInit {

  private _EaQueryBtns: TemplateRef<void>;
  @Input()
  set EaQueryBtns(value: TemplateRef<void>) {
    this._EaQueryBtns = value;
  }
  get EaQueryBtns(): TemplateRef<void> {
    return this._EaQueryBtns;
  }

  @Input('node') _node: QueryNode[] = [];

  @Output() onSubmit: EventEmitter<object> = new EventEmitter();

  _queryForm: FormGroup;
  _showSlideBtn: boolean;
  isCollapse: boolean = true;

  constructor(
    private http     : HttpClient,
    private datePipe : DatePipe,
    private cache    : CacheService
  ) {
  }

  ngOnInit() {
    this._queryForm = new FormGroup({});
    this._node.map((res: any, idx) => {
      if (res.isHide) { this._showSlideBtn = true; }
      if (res.type === 'numbetween') {
        this._queryForm.addControl(res.valueKey[0], new FormControl(res.default ? res.default[0] : ''));
        this._queryForm.addControl(res.valueKey[1], new FormControl(res.default ? res.default[1] : ''));
      } else {
        this._queryForm.addControl(res.key, new FormControl(res.default || null));
      }
      if (res.type === 'select') {
        res.optionKey = res.optionKey || { label: 'name', value: 'id' };
        if (res.optionsUrl && res.noCache) {
          this.http.post<any>(res.optionsUrl, {}).subscribe(result => {
            res.options = (res.options || []).concat(result.result);
            res.optionsResult && res.optionsResult(res.options);
          })
        } else if (res.optionsUrl) {
          this.cache.get(res.optionsUrl).subscribe(result => {
            res.options = (res.options || []).concat(result);
            res.optionsResult && res.optionsResult(res.options);
          })
        }
      }
      return res;
    });
  }

  /* --------------- 重置 --------------- */
  _reset(): void {
    this._queryForm.reset();
  }

  /* ------------- 清空Input ------------- */
  _clearControlValue(key: string): void {
    this._queryForm.get(key).reset();
  }


  /* --------------- 清空 --------------- */
  _submit(): void {
    let queryForm = this._queryForm.value;
    this._node.map((res: any) => {
      if (res.type === 'datepicker') {
        if (queryForm[res.key]) {
          queryForm[res.key] = this.datePipe.transform(queryForm[res.key].getTime(), 'yyyy-MM-dd');
        }
      }
      if (res.valueKey) {
        if (res.type === 'rangepicker') {
          if (queryForm[res.key] && queryForm[res.key][0]) {
            queryForm[res.valueKey[0]] = this.datePipe.transform(queryForm[res.key][0].getTime(), 'yyyy-MM-dd');
            queryForm[res.valueKey[1]] = this.datePipe.transform(queryForm[res.key][1].getTime(), 'yyyy-MM-dd');
          }
        }
        if (res.type === 'between') {
          if (!queryForm[res.valueKey[0]]) delete queryForm[res.valueKey[0]];
          if (!queryForm[res.valueKey[1]]) delete queryForm[res.valueKey[1]];
        }
        delete queryForm[res.key];
      }
      if (queryForm[res.key] === '' || queryForm[res.key] === null || queryForm[res.key] === undefined) {
        delete queryForm[res.key];
      }
    });

    this.onSubmit.emit(queryForm);
  }
}

export interface QueryNode {
  label       : string;
  key         : string;
  type        : 'input' | 'select' | 'between' | 'datepicker' | 'rangepicker';
  default?    : any;
  valueKey?   : string[];
  options?    : any[];
  optionsUrl? : string;
  optionKey?  : OptionsKey;
  placeholder?: string | string[];
  isHide?     : boolean;
}
export interface OptionsKey {
  label: string;
  value: string;
}