import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndroidRoutingModule } from './android-routing.module';
import { AndroidHomeComponent } from './android-home/android-home.component';
import { AndroidAddComponent } from './android-add/android-add.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbFormFieldModule, NbIconModule, NbLayoutModule, NbToggleModule, NbSpinnerModule, NbProgressBarModule } from '@nebular/theme';

import { CommonImportsModule } from '../common/common-imports.module';
import { AndroidListItemComponent } from './android-list-item/android-list-item.component';
import { AndroidListComponent } from './android-list/android-list.component';
import { AndroidCreateNewComponent } from './android-create-new/android-create-new.component';


@NgModule({
  declarations: [AndroidHomeComponent, AndroidAddComponent, AndroidListItemComponent, AndroidListComponent, AndroidCreateNewComponent],
  imports: [
    CommonModule,
    AndroidRoutingModule,
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
export class AndroidModule { }
