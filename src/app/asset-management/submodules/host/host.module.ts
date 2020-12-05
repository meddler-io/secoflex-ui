import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { CommonImportsModule } from '../common/common-imports.module';
import { HostManagementComponent } from './host-management/host-management.component';
import { HostListComponent } from './host-list/host-list.component';
import { FlexModule } from '@angular/flex-layout';
import { HostSearchComponent } from './host-search/host-search.component';
import { NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSpinnerModule, NbToggleModule } from '@nebular/theme';

import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostAddComponent } from './host-add/host-add.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';




@NgModule({
  declarations: [HostManagementComponent, HostListComponent, HostSearchComponent, HostAddComponent ],
  imports: [
    CommonModule,
    HostRoutingModule,
    CommonImportsModule,
    FlexModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,

    OverlayModule,
    NbLayoutModule,
    NbToggleModule,

    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbFormFieldModule,

    NbListModule
  ]
})
export class HostModule { }
