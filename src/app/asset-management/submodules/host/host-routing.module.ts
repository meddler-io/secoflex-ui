import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostAddComponent } from './host-add/host-add.component';
import { HostManagementComponent } from './host-management/host-management.component';

const routes: Routes = [

  {
    
    path: 'add',
    component: HostAddComponent,
    data: ['hello3'],

  },
  {
    path: '**',
    component: HostManagementComponent,
    data: ['hello2'],


  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
