import { HttpService } from 'src/app/ng-relax/services/http.service';
import { PreviewComponent } from '../preview/preview.component';
import { Observable } from 'rxjs';
import { NzMessageService, UploadFile, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from '../../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { AbmComponent } from 'angular-baidu-maps';

declare const BMap: any;
declare const OSS;
@Component({
  selector: 'app-small-program',
  templateUrl: './small-program.component.html',
  styleUrls: ['./small-program.component.scss']
})
export class SmallProgramComponent implements OnInit, OnDestroy {

  @ViewChild('breadcrumbTmpt') breadcrumbTmpt: TemplateRef<any>;

  formModel: FormGroup;

  tabsetSelectIndex: number = 0;

  getInfoLoading: boolean = true;

  private _aliOssClient;

  constructor(
    private store: Store<AppState>,
    private fb   : FormBuilder = new FormBuilder(),
    private http : HttpService,
    private message  : NzMessageService,
    private modal: NzModalService
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
    new Image().src = 'https://ylbb-system.oss-cn-beijing.aliyuncs.com/wechat/small-program-qrcode.png';
    new Image().src = 'http://ylbb-wxapp.oss-cn-beijing.aliyuncs.com/store/iphone-bg.png';
  }

  ngOnInit() {
    this.formModel = this.fb.group({
      shopName: [{ value: '', disabled: true }],                                               // 门店名称
      shopTel: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(8)]], // 门店预约电话
      publicCommentName: [],                                                                   // 大众点评名称
      meituanName: [],                                                                         // 美团名称
      shopAddress: [],                                                                         // 详细地址
      cascaderAddress: [, [Validators.required]],                                              // 省市区

      shopCoverImag: ['', [Validators.required]],                                              // 门店封面图
      shopImag: ['', [Validators.required]],                                                   // 门店图片

      facilitie: [this.facilitieItems],                                                        // 包含设施
      businessTime: [, [Validators.required]],                                                 // 营业时间
      healthSafe: [],                                                                          // 卫生安全
      warmPrompt: [],                                                                          // 温馨提示
      trafficInformation: [],                                                                  // 交通信息
      parkingInformation: [],                                                                  // 停车场信息

      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]]
    })
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });

    this.http.post('/wechat/selectSmallProgram', {}, false).then(res => {
      this.getInfoLoading = false;
      if (res.code == 1000) {
        if (res.result.facilitie) {
          this.facilitieItems.map((item: any) => {
            item.checked = res.result.facilitie.indexOf(item.value) > -1
          });
        }
        res.result.facilitie = this.facilitieItems;
        this.shopCoverImagItems = res.result.shopCoverImag.split(',').map((item, idx) => {
          let uploadfile: any = {};
          uploadfile.uid = idx;
          uploadfile.url = item;
          uploadfile.status = 'done';
          return uploadfile;
        });
        this.shopImagItems = res.result.shopImag.split(',').map((item, idx) => {
          let uploadfile: any = {};
          uploadfile.uid = idx;
          uploadfile.url = item;
          uploadfile.status = 'done';
          return uploadfile;
        });
        res.result.cascaderAddress = res.result.province ? [res.result.province, res.result.city, res.result.area] : '';
        this.formModel.patchValue(res.result);
        setTimeout(_ => {
          this.allowuploadNo = this.shopImagItems.length < 6 ? this.shopImagItems.length + 1 : 6;
        }, 0);
        this._mapMarkerInit();
      }
    });

  }

  /* ---------------- 默认回显坐标点 ---------------- */
  _mapMarkerInit() {
    if (this._map && this.formModel.get('longitude').value) {
      let point = new BMap.Point(this.formModel.get('longitude').value, this.formModel.get('latitude').value)
      this._map.centerAndZoom(point, 16);
      this._map.addOverlay(new BMap.Marker(point));
    }
  }

  @ViewChild('map') mapComp: AbmComponent;
  mapReadLoading: boolean = true;
  private _map: any;
  mapGeocoder;
  _mapAutocomplete;
  onReady(map: any) {
    this.mapReadLoading = false;
    this._map = map;
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity('北京');
    map.enableScrollWheelZoom(true);;
    
    map.addEventListener('click', this._mapClick.bind(this));

    this._mapMarkerInit();

    let _this_ = this;
    // 获取 地址/逆地理解析 方法
    let geoc = new BMap.Geocoder();
    this._shopAddressSearch = (text) => {
      // 删除地图覆盖物 （删除原有的点）
      map.clearOverlays();
      // 根据输入内容通过地理解析得到经纬度
      geoc.getPoint(text, function (point) {
        if (point) {
          // 将搜索到的经纬度复制给 form 表单
          _this_.formModel.patchValue({ longitude: point.lng, latitude: point.lat });
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMap.Marker(point));
        } else {
          _this_.message.warning('您选择地址没有解析到结果');
        }
      });
    }
    this._mapClickSearch = (point: any) => {
      // 将搜索到的经纬度复制给 form 表单
      _this_.formModel.patchValue({ longitude: point.lng, latitude: point.lat });
      // 删除地图覆盖物 （删除原有的点）
      map.clearOverlays();
      map.centerAndZoom(point, 16);
      map.addOverlay(new BMap.Marker(point));
      // 根据地理解析得到的经纬度， 逆地理解析得到省市区
      geoc.getLocation(point, function (res) {
        _this_.formModel.patchValue({ shopAddress: res.address });
      });
    }

  }
  /* --------- 根据输入的详细地址，进行地理、逆地理解析 得到经纬度和所在省市区 --------- */
  _shopAddressSearch: (text: string) => void;
  mapGeocoderSearch() {
    if (this.formModel.get('shopAddress').value) {
      this._shopAddressSearch(this.formModel.get('shopAddress').value);
    } else {
      this.message.warning('请输入门店详细地址');
    }
  }

  /* --------- 通过点击地图获取坐标，进行逆地理解析 得到经纬度和所在省市区和详细位置 --------- */
  _mapClickSearch: (point: object) => void;
  _mapClick(e: any) {
    this._mapClickSearch(e.point);
  }


  /* ------------------------- 省市区级联选择 ------------------------- */
  addressOptions: any[] = [];
  addressLoadData = (node: any, index: number) => {
    return new Promise((resolve) => {
      if (index < 0) {
        this.http.post('/wechat/getPosition', {}, false).then(res => {
          node.children = res.result.provinceList;
          resolve();
        })
      } else if (index === 0) {
        this.http.post('/wechat/getPosition', { provinceCode: node.value }, false).then(res => {
          node.children = res.result.cityList;
          resolve();
        })
      } else if (index === 1) {
        this.http.post('/wechat/getPosition', { cityCode: node.value }, false).then(res => {
          res.result.areaList.map(res => res.isLeaf = true);
          node.children = res.result.areaList;
          resolve();
        })
      }
    });
  }

  /* ------------------------- 图片上传 ------------------------- */
  shopCoverImagItems: UploadFile[] = [];
  shopImagItems: UploadFile[] = [];
  previewImage: string;
  previewVisible: boolean;
  private _allowUpdateType = ['jpg', 'jpeg', 'png', 'gif'];
  allowuploadNo = 1;
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

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
        let fileName = new Date().getTime() + this._mathRand() + `.${fileType}`;

        this._aliOssClient.multipartUpload(fileName, file, {}).then(res => {
          let imageSrc = res.url ? res.url : 'http://' + res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
          file.status = 'done';
          file.url = imageSrc;
          observer.next(file);
          observer.complete();
        }, err => {
          observer.next(null);
          observer.complete();
          this.message.error('图片上传失败，请重新尝试');
        })
      }
    })
  }

  shopCoverImagBeforeUpload = (file: UploadFile): boolean => {
    this._validatorUploadFile(file).subscribe(res => {
      if (res) {
        this.shopCoverImagItems.push(file);
        this.formModel.patchValue({
          shopCoverImag: this.shopCoverImagItems[0]['url']
        });
      }
    })
    return false;
  }
  shopImagBeforeUpload = (file: UploadFile): boolean => {
    this._validatorUploadFile(file).subscribe(res => {
      if (res) {
        this.shopImagItems.push(file);
        let shopImagValue = [];
        this.shopImagItems.map((item: any) => {
          shopImagValue.push(item.url)
        });
        this.formModel.patchValue({
          shopImag: shopImagValue.join(',')
        });
        setTimeout(() => {
          this.allowuploadNo = this.shopImagItems.length < 6 ? this.shopImagItems.length + 1 : 6;
        }, 500);
      }
    })
    return false;
  }
  deleteshopCoverImag = () => {
    this.formModel.patchValue({
      shopCoverImag: ''
    })
    return true;
  }
  deleteshopImag = () => {
    setTimeout(_ => {
      let shopImagValue = [];
      this.shopImagItems.map((item: any) => {
        shopImagValue.push(item.url)
      });
      this.formModel.patchValue({
        shopImag: shopImagValue.join(',')
      })
      this.allowuploadNo = this.allowuploadNo == 6 ? 6 : this.allowuploadNo - 1;
    }, 0)
    return true;
  }

  /* -------------------- 基础设施 -------------------- */
  facilitieItems = [
    { label: '家长休息区', value: '1' },
    { label: '寄存区', value: '2' },
    { label: '停车场', value: '3' },
    { label: '免费WIFI', value: '4' }
  ];


  /* -------------------- 保存信息 -------------------- */
  submit() {
    for (const i in this.formModel.controls) {
      this.formModel.controls[i].markAsDirty();
      this.formModel.controls[i].updateValueAndValidity();
    }
    if (this.formModel.valid) {
      let params = JSON.parse(JSON.stringify(this.formModel.value));
      params.province = params.cascaderAddress[0];
      params.city = params.cascaderAddress[1];
      params.area = params.cascaderAddress[2];
      params.facilitie = params.facilitie.reduce((aggr, curr, idx) => {
        if (idx == 1) {
          return aggr.checked ? (curr.checked ? aggr.value + ',' + curr.value : aggr.value) : curr.checked ? curr.value : '';
        } else {
          return curr.checked ? (aggr ? aggr + ',' + curr.value : curr.value) : aggr;
        }
      });
      for (let param in params) {
        if (params[param] === '' || params[param] === null) {
          delete params[param]
        }
      }
      this.http.post('/wechat/saveSmallProgramData', { paramJson: JSON.stringify(params) });
    }
  }
  /* -------------------- 预览 -------------------- */
  preview() {
    let storeInfo = this.formModel.value;
    storeInfo.shopName = this.formModel.get('shopName').value;
    const preview = this.modal.create({
      nzWidth: 490,
      nzBodyStyle: { background: 'rgba(0,0,0,0)' },
      nzContent: PreviewComponent,
      nzComponentParams: {
        storeInfo: storeInfo,
        shopImagItems: this.shopImagItems
      },
      nzFooter: null
    });
  }

  /* ------------------- 生成6位随机数 ------------------- */
  private _mathRand(): string {
    let num = '';
    for (let i = 0; i < 6; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }

  ngOnDestroy(): void {
    this._map && this._map.removeEventListener('click', this._mapClick.bind(this));
  }
}
