import { ListPageComponent } from './../../../ng-relax/components/list-page/list-page.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  queryNode = [
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
      label       : '服务老师',
      key         : 'teacherName',
      type        : 'select',
      optionsUrl  : '/member/getStoreTeachers',
    },
    {
      label       : '课程类型',
      key         : 'type',
      type        : 'select',
      options     : [ {id: 1, name: '国学'}, {id: 2, name: '双语'}, {id: 3, name: '数学'}, {id: 4, name: '儿歌'}, {id: 5, name: '颜色'}, {id: 6, name: '认识'}, {id: 7, name: '英语对话'}, {id: 8, name: '智力开发游戏'}, {id: 9, name: '其他'} ]
    }
  ];

  showDrawer: boolean;

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      id: [],
      cardCode: [],
      memberName: [],
      memberNick: [],
      swimTeacher: [],
      type: [, [Validators.required]],
      remarks: []
    })
  }

  ngOnInit() {
  }

  delete(id: number) {
    this.http.post('/memberLesson/removeMemberLessonRecord', { id }).then(res => this.listPage.eaTable._request());
  }

  updateLoading: boolean;
  enterUpdate() {
    this.updateLoading = true;
    this.http.post('/memberLesson/editMemberLessonRecord', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
      this.showDrawer = false;
      this.updateLoading = false;
      this.listPage.eaTable._request();
    }).catch(err => this.updateLoading = false)
  }

}
