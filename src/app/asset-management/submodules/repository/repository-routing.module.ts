import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuItemsIdentifiers } from '../../asset-store.service';
import { RepositoryAddComponent } from './repository-add/repository-add.component';
import { RepositoryHomeComponent } from './repository-home/repository-home.component';

const routes: Routes = [
  {



    path: '',
    children: [

      {
        path: 'add',
        component: RepositoryAddComponent,
        data: {
          id: NavMenuItemsIdentifiers.IosCreate
        }
      },
      {
        path: '**',
        component: RepositoryHomeComponent,
        data: {
          id: NavMenuItemsIdentifiers.IosConfigure
        }
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule { }
