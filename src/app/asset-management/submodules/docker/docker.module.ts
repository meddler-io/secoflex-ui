import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DockerRoutingModule } from './docker-routing.module';
import { DockerHomeComponent } from './docker-home/docker-home.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbFormFieldModule, NbIconModule, NbLayoutModule, NbToggleModule, NbSpinnerModule, NbSelectModule, NbRadioModule } from '@nebular/theme';
import { CommonImportsModule } from '../common/common-imports.module';
import { RepositoryRoutingModule } from '../repository/repository-routing.module';
import { DockerSearchComponent } from './docker-search/docker-search.component';
import { DockerAddComponent } from './docker-add/docker-add.component';
import { DockerListComponent } from './docker-list/docker-list.component';


@NgModule({
  declarations: [DockerHomeComponent, DockerSearchComponent, DockerAddComponent, DockerListComponent],
  imports: [
    CommonModule,

    DockerRoutingModule,
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
export class DockerModule { }
