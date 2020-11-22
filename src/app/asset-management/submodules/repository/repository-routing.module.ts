import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoryHomeComponent } from './repository-home/repository-home.component';

const routes: Routes = [
  {



    path: '',
    children: [
      {
        path: '**',
        component: RepositoryHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule { }
