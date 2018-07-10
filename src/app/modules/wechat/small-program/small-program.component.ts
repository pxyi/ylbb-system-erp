import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from './../../../core/reducers/reducers-config';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { YlbbResponse } from '../../../core/interface-config';
import { AbmComponent } from 'angular-baidu-maps';

declare const BMap: any;
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

  constructor(
    private store: Store<AppState>,
    private fb   : FormBuilder = new FormBuilder(),
    private http : HttpClient,
    private message  : NzMessageService
  ) { }

  ngOnInit() {

    this.formModel = this.fb.group({
      shopName: [{ value: '', disabled: true }],                                               // 门店名称
      shopTel: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(8)]], // 门店预约电话
      publicCommentName: [],                                                                   // 大众点评名称
      meituanName: [],                                                                         // 美团名称
      shopAddress: [],                                                                         // 详细地址
      cascaderAddress: [, [Validators.required]],                                              // 省市区
      facilitie: [],                                                                           // 包含设施
      businessTime: [],                                                                        // 营业时间
      healthSafe: [],                                                                          // 卫生安全
      warmPrompt: [],                                                                          // 温馨提示
      trafficInformation: [],                                                                  // 交通信息
      parkingInformation: [],                                                                  // 停车场信息

      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]]
    })
    this.store.dispatch({ type: 'setBreadcrumb', payload: this.breadcrumbTmpt });

    this.http.post<any>('/wechat/selectSmallProgram', {}).subscribe(res => {
      this.getInfoLoading = false;
      this.formModel.patchValue(res.result);
      this._mapMarkerInit();
    });

    this.formModel.patchValue({ cascaderAddress: ["110000", "110100", "110104"] });

    this.formModel.get('cascaderAddress').valueChanges.subscribe(res => {
      if (res.length) {
        this.provinceList.map(list => {
          if (list.value == res[0]) {
            this.provinceValue = list.label;
          }
        });
        this.cityList.map(list => {
          if (list.value == res[1]) {
            this.cityValue = list.label;
          }
        });
        this.areaList.map(list => {
          if (list.value == res[2]) {
            this.areaValue = list.label;
          }
        });
      }
    });

  }

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
  provinceList: any[];
  provinceValue: string;
  cityList: any[];
  cityValue: string;
  areaList: any[];
  areaValue: string;
  addressLoadData = (node: any, index: number) => {
    return new Promise((resolve) => {
      if (index < 0) {
        this.http.post<any>('/wechat/getPosition', {}).subscribe(res => {
          node.children = res.result.provinceList;
          this.provinceList = res.result.provinceList;
          resolve();
        })
      } else if (index === 0) {
        this.http.post<any>('/wechat/getPosition', { provinceCode: node.value }).subscribe(res => {
          node.children = res.result.cityList;
          this.cityList = res.result.cityList;
          resolve();
        })
      } else if (index === 1) {
        this.http.post<any>('/wechat/getPosition', { cityCode: node.value }).subscribe(res => {
          res.result.areaList.map(res => res.isLeaf = true);
          node.children = res.result.areaList;
          this.areaList = res.result.areaList;
          resolve();
        })
      }
    });
  }


  ngOnDestroy(): void {
    this._map && this._map.removeEventListener('click', this._mapClick.bind(this));
  }
}
