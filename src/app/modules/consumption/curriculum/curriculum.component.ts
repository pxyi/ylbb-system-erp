import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

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
      type        : 'input'
    },
    {
      label       : '课程类型',
      key         : 'type',
      type        : 'select',
      options     : [ {id: 1, name: '国学'}, {id: 2, name: '双语'}, {id: 3, name: '数学'}, {id: 4, name: '儿歌'}, {id: 5, name: '颜色'}, {id: 6, name: '认识'}, {id: 7, name: '英语对话'}, {id: 8, name: '智力开发游戏'}, {id: 9, name: '其他'} ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
