import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DockerRoutingModule } from './docker-routing.module';
import { DockerHomeComponent } from './docker-home/docker-home.component';


@NgModule({
  declarations: [DockerHomeComponent],
  imports: [
    CommonModule,
    DockerRoutingModule
  ]
})
export class DockerModule { }
