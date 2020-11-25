import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainAddComponent } from './domain-add/domain-add.component';
import { DomainHomeComponent } from './domain-home/domain-home.component';

const routes: Routes = [

  {
    path: 'add',
    component: DomainAddComponent,
  },
  {
    path: '**',
    component: DomainHomeComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule { }
