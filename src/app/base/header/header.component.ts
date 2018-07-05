import { Router } from '@angular/router';
import { UserInfoState } from '../../core/reducers/userInfo-reducer';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ea-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() isCollapsed: boolean = false;

  @Input() userInfo: UserInfoState;
  constructor(
    private router: Router
  ) {  }
  

  searchValue: string;
  onChange(value: any): void {
    this.autoComplateOptions = !value ? this.complateOptions : JSON.parse(JSON.stringify(this.complateOptions)).filter( res => {
      res.children = res.children.filter(item => item.text.indexOf(value) > -1);
      return res.children.length > 0;
    })
  }
  ngOnInit() {
  }
  autoComplateOptions: any[] = [];
  complateOptions = [ 
    {
      title: '客户管理',
      children: [
        { text: '潜在客户', value: '/home/customer/potentail' },
        { text: '无意向客户', value: '/home/customer/nointention' }
      ]
    },
    {
      title: '系统管理',
      children: [
        { text: '更新日志', value: '/system/changelog' },
        { text: '使用帮助', value: '/system/help' }
      ]
    }
  ]

  keyupEnter(value?) {
    if (value) {
      this.router.navigateByUrl(value['value']);
    } else if (typeof this.searchValue === 'object') {
      this.router.navigateByUrl(this.searchValue['value']);
    }
  }

  TapIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  signOut(): void {
    window.localStorage.removeItem('userInfo');
    this.router.navigateByUrl('/login');
  }

}
