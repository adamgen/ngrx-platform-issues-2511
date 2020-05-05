import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Store, createFeatureSelector, select } from '@ngrx/store';
import { ROUTER_NAVIGATED, RouterReducerState } from '@ngrx/router-store';
import { of } from 'rxjs';
import * as fromRouter from '@ngrx/router-store';

export const getRouterState = createFeatureSelector<RouterReducerState>('router');

export const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(getRouterState);

@Injectable()
export class RouterEffectsService {

  setCurrentCourse = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATED),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(selectRouteParams))),
    )),
    tap((id) => console.log('from effect', id)),
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store,
  ) { }
}
