import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuItemsIdentifiers } from '../../asset-store.service';
import { AndroidAddComponent } from './android-add/android-add.component';
import { AndroidHomeComponent } from './android-home/android-home.component';

const routes: Routes = [

  {
    path: 'add',
    component: AndroidAddComponent,
    data: {
      id: NavMenuItemsIdentifiers.AndroidCreate
    }
  },
  {
    path: '**',
    component: AndroidHomeComponent,
    data: {
      id: NavMenuItemsIdentifiers.AndroidConfigure
    }

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndroidRoutingModule { }
