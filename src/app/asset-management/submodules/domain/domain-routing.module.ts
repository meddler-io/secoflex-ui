import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuItemsIdentifiers } from '../../asset-store.service';
import { DomainAddComponent } from './domain-add/domain-add.component';
import { DomainHomeComponent } from './domain-home/domain-home.component';

const routes: Routes = [

  {
    path: 'add',
    component: DomainAddComponent,
    data: {
      id: NavMenuItemsIdentifiers.DomainCreate
    }
  },
  {
    path: '**',
    component: DomainHomeComponent,
    data: {
      id: NavMenuItemsIdentifiers.DomainConfigure
    }

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule { }
