import { AppReuseStrategy } from 'src/app/core/app-reuse-strategy';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserInfoState } from 'src/app/core/reducers/userInfo-reducer';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MemberComponent } from './member/member.component';
import { NzMessageService, NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { WebsocketService } from './websocket.service';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input() userInfo: UserInfoState;

  @ViewChild('audio') audio;

  menuList: Array<{ title: string, path: string }> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private websocket: WebsocketService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private drawer: NzDrawerService,
    private resuse: AppReuseStrategy
  ) {
    // this.openWs();

    this.router.events.pipe(
      filter(event => { return event instanceof NavigationEnd }),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      },
        filter((route: any) => route.outlet === 'primary'))
    ).subscribe((event) => {
      let pathArray = [];
      event.pathFromRoot.map(res => {
        res.url['value'][0] && pathArray.push(res.url['value'][0]);
      });
      var isExist = this.menuList.every(item => item.title != event.data['value'].title);
      if (isExist) {
        this.menuList.push({ title: event.data['value'].title, path: pathArray.join('/') });
        this.routeActiveIndex = this.menuList.length - 1;
      } else {
        this.menuList.map((res, idx) => res.title == event.data['value'].title && (this.routeActiveIndex = idx));
      }
    });
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

  ngOnInit() {
  }

  routeActiveIndex: number;
  closeTab(e) {
    AppReuseStrategy.deleteRouteSnapshot(this.menuList[e].path.slice(1));
    this.menuList.splice(e, 1);
    if (e === this.routeActiveIndex) {
      this.routeActiveIndex = this.menuList.length - 1;
      this.router.navigateByUrl(this.menuList[this.menuList.length - 1].path);
    } else {
      this.routeActiveIndex = this.routeActiveIndex > e ? this.routeActiveIndex - 1 : this.routeActiveIndex;
    }
  }
  tabSelect(e) {
    this.router.navigateByUrl(this.menuList[e].path);
  }

  signOut(): void {
    window.localStorage.removeItem('userInfo');
    this.router.navigateByUrl('/login');
  }

  search(mobilePhone) {
    this.drawer.create({
      nzTitle: '快捷操作',
      nzWidth: 1100,
      nzContent: MemberComponent,
      nzContentParams: { datas: mobilePhone }
    })

  }

}
