import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DeleteData } from 'src/app/ng-relax/decorators/delete.decorator';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  @DeleteData('/bonusDetail/removeBonusDetail') delete: (id) => void;

}
