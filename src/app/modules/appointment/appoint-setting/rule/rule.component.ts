import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  loading: boolean;

  ruleSetting = {
    sortType: 0,
    cancelType: 0,
    timeLimitType: 0
  }

  constructor(
    private http: HttpService
  ) { 
    this.http.post('')
  }

  ngOnInit() {
  }

  save() {
    this.http.post('/reserve/reserveSetting', this.ruleSetting);
  }

}
