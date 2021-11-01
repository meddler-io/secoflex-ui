import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobBootstrapComponent } from './job-bootstrap/job-bootstrap.component';
import { JobFileViewerComponent } from './job-file-viewer/job-file-viewer.component';
import { JobHomeComponent } from './job-home/job-home.component';
import { JobLogsComponent } from './job-logs/job-logs.component';
import { JobRequestComponent } from './job-request/job-request.component';
import { JobResultComponent } from './job-result/job-result.component';
import { JobSelectorComponent } from './job-selector/job-selector.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { TestComponent } from './test/test.component';
import { ToolSelectorComponent } from './tool-selector/tool-selector.component';

const routes: Routes = [


  {
    path: '',
    component: JobBootstrapComponent,
    children: [



      {
        component: JobHomeComponent,
        path: 'job/all',
        children: [


          // { path: '', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: '', redirectTo: 'tools', outlet: 'tool_list' },
          { path: 'tools', component: ToolSelectorComponent, outlet: 'tool_list' },
          { path: 'jobs', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: 'test', component: TestComponent, outlet: 'tool_list' },

          { path: 'tool/:tool_id', component: JobSelectorComponent, outlet: 'tool_list' },
          // { path: '**', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: '**', redirectTo: 'tools', outlet: 'tool_list' },




        ]
      },

      {
        component: JobHomeComponent,
        path: 'job/:jobid',
        children: [
          { path: '', redirectTo: 'job', outlet: 'view' },


          {
            path: 'job'
            , component: MainContainerComponent
            , outlet: 'view',


            children: [

              // { path: '', component: JobLogsComponent, outlet: 'sub_comp' },
              // { path: '', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: '', redirectTo: 'request', outlet: 'sub_comp' },
              { path: 'request', component: JobRequestComponent, outlet: 'sub_comp' },
              { path: 'files', component: JobFileViewerComponent, outlet: 'sub_comp' },
              { path: 'logs', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: 'result', component: JobResultComponent, outlet: 'sub_comp' },
              { path: 'settings', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: 'scratchpad', component: JobLogsComponent, outlet: 'sub_comp' },
              // { path: '**', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: '**', redirectTo: 'request', outlet: 'sub_comp' },

              


            ]

          },

          {
            path: 'result'
            , component: MainContainerComponent
            , outlet: 'view',


            children: [

              { path: '', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: 'request', component: JobRequestComponent, outlet: 'sub_comp' },
              { path: 'logs', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: 'result', component: JobResultComponent, outlet: 'sub_comp' },
              { path: 'settings', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: 'scratchpad', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: '**', component: JobLogsComponent, outlet: 'sub_comp' },
              // { path: '**', redirectTo: 'logs' ,  outlet: 'sub_comp' },



            ]

          },


          { path: 'settings', component: JobLogsComponent, outlet: 'view' },


          // { path: '', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: '', redirectTo: 'tools', outlet: 'tool_list' },
          { path: 'test', component: TestComponent, outlet: 'tool_list' },
          { path: 'tools', component: ToolSelectorComponent, outlet: 'tool_list' },
          { path: 'jobs', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: 'tool/:tool_id', component: JobSelectorComponent, outlet: 'tool_list' },
          // { path: '**', component: JobSelectorComponent, outlet: 'tool_list' },
          // { path: '**', redirectTo: 'tools', outlet: 'tool_list' },


        ]
      }

      ,

      { path: '**', redirectTo: 'job/all', pathMatch: 'full' },


    ]


  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobManagementRoutingModule { }
