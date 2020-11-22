import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostManagementComponent } from './host-management/host-management.component';

const routes: Routes = [


  {

    path: '',
    component: HostManagementComponent,



  },
  {
    path: '**',
    component: HostManagementComponent,



  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
