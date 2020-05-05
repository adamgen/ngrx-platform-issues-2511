import { Store, createFeatureSelector, select } from '@ngrx/store';
import { Component } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<any, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-examples';
  constructor(
    private store: Store,
  ) {
  }

  ngOnInit() {
    // this.store.pipe(select(selectRouteParam('id'))).subscribe(data => {
    this.store.pipe(select(selectRouteParams)).subscribe(data => {
      console.log('from component', data);
    });
  }
}
