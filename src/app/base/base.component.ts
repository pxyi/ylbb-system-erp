import { UserInfoState } from '../core/reducers/userInfo-reducer';
import { Component, OnInit } from '@angular/core';;
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ea-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isCollapsed = false;

  userInfo: UserInfoState;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((res: { userInfo: UserInfoState }) => {
      this.userInfo = res.userInfo;
      window.document.title = `${this.userInfo.store['shopName']}-鱼乐贝贝ERP管理系统`;
    })
  }

}
