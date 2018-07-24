import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {

  @Input() id;

  checkedItems: any[] = [];

  submit(): Promise<boolean> {
    return new Promise((resolve, reject) => {

    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  tableReady(dataset) {
    this.http.post('/accountManagement/userRoleList', {
      paramJson: JSON.stringify({ id: this.id })
    }, false).then(res => {
      res.result.roles.map(item => {
        this.checkedItems.push(item.id);
        dataset.map(data => {
          data.id == item.id && (data.checked = true);
          data.disabled = data.status != 0;
        });
      });
    })
  }

}
