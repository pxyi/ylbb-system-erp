import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

declare const OSS;

@Injectable()
export class AliOssClientService {

  private _aliOssClient;

  private _loading: boolean;

  private domain = environment.domainOss;

  constructor(
    private http: HttpService
  ) { }

  getClient(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._aliOssClient) {
        resolve(this._aliOssClient)
      } else if (this._loading) {
        this._getAliOssToken(resolve, reject);
      } else {
        this._loading = true;
        this.http.get(this.domain + '/oss/getOSSToken?type=1', {}, false).then(res => {
          this._loading = false;
          if (res.result == 0) {
            let creds = res['data'];
            this._aliOssClient = new OSS.Wrapper({
              region: 'oss-cn-beijing',
              accessKeyId: creds.accessKeyId,
              accessKeySecret: creds.accessKeySecret,
              stsToken: creds.securityToken,
              bucket: 'ylbb-business'
            });
            resolve(this._aliOssClient);
          }
        }).catch(err => reject(err));
      }
    })
  }

  private meterCounter = 0;

  private _getAliOssToken(resolve, reject) {
    this.meterCounter++;
    this.meterCounter > 20 ? reject(null) : setTimeout(() => {
      this._aliOssClient ? resolve(this._aliOssClient) : this._getAliOssToken(resolve, reject);
    }, 500);
  }

}