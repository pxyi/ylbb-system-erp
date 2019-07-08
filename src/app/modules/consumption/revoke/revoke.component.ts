
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-revoke',
  templateUrl: './revoke.component.html',
  styleUrls: ['./revoke.component.scss']
})
export class RevokeComponent implements OnInit {
  baseFormGroup: FormGroup;
  teacherList: any[];
  @ViewChild('listPage') listPage: ListPageComponent;
  queryNode: QueryNode[] = [
    {
      label       : '会员卡号',
      key         : 'cardCode',
      type        : 'input'
    },
    {
      label       : '会员姓名',
      key         : 'memberName',
      type        : 'input'
    },
    {
      label       : '儿童类型',
      key         : 'babyType',
      type        : 'select',
      options: [{ name: '0-3岁', id: '0-3岁' }, { name: '3-6岁', id: '3-6岁' }, { name: '6-12岁', id: '6-12岁' }],    
    },
    {
      label       : '消费商品',
      key         : 'commodityId',
      type        : 'select',
      optionsUrl  : '/commodity/getStoreCommodities'
    },
    {
      label       : '服务泳师',
      key         : 'teacherId',
      type        : 'select',
      optionsUrl  : '/tongka/teacherList',
      isHide      : true
    },
    {
      label       : '顾客满意度',
      key         : 'satisfaction',
      type        : 'select',
      options     : [ { name: '满意', id: '满意' }, { name: '一般', id: '一般' } ],
      isHide      : true
    },
    {
      label       : '消费日期',
      key         : 'date',
      valueKey    : ['startDate', 'endDate'],
      type        : 'rangepicker',
      isHide      : true
    },
    {
      label       : '撤销日期',
      key         : 'datec',
      valueKey    : ['startcDate', 'endcDate'],
      type        : 'rangepicker',
      isHide      : true
    }
  ]

  constructor(
    private drawer: NzDrawerService,
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpService,
  ) {
    this.http.post('/tongka/teacherList', {}, false).then(res => this.teacherList = res.result);   
   }
   private getQueryParams;
  ngOnInit() {
    this.baseFormGroup = this.fb.group({
      consumeId: [],
      swimTeacherId: [ ,[Validators.required]],
      assisTeacherId: [ ,[Validators.required]],
      showerTeacherId: [],
      fitnessTeacherId: [],
    });
  }
  @ViewChild('drawerTemplate') drawerTemplate: TemplateRef<any>;
  teacherDetail(data){
    this.drawer.create({
      nzTitle: '授课老师',
      nzWidth: 700,
      nzContent: this.drawerTemplate
    });
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/customer/selectTeacher', { consumeId :  data.consumeId },false).then(res => {
      this.baseFormGroup.patchValue({consumeId:  data.consumeId});
      this.baseFormGroup.patchValue({swimTeacherId: res.result.teacher.teacherId});
      this.baseFormGroup.patchValue({assisTeacherId: res.result.assisTeacher.TeacherId});
      this.baseFormGroup.patchValue({showerTeacherId: res.result.showerTeacher.teacherId});
      this.baseFormGroup.patchValue({fitnessTeacherId: res.result.fitnessTeacher.teacherId});   
    }).catch();
  } 
  saveLoading: boolean;
  save(drawerRef){
    if (this.baseFormGroup.invalid) {
    for (let i in this.baseFormGroup.controls) {
      this.baseFormGroup.controls[i].markAsDirty();
      this.baseFormGroup.controls[i].updateValueAndValidity();
    }
  }else{
    this.saveLoading = true;
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/customer/updateTeacher', { paramJson: JSON.stringify(this.baseFormGroup.value) }).then(res => {
      this.saveLoading = false;
      drawerRef.close();
      this.listPage.eaQuery._submit();
    }).catch()
  }
}


}
