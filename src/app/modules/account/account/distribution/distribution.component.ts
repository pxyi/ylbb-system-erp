import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {

  /* ---------- 账户Id ---------- */
  @Input() id;

  /* ---------- 所有角色 ---------- */
  dataSet: any[] = [];

  submit(): Promise<boolean> {
    let checkedItems = [];
    this.dataSet.map(res => res.checked && checkedItems.push(res.id));
    return new Promise((resolve, reject) => {
      this.http.post('/accountManagement/addUserRole', {
        paramJson: JSON.stringify({
          id: this.id,
          roleIds: checkedItems.join(',')
        })
      }).then(res => {
        resolve(true);
      }, err => {
        reject(false);
      })
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    /* ------------------ 获取当前门店所有角色 ------------------ */
    this.http.post('/accountManagement/userRoleList', {
      paramJson: JSON.stringify({ id: this.id })
    }, false).then(res => {
      let checkedItems = res.result.roleIds.split(',');
      this.dataSet = res.result.roles;
      /* ----------- 判断当前用户是否拥有该角色 ----------- */
      this.dataSet.map(res => res.checked = checkedItems.indexOf(res.id + '') > -1);
    })
  }

}
