import { ListPageComponent } from 'src/app/ng-relax/components/list-page/list-page.component';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {

  @Input() activityInfo: any;

  queryNode: QueryNode[] = [{ label: '手机号码', type: 'input', key: 'phoneNum' }];

  tableThead: string[] = ['微信昵称', '宝宝昵称', '生日', '收集者', '联系方式', '报名时间'];

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this._tableTheadInit.get(this.activityInfo.templateType)();
  }

  private _tableTheadInit = new Map([
    [1, () => {
      this.queryNode = [...this.queryNode];
      var payHeadTh = this.activityInfo.needPay == 1 ? ['支付金额', '状态'] : [];
      this.tableThead = [...this.tableThead, ...payHeadTh];
    }],
    [2, () => {
      this.queryNode = [...this.queryNode];
      this.tableThead = [...this.tableThead, '推荐人姓名', '推荐人数', '到店人数']
    }],
    [3, () => {
      this.queryNode = [...this.queryNode, { label: '团类型', type: 'select', key: 'groupStatus', options: [{ name: '真实成团', id: 2 }, { name: '虚拟成团', id: 1 }, { name: '等待成团', id: 0 }] }];
      this.tableThead = [...this.tableThead, '团类型', '支付金额', '商品名称', '同团信息', '状态']
    }],
    [4, () => {
      this.queryNode = [...this.queryNode];
      this.tableThead = ['微信昵称', '姓名', '联系方式', '应聘岗位']
    }],
    [6, () => {
      this.queryNode = [...this.queryNode];
      this.tableThead = ['微信昵称', '姓名', '参与人数', '收集者', '联系方式']
    }],
    [7, () => {
      this.queryNode = [...this.queryNode];
      this.tableThead = ['微信昵称', '宝宝昵称', '分享者', '联系方式', '浏览时间', '有效分享数']
    }],
    [8, () => {
      this.queryNode = [...this.queryNode];
      this.tableThead = ['微信昵称', '上级', '上上级', '联系方式', '浏览时间', '有效分享数']
    }]
  ]);

  dataChange(dataSet) {
    dataSet.map(data => data.checkedItems = []);
  }

  cashingPrize(id, prizeId, listPage: ListPageComponent) {
    this.http.post('/activity/cashingPrize', { id, prizeId }).then(res => listPage.eaTable._request());
  }


  /* ----------- 设置中奖人 ----------- */
  showLotteryModal: boolean;
  participantList: any[] = [];
  setLottery(list: any[]) {
    this.showLotteryModal = true;
    this.participantList = list;
  }
  @ViewChild('lotteryTable') lotteryTable: TableComponent;
  enterLottery(id) {
    this.http.post('/activity/setWinner', { id }, true).then(res => { this.showLotteryModal = false; this.lotteryTable._request()});
  }

}
