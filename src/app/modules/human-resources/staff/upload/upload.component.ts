import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

declare const OSS;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  avatarUrl: string;

  private _aliOssClient;

  constructor(
    private message: NzMessageService,
    private http: HttpService
  ) { 
    /* ----------------- 获取OSS上传凭证 ----------------- */
    this.http.get('http://oss.beibeiyue.com/oss/getOSSToken?type=1', {}, false).then(res => {
      if (res.result == 0) {
        let creds = res.data;
        this._aliOssClient = new OSS.Wrapper({
          region: 'oss-cn-beijing',
          accessKeyId: creds.accessKeyId,
          accessKeySecret: creds.accessKeySecret,
          stsToken: creds.securityToken,
          bucket: 'ylbb-business'
        });
      }
    });
  }

  ngOnInit() {}

  beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG) {
      this.message.error('图片格式不正确!');
    } else if (!isLt2M) {
      this.message.error('图片大小请小于2MB!');
    } else {
      let fileType = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
      let fileName = new Date().getTime() + `.${fileType}`;
      this._aliOssClient.multipartUpload(fileName, file, {}).then(res => {
        let imageSrc = res.url ? res.url : 'http://' + res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
        this.avatarUrl = imageSrc;
      }, err => {
        this.message.error('图片上传失败，请重新尝试');
      })
    }
    return false
  }

}
