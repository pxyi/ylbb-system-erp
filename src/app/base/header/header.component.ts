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
  
  ngOnInit() {
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
