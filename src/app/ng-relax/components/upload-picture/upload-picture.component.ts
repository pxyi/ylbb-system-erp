import { HttpService } from './../../services/http.service';
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

declare const OSS;

@Component({
  selector: 'ea-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadPictureComponent),
    multi: true
  }]
})
export class UploadPictureComponent implements OnInit {


  private _aliOssClient

  picturesChange: any = () => {};

  @Input() maxLength = 1;


  private _pictures
  @Input()
  set pictures(pic) {
    if (typeof pic === 'string') {
      this._pictures = pic.split(',').map((item, idx) => {
        let uploadfile: any = {};
        uploadfile.uid = idx;
        uploadfile.url = item;
        uploadfile.status = 'done';
        return uploadfile;
      })
    } else if (typeof pic === 'object') {
      this._pictures = pic;
    } else if (typeof pic === 'number') {
      this._pictures = this.pictures;
    } else {
      this._pictures = [];
    }
    let pictureString = []
    if (this._pictures.length) {
      this._pictures.map(res => {
        pictureString.push(res.url);
      }) 
    }

    setTimeout(() => {
      this.allowuploadNo = pictureString.length >= this.maxLength ? this.maxLength : pictureString.length + 1;
    }, 500);
    this.picturesChange(pictureString.join(','));
  }
  get pictures() {
    return this._pictures;
  }

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

  ngOnInit() {
  }


  /* 实现 ControlValueAccessor 接口部分 */
  writeValue(val: any): void {
    if (val) {
      this.pictures = val;
    }
  }
  registerOnChange(fn: any): void {
    this.picturesChange = fn;
  }
  registerOnTouched(fn: any): void {
  }


  allowuploadNo = 1;
  beforeUpload = (file: UploadFile): boolean => {
    this._validatorUploadFile(file).subscribe(res => {
      if (res) {
        // setTimeout(() => {
        //   this.allowuploadNo = this.pictures.length < this.maxLength ? this.pictures.length + 1 : this.maxLength;
        // }, 500);
      }
    })
    return false;
  }
  deletePicture = () => {
    setTimeout(_ => {
      this.allowuploadNo = this.allowuploadNo == this.maxLength ? this.maxLength : this.allowuploadNo - 1;
    }, 0)
    return true;
  }




  previewImage: string;
  previewVisible: boolean;
  private _allowUpdateType = ['jpg', 'jpeg', 'png', 'gif'];
  private _validatorUploadFile(file: UploadFile): Observable<any> {
    return new Observable(observer => {
      let fileType = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
      if (this._allowUpdateType.indexOf(fileType) === -1) {
        this.message.error(`请选择格式为 ${this._allowUpdateType.join(' | ')} 的图片`);
        observer.next(null);
        observer.complete();
      } else if (!(file.size / 1024 / 1024 < 2)) {
        this.message.error(`图片大小超出2MB，请更换图片`);
        observer.next(null);
        observer.complete();
      } else {
        let fileName = new Date().getTime() + `.${fileType}`;

        this._aliOssClient.multipartUpload(fileName, file, {}).then(res => {
          let imageSrc = res.url ? res.url : 'http://' + res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
          let arr = this.pictures || [];
          arr.push({
            uid: file.uid,
            url: imageSrc,
            status: 'done'
          });
          this.pictures = arr;
          observer.next(true);
          observer.complete();
        }, err => {
          observer.next(null);
          observer.complete();
          this.message.error('图片上传失败，请重新尝试');
        })
      }
    })
  }
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

}
