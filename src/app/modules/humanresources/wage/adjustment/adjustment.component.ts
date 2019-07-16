import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';
import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.less']
})
export class AdjustmentComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @DrawerCreate({ title: '调整信息', content: UpdateComponent }) update: ({dataInfo: object}?) => void;

  @ModifyData('/payrollAdjustLog/removePayrollAdjustLog') delete: (id) => void;

}
