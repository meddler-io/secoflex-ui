import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponentComponent } from '../reusable-components/form-builder/commonComponents/test-component/test-component.component';
import { BuildConfigComponent } from './build-config/build-config.component';
import { BuildCreateComponent } from './build-create/build-create.component';
import { BuildListComponent } from './build-list/build-list.component';
import { BuiltImageListComponent } from './built-image-list/built-image-list.component';
import { DeploymentUiComponent } from './deployment-ui/deployment-ui.component';
import { JobListComponent } from './job-list/job-list.component';
import { LogStreamComponent } from './log-stream/log-stream.component';
import { ToolBuildVariantsComponent } from './tool-build-variants/tool-build-variants.component';
import { ToolExploreComponent } from './tool-explore/tool-explore.component';
import { ToolHomeComponent } from './tool-home/tool-home.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ScannersUiComponent } from './tool-explore/scanners/scanners.component';
import { FileCreateComponent } from './file-create/file-create.component';
import { FileListComponent } from './file-list/file-list.component';

const routes: Routes = [



  {
    path: '',
    component: ToolHomeComponent,
    children: [

      

      {
        path: 'test',
        component: FileListComponent
        // component: FileCreateComponent

      },
      {
        path: '',
        component: ToolListComponent

      },
      {
        path: 'builds/:id',
        component: ToolExploreComponent,
        children: [
          { path: "", redirectTo: 'builds', outlet: "view", pathMatch: 'full' },
          { path: "deployments", component: DeploymentUiComponent, outlet: "view" },
          { path: "scanners", component: ScannersUiComponent, outlet: "view" },
          { path: "images", component: BuiltImageListComponent, outlet: "view" },
          { path: "builds", component: BuildListComponent, outlet: "view" },
          { path: "jobs", component: JobListComponent, outlet: "view" },
          { path: "**", redirectTo: 'builds', outlet: "view", pathMatch: 'full' },

        ]


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
        redirectTo: '/tools'

      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolManagementRoutingModule { }
