import { AdjustmentUpdateComponent } from './adjustment-update/adjustment-update.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { CreateDrawer } from 'src/app/ng-relax/decorators/createDrawer.decorator';
import { DeleteData } from 'src/app/ng-relax/decorators/delete.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService } from 'ng-zorro-antd';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss']
})
export class AdjustmentComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @CreateDrawer('调整信息', AdjustmentUpdateComponent) update: (dataInfo?) => void;

  @DeleteData('/payrollAdjustLog/removePayrollAdjustLog') delete: (id) => void;

}
