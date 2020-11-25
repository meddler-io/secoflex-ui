import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryHomeComponent } from './repository-home/repository-home.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { RepositorySearchComponent } from './repository-search/repository-search.component';
import { RepositoryAddComponent } from './repository-add/repository-add.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbFormFieldModule, NbIconModule, NbLayoutModule, NbToggleModule, NbSpinnerModule, NbSelectModule, NbRadioModule } from '@nebular/theme';

import { CommonImportsModule } from '../common/common-imports.module';


@NgModule({
  declarations: [RepositoryHomeComponent, RepositoryListComponent, RepositorySearchComponent, RepositoryAddComponent],
  imports: [


    CommonModule,
    RepositoryRoutingModule,
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
    NbSelectModule,
    NbRadioModule

  ]
})
export class RepositoryModule { }
