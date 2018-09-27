import { HttpService } from './../../../../../../ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  loading: boolean;

  dataSet: any[] = [];

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  delete() {

  }

}
