import { HttpService } from 'src/app/ng-relax/services/http.service';
import { SatisfactionUpdateComponent } from './satisfaction-update/satisfaction-update.component';
import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { CreateDrawer } from 'src/app/ng-relax/decorators/createDrawer.decorator';

@Component({
  selector: 'app-satisfaction',
  templateUrl: './satisfaction.component.html',
  styleUrls: ['./satisfaction.component.scss']
})
export class SatisfactionComponent implements OnInit {

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { }

  ngOnInit() {
  }

  @CreateDrawer('满意度信息', SatisfactionUpdateComponent, 360) update: (dataInfo?) => void;

  saveRatio(data) {
    data.loading = true;
    this.http.post('/bonusSatisfaction/editBonusSatisfaction', { paramJson: JSON.stringify({ id: data.id, ratio: data.ratio }) }).then(res => {
      data.loading = false;
      data.edit = false;
    }).catch(err => data.loading = false);
  }

}
