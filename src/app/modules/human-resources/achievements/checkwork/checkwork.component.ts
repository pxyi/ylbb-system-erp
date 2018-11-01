import { ListPageComponent } from './../../../../ng-relax/components/list-page/list-page.component';
import { CheckworkUpdateComponent } from './checkwork-update/checkwork-update.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { DeleteData } from 'src/app/ng-relax/decorators/delete.decorator';
import { CreateDrawer } from 'src/app/ng-relax/decorators/createDrawer.decorator';

@Component({
  selector: 'app-checkwork',
  templateUrl: './checkwork.component.html',
  styleUrls: ['./checkwork.component.scss']
})
export class CheckworkComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @CreateDrawer('考勤情况', CheckworkUpdateComponent) update: (dataInfo?) => void;

  @DeleteData('/attendance/removeAttendance') delete: (id) => void;

}
