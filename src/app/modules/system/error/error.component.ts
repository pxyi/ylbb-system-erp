import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  private allowParams: number[] = [403, 404, 500];

  errorType: number =  1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      
      this.errorType = this.allowParams.indexOf(Number(params.type)) > -1 ? params.type : 404;
      
    })
  }

}
