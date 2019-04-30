import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.less']
})
export class DeductionComponent implements OnInit {

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @DrawerCreate({ title: '员工扣分', content: UpdateComponent}) update: ({ deductionInfo: object}?) => void;

  @ModifyData('/attendance/removeAttendance') delete: (id) => void;

}
