import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.less']
})
export class TemplateComponent implements OnInit {

  @ViewChild('table') table: TableComponent

  queryNode = [
    {
      label       : '标题',
      key         : 'title',
      type        : 'input'
    }
  ];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  deleteTemplate(id) {
    this.http.post('/smsTemplate/delete', { paramJson: JSON.stringify({ id }) }).then(() => this.table._request());
  }

  @DrawerCreate({ title: '编辑模板', content: UpdateComponent }) update: ({ templateInfo: object }?) => void;

}
