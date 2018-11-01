import { HttpService } from 'src/app/ng-relax/services/http.service';
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

  checkedNodes: string[] = ['/home'];

  roleInfoId: number;

  loading = true;

  checkBoxChange() {
    this.checkedNodes = [];
    this.nzTree.getCheckedNodeList().map(res => {
      if (res.children && res.children.length) {
        res.children.map(cdRes => {
          this.checkedNodes.push(cdRes.key);
          if (cdRes.children && cdRes.children.length) {
            cdRes.children.map(twoRes => {
              this.checkedNodes.push(twoRes.key);
            })
          }
        })
      } else {
        this.checkedNodes.push(res.key);
      }
    });
  }


  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    MenuConfig.map(res => {
      this.nodes.push(new NzTreeNode(res));
    });

    this.http.post('/roleManagement/queryRoleMenu', { paramJson: JSON.stringify({ roleId: this.roleId }) }, false).then(res => {
      this.loading = false;
      if (res.code == 1000 && res.result) {
        this.checkedNodes = res.result.roleJsonInfo.split(',');
        this.roleInfoId = res.result.id;
      }
    })
  }

}
