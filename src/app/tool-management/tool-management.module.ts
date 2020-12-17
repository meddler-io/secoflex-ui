import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolManagementRoutingModule } from './tool-management-routing.module';
import { ToolHomeComponent } from './tool-home/tool-home.component';
import { NbAccordionModule, NbActionsModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ToolApiService } from './tool-api.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadbarComponent } from '../temp/headbar/headbar.component';
import { TemporarymoduleModule } from '../temp/temporarymodule/temporarymodule.module';
import { NavbarListItemComponent } from '../asset-management/navbar-list-item/navbar-list-item.component';
import { LogStreamComponent } from './log-stream/log-stream.component';
import { ToolBuildVariantsComponent } from './tool-build-variants/tool-build-variants.component';
import { ToolScreenComponent } from './tool-screen/tool-screen.component';
import { AngularSplitModule } from 'angular-split';
import { ToolListComponent } from './tool-list/tool-list.component';



@NgModule({
  declarations: [ToolHomeComponent,
    HeadbarComponent , NavbarListItemComponent, LogStreamComponent, ToolBuildVariantsComponent, ToolScreenComponent, ToolListComponent
  ],
  imports: [


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
    CodemirrorModule,
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
    ReactiveFormsModule

  ],
  providers: [
    ToolApiService
  ]
})
export class ToolManagementModule { }
