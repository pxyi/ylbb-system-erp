import { AppState } from './../../core/reducers/reducers-config';
import { Component, OnInit } from '@angular/core';
import { RouterState } from 'src/app/core/reducers/router-reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnInit {

  $routerState;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.$routerState = this.store.select('routerState');
  }

}
