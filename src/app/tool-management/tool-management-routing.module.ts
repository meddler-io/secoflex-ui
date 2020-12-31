import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildCreateComponent } from './build-create/build-create.component';
import { BuildListComponent } from './build-list/build-list.component';
import { LogStreamComponent } from './log-stream/log-stream.component';
import { ToolBuildVariantsComponent } from './tool-build-variants/tool-build-variants.component';
import { ToolHomeComponent } from './tool-home/tool-home.component';
import { ToolListComponent } from './tool-list/tool-list.component';

const routes: Routes = [




  // {
  //   path: '',
  //   component: ToolHomeComponent,
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: ToolHomeComponent,
    children: [

      {
        path: '',
        component: ToolListComponent

      },
      {
        path: 'builds/:id',
        component: BuildListComponent

      },
      {
        path: 'builds/all/:id',
        component: BuildListComponent

      },
      {
        path: 'details/:id',
        component: BuildCreateComponent

      },

      {
        path: '**',
        redirectTo: 'tool'


      }
    ]
  }

  ,
  {
    path: '**',
    // component: ToolListComponent
    redirectTo: 'tool'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolManagementRoutingModule { }
