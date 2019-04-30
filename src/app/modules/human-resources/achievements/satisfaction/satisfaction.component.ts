import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-satisfaction',
  templateUrl: './satisfaction.component.html',
  styleUrls: ['./satisfaction.component.less']
})
export class SatisfactionComponent implements OnInit {

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @DrawerCreate({ title: '满意度信息', content: UpdateComponent, width: 360 }) update: ({ dataInfo: object}?) => void;

  saveRatio(data) {
    data.loading = true;
    this.http.post('/bonusSatisfaction/editBonusSatisfaction', { paramJson: JSON.stringify({ id: data.id, ratio: data.ratio }) }).then(res => {
      data.loading = false;
      data.edit = false;
    }).catch(err => data.loading = false);
  }

}
