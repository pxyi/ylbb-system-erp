import { TableComponent } from './../../../ng-relax/components/table/table.component';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-business',
  templateUrl: './card-business.component.html',
  styleUrls: ['./card-business.component.scss']
})
export class CardBusinessComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  queryNode = [
    {
      label       : '业务类型名称',
      key         : 'name',
      type        : 'input'
    }
  ];

  showModal: boolean;
  updateLoading: boolean;

  name: string;

  updateId: string;

  constructor(
    private http: HttpService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  enterUpdate() {
    if (this.name) {
      this.updateLoading = true;
      this.http.post('/cardBusinessManagement/modify', { 
        paramJson: JSON.stringify({ id: this.updateId, name: this.name }) 
      }).then(res => {
        this.updateLoading = false;
        this.showModal = false;
        this.table._request();
      }, err => this.updateLoading = false)
    } else {
      this.message.warning('请输入卡业务名称！');
    }
  }

  deleteBusiness(id) {
    this.http.post('/cardBusinessManagement/remove', { id }).then(res => this.table._request());
  }

}