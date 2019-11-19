import { AppState } from 'src/app/core/reducers/reducers-config';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-updatahtml',
  templateUrl: './updatahtml.component.html',
  styleUrls: ['./updatahtml.component.less']
})
export class UpdatahtmlComponent implements OnInit {
  @Input() activityInfo: any = {};
  pageDetail :any = {
      topDetail:{
        title: '送福利啦1',
        text:'限量两百张活动门票开抢啦！<br>为感谢粑粑麻麻们对小鱼的信任和支持，<br>特推出双十一试营业感恩大回馈活动,<br>仅售<b>38</b>元抢购活动<br>活动时间11月6日到11月30日<br>对！你没有听错!'
      },
      welfareDetail:{
        title: '三重福利享不停2',
        list:[{
          title: '福利一',
          text: '将链接转发朋友圈或微信群，好友下单后，您即可多推多得，上不封顶！',
          img: 'https://ylbb-admin-erp.oss-cn-beijing.aliyuncs.com/erp-header-bg.png' 
        },{
          title: '福利一',
          text: '将链接转发朋友圈或微信群，好友下单后，您即可多推多得，上不封顶！',
          img: 'https://ylbb-admin-erp.oss-cn-beijing.aliyuncs.com/erp-header-bg.png' 
        }]
      }
  };
  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe,
    private drawerRef: NzDrawerRef,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }
  cancel() { this.drawerRef.close() }

}
