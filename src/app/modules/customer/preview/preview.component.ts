import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DatePipe } from '@angular/common';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewCustomerComponent implements OnInit {

  /* ------------ 客户ID ------------ */
  _id             : string;

  /* ------------ 用户信息 ------------ */
  userInfo        : any;
  currentUserName : string;

  /* ------------ 跟进记录 ------------ */
  followRecord    : any[] = [];

  /* ------------ 标签列表 ------------ */
  labelList       : any[] = [];

  /* ---------- 请求loading ---------- */
  isLoading       : boolean;

  /* ---------- 记录表单模型 ---------- */
  recordFormModel : FormGroup;

  _updateFollowRecordFormModel: FormGroup;

  
  followTypeList  : any[] = [];
  showMemberStatus: any[] = [];
  reserveHourList : any[] = [
    { name: '09:00', id: '09:00' },
    { name: '09:15', id: '09:15' },
    { name: '09:30', id: '09:30' },
    { name: '09:45', id: '09:45' },
    { name: '10:00', id: '10:00' },
    { name: '10:15', id: '10:15' },
    { name: '10:30', id: '10:30' },
    { name: '10:45', id: '10:45' },
    { name: '11:00', id: '11:00' },
    { name: '11:15', id: '11:15' },
    { name: '11:30', id: '11:30' },
    { name: '11:45', id: '11:45' },
    { name: '12:00', id: '12:00' },
    { name: '12:15', id: '12:15' },
    { name: '12:30', id: '12:30' },
    { name: '12:45', id: '12:45' },
    { name: '13:00', id: '13:00' },
    { name: '13:15', id: '13:15' },
    { name: '13:30', id: '13:30' },
    { name: '13:45', id: '13:45' },
    { name: '14:00', id: '14:00' },
    { name: '14:15', id: '14:15' },
    { name: '14:30', id: '14:30' },
    { name: '14:45', id: '14:45' },
    { name: '15:00', id: '15:00' },
    { name: '15:15', id: '15:15' },
    { name: '15:30', id: '15:30' },
    { name: '15:45', id: '15:45' },
    { name: '16:00', id: '16:00' },
    { name: '16:15', id: '16:15' },
    { name: '16:30', id: '16:30' },
    { name: '16:45', id: '16:45' },
    { name: '17:00', id: '17:00' },
    { name: '17:15', id: '17:15' },
    { name: '17:30', id: '17:30' },
    { name: '17:45', id: '17:45' }
  ]

  constructor(
    private routeInfo : ActivatedRoute,
    private fb        : FormBuilder = new FormBuilder(),
    private http      : HttpService,
    private message   : NzMessageService,
    private format    : DatePipe,
    private modal     : NzModalService,
    private router    : Router
  ) { }

  closeLink: string;

  ngOnInit() {

    this.closeLink = this.router.url.indexOf('/visit/clue') > -1 ? '/home/visit/clue' : 
                     this.router.url.indexOf('/visit/nocard') > -1 ? '/home/visit/nocard' : 
                     this.router.url.indexOf('/visit/member') > -1 ? '/home/visit/member' : '/home/customer/potential';

    this.routeInfo.params.subscribe( param => {
      this._id = param.id;

      this.selectUserInfoInit();

      /* ------------------- 查看跟进记录 ------------------- */
      this.http.post('/customer/showFollowRecord', { paramJson: JSON.stringify({ id: this._id }) }, false).then(res => {
        if (res.code == 1000) {
          this.followRecord = res.result;
        }
        this.followRecord.map(item => {
          item.contentLabel = this._resetFollowRecordContent(item.content);
        })
      })

    })

    /* ------------------- 获取记录标签 ------------------- */
    this.http.post('/common/labelList', {}, false).then( res => {
      this.labelList = res.result;
    })

    this.recordFormModel = this.fb.group({
      content       : ['', [Validators.maxLength(200)].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],       // 记录内容
      followType    : [null, [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],                                // 跟进方式
      memberStatusId: [null, [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],                                // 客户状态
      nextFollowTime: ['', [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],                                  // 下次跟进时间
      reserve       : this.fb.group({
                        status        : [false],
                        reserveDate   : ['', [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],
                        reserveHour   : [null, [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])]
                    })
    });

    this.recordFormModel.get('reserve').get('status').valueChanges.subscribe( res => {
      this.recordFormModel.get('reserve').patchValue({
        reserveDate: res ? '' : new Date(),
        reserveHour: null,
      })
    })
    
    this._updateFollowRecordFormModel = this.fb.group({
      id            : [''],
      memberId      : [''],
      content       : ['', [Validators.max(200)].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],                                     
      followType    : [, [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],                     
      memberStatusId: [, [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],                     
      nextFollowTime: ['', [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],
      reserve       : this.fb.group({
                        status        : [false],
                        reserveDate   : ['', [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])],
                        reserveHour   : ['', [].concat(this.router.url.indexOf('/visit/member') > -1 ? [] : [Validators.required])]
                    })                                          
    });
    this._updateFollowRecordFormModel.get('reserve').get('status').valueChanges.subscribe(res => {
      this._updateFollowRecordFormModel.get('reserve').patchValue({
        reserveDate: res ? '' : new Date(),
        reserveHour: null,
      })
    })


    /* ------------------- 客户状态 ------------------- */
    this.http.post('/common/showMemberStatus', {}, false).then(res => {
      this.showMemberStatus = res.result;
    });
    /* ------------------- 跟进方式 ------------------- */
    this.http.post('/common/followTypeList', {}, false).then(res => {
      this.followTypeList = res.result;
    })
  }




  selectUserInfoInit(): void {

    /* ------------------- 查看用户信息 ------------------- */
    this.isLoading = true;
    this.http.post('/customer/showCustomerInfo', { paramJson: JSON.stringify({ id: this._id }) }, false).then(res => {
      this.isLoading = false;
      this.userInfo = res.result.member || {};
      this.currentUserName = res.result.currentUserName;
      if (res.code != 1000) {
        this.message.warning(res.info);
      }
    });
  }

  /* ------------------- 点击记录标签 ------------------- */
  tapTag(value: string, form: FormGroup): void {
    form.patchValue({
      content: form.get('content').value + value
    });
  }

  /* ------------------- 发布跟进记录 ------------------- */
  _submitFollowRecord(isReset?: boolean): void {
    for (let key in this.recordFormModel.controls) {
      this.recordFormModel.controls[key].markAsDirty();
      this.recordFormModel.controls[key].updateValueAndValidity();
    }

    let [ model, reserve ] = [ this.recordFormModel, this.recordFormModel.get('reserve') ];
    let mainValid = model.get('content').valid && model.get('memberStatusId').valid && model.get('followType').valid;
    let childValid = reserve.get('status').value && reserve.get('reserveDate').valid && reserve.get('reserveHour').valid || !reserve.get('status').value;
    if (mainValid && childValid) {
      let params = JSON.parse(JSON.stringify(this.recordFormModel.value));
      params.memberId = this._id;
      params.nextFollowTime = params.nextFollowTime ? this.format.transform(params.nextFollowTime, 'yyyy-MM-dd') : '';
      params.status = params.reserve.status ? 1 : 0;
      if (params.status === 1) {
        params.reserveDate   = params.reserve.reserveDate ? this.format.transform(params.reserve.reserveDate, 'yyyy-MM-dd') : '';
        params.reserveHour   = params.reserve.reserveHour ? params.reserve.reserveHour.split(':')[0] : '';
        params.reserveMinute = params.reserve.reserveHour ? params.reserve.reserveHour.split(':')[1] : '';
      }
      delete params.reserve;
      params.followStageId = this.router.url.indexOf('/visit/clue') > -1 ? 2 : this.router.url.indexOf('/visit/nocard') > -1 ? 3 : this.router.url.indexOf('/visit/member') > -1 ? 4 : 2;
      this.http.post('/customer/addFollowRecord', { paramJson: JSON.stringify(params) }).then( res => {
        if (isReset) {
          let path = this.router.url.indexOf('/visit/clue') > -1 ? '/home/visit/clue?reset=true' :
            this.router.url.indexOf('/visit/nocard') > -1 ? '/home/visit/nocard?reset=true' :
              this.router.url.indexOf('/visit/member') > -1 ? '/home/visit/member?reset=true' : '/home/customer/potential?reset=true';
          this.router.navigateByUrl(path);
        } else {
          this.selectUserInfoInit();
          res.result.contentLabel = this._resetFollowRecordContent(res.result.content);
          this.followRecord.unshift(res.result);
          this.recordFormModel.reset();
        }
      })
    }
  }

  /* -------------------- 转为无意向客户 -------------------- */
  intentionCustomer(): void {
    this.http.post('/customer/transitioNoIntentionCustomer', { paramJson: JSON.stringify({ id: this._id }) }).then( res => {
      this.router.navigateByUrl(`${this.closeLink}?reset=true`);
    });
  }

  /* -------------------- 修改跟进记录 -------------------- */
  _followRecordModal;
  updateFollowRecord(title, content, footer, item): void {
    this._followRecordModal = this.modal.create({
      nzTitle   : title,
      nzContent : content,
      nzFooter  : footer,
      nzWidth   : 860
    });
    let controls = {
      id             : item.id,
      content        : item.content,
      memberStatusId : item.memberStatusId,
      followType     : item.followType,
      memberId       : item.memberId,
      nextFollowTime : item.nextFollowTime,
      
      reserve        : {
                        status      : item.status > 0,
                        reserveDate : item.reserveDate ? new Date(item.reserveDate) : '',
                        reserveHour : item.reserveHour ? item.reserveHour + ':' + item.reserveMinute : ''
                      }
    };
    this._updateFollowRecordFormModel.patchValue(controls);
  }
  _saveUpdateFollowRecordLoading: boolean = false;
  saveUpdateFollowRecord(): void {
    for (const key in this._updateFollowRecordFormModel.controls) {
      this._updateFollowRecordFormModel.controls[key].markAsDirty();
      this._updateFollowRecordFormModel.controls[key].updateValueAndValidity();
    }
    for (const key in this._updateFollowRecordFormModel.get('reserve')['controls']) {
      this._updateFollowRecordFormModel.get('reserve')['controls'][key].markAsDirty();
      this._updateFollowRecordFormModel.get('reserve')['controls'][key].updateValueAndValidity();
    }


    let [model, reserve] = [this._updateFollowRecordFormModel, this._updateFollowRecordFormModel.get('reserve')];
    let mainValid = model.get('content').valid && model.get('memberStatusId').valid && model.get('followType').valid;
    let childValid = reserve.get('status').value && reserve.get('reserveDate').valid && reserve.get('reserveHour').valid || !reserve.get('status').value;
    if (mainValid && childValid) {
      this._saveUpdateFollowRecordLoading = true;

      let params = this._updateFollowRecordFormModel.value;
      params.nextFollowTime = params.nextFollowTime ? this.format.transform(params.nextFollowTime, 'yyyy-MM-dd') : '';
      params.status = params.reserve.status ? 1 : 0;
      if (params.status === 1) {
        params.reserveDate                    = params.reserve.reserveDate ? this.format.transform(params.reserve.reserveDate, 'yyyy-MM-dd') : '';
        params.reserveHour   = params.reserve.reserveHour ? params.reserve.reserveHour.split(':')[0] : '';
        params.reserveMinute = params.reserve.reserveHour ? params.reserve.reserveHour.split(':')[1] : '';
      }
      delete params.reserve;
      this.http.post('/customer/addFollowRecord', { paramJson: JSON.stringify(params) }, false).then(res => {
        this.message.create(res.code == 1000 ? 'success' : 'warning', res.info);
        this._saveUpdateFollowRecordLoading = false;
        if (res.code == 1000) {
          res.result.contentLabel = this._resetFollowRecordContent(res.result.content);
          this.followRecord.map(item => {
            if (item.id === this._updateFollowRecordFormModel.value.id) {
              item.content        = res.result.content;
              item.followType     = res.result.followType;
              item.nextFollowTime = res.result.nextFollowTime;
              item.status         = res.result.status;
              item.contentLabel   = res.result.contentLabel;
              item.reserveDate    = res.result.reserveDate;
              item.reserveHour    = res.result.reserveHour;
              item.reserveMinute  = res.result.reserveMinute;
              item.followTypeName = res.result.followTypeName;
              item.memberStatusId = res.result.memberStatusId;
              item.memberStatusName = res.result.memberStatusName;
            }
          });
          this._followRecordModal.destroy()
        }
      })
    }
  }


  /* -------------------- 修改到店记录状态 -------------------- */
  editToShopRecord(status: number, id: number): void {
    this.http.post('/customer/editToShopRecord', { paramJson: JSON.stringify({ id: id, status: status }) }).then(res => {
      this.followRecord.map( item => {
        if (item.id == id) {
          item.status = status;
        }
      })
    })
  }

  /* -------------------- 设置跟进记录内容标签展示 -------------------- */
  _resetFollowRecordContent(content: string): string {
    let matchArray = content.match(/#(.*?)#/g);
    if (matchArray) {
      matchArray.map(res => {
        content = content.replace(new RegExp(res, 'g'), `<a href="javascript:;">${res}</a>`);
      })
    }
    return content;
  }

  _disabledDate(current: Date): boolean {
    return current && current.getTime() < Date.now() - 1000 * 60 * 60 * 24;
  }

}
