import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbmComponent } from 'angular-baidu-maps';

declare const BMap: any;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less']
})
export class StoreComponent implements OnInit, OnDestroy {

  formModel: FormGroup;

  getInfoLoading: boolean = true;

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((res: ParamMap) => res.get('is') && this.message.warning('请完善门店基础信息'));
  }

  ngOnInit() {
    this.formModel = this.fb.group({
      id: [],
      shopName: [{ value: '', disabled: true }],
      shopTel: [, [Validators.required, Validators.maxLength(13), Validators.minLength(8)]],
      operatorPhoneNum: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],
      shopIntroduction: [],
      shopAddress: [],
      cascaderAddress: [, [Validators.required]],
      shopCoverImag: [, [Validators.required]],
      shopImag: [, [Validators.required]],
      shopLogo: [],
      facilitie: [],
      businessTime: [, [Validators.required]],
      healthSafe: [],
      warmPrompt: [],
      trafficInformation: [],
      parkingInformation: [],
      brandName: [, [Validators.required]],
      teacherDesc: [],
      brandDesc: [],
      longitude: [, [Validators.required]],
      latitude: [, [Validators.required]],
      teacherImg: this.fb.array([]),
    });


    this.http.post('/activity/getBasicConfig').then(res => {
      this.getInfoLoading = false;
      if (res.code == 1000) {
        if (res.result.facilitie) {
          this.facilitieItems.map((item: any) => {
            item.checked = res.result.facilitie.includes(item.value);
          });
        }
        if (res.result.teacherImg) {
          res.result.teacherImg = JSON.parse(res.result.teacherImg);
          res.result.teacherImg.map(item => {
            this.addTeacher(item);
          })
        }

        res.result.cascaderAddress = res.result.province ? [res.result.province, res.result.city, res.result.area] : '';


        this.formModel.patchValue(res.result);

        this._mapMarkerInit();
      }
    });

  }


  get teacherImg() {
    return this.formModel.controls.teacherImg as FormArray;
  }

  addTeacher(teacherInfo: any = {}) {
    if (this.teacherImg.value.length < 20) {
      this.teacherImg.push(this.fb.group({
        teacherName: [teacherInfo.teacherName],
        teacherHeadImg: [teacherInfo.teacherHeadImg]
      }));
    }
  }
  removeTeacher(i) {
    this.teacherImg.removeAt(i);
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
        this.http.post('/wechat/getPosition').then(res => {
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

  /* -------------------- 基础设施 -------------------- */
  facilitieItems: { label: string, value: string, checked?: boolean }[] = [
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
      for (let param in params) {
        if (params[param] === '' || params[param] === null) {
          delete params[param]
        }
      }
      this.http.post('/activity/saveBasicConfig', { paramJson: JSON.stringify(params) }, true);
    }
  }

  cancel() {
    window.history.go(-1);
  }

  ngOnDestroy(): void {
    this._map && this._map.removeEventListener('click', this._mapClick.bind(this));
  }
}
