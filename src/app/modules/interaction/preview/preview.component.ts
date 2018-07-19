import { HttpService } from './../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() id: number;

  @Input() source: boolean;

  result: any = {status: 0, deal: ''};

  isPreview: boolean = true;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.http.post('/userAdvice/queryById', { paramJson: JSON.stringify({ id: this.id }) }, false).then(res => {
      res.code == 1000 && (this.result = res.result);
      this.isPreview = res.result.status == 1;
    });
  }

}
