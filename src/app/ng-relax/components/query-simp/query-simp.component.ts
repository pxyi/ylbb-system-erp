import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { QueryNode } from '../query/query.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'ea-query-simp',
  templateUrl: './query-simp.component.html',
  styleUrls: ['./query-simp.component.scss'],
  host: {
    '[class.ea-query-simp]': 'true'
  }
})
export class QuerySimpComponent implements OnInit {

  @Input() title: string = '';

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
      if (res.type === 'between') {
        this._queryForm.addControl(res.valueKey[0], new FormControl(res.default ? res.default[0] : ''));
        this._queryForm.addControl(res.valueKey[1], new FormControl(res.default ? res.default[1] : ''));
      } else {
        this._queryForm.addControl(res.key, new FormControl(res.default || null));
      }
      if (res.type === 'select' || res.type === 'radio') {
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

  patchValue(key: string, value: object): void {
    this._node.map(res => {
      res.key === key && (res = Object.assign(res, value));
      return res;
    })
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
          delete queryForm[res.key];
        }
        if (res.type === 'between') {
          if (!queryForm[res.valueKey[0]]) delete queryForm[res.valueKey[0]];
          if (!queryForm[res.valueKey[1]]) delete queryForm[res.valueKey[1]];
        }
      }
      if (queryForm[res.key] === '' || queryForm[res.key] === null || queryForm[res.key] === undefined) {
        delete queryForm[res.key];
      }
    });

    this.onSubmit.emit(queryForm);
  }

}
