import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.less']
})
export class DepartmentComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @ModifyData('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/department/removeDeptRecord') delete: (id: number) => void;

  @DrawerCreate({ title: '部门信息', content: UpdateComponent }) update: ({ departmentInfo: object }?) => void;


}
