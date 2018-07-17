import { Store } from '@ngrx/store';
import { RouterState } from '../../core/reducers/router-reducer';
import { Component } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'ea-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {


  breadcrumb: object[] = [];
  routerState: RouterState;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store : Store<RouterState>
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute), 
      map((route) => {
        let routeData = [];
        while (route.firstChild) {
          route = route.firstChild;
          if (route.data['value']) {
            routeData.push(route.data['value']);
          }
        }
        return routeData;
      })
    ).subscribe(event => {
      this.breadcrumb = event[0] && event[0]['title'] ? event : [];
    })

    store.select('routerState').subscribe(res => this.routerState = res);
  }

}
