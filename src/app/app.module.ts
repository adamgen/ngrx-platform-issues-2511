import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffectsService } from './router-effects.service';
import { OutletComponent } from './outlet/outlet.component';

@NgModule({
  declarations: [
    AppComponent,
    OutletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      router: routerReducer,
    }, {}),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: 1,
    }),
    EffectsModule.forRoot([RouterEffectsService])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
