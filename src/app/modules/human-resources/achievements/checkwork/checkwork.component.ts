import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-checkwork',
  templateUrl: './checkwork.component.html',
  styleUrls: ['./checkwork.component.less']
})
export class CheckworkComponent implements OnInit {

  @ViewChild('listPage') listPage: ListPageComponent;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @ModifyData('/attendance/removeAttendance') delete: (id: number) => void;

  @DrawerCreate({ title: '考勤情况', content: UpdateComponent }) update: ({ checkworkInfo: object }?) => void;

}
