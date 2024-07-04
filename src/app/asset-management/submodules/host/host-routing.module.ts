import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuItemsIdentifiers } from '../../asset-store.service';
import { HostAddComponent } from './host-add/host-add.component';
import { HostManagementComponent } from './host-management/host-management.component';

const routes: Routes = [

  {

    path: 'add',
    component: HostAddComponent,
    data: {
      id: NavMenuItemsIdentifiers.HostCreate
    }
  },
  {
    path: '**',
    component: HostManagementComponent,
    data: {
      id: NavMenuItemsIdentifiers.HostConfigure
    }


  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
