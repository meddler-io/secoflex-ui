import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebHomeComponent } from './web-home/web-home.component';
import { WebListComponent } from './web-list/web-list.component';
import { WebSearchComponent } from './web-search/web-search.component';
import { CommonImportsModule } from '../common/common-imports.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexModule } from '@angular/flex-layout';
import { NbInputModule, NbFormFieldModule, NbIconModule, NbLayoutModule, NbProgressBarModule, NbSpinnerModule, NbToggleModule } from '@nebular/theme';

import { WebAddComponent } from './web-add/web-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [WebHomeComponent, WebListComponent, WebSearchComponent, WebAddComponent],
  imports: [
    CommonModule,
    WebRoutingModule,
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
    NbProgressBarModule
  ]
})
export class WebModule { }
