import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuItemsIdentifiers } from '../../asset-store.service';
import { DockerAddComponent } from './docker-add/docker-add.component';
import { DockerHomeComponent } from './docker-home/docker-home.component';

const routes: Routes = [
  {


    path: '',
    children: [

      {
        path: 'add',
        component: DockerAddComponent,
        data: {
          id: NavMenuItemsIdentifiers.DockerCreate
        }
      },
      {
        path: '**',
        component: DockerHomeComponent,
        data: {
          id: NavMenuItemsIdentifiers.DockerConfigure
        }

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DockerRoutingModule { }
