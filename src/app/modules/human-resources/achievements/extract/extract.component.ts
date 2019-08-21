import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';
import { ListComponent } from 'src/app/modules/appointment/list/list.component';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.less']
})
export class ExtractComponent implements OnInit {

  @ViewChild('listPage') listPage: ListComponent;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  @ModifyData('/bonusDetail/removeBonusDetail') delete: (id) => void;

}
