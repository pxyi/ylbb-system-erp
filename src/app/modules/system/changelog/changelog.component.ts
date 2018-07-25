import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {

  changelog: any = [
    {
      version  : 'v1.1.0-beta',
      time     : '2018-04-17',
      features : ['营销管理；包含可参加活动及活动数据统计功能。', '数据统计新增饼状图显示贡献者。', '列表查询下拉选项框新增禁止缓存及回调功能。'],
      fixes    : ['修复无意向客户列表查看用户详细信息404。', '修复五一活动推广图下载地址参数错误。'],
      remark   : '营销管理'
    },
    {
      version  : 'v1.0.0-beta',
      time     : '2018-03-12',
      features : ['新版ERP系统基础架构确定。', 'ERP客户管理；包含潜在客户及无意向客户。'],
      remark   : '基础架构/客户管理'
    }
  ]

  loading: boolean;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.http.post('/version/getNewestVersion', {}, false).then(res => {
      // res.code == 1000 && (this.changelog = res.result.version);
      this.loading = false;
    });
  }

}
