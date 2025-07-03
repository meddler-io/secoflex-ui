import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolManagementRoutingModule } from './tool-management-routing.module';
import { ToolHomeComponent } from './tool-home/tool-home.component';
import { NbAccordionModule, NbActionsModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDialogConfig, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbProgressBarModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ToolApiService } from './tool-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadbarComponent } from '../temp/headbar/headbar.component';
import { TemporarymoduleModule } from '../temp/temporarymodule/temporarymodule.module';
import { NavbarListItemComponent } from '../asset-management/navbar-list-item/navbar-list-item.component';
import { LogStreamComponent } from './log-stream/log-stream.component';
import { ToolBuildVariantsComponent } from './tool-build-variants/tool-build-variants.component';
import { ToolScreenComponent } from './tool-screen/tool-screen.component';
import { AngularSplitModule } from 'angular-split';
import { ToolListComponent } from './tool-list/tool-list.component';
import { BuildCreateComponent } from './build-create/build-create.component';
import { BuildListComponent } from './build-list/build-list.component';
import { DrawerModule } from '../drawer/drawer.module';
import { DividerComponent } from './divider/divider.component';
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';
// 
import { A11yModule } from '@angular/cdk/a11y';
import { HttpClientModule } from '@angular/common/http';
import { BuildConfigComponent } from './build-config/build-config.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToolCreateComponent } from './tool-create/tool-create.component';
import { BuiltImageListComponent } from './built-image-list/built-image-list.component';
import { DeploymentUiComponent } from './deployment-ui/deployment-ui.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobConfigComponent } from './job-config/job-config.component';
import { ToolExploreComponent } from './tool-explore/tool-explore.component';
import { SharedDataService } from './shared-data-service.service';
import { ScannersUiComponent } from './tool-explore/scanners/scanners.component';
import { TaskConfigComponent } from './task-config/task-config.component';
import { FileCreateComponent } from './file-create/file-create.component';
import {AutosizeModule} from 'ngx-autosize';
import { FileListComponent } from './file-list/file-list.component';
import { ToolsListForInputComponent } from './tools-list-for-input/tools-list-for-input.component';
import { CommonImportsModule } from '../asset-management/submodules/common/common-imports.module';
import { WorkerDeploymentConfigComponent } from './worker-deployment-config/worker-deployment-config.component';
import { JobApiService } from '../job-management/job-api.service';

@NgModule({
  declarations: [
    WorkerDeploymentConfigComponent,

    LogStreamComponent,
    // LogStreamComponent,
    ToolsListForInputComponent,
    ToolHomeComponent,
    TaskConfigComponent,
    FileListComponent,
    FileCreateComponent,
    HeadbarComponent, NavbarListItemComponent, ToolBuildVariantsComponent, ToolScreenComponent, ToolListComponent, BuildCreateComponent, BuildListComponent, DividerComponent, BuildConfigComponent, ToolCreateComponent, BuiltImageListComponent, DeploymentUiComponent, JobListComponent, JobConfigComponent, ToolExploreComponent, ScannersUiComponent,

  ],
  imports: [

    CommonImportsModule,
    AutosizeModule,
    DrawerModule,

    NbLayoutModule,
    FlexLayoutModule,
    CommonModule,
    ToolManagementRoutingModule,
    NbIconModule,
    CommonDirectivesModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbDialogModule.forChild(),
    NbButtonModule,

    FormsModule,
    TemporarymoduleModule,
    NbListModule,
    NbCardModule,
    NbActionsModule,
    NbAccordionModule,

    AngularSplitModule,
    NbInputModule,
    NbFormFieldModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),
    NbSelectModule,
    NbListModule,
    NbSpinnerModule,
    NbCheckboxModule,
    ProgressSpinnerModule,
    NbTabsetModule,
    NbRouteTabsetModule,

    CommonDirectivesModule,
    A11yModule,


    HttpClientModule,
    NbEvaIconsModule,

    NgScrollbarModule,
    NbToggleModule,
    NbButtonGroupModule,

    NbTagModule,
    NbProgressBarModule,
    NbContextMenuModule,
    NbButtonGroupModule,

    NbSearchModule


  ],
  providers: [
    ToolApiService,
    SharedDataService,
    JobApiService
    
  ]
})
export class ToolManagementModule { }
