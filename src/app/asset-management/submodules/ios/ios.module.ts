import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IosRoutingModule } from './ios-routing.module';
import { IosHomeComponent } from './ios-home/ios-home.component';
import { IosListComponent } from './ios-list/ios-list.component';
import { IosListItemComponent } from './ios-list-item/ios-list-item.component';
import { IosCreateNewComponent } from './ios-create-new/ios-create-new.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbFormFieldModule, NbIconModule, NbLayoutModule, NbToggleModule, NbSpinnerModule, NbProgressBarModule } from '@nebular/theme';

import { CommonImportsModule } from '../common/common-imports.module';
import { IosAddComponent } from './ios-add/ios-add.component';


@NgModule({
  declarations: [IosHomeComponent, IosListComponent, IosListItemComponent, IosCreateNewComponent, IosAddComponent],
  imports: [
    CommonModule,
    IosRoutingModule,
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
export class IosModule { }
