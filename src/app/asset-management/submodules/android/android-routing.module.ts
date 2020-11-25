import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndroidAddComponent } from './android-add/android-add.component';
import { AndroidHomeComponent } from './android-home/android-home.component';

const routes: Routes = [

  {
    path: 'add',
    component: AndroidAddComponent,
  },
  {
    path: '**',
    component: AndroidHomeComponent,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndroidRoutingModule { }
