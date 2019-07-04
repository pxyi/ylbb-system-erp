import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { PreviewComponent } from '../preview/preview.component';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.less']
})
export class VisitComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  @Input() status: number;

  @Input() followStageId: number;

  dataSet: any[] = [];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.http.post('/retrunVisit/todayReturnVisit', { status: this.status }).then(res => this.dataSet = res.result);
  }

  preview(id) {
    const drawer = this.drawer.create({
      nzWidth: 860,
      nzContent: PreviewComponent,
      nzClosable: false,
      nzContentParams: { id, followStageId: this.followStageId }
    });
    drawer.afterClose.subscribe(res => this.table._request());
  }

}
