import { YlbbResponse } from '../../../../core/interface-config';
import { HttpClient } from '@angular/common/http';
import { MenuConfig } from '../../../../core/menu-config';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('NzTree') nzTree: NzTreeComponent;

  @Input() roleId: string;

  nodes: NzTreeNode[] = [];

  checkedNodes: string[];

  loading = true;

  checkBoxChange() {
    this.checkedNodes = [];
    this.nzTree.getCheckedNodeList().map(res => {
      if (res.children.length) {
        res.children.map(cdRes => {
          this.checkedNodes.push(cdRes.key);
        })
      } else {
        this.checkedNodes.push(res.key);
      }
    });
  }


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    MenuConfig.map(res => {
      this.nodes.push(new NzTreeNode(res));
    });

    setTimeout(_ => {
      this.loading = false;
    }, 3000);
    // this.http.post<YlbbResponse>('/xxxxxx', { id: this.roleId }).subscribe(res => {
    //   this.loading = false;
    // })
  }

}
