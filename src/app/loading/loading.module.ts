import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';
import { InjectionService } from '../injection/injection.service';

@NgModule({
  declarations: [LoadingComponent],
  providers: [LoadingService, InjectionService],
  exports: [LoadingComponent],
  imports: [CommonModule],
  entryComponents: [LoadingComponent]
})
export class LoadingModule {}
