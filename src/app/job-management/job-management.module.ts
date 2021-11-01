import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobManagementRoutingModule } from './job-management-routing.module';
import { JobHomeComponent } from './job-home/job-home.component';
import { NbAccordionModule, NbActionsModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbRouteTabsetComponent, NbRouteTabsetModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
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
import { ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './subcomp/list-item/list-item.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { StepperModule } from '../stepper/stepper.module';
import { ToolSelectorComponent } from './tool-selector/tool-selector.component';
import { JobResultComponent } from './job-result/job-result.component';
import { JobRequestComponent } from './job-request/job-request.component';
import { SelectedJobComponent } from './selected-job/selected-job.component';
import { JobFileViewerComponent } from './job-file-viewer/job-file-viewer.component';

import { TreeNgxModule } from 'tree-ngx';
import { TreeModule } from '@swimlane/ngx-ui';
import { FileListItemComponent } from './file-list-item/file-list-item.component';
import { FilesizePipe } from './filesize.pipe';
import { FilenamePipe } from './filename.pipe';



@NgModule({
  declarations: [
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
    JobFileViewerComponent,
    FileListItemComponent,
    FilesizePipe,
    FilenamePipe,

  ],
  imports: [
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

    TreeNgxModule ,
    TreeModule,
    NbAutocompleteModule,
    NbInputModule




  ],

  providers: [
    JobApiService,
    StateSyncService
  ]
})
export class JobManagementModule { }
