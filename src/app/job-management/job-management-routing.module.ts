import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobBootstrapComponent } from './job-bootstrap/job-bootstrap.component';
import { JobHomeComponent } from './job-home/job-home.component';
import { JobLogsComponent } from './job-logs/job-logs.component';
import { JobSelectorComponent } from './job-selector/job-selector.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [


  {
    path: '',
    component: JobBootstrapComponent,
    children: [

      {
        component: JobHomeComponent,
        path: 'job',
        children: [


          { path: '', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: 'logs', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: '**', component: JobSelectorComponent, outlet: 'tool_list' },





        ]
      },
      {
        component: JobHomeComponent,
        path: 'job/:jobid',
        children: [
          { path: '', redirectTo: 'logs', outlet: 'view' },
          { path: 'logs', component: JobLogsComponent, outlet: 'view' },
          {
            path: 'result'
            , component: MainContainerComponent
            , outlet: 'view',


            children: [

              { path: '', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: 'logs', component: JobLogsComponent, outlet: 'sub_comp' },
              { path: '**', component: JobLogsComponent, outlet: 'sub_comp' },



            ]

          },
          { path: 'settings', component: JobLogsComponent, outlet: 'view' },


          { path: '', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: 'logs', component: JobSelectorComponent, outlet: 'tool_list' },
          { path: '**', component: JobSelectorComponent, outlet: 'tool_list' },



        ]
      }

      ,

      { path: '**', redirectTo: 'job', pathMatch: 'full' },


    ]


  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobManagementRoutingModule { }
