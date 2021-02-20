import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolManagementRoutingModule } from './tool-management-routing.module';
import { ToolHomeComponent } from './tool-home/tool-home.component';
import { NbAccordionModule, NbActionsModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogConfig, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbProgressBarModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetComponent, NbTabsetModule, NbTagModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
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
import {A11yModule} from '@angular/cdk/a11y';
import { HttpClientModule } from '@angular/common/http';
import { BuildConfigComponent } from './build-config/build-config.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToolCreateComponent } from './tool-create/tool-create.component';

@NgModule({
  declarations: [ToolHomeComponent,

    HeadbarComponent , NavbarListItemComponent, LogStreamComponent, ToolBuildVariantsComponent, ToolScreenComponent, ToolListComponent, BuildCreateComponent, BuildListComponent, DividerComponent, BuildConfigComponent, ToolCreateComponent
  ],
  imports: [

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
    NbDialogModule.forChild( ),
    NbSelectModule,
    NbListModule,
    NbSpinnerModule,
    NbCheckboxModule,
    ProgressSpinnerModule,
    NbTabsetModule,

    CommonDirectivesModule,
    A11yModule,


    HttpClientModule,
    NbEvaIconsModule,

    NgScrollbarModule,
    NbToggleModule,
    NbButtonGroupModule,

    NbTagModule,
    NbProgressBarModule


  ],
  providers: [
    ToolApiService
  ]
})
export class ToolManagementModule { }
