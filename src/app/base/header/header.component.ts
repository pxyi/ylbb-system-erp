import { HttpService } from 'src/app/ng-relax/services/http.service';
import { MenuConfig } from './../../core/menu-config';
import { Router } from '@angular/router';
import { UserInfoState } from '../../core/reducers/userInfo-reducer';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

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
    private router: Router,
    private wsService: WebsocketService,
    private http: HttpService
  ) {  }
  

  searchValue: string;
  onChange(value: any): void {
    this.autoComplateOptions = !value ? this.complateOptions : JSON.parse(JSON.stringify(this.complateOptions)).filter( res => {
      !res.isLeaf && (res.children = res.children.filter(item => item.title.indexOf(value) > -1));
      return res.isLeaf ? res.title.indexOf(value) > -1 : res.children.length > 0;
    })
  }
  ngOnInit() {
    // this.wsService.createObservableSocket("ws://192.168.1.173:8888/socketServer")
    //   .subscribe(
    //     data => console.log(data),
    //     err => console.log(err),
    //     () => console.log("流已经结束")
    //   );

      // var ws = new WebSocket("ws://192.168.1.173:8888/socketServer");

      // ws.onopen = function (evt) {
      //   console.log("Connection open ...");
      //   ws.send("Hello WebSockets!");
      // };

      // ws.onmessage = function (evt) {
      //   console.log("Received Message: " + evt.data);
      //   // ws.close();
      // };

      // ws.onclose = function (evt) {
      //   console.log("Connection closed.");
      // }
  }
  sendMessageToServer() {
    this.wsService.sendMessage("hello from client");
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
