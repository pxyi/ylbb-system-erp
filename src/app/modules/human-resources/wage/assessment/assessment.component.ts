import { NzDrawerService } from 'ng-zorro-antd';
import { AssessmentUpdateComponent } from './assessment-update/assessment-update.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateDrawer } from 'src/app/ng-relax/decorators/createDrawer.decorator';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  constructor(
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @ViewChild('listPage') listPage: ListPageComponent;

  @CreateDrawer('配置信息', AssessmentUpdateComponent, 360) update: (dataInfo?) => void;

}
