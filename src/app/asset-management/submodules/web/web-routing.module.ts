import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuItemsIdentifiers } from '../../asset-store.service';
import { WebAddComponent } from './web-add/web-add.component';
import { WebHomeComponent } from './web-home/web-home.component';

const routes: Routes = [
  {
    path: 'add',
    component: WebAddComponent,
    data: {
      id: NavMenuItemsIdentifiers.WebCreate
    }
  },
  {
    path: '**',
    component: WebHomeComponent,
    data: {
      id: NavMenuItemsIdentifiers.WebConfigure
    }

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
