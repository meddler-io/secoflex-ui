import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolManagementRoutingModule } from './tool-management-routing.module';
import { ToolHomeComponent } from './tool-home/tool-home.component';
import { NbButtonModule, NbDialogModule, NbIconModule, NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [ToolHomeComponent],
  imports: [


    NbLayoutModule,
    FlexLayoutModule,
    CommonModule,
    ToolManagementRoutingModule,
    NbIconModule,
    CommonDirectivesModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'dark' }),
    NbEvaIconsModule,
    NbDialogModule.forChild(),
    NbButtonModule,

  ]
})
export class ToolManagementModule { }
