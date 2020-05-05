import { Store, createFeatureSelector, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  template: `
Url params from NGRX: {{paramsFromNGRX$ | async | json}} <br>
Url params from ActivatedRoute: {{paramsFromActivatedRoute$ | async | json}} <br>
`, // Outputs "Url param is:"
  styles: ['']
})
export class AppComponent implements OnInit {
  title = 'angular-examples';
  paramsFromNGRX$;
  paramsFromActivatedRoute$;
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.paramsFromNGRX$ = this.store.pipe(
      select(selectRouteParams),
      tap(fromPipeTap => console.log({ fromPipeTap })), // logs undefined
    );

    this.activatedRoute.params.subscribe(data => {
      console.log('from activatedRoute', data);
    });

    this.paramsFromActivatedRoute$ = this.activatedRoute.params;
  }
}
