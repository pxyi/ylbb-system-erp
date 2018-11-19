import { environment } from './../../../environments/environment';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { MenuConfig } from './../../core/menu-config';
import { Router } from '@angular/router';
import { UserInfoState } from '../../core/reducers/userInfo-reducer';
import { Component, EventEmitter, Output, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'ea-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter();

  @Input() isCollapsed: boolean = false;

  @Input() userInfo: UserInfoState;

  @ViewChild('notificationTmpt') notificationTmpt: TemplateRef<any>

  @ViewChild('audio') audio;

  constructor(
    private router: Router,
    private http: HttpService,
    private websocket: WebsocketService,
    private notification: NzNotificationService
  ) { 
    this.openWs();
  }
  
  openWs() {
    this.websocket.createObservableSocket(`${environment.domainWs}/socketServer`).subscribe(res => {
      if (res === 'close') {
        this.openWs();
      } else if (res.flag == 1) {
        this.notification.info('您有新的预约，请及时处理', `用户：<b>${res.memberName}</b> 预约了老师<b>${res.employeeName}</b>于<i>${res.reserveDate}</i>`);
        this.audio.nativeElement.play();
      } else if (res.flag == 2) {
        this.notification.success('您有新的线索，请及时跟进', '');
        this.audio.nativeElement.play();
      }
    });
  }

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
