import { MenuConfig } from './../../core/menu-config';
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
      !res.isLeaf && (res.children = res.children.filter(item => item.title.indexOf(value) > -1));
      return res.isLeaf ? res.title.indexOf(value) > -1 : res.children.length > 0;
    })
  }
  ngOnInit() {
  }
  autoComplateOptions: any[] = [];
  complateOptions = MenuConfig;

  keyupEnter(value?) {
    if (value) {
      this.router.navigateByUrl(value['key']);
    } else if (typeof this.searchValue === 'object') {
      this.router.navigateByUrl(this.searchValue['key']);
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
