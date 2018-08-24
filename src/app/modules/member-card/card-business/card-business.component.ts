import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-business',
  templateUrl: './card-business.component.html',
  styleUrls: ['./card-business.component.scss']
})
export class CardBusinessComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

  enterUpdate() {
    if (this.name) {
      
    }
  }

  deleteBusiness(id) {

  }

}