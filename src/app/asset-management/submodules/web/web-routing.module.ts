import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebAddComponent } from './web-add/web-add.component';
import { WebHomeComponent } from './web-home/web-home.component';

const routes: Routes = [
  {
    path: 'add',
    component: WebAddComponent,
  },
  {
    path: '**',
    component: WebHomeComponent,

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
