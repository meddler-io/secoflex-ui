import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainHomeComponent } from './domain-home/domain-home.component';
import { CommonImportsModule } from '../common/common-imports.module';
import { DomainSearchComponent } from './domain-search/domain-search.component';

import { DomainListComponent } from './domain-list/domain-list.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexModule } from '@angular/flex-layout';
import { NbInputModule, NbFormFieldModule, NbIconModule, NbLayoutModule, NbSpinnerModule, NbToggleModule } from '@nebular/theme';

import { DomainAddComponent } from './domain-add/domain-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostRoutingModule } from '../host/host-routing.module';



@NgModule({
  declarations: [DomainHomeComponent, DomainSearchComponent, DomainListComponent, DomainAddComponent],
  imports: [
    CommonModule,
    DomainRoutingModule,
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
    NbFormFieldModule
  ]
})
export class DomainModule { }
