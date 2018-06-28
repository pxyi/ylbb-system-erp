import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * @function  存储数据至本地
   * @param key 
   * @param value 
   * @description 存储数据至本地
   * @author phuhoang
   */
  set(key: string, value: any): Observable<any> {
    let [valToStr, descStr] = [
      typeof value === 'object' ? JSON.stringify(value) : value,
      JSON.stringify({ version: environment.version, setTime: new Date().getTime() })
    ];
    let cacheValue = `${valToStr}|--cache--|${descStr}`;
    window.localStorage.setItem(key, cacheValue);
    return new Observable(observer => {
      observer.next(cacheValue);
      observer.complete();
    });
  }

  /**
   * @function  根据key获取数据 
   * @param key 
   * @param params 
   * @description 获取本地存储数据, 若无或版本号不一致/缓存时间已过, 则从服务器获取
   * @author phuhoang
   */
  get(key: string, params: object = {}): Observable<any> {
    return new Observable(observer => {
      let value = window.localStorage.getItem(key);
      if (value) {
        try {
          let [val, desc] = [JSON.parse(value.split('|--cache--|')[0]), JSON.parse(value.split('|--cache--|')[1])];
          if (desc.version === environment.version) {
            observer.next(val);
            observer.complete();
          } else {
            this._asyncData(observer, key, params);
          }
        } catch (error) {
          this._asyncData(observer, key, params);
        }
      } else {
        this._asyncData(observer, key, params);
      }
    })
  }

  /**
   * @function 请求远程数据,并存储
   * @param observer 
   * @param key 
   * @param params 
   * @author phuhoang
   */
  private _asyncData(observer, key, params) {
    this.http.post<any>(key, params).subscribe(res => {
      if (res.code == 1000) { this.set(key, res.result); }
      let result = res.code == 1000 ? res.result : null;
      observer.next(result);
      observer.complete();
    })
  }
}
