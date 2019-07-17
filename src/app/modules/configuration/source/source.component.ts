import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';
import { NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.less']
})
export class SourceComponent implements OnInit {

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @ViewChild('table') table: TableComponent;
  @ModifyData('/memberSource/delete') delete: (id: number) => void;

  @DrawerCreate({ title: '客户来源', content: UpdateComponent }) update: ({ sourceInfo: any }?) => void;

}
