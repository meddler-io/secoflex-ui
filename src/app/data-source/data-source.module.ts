import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataSourceRoutingModule } from './data-source-routing.module';
import { SchemaHomeComponent } from './schema-home/schema-home.component';



@NgModule({
  declarations: [SchemaHomeComponent],
  imports: [
    CommonModule,
    DataSourceRoutingModule,

  ]
})
export class DataSourceModule { }
