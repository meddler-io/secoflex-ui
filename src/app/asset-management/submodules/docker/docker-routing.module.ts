import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockerHomeComponent } from './docker-home/docker-home.component';

const routes: Routes = [
  {


    path: '',
    children: [
      {
        path: '**',
        component: DockerHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DockerRoutingModule { }
