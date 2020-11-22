import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainHomeComponent } from './domain-home/domain-home.component';

const routes: Routes = [

  {


    path: '',
    component: DomainHomeComponent

  },
  {


    path: '**',
    component: DomainHomeComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule { }
