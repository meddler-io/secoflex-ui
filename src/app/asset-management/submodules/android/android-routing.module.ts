import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndroidHomeComponent } from './android-home/android-home.component';

const routes: Routes = [
  {


    path: '',
    children: [
      {
        path: '**',
        component: AndroidHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndroidRoutingModule { }
