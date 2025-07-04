import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobManagementRoutingModule } from './job-management-routing.module';
import { JobHomeComponent } from './job-home/job-home.component';
import { NbAccordionModule, NbActionsModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbRouteTabsetComponent, NbRouteTabsetModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbThemeModule, NbToggleModule, NbTooltipModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolApiService } from '../tool-management/tool-api.service';
import { HttpClientModule } from '@angular/common/http';
import { DrawerModule } from '../drawer/drawer.module';
import { JobListComponent } from './job-list/job-list.component';
import { JobApiService } from './job-api.service';
import { JobLogsComponent } from './job-logs/job-logs.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';
import { StateSyncService } from './state-sync.service';
import { TestComponent } from './test/test.component';
import { JobBootstrapComponent } from './job-bootstrap/job-bootstrap.component';
import { JobSelectorComponent } from './job-selector/job-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './subcomp/list-item/list-item.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { StepperModule } from '../stepper/stepper.module';
import { ToolSelectorComponent } from './tool-selector/tool-selector.component';
import { JobResultComponent } from './job-result/job-result.component';
import { JobRequestComponent } from './job-request/job-request.component';
import { SelectedJobComponent } from './selected-job/selected-job.component';
import { JobResultContentComponent } from './job-result-content/job-result-content.component';
import { AutosizeModule } from 'ngx-autosize';
// import { TaskConfigComponent } from '../tool-management/task-config/task-config.component';
import { DividerComponent } from '../tool-management/divider/divider.component';
import { LogStreamComponent } from '../tool-management/log-stream/log-stream.component';
import { CommonImportsModule } from '../asset-management/submodules/common/common-imports.module';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { PipelineComponent } from './pipeline/pipeline.component';
import { PipelineJobsComponent } from './pipeline-jobs/pipeline-jobs.component';
import { ExecStatusPipe } from '../exec-status.pipe';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    
    // LogStreamComponent,
    PaginationComponent,
    ExecStatusPipe,

    PipelineJobsComponent,
    PipelineComponent,

    // TaskConfigComponent,
    JobResultContentComponent,
    JobHomeComponent,
    JobListComponent,
    JobLogsComponent,
    TestComponent,
    JobBootstrapComponent,
    JobSelectorComponent,
    ListItemComponent,
    MainContainerComponent,
    ToolSelectorComponent,
    JobResultComponent,
    JobRequestComponent,
    SelectedJobComponent,

  ],
  
  imports: [

    NbAutocompleteModule,
    NgxGraphModule,
    CommonImportsModule,
    NbFormFieldModule,
    NbTooltipModule,

    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    JobManagementRoutingModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'default' }),
    FlexLayoutModule,
    NbIconModule,
    HttpClientModule,
    DrawerModule,
    NbAccordionModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    NbTagModule,
    NbSpinnerModule,
    NbSidebarModule.forRoot(),
    NbButtonGroupModule,
    NbEvaIconsModule,
    NgScrollbarModule,
    ProgressSpinnerModule,
    NbSelectModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    ReactiveFormsModule,
    StepperModule,
    NbMenuModule,
    NbActionsModule,
    
    NbContextMenuModule,
    NbInputModule
    ,
    AutosizeModule,
    
    NbCheckboxModule,




  ],

  providers: [
    JobApiService,
    StateSyncService,
    ToolApiService
  ]
})
export class JobManagementModule { }
