import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { OverlayComponent } from './overlay.component';
import { OverlayService } from './overlay.service';

import { ResizeOverlayComponent } from './resize-overlay.component';

import { HotkeysService } from '../hotkeys/hotkeys.service';
import { InjectionService } from '../injection/injection.service';
import { IconModule } from '@swimlane/ngx-ui';
import { HotkeysModule } from '../hotkeys/hotkeys.module';

@NgModule({
  declarations: [OverlayComponent, ResizeOverlayComponent],
  providers: [OverlayService, InjectionService, OverlayService, HotkeysService],
  exports: [OverlayComponent, ResizeOverlayComponent],
  imports: [CommonModule, IconModule, LayoutModule, HotkeysModule],
  entryComponents: [OverlayComponent, ResizeOverlayComponent]
})
export class OverlayModule {}
