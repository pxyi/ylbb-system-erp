import { NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.less']
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
      optionsUrl  : 'http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/member/getStoreTeachers',
    },
    {
      label       : '课程类型',
      key         : 'type',
      type        : 'select',
      options     : [ {id: 1, name: '国学'}, {id: 2, name: '双语'}, {id: 3, name: '数学'}, {id: 4, name: '儿歌'}, {id: 5, name: '颜色'}, {id: 6, name: '认识'}, {id: 7, name: '英语对话'}, {id: 8, name: '智力开发游戏'}, {id: 9, name: '其他'} ]
    }
  ];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  delete(id: number) {
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/memberLesson/removeMemberLessonRecord', { id }).then(res => this.listPage.eaTable._request());
  }

  @DrawerCreate({ title: '会员课程信息', content: UpdateComponent }) update: ({curriculumInfo: object}) => void;

}
