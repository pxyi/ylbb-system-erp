import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzMessageService, NzDrawerService } from 'ng-zorro-antd';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-customer-source',
  templateUrl: './customer-source.component.html',
  styleUrls: ['./customer-source.component.less']
})
export class CustomerSourceComponent implements OnInit {

  listOfData: any[] = [];

  nzPageIndex:number = 1;  //当前页
  nzPageSize:number = 10;  //当前展示条数
  nzTotal:number = 50;     //总条数
  loading:boolean = true;  //表单loading

  searchValue:string = ''; //搜索输入框value

  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
    this._request();
  }

  /*---------------- 页码改变的回调 ----------------*/
  nzPageIndexChange(event) {
    //更改数据
    this.loading = true;
    this.http.post('/memberSource/list', {name: this.searchValue, pageNum: event, pageSize: this.nzPageSize}).then(res => {
      this.listOfData = res.result.list;     //数据
      this.nzPageIndex = res.result.pageNum; //第几页
      this.nzPageSize = res.result.pageSize; //每页展示多少
      this.nzTotal = res.result.totalPage;   //数据总条数
      this.loading = false;
    })
  }

  /*---------------- 每页条数改变的回调 ----------------*/
  nzPageSizeChange(event) {
    //更改数据
    this.loading = true;
    this.http.post('/memberSource/list', {name: this.searchValue, pageNum: this.nzPageIndex, pageSize: event}).then(res => {
      this.listOfData = res.result.list;     //数据
      this.nzPageIndex = res.result.pageNum; //第几页
      this.nzPageSize = res.result.pageSize; //每页展示多少
      this.nzTotal = res.result.totalPage;   //数据总条数
      this.loading = false;
    })
  }

  /*---------------- 查询 ----------------*/
  searchList() {
    this.loading = true;
    this.http.post('/memberSource/list', {name: this.searchValue, pageNum: this.nzPageIndex, pageSize: this.nzPageSize}).then(res => {
      this.listOfData = res.result.list;     //数据
      this.nzPageIndex = res.result.pageNum; //第几页
      this.nzPageSize = res.result.pageSize; //每页展示多少
      this.nzTotal = res.result.totalPage;   //数据总条数
      this.loading = false;
    })
  }

  /*---------------- 新增 ----------------*/
  addSource() {
    const drawer = this.drawer.create({
      nzTitle: '客户来源',
      nzWidth: 720,
      nzContent: UpdateComponent
    });
    drawer.afterClose.subscribe(res => this._request());
  }

  /*---------------- 编辑 ----------------*/
  edit(data) {
    const drawer = this.drawer.create({
      nzTitle: '客户来源',
      nzWidth: 720,
      nzContent: UpdateComponent,
      nzContentParams: { data }
    });
    drawer.afterClose.subscribe(res => this._request());
  }

  /*---------------- 删除 ----------------*/
  delete(id) {
    this.http.post('/memberSource/delete', {id}).then(res => {
      if (res.code == 1000) {
        this.message.create('success', res.info);
        this._request();
      } else {
        this.message.create('warning', res.info);
      }
    })
  }

  _request() {
    this.http.post('/memberSource/list').then(res => {
      this.loading = true;
      this.listOfData = res.result.list;
      this.nzPageIndex = res.result.pageNum; //第几页
      this.nzPageSize = res.result.pageSize; //每页展示多少
      this.nzTotal = res.result.totalPage;   //数据总条数
      this.loading = false;
    })
  }

}
