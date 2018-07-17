import { YlbbResponse } from '../../core/interface-config';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) { }

  /*
  *  post/get 请求方法:
  *    接收参数
  *            1. 请求地址: string    (必填)
  *            2. 请求参数: object    (必填: 可为空)
  */
  post(url: string, query: object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<YlbbResponse>(url, query).subscribe(res => {
        if (res.code && res.code != 1000) {
          this.message.warning(res.info);
        }
        resolve(res)
      });
    })
  }

  get(url: string, query: object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<YlbbResponse>(url, { params: new HttpParams({ fromString: serialize(query) }) }).subscribe(res => {
        if (res.code && res.code != 1000) {
          this.message.warning(res.info);
        }
        resolve(res)
      });
    })
  }

}

/* 序列化请求参数 */
export const serialize = (data: object): string => {
  let val = '';
  for (let v in data) {
    if (data[v] !== '' && data[v] !== null && data[v] !== undefined) {
      val += `${v}=${data[v]}&`;
    }
  }
  return val.slice(0, val.length - 1);
}