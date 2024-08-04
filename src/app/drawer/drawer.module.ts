import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../overlay/overlay.module';
import { OverlayService } from '../overlay/overlay.service';


import { DrawerService } from './drawer.service';
import { DrawerContainerDirective } from './drawer-container.directive';
import { InjectionService } from '../injection/injection.service';
import { A11yModule } from '@angular/cdk/a11y';
import { DrawerComponent } from './drawer.component';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
  declarations: [DrawerComponent, DrawerContainerDirective],
  exports: [DrawerComponent, DrawerContainerDirective],
  providers: [DrawerService, InjectionService, OverlayService],
  imports: [CommonModule, OverlayModule , A11yModule , FlexModule],
  // entryComponents: [DrawerComponent]
})
export class DrawerModule {}
