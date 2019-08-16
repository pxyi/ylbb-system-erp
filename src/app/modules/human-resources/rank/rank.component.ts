import { NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';
import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.less']
})
export class RankComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }
  
  @ModifyData('/humanInformation/removeBandRecord') delete: (id: number) => void;

  @DrawerCreate({ title: '修改职级', content: UpdateComponent }) update: ({ rankInfo: object }?) => void;

}