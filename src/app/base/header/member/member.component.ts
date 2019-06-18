import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzDrawerRef, NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers/reducers-config';
import { debounceTime, filter } from 'rxjs/operators';
import { EsService } from '../es.service';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { environment } from 'src/environments/environment';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { AppointComponent } from 'src/app/modules/public/appoint/appoint.component';
import { ConsumptionComponent } from 'src/app/modules/public/consumption/consumption.component';
import { CardCreateComponent } from 'src/app/modules/public/card-create/card-create.component';
import { CardChangeComponent } from 'src/app/modules/public/card-change/card-change.component';
import { CardStopComponent } from 'src/app/modules/public/card-stop/card-stop.component';
import { CardContinuedComponent } from 'src/app/modules/public/card-continued/card-continued.component';
import { CardOpenComponent } from 'src/app/modules/public/card-open/card-open.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.less']
})
export class MemberComponent implements OnInit {

  @Input() datas;

  formGroup: FormGroup;
  searchSubject = new Subject();
  mobilePhone: any;
  loading_b: boolean;
  memberList_b: any[] = [];
  pageIndex_b: number = 1;
  storeId: number;
  total_b: any = [];
  clMobilePhone: any;
  memberCardInfo: any = {
    mobilePhone: ''
  };

  childrenVisible: boolean;

  domain = environment.domainEs;

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef,
    private drawer: NzDrawerService,
    private http: HttpService,
    private store: Store<AppState>,
    private message: NzMessageService,
    private es: EsService
  ) {
    this.store.select('userInfoState').subscribe(res => { this.storeId = res.store['id']; });
  }

  ngOnInit() {

    this.formGroup = this.fb.group({
      id: [],
      name: [],
      nick: [],
      sex: [],
      monthAge: [],
      babyType: [],
      mobilePhone: [],
      cardCode: [],
      cardTypeName: [],
      surplusTimes: [],
      tongTimes: [],
      expireDays: [],
      expireDate: [],
    });
    this.searchSubject.pipe(debounceTime(500), filter((txt: string) => txt.length >= 1)).subscribe(res => {
      if ((isNaN(this.mobilePhone) && this.mobilePhone != "" || (!isNaN(this.mobilePhone) && this.mobilePhone.length > 3))) {
        this.loading_b = true;
        this.http.get(this.domain + '/es/erp/query', { index: 'bss', storeId: this.storeId, type: 'member', condition: this.mobilePhone, pageNo: this.pageIndex_b, pageSize: 20 }, false).then(res => {
          this.loading_b = false;
          if (res['returnCode'] == 'SUCCESS') {
            if (res.result) {
              this.memberList_b = res.result;
              this.total_b = res['total'];
            } else {
              this.memberList_b = [];
              this.total_b = 0;
              this.pageIndex_b = 1;
            }
          }
        });
      } else {
        this.memberList_b = [];
        this.total_b = 0;
        this.pageIndex_b = 1;
      }
    })
    this.mobilePhone = this.datas;
    this.searchSubject.next(this.mobilePhone);
  }

  selectUserinfo;
  selectMemberList(data) {
    let id = data.id;
    this.http.get('/homePage/getMemberDetail', { id }, false).then(res => {
      if (res.code == 1000) {
        this.selectUserinfo = res.result;
        this.formGroup.patchValue(res.result);
        this.es.$memberInfoSubject.next(true);
        this.childrenVisible = true;
        this.clMobilePhone = res.result.mobilePhone;
      } else {
        this.message.create('warning', res.info);
      }
    });

  }
  modelChange() {
    this.searchSubject.next(this.mobilePhone);
  }

  @DrawerCreate({ title: '会员预约', content: AppointComponent }) appint: ({ id, userInfo }) => void;
  
  @DrawerCreate({ title: '会员消费', content: ConsumptionComponent }) consumption: ({ consumptionInfo }) => void;

  @DrawerCreate({ title: '建卡', content: CardCreateComponent }) create: ({ id, userInfo }) => void;

  @DrawerCreate({ title: '卡项变更', content: CardChangeComponent }) change: ({ id, memberCardInfo }) => void;

  @DrawerCreate({ title: '停卡', content: CardStopComponent }) stop: ({ id, memberCardInfo }) => void;

  @DrawerCreate({ title: '停卡', content: CardOpenComponent }) open: ({ id, memberCardInfo }) => void;

  @DrawerCreate({ title: '停卡', content: CardContinuedComponent }) continued: ({ id, memberCardInfo }) => void;
  
  @DrawerClose() close: () => void;

  closeDrawer() {
    this.childrenVisible = false;
    this.es.$memberInfoSubject.next(false);
  }

}
