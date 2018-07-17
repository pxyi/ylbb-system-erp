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
  *            3. 是否自动根据状态码提示： boolean (默认为： true)
  */
  post(url: string, query: object = {}, auto = true): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<YlbbResponse>(url, query).subscribe(res => {
        (auto && res.code) && this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        (auto && res.code != 1000) ? reject(res) : resolve(res);
      });
    })
  }

  get(url: string, query: object = {}, auto = true): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<YlbbResponse>(url, { params: new HttpParams({ fromString: serialize(query) }) }).subscribe(res => {
        (auto && res.code) && this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        (auto && res.code != 1000) ? reject(res) : resolve(res);
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
export interface YlbbResponse {
  code: number;
  info: string;
  result: any
}