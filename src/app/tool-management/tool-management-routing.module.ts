import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolHomeComponent } from './tool-home/tool-home.component';

const routes: Routes = [

  {
    path: '**',
    component: ToolHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolManagementRoutingModule { }
