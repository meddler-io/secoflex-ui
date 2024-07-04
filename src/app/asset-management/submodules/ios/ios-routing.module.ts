import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IosHomeComponent } from './ios-home/ios-home.component';

const routes: Routes = [
  {


    path: '',
    children: [
      {
        path: '**',
        component: IosHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IosRoutingModule { }
