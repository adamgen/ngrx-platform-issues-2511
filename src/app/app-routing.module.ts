import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { OutletComponent } from './outlet/outlet.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/my-id',
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OutletComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
