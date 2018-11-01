import { DeductionUpdateComponent } from './deduction-update/deduction-update.component';
import { Component, OnInit } from '@angular/core';
import { CreateDrawer } from 'src/app/ng-relax/decorators/createDrawer.decorator';
import { DeleteData } from 'src/app/ng-relax/decorators/delete.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService } from 'ng-zorro-antd';

@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.scss']
})
export class DeductionComponent implements OnInit {

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
    ) { }

  ngOnInit() {
  }

  @CreateDrawer('员工扣分', DeductionUpdateComponent) update: (dataInfo?) => void;

  @DeleteData('/attendance/removeAttendance') delete: (id) => void;


}
