import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolManagementRoutingModule } from './tool-management-routing.module';
import { ToolHomeComponent } from './tool-home/tool-home.component';


@NgModule({
  declarations: [ToolHomeComponent],
  imports: [
    CommonModule,
    ToolManagementRoutingModule
  ]
})
export class ToolManagementModule { }
