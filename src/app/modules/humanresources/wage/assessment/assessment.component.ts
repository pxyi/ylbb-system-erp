import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.less']
})
export class AssessmentComponent implements OnInit {

  constructor(
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @ViewChild('listPage') listPage: ListPageComponent;

  @DrawerCreate({ title: '配置信息', content: UpdateComponent, width: 360}) update: ({dataInfo: object}?) => void;

}
